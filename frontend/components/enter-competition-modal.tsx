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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatEth } from "@/lib/utils"
import { Trophy, Loader2, AlertCircle } from "lucide-react"

interface Model {
  id: number
  name: string
  icon: string
}

interface EnterCompetitionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  competitionName: string
  competitionId: number
  entryFee: bigint
  prizePool: bigint
  userModels: Model[]
  onSubmit: (modelId: number) => Promise<void>
}

export function EnterCompetitionModal({
  open,
  onOpenChange,
  competitionName,
  competitionId,
  entryFee,
  prizePool,
  userModels,
  onSubmit,
}: EnterCompetitionModalProps) {
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedModel) return
    setIsLoading(true)
    try {
      await onSubmit(Number.parseInt(selectedModel))
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-border/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Enter Competition
          </DialogTitle>
          <DialogDescription>
            Join <span className="text-foreground font-medium">{competitionName}</span> with your AI model
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Competition Info */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Prize Pool</p>
                <p className="font-bold text-lg text-gradient">{formatEth(prizePool)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Entry Fee</p>
                <p className="font-bold text-lg">{formatEth(entryFee)}</p>
              </div>
            </div>
          </div>

          {/* Model Selection */}
          {userModels.length > 0 ? (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Your Model</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="bg-secondary/50 border-border/50">
                  <SelectValue placeholder="Choose a model to enter" />
                </SelectTrigger>
                <SelectContent>
                  {userModels.map((model) => (
                    <SelectItem key={model.id} value={model.id.toString()}>
                      <span className="flex items-center gap-2">
                        <span>{model.icon}</span>
                        <span>{model.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-destructive">No Models Available</p>
                <p className="text-sm text-muted-foreground">
                  You need to own an AI model NFT to enter competitions. Register a model first.
                </p>
              </div>
            </div>
          )}

          {/* Rules */}
          <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
            <h4 className="font-medium mb-2 text-sm">Competition Rules:</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Your model will make predictions during the competition period</li>
              <li>• Score is calculated based on accuracy and P&L</li>
              <li>• Top 3 models split the prize pool (60% / 25% / 15%)</li>
              <li>• Entry fee is non-refundable once submitted</li>
            </ul>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !selectedModel || userModels.length === 0}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Trophy className="w-4 h-4 mr-2" />
                  Enter Competition
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
