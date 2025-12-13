"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { SignalCard } from "@/components/signal-card"
import { SubscriptionCard } from "@/components/subscription-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { generateMockModels, generateMockSignals } from "@/lib/utils"
import { useWallet } from "@/hooks/use-wallet"
import { Search, SlidersHorizontal, ShoppingCart, Wallet, ArrowRight, TrendingUp, Zap, Shield } from "lucide-react"
import toast from "react-hot-toast"

// Generate marketplace signals
function generateMarketplaceSignals(count: number) {
  const models = generateMockModels(5)
  const signals = generateMockSignals(count)

  return signals.map((signal, i) => {
    const model = models[i % models.length]
    return {
      id: signal.id,
      modelId: model.id,
      modelName: model.name,
      modelIcon: model.icon,
      asset: signal.asset,
      action: signal.action,
      confidence: signal.confidence,
      price: BigInt(Math.floor(0.005 * 1e18 + Math.random() * 0.02 * 1e18)),
      timestamp: signal.timestamp,
      isLocked: Math.random() > 0.2,
    }
  })
}

// Generate user subscriptions
function generateSubscriptions() {
  const models = generateMockModels(3)
  const now = Date.now() / 1000

  return models.map((model, i) => ({
    modelId: model.id,
    modelName: model.name,
    modelIcon: model.icon,
    expiresAt: now + (i === 0 ? 3 * 86400 : 30 * 86400),
    signalsReceived: Math.floor(10 + Math.random() * 100),
    monthlyPrice: BigInt(Math.floor(0.1 * 1e18)),
    isExpiring: i === 0,
  }))
}

export default function MarketplacePage() {
  const { isConnected } = useWallet()
  const [signals] = useState(() => generateMarketplaceSignals(20))
  const [subscriptions] = useState(() => generateSubscriptions())
  const [search, setSearch] = useState("")
  const [assetFilter, setAssetFilter] = useState("all")
  const [actionFilter, setActionFilter] = useState("all")
  const [confidenceRange, setConfidenceRange] = useState([0, 100])

  const filteredSignals = signals.filter((signal) => {
    const matchesSearch = signal.modelName.toLowerCase().includes(search.toLowerCase())
    const matchesAsset = assetFilter === "all" || signal.asset === assetFilter
    const matchesAction = actionFilter === "all" || signal.action === actionFilter
    const matchesConfidence = signal.confidence >= confidenceRange[0] && signal.confidence <= confidenceRange[1]
    return matchesSearch && matchesAsset && matchesAction && matchesConfidence
  })

  const featuredSignals = signals.filter((s) => s.confidence >= 80).slice(0, 4)
  const uniqueAssets = [...new Set(signals.map((s) => s.asset))]

  const handlePurchaseSignal = (signalId: number) => {
    toast.loading("Processing purchase...")
    setTimeout(() => {
      toast.dismiss()
      toast.success("Signal purchased successfully!")
    }, 2000)
  }

  const handleRenewSubscription = (modelId: number) => {
    toast.loading("Renewing subscription...")
    setTimeout(() => {
      toast.dismiss()
      toast.success("Subscription renewed!")
    }, 2000)
  }

  const handleCancelSubscription = (modelId: number) => {
    toast.success("Subscription will not auto-renew")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Signal Marketplace</h1>
            <p className="text-muted-foreground">
              Purchase individual trading signals or subscribe to models for unlimited access
            </p>
          </div>

          {/* Featured Signals Carousel */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold mb-1">Featured High-Confidence Signals</h2>
                <p className="text-sm text-muted-foreground">Top signals with 80%+ confidence</p>
              </div>
              <Button variant="outline" className="bg-transparent">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredSignals.map((signal) => (
                <SignalCard key={signal.id} signal={signal} onPurchase={() => handlePurchaseSignal(signal.id)} />
              ))}
            </div>
          </section>

          {/* Main Content */}
          <Tabs defaultValue="signals" className="space-y-6">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="signals" className="data-[state=active]:bg-primary/20">
                <ShoppingCart className="w-4 h-4 mr-2" />
                All Signals
              </TabsTrigger>
              <TabsTrigger value="subscriptions" className="data-[state=active]:bg-primary/20">
                <Zap className="w-4 h-4 mr-2" />
                My Subscriptions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signals" className="space-y-6">
              {/* Filters */}
              <div className="p-4 rounded-xl glass border border-border/50">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by model name..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9 bg-secondary/50 border-border/50"
                    />
                  </div>
                  <Select value={assetFilter} onValueChange={setAssetFilter}>
                    <SelectTrigger className="w-full lg:w-[150px] bg-secondary/50 border-border/50">
                      <SelectValue placeholder="Asset" />
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
                    <SelectTrigger className="w-full lg:w-[150px] bg-secondary/50 border-border/50">
                      <SelectValue placeholder="Action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="BUY">BUY</SelectItem>
                      <SelectItem value="SELL">SELL</SelectItem>
                      <SelectItem value="HOLD">HOLD</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-3 lg:w-[250px]">
                    <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-1">
                        Confidence: {confidenceRange[0]}% - {confidenceRange[1]}%
                      </p>
                      <Slider value={confidenceRange} onValueChange={setConfidenceRange} min={0} max={100} step={5} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <p className="text-sm text-muted-foreground">Showing {filteredSignals.length} signals</p>

              {filteredSignals.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredSignals.map((signal) => (
                    <SignalCard key={signal.id} signal={signal} onPurchase={() => handlePurchaseSignal(signal.id)} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No signals found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="subscriptions" className="space-y-6">
              {isConnected ? (
                subscriptions.length > 0 ? (
                  <>
                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl glass border border-border/50">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                          <Zap className="w-4 h-4" />
                          Active Subscriptions
                        </div>
                        <p className="text-2xl font-bold">{subscriptions.length}</p>
                      </div>
                      <div className="p-4 rounded-xl glass border border-border/50">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                          <TrendingUp className="w-4 h-4" />
                          Total Signals Received
                        </div>
                        <p className="text-2xl font-bold">
                          {subscriptions.reduce((acc, s) => acc + s.signalsReceived, 0)}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl glass border border-border/50">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                          <Shield className="w-4 h-4" />
                          Premium Access
                        </div>
                        <p className="text-2xl font-bold text-neon-green">Active</p>
                      </div>
                    </div>

                    {/* Subscription Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {subscriptions.map((subscription) => (
                        <SubscriptionCard
                          key={subscription.modelId}
                          subscription={subscription}
                          onRenew={() => handleRenewSubscription(subscription.modelId)}
                          onCancel={() => handleCancelSubscription(subscription.modelId)}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16">
                    <Zap className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No active subscriptions</h3>
                    <p className="text-muted-foreground mb-4">Subscribe to AI models for unlimited signal access</p>
                    <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">Explore Models</Button>
                  </div>
                )
              ) : (
                <div className="text-center py-16">
                  <Wallet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Connect your wallet</h3>
                  <p className="text-muted-foreground mb-4">Connect your wallet to view your subscriptions</p>
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
