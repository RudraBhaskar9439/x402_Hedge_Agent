// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {AIModelRegistry} from "../src/AIModelRegistry.sol";
import {AISignalMarketplace} from "../src/AISignalMarketplace.sol";
import {AITradingCompetition} from "../src/AITradingCompetition.sol";
import {MockERC20} from "../src/MockERC20.sol";

/**
 * @title Interaction Script
 * @dev Script to interact with deployed contracts on testnet
 * 
 * Usage:
 * forge script script/Interact.s.sol:InteractScript --rpc-url $BASE_SEPOLIA_RPC_URL --broadcast -vvvv
 */
contract InteractScript is Script {
    // Update these addresses after deployment
    // Update these addresses after deployment
    address constant REGISTRY_ADDRESS = 0x7ff1C304a6d0F93FB22b168ce6b2c7af95EaCcEb; // Deployed Registry
    address constant MARKETPLACE_ADDRESS = 0xE6bB32583738126Ab56066309777bd4EE1093018; // Deployed Marketplace
    address constant COMPETITION_ADDRESS = 0xD9B36305027217dDD44dA2b8834A923656325538; // Deployed Competition
    address constant PAYMENT_TOKEN_ADDRESS = 0x5C2B588ab7962dB957f668bC06FB58CDF64c6406; // Deployed Token
    
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        console.log("Interacting with contracts...");
        console.log("Deployer address:", deployer);
        
        AIModelRegistry registry = AIModelRegistry(payable(REGISTRY_ADDRESS));
        AISignalMarketplace marketplace = AISignalMarketplace(MARKETPLACE_ADDRESS);
        AITradingCompetition competition = AITradingCompetition(COMPETITION_ADDRESS);
        MockERC20 paymentToken = MockERC20(PAYMENT_TOKEN_ADDRESS);
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Example: Register a model
        console.log("\n=== Registering AI Model ===");
        uint256 modelId = registry.registerModel(
            "ipfs://QmTestModel123",
            0.001 ether, // 0.001 ETH per inference
            1e15 // 0.001 ETH per second streaming rate
        );
        console.log("Model registered with ID:", modelId);
        console.log("Model owner:", registry.ownerOf(modelId));
        
        // Get model info
        (address owner, string memory uri, uint256 price, uint256 inferences, uint256 accuracy) = 
            registry.getModelInfo(modelId);
        console.log("Model URI:", uri);
        console.log("Inference price:", price / 1e15, "gwei");
        console.log("Total inferences:", inferences);
        console.log("Accuracy:", accuracy / 100, "%");
        
        // Example: Set marketplace pricing
        console.log("\n=== Setting Marketplace Pricing ===");
        marketplace.setModelPricing(
            modelId,
            100 * 1e18, // 100 USDC per month
            10 * 1e18   // 10 USDC per signal
        );
        console.log("Pricing set for model:", modelId);
        
        // Example: Request an inference
        console.log("\n=== Requesting Inference ===");
        uint256 requestId = registry.requestInference{value: 0.001 ether}(
            modelId,
            abi.encode("ETH", "price", "volume")
        );
        console.log("Inference requested, ID:", requestId);
        
        // Example: Submit inference result
        console.log("\n=== Submitting Inference Result ===");
        registry.submitInference(
            requestId,
            abi.encode("BUY", 2000 * 1e18, 1900 * 1e18), // BUY signal, target 2000, stop 1900
            8500 // 85% confidence
        );
        console.log("Inference submitted for request:", requestId);
        
        // Get inference result
        (uint256 reqModelId, address requester, bytes memory output, uint256 confidence, uint256 timestamp) =
            registry.getInferenceResult(requestId);
        console.log("Inference completed for model:", reqModelId);
        console.log("Requester:", requester);
        console.log("Confidence:", confidence / 100, "%");
        console.log("Timestamp:", timestamp);
        
        // Example: Publish a signal
        console.log("\n=== Publishing Trading Signal ===");
        marketplace.publishSignal(
            modelId,
            "ETH",
            "BUY",
            2000 * 1e18,
            1900 * 1e18,
            8500,
            abi.encode("momentum", "rsi", "macd")
        );
        console.log("Signal published for model:", modelId);
        
        // Get latest signals
        AISignalMarketplace.Signal[] memory signals = marketplace.getLatestSignals(modelId, 5);
        console.log("Latest signals count:", signals.length);
        if (signals.length > 0) {
            console.log("Latest signal asset:", signals[0].asset);
            console.log("Latest signal action:", signals[0].action);
            console.log("Latest signal confidence:", signals[0].confidence / 100, "%");
        }
        
        // Example: Create a competition
        console.log("\n=== Creating Trading Competition ===");
        uint256 competitionId = competition.createCompetition(
            "Q1 2024 Trading Challenge",
            block.timestamp + 1 days,
            7 days,
            0.1 ether // 0.1 ETH entry fee
        );
        console.log("Competition created with ID:", competitionId);
        
        // Get competition details
        AITradingCompetition.Competition memory comp = competition.getCompetition(competitionId);
        console.log("Competition name:", comp.name);
        console.log("Start time:", comp.startTime);
        console.log("End time:", comp.endTime);
        console.log("Entry fee:", comp.entryFee / 1e15, "gwei");
        
        vm.stopBroadcast();
        
        console.log("\n=== Interaction Complete ===");
    }
}

