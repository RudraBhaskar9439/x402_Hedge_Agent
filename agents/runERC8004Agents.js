require('dotenv').config();
const ERC8004TradingAgent = require('./ERC8004TradingAgent');

/**
 * Run multiple ERC-8004 AI trading agents
 * Each agent is an on-chain AI model (NFT) that earns fees
 */
async function main() {
  console.log('🚀 Starting ERC-8004 AI Hedge Fund Protocol\n');
  console.log('Each agent is an on-chain AI model that:');
  console.log('  ✅ Is represented as an NFT');
  console.log('  ✅ Responds to inference requests');
  console.log('  ✅ Publishes trading signals');
  console.log('  ✅ Earns fees from predictions\n');
  
  // Contract addresses from deployment
  const contracts = {
    aiModelRegistry: process.env.AI_MODEL_REGISTRY,
    aiSignalMarketplace: process.env.AI_SIGNAL_MARKETPLACE,
    aiTradingCompetition: process.env.AI_TRADING_COMPETITION
  };
  
  // Validate addresses
  if (!contracts.aiModelRegistry) {
    console.error('❌ Error: AI_MODEL_REGISTRY not set in .env');
    console.error('   Run deployment first: make deploy');
    process.exit(1);
  }
  
  // Create 3 AI agents with different strategies
  const agents = [
    {
      name: 'Renaissance Momentum AI',
      strategy: 'momentum',
      modelURI: 'ipfs://QmRenaissanceMomentum',
      privateKey: process.env.AGENT_1_KEY || process.env.PRIVATE_KEY,
      rpcUrl: process.env.BASE_SEPOLIA_RPC_URL,
      contracts
    },
    {
      name: 'Citadel Mean Reversion AI',
      strategy: 'mean-reversion',
      modelURI: 'ipfs://QmCitadelMeanReversion',
      privateKey: process.env.AGENT_2_KEY || generateRandomKey(),
      rpcUrl: process.env.BASE_SEPOLIA_RPC_URL,
      contracts
    },
    {
      name: 'Two Sigma ML AI',
      strategy: 'ml',
      modelURI: 'ipfs://QmTwoSigmaML',
      privateKey: process.env.AGENT_3_KEY || generateRandomKey(),
      rpcUrl: process.env.BASE_SEPOLIA_RPC_URL,
      contracts
    }
  ];
  
  console.log('Initializing AI models...\n');
  
  // Initialize all agents
  const tradingAgents = [];
  for (const config of agents) {
    try {
      const agent = new ERC8004TradingAgent(config);
      await agent.initialize();
      tradingAgents.push(agent);
      console.log('');
    } catch (error) {
      console.error(`Failed to initialize ${config.name}:`, error.message);
    }
  }
  
  if (tradingAgents.length === 0) {
    console.error('❌ No agents initialized successfully');
    process.exit(1);
  }
  
  console.log('✅ All AI models initialized!\n');
  console.log('Starting autonomous trading...\n');
  console.log('='.repeat(60));
  console.log('📊 AI MODELS ACTIVE');
  console.log('='.repeat(60));
  
  for (const agent of tradingAgents) {
    console.log(`\n${agent.name}`);
    console.log(`  Model ID: #${agent.modelId}`);
    console.log(`  Strategy: ${agent.strategy}`);
    console.log(`  Wallet: ${agent.wallet.address}`);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('🎯 MODES OF OPERATION');
  console.log('='.repeat(60));
  console.log('1. Listening for inference requests (reactive)');
  console.log('2. Publishing signals automatically (proactive)');
  console.log('3. Earning fees from predictions');
  console.log('4. Building on-chain track record');
  console.log('='.repeat(60) + '\n');
  
  // Start automatic signal generation for all agents
  console.log('Starting automatic signal generation...\n');
  for (const agent of tradingAgents) {
    agent.runSignalGeneration(120000); // Every 2 minutes
    agent.startStatsReporting(60000);  // Stats every minute
  }
  
  console.log('Press Ctrl+C to stop\n');
  
  // Simulate some inference requests for demo
  console.log('Simulating inference requests for demo...\n');
  setTimeout(() => simulateInferenceRequests(tradingAgents), 10000);
}

function generateRandomKey() {
  const { ethers } = require('ethers');
  const wallet = ethers.Wallet.createRandom();
  console.log(`⚠️  Generated random wallet: ${wallet.address}`);
  console.log(`    Fund with Base Sepolia ETH to activate`);
  return wallet.privateKey;
}

async function simulateInferenceRequests(agents) {
  console.log('📥 Simulating inference requests...\n');
  
  for (const agent of agents) {
    try {
      // Request inference
      const { ethers } = require('ethers');
      const inputData = ethers.AbiCoder.defaultAbiCoder().encode(
        ['string', 'uint256', 'uint256'],
        ['ETH', Math.floor((2000 + Math.random() * 100) * 1e8), 1000000]
      );
      
      const tx = await agent.registry.requestInference(
        agent.modelId,
        inputData,
        { value: agent.inferencePrice }
      );
      
      console.log(`📤 Inference request sent to ${agent.name}`);
      console.log(`   TX: ${tx.hash}\n`);
      
    } catch (error) {
      console.error(`Failed to request inference from ${agent.name}:`, error.message);
    }
  }
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down AI models...');
  process.exit(0);
});

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('Unhandled error:', error);
});

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});