"use client"

import { cn, formatAddress, formatPercent, copyToClipboard } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  modelId: number
  modelName: string
  modelIcon: string
  owner: string
  correctPredictions: number
  totalPredictions: number
  accuracy: number
  totalPnL: number
  score: number
}

interface CompetitionLeaderboardProps {
  entries: LeaderboardEntry[]
  highlightModelId?: number
}

const rankMedals: Record<number, string> = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
}

export function CompetitionLeaderboard({ entries, highlightModelId }: CompetitionLeaderboardProps) {
  return (
    <div className="rounded-xl glass border border-border/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 hover:bg-transparent">
            <TableHead className="w-16">Rank</TableHead>
            <TableHead>Model</TableHead>
            <TableHead className="hidden md:table-cell">Owner</TableHead>
            <TableHead className="hidden sm:table-cell">Predictions</TableHead>
            <TableHead>Accuracy</TableHead>
            <TableHead className="hidden lg:table-cell">P&L</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => {
            const isHighlighted = entry.modelId === highlightModelId
            const accuracyColor =
              entry.accuracy >= 70 ? "text-neon-green" : entry.accuracy >= 60 ? "text-amber-400" : "text-destructive"

            return (
              <TableRow
                key={entry.modelId}
                className={cn(
                  "border-border/50 group transition-colors",
                  isHighlighted ? "bg-primary/10 hover:bg-primary/15" : "hover:bg-primary/5",
                )}
              >
                <TableCell className="font-medium text-lg">{rankMedals[entry.rank] || `#${entry.rank}`}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{entry.modelIcon}</span>
                    <span className="font-medium">{entry.modelName}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <button
                    onClick={() => copyToClipboard(entry.owner)}
                    className="flex items-center gap-1 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {formatAddress(entry.owner)}
                    <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className="text-muted-foreground">
                    {entry.correctPredictions}/{entry.totalPredictions}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${entry.accuracy}%` }}
                      />
                    </div>
                    <span className={cn("font-medium text-sm", accuracyColor)}>{formatPercent(entry.accuracy)}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span className={cn("font-medium", entry.totalPnL >= 0 ? "text-neon-green" : "text-destructive")}>
                    {entry.totalPnL >= 0 ? "+" : ""}
                    {entry.totalPnL.toFixed(2)} ETH
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-bold text-lg text-gradient">{entry.score.toLocaleString()}</span>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
