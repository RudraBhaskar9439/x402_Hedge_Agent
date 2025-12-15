# X402 Off-Chain Payment Backend

HTTP 402 Payment Required middleware for AI Hedge Fund micropayments.

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env and add your PAYMENT_WALLET_ADDRESS

# Start server
npm run dev
```

## Environment Variables

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/x402_payments
SESSION_SECRET=your-secret-key
PAYMENT_WALLET_ADDRESS=0xYourWalletAddress
BASE_SEPOLIA_RPC=https://sepolia.base.org
VIEW_DETAILS_FEE=0.0001
DEPOSIT_FEE=0.0002
COMPETITION_ENTRY_FEE=0.0005
FRONTEND_URL=http://localhost:3000
```

## API Endpoints

### Payment Endpoints

**POST /api/payment/verify**
- Verify a blockchain payment
- Body: `{ txHash, resourceType, resourceId, userAddress }`

**GET /api/payment/status/:resourceType/:resourceId**
- Check payment status
- Header: `x-wallet-address: 0x...`

**GET /api/payment/history**
- Get user's payment history
- Header: `x-wallet-address: 0x...`

### Model Endpoints

**GET /api/models**
- List all models (public)

**GET /api/models/:id/details** 🔒
- Get detailed model analytics
- Requires payment: 0.0001 ETH
- Returns 402 if not paid

**POST /api/models/:id/invest** 🔒
- Process investment
- Requires payment: 0.0002 ETH
- Returns 402 if not paid

## Testing

```bash
# Test public endpoint
curl http://localhost:3001/api/models

# Test protected endpoint (should return 402)
curl http://localhost:3001/api/models/1/details \
  -H "x-wallet-address: 0xYourAddress"

# Verify payment
curl -X POST http://localhost:3001/api/payment/verify \
  -H "Content-Type: application/json" \
  -H "x-wallet-address: 0xYourAddress" \
  -d '{
    "txHash": "0x...",
    "resourceType": "model-details",
    "resourceId": "1",
    "userAddress": "0xYourAddress"
  }'
```

## How It Works

1. User requests protected resource
2. Middleware checks payment database
3. If no payment → Return **402 Payment Required**
4. User sends ETH to payment address
5. User calls `/api/payment/verify` with tx hash
6. Backend verifies transaction on blockchain
7. Payment stored in database
8. User can now access resource

## Database Schema

**Payments Collection:**
```javascript
{
  paymentId: "uuid",
  txHash: "0x...",
  userAddress: "0x...",
  resourceType: "model-details",
  resourceId: "1",
  amount: "0.0001",
  status: "verified",
  timestamp: Date,
  expiresAt: Date
}
```

## Production Deployment

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### Render

1. Connect GitHub repo
2. Create new Web Service
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables

### Environment Variables (Production)

- `MONGODB_URI`: MongoDB Atlas connection string
- `PAYMENT_WALLET_ADDRESS`: Your production wallet
- `SESSION_SECRET`: Strong random secret
- `FRONTEND_URL`: Your production frontend URL
- `NODE_ENV`: production

## License

MIT
