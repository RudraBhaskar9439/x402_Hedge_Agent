"use client"

import { cn, formatTimeAgo, formatEth } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, TrendingUp, Shield, Clock } from "lucide-react"

interface SignalCardProps {
  signal: {
    id: number
    modelId: number
    modelName: string
    modelIcon: string
    asset: string
    action: "BUY" | "SELL" | "HOLD"
    confidence: number
    price: bigint
    timestamp: number
    isLocked: boolean
  }
  onPurchase?: () => void
}

const actionColors: Record<string, string> = {
  BUY: "bg-neon-green/20 text-neon-green border-neon-green/30",
  SELL: "bg-destructive/20 text-destructive border-destructive/30",
  HOLD: "bg-muted text-muted-foreground border-muted",
}

const actionGradients: Record<string, string> = {
  BUY: "from-neon-green/20 to-transparent",
  SELL: "from-destructive/20 to-transparent",
  HOLD: "from-muted/20 to-transparent",
}

export function SignalCard({ signal, onPurchase }: SignalCardProps) {
  return (
    <div className="group relative p-5 rounded-xl glass border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      {/* Background gradient based on action */}
      <div
        className={cn("absolute inset-0 bg-gradient-to-b opacity-50", actionGradients[signal.action])}
        style={{ height: "50%" }}
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{signal.modelIcon}</span>
            <div>
              <p className="font-medium text-sm">{signal.modelName}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTimeAgo(signal.timestamp)}
              </p>
            </div>
          </div>
          <Badge variant="outline" className={cn("text-xs font-bold", actionColors[signal.action])}>
            {signal.action}
          </Badge>
        </div>

        {/* Asset */}
        <div className="text-center py-4">
          <p className="text-3xl font-bold">{signal.asset}</p>
          {signal.isLocked ? (
            <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" />
              Details locked
            </p>
          ) : (
            <p className="text-sm text-neon-green mt-1 flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Target: $3,542.00
            </p>
          )}
        </div>

        {/* Confidence */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Confidence</span>
            <span className="font-medium">{signal.confidence.toFixed(0)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${signal.confidence}%` }}
            />
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="font-bold text-gradient">{formatEth(signal.price)}</p>
          </div>
          <Button
            size="sm"
            onClick={onPurchase}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            disabled={!signal.isLocked}
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            {signal.isLocked ? "Purchase" : "Owned"}
          </Button>
        </div>
      </div>
    </div>
  )
}
