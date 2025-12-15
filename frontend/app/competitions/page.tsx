"use client"

import { Card } from "@/components/ui/card"
import { Trophy } from "lucide-react"

export default function CompetitionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse">
          <Trophy className="w-12 h-12 text-primary" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-4">Competitions</h1>

        <p className="text-xl text-muted-foreground max-w-md mb-8">
          The Trading Competitions feature is currently under development.
          Soon you'll be able to compete with other investors and models for prize pools!
        </p>

        <Card className="p-6 bg-muted/50 border-dashed">
          <p className="font-mono text-sm text-muted-foreground">Status: Coming Soon</p>
        </Card>
      </div>
    </div>
  )
}
