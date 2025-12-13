"use client"

import { useState } from "react"
import Link from "next/link"
import { cn, formatAddress, formatPercent, copyToClipboard } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy, Search, ArrowUpDown, Zap } from "lucide-react"

interface LeaderboardModel {
  id: number
  name: string
  owner: string
  strategy: string
  accuracy: number
  totalInferences: number
  revenue: number
  subscribers: number
  icon: string
  latestSignal?: {
    action: "BUY" | "SELL" | "HOLD"
    asset: string
  }
}

interface LeaderboardTableProps {
  models: LeaderboardModel[]
  onRequestPrediction?: (modelId: number) => void
}

const rankMedals: Record<number, string> = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
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

export function LeaderboardTable({ models, onRequestPrediction }: LeaderboardTableProps) {
  const [search, setSearch] = useState("")
  const [strategyFilter, setStrategyFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"accuracy" | "inferences" | "revenue">("accuracy")

  const filteredModels = models
    .filter((model) => {
      const matchesSearch =
        model.name.toLowerCase().includes(search.toLowerCase()) ||
        model.owner.toLowerCase().includes(search.toLowerCase())
      const matchesStrategy = strategyFilter === "all" || model.strategy === strategyFilter
      return matchesSearch && matchesStrategy
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "accuracy":
          return b.accuracy - a.accuracy
        case "inferences":
          return b.totalInferences - a.totalInferences
        case "revenue":
          return b.revenue - a.revenue
        default:
          return 0
      }
    })

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search models..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-secondary/50 border-border/50"
          />
        </div>
        <Select value={strategyFilter} onValueChange={setStrategyFilter}>
          <SelectTrigger className="w-full sm:w-[180px] bg-secondary/50 border-border/50">
            <SelectValue placeholder="Strategy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Strategies</SelectItem>
            <SelectItem value="Momentum">Momentum</SelectItem>
            <SelectItem value="Mean Reversion">Mean Reversion</SelectItem>
            <SelectItem value="ML-Based">ML-Based</SelectItem>
            <SelectItem value="Breakout">Breakout</SelectItem>
            <SelectItem value="Arbitrage">Arbitrage</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
          <SelectTrigger className="w-full sm:w-[180px] bg-secondary/50 border-border/50">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="accuracy">Highest Accuracy</SelectItem>
            <SelectItem value="inferences">Most Inferences</SelectItem>
            <SelectItem value="revenue">Highest Revenue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-xl glass border border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Model</TableHead>
              <TableHead className="hidden md:table-cell">Owner</TableHead>
              <TableHead className="hidden lg:table-cell">Strategy</TableHead>
              <TableHead>Accuracy</TableHead>
              <TableHead className="hidden sm:table-cell">Inferences</TableHead>
              <TableHead className="hidden lg:table-cell">Revenue</TableHead>
              <TableHead className="hidden xl:table-cell">Signal</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredModels.map((model, index) => {
              const rank = index + 1
              const accuracyColor =
                model.accuracy >= 70 ? "text-neon-green" : model.accuracy >= 60 ? "text-amber-400" : "text-destructive"

              return (
                <TableRow key={model.id} className="border-border/50 group hover:bg-primary/5 transition-colors">
                  <TableCell className="font-medium">{rankMedals[rank] || `#${rank}`}</TableCell>
                  <TableCell>
                    <Link
                      href={`/model/${model.id}`}
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <span className="text-2xl">{model.icon}</span>
                      <span className="font-medium">{model.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <button
                      onClick={() => copyToClipboard(model.owner)}
                      className="flex items-center gap-1 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {formatAddress(model.owner)}
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant="outline" className={cn("text-xs", strategyColors[model.strategy])}>
                      {model.strategy}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                          style={{ width: `${model.accuracy}%` }}
                        />
                      </div>
                      <span className={cn("font-medium text-sm", accuracyColor)}>{formatPercent(model.accuracy)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="font-medium">{model.totalInferences.toLocaleString()}</span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="font-medium text-neon-green">{model.revenue.toFixed(2)} ETH</span>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    {model.latestSignal && (
                      <div className="flex items-center gap-2">
                        <Badge className={cn("text-xs", actionColors[model.latestSignal.action])}>
                          {model.latestSignal.action}
                        </Badge>
                        <span className="text-sm">{model.latestSignal.asset}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => onRequestPrediction?.(model.id)}
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-90 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Predict
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
