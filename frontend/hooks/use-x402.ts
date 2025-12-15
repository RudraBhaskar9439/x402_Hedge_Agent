"use client"

import { useState, useCallback } from 'react'
import { ethers } from 'ethers'
import { useWallet } from '@/hooks/use-wallet'
import toast from 'react-hot-toast'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
const PAYMENT_ADDRESS = process.env.NEXT_PUBLIC_PAYMENT_WALLET_ADDRESS || ''

interface PaymentResponse {
  success: boolean
  payment?: {
    paymentId: string
    resourceType: string
    resourceId: string
    amount: string
    expiresAt: string
  }
  error?: string
  message?: string
}

/**
 * Off-chain HTTP 402 Payment Hook
 * Handles micropayments without smart contracts
 */
export function useX402() {
  const { address, isConnected } = useWallet()
  const [loading, setLoading] = useState(false)

  /**
   * Generic payment function for any resource
   */
  const payForResource = useCallback(
    async (
      resourceType: 'model-details' | 'deposit' | 'competition-entry',
      resourceId: string,
      amount: string
    ): Promise<boolean> => {
      if (!isConnected || !address) {
        toast.error('Please connect your wallet')
        return false
      }

      setLoading(true)

      try {
        // 1. Validate payment address
        if (!PAYMENT_ADDRESS || PAYMENT_ADDRESS === '') {
          toast.error('Payment address not configured. Please check environment variables.')
          return false
        }

        // Validate it's a proper Ethereum address (not ENS)
        if (!ethers.isAddress(PAYMENT_ADDRESS)) {
          toast.error('Invalid payment address configured')
          return false
        }

        // 2. Get provider and signer
        if (!window.ethereum) {
          toast.error('Please install MetaMask')
          return false
        }

        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()

        // 3. Send payment transaction
        toast.loading('Sending payment...', { id: 'payment' })

        const tx = await signer.sendTransaction({
          to: PAYMENT_ADDRESS, // Already validated as proper address
          value: ethers.parseEther(amount)
        })

        toast.loading('Waiting for confirmation...', { id: 'payment' })
        const receipt = await tx.wait()

        if (!receipt || receipt.status !== 1) {
          toast.error('Transaction failed', { id: 'payment' })
          return false
        }

        // 4. Verify payment with backend
        toast.loading('Verifying payment...', { id: 'payment' })

        const response = await fetch(`${API_URL}/api/payment/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-wallet-address': address
          },
          credentials: 'include',
          body: JSON.stringify({
            txHash: tx.hash,
            resourceType,
            resourceId,
            userAddress: address
          })
        })

        const data: PaymentResponse = await response.json()

        if (data.success) {
          toast.success('Payment verified!', { id: 'payment' })

          // Store payment info locally for quick access
          localStorage.setItem(
            `payment_${resourceType}_${resourceId}`,
            JSON.stringify({
              paid: true,
              txHash: tx.hash,
              timestamp: Date.now()
            })
          )

          return true
        } else {
          toast.error(data.message || 'Payment verification failed', { id: 'payment' })
          return false
        }

      } catch (error: any) {
        console.error('Payment error:', error)
        toast.error(error.message || 'Payment failed', { id: 'payment' })
        return false
      } finally {
        setLoading(false)
      }
    },
    [address, isConnected]
  )

  /**
   * Pay to view model details
   */
  const payToViewDetails = useCallback(
    async (modelId: number): Promise<boolean> => {
      return payForResource('model-details', modelId.toString(), '0.0001')
    },
    [payForResource]
  )

  /**
   * Pay for deposit (Real Investment into Vault)
   */
  const payForDeposit = useCallback(
    async (modelId: number, depositAmount: bigint): Promise<boolean> => {
      if (!isConnected || !address) {
        toast.error('Please connect your wallet')
        return false
      }

      setLoading(true)
      try {
        if (!window.ethereum) {
          toast.error('Please install MetaMask')
          return false
        }

        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()

        // Initialize Registry Contract
        const { CONTRACTS, REGISTRY_ABI } = await import('@/lib/contracts')
        const registry = new ethers.Contract(CONTRACTS.REGISTRY, REGISTRY_ABI, signer)

        toast.loading('Investing in Strategy Vault...', { id: 'invest' })

        // Execute Real On-Chain Deposit
        const tx = await registry.invest(modelId, {
          value: depositAmount
        })

        toast.loading('Waiting for confirmation...', { id: 'invest' })
        const receipt = await tx.wait()

        if (receipt.status === 1) {
          toast.success('Investment confirmed! Your funds are now managed by the agent.', { id: 'invest' })

          // Optional: Sync with backend for fast indexing
          try {
            await fetch(`${API_URL}/api/models/${modelId}/invest`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'x-wallet-address': address },
              body: JSON.stringify({ amount: ethers.formatEther(depositAmount), txHash: tx.hash })
            })
          } catch (e) { console.warn('Backend sync failed', e) }

          return true
        } else {
          toast.error('Transaction failed on-chain', { id: 'invest' })
          return false
        }

      } catch (error: any) {
        console.error('Investment error:', error)
        toast.error(error.reason || error.message || 'Investment failed', { id: 'invest' })
        return false
      } finally {
        setLoading(false)
      }
    },
    [address, isConnected]
  )

  /**
   * Withdraw from Vault (Real Withdrawal)
   */
  const withdrawFromVault = useCallback(
    async (modelId: number, amountOrShares: bigint): Promise<boolean> => {
      if (!isConnected || !address) {
        toast.error('Please connect your wallet')
        return false
      }

      setLoading(true)
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const { CONTRACTS, REGISTRY_ABI } = await import('@/lib/contracts')
        const registry = new ethers.Contract(CONTRACTS.REGISTRY, REGISTRY_ABI, signer)

        toast.loading('Withdrawing from Vault...', { id: 'withdraw' })

        // For now withdrawing all shares or specific amount logic:
        // Contract takes "sharesToBurn". If 0, it withdraws MAX.
        // We'll default to MAX for this demo if amount is 0
        const shares = amountOrShares // In a real app we'd convert Amount -> Shares via previewWithdraw

        const tx = await registry.withdraw(modelId, shares)

        toast.loading('Waiting for confirmation...', { id: 'withdraw' })
        await tx.wait()

        toast.success('Withdrawal successful! Funds returned to wallet.', { id: 'withdraw' })
        return true

      } catch (error: any) {
        console.error('Withdraw error:', error)
        toast.error(error.reason || error.message || 'Withdrawal failed', { id: 'withdraw' })
        return false
      } finally {
        setLoading(false)
      }
    },
    [address, isConnected]
  )

  /**
   * Pay for competition entry
   */
  const payForCompetitionEntry = useCallback(
    async (competitionId: number, modelId: number, entryFee: bigint): Promise<boolean> => {
      return payForResource('competition-entry', competitionId.toString(), '0.0005')
    },
    [payForResource]
  )

  /**
   * Check if user has paid for a resource
   */
  const checkPaymentStatus = useCallback(
    async (resourceType: string, resourceId: string): Promise<boolean> => {
      if (!address) return false

      try {
        const response = await fetch(
          `${API_URL}/api/payment/status/${resourceType}/${resourceId}`,
          {
            headers: {
              'x-wallet-address': address
            },
            credentials: 'include'
          }
        )

        const data = await response.json()
        return data.paid || false

      } catch (error) {
        console.error('Status check error:', error)
        return false
      }
    },
    [address]
  )

  /**
   * Fetch protected resource with automatic 402 handling
   */
  const fetchProtectedResource = useCallback(
    async (endpoint: string, resourceType: string, resourceId: string): Promise<any> => {
      if (!address) {
        throw new Error('Please connect your wallet')
      }

      try {
        const response = await fetch(`${API_URL}${endpoint}`, {
          headers: {
            'x-wallet-address': address
          },
          credentials: 'include'
        })

        // Handle 402 Payment Required
        if (response.status === 402) {
          const paymentInfo = await response.json()
          throw new Error(`Payment required: ${paymentInfo.message}`)
        }

        if (!response.ok) {
          throw new Error('Request failed')
        }

        return response.json()

      } catch (error: any) {
        console.error('Fetch error:', error)
        throw error
      }
    },
    [address]
  )

  /**
   * Get payment amounts (for display purposes)
   */
  const getPaymentAmounts = useCallback(async () => {
    return {
      viewDetails: ethers.parseEther('0.0001'),
      deposit: ethers.parseEther('0.0002'),
      competitionEntry: ethers.parseEther('0.0005')
    }
  }, [])

  return {
    payToViewDetails,
    payForDeposit,
    withdrawFromVault,
    payForCompetitionEntry,
    checkPaymentStatus,
    fetchProtectedResource,
    getPaymentAmounts,
    loading
  }
}
