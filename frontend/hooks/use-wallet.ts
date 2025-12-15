"use client"

import { useState, useEffect, useCallback } from "react"
import { connectWallet, switchToBaseSepolia, getCurrentChainId } from "@/lib/web3"
import { CHAIN_ID } from "@/lib/contracts"
import toast from "react-hot-toast"

interface WalletState {
  address: string | null
  chainId: number | null
  isConnecting: boolean
  isCorrectChain: boolean
}

/**
 * Get the MetaMask provider, prioritizing it over other wallets
 */
function getMetaMaskProvider() {
  if (typeof window === "undefined") return null

  // Check if MetaMask is available
  if (window.ethereum?.isMetaMask) {
    return window.ethereum
  }

  // Check for multiple providers (e.g., MetaMask + Phantom)
  if ((window.ethereum as any)?.providers) {
    const providers = (window.ethereum as any).providers
    const metamask = providers.find((p: any) => p.isMetaMask)
    if (metamask) return metamask
  }

  // Fallback to window.ethereum
  return window.ethereum
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null,
    chainId: null,
    isConnecting: false,
    isCorrectChain: false,
  })

  const checkConnection = useCallback(async () => {
    const provider = getMetaMaskProvider()
    if (!provider) return

    try {
      const accounts = (await provider.request({
        method: "eth_accounts",
      })) as string[]

      const chainId = await getCurrentChainId()

      setState((prev) => ({
        ...prev,
        address: accounts[0] || null,
        chainId,
        isCorrectChain: chainId === CHAIN_ID,
      }))
    } catch {
      // Silently fail
    }
  }, [])

  const connect = useCallback(async () => {
    setState((prev) => ({ ...prev, isConnecting: true }))

    try {
      // Check if MetaMask is available
      const provider = getMetaMaskProvider()

      if (!provider) {
        toast.error("MetaMask not found. Please install MetaMask extension.")
        setState((prev) => ({ ...prev, isConnecting: false }))
        return
      }

      const address = await connectWallet()

      if (!address) {
        toast.error("No account found. Please unlock your MetaMask wallet.")
        setState((prev) => ({ ...prev, isConnecting: false }))
        return
      }

      const chainId = await getCurrentChainId()

      if (chainId !== CHAIN_ID) {
        toast.loading("Switching to Base Sepolia...")
        const switched = await switchToBaseSepolia()
        if (!switched) {
          toast.error("Please switch to Base Sepolia network")
        } else {
          toast.success("Connected to Base Sepolia!")
        }
      } else {
        toast.success("Wallet connected!")
      }

      setState({
        address,
        chainId: await getCurrentChainId(),
        isConnecting: false,
        isCorrectChain: (await getCurrentChainId()) === CHAIN_ID,
      })
    } catch (error: unknown) {
      const err = error as Error
      console.error("Wallet connection error:", error)

      // Show error message (user rejections return null, not throw)
      toast.error(err.message || "Failed to connect wallet")

      setState((prev) => ({ ...prev, isConnecting: false }))
    }
  }, [])

  const disconnect = useCallback(() => {
    setState({
      address: null,
      chainId: null,
      isConnecting: false,
      isCorrectChain: false,
    })
    toast.success("Wallet disconnected")
  }, [])

  const switchNetwork = useCallback(async () => {
    const switched = await switchToBaseSepolia()
    if (switched) {
      const chainId = await getCurrentChainId()
      setState((prev) => ({
        ...prev,
        chainId,
        isCorrectChain: chainId === CHAIN_ID,
      }))
      toast.success("Switched to Base Sepolia!")
    } else {
      toast.error("Failed to switch network")
    }
  }, [])

  useEffect(() => {
    checkConnection()

    const provider = getMetaMaskProvider()
    if (provider) {
      const handleAccountsChanged = (accounts: unknown) => {
        const accs = accounts as string[]
        setState((prev) => ({
          ...prev,
          address: accs[0] || null,
        }))
      }

      const handleChainChanged = async () => {
        const chainId = await getCurrentChainId()
        setState((prev) => ({
          ...prev,
          chainId,
          isCorrectChain: chainId === CHAIN_ID,
        }))
      }

      provider.on("accountsChanged", handleAccountsChanged)
      provider.on("chainChanged", handleChainChanged)

      return () => {
        provider.removeListener?.("accountsChanged", handleAccountsChanged)
        provider.removeListener?.("chainChanged", handleChainChanged)
      }
    }
  }, [checkConnection])

  return {
    ...state,
    connect,
    disconnect,
    switchNetwork,
    isConnected: !!state.address,
  }
}
