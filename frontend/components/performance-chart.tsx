"use client"

import { useState, useEffect, useRef } from "react"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const timeFilters = [
  { label: "1min", value: { minutes: 1 } }, // gas price update interval
  { label: "10min", value: { minutes: 10 } }, // token price update interval
  { label: "1hr", value: { hours: 1 } },
  { label: "1day", value: { days: 1 } },
  { label: "7D", value: { days: 7 } },
  { label: "30D", value: { days: 30 } },
  { label: "90D", value: { days: 90 } },
  { label: "All", value: "All" },
]
const updateIntervals = [
  { label: "1min", value: 60000 },
  { label: "5s", value: 5000 },
]

// Generate demo data with recent timestamps
function generateDemoData() {
  const now = new Date()
  const arr = []
  for (let i = 0; i < 200; i++) {
    const d = new Date(now.getTime() - i * 60 * 1000) // 1-min intervals
    arr.unshift({
      date: d.toISOString(),
      accuracy: 60 + Math.random() * 40,
      pnl: Math.random() * 2 - 1,
    })
  }
  return arr
}

// --- Model Strategies ---
type StrategyType = 'momentum' | 'mean-reversion' | 'ml' | 'random';
interface DemoDataPoint {
  date: string;
  accuracy: number;
  pnl: number;
}
function runModelStrategy(
  strategy: StrategyType,
  history: number[],
  currentPrice: number,
  volume: number
): { action: 'BUY' | 'SELL' | 'HOLD' } {
  if (strategy === 'momentum') {
    if (history.length < 20) return { action: 'HOLD' };
    const ma20 = history.slice(-20).reduce((a: number, b: number) => a + b, 0) / 20;
    if (currentPrice > ma20 * 1.02) return { action: 'BUY' };
    if (currentPrice < ma20 * 0.98) return { action: 'SELL' };
    return { action: 'HOLD' };
  }
  if (strategy === 'mean-reversion') {
    if (history.length < 30) return { action: 'HOLD' };
    const mean = history.reduce((a: number, b: number) => a + b, 0) / history.length;
    const stdDev = Math.sqrt(
      history.reduce((sq: number, n: number) => sq + Math.pow(n - mean, 2), 0) / history.length
    );
    const zScore = (currentPrice - mean) / stdDev;
    if (zScore < -1.5) return { action: 'BUY' };
    if (zScore > 1.5) return { action: 'SELL' };
    return { action: 'HOLD' };
  }
  if (strategy === 'ml') {
    if (history.length < 10) return { action: 'HOLD' };
    const shortMA = history.slice(-5).reduce((a: number, b: number) => a + b, 0) / 5;
    const longMA = history.slice(-20).reduce((a: number, b: number) => a + b, 0) / 20;
    const volatility = Math.sqrt(
      history.slice(-10).reduce((sq: number, n: number) => sq + Math.pow(n - shortMA, 2), 0) / 10
    );
    const momentum = shortMA / longMA;
    const volumeSignal = volume > 1000000 ? 1 : 0.5;
    const volatilitySignal = volatility / currentPrice;
    const mlScore = (momentum - 1) * 100 + volumeSignal * 10 - volatilitySignal * 50;
    if (mlScore > 5) return { action: 'BUY' };
    if (mlScore < -5) return { action: 'SELL' };
    return { action: 'HOLD' };
  }
  // random
  const actions: Array<'BUY' | 'SELL' | 'HOLD'> = ['BUY', 'SELL', 'HOLD'];
  return { action: actions[Math.floor(Math.random() * actions.length)] };
}

// --- Calculate accuracy and P&L ---
function calculateModelStats(
  data: DemoDataPoint[],
  strategy: StrategyType
): { accuracy: number; pnl: number } {
  let correct = 0, total = 0, pnl = 0;
  let history: number[] = [];
  for (let i = 0; i < data.length - 1; i++) {
    const current = data[i];
    const next = data[i + 1];
    history.push(current.accuracy); // use accuracy as price for demo
    const pred = runModelStrategy(strategy, history, current.accuracy, 1000000);
    if (pred.action === 'BUY') {
      pnl += next.accuracy - current.accuracy;
      if (next.accuracy > current.accuracy) correct++;
      total++;
    } else if (pred.action === 'SELL') {
      pnl += current.accuracy - next.accuracy;
      if (next.accuracy < current.accuracy) correct++;
      total++;
    }
    // HOLD does not affect stats
  }
  return {
    accuracy: total ? (correct / total) * 100 : 0,
    pnl,
  };
}

// --- Calculate cumulative P&L ---
function computeCumulativePnL(data: DemoDataPoint[]): DemoDataPoint[] {
  let cumulative = 0;
  return data.map((d, i) => {
    cumulative += d.pnl;
    return { ...d, cumulativePnl: cumulative };
  });
}

function useLiveEthPriceFeed() {
  const [priceData, setPriceData] = useState<{ date: string, price: number }[]>([])
  const [refreshInterval, setRefreshInterval] = useState(5000) // default 5s
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch("https://hermes.pyth.network/api/latest_price_feeds?ids[]=0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace")
        const arr = await res.json()
        const priceFeed = arr[0]
        if (priceFeed && priceFeed.price) {
          const price = Number(priceFeed.price.price) * Math.pow(10, priceFeed.price.expo)
          setPriceData(prev => [
            ...prev.slice(-199),
            { date: new Date().toISOString(), price }
          ])
        }
      } catch { }
    }
    fetchPrice()
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(fetchPrice, refreshInterval)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [refreshInterval])
  return { priceData, refreshInterval, setRefreshInterval }
}

function useSimulatedStrategyStats(strategy: StrategyType, priceData: { date: string, price: number }[]) {
  // Simulate 1000 ETH trading on the live price feed
  const [stats, setStats] = useState({ accuracy: 0, pnl: 0 })
  useEffect(() => {
    if (priceData.length < 2) return
    let eth = 1000
    let usd = 0
    let correct = 0, total = 0
    let history: number[] = []
    for (let i = 0; i < priceData.length - 1; i++) {
      const current = priceData[i].price
      const next = priceData[i + 1].price
      history.push(current)
      let action: 'BUY' | 'SELL' | 'HOLD' = 'HOLD'
      if (strategy === 'momentum') {
        if (history.length >= 20) {
          const ma20 = history.slice(-20).reduce((a, b) => a + b, 0) / 20
          if (current > ma20 * 1.02) action = 'BUY'
          else if (current < ma20 * 0.98) action = 'SELL'
        }
      } else if (strategy === 'mean-reversion') {
        if (history.length >= 30) {
          const mean = history.reduce((a, b) => a + b, 0) / history.length
          const stdDev = Math.sqrt(history.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / history.length)
          const zScore = (current - mean) / stdDev
          if (zScore < -1.5) action = 'BUY'
          else if (zScore > 1.5) action = 'SELL'
        }
      } else if (strategy === 'ml') {
        if (history.length >= 10) {
          const shortMA = history.slice(-5).reduce((a, b) => a + b, 0) / 5
          const longMA = history.slice(-20).reduce((a, b) => a + b, 0) / 20
          const volatility = Math.sqrt(history.slice(-10).reduce((sq, n) => sq + Math.pow(n - shortMA, 2), 0) / 10)
          const momentum = shortMA / longMA
          const mlScore = (momentum - 1) * 100 - (volatility / current) * 50
          if (mlScore > 5) action = 'BUY'
          else if (mlScore < -5) action = 'SELL'
        }
      } else if (strategy === 'random') {
        const actions: Array<'BUY' | 'SELL' | 'HOLD'> = ['BUY', 'SELL', 'HOLD']
        action = actions[Math.floor(Math.random() * 3)]
      }
      // Simulate trade
      if (action === 'BUY' && eth > 0) {
        usd += eth * current
        eth = 0
        if (next > current) correct++
        total++
      } else if (action === 'SELL' && usd > 0) {
        eth += usd / current
        usd = 0
        if (next < current) correct++
        total++
      }
    }
    const finalUsd = eth * priceData[priceData.length - 1].price + usd
    setStats({
      accuracy: total ? (correct / total) * 100 : 0,
      pnl: finalUsd - 1000 * priceData[0].price
    })
  }, [strategy, priceData])
  return stats
}

interface PerformanceChartProps {
  data?: { date: string; accuracy: number; pnl: number }[]
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const [activeFilter, setActiveFilter] = useState(timeFilters[6].label) // default 7D
  const [activeMetric, setActiveMetric] = useState<"accuracy" | "pnl">("accuracy")
  const [interval, setIntervalValue] = useState(updateIntervals[1].value)
  const [liveData, setLiveData] = useState(() => data || generateDemoData())
  const [modelStrategy, setModelStrategy] = useState<StrategyType>('momentum'); // or 'mean-reversion', 'ml', 'random'
  const { priceData, refreshInterval, setRefreshInterval } = useLiveEthPriceFeed()
  const liveStats = useSimulatedStrategyStats(modelStrategy, priceData)

  useEffect(() => {
    // If data was provided via props, we might not want to override it immediately with random demo data
    // unless the user wants "live" mode. 
    // For now, if data is provided, we skip the interval update to keep it stable, 
    // or we only update if data wasn't provided (pure demo mode).
    if (data) return

    const fetchData = () => {
      setLiveData(generateDemoData())
    }
    // fetchData() // Don't fetch immediately on mount if we want to avoid double render or specific behavior
    // but original code did fetchData() immediately.
    // If we have data prop, we don't need this.

    const intervalId: number = window.setInterval(fetchData, interval)
    return () => clearInterval(intervalId)
  }, [interval, data])

  // Filter data by timeframe
  const filterData = () => {
    const filterObj = timeFilters.find(f => f.label === activeFilter)
    if (!filterObj || filterObj.value === "All") return liveData
    const now = new Date()
    let cutoff = new Date(now)
    if (typeof filterObj.value === "object") {
      if ("minutes" in filterObj.value && filterObj.value.minutes != null) {
        cutoff = new Date(now.getTime() - (filterObj.value.minutes ?? 0) * 60 * 1000)
      } else if ("hours" in filterObj.value && filterObj.value.hours != null) {
        cutoff = new Date(now.getTime() - (filterObj.value.hours ?? 0) * 60 * 60 * 1000)
      } else if ("days" in filterObj.value && filterObj.value.days != null) {
        cutoff = new Date(now.getTime() - (filterObj.value.days ?? 0) * 24 * 60 * 60 * 1000)
      }
    }
    return liveData.filter((d) => new Date(d.date) >= cutoff)
  }

  const chartData = filterData()
  const modelStats = calculateModelStats(chartData, modelStrategy);
  // Compute cumulative P&L for chart
  const chartDataWithCumulative = computeCumulativePnL(chartData);

  return (
    <div className="p-6 rounded-xl glass border border-border/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={activeMetric === "accuracy" ? "default" : "outline"}
            onClick={() => setActiveMetric("accuracy")}
            className={cn(activeMetric === "accuracy" && "bg-gradient-to-r from-primary to-accent")}
          >
            Accuracy
          </Button>
          <Button
            size="sm"
            variant={activeMetric === "pnl" ? "default" : "outline"}
            onClick={() => setActiveMetric("pnl")}
            className={cn(activeMetric === "pnl" && "bg-gradient-to-r from-primary to-accent")}
          >
            P&L
          </Button>
        </div>
        <div className="flex gap-1 flex-wrap">
          {timeFilters.map((filter) => (
            <Button
              key={filter.label}
              size="sm"
              variant={activeFilter === filter.label ? "secondary" : "ghost"}
              onClick={() => setActiveFilter(filter.label)}
              className="px-3"
            >
              {filter.label}
            </Button>
          ))}
          <span className="text-xs text-muted-foreground ml-2">(Pyth price feeds: 1min gas, 10min token)</span>
        </div>
        <div className="flex gap-1">
          {updateIntervals.map((opt) => (
            <Button
              key={opt.label}
              size="sm"
              variant={interval === opt.value ? "secondary" : "ghost"}
              onClick={() => setIntervalValue(opt.value)}
              className="px-3"
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mb-2">
        {['momentum', 'mean-reversion', 'ml', 'random'].map((s) => (
          <Button key={s} size="sm" variant={modelStrategy === s ? 'secondary' : 'ghost'} onClick={() => setModelStrategy(s as StrategyType)}>{s}</Button>
        ))}
        <span className="text-xs text-muted-foreground ml-2">
          Real-Time Accuracy: {liveStats.accuracy.toFixed(2)}% | Real-Time P&L: {liveStats.pnl.toFixed(2)} USD
        </span>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartData.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">No data for selected timeframe.</div>
          ) : activeMetric === "accuracy" ? (
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="accuracyGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(30, 41, 59, 0.9)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "8px",
                  backdropFilter: "blur(16px)",
                }}
                labelStyle={{ color: "#f1f5f9" }}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="url(#accuracyGradient)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#8b5cf6" }}
              />
            </LineChart>
          ) : (
            <AreaChart data={chartDataWithCumulative}>
              <defs>
                <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(30, 41, 59, 0.9)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "8px",
                  backdropFilter: "blur(16px)",
                }}
                labelStyle={{ color: "#f1f5f9" }}
                formatter={(value: number) => [`${value.toFixed(2)} ETH`, "Cumulative P&L"]}
              />
              <Area
                type="monotone"
                dataKey="cumulativePnl"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#pnlGradient)"
                activeDot={{ r: 6, fill: "#10b981" }}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Live ETH/USD Price Chart */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold">Live ETH/USD Price Feed (Pyth)</h3>
          <div className="flex gap-2 items-center">
            <span className="text-xs text-muted-foreground">Update interval:</span>
            {[1000, 2000, 5000, 10000, 60000].map((ms) => (
              <Button
                key={ms}
                size="sm"
                variant={refreshInterval === ms ? "secondary" : "ghost"}
                onClick={() => setRefreshInterval(ms)}
                className="px-2 text-xs"
              >
                {ms >= 1000 ? `${ms / 1000}s` : `${ms}ms`}
              </Button>
            ))}
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} hide />
              <YAxis stroke="#64748b" fontSize={12} domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(30, 41, 59, 0.9)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "8px",
                  backdropFilter: "blur(16px)",
                }}
                labelStyle={{ color: "#f1f5f9" }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, "ETH/USD"]}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5, fill: "#8b5cf6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
