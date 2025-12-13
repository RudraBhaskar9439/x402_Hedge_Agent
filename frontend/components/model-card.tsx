"use client"

import Link from "next/link"
import { cn, formatEth, formatPercent } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Zap, TrendingUp, ExternalLink } from "lucide-react"
import { InvestWithdraw } from "@/components/invest-withdraw"
import { useEffect, useState } from "react"
import { CONTRACTS, REGISTRY_ABI } from "@/lib/contracts"
import { BrowserProvider, Contract, formatEther } from "ethers"
import { useWallet } from "@/hooks/use-wallet"

interface ModelCardProps {
  model: {
    id: number
    name: string
    owner: string
    strategy: string
    accuracy: number
    totalInferences: number
    revenue: number
    subscribers: number
    icon: string
    inferencePrice: bigint
    latestSignal?: {
      action: "BUY" | "SELL" | "HOLD"
      asset: string
    }
  }
}

const strategyColors: Record<string, string> = {
  Momentum: "bg-neon-blue/20 text-neon-blue border-neon-blue/30",
  "Mean Reversion": "bg-neon-purple/20 text-neon-purple border-neon-purple/30",
  "ML-Based": "bg-neon-pink/20 text-neon-pink border-neon-pink/30",
  Breakout: "bg-neon-green/20 text-neon-green border-neon-green/30",
  Arbitrage: "bg-amber-500/20 text-amber-400 border-amber-500/30",
}

const actionColors: Record<string, string> = {
  BUY: "bg-neon-green/20 text-neon-green",
  SELL: "bg-destructive/20 text-destructive",
  HOLD: "bg-muted text-muted-foreground",
}

export function ModelCard({ model }: ModelCardProps) {
  const accuracyColor =
    model.accuracy >= 70 ? "text-neon-green" : model.accuracy >= 60 ? "text-amber-400" : "text-destructive"

  // Only run client-side code after mount
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  // Wallet connection
  const { address, connect } = useWallet()
  const [invested, setInvested] = useState(0)
  const [streamingRate, setStreamingRate] = useState(1e15)
  const [lastInvestTimestamp, setLastInvestTimestamp] = useState(Math.floor(Date.now() / 1000) - 3600)
  const [loading, setLoading] = useState(false)

  // Helper to get provider safely
  function getProvider() {
    if (typeof window !== "undefined" && window.ethereum) {
      return new BrowserProvider(window.ethereum as any)
    }
    throw new Error("No Ethereum provider found")
  }

  // Fetch live investment data for this user/model
  useEffect(() => {
    async function fetchInvestment() {
      if (!address) return
      try {
        const provider = getProvider()
        const registry = new Contract(CONTRACTS.REGISTRY, REGISTRY_ABI, provider)
        // Replace with actual investment mapping call if exposed in ABI
        // Example: investments(model.id, address) returns (amount, lastInvestTimestamp)
        const result = await registry.investments(model.id, address)
        setInvested(Number(formatEther(result.amount)))
        setLastInvestTimestamp(Number(result.lastInvestTimestamp))
        // Optionally fetch streamingRate from model info
        const info = await registry.getModelInfo(model.id)
        setStreamingRate(Number(info.streamingRate))
      } catch (err) {
        // fallback to mock
        setInvested(0)
        setLastInvestTimestamp(Math.floor(Date.now() / 1000) - 3600)
        setStreamingRate(1e15)
      }
    }
    fetchInvestment()
  }, [address, model.id])

  async function handleInvest(amount: number) {
    if (!address) {
      await connect()
    }
    setLoading(true)
    try {
      const provider = getProvider()
      const signer = await provider.getSigner()
      const registry = new Contract(CONTRACTS.REGISTRY, REGISTRY_ABI, signer)
      const tx = await registry.invest(model.id, { value: BigInt(Math.floor(amount * 1e18)) })
      await tx.wait()
      // Refresh investment info
      const result = await registry.investments(model.id, address)
      setInvested(Number(formatEther(result.amount)))
      setLastInvestTimestamp(Number(result.lastInvestTimestamp))
    } finally {
      setLoading(false)
    }
  }

  async function handleWithdraw(amount: number) {
    if (!address) {
      await connect()
    }
    setLoading(true)
    try {
      const provider = getProvider()
      const signer = await provider.getSigner()
      const registry = new Contract(CONTRACTS.REGISTRY, REGISTRY_ABI, signer)
      const tx = await registry.withdraw(model.id, BigInt(Math.floor(amount * 1e18)))
      await tx.wait()
      // Refresh investment info
      const result = await registry.investments(model.id, address)
      setInvested(Number(formatEther(result.amount)))
      setLastInvestTimestamp(Number(result.lastInvestTimestamp))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="group relative p-6 rounded-xl glass border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{model.icon}</div>
            <div>
              <h3 className="font-bold text-lg">{model.name}</h3>
              <p className="text-xs text-muted-foreground font-mono">{model.owner}</p>
            </div>
          </div>
          <Badge variant="outline" className={cn("text-xs", strategyColors[model.strategy])}>
            {model.strategy}
          </Badge>
        </div>

        {/* Accuracy Ring */}
        <div className="flex items-center justify-center my-6">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-secondary"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${model.accuracy * 2.51} 251`}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("text-2xl font-bold", accuracyColor)}>{formatPercent(model.accuracy)}</span>
              <span className="text-xs text-muted-foreground">Accuracy</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 rounded-lg bg-secondary/30">
            <Zap className="w-4 h-4 mx-auto mb-1 text-primary" />
            <p className="text-sm font-semibold">{model.totalInferences.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Inferences</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-secondary/30">
            <TrendingUp className="w-4 h-4 mx-auto mb-1 text-neon-green" />
            <p className="text-sm font-semibold">{model.revenue.toFixed(2)} ETH</p>
            <p className="text-xs text-muted-foreground">Revenue</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-secondary/30">
            <Users className="w-4 h-4 mx-auto mb-1 text-accent" />
            <p className="text-sm font-semibold">{model.subscribers}</p>
            <p className="text-xs text-muted-foreground">Subscribers</p>
          </div>
        </div>

        {/* Latest Signal */}
        {model.latestSignal && (
          <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 mb-4">
            <span className="text-xs text-muted-foreground">Latest Signal</span>
            <div className="flex items-center gap-2">
              <Badge className={cn("text-xs", actionColors[model.latestSignal.action])}>
                {model.latestSignal.action}
              </Badge>
              <span className="text-sm font-medium">{model.latestSignal.asset}</span>
            </div>
          </div>
        )}

        {/* Price */}
        <p className="text-center text-sm text-muted-foreground mb-4">
          Inference Price: <span className="text-foreground font-medium">{formatEth(model.inferencePrice)}</span>
        </p>

        {/* Actions */}
        <div className="flex gap-2 mb-4">
          <Button asChild variant="outline" className="flex-1 group/btn bg-transparent">
            <Link href={`/model/${model.id}`}>
              View Details
              <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </Link>
          </Button>
        </div>
        {/* Invest/Withdraw UI - only render after mount to avoid SSR mismatch */}
        {mounted && (
          <InvestWithdraw
            modelId={model.id}
            invested={0}
            onInvest={async () => {}}
            onWithdraw={async () => {}}
            streamingRate={1e15}
            lastInvestTimestamp={Math.floor(Date.now() / 1000) - 3600}
          />
        )}
      </div>
    </div>
  )
}
