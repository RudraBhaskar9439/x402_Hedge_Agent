const express = require('express');
const { x402Middleware } = require('../middleware/x402');

const router = express.Router();

/**
 * GET /api/models
 * Public endpoint - list all models (basic info only)
 */
router.get('/', async (req, res) => {
    try {
        // Return mock data or fetch from your database
        const models = [
            {
                id: 1,
                name: 'AlphaNeural',
                strategy: 'Momentum',
                accuracy: 87.5,
                icon: '🤖',
                subscribers: 245
            },
            {
                id: 2,
                name: 'QuantumPredictor',
                strategy: 'ML-Based',
                accuracy: 82.3,
                icon: '🧠',
                subscribers: 189
            },
            {
                id: 3,
                name: 'DeepTrade AI',
                strategy: 'Mean Reversion',
                accuracy: 79.8,
                icon: '⚡',
                subscribers: 312
            }
        ];

        res.json({ models });
    } catch (error) {
        console.error('Error fetching models:', error);
        res.status(500).json({ error: 'Failed to fetch models' });
    }
});

/**
 * GET /api/models/:resourceId/details
 * Protected endpoint - requires payment (HTTP 402)
 * Returns detailed model analytics
 */
router.get('/:resourceId/details', x402Middleware('model-details'), async (req, res) => {
    const { resourceId } = req.params;

    try {
        // This code only runs if payment is verified
        // Return premium model data
        const modelDetails = {
            id: resourceId,
            name: 'AlphaNeural',
            strategy: 'Momentum',

            // Premium data (only accessible after payment)
            detailedMetrics: {
                accuracy: 87.5,
                sharpeRatio: 2.34,
                maxDrawdown: -12.5,
                winRate: 68.2,
                avgProfit: 3.2,
                avgLoss: -1.8,
                profitFactor: 2.1
            },

            performanceHistory: generatePerformanceData(),

            recentSignals: [
                {
                    timestamp: Date.now() - 3600000,
                    asset: 'ETH',
                    action: 'BUY',
                    confidence: 85,
                    outcome: 'profit',
                    pnl: 2.3
                },
                {
                    timestamp: Date.now() - 7200000,
                    asset: 'BTC',
                    action: 'SELL',
                    confidence: 78,
                    outcome: 'profit',
                    pnl: 1.8
                }
            ],

            riskMetrics: {
                volatility: 15.2,
                beta: 1.1,
                alpha: 0.05,
                informationRatio: 1.8
            }
        };

        res.json({
            success: true,
            data: modelDetails,
            payment: req.paymentInfo
        });

    } catch (error) {
        console.error('Error fetching model details:', error);
        res.status(500).json({ error: 'Failed to fetch model details' });
    }
});

// ... existing imports

/**
 * GET /api/models/user/portfolio
 * Fetch user's investments and unlocked models
 */
router.get('/user/portfolio', async (req, res) => {
    const userAddress = req.headers['x-wallet-address'];

    if (!userAddress) {
        return res.status(400).json({ error: 'Wallet address required' });
    }

    try {
        const db = req.db; // Access DB from middleware

        // Fetch investments
        const investments = await db.collection('investments')
            .find({ userAddress })
            .toArray();

        // Fetch unlocked models (payments)
        const payments = await db.collection('payments')
            .find({
                userAddress,
                resourceType: 'model-details',
                status: 'verified'
            })
            .toArray();

        // Calculate totals
        const totalInvested = investments.reduce((acc, inv) => acc + parseFloat(inv.amount || 0), 0);
        const totalInferences = payments.length;

        res.json({
            investments,
            payments,
            summary: {
                totalInvested,
                totalInferences,
                activeInvestments: investments.length,
                unlockedModels: payments.length
            }
        });

    } catch (error) {
        console.error('Error fetching user portfolio:', error);
        res.status(500).json({ error: 'Failed to fetch portfolio' });
    }
});

/**
 * POST /api/models/:resourceId/invest
 * Protected endpoint - requires payment for deposit fee
 */
// ... existing invest endpoint
router.post('/:resourceId/invest', x402Middleware('deposit'), async (req, res) => {
    const { resourceId } = req.params;
    const { amount, investmentTxHash } = req.body;

    try {
        // Verify the investment transaction
        // Store investment record
        const investment = {
            modelId: resourceId,
            userAddress: req.headers['x-wallet-address'],
            amount,
            txHash: investmentTxHash,
            timestamp: new Date(),
            status: 'confirmed'
        };

        await req.db.collection('investments').insertOne(investment);

        res.json({
            success: true,
            message: 'Investment processed successfully',
            investment
        });

    } catch (error) {
        console.error('Investment error:', error);
        res.status(500).json({ error: 'Investment failed' });
    }
});

/**
 * Helper function to generate mock performance data
 */
function generatePerformanceData() {
    const data = [];
    const now = Date.now();

    for (let i = 30; i >= 0; i--) {
        data.push({
            date: new Date(now - i * 24 * 60 * 60 * 1000).toISOString(),
            accuracy: 60 + Math.random() * 30,
            pnl: (Math.random() - 0.3) * 5
        });
    }

    return data;
}

module.exports = router;
