"use client"

import { useState } from "react"
import { cn, formatTimeAgo } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"

interface Signal {
  id: number
  timestamp: number
  asset: string
  action: "BUY" | "SELL" | "HOLD"
  targetPrice: bigint
  stopLoss: bigint
  confidence: number
  isActive: boolean
  outcome: "profit" | "loss" | null
  pnl: number
}

interface SignalHistoryTableProps {
  signals: Signal[]
}

const actionColors: Record<string, string> = {
  BUY: "bg-neon-green/20 text-neon-green border-neon-green/30",
  SELL: "bg-destructive/20 text-destructive border-destructive/30",
  HOLD: "bg-muted text-muted-foreground border-muted",
}

const outcomeColors: Record<string, string> = {
  profit: "text-neon-green",
  loss: "text-destructive",
}

export function SignalHistoryTable({ signals }: SignalHistoryTableProps) {
  const [assetFilter, setAssetFilter] = useState<string>("all")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [page, setPage] = useState(1)
  const perPage = 10

  const filteredSignals = signals.filter((signal) => {
    const matchesAsset = assetFilter === "all" || signal.asset === assetFilter
    const matchesAction = actionFilter === "all" || signal.action === actionFilter
    return matchesAsset && matchesAction
  })

  const totalPages = Math.ceil(filteredSignals.length / perPage)
  const paginatedSignals = filteredSignals.slice((page - 1) * perPage, page * perPage)

  const uniqueAssets = [...new Set(signals.map((s) => s.asset))]

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={assetFilter} onValueChange={setAssetFilter}>
          <SelectTrigger className="w-full sm:w-[150px] bg-secondary/50 border-border/50">
            <SelectValue placeholder="All Assets" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assets</SelectItem>
            {uniqueAssets.map((asset) => (
              <SelectItem key={asset} value={asset}>
                {asset}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-full sm:w-[150px] bg-secondary/50 border-border/50">
            <SelectValue placeholder="All Actions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="BUY">BUY</SelectItem>
            <SelectItem value="SELL">SELL</SelectItem>
            <SelectItem value="HOLD">HOLD</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1" />
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl glass border border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead>Time</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="hidden md:table-cell">Target Price</TableHead>
              <TableHead className="hidden lg:table-cell">Stop Loss</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead className="hidden sm:table-cell">Outcome</TableHead>
              <TableHead className="text-right">P&L</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedSignals.map((signal) => (
              <TableRow key={signal.id} className="border-border/50 hover:bg-primary/5 transition-colors">
                <TableCell className="text-muted-foreground text-sm">{formatTimeAgo(signal.timestamp)}</TableCell>
                <TableCell className="font-medium">{signal.asset}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("text-xs", actionColors[signal.action])}>
                    {signal.action}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell font-mono text-sm">
                  ${(Number(signal.targetPrice) / 1e18).toFixed(2)}
                </TableCell>
                <TableCell className="hidden lg:table-cell font-mono text-sm">
                  ${(Number(signal.stopLoss) / 1e18).toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${signal.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm">{signal.confidence.toFixed(0)}%</span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {signal.outcome ? (
                    <Badge variant="outline" className={cn("text-xs capitalize", outcomeColors[signal.outcome])}>
                      {signal.outcome}
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">Pending</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {signal.outcome ? (
                    <span className={cn("font-medium", signal.pnl >= 0 ? "text-neon-green" : "text-destructive")}>
                      {signal.pnl >= 0 ? "+" : ""}
                      {signal.pnl.toFixed(2)}%
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {(page - 1) * perPage + 1}-{Math.min(page * perPage, filteredSignals.length)} of{" "}
          {filteredSignals.length}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm">
            Page {page} of {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
