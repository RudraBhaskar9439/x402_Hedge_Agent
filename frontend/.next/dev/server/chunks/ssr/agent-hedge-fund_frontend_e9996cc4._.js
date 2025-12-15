module.exports = [
"[project]/agent-hedge-fund/frontend/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    ()=>generateMockSignals,
    "parseEther",
    ()=>parseEther
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
;
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatAddress(address) {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
function formatEth(wei) {
    const eth = typeof wei === "bigint" ? Number(wei) / 1e18 : wei;
    return `${eth.toFixed(4)} ETH`;
}
function parseEther(eth) {
    const ethNum = typeof eth === "string" ? parseFloat(eth) : eth;
    return BigInt(Math.floor(ethNum * 1e18));
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
    __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success("Copied to clipboard!");
}
// Deterministic pseudo-random number generator
function pseudoRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
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
    }, (_, i)=>{
        // sead based on index i to ensure consistency across renders
        const r1 = pseudoRandom(i * 13.37);
        const r2 = pseudoRandom(i * 7.11 + 100);
        const r3 = pseudoRandom(i * 3.14 + 200);
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
                asset: assets[Math.floor(r2 * assets.length)]
            }
        };
    });
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
        // deterministic randoms
        const r1 = pseudoRandom(i * 42.1);
        const r2 = pseudoRandom(i * 19.9 + 50);
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
            prizePool: BigInt(Math.floor((5 + r1 * 20) * 1e18)),
            entryFee: BigInt(Math.floor((0.05 + r2 * 0.2) * 1e18)),
            participants: Math.floor(10 + r1 * 100),
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
    }, (_, i)=>{
        const r1 = pseudoRandom(i * 123.45);
        const r2 = pseudoRandom(i * 67.89 + 1000);
        const r3 = pseudoRandom(i * 99.99 + 2000);
        return {
            id: i + 1,
            timestamp: now - r1 * 86400 * 7,
            asset: assets[Math.floor(r1 * assets.length)],
            action: actions[Math.floor(r2 * actions.length)],
            targetPrice: BigInt(Math.floor((1000 + r3 * 5000) * 1e18)),
            stopLoss: BigInt(Math.floor((800 + r1 * 4000) * 1e18)),
            confidence: 60 + r2 * 35,
            isActive: r3 > 0.3,
            outcome: r1 > 0.5 ? "profit" : r2 > 0.5 ? "loss" : null,
            pnl: (r3 - 0.5) * 20
        };
    });
}
}),
"[project]/agent-hedge-fund/frontend/components/ui/card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('px-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center px-6 [.border-t]:pt-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/agent-hedge-fund/frontend/app/competitions/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CompetitionsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/lucide-react/dist/esm/icons/trophy.js [app-ssr] (ecmascript) <export default as Trophy>");
"use client";
;
;
;
function CompetitionsPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto px-4 py-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center min-h-[60vh] text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                        className: "w-12 h-12 text-primary"
                    }, void 0, false, {
                        fileName: "[project]/agent-hedge-fund/frontend/app/competitions/page.tsx",
                        lineNumber: 11,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/agent-hedge-fund/frontend/app/competitions/page.tsx",
                    lineNumber: 10,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-4xl font-bold tracking-tight mb-4",
                    children: "Competitions"
                }, void 0, false, {
                    fileName: "[project]/agent-hedge-fund/frontend/app/competitions/page.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xl text-muted-foreground max-w-md mb-8",
                    children: "The Trading Competitions feature is currently under development. Soon you'll be able to compete with other investors and models for prize pools!"
                }, void 0, false, {
                    fileName: "[project]/agent-hedge-fund/frontend/app/competitions/page.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                    className: "p-6 bg-muted/50 border-dashed",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-sm text-muted-foreground",
                        children: "Status: Coming Soon"
                    }, void 0, false, {
                        fileName: "[project]/agent-hedge-fund/frontend/app/competitions/page.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/agent-hedge-fund/frontend/app/competitions/page.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/agent-hedge-fund/frontend/app/competitions/page.tsx",
            lineNumber: 9,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/agent-hedge-fund/frontend/app/competitions/page.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=agent-hedge-fund_frontend_e9996cc4._.js.map