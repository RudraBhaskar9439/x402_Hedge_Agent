# 🤖 ERC-8004 AI Hedge Fund Agent

> **Decentralized AI Trading Infrastructure with HTTP 402 Micropayments**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-live-success.svg)
![Framework](https://img.shields.io/badge/next.js-14.0-black)
![Standard](https://img.shields.io/badge/ERC-8004-purple)

---

## 🚀 The Vision

**We turn AI Trading Models into investable, liquid assets.**

The **ERC-8004 AI Hedge Fund** is a decentralized platform where users can:
1.  **Invest** in autonomous AI Agents that trade crypto.
2.  **Pay-per-view** for premium trading signals using **HTTP 402 Procotol**.
3.  **Verify** every prediction and PnL on-chain.

Traditionally, hedge funds are opaque black boxes. We make them transparent, verifiable, and accessible to anyone with a wallet.

---

## ✨ Key Innovations

### 1. 💳 HTTP 402 "Payment Required" Protocol
We moved beyond standard gas-heavy transactions. We implemented the **HTTP 402** status code to create a seamless **Off-Chain Micropayment** layer.
*   **Fast:** Instant content unlocking.
*   **Cheap:** No gas fees for viewing signals (just the direct transfer).
*   **Standardized:** Uses web standards for payment-gated APIs.

### 2. 🤖 AI Models as "Agents" (ERC-8004)
Every AI model on our platform is conceptualized as an autonomous agent.
*   **Verifiable Identity:** Each agent has a unique on-chain ID.
*   **Reputation System:** Accuracy and PnL are tracked immutably.
*   **NFT Ownership:** (Coming Soon) You can own the agent itself as an NFT.

### 3. 💸 Direct Investment Yields
Users don't just watch—they invest.
*   **Pool Funding:** Deposit ETH directly into a model's trading pool.
*   **Real-time Dashboard:** Track your "Est. Profit" and "Total Invested" live.
*   **Liquid:** Withdraw your share of the pool at any time.

---

## 🛠️ Tech Stack

*   **Frontend:** Next.js 14, Tailwind CSS, Lucide Icons, Shadcn UI
*   **Backend:** Node.js, Express, MongoDB
*   **Blockchain Integration:** Ethers.js v6, Base Sepolia Testnet
*   **Payment Layer:** Custom HTTP 402 Middleware
*   **Data Visualization:** Recharts

---

## 📸 Platform Tour

### The Dashboard
A command center for the modern investor. Real-time stats, live leaderboards of top-performing AIs, and your personal Portfolio tracking.

### The Model Page
Deep analytics for every AI agent.
*   **Accuracy Rings:** Visualizing performance at a glance.
*   **Signal History:** Locked behind our HTTP 402 Gate.
*   **Invest Button:** One-click capital deployment.

### The Payment Flow (HTTP 402)
1.  User clicks "View Premium Signals".
2.  Server returns `402 Payment Required`.
3.  Frontend prompts MetaMask.
4.  User sends **0.0001 ETH**.
5.  Server verifies tx, returns `200 OK`, and unlocks content.
6.  **Instant. Trustless.**

---

## ⚡ Quick Start for Judges

To run this locally and see the magic happen:

### 1. Prerequisites
*   Node.js & npm
*   MongoDB (Compass or Community Edition)
*   MetaMask Browser Extension

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/your-username/x402_Hedge_Fund_Agent.git

# Install Dependencies
cd agent-hedge-fund
cd frontend && npm install
cd ../backend && npm install
```

### 3. Configuration

**Frontend (`frontend/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_PAYMENT_WALLET_ADDRESS=0xYourWalletAddress
```

**Backend (`backend/.env`):**
```env
MONGODB_URI=mongodb://localhost:27017/x402_payments
PAYMENT_WALLET_ADDRESS=0xYourWalletAddress
```

### 4. Run It 🚀

Open two terminals:

```bash
# Terminal 1: Frontend
cd frontend
npm run dev
```

```bash
# Terminal 2: Backend
cd backend
npm run dev
```

Open **`http://localhost:3000`** and connect your wallet!

---

## 🗺️ Roadmap

*   [x] **Phase 1: Foundation** (Done) - Dashboard, Payment Gate, Basic Analytics.
*   [x] **Phase 2: Payments** (Done) - HTTP 402 implementation with Base Sepolia.
*   [ ] **Phase 3: Smart Contracts** - Minting Models as ERC-721 NFTs.
*   [ ] **Phase 4: Agent Autonomy** - Connecting Python AI agents to execute trades on DEXs automatically.

---

## 🏆 Why This Wins

This project bridges the gap between **Web2 Efficiency** (HTTP/APIs) and **Web3 Value** (Crypto/Ownership). By using **HTTP 402**, we solve the UX nightmare of signing signatures for every tiny interaction, paving the way for mass adoption of Decentralized AI.

---

*Built with ❤️ for the AI Agent Hackathon.*
