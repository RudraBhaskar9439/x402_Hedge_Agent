# Testnet Testing Guide

This guide shows you how to test the contracts on Base Sepolia testnet with real tokens.

## Prerequisites

1. **Get Base Sepolia ETH**
   - Visit [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
   - Or use [Alchemy Base Sepolia Faucet](https://www.alchemy.com/faucets/base-sepolia)
   - You'll need ETH for gas fees

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your private key and RPC URL
   ```

3. **Get RPC URL**
   - Sign up at [Alchemy](https://www.alchemy.com/) or [Infura](https://www.infura.io/)
   - Create a Base Sepolia endpoint
   - Add to `.env` file

## Deployment

### Step 1: Deploy Contracts

```bash
# Deploy all contracts
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $BASE_SEPOLIA_RPC_URL \
  --broadcast \
  -vvvv

# This will output contract addresses - save them!
```

### Step 2: Update Addresses in Scripts

After deployment, update the addresses in:
- `script/Interact.s.sol`
- `script/TestWithRealTokens.s.sol`

## Testing with Real Tokens

### Option 1: Quick Interaction Test

```bash
forge script script/Interact.s.sol:InteractScript \
  --rpc-url $BASE_SEPOLIA_RPC_URL \
  --broadcast \
  -vvvv
```

This will:
- Register a model
- Request an inference
- Submit inference result
- Publish a signal
- Create a competition

### Option 2: Comprehensive Test

```bash
forge script script/TestWithRealTokens.s.sol:TestWithRealTokensScript \
  --rpc-url $BASE_SEPOLIA_RPC_URL \
  --broadcast \
  -vvvv
```

This comprehensive test includes:
1. ✅ Registering AI models
2. ✅ Investing in models (with streaming fees)
3. ✅ Requesting inferences
4. ✅ Subscribing to signals
5. ✅ Purchasing individual signals
6. ✅ Withdrawing investments (with streaming fees)
7. ✅ Viewing statistics

## Viewing Logs

### Verbose Test Logs

```bash
# Run tests with maximum verbosity
forge test -vvvv

# Run specific test with logs
forge test --match-test test_InvestAndWithdraw -vvvv

# Run with gas reporting
forge test --gas-report
```

### View Events on Basescan

1. Go to [Base Sepolia Explorer](https://sepolia.basescan.org/)
2. Enter your contract address
3. Click on "Events" tab
4. View all emitted events:
   - `ModelRegistered`
   - `InferenceRequested`
   - `InferenceCompleted`
   - `Invested`
   - `Withdrawn`
   - `StreamingFeePaid`
   - `SignalPublished`
   - `Subscribed`

## Manual Testing with Cast

### Check Contract State

```bash
# Get model info
cast call $REGISTRY_ADDRESS "getModelInfo(uint256)" 1 --rpc-url $BASE_SEPOLIA_RPC_URL

# Get subscription info
cast call $MARKETPLACE_ADDRESS "getSubscription(uint256,address)" 1 $YOUR_ADDRESS --rpc-url $BASE_SEPOLIA_RPC_URL

# Get model stats
cast call $MARKETPLACE_ADDRESS "getModelStats(uint256)" 1 --rpc-url $BASE_SEPOLIA_RPC_URL
```

### Send Transactions

```bash
# Register a model
cast send $REGISTRY_ADDRESS \
  "registerModel(string,uint256,uint256)" \
  "ipfs://QmTest" \
  1000000000000000 \
  1000000000000 \
  --rpc-url $BASE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY

# Invest in model
cast send $REGISTRY_ADDRESS \
  "invest(uint256)" \
  1 \
  --value 1ether \
  --rpc-url $BASE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY
```

## Monitoring

### Watch for Events

```bash
# Watch for new model registrations
cast logs --from-block latest \
  "ModelRegistered(uint256,address,string,uint256)" \
  --address $REGISTRY_ADDRESS \
  --rpc-url $BASE_SEPOLIA_RPC_URL

# Watch for investments
cast logs --from-block latest \
  "Invested(uint256,address,uint256)" \
  --address $REGISTRY_ADDRESS \
  --rpc-url $BASE_SEPOLIA_RPC_URL
```

## Troubleshooting

### Out of Gas
- Increase gas limit: `--gas-limit 5000000`
- Check gas price: `cast gas-price --rpc-url $BASE_SEPOLIA_RPC_URL`

### Transaction Reverted
- Check error: `-vvvv` for detailed revert reason
- Verify contract addresses are correct
- Ensure you have enough ETH/USDC balance

### Contract Not Found
- Verify deployment was successful
- Check contract addresses in deployment output
- Verify on Basescan explorer

## Next Steps

1. **Verify Contracts on Basescan**
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

2. **Create Frontend Integration**
   - Use deployed addresses
   - Connect with ethers.js or web3.js
   - Build UI for interactions

3. **Monitor Performance**
   - Track gas usage
   - Monitor event emissions
   - Analyze user interactions

## Useful Commands

```bash
# Get current block number
cast block-number --rpc-url $BASE_SEPOLIA_RPC_URL

# Get balance
cast balance $YOUR_ADDRESS --rpc-url $BASE_SEPOLIA_RPC_URL

# Estimate gas
cast estimate $CONTRACT_ADDRESS "functionName(...)" --rpc-url $BASE_SEPOLIA_RPC_URL

# Decode event logs
cast logs --from-block 0 "EventName(...)" --address $CONTRACT_ADDRESS --rpc-url $BASE_SEPOLIA_RPC_URL | cast decode-event
```

