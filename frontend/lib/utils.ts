import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import toast from "react-hot-toast"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format address: 0x1234...5678
export function formatAddress(address: string): string {
  if (!address) return ""
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Format ETH from wei
export function formatEth(wei: bigint | number): string {
  const eth = typeof wei === "bigint" ? Number(wei) / 1e18 : wei
  return `${eth.toFixed(4)} ETH`
}

// Parse ETH to wei
export function parseEther(eth: string | number): bigint {
  const ethNum = typeof eth === "string" ? parseFloat(eth) : eth
  return BigInt(Math.floor(ethNum * 1e18))
}

// Format USD: $1,234.56
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Format timestamp: "2 hours ago"
export function formatTimeAgo(timestamp: number): string {
  const now = Date.now() / 1000
  const diff = now - timestamp

  if (diff < 60) return "Just now"
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`
  return new Date(timestamp * 1000).toLocaleDateString()
}

// Format percentage: 78.5%
export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

// Format large numbers: 1.2K, 1.5M
export function formatNumber(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
  return value.toLocaleString()
}

// Copy to clipboard with toast
export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text)
  toast.success("Copied to clipboard!")
}

// Deterministic pseudo-random number generator
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// Generate mock models for demo
export function generateMockModels(count: number) {
  const names = [
    "AlphaNeural",
    "QuantumPredictor",
    "DeepTrade AI",
    "NeuralNet Pro",
    "TrendMaster",
    "CryptoOracle",
    "SentimentBot",
    "MomentumAI",
    "ArbitrageFinder",
    "VolatilityHunter",
    "PatternSeeker",
    "MarketMind",
    "SignalForge",
    "PriceWizard",
    "TradingGPT",
  ]

  const strategies = ["Momentum", "Mean Reversion", "ML-Based", "Breakout", "Arbitrage"]
  const icons = ["🤖", "🧠", "⚡", "🔮", "📈", "🎯", "💡", "🚀", "🔥", "💎"]
  const assets = ["ETH", "BTC", "SOL", "AVAX", "MATIC"]
  const actions: ("BUY" | "SELL" | "HOLD")[] = ["BUY", "SELL", "HOLD"]

  return Array.from({ length: count }, (_, i) => {
    // sead based on index i to ensure consistency across renders
    const r1 = pseudoRandom(i * 13.37)
    const r2 = pseudoRandom(i * 7.11 + 100)
    const r3 = pseudoRandom(i * 3.14 + 200)

    return {
      id: i + 1,
      name: names[i % names.length],
      owner: `0x${Math.floor(r1 * 10000000).toString(16).padEnd(8, "0")}...${Math.floor(r2 * 10000).toString(16).padEnd(4, "0")}`,
      strategy: strategies[Math.floor(r1 * strategies.length)],
      accuracy: 55 + r2 * 40,
      totalInferences: Math.floor(100 + r3 * 10000),
      revenue: r1 * 50,
      subscribers: Math.floor(10 + r2 * 500),
      icon: icons[i % icons.length],
      inferencePrice: BigInt(Math.floor(0.001 * 1e18 + r3 * 0.01 * 1e18)),
      latestSignal: {
        action: actions[Math.floor(r1 * actions.length)],
        asset: assets[Math.floor(r2 * assets.length)],
      },
    }
  })
}

// Generate mock competitions for demo
export function generateMockCompetitions(count: number) {
  const names = [
    "Q4 2024 Championship",
    "Monthly Prediction Challenge",
    "Weekly Sprint",
    "DeFi Masters Tournament",
    "AI Trading World Cup",
  ]

  const now = Date.now() / 1000

  return Array.from({ length: count }, (_, i) => {
    const status: ("upcoming" | "active" | "ended")[] = ["active", "upcoming", "ended"]
    const currentStatus = status[i % 3]

    // deterministic randoms
    const r1 = pseudoRandom(i * 42.1)
    const r2 = pseudoRandom(i * 19.9 + 50)

    let startTime: number, endTime: number

    if (currentStatus === "active") {
      startTime = now - 86400 * 3
      endTime = now + 86400 * 4
    } else if (currentStatus === "upcoming") {
      startTime = now + 86400 * 2
      endTime = now + 86400 * 9
    } else {
      startTime = now - 86400 * 10
      endTime = now - 86400 * 3
    }

    return {
      id: i + 1,
      name: names[i % names.length],
      startTime,
      endTime,
      prizePool: BigInt(Math.floor((5 + r1 * 20) * 1e18)),
      entryFee: BigInt(Math.floor((0.05 + r2 * 0.2) * 1e18)),
      participants: Math.floor(10 + r1 * 100),
      status: currentStatus,
    }
  })
}

// Generate mock signals for demo
export function generateMockSignals(count: number) {
  const assets = ["ETH", "BTC", "SOL", "AVAX", "MATIC", "ARB", "OP"]
  const actions: ("BUY" | "SELL" | "HOLD")[] = ["BUY", "SELL", "HOLD"]
  const now = Date.now() / 1000

  return Array.from({ length: count }, (_, i) => {
    const r1 = pseudoRandom(i * 123.45)
    const r2 = pseudoRandom(i * 67.89 + 1000)
    const r3 = pseudoRandom(i * 99.99 + 2000)

    return {
      id: i + 1,
      timestamp: now - r1 * 86400 * 7,
      asset: assets[Math.floor(r1 * assets.length)],
      action: actions[Math.floor(r2 * actions.length)],
      targetPrice: BigInt(Math.floor((1000 + r3 * 5000) * 1e18)),
      stopLoss: BigInt(Math.floor((800 + r1 * 4000) * 1e18)),
      confidence: 60 + r2 * 35,
      isActive: r3 > 0.3,
      outcome: (r1 > 0.5 ? "profit" : r2 > 0.5 ? "loss" : null) as "profit" | "loss" | null,
      pnl: (r3 - 0.5) * 20,
    }
  })
}
