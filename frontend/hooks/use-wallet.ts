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

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null,
    chainId: null,
    isConnecting: false,
    isCorrectChain: false,
  })

  const checkConnection = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) return

    try {
      const accounts = (await window.ethereum.request({
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
      const address = await connectWallet()
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
      toast.error(err.message || "Failed to connect")
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

    if (typeof window !== "undefined" && window.ethereum) {
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

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        window.ethereum?.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum?.removeListener("chainChanged", handleChainChanged)
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
