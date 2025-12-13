"use client"

import { formatEth } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, RefreshCw, XCircle, Zap } from "lucide-react"

interface SubscriptionCardProps {
  subscription: {
    modelId: number
    modelName: string
    modelIcon: string
    expiresAt: number
    signalsReceived: number
    monthlyPrice: bigint
    isExpiring: boolean
  }
  onRenew?: () => void
  onCancel?: () => void
}

export function SubscriptionCard({ subscription, onRenew, onCancel }: SubscriptionCardProps) {
  const daysUntilExpiry = Math.ceil((subscription.expiresAt - Date.now() / 1000) / 86400)

  return (
    <div className="p-5 rounded-xl glass border border-border/50 transition-all duration-300 hover:border-primary/50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{subscription.modelIcon}</span>
          <div>
            <p className="font-bold">{subscription.modelName}</p>
            <p className="text-xs text-muted-foreground">Model #{subscription.modelId}</p>
          </div>
        </div>
        {subscription.isExpiring && (
          <Badge variant="outline" className="text-xs bg-amber-500/20 text-amber-400 border-amber-500/30">
            Expiring Soon
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 rounded-lg bg-secondary/30">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Clock className="w-3 h-3" />
            Expires In
          </div>
          <p className="font-bold">{daysUntilExpiry > 0 ? `${daysUntilExpiry} days` : "Expired"}</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/30">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Zap className="w-3 h-3" />
            Signals Received
          </div>
          <p className="font-bold">{subscription.signalsReceived}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onRenew} className="flex-1 bg-transparent">
          <RefreshCw className="w-3 h-3 mr-1" />
          Renew ({formatEth(subscription.monthlyPrice)})
        </Button>
        <Button variant="ghost" size="sm" onClick={onCancel} className="text-muted-foreground hover:text-destructive">
          <XCircle className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
