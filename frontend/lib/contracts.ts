// Contract ABIs and addresses for ERC-8004 AI Hedge Fund Protocol

export const CHAIN_ID = 84532 // Base Sepolia
export const BASE_SEPOLIA_RPC = process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC || "https://sepolia.base.org"

export const CONTRACTS = {
  REGISTRY: process.env.NEXT_PUBLIC_REGISTRY_ADDRESS || "0x0000000000000000000000000000000000000000",
  MARKETPLACE: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS || "0x0000000000000000000000000000000000000000",
  COMPETITION: process.env.NEXT_PUBLIC_COMPETITION_ADDRESS || "0x0000000000000000000000000000000000000000",
} as const

// AIModelRegistry ABI (ERC-8004)
export const REGISTRY_ABI = [
  // View Functions
  "function getModelInfo(uint256 modelId) view returns (address owner, string modelURI, uint256 inferencePrice, uint256 totalInferences, uint256 accuracy)",
  "function getModelMetrics(uint256 modelId) view returns (uint256 correctPredictions, uint256 totalPredictions, int256 totalPnL, uint256 totalRevenue, uint256 accuracy)",
  "function getTopModels(uint256 count) view returns (uint256[] modelIds, uint256[] accuracies)",
  "function getInferenceResult(uint256 requestId) view returns (uint256 modelId, address requester, bytes outputData, uint256 confidence, uint256 timestamp)",
  "function totalModels() view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  // Write Functions
  "function registerModel(string modelURI, uint256 inferencePrice) returns (uint256 modelId)",
  "function requestInference(uint256 modelId, bytes inputData) payable returns (uint256 requestId)",
  "function submitInference(uint256 requestId, bytes outputData, uint256 confidence)",
  "function updateModelPerformance(uint256 requestId, bool wasCorrect, int256 actualPnL)",
] as const

// AISignalMarketplace ABI
export const MARKETPLACE_ABI = [
  // View Functions
  "function getLatestSignals(uint256 modelId, uint256 count) view returns (tuple(uint256 timestamp, string asset, string action, uint256 targetPrice, uint256 stopLoss, uint256 confidence, bool isActive)[] signals)",
  "function getModelStats(uint256 modelId) view returns (uint256 subscribers, uint256 signals, uint256 monthlyPrice, uint256 signalPrice)",
  "function hasActiveSubscription(uint256 modelId, address user) view returns (bool)",
  "function totalSignals() view returns (uint256)",
  // Write Functions
  "function subscribe(uint256 modelId, uint256 months) payable",
  "function purchaseSignal(uint256 modelId, uint256 signalIndex) payable",
  "function publishSignal(uint256 modelId, string asset, string action, uint256 targetPrice, uint256 stopLoss, uint256 confidence)",
] as const

// AITradingCompetition ABI
export const COMPETITION_ABI = [
  // View Functions
  "function getLeaderboard(uint256 competitionId) view returns (uint256[] modelIds, uint256[] scores)",
  "function getModelScore(uint256 competitionId, uint256 modelId) view returns (uint256 correctPredictions, uint256 totalPredictions, int256 totalPnL, uint256 finalScore)",
  "function getActiveCompetitions() view returns (uint256[] competitionIds)",
  "function getCompetitionInfo(uint256 competitionId) view returns (string name, uint256 startTime, uint256 endTime, uint256 prizePool, uint256 entryFee, uint256 participants)",
  // Write Functions
  "function enterCompetition(uint256 competitionId, uint256 modelId) payable",
] as const

// Types
export interface ModelInfo {
  id: number
  owner: string
  modelURI: string
  inferencePrice: bigint
  totalInferences: number
  accuracy: number
  name?: string
  strategy?: string
  image?: string
}

export interface ModelMetrics {
  correctPredictions: number
  totalPredictions: number
  totalPnL: bigint
  totalRevenue: bigint
  accuracy: number
}

export interface Signal {
  timestamp: number
  asset: string
  action: "BUY" | "SELL" | "HOLD"
  targetPrice: bigint
  stopLoss: bigint
  confidence: number
  isActive: boolean
}

export interface Competition {
  id: number
  name: string
  startTime: number
  endTime: number
  prizePool: bigint
  entryFee: bigint
  participants: number
  status: "upcoming" | "active" | "ended"
}

export interface LeaderboardEntry {
  modelId: number
  modelName: string
  owner: string
  score: number
  correctPredictions: number
  totalPredictions: number
  totalPnL: bigint
}
