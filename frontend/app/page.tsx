"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { StatCard } from "@/components/stat-card"
import { LeaderboardTable } from "@/components/leaderboard-table"
import { CompetitionCard } from "@/components/competition-card"
import { InferenceModal } from "@/components/inference-modal"
import { generateMockModels, generateMockCompetitions, formatNumber } from "@/lib/utils"
import { Brain, Zap, DollarSign, Trophy, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import toast from "react-hot-toast"

export default function DashboardPage() {
  const [models, setModels] = useState(generateMockModels(10))
  const [competitions, setCompetitions] = useState(generateMockCompetitions(3))
  const [selectedModel, setSelectedModel] = useState<number | null>(null)
  const [isInferenceModalOpen, setIsInferenceModalOpen] = useState(false)

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

  const activeCompetition = competitions.find((c) => c.status === "active")
  const selectedModelData = models.find((m) => m.id === selectedModel)

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
                <span className="text-gradient">ERC-8004</span> <span className="text-foreground">AI Hedge Fund</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-balance">
                Where AI Trading Models Are NFTs That Earn From Predictions. On-chain, verifiable, trustless.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90" asChild>
                  <Link href="/models">
                    Explore Models
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gradient-border bg-transparent" asChild>
                  <Link href="/competitions">Join Competition</Link>
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

        {/* Active Competition Banner */}
        {activeCompetition && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="p-6 rounded-xl bg-gradient-to-r from-primary/20 via-accent/20 to-neon-blue/20 border border-primary/30">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-500/30">
                      <Trophy className="w-8 h-8 text-amber-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{activeCompetition.name}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-neon-green/20 text-neon-green text-xs font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                          LIVE
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activeCompetition.participants} participants competing for the prize pool
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Prize Pool</p>
                      <p className="text-2xl font-bold text-gradient">
                        {Number(activeCompetition.prizePool) / 1e18} ETH
                      </p>
                    </div>
                    <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90" asChild>
                      <Link href="/competitions">
                        Enter Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
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

        {/* Competitions Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Active Competitions</h2>
                <p className="text-muted-foreground">Compete for prizes with your AI models</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/competitions">
                  View All Competitions
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competitions.slice(0, 3).map((competition) => (
                <CompetitionCard
                  key={competition.id}
                  competition={competition}
                  onEnter={() => toast.success("Competition entry modal coming soon!")}
                  onViewLeaderboard={() => toast.success("Leaderboard view coming soon!")}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-2">How ERC-8004 Works</h2>
              <p className="text-muted-foreground">Revolutionary on-chain AI trading infrastructure</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "AI Models as NFTs",
                  description:
                    "Each AI trading model is minted as an ERC-721 NFT, making ownership and performance fully verifiable on-chain.",
                  icon: "🤖",
                },
                {
                  title: "Earn from Predictions",
                  description:
                    "Model owners earn fees every time their AI makes a prediction. Subscribers get access to premium trading signals.",
                  icon: "💰",
                },
                {
                  title: "Compete & Win",
                  description:
                    "Enter your models in competitions to prove performance and win prize pools from the community treasury.",
                  icon: "🏆",
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
