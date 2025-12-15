"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { StatCard } from "@/components/stat-card"
import { LeaderboardTable } from "@/components/leaderboard-table"
import { InferenceModal } from "@/components/inference-modal"
import { generateMockModels, formatNumber } from "@/lib/utils"
import { Brain, Zap, DollarSign, ArrowRight, Wallet, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import toast from "react-hot-toast"
import { useWallet } from "@/hooks/use-wallet"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface PortfolioSummary {
  totalInvested: number
  totalInferences: number
  activeInvestments: number
  unlockedModels: number
}

interface PortfolioData {
  summary: PortfolioSummary
  investments: any[]
  payments: any[]
}

export default function DashboardPage() {
  const { address, isConnected } = useWallet()
  const [models, setModels] = useState(generateMockModels(10))
  const [selectedModel, setSelectedModel] = useState<number | null>(null)
  const [isInferenceModalOpen, setIsInferenceModalOpen] = useState(false)
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setModels((prev) =>
        prev.map((model) => ({
          ...model,
          totalInferences: model.totalInferences + Math.floor(Math.random() * 3),
          accuracy: Math.max(50, Math.min(99, model.accuracy + (Math.random() - 0.5) * 0.5)),
        })),
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Fetch user portfolio
  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!isConnected || !address) return

      try {
        const response = await fetch(`${API_URL}/api/models/user/portfolio`, {
          headers: {
            'x-wallet-address': address
          }
        })
        const data = await response.json()
        if (data.summary) {
          setPortfolioData(data)
        }
      } catch (error) {
        console.error("Failed to fetch portfolio", error)
      }
    }

    fetchPortfolio()
  }, [isConnected, address])

  const handleRequestPrediction = (modelId: number) => {
    setSelectedModel(modelId)
    setIsInferenceModalOpen(true)
  }

  const handleInferenceSubmit = async (data: { asset: string; price: string }) => {
    toast.loading("Submitting inference request...")
    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))
    toast.dismiss()
    toast.success("Inference request submitted successfully!")
    console.log("Inference request:", { modelId: selectedModel, ...data })
  }

  const selectedModelData = models.find((m) => m.id === selectedModel)

  // Calculate stats
  const totalModels = models.length
  const totalInferences = models.reduce((acc, m) => acc + m.totalInferences, 0)
  const totalVolume = models.reduce((acc, m) => acc + m.revenue, 0)

  // Destructure portfolio data for easier access
  const portfolio = portfolioData?.summary
  const investments = portfolioData?.investments || []
  const payments = portfolioData?.payments || []

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-gradient">OffChain</span> <span className="text-foreground">AI Trading Bot</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-balance">
                Invest in AI trading models and pay for premium signals using HTTP 402 Micropayments.
                Seamless, fast, and verified on-chain.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90" asChild>
                  <Link href="/models">
                    Explore Models
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gradient-border bg-transparent" asChild>
                  <Link href="/competitions">Competitions</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                  title="Total AI Models"
                  value={totalModels}
                  icon={Brain}
                  trend={{ value: 12.5, isPositive: true }}
                />
                <StatCard
                  title="Total Inferences"
                  value={formatNumber(totalInferences)}
                  icon={Zap}
                  trend={{ value: 24.3, isPositive: true }}
                />
                <StatCard
                  title="Total Volume"
                  value={`${totalVolume.toFixed(2)} ETH`}
                  icon={DollarSign}
                  trend={{ value: 18.7, isPositive: true }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* User Portfolio Section */}
        {isConnected && portfolio && (
          <section className="py-8 bg-muted/30 border-y border-border/50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  {/* Header */}
                  <div className="p-6 border-b border-border bg-muted/40">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-primary" />
                      My Investor Dashboard
                    </h2>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-border">
                    <div className="p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Total Invested</p>
                      <p className="text-2xl font-bold">{portfolio.totalInvested.toFixed(4)} ETH</p>
                    </div>
                    <div className="p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Est. Profit (Simulated)</p>
                      <p className="text-2xl font-bold text-green-500">
                        +{(portfolio.totalInvested * 0.124).toFixed(4)} ETH
                        <span className="text-xs ml-2 bg-green-500/10 px-2 py-0.5 rounded-full">+12.4%</span>
                      </p>
                    </div>
                    <div className="p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Unlocked Content</p>
                      <p className="text-2xl font-bold">{portfolio.unlockedModels} <span className="text-sm font-normal text-muted-foreground">Models</span></p>
                    </div>
                  </div>

                  {/* lists */}
                  <div className="bg-muted/10 p-6 border-t border-border">
                    <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Purchase History</h3>

                    {/* Investments List */}
                    {investments.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <DollarSign className="w-4 h-4" /> Active Investments
                        </h4>
                        <div className="space-y-2">
                          {investments.map((inv: any, i: number) => (
                            <div key={i} className="flex justify-between items-center text-sm p-3 bg-background rounded-lg border border-border">
                              <span>Model #{inv.modelId} Investment</span>
                              <span className="font-mono">{inv.amount} ETH</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Payments List */}
                    {payments.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <Lock className="w-4 h-4" /> Unlocked Inferences
                        </h4>
                        <div className="space-y-2">
                          {payments.map((pay: any, i: number) => (
                            <div key={i} className="flex justify-between items-center text-sm p-3 bg-background rounded-lg border border-border">
                              <div className="flex flex-col">
                                <span>Premium Access: Model #{pay.resourceId}</span>
                                <span className="text-xs text-muted-foreground">{new Date(pay.timestamp).toLocaleDateString()}</span>
                              </div>
                              <span className="font-mono text-green-500">Paid</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {investments.length === 0 && payments.length === 0 && (
                      <p className="text-center text-muted-foreground text-sm py-4">
                        No activity yet. Start by unlocking a model or investing!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Leaderboard Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Live AI Model Leaderboard</h2>
                <p className="text-muted-foreground">Top performing AI models ranked by accuracy</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/models">
                  View All Models
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <LeaderboardTable models={models} onRequestPrediction={handleRequestPrediction} />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-2">How It Works</h2>
              <p className="text-muted-foreground">New Era of AI Investment with Off-Chain Micropayments</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Select a Model",
                  description:
                    "Browse top-performing AI trading models with verified track records on the leaderboard.",
                  icon: "🤖",
                },
                {
                  title: "Pay & Unlock",
                  description:
                    "Use ETH micropayments to instantly unlock premium signals and model details via HTTP 402.",
                  icon: "🔓",
                },
                {
                  title: "Invest & Earn",
                  description:
                    "Invest directly in high-performing models and earn returns based on their trading performance.",
                  icon: "📈",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl glass border border-border/50 text-center hover:border-primary/50 transition-colors"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Inference Modal */}
      {selectedModelData && (
        <InferenceModal
          open={isInferenceModalOpen}
          onOpenChange={setIsInferenceModalOpen}
          modelName={selectedModelData.name}
          modelId={selectedModelData.id}
          inferencePrice={selectedModelData.inferencePrice}
          onSubmit={handleInferenceSubmit}
        />
      )}
    </div>
  )
}
