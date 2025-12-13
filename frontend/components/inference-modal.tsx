"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatEth } from "@/lib/utils"
import { Zap, Loader2 } from "lucide-react"

interface InferenceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  modelName: string
  modelId: number
  inferencePrice: bigint
  onSubmit: (data: { asset: string; price: string }) => Promise<void>
}

const assets = ["ETH", "BTC", "SOL", "AVAX", "MATIC", "ARB"]

export function InferenceModal({
  open,
  onOpenChange,
  modelName,
  modelId,
  inferencePrice,
  onSubmit,
}: InferenceModalProps) {
  const [asset, setAsset] = useState("ETH")
  const [price, setPrice] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onSubmit({ asset, price })
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Request Prediction
          </DialogTitle>
          <DialogDescription>
            Request an inference from <span className="text-foreground font-medium">{modelName}</span> (#{modelId})
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="asset">Asset</Label>
            <Select value={asset} onValueChange={setAsset}>
              <SelectTrigger className="bg-secondary/50 border-border/50">
                <SelectValue placeholder="Select asset" />
              </SelectTrigger>
              <SelectContent>
                {assets.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Current Price (USD)</Label>
            <Input
              id="price"
              type="number"
              placeholder="e.g., 3500.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-secondary/50 border-border/50"
              required
            />
          </div>

          <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Inference Cost</span>
              <span className="font-bold text-gradient">{formatEth(inferencePrice)}</span>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !price}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
