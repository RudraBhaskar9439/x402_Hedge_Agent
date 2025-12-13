"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { CompetitionCard } from "@/components/competition-card"
import { CompetitionLeaderboard } from "@/components/competition-leaderboard"
import { EnterCompetitionModal } from "@/components/enter-competition-modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateMockCompetitions, generateMockModels, formatEth } from "@/lib/utils"
import { Trophy, Clock, Users, Award } from "lucide-react"
import toast from "react-hot-toast"

// Generate mock leaderboard data
function generateLeaderboard(competitionId: number) {
  const models = generateMockModels(10)
  return models
    .map((model, index) => ({
      rank: index + 1,
      modelId: model.id,
      modelName: model.name,
      modelIcon: model.icon,
      owner: model.owner,
      correctPredictions: Math.floor(50 + Math.random() * 100),
      totalPredictions: Math.floor(100 + Math.random() * 50),
      accuracy: 55 + Math.random() * 40,
      totalPnL: (Math.random() - 0.3) * 10,
      score: Math.floor(1000 + Math.random() * 5000),
    }))
    .sort((a, b) => b.score - a.score)
    .map((entry, i) => ({ ...entry, rank: i + 1 }))
}

export default function CompetitionsPage() {
  const [competitions] = useState(() => generateMockCompetitions(6))
  const [userModels] = useState(() => generateMockModels(3))
  const [selectedCompetition, setSelectedCompetition] = useState<(typeof competitions)[0] | null>(null)
  const [isEnterModalOpen, setIsEnterModalOpen] = useState(false)
  const [viewingLeaderboard, setViewingLeaderboard] = useState<number | null>(null)

  const activeCompetitions = competitions.filter((c) => c.status === "active")
  const upcomingCompetitions = competitions.filter((c) => c.status === "upcoming")
  const endedCompetitions = competitions.filter((c) => c.status === "ended")

  const handleEnterCompetition = (competition: (typeof competitions)[0]) => {
    setSelectedCompetition(competition)
    setIsEnterModalOpen(true)
  }

  const handleViewLeaderboard = (competitionId: number) => {
    setViewingLeaderboard(viewingLeaderboard === competitionId ? null : competitionId)
  }

  const handleEnterSubmit = async (modelId: number) => {
    toast.loading("Entering competition...")
    await new Promise((resolve) => setTimeout(resolve, 2000))
    toast.dismiss()
    toast.success("Successfully entered competition!")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Trading Competitions</h1>
            <p className="text-muted-foreground">
              Compete with your AI models and win prizes from the community treasury
            </p>
          </div>

          {/* Featured Active Competition */}
          {activeCompetitions[0] && (
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Featured Competition
              </h2>
              <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-neon-blue/20 border border-primary/30">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold">{activeCompetitions[0].name}</h3>
                      <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse mr-1" />
                        LIVE
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {activeCompetitions[0].participants} participants
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Ends in 4 days
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Prize Pool</p>
                      <p className="text-3xl font-bold text-gradient">{formatEth(activeCompetitions[0].prizePool)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEnterCompetition(activeCompetitions[0])}
                        className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                      >
                        <Trophy className="w-4 h-4 mr-2" />
                        Enter Now
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleViewLeaderboard(activeCompetitions[0].id)}
                        className="bg-transparent"
                      >
                        View Leaderboard
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Prize Distribution */}
                <div className="mt-6 pt-6 border-t border-border/30">
                  <h4 className="text-sm font-medium mb-3">Prize Distribution</h4>
                  <div className="flex gap-4">
                    {[
                      { place: "1st", percent: 60, icon: "🥇" },
                      { place: "2nd", percent: 25, icon: "🥈" },
                      { place: "3rd", percent: 15, icon: "🥉" },
                    ].map((prize) => (
                      <div key={prize.place} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/30">
                        <span className="text-xl">{prize.icon}</span>
                        <div>
                          <p className="text-xs text-muted-foreground">{prize.place} Place</p>
                          <p className="font-bold">{prize.percent}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leaderboard (collapsed by default) */}
                {viewingLeaderboard === activeCompetitions[0].id && (
                  <div className="mt-6 pt-6 border-t border-border/30">
                    <h4 className="text-sm font-medium mb-4">Current Standings</h4>
                    <CompetitionLeaderboard entries={generateLeaderboard(activeCompetitions[0].id)} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* All Competitions */}
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="active" className="data-[state=active]:bg-primary/20">
                Active ({activeCompetitions.length})
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-primary/20">
                Upcoming ({upcomingCompetitions.length})
              </TabsTrigger>
              <TabsTrigger value="ended" className="data-[state=active]:bg-primary/20">
                Ended ({endedCompetitions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6">
              {activeCompetitions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeCompetitions.map((competition) => (
                    <CompetitionCard
                      key={competition.id}
                      competition={competition}
                      onEnter={() => handleEnterCompetition(competition)}
                      onViewLeaderboard={() => handleViewLeaderboard(competition.id)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<Trophy className="w-12 h-12 text-muted-foreground" />}
                  title="No active competitions"
                  description="Check back later for upcoming competitions"
                />
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-6">
              {upcomingCompetitions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingCompetitions.map((competition) => (
                    <CompetitionCard
                      key={competition.id}
                      competition={competition}
                      onEnter={() => handleEnterCompetition(competition)}
                      onViewLeaderboard={() => handleViewLeaderboard(competition.id)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<Clock className="w-12 h-12 text-muted-foreground" />}
                  title="No upcoming competitions"
                  description="New competitions will be announced soon"
                />
              )}
            </TabsContent>

            <TabsContent value="ended" className="space-y-6">
              {endedCompetitions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {endedCompetitions.map((competition) => (
                    <div key={competition.id} className="space-y-4">
                      <CompetitionCard
                        competition={competition}
                        onViewLeaderboard={() => handleViewLeaderboard(competition.id)}
                      />
                      {viewingLeaderboard === competition.id && (
                        <CompetitionLeaderboard entries={generateLeaderboard(competition.id)} />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<Award className="w-12 h-12 text-muted-foreground" />}
                  title="No past competitions"
                  description="Competition history will appear here"
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />

      {/* Enter Competition Modal */}
      {selectedCompetition && (
        <EnterCompetitionModal
          open={isEnterModalOpen}
          onOpenChange={setIsEnterModalOpen}
          competitionName={selectedCompetition.name}
          competitionId={selectedCompetition.id}
          entryFee={selectedCompetition.entryFee}
          prizePool={selectedCompetition.prizePool}
          userModels={userModels.map((m) => ({ id: m.id, name: m.name, icon: m.icon }))}
          onSubmit={handleEnterSubmit}
        />
      )}
    </div>
  )
}

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="text-center py-16">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
