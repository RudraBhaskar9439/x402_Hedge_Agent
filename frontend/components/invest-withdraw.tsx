"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatEth } from "@/lib/utils"

interface InvestWithdrawProps {
  modelId: number
  invested: number
  onInvest: (amount: number) => Promise<void>
  onWithdraw: (amount: number) => Promise<void>
  streamingRate: number
  lastInvestTimestamp: number
}

export function InvestWithdraw({ modelId, invested, onInvest, onWithdraw, streamingRate, lastInvestTimestamp }: InvestWithdrawProps) {
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [action, setAction] = useState<"invest" | "withdraw">("invest")

  // Calculate streaming fee estimate
  const now = Math.floor(Date.now() / 1000)
  const timeElapsed = invested > 0 ? now - lastInvestTimestamp : 0
  const streamingFee = invested > 0 ? (streamingRate * timeElapsed * Number(amount || 0) / invested) : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (action === "invest") {
        // Start x402 stream
        await fetch("/api/x402/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ modelId, amount: Number(amount) })
        })
        await onInvest(Number(amount))
      } else {
        // Stop x402 stream
        await fetch("/api/x402/stop", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ modelId })
        })
        await onWithdraw(Number(amount))
      }
      setAmount("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <Button type="button" variant={action === "invest" ? "default" : "outline"} onClick={() => setAction("invest")}>Invest</Button>
        <Button type="button" variant={action === "withdraw" ? "default" : "outline"} onClick={() => setAction("withdraw")}>Withdraw</Button>
      </div>
      <Input
        type="number"
        min="0"
        step="0.0001"
        placeholder={action === "invest" ? "Amount to invest (ETH)" : "Amount to withdraw (ETH)"}
        value={amount}
        onChange={e => setAmount(e.target.value)}
        disabled={loading}
      />
      {action === "withdraw" && invested > 0 && (
        <div className="text-xs text-muted-foreground">
          Estimated streaming fee: <span className="font-mono">{formatEth(BigInt(Math.floor(streamingFee)))}</span> ETH
        </div>
      )}
      <Button type="submit" className="w-full" disabled={loading || !amount || Number(amount) <= 0}>
        {loading ? "Processing..." : action === "invest" ? "Invest" : "Withdraw"}
      </Button>
      <div className="text-xs text-muted-foreground mt-2">
        Invested: <span className="font-mono">{formatEth(BigInt(invested))}</span> ETH
        {invested > 0 && (
          <span> | Duration: {timeElapsed}s</span>
        )}
      </div>
    </form>
  )
}
