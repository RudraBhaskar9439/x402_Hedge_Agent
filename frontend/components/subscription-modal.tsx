"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn, formatEth } from "@/lib/utils"
import { Check, Loader2, Sparkles } from "lucide-react"

interface SubscriptionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  modelName: string
  modelId: number
  monthlyPrice: bigint
  onSubmit: (months: number) => Promise<void>
}

const plans = [
  { months: 1, discount: 0, label: "1 Month" },
  { months: 3, discount: 5, label: "3 Months" },
  { months: 6, discount: 10, label: "6 Months" },
  { months: 12, discount: 15, label: "12 Months", popular: true },
]

export function SubscriptionModal({
  open,
  onOpenChange,
  modelName,
  modelId,
  monthlyPrice,
  onSubmit,
}: SubscriptionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onSubmit(selectedPlan)
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  const calculatePrice = (months: number, discount: number) => {
    const basePrice = Number(monthlyPrice) * months
    return BigInt(Math.floor(basePrice * (1 - discount / 100)))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-border/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Subscribe to Model
          </DialogTitle>
          <DialogDescription>
            Get unlimited access to signals from <span className="text-foreground font-medium">{modelName}</span> (#
            {modelId})
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3">
            {plans.map((plan) => {
              const price = calculatePrice(plan.months, plan.discount)
              const isSelected = selectedPlan === plan.months

              return (
                <button
                  key={plan.months}
                  type="button"
                  onClick={() => setSelectedPlan(plan.months)}
                  className={cn(
                    "relative p-4 rounded-lg border text-left transition-all duration-200",
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border/50 bg-secondary/30 hover:bg-secondary/50",
                  )}
                >
                  {plan.popular && (
                    <span className="absolute -top-2 right-4 px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-accent text-xs font-medium text-primary-foreground">
                      Best Value
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                          isSelected ? "border-primary bg-primary" : "border-muted-foreground",
                        )}
                      >
                        {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      <div>
                        <p className="font-medium">{plan.label}</p>
                        {plan.discount > 0 && <p className="text-xs text-neon-green">Save {plan.discount}%</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatEth(price)}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatEth(BigInt(Math.floor(Number(price) / plan.months)))}/mo
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
            <h4 className="font-medium mb-2">What you get:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-neon-green" />
                Unlimited trading signals
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-neon-green" />
                Real-time alerts
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-neon-green" />
                Priority support
              </li>
            </ul>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Subscribe Now
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
