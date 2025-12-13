"use client"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "relative group p-6 rounded-xl glass border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
        className,
      )}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {trend && (
            <p
              className={cn(
                "text-sm mt-1 flex items-center gap-1",
                trend.isPositive ? "text-neon-green" : "text-destructive",
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              <span className="text-muted-foreground">vs last week</span>
            </p>
          )}
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  )
}
