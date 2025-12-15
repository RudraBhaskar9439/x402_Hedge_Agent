const express = require('express');
const { ethers } = require('ethers');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Initialize provider for Base Sepolia
const provider = new ethers.JsonRpcProvider(process.env.BASE_SEPOLIA_RPC);

/**
 * POST /api/payment/verify
 * Verify a payment transaction and grant access
 */
router.post('/verify', async (req, res) => {
    const { txHash, resourceType, resourceId, userAddress } = req.body;

    if (!txHash || !resourceType || !resourceId || !userAddress) {
        return res.status(400).json({
            error: 'Missing required fields',
            required: ['txHash', 'resourceType', 'resourceId', 'userAddress']
        });
    }

    try {
        // 1. Fetch transaction from blockchain
        const tx = await provider.getTransaction(txHash);

        if (!tx) {
            return res.status(404).json({
                error: 'Transaction not found',
                message: 'Please wait for transaction to be confirmed'
            });
        }

        // 2. Wait for confirmation
        const receipt = await tx.wait();

        if (!receipt || receipt.status !== 1) {
            return res.status(400).json({
                error: 'Transaction failed',
                message: 'Transaction was not successful'
            });
        }

        // 3. Verify payment details
        const expectedAmount = ethers.parseEther(getFeeAmount(resourceType));
        const actualAmount = tx.value;
        const expectedRecipient = process.env.PAYMENT_WALLET_ADDRESS.toLowerCase();
        const actualRecipient = tx.to?.toLowerCase();
        const sender = tx.from.toLowerCase();

        // Verify sender matches user
        if (sender !== userAddress.toLowerCase()) {
            return res.status(400).json({
                error: 'Invalid sender',
                message: 'Transaction sender does not match user address'
            });
        }

        // Verify recipient
        if (actualRecipient !== expectedRecipient) {
            return res.status(400).json({
                error: 'Invalid recipient',
                message: 'Payment sent to wrong address'
            });
        }

        // Verify amount (allow small variance for gas)
        if (actualAmount < expectedAmount) {
            return res.status(400).json({
                error: 'Insufficient payment',
                message: `Expected ${ethers.formatEther(expectedAmount)} ETH, received ${ethers.formatEther(actualAmount)} ETH`
            });
        }

        // 4. Check if transaction already used
        const existingPayment = await req.db.collection('payments').findOne({ txHash });

        if (existingPayment) {
            return res.status(400).json({
                error: 'Transaction already used',
                message: 'This transaction has already been used for payment'
            });
        }

        // 5. Store payment in database
        const payment = {
            paymentId: uuidv4(),
            txHash,
            userAddress: userAddress.toLowerCase(),
            resourceType,
            resourceId,
            amount: ethers.formatEther(actualAmount),
            currency: 'ETH',
            status: 'verified',
            blockNumber: receipt.blockNumber,
            timestamp: new Date(),
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        };

        await req.db.collection('payments').insertOne(payment);

        // 6. Store in session for faster access
        if (req.session) {
            const sessionKey = `paid_${resourceType}_${resourceId}`;
            req.session[sessionKey] = true;
        }

        // 7. Return success
        res.json({
            success: true,
            message: 'Payment verified successfully',
            payment: {
                paymentId: payment.paymentId,
                resourceType,
                resourceId,
                amount: payment.amount,
                expiresAt: payment.expiresAt
            }
        });

    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({
            error: 'Verification failed',
            message: error.message
        });
    }
});

/**
 * GET /api/payment/status/:resourceType/:resourceId
 * Check payment status for a resource
 */
router.get('/status/:resourceType/:resourceId', async (req, res) => {
    const { resourceType, resourceId } = req.params;
    const userAddress = req.headers['x-wallet-address'];

    if (!userAddress) {
        return res.status(401).json({ error: 'Wallet address required' });
    }

    try {
        const payment = await req.db.collection('payments').findOne({
            userAddress: userAddress.toLowerCase(),
            resourceType,
            resourceId,
            status: 'verified',
            expiresAt: { $gt: new Date() }
        });

        if (payment) {
            res.json({
                paid: true,
                payment: {
                    paymentId: payment.paymentId,
                    amount: payment.amount,
                    timestamp: payment.timestamp,
                    expiresAt: payment.expiresAt
                }
            });
        } else {
            res.json({
                paid: false,
                required: {
                    amount: getFeeAmount(resourceType),
                    currency: 'ETH',
                    paymentAddress: process.env.PAYMENT_WALLET_ADDRESS
                }
            });
        }
    } catch (error) {
        console.error('Status check error:', error);
        res.status(500).json({ error: 'Status check failed' });
    }
});

/**
 * GET /api/payment/history
 * Get payment history for user
 */
router.get('/history', async (req, res) => {
    const userAddress = req.headers['x-wallet-address'];

    if (!userAddress) {
        return res.status(401).json({ error: 'Wallet address required' });
    }

    try {
        const payments = await req.db.collection('payments')
            .find({ userAddress: userAddress.toLowerCase() })
            .sort({ timestamp: -1 })
            .limit(50)
            .toArray();

        res.json({ payments });
    } catch (error) {
        console.error('History fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

/**
 * Helper function to get fee amount
 */
function getFeeAmount(resourceType) {
    const fees = {
        'model-details': process.env.VIEW_DETAILS_FEE || '0.0001',
        'deposit': process.env.DEPOSIT_FEE || '0.0002',
        'competition-entry': process.env.COMPETITION_ENTRY_FEE || '0.0005'
    };

    return fees[resourceType] || '0.0001';
}

module.exports = router;
