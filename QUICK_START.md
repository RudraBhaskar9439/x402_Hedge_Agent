# Quick Start Guide - Testing with Logs & Testnet

## 🚀 Running Tests with Verbose Logs

### View All Events and Traces

```bash
# Maximum verbosity - shows all events, traces, and logs
forge test -vvvv

# Show events only
forge test -vv

# Show gas usage
forge test --gas-report

# Run specific test with full logs
forge test --match-test test_InvestAndWithdraw -vvvv
```

### Example Output

When you run with `-vvvv`, you'll see:
- ✅ **Events emitted** (ModelRegistered, Invested, Withdrawn, etc.)
- ✅ **Function calls** and their parameters
- ✅ **Gas costs** for each operation
- ✅ **State changes** (balances, mappings, etc.)
- ✅ **Revert reasons** if tests fail

## 📊 Viewing Event Logs

### In Tests

Events are automatically logged when you run:
```bash
forge test -vvvv
```

You'll see output like:
```
emit Invested(modelId: 1, user: 0x..., amount: 1000000000000000000)
emit Withdrawn(modelId: 1, user: 0x..., amount: 500000000000000000)
emit StreamingFeePaid(modelId: 1, user: 0x..., fee: 5000000000000, timeElapsed: 10)
```

### On Testnet (After Deployment)

1. **View on Basescan**
   - Go to your contract address
   - Click "Events" tab
   - Filter by event name

2. **Using Cast**
   ```bash
   # Get all Invested events
   cast logs --from-block 0 \
     "Invested(uint256,address,uint256)" \
     --address $REGISTRY_ADDRESS \
     --rpc-url $BASE_SEPOLIA_RPC_URL
   ```

## 🌐 Deploy to Testnet

### Step 1: Set Environment Variables

```bash
export PRIVATE_KEY=your_private_key_here
export BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
export BASESCAN_API_KEY=your_api_key_here
```

### Step 2: Deploy Contracts

```bash
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $BASE_SEPOLIA_RPC_URL \
  --broadcast \
  -vvvv
```

**Save the output addresses!** You'll need them for interactions.

### Step 3: Update Script Addresses

Edit `script/TestWithRealTokens.s.sol` and update:
- `REGISTRY_ADDRESS`
- `MARKETPLACE_ADDRESS`
- `PAYMENT_TOKEN_ADDRESS`

### Step 4: Run Comprehensive Test

```bash
forge script script/TestWithRealTokens.s.sol:TestWithRealTokensScript \
  --rpc-url $BASE_SEPOLIA_RPC_URL \
  --broadcast \
  -vvvv
```

This will:
1. ✅ Register a model
2. ✅ Invest 1 ETH
3. ✅ Request inference
4. ✅ Subscribe to signals
5. ✅ Publish signals
6. ✅ Withdraw (with streaming fees)
7. ✅ Show all statistics

## 📝 Example Test Output

```
=== Testing with Real Testnet Tokens ===
Deployer: 0x...
Balance: 1.5 ETH

[STEP 1] Registering AI Model...
✓ Model registered - ID: 1
  Owner: 0x...

[STEP 2] Investing in Model...
✓ Invested: 1 ETH
  Balance after investment: 0.5 ETH
  Investment amount: 1 ETH
  Investment timestamp: 1234567890

[STEP 3] Requesting Inference...
✓ Inference requested - ID: 1
  Payment: 1000 gwei

[STEP 3b] Submitting Inference Result...
✓ Inference submitted
  Output: BUY
  Confidence: 90%

[STEP 4] Setting Marketplace Pricing...
✓ Pricing set
  Monthly subscription: 50 USDC
  Per signal: 5 USDC

[STEP 5] Getting USDC Tokens...
✓ Minted: 1000 USDC
  Balance: 1000 USDC

[STEP 6] Subscribing to Signals...
✓ Subscribed for 1 month(s)
  Start time: 1234567890
  End time: 1237369890
  Active: true
  Signals received: 0

[STEP 7] Publishing Trading Signal...
✓ Signal published
  Total signals: 1
  Latest signal:
    Asset: ETH
    Action: BUY
    Target: 2500
    Confidence: 90%

[STEP 8] Purchasing Individual Signal...
✓ Signal purchased
  Cost: 5 USDC

[STEP 9] Testing Withdrawal with Streaming Fee...
  Current time: 1234567890
  Time after 10 seconds: 1234567900
✓ Withdrawn: 0.5 ETH
  Received: 0.499995 ETH
  Streaming fee deducted: 5 gwei

[STEP 10] Model Statistics:
  Subscribers: 1
  Total signals: 1
  Monthly price: 50 USDC
  Signal price: 5 USDC

  Model Performance:
    Correct predictions: 0
    Total predictions: 0
    Total P&L: 0
    Total revenue: 950 gwei
    Accuracy: 50%

=== Test Complete ===
All operations executed successfully!
```

## 🔍 Monitoring Events

### Watch Events in Real-Time

```bash
# Watch for new investments
cast logs --from-block latest \
  "Invested(uint256,address,uint256)" \
  --address $REGISTRY_ADDRESS \
  --rpc-url $BASE_SEPOLIA_RPC_URL \
  --follow
```

### Decode Event Data

```bash
# Get raw logs
cast logs --from-block 0 "Invested(uint256,address,uint256)" \
  --address $REGISTRY_ADDRESS \
  --rpc-url $BASE_SEPOLIA_RPC_URL > logs.txt

# Decode specific log
cast decode-event "Invested(uint256,address,uint256)" <log_data>
```

## 🎯 Key Events to Monitor

1. **ModelRegistry Events**
   - `ModelRegistered` - New model registered
   - `InferenceRequested` - Someone requested prediction
   - `InferenceCompleted` - Prediction completed
   - `Invested` - User invested in model
   - `Withdrawn` - User withdrew investment
   - `StreamingFeePaid` - Streaming fee deducted

2. **Marketplace Events**
   - `Subscribed` - User subscribed to model
   - `SignalPublished` - New signal published
   - `SignalPurchased` - User bought a signal

3. **Competition Events**
   - `CompetitionCreated` - New competition
   - `ModelEntered` - Model entered competition
   - `CompetitionCompleted` - Competition finished

## 💡 Tips

1. **Always use `-vvvv`** for maximum visibility
2. **Save deployment addresses** in a file
3. **Check Basescan** for on-chain verification
4. **Monitor gas costs** with `--gas-report`
5. **Use `--slow` flag** to see detailed traces

## 🐛 Troubleshooting

### No Events Showing
- Check contract addresses are correct
- Verify transactions were successful on Basescan
- Use `--from-block 0` to get all historical events

### Tests Failing
- Run with `-vvvv` to see exact revert reason
- Check all prerequisites are met
- Verify contract state before operations

### Gas Issues
- Check gas price: `cast gas-price --rpc-url $BASE_SEPOLIA_RPC_URL`
- Increase gas limit if needed
- Use `--slow` for detailed gas breakdown

