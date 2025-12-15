// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {AIModelRegistry} from "../src/AIModelRegistry.sol";
import {AISignalMarketplace} from "../src/AISignalMarketplace.sol";
import {AITradingCompetition} from "../src/AITradingCompetition.sol";
import {MockERC20} from "../src/MockERC20.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        console.log("Deploying contracts...");
        console.log("Deployer address:", deployer);
        console.log("Deployer balance:", deployer.balance / 1e18, "ETH");
        
        vm.startBroadcast(deployerPrivateKey);
        
        // 1. Deploy AIModelRegistry
        console.log("\n=== Deploying AIModelRegistry ===");
        AIModelRegistry registry = new AIModelRegistry();
        console.log("AIModelRegistry deployed at:", address(registry));
        
        // 2. Deploy MockERC20 (USDC-like token for payments)
        console.log("\n=== Deploying MockERC20 (Payment Token) ===");
        MockERC20 paymentToken = new MockERC20(
            "USD Coin",
            "USDC",
            1000000 * 1e18 // 1M tokens
        );
        console.log("MockERC20 deployed at:", address(paymentToken));
        console.log("Total supply:", paymentToken.totalSupply() / 1e18, "USDC");
        
        // 3. Deploy AISignalMarketplace
        console.log("\n=== Deploying AISignalMarketplace ===");
        AISignalMarketplace marketplace = new AISignalMarketplace(
            address(registry),
            address(paymentToken)
        );
        console.log("AISignalMarketplace deployed at:", address(marketplace));
        
        // 4. Deploy AITradingCompetition
        console.log("\n=== Deploying AITradingCompetition ===");
        AITradingCompetition competition = new AITradingCompetition(address(registry));
        console.log("AITradingCompetition deployed at:", address(competition));
        
        vm.stopBroadcast();
        
        console.log("\n=== Deployment Summary ===");
        console.log("AIModelRegistry:", address(registry));
        console.log("MockERC20 (USDC):", address(paymentToken));
        console.log("AISignalMarketplace:", address(marketplace));
        console.log("AITradingCompetition:", address(competition));
        console.log("\n=== Next Steps ===");
        console.log("1. Verify contracts on Basescan");
        console.log("2. Distribute USDC tokens to test users");
        console.log("3. Register AI models");
        console.log("4. Test marketplace and competition features");
    }
}

