(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/agent-hedge-fund/frontend/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "copyToClipboard",
    ()=>copyToClipboard,
    "formatAddress",
    ()=>formatAddress,
    "formatEth",
    ()=>formatEth,
    "formatNumber",
    ()=>formatNumber,
    "formatPercent",
    ()=>formatPercent,
    "formatTimeAgo",
    ()=>formatTimeAgo,
    "formatUSD",
    ()=>formatUSD,
    "generateMockCompetitions",
    ()=>generateMockCompetitions,
    "generateMockModels",
    ()=>generateMockModels,
    "generateMockSignals",
    ()=>generateMockSignals
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
;
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatAddress(address) {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
function formatEth(wei) {
    const eth = typeof wei === "bigint" ? Number(wei) / 1e18 : wei;
    return `${eth.toFixed(4)} ETH`;
}
function formatUSD(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}
function formatTimeAgo(timestamp) {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    return new Date(timestamp * 1000).toLocaleDateString();
}
function formatPercent(value) {
    return `${value.toFixed(1)}%`;
}
function formatNumber(value) {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toLocaleString();
}
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Copied to clipboard!");
}
function generateMockModels(count) {
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
        "TradingGPT"
    ];
    const strategies = [
        "Momentum",
        "Mean Reversion",
        "ML-Based",
        "Breakout",
        "Arbitrage"
    ];
    const icons = [
        "🤖",
        "🧠",
        "⚡",
        "🔮",
        "📈",
        "🎯",
        "💡",
        "🚀",
        "🔥",
        "💎"
    ];
    const assets = [
        "ETH",
        "BTC",
        "SOL",
        "AVAX",
        "MATIC"
    ];
    const actions = [
        "BUY",
        "SELL",
        "HOLD"
    ];
    return Array.from({
        length: count
    }, (_, i)=>({
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
                asset: assets[Math.floor(Math.random() * assets.length)]
            }
        }));
}
function generateMockCompetitions(count) {
    const names = [
        "Q4 2024 Championship",
        "Monthly Prediction Challenge",
        "Weekly Sprint",
        "DeFi Masters Tournament",
        "AI Trading World Cup"
    ];
    const now = Date.now() / 1000;
    return Array.from({
        length: count
    }, (_, i)=>{
        const status = [
            "active",
            "upcoming",
            "ended"
        ];
        const currentStatus = status[i % 3];
        let startTime, endTime;
        if (currentStatus === "active") {
            startTime = now - 86400 * 3;
            endTime = now + 86400 * 4;
        } else if (currentStatus === "upcoming") {
            startTime = now + 86400 * 2;
            endTime = now + 86400 * 9;
        } else {
            startTime = now - 86400 * 10;
            endTime = now - 86400 * 3;
        }
        return {
            id: i + 1,
            name: names[i % names.length],
            startTime,
            endTime,
            prizePool: BigInt(Math.floor((5 + Math.random() * 20) * 1e18)),
            entryFee: BigInt(Math.floor((0.05 + Math.random() * 0.2) * 1e18)),
            participants: Math.floor(10 + Math.random() * 100),
            status: currentStatus
        };
    });
}
function generateMockSignals(count) {
    const assets = [
        "ETH",
        "BTC",
        "SOL",
        "AVAX",
        "MATIC",
        "ARB",
        "OP"
    ];
    const actions = [
        "BUY",
        "SELL",
        "HOLD"
    ];
    const now = Date.now() / 1000;
    return Array.from({
        length: count
    }, (_, i)=>({
            id: i + 1,
            timestamp: now - Math.random() * 86400 * 7,
            asset: assets[Math.floor(Math.random() * assets.length)],
            action: actions[Math.floor(Math.random() * actions.length)],
            targetPrice: BigInt(Math.floor((1000 + Math.random() * 5000) * 1e18)),
            stopLoss: BigInt(Math.floor((800 + Math.random() * 4000) * 1e18)),
            confidence: 60 + Math.random() * 35,
            isActive: Math.random() > 0.3,
            outcome: Math.random() > 0.5 ? "profit" : Math.random() > 0.5 ? "loss" : null,
            pnl: (Math.random() - 0.5) * 20
        }));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/lib/contracts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Contract ABIs and addresses for ERC-8004 AI Hedge Fund Protocol
// Network configuration
__turbopack_context__.s([
    "BASE_SEPOLIA_RPC",
    ()=>BASE_SEPOLIA_RPC,
    "CHAIN_ID",
    ()=>CHAIN_ID,
    "COMPETITION_ABI",
    ()=>COMPETITION_ABI,
    "CONTRACTS",
    ()=>CONTRACTS,
    "LOCAL_RPC",
    ()=>LOCAL_RPC,
    "MARKETPLACE_ABI",
    ()=>MARKETPLACE_ABI,
    "REGISTRY_ABI",
    ()=>REGISTRY_ABI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const CHAIN_ID = ("TURBOPACK compile-time truthy", 1) ? parseInt(("TURBOPACK compile-time value", "31337")) : "TURBOPACK unreachable" // Default to local
;
const BASE_SEPOLIA_RPC = ("TURBOPACK compile-time value", "http://localhost:8545") || "http://localhost:8545";
const LOCAL_RPC = "http://localhost:8545";
const CONTRACTS = {
    // Local Anvil deployment addresses
    REGISTRY: ("TURBOPACK compile-time value", "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9") || "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9",
    MARKETPLACE: ("TURBOPACK compile-time value", "0x0165878a594ca255338adfa4d48449f69242eb8f") || "0x0165878a594ca255338adfa4d48449f69242eb8f",
    COMPETITION: ("TURBOPACK compile-time value", "0xa513e6e4b8f2a923d98304ec87f64353c4d5c853") || "0xa513e6e4b8f2a923d98304ec87f64353c4d5c853",
    PAYMENT_TOKEN: __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_PAYMENT_TOKEN_ADDRESS || "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707"
};
const REGISTRY_ABI = [
    // View Functions
    "function getModelInfo(uint256 modelId) view returns (address owner, string modelURI, uint256 inferencePrice, uint256 totalInferences, uint256 accuracy)",
    "function getModelMetrics(uint256 modelId) view returns (uint256 correctPredictions, uint256 totalPredictions, int256 totalPnL, uint256 totalRevenue, uint256 accuracy)",
    "function getTopModels(uint256 count) view returns (uint256[] modelIds, uint256[] accuracies)",
    "function getInferenceResult(uint256 requestId) view returns (uint256 modelId, address requester, bytes outputData, uint256 confidence, uint256 timestamp)",
    "function getInvestmentInfo(uint256 modelId, address user) view returns (uint256 amount, uint256 lastInvestTimestamp, uint256 currentStreamingFee)",
    "function nextModelId() view returns (uint256)",
    "function ownerOf(uint256 tokenId) view returns (address)",
    "function investments(uint256 modelId, address user) view returns (uint256 amount, uint256 lastInvestTimestamp)",
    // Write Functions
    "function registerModel(string modelURI, uint256 inferencePrice, uint256 streamingRate) returns (uint256 modelId)",
    "function requestInference(uint256 modelId, bytes inputData) payable returns (uint256 requestId)",
    "function submitInference(uint256 requestId, bytes outputData, uint256 confidence)",
    "function updateModelPerformance(uint256 requestId, bool wasCorrect, int256 actualPnL)",
    "function invest(uint256 modelId) payable",
    "function withdraw(uint256 modelId, uint256 amount)",
    // Events
    "event ModelRegistered(uint256 indexed modelId, address indexed owner, string modelURI, uint256 inferencePrice)",
    "event InferenceRequested(uint256 indexed requestId, uint256 indexed modelId, address indexed requester, bytes inputData)",
    "event InferenceCompleted(uint256 indexed requestId, uint256 indexed modelId, bytes outputData, uint256 confidence)",
    "event PerformanceUpdated(uint256 indexed modelId, uint256 accuracy, uint256 totalInferences)",
    "event Invested(uint256 indexed modelId, address indexed user, uint256 amount)",
    "event Withdrawn(uint256 indexed modelId, address indexed user, uint256 amount)"
];
const MARKETPLACE_ABI = [
    // View Functions
    "function getLatestSignals(uint256 modelId, uint256 count) view returns (tuple(uint256 modelId, uint256 timestamp, string asset, string action, uint256 targetPrice, uint256 stopLoss, uint256 confidence, bytes extraData)[] signals)",
    "function getSignal(uint256 modelId, uint256 index) view returns (tuple(uint256 modelId, uint256 timestamp, string asset, string action, uint256 targetPrice, uint256 stopLoss, uint256 confidence, bytes extraData) signal)",
    "function getSignalCount(uint256 modelId) view returns (uint256)",
    "function getModelStats(uint256 modelId) view returns (uint256 subscribers, uint256 signals, uint256 monthlyPrice, uint256 signalPrice)",
    "function hasActiveSubscription(uint256 modelId, address user) view returns (bool)",
    "function getSubscription(uint256 modelId, address user) view returns (uint256 startTime, uint256 endTime, uint256 signalsReceived, bool isActive)",
    "function canAccessSignal(uint256 modelId, uint256 signalIndex, address user) view returns (bool)",
    // Write Functions
    "function setModelPricing(uint256 modelId, uint256 monthlyPrice, uint256 signalPrice)",
    "function subscribe(uint256 modelId, uint256 months)",
    "function purchaseSignal(uint256 modelId, uint256 signalIndex)",
    "function publishSignal(uint256 modelId, string asset, string action, uint256 targetPrice, uint256 stopLoss, uint256 confidence, bytes extraData)",
    "function cancelSubscription(uint256 modelId)",
    // Events
    "event Subscribed(uint256 indexed modelId, address indexed subscriber, uint256 duration)",
    "event SignalPublished(uint256 indexed modelId, string asset, string action, uint256 confidence, uint256 timestamp)",
    "event SignalPurchased(uint256 indexed modelId, address indexed buyer, uint256 price)"
];
const COMPETITION_ABI = [
    // View Functions
    "function getCompetition(uint256 competitionId) view returns (tuple(uint256 id, string name, uint256 startTime, uint256 endTime, uint256 entryFee, uint256 prizePool, uint8 status, uint256[] participantModels, uint256 winnerModelId, uint256 totalParticipants) competition)",
    "function getLeaderboard(uint256 competitionId) view returns (uint256[] modelIds, uint256[] scores)",
    "function getModelScore(uint256 competitionId, uint256 modelId) view returns (uint256 correctPredictions, uint256 totalPredictions, int256 totalPnL, uint256 finalScore)",
    "function getActiveCompetitions() view returns (uint256[] activeIds)",
    "function getCompetitionParticipants(uint256 competitionId) view returns (uint256[] modelIds, address[] owners)",
    "function canStartCompetition(uint256 competitionId) view returns (bool)",
    "function canCompleteCompetition(uint256 competitionId) view returns (bool)",
    "function competitionCount() view returns (uint256)",
    "function hasEntered(uint256 competitionId, uint256 modelId) view returns (bool)",
    // Write Functions
    "function createCompetition(string name, uint256 startTime, uint256 duration, uint256 entryFee) returns (uint256)",
    "function enterCompetition(uint256 competitionId, uint256 modelId) payable",
    "function startCompetition(uint256 competitionId)",
    "function recordPrediction(uint256 competitionId, uint256 modelId, bool wasCorrect, int256 pnl)",
    "function completeCompetition(uint256 competitionId)",
    "function cancelCompetition(uint256 competitionId)",
    // Events
    "event CompetitionCreated(uint256 indexed competitionId, string name, uint256 startTime, uint256 endTime)",
    "event ModelEntered(uint256 indexed competitionId, uint256 indexed modelId, address indexed owner)",
    "event CompetitionCompleted(uint256 indexed competitionId, uint256 indexed winnerModelId, uint256 prize)"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/lib/web3.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectWallet",
    ()=>connectWallet,
    "getBrowserProvider",
    ()=>getBrowserProvider,
    "getCompetitionContract",
    ()=>getCompetitionContract,
    "getCurrentChainId",
    ()=>getCurrentChainId,
    "getMarketplaceContract",
    ()=>getMarketplaceContract,
    "getProvider",
    ()=>getProvider,
    "getRegistryContract",
    ()=>getRegistryContract,
    "switchToBaseSepolia",
    ()=>switchToBaseSepolia
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/ethers/lib.esm/providers/provider-browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/ethers/lib.esm/providers/provider-jsonrpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/ethers/lib.esm/contract/contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/ethers/lib.esm/utils/units.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/contracts.ts [app-client] (ecmascript)");
;
;
async function connectWallet() {
    if (("TURBOPACK compile-time value", "object") === "undefined" || !window.ethereum) {
        throw new Error("MetaMask not installed");
    }
    try {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });
        return accounts[0] || null;
    } catch  {
        throw new Error("User rejected connection");
    }
}
async function switchToBaseSepolia() {
    if (!window.ethereum) return false;
    const chainIdHex = `0x${__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAIN_ID"].toString(16)}`;
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: chainIdHex
                }
            ]
        });
        return true;
    } catch (switchError) {
        const error = switchError;
        // Chain not added, try to add it
        if (error.code === 4902) {
            try {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: chainIdHex,
                            chainName: "Base Sepolia",
                            nativeCurrency: {
                                name: "ETH",
                                symbol: "ETH",
                                decimals: 18
                            },
                            rpcUrls: [
                                __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE_SEPOLIA_RPC"]
                            ],
                            blockExplorerUrls: [
                                "https://sepolia.basescan.org"
                            ]
                        }
                    ]
                });
                return true;
            } catch  {
                return false;
            }
        }
        return false;
    }
}
async function getCurrentChainId() {
    if (!window.ethereum) return null;
    try {
        const chainId = await window.ethereum.request({
            method: "eth_chainId"
        });
        return Number.parseInt(chainId, 16);
    } catch  {
        return null;
    }
}
function getProvider() {
    // Use local RPC if on local network, otherwise use Base Sepolia
    const rpcUrl = ("TURBOPACK compile-time truthy", 1) ? "http://localhost:8545" : "TURBOPACK unreachable";
    return new __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](rpcUrl);
}
async function getBrowserProvider() {
    if (!window.ethereum) return null;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrowserProvider"](window.ethereum);
}
function getRegistryContract(providerOrSigner) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Contract"](__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACTS"].REGISTRY, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRY_ABI"], providerOrSigner);
}
function getMarketplaceContract(providerOrSigner) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Contract"](__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACTS"].MARKETPLACE, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MARKETPLACE_ABI"], providerOrSigner);
}
function getCompetitionContract(providerOrSigner) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Contract"](__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACTS"].COMPETITION, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPETITION_ABI"], providerOrSigner);
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/hooks/use-wallet.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWallet",
    ()=>useWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/web3.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/contracts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function useWallet() {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        address: null,
        chainId: null,
        isConnecting: false,
        isCorrectChain: false
    });
    const checkConnection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWallet.useCallback[checkConnection]": async ()=>{
            if (("TURBOPACK compile-time value", "object") === "undefined" || !window.ethereum) return;
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_accounts"
                });
                const chainId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCurrentChainId"])();
                setState({
                    "useWallet.useCallback[checkConnection]": (prev)=>({
                            ...prev,
                            address: accounts[0] || null,
                            chainId,
                            isCorrectChain: chainId === __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAIN_ID"]
                        })
                }["useWallet.useCallback[checkConnection]"]);
            } catch  {
            // Silently fail
            }
        }
    }["useWallet.useCallback[checkConnection]"], []);
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWallet.useCallback[connect]": async ()=>{
            setState({
                "useWallet.useCallback[connect]": (prev)=>({
                        ...prev,
                        isConnecting: true
                    })
            }["useWallet.useCallback[connect]"]);
            try {
                const address = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["connectWallet"])();
                const chainId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCurrentChainId"])();
                if (chainId !== __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAIN_ID"]) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].loading("Switching to Base Sepolia...");
                    const switched = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["switchToBaseSepolia"])();
                    if (!switched) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Please switch to Base Sepolia network");
                    } else {
                        __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Connected to Base Sepolia!");
                    }
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Wallet connected!");
                }
                setState({
                    address,
                    chainId: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCurrentChainId"])(),
                    isConnecting: false,
                    isCorrectChain: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCurrentChainId"])() === __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAIN_ID"]
                });
            } catch (error) {
                const err = error;
                __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(err.message || "Failed to connect");
                setState({
                    "useWallet.useCallback[connect]": (prev)=>({
                            ...prev,
                            isConnecting: false
                        })
                }["useWallet.useCallback[connect]"]);
            }
        }
    }["useWallet.useCallback[connect]"], []);
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWallet.useCallback[disconnect]": ()=>{
            setState({
                address: null,
                chainId: null,
                isConnecting: false,
                isCorrectChain: false
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Wallet disconnected");
        }
    }["useWallet.useCallback[disconnect]"], []);
    const switchNetwork = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWallet.useCallback[switchNetwork]": async ()=>{
            const switched = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["switchToBaseSepolia"])();
            if (switched) {
                const chainId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCurrentChainId"])();
                setState({
                    "useWallet.useCallback[switchNetwork]": (prev)=>({
                            ...prev,
                            chainId,
                            isCorrectChain: chainId === __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAIN_ID"]
                        })
                }["useWallet.useCallback[switchNetwork]"]);
                __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Switched to Base Sepolia!");
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Failed to switch network");
            }
        }
    }["useWallet.useCallback[switchNetwork]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWallet.useEffect": ()=>{
            checkConnection();
            if (("TURBOPACK compile-time value", "object") !== "undefined" && window.ethereum) {
                const handleAccountsChanged = {
                    "useWallet.useEffect.handleAccountsChanged": (accounts)=>{
                        const accs = accounts;
                        setState({
                            "useWallet.useEffect.handleAccountsChanged": (prev)=>({
                                    ...prev,
                                    address: accs[0] || null
                                })
                        }["useWallet.useEffect.handleAccountsChanged"]);
                    }
                }["useWallet.useEffect.handleAccountsChanged"];
                const handleChainChanged = {
                    "useWallet.useEffect.handleChainChanged": async ()=>{
                        const chainId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCurrentChainId"])();
                        setState({
                            "useWallet.useEffect.handleChainChanged": (prev)=>({
                                    ...prev,
                                    chainId,
                                    isCorrectChain: chainId === __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAIN_ID"]
                                })
                        }["useWallet.useEffect.handleChainChanged"]);
                    }
                }["useWallet.useEffect.handleChainChanged"];
                window.ethereum.on("accountsChanged", handleAccountsChanged);
                window.ethereum.on("chainChanged", handleChainChanged);
                return ({
                    "useWallet.useEffect": ()=>{
                        window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
                        window.ethereum?.removeListener("chainChanged", handleChainChanged);
                    }
                })["useWallet.useEffect"];
            }
        }
    }["useWallet.useEffect"], [
        checkConnection
    ]);
    return {
        ...state,
        connect,
        disconnect,
        switchNetwork,
        isConnected: !!state.address
    };
}
_s(useWallet, "aTVQMokhT5FLF/Us6z3NFV5Y83k=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DropdownMenu",
    ()=>DropdownMenu,
    "DropdownMenuCheckboxItem",
    ()=>DropdownMenuCheckboxItem,
    "DropdownMenuContent",
    ()=>DropdownMenuContent,
    "DropdownMenuGroup",
    ()=>DropdownMenuGroup,
    "DropdownMenuItem",
    ()=>DropdownMenuItem,
    "DropdownMenuLabel",
    ()=>DropdownMenuLabel,
    "DropdownMenuPortal",
    ()=>DropdownMenuPortal,
    "DropdownMenuRadioGroup",
    ()=>DropdownMenuRadioGroup,
    "DropdownMenuRadioItem",
    ()=>DropdownMenuRadioItem,
    "DropdownMenuSeparator",
    ()=>DropdownMenuSeparator,
    "DropdownMenuShortcut",
    ()=>DropdownMenuShortcut,
    "DropdownMenuSub",
    ()=>DropdownMenuSub,
    "DropdownMenuSubContent",
    ()=>DropdownMenuSubContent,
    "DropdownMenuSubTrigger",
    ()=>DropdownMenuSubTrigger,
    "DropdownMenuTrigger",
    ()=>DropdownMenuTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRightIcon$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRightIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as CircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function DropdownMenu({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dropdown-menu",
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = DropdownMenu;
function DropdownMenuPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dropdown-menu-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c1 = DropdownMenuPortal;
function DropdownMenuTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dropdown-menu-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c2 = DropdownMenuTrigger;
function DropdownMenuContent({ className, sideOffset = 4, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "dropdown-menu-content",
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md', className),
            ...props
        }, void 0, false, {
            fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c3 = DropdownMenuContent;
function DropdownMenuGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "dropdown-menu-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c4 = DropdownMenuGroup;
function DropdownMenuItem({ className, inset, variant = 'default', ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "dropdown-menu-item",
        "data-inset": inset,
        "data-variant": variant,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_c5 = DropdownMenuItem;
function DropdownMenuCheckboxItem({ className, children, checked, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckboxItem"], {
        "data-slot": "dropdown-menu-checkbox-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        checked: checked,
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
_c6 = DropdownMenuCheckboxItem;
function DropdownMenuRadioGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroup"], {
        "data-slot": "dropdown-menu-radio-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
_c7 = DropdownMenuRadioGroup;
function DropdownMenuRadioItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioItem"], {
        "data-slot": "dropdown-menu-radio-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__["CircleIcon"], {
                        className: "size-2 fill-current"
                    }, void 0, false, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
_c8 = DropdownMenuRadioItem;
function DropdownMenuLabel({ className, inset, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "dropdown-menu-label",
        "data-inset": inset,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-2 py-1.5 text-sm font-medium data-[inset]:pl-8', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
        lineNumber: 154,
        columnNumber: 5
    }, this);
}
_c9 = DropdownMenuLabel;
function DropdownMenuSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "dropdown-menu-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-border -mx-1 my-1 h-px', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
_c10 = DropdownMenuSeparator;
function DropdownMenuShortcut({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        "data-slot": "dropdown-menu-shortcut",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground ml-auto text-xs tracking-widest', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
        lineNumber: 184,
        columnNumber: 5
    }, this);
}
_c11 = DropdownMenuShortcut;
function DropdownMenuSub({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sub"], {
        "data-slot": "dropdown-menu-sub",
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
        lineNumber: 198,
        columnNumber: 10
    }, this);
}
_c12 = DropdownMenuSub;
function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubTrigger"], {
        "data-slot": "dropdown-menu-sub-trigger",
        "data-inset": inset,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRightIcon$3e$__["ChevronRightIcon"], {
                className: "ml-auto size-4"
            }, void 0, false, {
                fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
        lineNumber: 210,
        columnNumber: 5
    }, this);
}
_c13 = DropdownMenuSubTrigger;
function DropdownMenuSubContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubContent"], {
        "data-slot": "dropdown-menu-sub-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx",
        lineNumber: 230,
        columnNumber: 5
    }, this);
}
_c14 = DropdownMenuSubContent;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14;
__turbopack_context__.k.register(_c, "DropdownMenu");
__turbopack_context__.k.register(_c1, "DropdownMenuPortal");
__turbopack_context__.k.register(_c2, "DropdownMenuTrigger");
__turbopack_context__.k.register(_c3, "DropdownMenuContent");
__turbopack_context__.k.register(_c4, "DropdownMenuGroup");
__turbopack_context__.k.register(_c5, "DropdownMenuItem");
__turbopack_context__.k.register(_c6, "DropdownMenuCheckboxItem");
__turbopack_context__.k.register(_c7, "DropdownMenuRadioGroup");
__turbopack_context__.k.register(_c8, "DropdownMenuRadioItem");
__turbopack_context__.k.register(_c9, "DropdownMenuLabel");
__turbopack_context__.k.register(_c10, "DropdownMenuSeparator");
__turbopack_context__.k.register(_c11, "DropdownMenuShortcut");
__turbopack_context__.k.register(_c12, "DropdownMenuSub");
__turbopack_context__.k.register(_c13, "DropdownMenuSubTrigger");
__turbopack_context__.k.register(_c14, "DropdownMenuSubContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/components/navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$hooks$2f$use$2d$wallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/hooks/use-wallet.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/store.js [app-client] (ecmascript) <export default as Store>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const navLinks = [
    {
        href: "/",
        label: "Dashboard",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
    },
    {
        href: "/models",
        label: "Models",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"]
    },
    {
        href: "/competitions",
        label: "Competitions",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"]
    },
    {
        href: "/marketplace",
        label: "Marketplace",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"]
    }
];
function Navbar() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { address, isConnected, isConnecting, isCorrectChain, connect, disconnect, switchNetwork } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$hooks$2f$use$2d$wallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWallet"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "sticky top-0 z-50 w-full glass border-b border-border/50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-16 items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex items-center gap-2 group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                            className: "w-5 h-5 text-primary-foreground"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                            lineNumber: 36,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                        lineNumber: 35,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-accent blur-lg opacity-50 group-hover:opacity-75 transition-opacity"
                                    }, void 0, false, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                        lineNumber: 38,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-xl hidden sm:block",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gradient",
                                    children: "ERC-8004"
                                }, void 0, false, {
                                    fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                    lineNumber: 41,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex items-center gap-1",
                        children: navLinks.map(({ href, label, icon: Icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: href,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300", pathname === href ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                        lineNumber: 58,
                                        columnNumber: 17
                                    }, this),
                                    label
                                ]
                            }, href, true, {
                                fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                lineNumber: 48,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: isConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                isCorrectChain ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon-green/20 text-neon-green text-xs font-medium",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-2 h-2 rounded-full bg-neon-green animate-pulse-glow"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                            lineNumber: 71,
                                            columnNumber: 21
                                        }, this),
                                        "Base Sepolia"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                    lineNumber: 70,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    size: "sm",
                                    onClick: switchNetwork,
                                    className: "text-destructive border-destructive/50 hover:bg-destructive/20 bg-transparent",
                                    children: "Switch Network"
                                }, void 0, false, {
                                    fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                    lineNumber: 75,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                className: "gap-2 gradient-border bg-transparent",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                                        className: "w-4 h-4 text-primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                                        lineNumber: 89,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-sm",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatAddress"])(address)
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                                        lineNumber: 90,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                        className: "w-4 h-4 text-muted-foreground"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                                        lineNumber: 91,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                                lineNumber: 88,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                            lineNumber: 87,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                            align: "end",
                                            className: "w-56 glass",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: `https://sepolia.basescan.org/address/${address}`,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                                                lineNumber: 102,
                                                                columnNumber: 25
                                                            }, this),
                                                            "View on BaseScan"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                                    lineNumber: 95,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                    onClick: disconnect,
                                                    className: "text-destructive focus:text-destructive",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                            className: "w-4 h-4 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                                            lineNumber: 108,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Disconnect"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                            lineNumber: 94,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                    lineNumber: 86,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: connect,
                            disabled: isConnecting,
                            className: "bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity",
                            children: isConnecting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                        lineNumber: 122,
                                        columnNumber: 21
                                    }, this),
                                    "Connecting..."
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                                        lineNumber: 127,
                                        columnNumber: 21
                                    }, this),
                                    "Connect Wallet"
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                            lineNumber: 115,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/navbar.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(Navbar, "AkktWvuK2JFOsSt89d7P10PqIRQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$hooks$2f$use$2d$wallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWallet"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/components/footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/contracts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/github.js [app-client] (ecmascript) <export default as Github>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
"use client";
;
;
;
;
;
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "mt-auto border-t border-border/50 glass",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                className: "w-4 h-4 text-primary-foreground"
                                            }, void 0, false, {
                                                fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                                lineNumber: 17,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                            lineNumber: 16,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-gradient",
                                            children: "ERC-8004"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                            lineNumber: 19,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                    lineNumber: 15,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: "The first AI hedge fund on blockchain. Verifiable, trustless, revolutionary."
                                }, void 0, false, {
                                    fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                    lineNumber: 21,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                            lineNumber: 14,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-semibold mb-4",
                                    children: "Resources"
                                }, void 0, false, {
                                    fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                    lineNumber: 28,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://github.com",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__["Github"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                                    lineNumber: 36,
                                                    columnNumber: 17
                                                }, this),
                                                "GitHub",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                    className: "w-3 h-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                                    lineNumber: 38,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                            lineNumber: 30,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://sepolia.basescan.org",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                                    lineNumber: 46,
                                                    columnNumber: 17
                                                }, this),
                                                "BaseScan"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                            lineNumber: 40,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                                    lineNumber: 53,
                                                    columnNumber: 17
                                                }, this),
                                                "Documentation"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                            lineNumber: 49,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-semibold mb-4",
                                    children: "Contract Addresses"
                                }, void 0, false, {
                                    fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACTS"]).map(([name, address])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: [
                                                        name,
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                                    lineNumber: 65,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["copyToClipboard"])(address),
                                                    className: "font-mono text-xs h-6 px-2",
                                                    children: [
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatAddress"])(address),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                            className: "w-3 h-3 ml-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                                            lineNumber: 73,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                                    lineNumber: 66,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, name, true, {
                                            fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                            lineNumber: 64,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 pt-4 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-muted-foreground",
                            children: "Powered by Base L2 Blockchain"
                        }, void 0, false, {
                            fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-2 h-2 rounded-full bg-neon-green animate-pulse-glow"
                                }, void 0, false, {
                                    fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-muted-foreground",
                                    children: "Base Sepolia"
                                }, void 0, false, {
                                    fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/footer.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/components/animated-background.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnimatedBackground",
    ()=>AnimatedBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function AnimatedBackground() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnimatedBackground.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            let animationId;
            let particles = [];
            const colors = [
                "rgba(139, 92, 246, 0.3)",
                "rgba(236, 72, 153, 0.3)",
                "rgba(59, 130, 246, 0.3)"
            ];
            const resize = {
                "AnimatedBackground.useEffect.resize": ()=>{
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                }
            }["AnimatedBackground.useEffect.resize"];
            const createParticles = {
                "AnimatedBackground.useEffect.createParticles": ()=>{
                    particles = [];
                    const count = Math.floor(canvas.width * canvas.height / 15000);
                    for(let i = 0; i < count; i++){
                        particles.push({
                            x: Math.random() * canvas.width,
                            y: Math.random() * canvas.height,
                            vx: (Math.random() - 0.5) * 0.5,
                            vy: (Math.random() - 0.5) * 0.5,
                            size: Math.random() * 2 + 1,
                            color: colors[Math.floor(Math.random() * colors.length)]
                        });
                    }
                }
            }["AnimatedBackground.useEffect.createParticles"];
            const animate = {
                "AnimatedBackground.useEffect.animate": ()=>{
                    ctx.fillStyle = "rgba(15, 23, 42, 0.1)";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    particles.forEach({
                        "AnimatedBackground.useEffect.animate": (particle, i)=>{
                            particle.x += particle.vx;
                            particle.y += particle.vy;
                            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                            ctx.beginPath();
                            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                            ctx.fillStyle = particle.color;
                            ctx.fill();
                            // Draw connections
                            particles.slice(i + 1).forEach({
                                "AnimatedBackground.useEffect.animate": (other)=>{
                                    const dx = particle.x - other.x;
                                    const dy = particle.y - other.y;
                                    const distance = Math.sqrt(dx * dx + dy * dy);
                                    if (distance < 150) {
                                        ctx.beginPath();
                                        ctx.moveTo(particle.x, particle.y);
                                        ctx.lineTo(other.x, other.y);
                                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 150)})`;
                                        ctx.stroke();
                                    }
                                }
                            }["AnimatedBackground.useEffect.animate"]);
                        }
                    }["AnimatedBackground.useEffect.animate"]);
                    animationId = requestAnimationFrame(animate);
                }
            }["AnimatedBackground.useEffect.animate"];
            resize();
            createParticles();
            animate();
            window.addEventListener("resize", {
                "AnimatedBackground.useEffect": ()=>{
                    resize();
                    createParticles();
                }
            }["AnimatedBackground.useEffect"]);
            return ({
                "AnimatedBackground.useEffect": ()=>{
                    cancelAnimationFrame(animationId);
                    window.removeEventListener("resize", resize);
                }
            })["AnimatedBackground.useEffect"];
        }
    }["AnimatedBackground.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "fixed inset-0 -z-10 pointer-events-none"
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/animated-background.tsx",
        lineNumber: 98,
        columnNumber: 10
    }, this);
}
_s(AnimatedBackground, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = AnimatedBackground;
var _c;
__turbopack_context__.k.register(_c, "AnimatedBackground");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden', {
    variants: {
        variant: {
            default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
            secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
            destructive: 'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'span';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/components/invest-withdraw.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvestWithdraw",
    ()=>InvestWithdraw
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function InvestWithdraw({ modelId, invested, onInvest, onWithdraw, streamingRate, lastInvestTimestamp }) {
    _s();
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [action, setAction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("invest");
    // Calculate streaming fee estimate
    const now = Math.floor(Date.now() / 1000);
    const timeElapsed = invested > 0 ? now - lastInvestTimestamp : 0;
    const streamingFee = invested > 0 ? streamingRate * timeElapsed * Number(amount || 0) / invested : 0;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            if (action === "invest") {
                // Start x402 stream
                await fetch("/api/x402/start", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        modelId,
                        amount: Number(amount)
                    })
                });
                await onInvest(Number(amount));
            } else {
                // Stop x402 stream
                await fetch("/api/x402/stop", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        modelId
                    })
                });
                await onWithdraw(Number(amount));
            }
            setAmount("");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: "space-y-4",
        onSubmit: handleSubmit,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        variant: action === "invest" ? "default" : "outline",
                        onClick: ()=>setAction("invest"),
                        children: "Invest"
                    }, void 0, false, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/invest-withdraw.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        variant: action === "withdraw" ? "default" : "outline",
                        onClick: ()=>setAction("withdraw"),
                        children: "Withdraw"
                    }, void 0, false, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/invest-withdraw.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/agent-hedge-fund/frontend/components/invest-withdraw.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                type: "number",
                min: "0",
                step: "0.0001",
                placeholder: action === "invest" ? "Amount to invest (ETH)" : "Amount to withdraw (ETH)",
                value: amount,
                onChange: (e)=>setAmount(e.target.value),
                disabled: loading
            }, void 0, false, {
                fileName: "[project]/agent-hedge-fund/frontend/components/invest-withdraw.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            action === "withdraw" && invested > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs text-muted-foreground",
                children: [
                    "Estimated streaming fee: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEth"])(BigInt(Math.floor(streamingFee)))
                    }, void 0, false, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/invest-withdraw.tsx",
                        lineNumber: 71,
                        columnNumber: 36
                    }, this),
                    " ETH"
                ]
            }, void 0, true, {
                fileName: "[project]/agent-hedge-fund/frontend/components/invest-withdraw.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                type: "submit",
                className: "w-full",
                disabled: loading || !amount || Number(amount) <= 0,
                children: loading ? "Processing..." : action === "invest" ? "Invest" : "Withdraw"
            }, void 0, false, {
                fileName: "[project]/agent-hedge-fund/frontend/components/invest-withdraw.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs text-muted-foreground mt-2",
                children: [
                    "Invested: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEth"])(BigInt(invested))
                    }, void 0, false, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/invest-withdraw.tsx",
                        lineNumber: 78,
                        columnNumber: 19
                    }, this),
                    " ETH",
                    invested > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            " | Duration: ",
                            timeElapsed,
                            "s"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/invest-withdraw.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/agent-hedge-fund/frontend/components/invest-withdraw.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/agent-hedge-fund/frontend/components/invest-withdraw.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(InvestWithdraw, "jTg7yKbyzDFRwr28U6JghF7DkIw=");
_c = InvestWithdraw;
var _c;
__turbopack_context__.k.register(_c, "InvestWithdraw");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/components/model-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModelCard",
    ()=>ModelCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$invest$2d$withdraw$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/invest-withdraw.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/contracts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/ethers/lib.esm/providers/provider-browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/ethers/lib.esm/contract/contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/ethers/lib.esm/utils/units.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$hooks$2f$use$2d$wallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/hooks/use-wallet.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
const strategyColors = {
    Momentum: "bg-neon-blue/20 text-neon-blue border-neon-blue/30",
    "Mean Reversion": "bg-neon-purple/20 text-neon-purple border-neon-purple/30",
    "ML-Based": "bg-neon-pink/20 text-neon-pink border-neon-pink/30",
    Breakout: "bg-neon-green/20 text-neon-green border-neon-green/30",
    Arbitrage: "bg-amber-500/20 text-amber-400 border-amber-500/30"
};
const actionColors = {
    BUY: "bg-neon-green/20 text-neon-green",
    SELL: "bg-destructive/20 text-destructive",
    HOLD: "bg-muted text-muted-foreground"
};
function ModelCard({ model }) {
    _s();
    const accuracyColor = model.accuracy >= 70 ? "text-neon-green" : model.accuracy >= 60 ? "text-amber-400" : "text-destructive";
    // Only run client-side code after mount
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ModelCard.useEffect": ()=>{
            setMounted(true);
        }
    }["ModelCard.useEffect"], []);
    // Wallet connection
    const { address, connect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$hooks$2f$use$2d$wallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWallet"])();
    const [invested, setInvested] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [streamingRate, setStreamingRate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1e15);
    const [lastInvestTimestamp, setLastInvestTimestamp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Math.floor(Date.now() / 1000) - 3600);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Helper to get provider safely
    function getProvider() {
        if (("TURBOPACK compile-time value", "object") !== "undefined" && window.ethereum) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrowserProvider"](window.ethereum);
        }
        throw new Error("No Ethereum provider found");
    }
    // Fetch live investment data for this user/model
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ModelCard.useEffect": ()=>{
            async function fetchInvestment() {
                if (!address) return;
                try {
                    const provider = getProvider();
                    const registry = new __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Contract"](__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACTS"].REGISTRY, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRY_ABI"], provider);
                    // Replace with actual investment mapping call if exposed in ABI
                    // Example: investments(model.id, address) returns (amount, lastInvestTimestamp)
                    const result = await registry.investments(model.id, address);
                    setInvested(Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(result.amount)));
                    setLastInvestTimestamp(Number(result.lastInvestTimestamp));
                    // Optionally fetch streamingRate from model info
                    const info = await registry.getModelInfo(model.id);
                    setStreamingRate(Number(info.streamingRate));
                } catch (err) {
                    // fallback to mock
                    setInvested(0);
                    setLastInvestTimestamp(Math.floor(Date.now() / 1000) - 3600);
                    setStreamingRate(1e15);
                }
            }
            fetchInvestment();
        }
    }["ModelCard.useEffect"], [
        address,
        model.id
    ]);
    async function handleInvest(amount) {
        if (!address) {
            await connect();
        }
        setLoading(true);
        try {
            const provider = getProvider();
            const signer = await provider.getSigner();
            const registry = new __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Contract"](__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACTS"].REGISTRY, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRY_ABI"], signer);
            const tx = await registry.invest(model.id, {
                value: BigInt(Math.floor(amount * 1e18))
            });
            await tx.wait();
            // Refresh investment info
            const result = await registry.investments(model.id, address);
            setInvested(Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(result.amount)));
            setLastInvestTimestamp(Number(result.lastInvestTimestamp));
        } finally{
            setLoading(false);
        }
    }
    async function handleWithdraw(amount) {
        if (!address) {
            await connect();
        }
        setLoading(true);
        try {
            const provider = getProvider();
            const signer = await provider.getSigner();
            const registry = new __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Contract"](__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACTS"].REGISTRY, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTRY_ABI"], signer);
            const tx = await registry.withdraw(model.id, BigInt(Math.floor(amount * 1e18)));
            await tx.wait();
            // Refresh investment info
            const result = await registry.investments(model.id, address);
            setInvested(Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(result.amount)));
            setLastInvestTimestamp(Number(result.lastInvestTimestamp));
        } finally{
            setLoading(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group relative p-6 rounded-xl glass border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            }, void 0, false, {
                fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-4xl",
                                        children: model.icon
                                    }, void 0, false, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-bold text-lg",
                                                children: model.name
                                            }, void 0, false, {
                                                fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                                lineNumber: 146,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground font-mono",
                                                children: model.owner
                                            }, void 0, false, {
                                                fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                                lineNumber: 147,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs", strategyColors[model.strategy]),
                                children: model.strategy
                            }, void 0, false, {
                                fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center my-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-24 h-24",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-full h-full -rotate-90",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "48",
                                            cy: "48",
                                            r: "40",
                                            stroke: "currentColor",
                                            strokeWidth: "8",
                                            fill: "none",
                                            className: "text-secondary"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                            lineNumber: 159,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "48",
                                            cy: "48",
                                            r: "40",
                                            stroke: "url(#gradient)",
                                            strokeWidth: "8",
                                            fill: "none",
                                            strokeLinecap: "round",
                                            strokeDasharray: `${model.accuracy * 2.51} 251`,
                                            className: "transition-all duration-1000"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                            lineNumber: 168,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                id: "gradient",
                                                x1: "0%",
                                                y1: "0%",
                                                x2: "100%",
                                                y2: "0%",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "0%",
                                                        stopColor: "#8b5cf6"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "100%",
                                                        stopColor: "#ec4899"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                                lineNumber: 180,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                            lineNumber: 179,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                    lineNumber: 158,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 flex flex-col items-center justify-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-bold", accuracyColor),
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPercent"])(model.accuracy)
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                            lineNumber: 187,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-muted-foreground",
                                            children: "Accuracy"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                            lineNumber: 188,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                            lineNumber: 157,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-2 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center p-2 rounded-lg bg-secondary/30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                        className: "w-4 h-4 mx-auto mb-1 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                        lineNumber: 196,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold",
                                        children: model.totalInferences.toLocaleString()
                                    }, void 0, false, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                        lineNumber: 197,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: "Inferences"
                                    }, void 0, false, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                lineNumber: 195,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center p-2 rounded-lg bg-secondary/30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        className: "w-4 h-4 mx-auto mb-1 text-neon-green"
                                    }, void 0, false, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold",
                                        children: [
                                            model.revenue.toFixed(2),
                                            " ETH"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: "Revenue"
                                    }, void 0, false, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                        lineNumber: 203,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center p-2 rounded-lg bg-secondary/30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                        className: "w-4 h-4 mx-auto mb-1 text-accent"
                                    }, void 0, false, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                        lineNumber: 206,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold",
                                        children: model.subscribers
                                    }, void 0, false, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                        lineNumber: 207,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: "Subscribers"
                                    }, void 0, false, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                        lineNumber: 208,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this),
                    model.latestSignal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between p-2 rounded-lg bg-secondary/30 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted-foreground",
                                children: "Latest Signal"
                            }, void 0, false, {
                                fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                lineNumber: 215,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs", actionColors[model.latestSignal.action]),
                                        children: model.latestSignal.action
                                    }, void 0, false, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                        lineNumber: 217,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium",
                                        children: model.latestSignal.asset
                                    }, void 0, false, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                        lineNumber: 220,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                lineNumber: 216,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                        lineNumber: 214,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center text-sm text-muted-foreground mb-4",
                        children: [
                            "Inference Price: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-foreground font-medium",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEth"])(model.inferencePrice)
                            }, void 0, false, {
                                fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                lineNumber: 227,
                                columnNumber: 28
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            asChild: true,
                            variant: "outline",
                            className: "flex-1 group/btn bg-transparent",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/model/${model.id}`,
                                children: [
                                    "View Details",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                        className: "w-3 h-3 ml-1 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                                    }, void 0, false, {
                                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                        lineNumber: 235,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                                lineNumber: 233,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this),
                    mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$invest$2d$withdraw$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvestWithdraw"], {
                        modelId: model.id,
                        invested: 0,
                        onInvest: async ()=>{},
                        onWithdraw: async ()=>{},
                        streamingRate: 1e15,
                        lastInvestTimestamp: Math.floor(Date.now() / 1000) - 3600
                    }, void 0, false, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                        lineNumber: 241,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/agent-hedge-fund/frontend/components/model-card.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
_s(ModelCard, "EsUqsY10DVYiT1wXER87j+hF530=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$hooks$2f$use$2d$wallet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWallet"]
    ];
});
_c = ModelCard;
var _c;
__turbopack_context__.k.register(_c, "ModelCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Label;
;
var _c;
__turbopack_context__.k.register(_c, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/components/ui/checkbox.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>Checkbox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/@radix-ui/react-checkbox/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function Checkbox({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "checkbox",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Indicator"], {
            "data-slot": "checkbox-indicator",
            className: "flex items-center justify-center text-current transition-none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                className: "size-3.5"
            }, void 0, false, {
                fileName: "[project]/agent-hedge-fund/frontend/components/ui/checkbox.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/agent-hedge-fund/frontend/components/ui/checkbox.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/checkbox.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = Checkbox;
;
var _c;
__turbopack_context__.k.register(_c, "Checkbox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/components/ui/slider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Slider",
    ()=>Slider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/@radix-ui/react-slider/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }) {
    _s();
    const _values = __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "Slider.useMemo[_values]": ()=>Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [
                min,
                max
            ]
    }["Slider.useMemo[_values]"], [
        value,
        defaultValue,
        min,
        max
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "slider",
        defaultValue: defaultValue,
        value: value,
        min: min,
        max: max,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col', className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Track"], {
                "data-slot": "slider-track",
                className: 'bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5',
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"], {
                    "data-slot": "slider-range",
                    className: 'bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full'
                }, void 0, false, {
                    fileName: "[project]/agent-hedge-fund/frontend/components/ui/slider.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/agent-hedge-fund/frontend/components/ui/slider.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            Array.from({
                length: _values.length
            }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Thumb"], {
                    "data-slot": "slider-thumb",
                    className: "border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                }, index, false, {
                    fileName: "[project]/agent-hedge-fund/frontend/components/ui/slider.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/slider.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(Slider, "g0y/PG/feYg861SE8jxuAUMRVc0=");
_c = Slider;
;
var _c;
__turbopack_context__.k.register(_c, "Slider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/components/ui/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/@radix-ui/react-select/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function Select({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "select",
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Select;
function SelectGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "select-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = SelectGroup;
function SelectValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Value"], {
        "data-slot": "select-value",
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = SelectValue;
function SelectTrigger({ className, size = 'default', children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "size-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c3 = SelectTrigger;
function SelectContent({ className, children, position = 'popper', ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "select-content",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md', position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', className),
            position: position,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('p-1', position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_c4 = SelectContent;
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "select-label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground px-2 py-1.5 text-xs', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
_c5 = SelectLabel;
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "select-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute right-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_c6 = SelectItem;
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "select-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-border pointer-events-none -mx-1 my-1 h-px', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_c7 = SelectSeparator;
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        "data-slot": "select-scroll-up-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex cursor-default items-center justify-center py-1', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
            lineNumber: 151,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
_c8 = SelectScrollUpButton;
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        "data-slot": "select-scroll-down-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex cursor-default items-center justify-center py-1', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
            lineNumber: 169,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/select.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
_c9 = SelectScrollDownButton;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Select");
__turbopack_context__.k.register(_c1, "SelectGroup");
__turbopack_context__.k.register(_c2, "SelectValue");
__turbopack_context__.k.register(_c3, "SelectTrigger");
__turbopack_context__.k.register(_c4, "SelectContent");
__turbopack_context__.k.register(_c5, "SelectLabel");
__turbopack_context__.k.register(_c6, "SelectItem");
__turbopack_context__.k.register(_c7, "SelectSeparator");
__turbopack_context__.k.register(_c8, "SelectScrollUpButton");
__turbopack_context__.k.register(_c9, "SelectScrollDownButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/components/ui/sheet.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sheet",
    ()=>Sheet,
    "SheetClose",
    ()=>SheetClose,
    "SheetContent",
    ()=>SheetContent,
    "SheetDescription",
    ()=>SheetDescription,
    "SheetFooter",
    ()=>SheetFooter,
    "SheetHeader",
    ()=>SheetHeader,
    "SheetTitle",
    ()=>SheetTitle,
    "SheetTrigger",
    ()=>SheetTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function Sheet({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "sheet",
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/sheet.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
_c = Sheet;
function SheetTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "sheet-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/sheet.tsx",
        lineNumber: 16,
        columnNumber: 10
    }, this);
}
_c1 = SheetTrigger;
function SheetClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "sheet-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/sheet.tsx",
        lineNumber: 22,
        columnNumber: 10
    }, this);
}
_c2 = SheetClose;
function SheetPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "sheet-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/sheet.tsx",
        lineNumber: 28,
        columnNumber: 10
    }, this);
}
_c3 = SheetPortal;
function SheetOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "sheet-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/sheet.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c4 = SheetOverlay;
function SheetContent({ className, children, side = 'right', ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetOverlay, {}, void 0, false, {
                fileName: "[project]/agent-hedge-fund/frontend/components/ui/sheet.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "sheet-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500', side === 'right' && 'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm', side === 'left' && 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm', side === 'top' && 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b', side === 'bottom' && 'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t', className),
                ...props,
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {
                                className: "size-4"
                            }, void 0, false, {
                                fileName: "[project]/agent-hedge-fund/frontend/components/ui/sheet.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/agent-hedge-fund/frontend/components/ui/sheet.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/agent-hedge-fund/frontend/components/ui/sheet.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/agent-hedge-fund/frontend/components/ui/sheet.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/sheet.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_c5 = SheetContent;
function SheetHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "sheet-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col gap-1.5 p-4', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/sheet.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_c6 = SheetHeader;
function SheetFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "sheet-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('mt-auto flex flex-col gap-2 p-4', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/sheet.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_c7 = SheetFooter;
function SheetTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "sheet-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-foreground font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/sheet.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_c8 = SheetTitle;
function SheetDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "sheet-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/sheet.tsx",
        lineNumber: 122,
        columnNumber: 5
    }, this);
}
_c9 = SheetDescription;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Sheet");
__turbopack_context__.k.register(_c1, "SheetTrigger");
__turbopack_context__.k.register(_c2, "SheetClose");
__turbopack_context__.k.register(_c3, "SheetPortal");
__turbopack_context__.k.register(_c4, "SheetOverlay");
__turbopack_context__.k.register(_c5, "SheetContent");
__turbopack_context__.k.register(_c6, "SheetHeader");
__turbopack_context__.k.register(_c7, "SheetFooter");
__turbopack_context__.k.register(_c8, "SheetTitle");
__turbopack_context__.k.register(_c9, "SheetDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/hooks/use-models.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useModel",
    ()=>useModel,
    "useModels",
    ()=>useModels
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/ethers/lib.esm/utils/units.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/web3.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const strategyIcons = {
    0: "🤖",
    1: "🧠",
    2: "⚡",
    3: "🔮",
    4: "📈",
    5: "🎯",
    6: "💡",
    7: "🚀",
    8: "🔥",
    9: "💎"
};
const strategies = [
    "Momentum",
    "Mean Reversion",
    "ML-Based",
    "Breakout",
    "Arbitrage"
];
function useModels(refreshInterval = 10000) {
    _s();
    const [models, setModels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchModels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useModels.useCallback[fetchModels]": async ()=>{
            try {
                const provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getProvider"])();
                const registry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getRegistryContract"])(provider);
                const marketplace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getMarketplaceContract"])(provider);
                // Get total number of models
                let totalModels = 0;
                try {
                    const nextModelId = await registry.nextModelId();
                    totalModels = Number(nextModelId) - 1; // nextModelId is 1-indexed, so subtract 1
                } catch (err) {
                    console.error("Error getting model count:", err);
                    // Try to fetch models one by one if nextModelId fails
                    for(let i = 1; i <= 100; i++){
                        try {
                            await registry.getModelInfo(i);
                            totalModels = i;
                        } catch  {
                            break;
                        }
                    }
                }
                if (totalModels === 0) {
                    setModels([]);
                    setLoading(false);
                    return;
                }
                // Get top models (or all if less than 10)
                const count = Math.min(totalModels, 50) // Fetch up to 50 models
                ;
                const [modelIds, accuracies] = await registry.getTopModels(count);
                // If no top models, fetch all models
                let allModelIds = [];
                if (modelIds.length === 0) {
                    allModelIds = Array.from({
                        length: totalModels
                    }, {
                        "useModels.useCallback[fetchModels]": (_, i)=>BigInt(i + 1)
                    }["useModels.useCallback[fetchModels]"]);
                } else {
                    allModelIds = modelIds.map({
                        "useModels.useCallback[fetchModels]": (id)=>BigInt(Number(id))
                    }["useModels.useCallback[fetchModels]"]);
                }
                // Fetch detailed info for each model
                const modelPromises = allModelIds.map({
                    "useModels.useCallback[fetchModels].modelPromises": async (modelId)=>{
                        try {
                            const [modelInfo, modelMetrics, modelStats] = await Promise.all([
                                registry.getModelInfo(modelId),
                                registry.getModelMetrics(modelId),
                                marketplace.getModelStats(modelId).catch({
                                    "useModels.useCallback[fetchModels].modelPromises": ()=>({
                                            subscribers: 0,
                                            signals: 0,
                                            monthlyPrice: 0n,
                                            signalPrice: 0n
                                        })
                                }["useModels.useCallback[fetchModels].modelPromises"])
                            ]);
                            // Get latest signal
                            let latestSignal;
                            try {
                                const signalCount = await marketplace.getSignalCount(modelId);
                                if (Number(signalCount) > 0) {
                                    const signals = await marketplace.getLatestSignals(modelId, 1);
                                    if (signals.length > 0 && signals[0]) {
                                        latestSignal = {
                                            action: signals[0].action,
                                            asset: signals[0].asset
                                        };
                                    }
                                }
                            } catch (err) {
                                // No signals yet or marketplace not initialized
                                console.debug(`No signals for model ${modelId}`);
                            }
                            // Extract model name from URI (simplified - in production, fetch from IPFS)
                            const modelName = modelInfo.modelURI.includes("Qm") ? `Model #${Number(modelId)}` : modelInfo.modelURI.split("/").pop() || `Model #${Number(modelId)}`;
                            return {
                                id: Number(modelId),
                                name: modelName,
                                owner: modelInfo.owner,
                                strategy: strategies[Number(modelId) % strategies.length],
                                accuracy: Number(modelMetrics.accuracy) / 100,
                                totalInferences: Number(modelInfo.totalInferences),
                                revenue: Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(modelMetrics.totalRevenue)),
                                subscribers: Number(modelStats.subscribers),
                                icon: strategyIcons[Number(modelId) % Object.keys(strategyIcons).length],
                                inferencePrice: modelInfo.inferencePrice,
                                latestSignal
                            };
                        } catch (err) {
                            console.error(`Error fetching model ${modelId}:`, err);
                            return null;
                        }
                    }
                }["useModels.useCallback[fetchModels].modelPromises"]);
                const fetchedModels = (await Promise.all(modelPromises)).filter({
                    "useModels.useCallback[fetchModels].fetchedModels": (model)=>model !== null
                }["useModels.useCallback[fetchModels].fetchedModels"]);
                // Sort by accuracy (descending)
                fetchedModels.sort({
                    "useModels.useCallback[fetchModels]": (a, b)=>b.accuracy - a.accuracy
                }["useModels.useCallback[fetchModels]"]);
                setModels(fetchedModels);
                setError(null);
            } catch (err) {
                console.error("Error fetching models:", err);
                setError(err instanceof Error ? err.message : "Failed to fetch models");
                __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Failed to fetch models from contract");
            } finally{
                setLoading(false);
            }
        }
    }["useModels.useCallback[fetchModels]"], []);
    // Initial fetch
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useModels.useEffect": ()=>{
            fetchModels();
        }
    }["useModels.useEffect"], [
        fetchModels
    ]);
    // Set up polling for real-time updates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useModels.useEffect": ()=>{
            const interval = setInterval({
                "useModels.useEffect.interval": ()=>{
                    fetchModels();
                }
            }["useModels.useEffect.interval"], refreshInterval);
            return ({
                "useModels.useEffect": ()=>clearInterval(interval)
            })["useModels.useEffect"];
        }
    }["useModels.useEffect"], [
        fetchModels,
        refreshInterval
    ]);
    // Set up event listeners for real-time updates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useModels.useEffect": ()=>{
            try {
                const provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getProvider"])();
                const registry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getRegistryContract"])(provider);
                // Listen for new model registrations
                const modelRegisteredFilter = registry.filters.ModelRegistered();
                const performanceUpdatedFilter = registry.filters.PerformanceUpdated();
                const handleModelRegistered = {
                    "useModels.useEffect.handleModelRegistered": ()=>{
                        console.log("New model registered, refreshing...");
                        fetchModels();
                    }
                }["useModels.useEffect.handleModelRegistered"];
                const handlePerformanceUpdated = {
                    "useModels.useEffect.handlePerformanceUpdated": ()=>{
                        console.log("Model performance updated, refreshing...");
                        fetchModels();
                    }
                }["useModels.useEffect.handlePerformanceUpdated"];
                provider.on(modelRegisteredFilter, handleModelRegistered);
                provider.on(performanceUpdatedFilter, handlePerformanceUpdated);
                return ({
                    "useModels.useEffect": ()=>{
                        provider.off(modelRegisteredFilter, handleModelRegistered);
                        provider.off(performanceUpdatedFilter, handlePerformanceUpdated);
                    }
                })["useModels.useEffect"];
            } catch (err) {
                console.error("Error setting up event listeners:", err);
            // Fallback to polling only
            }
        }
    }["useModels.useEffect"], [
        fetchModels
    ]);
    return {
        models,
        loading,
        error,
        refetch: fetchModels
    };
}
_s(useModels, "QBWzaaE3NyXqp7gzObZoFmMoQUU=");
function useModel(modelId) {
    _s1();
    const [model, setModel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [metrics, setMetrics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useModel.useEffect": ()=>{
            async function fetchModel() {
                try {
                    const provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getProvider"])();
                    const registry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getRegistryContract"])(provider);
                    const marketplace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$web3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getMarketplaceContract"])(provider);
                    const [modelInfo, modelMetrics, modelStats] = await Promise.all([
                        registry.getModelInfo(modelId),
                        registry.getModelMetrics(modelId),
                        marketplace.getModelStats(modelId).catch({
                            "useModel.useEffect.fetchModel": ()=>({
                                    subscribers: 0,
                                    signals: 0,
                                    monthlyPrice: 0n,
                                    signalPrice: 0n
                                })
                        }["useModel.useEffect.fetchModel"])
                    ]);
                    // Get latest signal
                    let latestSignal;
                    try {
                        const signals = await marketplace.getLatestSignals(modelId, 1);
                        if (signals.length > 0) {
                            latestSignal = {
                                action: signals[0].action,
                                asset: signals[0].asset
                            };
                        }
                    } catch  {
                    // No signals
                    }
                    const modelName = modelInfo.modelURI.includes("Qm") ? `Model #${modelId}` : modelInfo.modelURI.split("/").pop() || `Model #${modelId}`;
                    setModel({
                        id: modelId,
                        name: modelName,
                        owner: modelInfo.owner,
                        strategy: strategies[modelId % strategies.length],
                        accuracy: Number(modelMetrics.accuracy) / 100,
                        totalInferences: Number(modelInfo.totalInferences),
                        revenue: Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEther"])(modelMetrics.totalRevenue)),
                        subscribers: Number(modelStats.subscribers),
                        icon: strategyIcons[modelId % Object.keys(strategyIcons).length],
                        inferencePrice: modelInfo.inferencePrice,
                        latestSignal
                    });
                    setMetrics({
                        correctPredictions: Number(modelMetrics.correctPredictions),
                        totalPredictions: Number(modelMetrics.totalPredictions),
                        totalPnL: modelMetrics.totalPnL,
                        totalRevenue: modelMetrics.totalRevenue,
                        accuracy: Number(modelMetrics.accuracy) / 100
                    });
                } catch (err) {
                    console.error("Error fetching model:", err);
                    __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Failed to fetch model data");
                } finally{
                    setLoading(false);
                }
            }
            if (modelId) {
                fetchModel();
                // Poll for updates every 5 seconds
                const interval = setInterval(fetchModel, 5000);
                return ({
                    "useModel.useEffect": ()=>clearInterval(interval)
                })["useModel.useEffect"];
            }
        }
    }["useModel.useEffect"], [
        modelId
    ]);
    return {
        model,
        metrics,
        loading
    };
}
_s1(useModel, "lPLsDTWtdtVVF39asRJUpvxjxRU=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/agent-hedge-fund/frontend/app/models/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModelsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/navbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$animated$2d$background$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/animated-background.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$model$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/model-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/ui/checkbox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/ui/slider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/ui/sheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$hooks$2f$use$2d$models$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/hooks/use-models.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const strategies = [
    "Momentum",
    "Mean Reversion",
    "ML-Based",
    "Breakout",
    "Arbitrage"
];
function ModelsPage() {
    _s();
    // Fetch real-time data from contracts
    const { models, loading, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$hooks$2f$use$2d$models$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModels"])(10000) // Refresh every 10 seconds
    ;
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedStrategies, setSelectedStrategies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [accuracyRange, setAccuracyRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        0,
        100
    ]);
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("accuracy");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const filteredModels = models.filter((model)=>{
        const matchesSearch = model.name.toLowerCase().includes(search.toLowerCase());
        const matchesStrategy = selectedStrategies.length === 0 || selectedStrategies.includes(model.strategy);
        const matchesAccuracy = model.accuracy >= accuracyRange[0] && model.accuracy <= accuracyRange[1];
        return matchesSearch && matchesStrategy && matchesAccuracy;
    }).sort((a, b)=>{
        switch(sortBy){
            case "accuracy":
                return b.accuracy - a.accuracy;
            case "inferences":
                return b.totalInferences - a.totalInferences;
            case "revenue":
                return b.revenue - a.revenue;
            case "subscribers":
                return b.subscribers - a.subscribers;
            default:
                return 0;
        }
    });
    const toggleStrategy = (strategy)=>{
        setSelectedStrategies((prev)=>prev.includes(strategy) ? prev.filter((s)=>s !== strategy) : [
                ...prev,
                strategy
            ]);
    };
    const clearFilters = ()=>{
        setSelectedStrategies([]);
        setAccuracyRange([
            0,
            100
        ]);
        setSortBy("accuracy");
    };
    const FilterContent = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                            className: "text-sm font-medium mb-3 block",
                            children: "Strategy"
                        }, void 0, false, {
                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                            lineNumber: 68,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: strategies.map((strategy)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                            id: strategy,
                                            checked: selectedStrategies.includes(strategy),
                                            onCheckedChange: ()=>toggleStrategy(strategy)
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                            lineNumber: 72,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: strategy,
                                            className: "text-sm cursor-pointer",
                                            children: strategy
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                            lineNumber: 77,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, strategy, true, {
                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                            lineNumber: 69,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                    lineNumber: 67,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                            className: "text-sm font-medium mb-3 block",
                            children: [
                                "Accuracy Range: ",
                                accuracyRange[0],
                                "% - ",
                                accuracyRange[1],
                                "%"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                            lineNumber: 87,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                            value: accuracyRange,
                            onValueChange: setAccuracyRange,
                            min: 0,
                            max: 100,
                            step: 5,
                            className: "mt-2"
                        }, void 0, false, {
                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                            lineNumber: 90,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                    lineNumber: 86,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                            className: "text-sm font-medium mb-3 block",
                            children: "Sort By"
                        }, void 0, false, {
                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                            lineNumber: 95,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                            value: sortBy,
                            onValueChange: setSortBy,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                    className: "w-full bg-secondary/50 border-border/50",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                        fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                        lineNumber: 98,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                    lineNumber: 97,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                            value: "accuracy",
                                            children: "Highest Accuracy"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                            lineNumber: 101,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                            value: "inferences",
                                            children: "Most Inferences"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                            lineNumber: 102,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                            value: "revenue",
                                            children: "Highest Revenue"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                            lineNumber: 103,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                            value: "subscribers",
                                            children: "Most Subscribers"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                            lineNumber: 104,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                    lineNumber: 100,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                            lineNumber: 96,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                    lineNumber: 94,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    onClick: clearFilters,
                    className: "w-full bg-transparent",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-4 h-4 mr-2"
                        }, void 0, false, {
                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                            lineNumber: 111,
                            columnNumber: 9
                        }, this),
                        "Clear Filters"
                    ]
                }, void 0, true, {
                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                    lineNumber: 110,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
            lineNumber: 65,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$animated$2d$background$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatedBackground"], {}, void 0, false, {
                fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Navbar"], {}, void 0, false, {
                fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-3xl font-bold mb-2",
                                            children: "AI Trading Models"
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                            lineNumber: 127,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-muted-foreground",
                                            children: [
                                                "Explore ",
                                                models.length,
                                                " AI models competing for the best predictions",
                                                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2 text-primary",
                                                    children: "(Updating...)"
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                            lineNumber: 128,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>{
                                        refetch();
                                        __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Refreshing...");
                                    },
                                    disabled: loading,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                            className: `w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                            lineNumber: 134,
                                            columnNumber: 15
                                        }, this),
                                        "Refresh"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                    className: "hidden lg:block w-64 shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sticky top-24 p-6 rounded-xl glass border border-border/50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold mb-4 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Filters"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                lineNumber: 143,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterContent, {}, void 0, false, {
                                                fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                lineNumber: 147,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                        lineNumber: 142,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                    lineNumber: 141,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-3 mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                            className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                            lineNumber: 156,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            placeholder: "Search models...",
                                                            value: search,
                                                            onChange: (e)=>setSearch(e.target.value),
                                                            className: "pl-9 bg-secondary/50 border-border/50"
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                            lineNumber: 157,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
                                                    open: isMobileFilterOpen,
                                                    onOpenChange: setIsMobileFilterOpen,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTrigger"], {
                                                            asChild: true,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                variant: "outline",
                                                                className: "lg:hidden bg-transparent",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                                                        className: "w-4 h-4 mr-2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                                        lineNumber: 169,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Filters"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                                lineNumber: 168,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                            lineNumber: 167,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
                                                            side: "left",
                                                            className: "w-80 glass",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetHeader"], {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTitle"], {
                                                                        children: "Filters"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                                        lineNumber: 175,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                                    lineNumber: 174,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-6",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterContent, {}, void 0, false, {
                                                                        fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                                        lineNumber: 178,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                                    lineNumber: 177,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                            lineNumber: 173,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                            lineNumber: 154,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground mb-4",
                                            children: [
                                                "Showing ",
                                                filteredModels.length,
                                                " models"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                            lineNumber: 185,
                                            columnNumber: 15
                                        }, this),
                                        loading && models.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center py-16",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                    className: "w-8 h-8 mx-auto animate-spin text-primary mb-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-muted-foreground",
                                                    children: "Loading models from contract..."
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                            lineNumber: 189,
                                            columnNumber: 17
                                        }, this) : filteredModels.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",
                                            children: filteredModels.map((model)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$model$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelCard"], {
                                                    model: model
                                                }, model.id, false, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                    lineNumber: 196,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                            lineNumber: 194,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center py-16",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-6xl mb-4",
                                                    children: "🔍"
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-semibold mb-2",
                                                    children: "No models found"
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-muted-foreground mb-4",
                                                    children: models.length === 0 ? "No models registered yet. Be the first to register a model!" : "Try adjusting your filters or search terms"
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                    lineNumber: 203,
                                                    columnNumber: 19
                                                }, this),
                                                models.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    onClick: clearFilters,
                                                    children: "Clear Filters"
                                                }, void 0, false, {
                                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                            lineNumber: 200,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                            lineNumber: 139,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/agent-hedge-fund/frontend/app/models/page.tsx",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
_s(ModelsPage, "XNz4NM+VjnK8ZWzqF8I/H1tAxj8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$hooks$2f$use$2d$models$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModels"]
    ];
});
_c = ModelsPage;
var _c;
__turbopack_context__.k.register(_c, "ModelsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=agent-hedge-fund_frontend_0f6a4963._.js.map