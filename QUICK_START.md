# 🚀 Quick Start: Off-Chain HTTP 402 Payments

## ⚡ 3-Minute Setup

### 1. Install & Start MongoDB (30 seconds)

```bash
brew install mongodb-community
brew services start mongodb-community
```

### 2. Setup Backend (1 minute)

```bash
cd agent-hedge-fund/backend
npm install
cp .env.example .env

# Edit .env - add your wallet address
echo "PAYMENT_WALLET_ADDRESS=0xYourWalletHere" >> .env

# Start server
npm run dev
```

### 3. Setup Frontend (1 minute)

```bash
cd agent-hedge-fund/frontend
cp .env.local.example .env.local

# Edit .env.local - add your wallet address
echo "NEXT_PUBLIC_PAYMENT_WALLET_ADDRESS=0xYourWalletHere" >> .env.local

# Frontend already running? Restart it
# Otherwise: npm run dev
```

### 4. Test It! (30 seconds)

1. Go to `http://localhost:3000/model/1`
2. See payment gate
3. Click "Pay to View"
4. Approve transaction
5. Content unlocks! ✅

---

## 📁 What You Have Now

```
agent-hedge-fund/
├── backend/              ← NEW! HTTP 402 API
│   ├── server.js
│   ├── middleware/x402.js
│   └── routes/
│       ├── payment.js
│       └── models.js
│
└── frontend/
    └── hooks/
        └── use-x402.ts   ← UPDATED! Off-chain payments
```

---

## 🎯 How It Works

```
User → Request Content
  ↓
Backend → 402 Payment Required
  ↓
User → Send ETH (one transaction)
  ↓
Backend → Verify on blockchain
  ↓
Backend → Store in MongoDB
  ↓
User → Access Granted! ✅
  ↓
Session → Valid for 30 days
```

---

## 💡 Key Features

- ✅ **No Smart Contracts** - Just HTTP 402 middleware
- ✅ **One Transaction** - Pay once, access multiple times
- ✅ **Fast** - Instant access after verification
- ✅ **Cheap** - Only one gas fee
- ✅ **Session-Based** - 30-day access after payment

---

## 🧪 Test Endpoints

```bash
# Check 402 response
curl http://localhost:3001/api/models/1/details \
  -H "x-wallet-address: 0xYour..."

# Expected: 402 Payment Required

# After payment, same request returns data
```

---

## 📚 Documentation

- **MIGRATION_GUIDE.md** - Complete migration details
- **X402_OFFCHAIN_GUIDE.md** - Full implementation guide
- **X402_FLOW_DIAGRAM.md** - Visual flow diagram
- **backend/README.md** - API documentation

---

## 🆘 Quick Fixes

**MongoDB not running?**
```bash
brew services start mongodb-community
```

**Port 3001 in use?**
```bash
lsof -ti:3001 | xargs kill -9
```

**Can't connect to backend?**
- Check `NEXT_PUBLIC_API_URL=http://localhost:3001` in frontend/.env.local
- Ensure backend is running

---

## ✨ You're Done!

Your off-chain HTTP 402 payment system is ready! 🎉

**Next:** Deploy to production (see MIGRATION_GUIDE.md)
