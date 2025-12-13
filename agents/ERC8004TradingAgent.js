const { ethers } = require('ethers');
require('dotenv').config();
const fetch = require('node-fetch');

/**
 * ERC-8004 AI Trading Agent
 * Operates as an on-chain AI model that:
 * - Registers itself as an ERC-8004 model (NFT)
 * - Responds to inference requests
 * - Publishes trading signals
 * - Earns fees from predictions
 */
class ERC8004TradingAgent {
  constructor(config) {
    this.name = config.name;
    this.strategy = config.strategy;
    this.modelURI = config.modelURI || `ipfs://Qm${this.name}`;
    this.inferencePrice = config.inferencePrice || ethers.parseEther('0.0001');
    
    // Setup ethers
    this.provider = new ethers.JsonRpcProvider(config.rpcUrl);
    this.wallet = new ethers.Wallet(config.privateKey, this.provider);
    
    // Contract addresses
    this.registryAddress = config.contracts.aiModelRegistry;
    this.marketplaceAddress = config.contracts.aiSignalMarketplace;
    this.competitionAddress = config.contracts.aiTradingCompetition;
    
    // State
    this.modelId = null;
    this.isRegistered = false;
    this.priceHistory = {};
    this.pendingInferences = [];
  }
  
  /**
   * Initialize agent and register as ERC-8004 model
   */
  async initialize() {
    console.log(`[${this.name}] 🤖 Initializing ERC-8004 AI Model...`);
    
    // Load contract ABIs
    const registryAbi = require('../out/AIModelRegistry.sol/AIModelRegistry.json').abi;
    const marketplaceAbi = require('../out/AISignalMarketplace.sol/AISignalMarketplace.json').abi;
    
    this.registry = new ethers.Contract(
      this.registryAddress,
      registryAbi,
      this.wallet
    );
    
    this.marketplace = new ethers.Contract(
      this.marketplaceAddress,
      marketplaceAbi,
      this.wallet
    );
    
    // Check if model already registered
    const balance = await this.registry.balanceOf(this.wallet.address);
    
    if (balance > 0) {
      // Get existing model ID
      this.modelId = await this.registry.tokenOfOwnerByIndex(this.wallet.address, 0);
      this.isRegistered = true;
      console.log(`[${this.name}] ✅ Model already registered as ID: ${this.modelId}`);
    } else {
      await this.registerModel();
    }
    
    // Setup marketplace pricing
    await this.setupPricing();
    
    // Start listening for inference requests
    this.listenForInferenceRequests();
    
    // Start listening for investment/withdrawal/streaming fee events
    this.listenForInvestmentEvents();
    
    console.log(`[${this.name}] 🚀 Ready to provide AI predictions!`);
  }
  
  /**
   * Register as ERC-8004 AI model (mints NFT)
   */
  async registerModel() {
    console.log(`[${this.name}] 📝 Registering as ERC-8004 AI model...`);
    
    try {
      const tx = await this.registry.registerModel(
        this.modelURI,
        this.inferencePrice
      );
      
      const receipt = await tx.wait();
      
      // Get model ID from event
      const event = receipt.logs.find(log => {
        try {
          const parsed = this.registry.interface.parseLog(log);
          return parsed.name === 'ModelRegistered';
        } catch {
          return false;
        }
      });
      
      if (event) {
        const parsed = this.registry.interface.parseLog(event);
        this.modelId = parsed.args.modelId.toString();
        this.isRegistered = true;
        console.log(`[${this.name}] ✅ Model registered! ID: ${this.modelId}`);
        console.log(`[${this.name}] 🎨 NFT minted to: ${this.wallet.address}`);
      }
    } catch (error) {
      console.error(`[${this.name}] ❌ Registration failed:`, error.message);
    }
  }
  
  /**
   * Setup marketplace pricing
   */
  async setupPricing() {
    const monthlyPrice = ethers.parseUnits('10', 6); // $10/month in USDC
    const signalPrice = 100; // $0.0001 per signal
    
    try {
      const tx = await this.marketplace.setModelPricing(
        this.modelId,
        monthlyPrice,
        signalPrice
      );
      await tx.wait();
      console.log(`[${this.name}] 💰 Pricing set: $10/month or $0.0001/signal`);
    } catch (error) {
      console.log(`[${this.name}] ℹ️  Pricing already set or error:`, error.message);
    }
  }
  
  /**
   * Listen for inference requests
   */
  listenForInferenceRequests() {
    this.registry.on('InferenceRequested', async (requestId, modelId, requester, inputData) => {
      if (modelId.toString() === this.modelId) {
        console.log(`[${this.name}] 🔔 Inference request received: #${requestId}`);
        await this.handleInferenceRequest(requestId, inputData);
      }
    });
  }
  
  /**
   * Listen for investment and withdrawal events (micropayment/streaming fee tracking)
   */
  listenForInvestmentEvents() {
    this.registry.on('Invested', (modelId, user, amount, event) => {
      if (modelId.toString() === this.modelId) {
        console.log(`[${this.name}] 💸 New investment: User ${user}, Amount: ${ethers.formatEther(amount)} ETH`);
        // Optionally: track user investment start time, amount, etc.
      }
    });
    this.registry.on('Withdrawn', (modelId, user, amount, event) => {
      if (modelId.toString() === this.modelId) {
        console.log(`[${this.name}] 💸 Withdrawal: User ${user}, Amount: ${ethers.formatEther(amount)} ETH`);
      }
    });
    this.registry.on('StreamingFeePaid', (modelId, user, fee, timeElapsed, event) => {
      if (modelId.toString() === this.modelId) {
        console.log(`[${this.name}] ⏱️ Streaming fee paid: User ${user}, Fee: ${ethers.formatEther(fee)} ETH, Time: ${timeElapsed}s`);
      }
    });
  }
  
  /**
   * Handle inference request
   */
  async handleInferenceRequest(requestId, inputData) {
    try {
      // Decode input data (price, volume, etc.)
      const decodedInput = this.decodeInputData(inputData);
      
      // Run AI model inference
      const prediction = await this.runInference(decodedInput);
      
      // Encode output
      const outputData = this.encodeOutput(prediction);
      
      // Submit to blockchain
      const tx = await this.registry.submitInference(
        requestId,
        outputData,
        prediction.confidence
      );
      
      await tx.wait();
      
      console.log(`[${this.name}] ✅ Inference #${requestId} completed:`);
      console.log(`           Action: ${prediction.action}`);
      console.log(`           Confidence: ${prediction.confidence / 100}%`);
      
      // Also publish as public signal
      await this.publishSignal(prediction);
      
    } catch (error) {
      console.error(`[${this.name}] ❌ Inference failed:`, error.message);
    }
  }
  
  /**
   * Decode input data
   */
  decodeInputData(inputData) {
    // Input format: [asset, currentPrice, volume, ...]
    try {
      const decoded = ethers.AbiCoder.defaultAbiCoder().decode(
        ['string', 'uint256', 'uint256'],
        inputData
      );
      
      return {
        asset: decoded[0],
        price: Number(decoded[1]) / 1e8, // Assuming 8 decimals
        volume: Number(decoded[2])
      };
    } catch {
      // Fallback: use mock data
      return {
        asset: 'ETH',
        price: 2000 + Math.random() * 100,
        volume: 1000000
      };
    }
  }
  
  /**
   * Run AI inference based on strategy
   */
  async runInference(marketData) {
    const { asset, price, volume } = marketData;
    
    // Update price history
    if (!this.priceHistory[asset]) {
      this.priceHistory[asset] = [];
    }
    this.priceHistory[asset].push(price);
    
    // Keep last 50 prices
    if (this.priceHistory[asset].length > 50) {
      this.priceHistory[asset].shift();
    }
    
    let prediction;
    
    // Run strategy
    if (this.strategy === 'momentum') {
      prediction = this.momentumStrategy(asset, price);
    } else if (this.strategy === 'mean-reversion') {
      prediction = this.meanReversionStrategy(asset, price);
    } else if (this.strategy === 'ml') {
      prediction = this.mlStrategy(asset, price, volume);
    } else {
      prediction = this.randomStrategy(asset, price);
    }
    
    return prediction;
  }
  
  /**
   * Momentum strategy
   */
  momentumStrategy(asset, currentPrice) {
    const history = this.priceHistory[asset];
    
    if (history.length < 20) {
      return this.neutralPrediction(asset, currentPrice);
    }
    
    const ma20 = history.slice(-20).reduce((a, b) => a + b) / 20;
    const trend = currentPrice > ma20 * 1.02 ? 'BUY' : 
                  currentPrice < ma20 * 0.98 ? 'SELL' : 'HOLD';
    
    return {
      asset,
      action: trend,
      targetPrice: Math.floor(currentPrice * (trend === 'BUY' ? 1.05 : 0.95) * 1e8),
      stopLoss: Math.floor(currentPrice * (trend === 'BUY' ? 0.98 : 1.02) * 1e8),
      confidence: trend !== 'HOLD' ? 7500 : 5000,
      timestamp: Date.now()
    };
  }
  
  /**
   * Mean reversion strategy
   */
  meanReversionStrategy(asset, currentPrice) {
    const history = this.priceHistory[asset];
    
    if (history.length < 30) {
      return this.neutralPrediction(asset, currentPrice);
    }
    
    const mean = history.reduce((a, b) => a + b) / history.length;
    const stdDev = Math.sqrt(
      history.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / history.length
    );
    
    const zScore = (currentPrice - mean) / stdDev;
    
    const action = zScore < -1.5 ? 'BUY' : 
                   zScore > 1.5 ? 'SELL' : 'HOLD';
    
    return {
      asset,
      action,
      targetPrice: Math.floor(mean * 1e8),
      stopLoss: Math.floor(currentPrice * (action === 'BUY' ? 0.95 : 1.05) * 1e8),
      confidence: Math.abs(zScore) > 2 ? 8500 : 6000,
      timestamp: Date.now()
    };
  }
  h
  /**
   * ML-based strategy (simulated)
   */
  mlStrategy(asset, currentPrice, volume) {
    const history = this.priceHistory[asset];
    
    if (history.length < 10) {
      return this.neutralPrediction(asset, currentPrice);
    }
    
    // Simulate ML model with multiple indicators
    const shortMA = history.slice(-5).reduce((a, b) => a + b) / 5;
    const longMA = history.slice(-20).reduce((a, b) => a + b) / 20;
    const volatility = Math.sqrt(
      history.slice(-10).reduce((sq, n) => sq + Math.pow(n - shortMA, 2), 0) / 10
    );
    
    // Complex decision
    const momentum = shortMA / longMA;
    const volumeSignal = volume > 1000000 ? 1 : 0.5;
    const volatilitySignal = volatility / currentPrice;
    
    const mlScore = (momentum - 1) * 100 + volumeSignal * 10 - volatilitySignal * 50;
    
    const action = mlScore > 5 ? 'BUY' : 
                   mlScore < -5 ? 'SELL' : 'HOLD';
    
    return {
      asset,
      action,
      targetPrice: Math.floor(currentPrice * (action === 'BUY' ? 1.08 : 0.92) * 1e8),
      stopLoss: Math.floor(currentPrice * (action === 'BUY' ? 0.96 : 1.04) * 1e8),
      confidence: Math.min(9000, 6000 + Math.abs(mlScore) * 200),
      timestamp: Date.now()
    };
  }
  
  /**
   * Random strategy (for testing)
   */
  randomStrategy(asset, currentPrice) {
    const actions = ['BUY', 'SELL', 'HOLD'];
    const action = actions[Math.floor(Math.random() * actions.length)];
    
    return {
      asset,
      action,
      targetPrice: Math.floor(currentPrice * (1 + (Math.random() - 0.5) * 0.1) * 1e8),
      stopLoss: Math.floor(currentPrice * (1 - (Math.random() * 0.05)) * 1e8),
      confidence: 5000 + Math.floor(Math.random() * 3000),
      timestamp: Date.now()
    };
  }
  
  /**
   * Neutral prediction
   */
  neutralPrediction(asset, currentPrice) {
    return {
      asset,
      action: 'HOLD',
      targetPrice: Math.floor(currentPrice * 1e8),
      stopLoss: Math.floor(currentPrice * 0.95 * 1e8),
      confidence: 5000,
      timestamp: Date.now()
    };
  }
  
  /**
   * Encode output for blockchain
   */
  encodeOutput(prediction) {
    return ethers.AbiCoder.defaultAbiCoder().encode(
      ['string', 'string', 'uint256', 'uint256'],
      [
        prediction.asset,
        prediction.action,
        prediction.targetPrice,
        prediction.stopLoss
      ]
    );
  }
  
  /**
   * Publish signal to marketplace
   */
  async publishSignal(prediction) {
    try {
      const tx = await this.marketplace.publishSignal(
        this.modelId,
        prediction.asset,
        prediction.action,
        prediction.targetPrice,
        prediction.stopLoss,
        prediction.confidence,
        '0x' // Extra data
      );
      
      await tx.wait();
      console.log(`[${this.name}] 📡 Signal published: ${prediction.action} ${prediction.asset}`);
    } catch (error) {
      console.error(`[${this.name}] ❌ Signal publish failed:`, error.message);
    }
  }
  
  /**
   * Generate periodic signals automatically
   */
  async runSignalGeneration(intervalMs = 60000) {
    console.log(`[${this.name}] 🔄 Starting automatic signal generation...`);
    
    setInterval(async () => {
      try {
        // Fetch real price from Pyth
        const price = await getPythPrice('Crypto.ETH/USD');
        // Simulate volume (or fetch from another API if needed)
        const volume = 1000000 + Math.random() * 500000;
        const marketData = {
          asset: 'ETH',
          price,
          volume
        };
        
        // Generate prediction
        const prediction = await this.runInference(marketData);
        
        // Publish if confident
        if (prediction.confidence > 6000 && prediction.action !== 'HOLD') {
          await this.publishSignal(prediction);
        }
        
      } catch (error) {
        console.error(`[${this.name}] ❌ Signal generation error:`, error.message);
      }
    }, intervalMs);
  }
  
  /**
   * Get model statistics
   */
  async getStats() {
    try {
      const [owner, modelURI, inferencePrice, totalInferences, accuracy] = 
        await this.registry.getModelInfo(this.modelId);
      
      const [correctPredictions, totalPredictions, totalPnL, totalRevenue] =
        await this.registry.getModelMetrics(this.modelId);
      
      return {
        modelId: this.modelId,
        owner,
        inferencePrice: ethers.formatEther(inferencePrice),
        totalInferences: totalInferences.toString(),
        accuracy: (Number(accuracy) / 100).toFixed(2) + '%',
        correctPredictions: correctPredictions.toString(),
        totalPredictions: totalPredictions.toString(),
        totalPnL: ethers.formatEther(totalPnL),
        totalRevenue: ethers.formatEther(totalRevenue)
      };
    } catch (error) {
      return { error: error.message };
    }
  }
  
  /**
   * Print stats periodically
   */
  startStatsReporting(intervalMs = 30000) {
    setInterval(async () => {
      const stats = await this.getStats();
      
      console.log(`\n${'='.repeat(60)}`);
      console.log(`📊 ${this.name} Stats (Model #${stats.modelId})`);
      console.log('='.repeat(60));
      console.log(`Accuracy:      ${stats.accuracy}`);
      console.log(`Inferences:    ${stats.totalInferences}`);
      console.log(`Predictions:   ${stats.correctPredictions}/${stats.totalPredictions}`);
      console.log(`Total P&L:     ${stats.totalPnL} ETH`);
      console.log(`Revenue:       ${stats.totalRevenue} ETH`);
      console.log('='.repeat(60) + '\n');
    }, intervalMs);
  }
}

async function getPythPrice(asset = 'Crypto.ETH/USD') {
  // Pyth price feed ID for ETH/USD (see Pyth docs for other assets)
  const feedId = '0xe9b6d9a1c8b0a6e2e3e8e7e6e5e4e3e2e1e0e9b6d9a1c8b0a6e2e3e8e7e6e5e4e3e2e1e0';
  const url = `https://hermes.pyth.network/api/latest_price_feeds?ids[]=${feedId}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    // The response is an object with a 'data' array
    const priceFeed = data.data && data.data[0];
    if (!priceFeed || !priceFeed.price) throw new Error('No price info');
    // Pyth price is in integer format, exponent is usually -8 for USD pairs
    return priceFeed.price.price * Math.pow(10, priceFeed.price.expo);
  } catch (err) {
    console.error('Pyth price fetch error:', err.message);
    // fallback to mock price
    return 2000 + Math.random() * 100;
  }
}

module.exports = ERC8004TradingAgent;