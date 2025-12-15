module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/agent-hedge-fund/frontend/lib/payment-middleware.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * X402 Payment Middleware
 * Handles micropayments for API endpoints
 */ __turbopack_context__.s([
    "PAYMENT_CONFIG",
    ()=>PAYMENT_CONFIG,
    "getPaymentAmount",
    ()=>getPaymentAmount,
    "paymentMiddleware",
    ()=>paymentMiddleware,
    "verifyPayment",
    ()=>verifyPayment
]);
const PAYMENT_CONFIG = {
    "GET /api/models/[id]/details": {
        accepts: [
            "ethereum",
            "base-sepolia"
        ],
        description: "View model details and analytics",
        amount: "0.0001",
        amountWei: BigInt("100000000000000")
    },
    "POST /api/models/[id]/invest": {
        accepts: [
            "ethereum",
            "base-sepolia"
        ],
        description: "Deposit funds into AI model",
        amount: "0.0002",
        amountWei: BigInt("200000000000000")
    },
    "POST /api/competitions/[id]/enter": {
        accepts: [
            "ethereum",
            "base-sepolia"
        ],
        description: "Enter model into competition",
        amount: "0.0005",
        amountWei: BigInt("500000000000000")
    }
};
function paymentMiddleware(routes) {
    return async (req, route)=>{
        const config = routes[route];
        if (!config) {
            return {
                authorized: true
            } // Route not protected
            ;
        }
        // Get payment from request headers or body
        const paymentProof = req.headers.get("x-payment-proof");
        const paymentAddress = req.headers.get("x-payment-address");
        const paymentAmount = req.headers.get("x-payment-amount");
        // For now, we'll verify payment on the backend
        // In production, this would verify on-chain payment or use x402 SDK
        if (!paymentProof || !paymentAddress) {
            return {
                authorized: false,
                error: `Payment required: ${config.description} (${config.amount} ETH)`
            };
        }
        // Verify payment amount matches
        if (paymentAmount && BigInt(paymentAmount) < config.amountWei) {
            return {
                authorized: false,
                error: `Insufficient payment. Required: ${config.amount} ETH`
            };
        }
        // TODO: Verify payment proof on-chain or with x402 SDK
        // For now, we'll accept any payment proof (for testing)
        return {
            authorized: true
        };
    };
}
function getPaymentAmount(route) {
    const config = PAYMENT_CONFIG[route];
    if (!config) return null;
    return {
        amount: config.amount,
        amountWei: config.amountWei
    };
}
async function verifyPayment(address, amount, proof, route) {
    // TODO: Implement actual payment verification
    // For testnet, we can accept any proof
    // In production, verify on-chain transaction or x402 stream
    const config = PAYMENT_CONFIG[route];
    if (!config) return false;
    // Verify amount matches
    if (amount < config.amountWei) {
        return false;
    }
    // For testing, accept any proof
    // In production, verify the proof is valid
    return true;
}
}),
"[project]/agent-hedge-fund/frontend/app/api/models/[id]/details/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$payment$2d$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/agent-hedge-fund/frontend/lib/payment-middleware.ts [app-route] (ecmascript)");
;
;
const middleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$payment$2d$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paymentMiddleware"])(__TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$lib$2f$payment$2d$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PAYMENT_CONFIG"]);
async function GET(req, { params }) {
    const resolvedParams = await params;
    const modelId = resolvedParams.id;
    // Check payment
    const { authorized, error } = await middleware(req, "GET /api/models/[id]/details");
    if (!authorized) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error || "Payment required",
            requiresPayment: true
        }, {
            status: 402
        } // Payment Required
        );
    }
    // Payment verified, return model details
    // In production, fetch from contract or database
    return __TURBOPACK__imported__module__$5b$project$5d2f$agent$2d$hedge$2d$fund$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        modelId: Number(modelId),
        details: "Full model details unlocked after payment"
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__257d786a._.js.map