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

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    owner: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
    strategy: strategies[Math.floor(Math.random() * strategies.length)],
    accuracy: 55 + Math.random() * 40,
    totalInferences: Math.floor(100 + Math.random() * 10000),
    revenue: Math.random() * 50,
    subscribers: Math.floor(10 + Math.random() * 500),
    icon: icons[i % icons.length],
    inferencePrice: BigInt(Math.floor(0.001 * 1e18 + Math.random() * 0.01 * 1e18)),
    latestSignal: {
      action: actions[Math.floor(Math.random() * actions.length)],
      asset: assets[Math.floor(Math.random() * assets.length)],
    },
  }))
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
      prizePool: BigInt(Math.floor((5 + Math.random() * 20) * 1e18)),
      entryFee: BigInt(Math.floor((0.05 + Math.random() * 0.2) * 1e18)),
      participants: Math.floor(10 + Math.random() * 100),
      status: currentStatus,
    }
  })
}

// Generate mock signals for demo
export function generateMockSignals(count: number) {
  const assets = ["ETH", "BTC", "SOL", "AVAX", "MATIC", "ARB", "OP"]
  const actions: ("BUY" | "SELL" | "HOLD")[] = ["BUY", "SELL", "HOLD"]
  const now = Date.now() / 1000

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    timestamp: now - Math.random() * 86400 * 7,
    asset: assets[Math.floor(Math.random() * assets.length)],
    action: actions[Math.floor(Math.random() * actions.length)],
    targetPrice: BigInt(Math.floor((1000 + Math.random() * 5000) * 1e18)),
    stopLoss: BigInt(Math.floor((800 + Math.random() * 4000) * 1e18)),
    confidence: 60 + Math.random() * 35,
    isActive: Math.random() > 0.3,
    outcome: Math.random() > 0.5 ? "profit" : Math.random() > 0.5 ? "loss" : null,
    pnl: (Math.random() - 0.5) * 20,
  }))
}
