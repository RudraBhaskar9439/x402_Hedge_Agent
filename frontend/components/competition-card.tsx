"use client"

import { useEffect, useState } from "react"
import { cn, formatEth } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Clock, Coins } from "lucide-react"

interface CompetitionCardProps {
  competition: {
    id: number
    name: string
    startTime: number
    endTime: number
    prizePool: bigint
    entryFee: bigint
    participants: number
    status: "upcoming" | "active" | "ended"
  }
  onEnter?: () => void
  onViewLeaderboard?: () => void
}

const statusColors: Record<string, string> = {
  upcoming: "bg-neon-blue/20 text-neon-blue border-neon-blue/30",
  active: "bg-neon-green/20 text-neon-green border-neon-green/30",
  ended: "bg-muted text-muted-foreground border-muted",
}

export function CompetitionCard({ competition, onEnter, onViewLeaderboard }: CompetitionCardProps) {
  const [timeRemaining, setTimeRemaining] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = Date.now() / 1000
      const targetTime = competition.status === "upcoming" ? competition.startTime : competition.endTime
      const diff = targetTime - now

      if (diff <= 0) {
        setTimeRemaining(competition.status === "upcoming" ? "Starting soon..." : "Ended")
        return
      }

      const days = Math.floor(diff / 86400)
      const hours = Math.floor((diff % 86400) / 3600)
      const minutes = Math.floor((diff % 3600) / 60)
      const seconds = Math.floor(diff % 60)

      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h ${minutes}m`)
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`)
      } else {
        setTimeRemaining(`${minutes}m ${seconds}s`)
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [competition])

  return (
    <div className="group relative p-6 rounded-xl glass border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{competition.name}</h3>
              <Badge variant="outline" className={cn("text-xs mt-1", statusColors[competition.status])}>
                {competition.status === "upcoming" ? "Upcoming" : competition.status === "active" ? "Live" : "Ended"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Prize Pool */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 mb-4">
          <p className="text-sm text-muted-foreground mb-1">Prize Pool</p>
          <p className="text-3xl font-bold text-gradient">{formatEth(competition.prizePool)}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 rounded-lg bg-secondary/30">
            <Clock className="w-4 h-4 mx-auto mb-1 text-primary" />
            <p className="text-sm font-semibold">{timeRemaining}</p>
            <p className="text-xs text-muted-foreground">
              {competition.status === "upcoming" ? "Until Start" : "Remaining"}
            </p>
          </div>
          <div className="text-center p-2 rounded-lg bg-secondary/30">
            <Users className="w-4 h-4 mx-auto mb-1 text-accent" />
            <p className="text-sm font-semibold">{competition.participants}</p>
            <p className="text-xs text-muted-foreground">Participants</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-secondary/30">
            <Coins className="w-4 h-4 mx-auto mb-1 text-neon-green" />
            <p className="text-sm font-semibold">{formatEth(competition.entryFee)}</p>
            <p className="text-xs text-muted-foreground">Entry Fee</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {competition.status !== "ended" && (
            <Button onClick={onEnter} className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Enter Now
            </Button>
          )}
          <Button
            variant="outline"
            onClick={onViewLeaderboard}
            className={cn(competition.status === "ended" && "flex-1")}
          >
            View Leaderboard
          </Button>
        </div>
      </div>
    </div>
  )
}
