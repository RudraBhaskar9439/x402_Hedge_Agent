// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {AIModelRegistry} from "../src/AIModelRegistry.sol";
import {AISignalMarketplace} from "../src/AISignalMarketplace.sol";
import {AITradingCompetition} from "../src/AITradingCompetition.sol";
import {MockERC20} from "../src/MockERC20.sol";

/**
 * @title Local Deployment Script
 * @dev Deploy to local Anvil network for testing
 * 
 * Usage:
 * 1. Start Anvil: anvil
 * 2. Deploy: forge script script/DeployLocal.s.sol:DeployLocalScript --rpc-url http://localhost:8545 --broadcast --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
 */
contract DeployLocalScript is Script {
    function run() external {
        // Use default Anvil account
        uint256 deployerPrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        address deployer = vm.addr(deployerPrivateKey);
        
        console.log("=== Local Deployment (Anvil) ===");
        console.log("Deployer address:", deployer);
        console.log("Deployer balance:", deployer.balance / 1e18, "ETH");
        
        vm.startBroadcast(deployerPrivateKey);
        
        // 1. Deploy AIModelRegistry
        console.log("\n[1/4] Deploying AIModelRegistry...");
        AIModelRegistry registry = new AIModelRegistry();
        console.log("[OK] AIModelRegistry:", address(registry));
        
        // 2. Deploy MockERC20 (USDC-like token for payments)
        console.log("\n[2/4] Deploying MockERC20 (Payment Token)...");
        MockERC20 paymentToken = new MockERC20(
            "USD Coin",
            "USDC",
            1000000 * 1e18 // 1M tokens
        );
        console.log("[OK] MockERC20:", address(paymentToken));
        console.log("   Total supply:", paymentToken.totalSupply() / 1e18, "USDC");
        
        // 3. Deploy AISignalMarketplace
        console.log("\n[3/4] Deploying AISignalMarketplace...");
        AISignalMarketplace marketplace = new AISignalMarketplace(
            address(registry),
            address(paymentToken)
        );
        console.log("[OK] AISignalMarketplace:", address(marketplace));
        
        // 4. Deploy AITradingCompetition
        console.log("\n[4/4] Deploying AITradingCompetition...");
        AITradingCompetition competition = new AITradingCompetition(
            address(registry)
        );
        console.log("[OK] AITradingCompetition:", address(competition));
        
        vm.stopBroadcast();
        
        console.log("\n=== [OK] Deployment Complete ===");
        console.log("\nContract Addresses:");
        console.log("AIModelRegistry:        ", address(registry));
        console.log("MockERC20 (USDC):       ", address(paymentToken));
        console.log("AISignalMarketplace:    ", address(marketplace));
        console.log("AITradingCompetition:   ", address(competition));
        
        console.log("\n=== Next Steps ===");
        console.log("1. Save these addresses");
        console.log("2. Update script/Interact.s.sol with addresses");
        console.log("3. Test interactions using forge script");
        console.log("\nExample interaction:");
        console.log("forge script script/Interact.s.sol:InteractScript \\");
        console.log("  --rpc-url http://localhost:8545 \\");
        console.log("  --broadcast \\");
        console.log("  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
    }
}

