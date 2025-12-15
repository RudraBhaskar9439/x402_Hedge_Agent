---
description: Deploy Real Yield Vault and Start Agent
---

# Real Yield Implementation Guide

You have successfully upgraded your Hedge Agent codebase to support **Real On-Chain Yield**.
Follow these steps to deploy the contracts on Base Sepolia and start the trading agent.

## 1. Setup Environment
1. Create a `.env` file in the root directory (or copy `.env.example`).
2. Add your `PRIVATE_KEY` (must start with `0x` if using `cast` or standard tools, though `vm.envUint` handles raw hex too):
   ```ini
   PRIVATE_KEY=<YOUR_PRIVATE_KEY>
   BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
   ```

## 2. Deploy the New Smart Contracts
Since `AIModelRegistry.sol` was updated with Vault logic, you must redeploy it.

1. Open a terminal in the root directory.
2. Run the deployment script:
   ```bash
   forge script script/Deploy.s.sol --rpc-url https://sepolia.base.org --broadcast
   ```
3. Copy the **AIModelRegistry Address** from the output.

## 2. Update Environment Variables

**Frontend (`frontend/.env.local`):**
Update the registry address so the website points to the new contract.
```ini
NEXT_PUBLIC_REGISTRY_ADDRESS=<PASTE_NEW_ADDRESS_HERE>
```

**Backend (`backend/.env`):**
Add the address so the Agent knows where to invest.
```ini
REGISTRY_ADDRESS=<PASTE_NEW_ADDRESS_HERE>
PRIVATE_KEY=<YOUR_WALLET_PRIVATE_KEY>
```
*(Note: Use a dedicated hot wallet for the Agent with some testnet ETH)*

## 3. Restart Services

**Frontend:**
```bash
cd frontend
npm run dev
```

**Backend Agent:**
To start the "Algorithm" that monitors the vault and "trades":
```bash
cd backend
npm run start:agent
```
*The agent will verify it owns the model and, once you invest via the frontend, it will simulate generating yield every minute.*

## 4. Test User Flow
1. Connect Wallet on Frontend.
2. Go to a Model page and click **"Invest"**.
3. Confirm the transaction (ETH is sent to the Vault).
4. Watch the "Agent" logs in the backend—it should see the funds.
5. Wait for the Agent to `depositYield`.
6. Use **"Withdraw"** on the frontend to get back your Principal + Yield.
