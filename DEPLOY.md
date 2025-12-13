# Deployment Guide

## Prerequisites

1. **Get Testnet ETH**
   - Base Sepolia: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
   - Or: https://www.alchemy.com/faucets/base-sepolia

2. **Set up environment variables**
   ```bash
   # Create .env file
   cp .env.example .env
   
   # Edit .env and add:
   PRIVATE_KEY=your_private_key_here
   BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
   BASESCAN_API_KEY=your_api_key_here  # Optional, for verification
   ```

## Deployment Commands

### Option 1: Deploy to Base Sepolia Testnet

```bash
# Deploy all contracts
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $BASE_SEPOLIA_RPC_URL \
  --broadcast \
  --verify \
  -vvvv
```

### Option 2: Deploy to Local Anvil Network (Testing)

```bash
# Start local node
anvil

# In another terminal, deploy
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url http://localhost:8545 \
  --broadcast \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
  -vvvv
```

### Option 3: Simulate Deployment (Dry Run)

```bash
# Simulate without broadcasting
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $BASE_SEPOLIA_RPC_URL \
  -vvvv
```

## After Deployment

1. **Save contract addresses** from the output
2. **Update script addresses** in `script/Interact.s.sol` and `script/TestWithRealTokens.s.sol`
3. **Verify contracts** on Basescan (if using --verify flag)
4. **Test interactions** using the interaction scripts

## Contract Verification

```bash
forge verify-contract \
  --chain-id 84532 \
  --num-of-optimizations 200 \
  --watch \
  --constructor-args $(cast abi-encode "constructor()") \
  --etherscan-api-key $BASESCAN_API_KEY \
  $CONTRACT_ADDRESS \
  src/AIModelRegistry.sol:AIModelRegistry
```

