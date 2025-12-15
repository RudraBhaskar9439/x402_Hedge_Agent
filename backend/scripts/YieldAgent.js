const { ethers } = require('ethers');
require('dotenv').config();

// Configuration
const REGISTRY_ADDRESS = process.env.REGISTRY_ADDRESS; // User must add this to backend .env
const RPC_URL = process.env.BASE_SEPOLIA_RPC;
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Agent Wallet Key

// Simple ABI for the Agent interactions
const ABI = [
    "function executeStrategy(uint256 modelId, address target, uint256 value, bytes data) external payable",
    "function depositYield(uint256 modelId) external payable",
    "function totalManagedAssets(uint256 modelId) view returns (uint256)",
    "function ownerOf(uint256 tokenId) view returns (address)"
];

async function runYieldAgent() {
    console.log('🤖 Starting x402 Yield Agent...');

    if (!PRIVATE_KEY || !REGISTRY_ADDRESS) {
        console.error('❌ Missing PRIVATE_KEY or REGISTRY_ADDRESS in .env');
        return;
    }

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const registry = new ethers.Contract(REGISTRY_ADDRESS, ABI, wallet);

    // Hardcoded model ID for demo (e.g., Model #1)
    const MODEL_ID = 1;

    try {
        console.log(`Checking Model #${MODEL_ID}...`);

        // Check Owner
        const owner = await registry.ownerOf(MODEL_ID);
        if (owner.toLowerCase() !== wallet.address.toLowerCase()) {
            console.log(`⚠️ Agent wallet ${wallet.address} is not the owner of Model #${MODEL_ID} (${owner}). Cannot execute strategy.`);
            return;
        }

        // Check Assets
        const assets = await registry.totalManagedAssets(MODEL_ID);
        console.log(`💰 Total Managed Assets: ${ethers.formatEther(assets)} ETH`);

        if (assets == 0n) {
            console.log('No assets to manage. Waiting for investors...');
            return;
        }

        // Mock Strategy Execution: Send 1% of assets to a "Strategy" (e.g., Self or specialized contract)
        // In real life: Target = Aave Pool, Data = supply(assets)
        console.log('🚀 Executing Strategy: Simulating Arbitrage...');

        // Simulating "Work": We just deposit yield back to prove it works
        // Generate random yield between 0.0001 and 0.001 ETH
        const yieldAmount = ethers.parseEther('0.0001'); // Fixed small yield

        console.log(`📈 Yield Generated: ${ethers.formatEther(yieldAmount)} ETH`);

        // Deposit Yield back to vault (increasing share price)
        const tx = await registry.depositYield(MODEL_ID, { value: yieldAmount });
        console.log(`✅ Yield Distributed! Tx: ${tx.hash}`);
        await tx.wait();

        const newAssets = await registry.totalManagedAssets(MODEL_ID);
        console.log(`💰 New NAV: ${ethers.formatEther(newAssets)} ETH`);

    } catch (error) {
        console.error('❌ Agent Error:', error);
    }
}

// Run every 60 seconds
setInterval(runYieldAgent, 60000);
runYieldAgent();
