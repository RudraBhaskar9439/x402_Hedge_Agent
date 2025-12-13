"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { ModelCard } from "@/components/model-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateMockModels } from "@/lib/utils"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const strategies = ["Momentum", "Mean Reversion", "ML-Based", "Breakout", "Arbitrage"]

export default function ModelsPage() {
  const [models] = useState(() => generateMockModels(12))
  const [search, setSearch] = useState("")
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([])
  const [accuracyRange, setAccuracyRange] = useState([0, 100])
  const [sortBy, setSortBy] = useState("accuracy")
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const filteredModels = models
    .filter((model) => {
      const matchesSearch = model.name.toLowerCase().includes(search.toLowerCase())
      const matchesStrategy = selectedStrategies.length === 0 || selectedStrategies.includes(model.strategy)
      const matchesAccuracy = model.accuracy >= accuracyRange[0] && model.accuracy <= accuracyRange[1]
      return matchesSearch && matchesStrategy && matchesAccuracy
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "accuracy":
          return b.accuracy - a.accuracy
        case "inferences":
          return b.totalInferences - a.totalInferences
        case "revenue":
          return b.revenue - a.revenue
        case "subscribers":
          return b.subscribers - a.subscribers
        default:
          return 0
      }
    })

  const toggleStrategy = (strategy: string) => {
    setSelectedStrategies((prev) =>
      prev.includes(strategy) ? prev.filter((s) => s !== strategy) : [...prev, strategy],
    )
  }

  const clearFilters = () => {
    setSelectedStrategies([])
    setAccuracyRange([0, 100])
    setSortBy("accuracy")
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Strategy Filter */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Strategy</Label>
        <div className="space-y-2">
          {strategies.map((strategy) => (
            <div key={strategy} className="flex items-center gap-2">
              <Checkbox
                id={strategy}
                checked={selectedStrategies.includes(strategy)}
                onCheckedChange={() => toggleStrategy(strategy)}
              />
              <label htmlFor={strategy} className="text-sm cursor-pointer">
                {strategy}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Accuracy Range */}
      <div>
        <Label className="text-sm font-medium mb-3 block">
          Accuracy Range: {accuracyRange[0]}% - {accuracyRange[1]}%
        </Label>
        <Slider value={accuracyRange} onValueChange={setAccuracyRange} min={0} max={100} step={5} className="mt-2" />
      </div>

      {/* Sort By */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Sort By</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full bg-secondary/50 border-border/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="accuracy">Highest Accuracy</SelectItem>
            <SelectItem value="inferences">Most Inferences</SelectItem>
            <SelectItem value="revenue">Highest Revenue</SelectItem>
            <SelectItem value="subscribers">Most Subscribers</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
        <X className="w-4 h-4 mr-2" />
        Clear Filters
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Trading Models</h1>
            <p className="text-muted-foreground">
              Explore {models.length} AI models competing for the best predictions
            </p>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 p-6 rounded-xl glass border border-border/50">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </h3>
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Mobile Filter */}
              <div className="flex gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search models..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 bg-secondary/50 border-border/50"
                  />
                </div>

                {/* Mobile Filter Button */}
                <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden bg-transparent">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 glass">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Results Count */}
              <p className="text-sm text-muted-foreground mb-4">Showing {filteredModels.length} models</p>

              {/* Models Grid */}
              {filteredModels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredModels.map((model) => (
                    <ModelCard key={model.id} model={model} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No models found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
