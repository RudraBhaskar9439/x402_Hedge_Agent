const { ethers } = require('ethers');

/**
 * HTTP 402 Payment Required Middleware
 * Verifies that user has paid for access to protected resources
 */
const x402Middleware = (resourceType) => {
    return async (req, res, next) => {
        const { resourceId } = req.params;
        const userAddress = req.headers['x-wallet-address'];

        if (!userAddress) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Wallet address required in x-wallet-address header'
            });
        }

        try {
            // Check if user has already paid for this resource
            const payment = await req.db.collection('payments').findOne({
                userAddress: userAddress.toLowerCase(),
                resourceType,
                resourceId,
                status: 'verified',
                expiresAt: { $gt: new Date() }
            });

            if (payment) {
                // Payment found and valid
                req.paymentInfo = payment;
                return next();
            }

            // No valid payment found - return 402 Payment Required
            const feeAmount = getFeeAmount(resourceType);

            return res.status(402).json({
                error: 'Payment Required',
                message: `Payment of ${feeAmount} ETH required to access this resource`,
                paymentDetails: {
                    resourceType,
                    resourceId,
                    amount: feeAmount,
                    currency: 'ETH',
                    paymentAddress: process.env.PAYMENT_WALLET_ADDRESS,
                    network: 'Base Sepolia',
                    chainId: 84532
                },
                instructions: {
                    step1: 'Send exact payment amount to the payment address',
                    step2: 'Call POST /api/payment/verify with transaction hash',
                    step3: 'Retry this request after payment verification'
                }
            });

        } catch (error) {
            console.error('X402 Middleware error:', error);
            return res.status(500).json({ error: 'Payment verification failed' });
        }
    };
};

/**
 * Get fee amount for resource type
 */
function getFeeAmount(resourceType) {
    const fees = {
        'model-details': process.env.VIEW_DETAILS_FEE || '0.0001',
        'deposit': process.env.DEPOSIT_FEE || '0.0002',
        'competition-entry': process.env.COMPETITION_ENTRY_FEE || '0.0005'
    };

    return fees[resourceType] || '0.0001';
}

/**
 * Optional: Session-based middleware (faster for repeated access)
 */
const x402SessionMiddleware = (resourceType) => {
    return async (req, res, next) => {
        const { resourceId } = req.params;
        const sessionKey = `paid_${resourceType}_${resourceId}`;

        // Check session first (faster)
        if (req.session && req.session[sessionKey]) {
            return next();
        }

        // Fall back to database check
        return x402Middleware(resourceType)(req, res, next);
    };
};

module.exports = {
    x402Middleware,
    x402SessionMiddleware
};
