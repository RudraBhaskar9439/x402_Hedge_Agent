// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {AIModelRegistry} from "../src/AIModelRegistry.sol";
import {AISignalMarketplace} from "../src/AISignalMarketplace.sol";
import {MockERC20} from "../src/MockERC20.sol";

/**
 * @title Test With Real Tokens Script
 * @dev Comprehensive test script using real testnet tokens
 * 
 * This script demonstrates:
 * 1. Registering models
 * 2. Investing in models (with streaming fees)
 * 3. Requesting inferences
 * 4. Subscribing to signals
 * 5. Purchasing signals
 * 6. Withdrawing investments
 * 
 * Usage:
 * forge script script/TestWithRealTokens.s.sol:TestWithRealTokensScript --rpc-url $BASE_SEPOLIA_RPC_URL --broadcast -vvvv
 */
contract TestWithRealTokensScript is Script {
    // Update these after deployment
    address constant REGISTRY_ADDRESS = address(0);
    address constant MARKETPLACE_ADDRESS = address(0);
    address constant PAYMENT_TOKEN_ADDRESS = address(0);
    
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        console.log("=== Testing with Real Testnet Tokens ===");
        console.log("Deployer:", deployer);
        console.log("Balance:", deployer.balance / 1e18, "ETH");
        
        AIModelRegistry registry = AIModelRegistry(payable(REGISTRY_ADDRESS));
        AISignalMarketplace marketplace = AISignalMarketplace(MARKETPLACE_ADDRESS);
        MockERC20 paymentToken = MockERC20(PAYMENT_TOKEN_ADDRESS);
        
        vm.startBroadcast(deployerPrivateKey);
        
        // ========== STEP 1: Register Model ==========
        console.log("\n[STEP 1] Registering AI Model...");
        uint256 modelId = registry.registerModel(
            "ipfs://QmRealTestModel456",
            0.001 ether, // 0.001 ETH per inference
            1e15 // 0.001 ETH per second streaming rate
        );
        console.log("[OK] Model registered - ID:", modelId);
        console.log("  Owner:", registry.ownerOf(modelId));
        
        // ========== STEP 2: Invest in Model ==========
        console.log("\n[STEP 2] Investing in Model...");
        uint256 investAmount = 1 ether;
        uint256 balanceBefore = deployer.balance;
        
        registry.invest{value: investAmount}(modelId);
        
        console.log("[OK] Invested:", investAmount / 1e18, "ETH");
        console.log("  Balance after investment:", deployer.balance / 1e18, "ETH");
        
        // Check investment
        (uint256 invested, uint256 timestamp) = registry.investments(modelId, deployer);
        console.log("  Investment amount:", invested / 1e18, "ETH");
        console.log("  Investment timestamp:", timestamp);
        
        // ========== STEP 3: Request Inference ==========
        console.log("\n[STEP 3] Requesting Inference...");
        uint256 requestId = registry.requestInference{value: 0.001 ether}(
            modelId,
            abi.encode("ETH", "BTC", "SOL", block.timestamp)
        );
        console.log("[OK] Inference requested - ID:", requestId);
        console.log("  Payment:", 0.001 ether / 1e15, "gwei");
        
        // Submit inference
        console.log("\n[STEP 3b] Submitting Inference Result...");
        registry.submitInference(
            requestId,
            abi.encode("BUY", 2500 * 1e18, 2400 * 1e18),
            9000 // 90% confidence
        );
        console.log("[OK] Inference submitted");
        
        // Get result
        (,, bytes memory output, uint256 confidence,) = registry.getInferenceResult(requestId);
        console.log("  Output:", string(output));
        console.log("  Confidence:", confidence / 100, "%");
        
        // ========== STEP 4: Set Marketplace Pricing ==========
        console.log("\n[STEP 4] Setting Marketplace Pricing...");
        marketplace.setModelPricing(
            modelId,
            50 * 1e18,  // 50 USDC/month
            5 * 1e18    // 5 USDC/signal
        );
        console.log("[OK] Pricing set");
        console.log("  Monthly subscription: 50 USDC");
        console.log("  Per signal: 5 USDC");
        
        // ========== STEP 5: Get USDC Tokens ==========
        console.log("\n[STEP 5] Getting USDC Tokens...");
        uint256 usdcAmount = 1000 * 1e18;
        paymentToken.mint(deployer, usdcAmount);
        console.log("[OK] Minted:", usdcAmount / 1e18, "USDC");
        console.log("  Balance:", paymentToken.balanceOf(deployer) / 1e18, "USDC");
        
        // ========== STEP 6: Subscribe to Signals ==========
        console.log("\n[STEP 6] Subscribing to Signals...");
        paymentToken.approve(address(marketplace), usdcAmount);
        
        uint256 months = 1;
        marketplace.subscribe(modelId, months);
        console.log("[OK] Subscribed for", months, "month(s)");
        
        (uint256 startTime, uint256 endTime, uint256 signalsReceived, bool isActive) =
            marketplace.getSubscription(modelId, deployer);
        console.log("  Start time:", startTime);
        console.log("  End time:", endTime);
        console.log("  Active:", isActive);
        console.log("  Signals received:", signalsReceived);
        
        // ========== STEP 7: Publish Signal ==========
        console.log("\n[STEP 7] Publishing Trading Signal...");
        marketplace.publishSignal(
            modelId,
            "ETH",
            "BUY",
            2500 * 1e18,
            2400 * 1e18,
            9000,
            abi.encode("strong_momentum", "bullish_divergence")
        );
        console.log("[OK] Signal published");
        
        // Get signals
        AISignalMarketplace.Signal[] memory signals = marketplace.getLatestSignals(modelId, 10);
        console.log("  Total signals:", signals.length);
        if (signals.length > 0) {
            console.log("  Latest signal:");
            console.log("    Asset:", signals[signals.length - 1].asset);
            console.log("    Action:", signals[signals.length - 1].action);
            console.log("    Target:", signals[signals.length - 1].targetPrice / 1e18);
            console.log("    Confidence:", signals[signals.length - 1].confidence / 100, "%");
        }
        
        // ========== STEP 8: Purchase Individual Signal ==========
        console.log("\n[STEP 8] Purchasing Individual Signal...");
        if (signals.length > 0) {
            uint256 signalIndex = signals.length - 1;
            uint256 balanceBeforePurchase = paymentToken.balanceOf(deployer);
            
            marketplace.purchaseSignal(modelId, signalIndex);
            
            console.log("[OK] Signal purchased");
            console.log("  Cost:", (balanceBeforePurchase - paymentToken.balanceOf(deployer)) / 1e18, "USDC");
        }
        
        // ========== STEP 9: Wait and Withdraw (with streaming fee) ==========
        console.log("\n[STEP 9] Testing Withdrawal with Streaming Fee...");
        console.log("  Current time:", block.timestamp);
        
        // Fast forward 10 seconds (in real scenario, this would be actual time)
        vm.warp(block.timestamp + 10);
        console.log("  Time after 10 seconds:", block.timestamp);
        
        uint256 withdrawAmount = 0.5 ether;
        uint256 balanceBeforeWithdraw = deployer.balance;
        
        registry.withdraw(modelId, withdrawAmount);
        
        uint256 received = deployer.balance - balanceBeforeWithdraw;
        console.log("[OK] Withdrawn:", withdrawAmount / 1e18, "ETH");
        console.log("  Received:", received / 1e18, "ETH");
        console.log("  Streaming fee deducted:", (withdrawAmount - received) / 1e15, "gwei");
        
        // ========== STEP 10: Check Model Stats ==========
        console.log("\n[STEP 10] Model Statistics:");
        (uint256 subscribers, uint256 totalSignals, uint256 monthlyPrice, uint256 signalPrice) =
            marketplace.getModelStats(modelId);
        console.log("  Subscribers:", subscribers);
        console.log("  Total signals:", totalSignals);
        console.log("  Monthly price:", monthlyPrice / 1e18, "USDC");
        console.log("  Signal price:", signalPrice / 1e18, "USDC");
        
        (uint256 correct, uint256 total, int256 pnl, uint256 revenue, uint256 accuracy) =
            registry.getModelMetrics(modelId);
        console.log("\n  Model Performance:");
        console.log("    Correct predictions:", correct);
        console.log("    Total predictions:", total);
        console.log("    Total P&L:", pnl);
        console.log("    Total revenue:", revenue / 1e15, "gwei");
        console.log("    Accuracy:", accuracy / 100, "%");
        
        vm.stopBroadcast();
        
        console.log("\n=== Test Complete ===");
        console.log("All operations executed successfully!");
    }
}

