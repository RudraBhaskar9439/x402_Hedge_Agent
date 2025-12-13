# Deployment Addresses

## Local Anvil Network (Chain ID: 31337)

Deployment completed successfully! Contract addresses are saved in:
- `broadcast/DeployLocal.s.sol/31337/run-latest.json`

### To Get Addresses:

```bash
# View deployment details
cat broadcast/DeployLocal.s.sol/31337/run-latest.json | jq '.transactions[] | {contractName, contractAddress}'

# Or run the script again to see addresses
forge script script/DeployLocal.s.sol:DeployLocalScript --rpc-url http://localhost:8545
```

## Base Sepolia Testnet

To deploy to Base Sepolia:

1. **Set up .env file:**
   ```bash
   cp .env.example .env
   # Edit .env and add:
   # PRIVATE_KEY=your_private_key
   # BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
   ```

2. **Deploy:**
   ```bash
   forge script script/Deploy.s.sol:DeployScript \
     --rpc-url $BASE_SEPOLIA_RPC_URL \
     --broadcast \
     --verify \
     -vvvv
   ```

3. **Save addresses** from the output

## Contract Deployment Order

1. **AIModelRegistry** - First (no dependencies)
2. **MockERC20** - Second (payment token)
3. **AISignalMarketplace** - Third (depends on Registry + Token)
4. **AITradingCompetition** - Fourth (depends on Registry)

## Next Steps

1. Update `script/Interact.s.sol` with deployed addresses
2. Update `script/TestWithRealTokens.s.sol` with deployed addresses
3. Test interactions using the interaction scripts
4. Verify contracts on Basescan (if deployed to testnet)

