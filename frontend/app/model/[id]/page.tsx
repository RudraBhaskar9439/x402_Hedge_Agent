"use client"

import { useState, use } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { PerformanceChart } from "@/components/performance-chart"
import { SignalHistoryTable } from "@/components/signal-history-table"
import { InferenceModal } from "@/components/inference-modal"
import { SubscriptionModal } from "@/components/subscription-modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  generateMockModels,
  generateMockSignals,
  formatAddress,
  formatEth,
  formatPercent,
  cn,
  copyToClipboard,
} from "@/lib/utils"
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  TrendingUp,
  TrendingDown,
  Zap,
  Users,
  DollarSign,
  Target,
  ShoppingCart,
} from "lucide-react"
import toast from "react-hot-toast"

const strategyColors: Record<string, string> = {
  Momentum: "bg-neon-blue/20 text-neon-blue border-neon-blue/30",
  "Mean Reversion": "bg-neon-purple/20 text-neon-purple border-neon-purple/30",
  "ML-Based": "bg-neon-pink/20 text-neon-pink border-neon-pink/30",
  Breakout: "bg-neon-green/20 text-neon-green border-neon-green/30",
  Arbitrage: "bg-amber-500/20 text-amber-400 border-amber-500/30",
}

// Generate chart data
function generateChartData() {
  const data = []
  const now = Date.now()
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000)
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      accuracy: 60 + Math.random() * 30 + (30 - i) * 0.3,
      pnl: (Math.random() - 0.3) * 5 + i * 0.2,
    })
  }
  return data
}

export default function ModelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const modelId = Number.parseInt(resolvedParams.id)
  const [model] = useState(() => generateMockModels(15).find((m) => m.id === modelId) || generateMockModels(1)[0])
  const [signals] = useState(() => generateMockSignals(50))
  const [chartData] = useState(generateChartData)
  const [isInferenceModalOpen, setIsInferenceModalOpen] = useState(false)
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false)

  // Simulated metrics
  const [metrics] = useState({
    correctPredictions: Math.floor(model.totalInferences * (model.accuracy / 100)),
    totalPredictions: model.totalInferences,
    totalPnL: model.revenue * 0.8,
    totalRevenue: model.revenue,
    trend: Math.random() > 0.5 ? "up" : "down",
    trendValue: (Math.random() * 5).toFixed(1),
    subscribers: model.subscribers,
    monthlyPrice: BigInt(Math.floor(0.1 * 1e18)),
    signalPrice: BigInt(Math.floor(0.01 * 1e18)),
  })

  const handleInferenceSubmit = async (data: { asset: string; price: string }) => {
    toast.loading("Submitting inference request...")
    await new Promise((resolve) => setTimeout(resolve, 2000))
    toast.dismiss()
    toast.success("Inference request submitted successfully!")
  }

  const handleSubscriptionSubmit = async (months: number) => {
    toast.loading("Processing subscription...")
    await new Promise((resolve) => setTimeout(resolve, 2000))
    toast.dismiss()
    toast.success(`Subscribed for ${months} month${months > 1 ? "s" : ""}!`)
  }

  const accuracyColor =
    model.accuracy >= 70 ? "text-neon-green" : model.accuracy >= 60 ? "text-amber-400" : "text-destructive"

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link
            href="/models"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Models
          </Link>

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            {/* Model Info */}
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-6xl animate-float">{model.icon}</div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{model.name}</h1>
                    <Badge variant="outline" className={cn("text-sm", strategyColors[model.strategy])}>
                      {model.strategy}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">NFT #{model.id}</span>
                    <button
                      onClick={() => copyToClipboard(model.owner)}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      <span className="font-mono">{formatAddress(model.owner)}</span>
                      <Copy className="w-3 h-3" />
                    </button>
                    <a
                      href={`https://sepolia.basescan.org/address/${model.owner}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      View on BaseScan
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => setIsInferenceModalOpen(true)}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Request Prediction
                </Button>
                <Button
                  onClick={() => setIsSubscriptionModalOpen(true)}
                  variant="outline"
                  className="gradient-border bg-transparent"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Accuracy Ring */}
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-secondary"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#gradientLarge)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${model.accuracy * 4.4} 440`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradientLarge" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={cn("text-4xl font-bold", accuracyColor)}>{formatPercent(model.accuracy)}</span>
                  <span className="text-sm text-muted-foreground">Accuracy</span>
                  <span
                    className={cn(
                      "text-xs flex items-center gap-1 mt-1",
                      metrics.trend === "up" ? "text-neon-green" : "text-destructive",
                    )}
                  >
                    {metrics.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {metrics.trendValue}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-6 rounded-xl glass border border-border/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Accuracy</span>
              </div>
              <p className="text-2xl font-bold">{formatPercent(model.accuracy)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.correctPredictions.toLocaleString()} / {metrics.totalPredictions.toLocaleString()} correct
              </p>
            </div>

            <div className="p-6 rounded-xl glass border border-border/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-neon-green/20">
                  <DollarSign className="w-5 h-5 text-neon-green" />
                </div>
                <span className="text-sm text-muted-foreground">Revenue</span>
              </div>
              <p className="text-2xl font-bold text-neon-green">{metrics.totalRevenue.toFixed(2)} ETH</p>
              <p className="text-xs text-muted-foreground mt-1">Total earnings</p>
            </div>

            <div className="p-6 rounded-xl glass border border-border/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-accent/20">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm text-muted-foreground">Inferences</span>
              </div>
              <p className="text-2xl font-bold">{model.totalInferences.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Total predictions</p>
            </div>

            <div className="p-6 rounded-xl glass border border-border/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-neon-blue/20">
                  <Users className="w-5 h-5 text-neon-blue" />
                </div>
                <span className="text-sm text-muted-foreground">Subscribers</span>
              </div>
              <p className="text-2xl font-bold">{metrics.subscribers.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Active subscribers</p>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Performance History</h2>
            <PerformanceChart data={chartData} />
          </div>

          {/* Subscription Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-xl glass border border-border/50">
              <h3 className="font-bold text-lg mb-4">Monthly Subscription</h3>
              <p className="text-3xl font-bold text-gradient mb-2">{formatEth(metrics.monthlyPrice)}</p>
              <p className="text-sm text-muted-foreground mb-4">per month</p>
              <ul className="space-y-2 mb-4 text-sm">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                  Unlimited trading signals
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                  Real-time notifications
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                  Priority support
                </li>
              </ul>
              <Button
                onClick={() => setIsSubscriptionModalOpen(true)}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                Subscribe Now
              </Button>
            </div>

            <div className="p-6 rounded-xl glass border border-border/50">
              <h3 className="font-bold text-lg mb-4">Pay Per Signal</h3>
              <p className="text-3xl font-bold text-gradient mb-2">{formatEth(metrics.signalPrice)}</p>
              <p className="text-sm text-muted-foreground mb-4">per signal</p>
              <div className="p-4 rounded-lg bg-secondary/30 mb-4">
                <p className="text-xs text-muted-foreground mb-2">Latest Signal Preview</p>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{model.latestSignal?.asset || "ETH"}</span>
                  <Badge
                    className={cn(
                      "text-xs",
                      model.latestSignal?.action === "BUY"
                        ? "bg-neon-green/20 text-neon-green"
                        : model.latestSignal?.action === "SELL"
                          ? "bg-destructive/20 text-destructive"
                          : "bg-muted text-muted-foreground",
                    )}
                  >
                    {model.latestSignal?.action || "HOLD"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Full details locked - purchase to unlock</p>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Purchase Signal
              </Button>
            </div>
          </div>

          {/* Signal History */}
          <div>
            <h2 className="text-xl font-bold mb-4">Signal History</h2>
            <SignalHistoryTable signals={signals} />
          </div>
        </div>
      </main>

      <Footer />

      {/* Modals */}
      <InferenceModal
        open={isInferenceModalOpen}
        onOpenChange={setIsInferenceModalOpen}
        modelName={model.name}
        modelId={model.id}
        inferencePrice={model.inferencePrice}
        onSubmit={handleInferenceSubmit}
      />

      <SubscriptionModal
        open={isSubscriptionModalOpen}
        onOpenChange={setIsSubscriptionModalOpen}
        modelName={model.name}
        modelId={model.id}
        monthlyPrice={metrics.monthlyPrice}
        onSubmit={handleSubscriptionSubmit}
      />
    </div>
  )
}
