// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {AISignalMarketplace} from "../src/AISignalMarketplace.sol";
import {AIModelRegistry} from "../src/AIModelRegistry.sol";
import {MockERC20} from "../src/MockERC20.sol";

contract AISignalMarketplaceTest is Test {
    AISignalMarketplace public marketplace;
    AIModelRegistry public registry;
    MockERC20 public paymentToken;
    
    address public owner;
    address public modelOwner = address(0x1001); // Use regular address, not precompile
    address public subscriber1;
    address public subscriber2;

    event Subscribed(uint256 indexed modelId, address indexed subscriber, uint256 duration);
    event SignalPublished(uint256 indexed modelId, string asset, string action, uint256 confidence, uint256 timestamp);
    event SignalPurchased(uint256 indexed modelId, address indexed buyer, uint256 price);

    function setUp() public {
        owner = address(this);
        modelOwner = address(0x1);
        subscriber1 = address(0x2);
        subscriber2 = address(0x3);

        registry = new AIModelRegistry();
        paymentToken = new MockERC20("USD Coin", "USDC", 1000000 ether);
        
        marketplace = new AISignalMarketplace(address(registry), address(paymentToken));
    }

    function test_SetModelPricing() public {
        vm.prank(modelOwner);
        uint256 modelId = registry.registerModel("ipfs://model1", 1 ether);

        vm.prank(modelOwner);
        marketplace.setModelPricing(modelId, 100 ether, 10 ether);

        (uint256 subscribers, uint256 signals, uint256 monthlyPrice, uint256 signalPrice) = 
            marketplace.getModelStats(modelId);
        
        assertEq(monthlyPrice, 100 ether);
        assertEq(signalPrice, 10 ether);
    }

    function test_SetModelPricing_NotOwner() public {
        vm.prank(modelOwner);
        uint256 modelId = registry.registerModel("ipfs://model1", 1 ether);

        vm.prank(subscriber1);
        vm.expectRevert("Not model owner");
        marketplace.setModelPricing(modelId, 100 ether, 10 ether);
    }

    function test_Subscribe() public {
        vm.prank(modelOwner);
        uint256 modelId = registry.registerModel("ipfs://model1", 1 ether);

        vm.prank(modelOwner);
        marketplace.setModelPricing(modelId, 100 ether, 10 ether);

        paymentToken.mint(subscriber1, 1000 ether);
        
        uint256 modelOwnerBalanceBefore = paymentToken.balanceOf(modelOwner);
        uint256 platformFeesBefore = marketplace.totalPlatformFees();
        
        vm.startPrank(subscriber1);
        paymentToken.approve(address(marketplace), 1000 ether);
        marketplace.subscribe(modelId, 1);
        vm.stopPrank();

        uint256 modelOwnerBalanceAfter = paymentToken.balanceOf(modelOwner);
        uint256 platformFeesAfter = marketplace.totalPlatformFees();

        assertEq(modelOwnerBalanceAfter - modelOwnerBalanceBefore, 95 ether); // 95% to owner
        assertEq(platformFeesAfter - platformFeesBefore, 5 ether); // 5% platform fee

        (uint256 startTime, uint256 endTime, uint256 signalsReceived, bool isActive) = 
            marketplace.getSubscription(modelId, subscriber1);
        
        assertTrue(isActive);
        assertGt(endTime, startTime);
        assertEq(signalsReceived, 0);

        (uint256 subscribers,,,) = marketplace.getModelStats(modelId);
        assertEq(subscribers, 1);
    }

    function test_Subscribe_MultipleMonths() public {
        vm.prank(modelOwner);
        uint256 modelId = registry.registerModel("ipfs://model1", 1 ether);

        vm.prank(modelOwner);
        marketplace.setModelPricing(modelId, 100 ether, 10 ether);

        paymentToken.mint(subscriber1, 1000 ether);
        
        vm.startPrank(subscriber1);
        paymentToken.approve(address(marketplace), 1000 ether);
        marketplace.subscribe(modelId, 3);
        vm.stopPrank();

        (uint256 startTime, uint256 endTime,,) = marketplace.getSubscription(modelId, subscriber1);
        
        assertGe(endTime - startTime, 90 days - 1); // Approximately 3 months
    }

    function test_Subscribe_ExtendExisting() public {
        vm.prank(modelOwner);
        uint256 modelId = registry.registerModel("ipfs://model1", 1 ether);

        vm.prank(modelOwner);
        marketplace.setModelPricing(modelId, 100 ether, 10 ether);

        paymentToken.mint(subscriber1, 1000 ether);
        
        // First subscription
        vm.startPrank(subscriber1);
        paymentToken.approve(address(marketplace), 1000 ether);
        marketplace.subscribe(modelId, 1);
        vm.stopPrank();
        
        (uint256 startTime1, uint256 endTime1,,) = marketplace.getSubscription(modelId, subscriber1);
        
        // Fast forward time
        vm.warp(block.timestamp + 20 days);

        // Extend subscription
        vm.startPrank(subscriber1);
        marketplace.subscribe(modelId, 1);
        vm.stopPrank();

        (uint256 startTime2, uint256 endTime2,,) = marketplace.getSubscription(modelId, subscriber1);
        
        // Start time should remain the same
        assertEq(startTime1, startTime2);
        // End time should be extended from original end time
        assertGe(endTime2, endTime1 + 30 days - 1);

        // Subscriber count should still be 1 (not incremented)
        (uint256 subscribers,,,) = marketplace.getModelStats(modelId);
        assertEq(subscribers, 1);
    }

    function test_Subscribe_InvalidDuration() public {
        vm.prank(modelOwner);
        uint256 modelId = registry.registerModel("ipfs://model1", 1 ether);

        vm.prank(modelOwner);
        marketplace.setModelPricing(modelId, 100 ether, 10 ether);

        paymentToken.mint(subscriber1, 1000 ether);
        
        vm.startPrank(subscriber1);
        paymentToken.approve(address(marketplace), 1000 ether);
        vm.expectRevert("Invalid duration");
        marketplace.subscribe(modelId, 0);
        vm.expectRevert("Invalid duration");
        marketplace.subscribe(modelId, 13);
        vm.stopPrank();
    }

    function test_Subscribe_ModelNotAvailable() public {
        vm.prank(modelOwner);
        uint256 modelId = registry.registerModel("ipfs://model1", 1 ether);

        paymentToken.mint(subscriber1, 1000 ether);
        
        vm.startPrank(subscriber1);
        paymentToken.approve(address(marketplace), 1000 ether);
        vm.expectRevert("Model not available");
        marketplace.subscribe(modelId, 1);
        vm.stopPrank();
    }

    function test_PublishSignal() public {
        vm.prank(modelOwner);
        uint256 modelId = registry.registerModel("ipfs://model1", 1 ether);

        // Need to ensure model has at least one inference
        vm.startPrank(modelOwner);
        vm.deal(modelOwner, 1 ether);
        uint256 reqId = registry.requestInference{value: 1 ether}(modelId, "test");
        registry.submitInference(reqId, "BUY", 8000);
        marketplace.publishSignal(
            modelId,
            "ETH",
            "BUY",
            2000 ether,
            1900 ether,
            8500,
            "extra data"
        );
        vm.stopPrank();

        (uint256 subscribers, uint256 signals,,) = marketplace.getModelStats(modelId);
        assertEq(signals, 1);

        AISignalMarketplace.Signal memory signal = marketplace.getSignal(modelId, 0);
        assertEq(signal.asset, "ETH");
        assertEq(signal.action, "BUY");
        assertEq(signal.targetPrice, 2000 ether);
        assertEq(signal.confidence, 8500);
    }

    function test_PublishSignal_NotOwner() public {
        vm.prank(modelOwner);
        uint256 modelId = registry.registerModel("ipfs://model1", 1 ether);

        vm.prank(subscriber1);
        vm.expectRevert("Not model owner");
        marketplace.publishSignal(modelId, "ETH", "BUY", 2000 ether, 1900 ether, 8500, "");
    }

    function test_PublishSignal_InvalidConfidence() public {
        vm.prank(modelOwner);
        uint256 modelId = registry.registerModel("ipfs://model1", 1 ether);

        vm.prank(modelOwner);
        vm.deal(modelOwner, 1 ether);
        uint256 requestId = registry.requestInference{value: 1 ether}(modelId, "test");
        vm.prank(modelOwner);
        registry.submitInference(requestId, "BUY", 8000);

        vm.prank(modelOwner);
        vm.expectRevert("Invalid confidence");
        marketplace.publishSignal(modelId, "ETH", "BUY", 2000 ether, 1900 ether, 10001, "");
    }

    function test_PurchaseSignal() public {
        vm.prank(modelOwner);
        uint256 modelId = registry.registerModel("ipfs://model1", 1 ether);

        vm.prank(modelOwner);
        marketplace.setModelPricing(modelId, 100 ether, 10 ether);

        vm.startPrank(modelOwner);
        vm.deal(modelOwner, 1 ether);
        uint256 requestId = registry.requestInference{value: 1 ether}(modelId, "test");
        registry.submitInference(requestId, "BUY", 8000);
        marketplace.publishSignal(modelId, "ETH", "BUY", 2000 ether, 1900 ether, 8500, "");
        vm.stopPrank();

        paymentToken.mint(subscriber1, 100 ether);
        
        uint256 modelOwnerBalanceBefore = paymentToken.balanceOf(modelOwner);
        uint256 platformFeesBefore = marketplace.totalPlatformFees();

        vm.startPrank(subscriber1);
        paymentToken.approve(address(marketplace), 100 ether);
        marketplace.purchaseSignal(modelId, 0);
        vm.stopPrank();

        uint256 modelOwnerBalanceAfter = paymentToken.balanceOf(modelOwner);
        uint256 platformFeesAfter = marketplace.totalPlatformFees();

        assertEq(modelOwnerBalanceAfter - modelOwnerBalanceBefore, 9.5 ether); // 95% to owner
        assertEq(platformFeesAfter - platformFeesBefore, 0.5 ether); // 5% platform fee
    }

    function test_PurchaseSignal_InvalidIndex() public {
        vm.prank(modelOwner);
        uint256 modelId = registry.registerModel("ipfs://model1", 1 ether);

        vm.prank(modelOwner);
        marketplace.setModelPricing(modelId, 100 ether, 10 ether);

        paymentToken.mint(subscriber1, 100 ether);
        
        vm.startPrank(subscriber1);
        paymentToken.approve(address(marketplace), 100 ether);
        vm.expectRevert("Invalid signal");
        marketplace.purchaseSignal(modelId, 0);
        vm.stopPrank();
    }

    function test_HasActiveSubscription() public {
        vm.prank(modelOwner);
        uint256 modelId = registry.registerModel("ipfs://model1", 1 ether);

        vm.prank(modelOwner);
        marketplace.setModelPricing(modelId, 100 ether, 10 ether);

        paymentToken.mint(subscriber1, 1000 ether);
        
        assertFalse(marketplace.hasActiveSubscription(modelId, subscriber1));

        vm.startPrank(subscriber1);
        paymentToken.approve(address(marketplace), 1000 ether);
        marketplace.subscribe(modelId, 1);
        vm.stopPrank();

        assertTrue(marketplace.hasActiveSubscription(modelId, subscriber1));

        // Fast forward past subscription end
        vm.warp(block.timestamp + 31 days);
        assertFalse(marketplace.hasActiveSubscription(modelId, subscriber1));
    }

    function test_GetLatestSignals() public {
        vm.prank(modelOwner);
        uint256 modelId = registry.registerModel("ipfs://model1", 1 ether);

        vm.prank(modelOwner);
        vm.deal(modelOwner, 3 ether);
        uint256 req1 = registry.requestInference{value: 1 ether}(modelId, "test1");
        vm.prank(modelOwner);
        registry.submitInference(req1, "BUY", 8000);
        uint256 req2 = registry.requestInference{value: 1 ether}(modelId, "test2");
        vm.prank(modelOwner);
        registry.submitInference(req2, "SELL", 8000);
        uint256 req3 = registry.requestInference{value: 1 ether}(modelId, "test3");
        vm.prank(modelOwner);
        registry.submitInference(req3, "HOLD", 8000);

        vm.prank(modelOwner);
        marketplace.publishSignal(modelId, "ETH", "BUY", 2000 ether, 1900 ether, 8000, "");
        vm.prank(modelOwner);
        marketplace.publishSignal(modelId, "BTC", "SELL", 50000 ether, 48000 ether, 7500, "");
        vm.prank(modelOwner);
        marketplace.publishSignal(modelId, "SOL", "HOLD", 100 ether, 95 ether, 9000, "");

        AISignalMarketplace.Signal[] memory latest = marketplace.getLatestSignals(modelId, 2);
        assertEq(latest.length, 2);
        assertEq(latest[0].asset, "BTC");
        assertEq(latest[1].asset, "SOL");
    }

    function test_CancelSubscription() public {
        vm.prank(modelOwner);
        uint256 modelId = registry.registerModel("ipfs://model1", 1 ether);

        vm.prank(modelOwner);
        marketplace.setModelPricing(modelId, 100 ether, 10 ether);

        paymentToken.mint(subscriber1, 1000 ether);
        
        vm.startPrank(subscriber1);
        paymentToken.approve(address(marketplace), 1000 ether);
        marketplace.subscribe(modelId, 1);
        vm.stopPrank();

        assertTrue(marketplace.hasActiveSubscription(modelId, subscriber1));

        (uint256 subscribers,,,) = marketplace.getModelStats(modelId);
        assertEq(subscribers, 1);

        vm.prank(subscriber1);
        marketplace.cancelSubscription(modelId);

        assertFalse(marketplace.hasActiveSubscription(modelId, subscriber1));

        (uint256 subscribersAfter,,,) = marketplace.getModelStats(modelId);
        assertEq(subscribersAfter, 0);
    }

    function test_CancelSubscription_NoActive() public {
        vm.prank(modelOwner);
        uint256 modelId = registry.registerModel("ipfs://model1", 1 ether);

        vm.prank(subscriber1);
        vm.expectRevert("No active subscription");
        marketplace.cancelSubscription(modelId);
    }

    function test_WithdrawPlatformFees() public {
        vm.prank(modelOwner);
        uint256 modelId = registry.registerModel("ipfs://model1", 1 ether);

        vm.prank(modelOwner);
        marketplace.setModelPricing(modelId, 100 ether, 10 ether);

        paymentToken.mint(subscriber1, 1000 ether);
        
        vm.startPrank(subscriber1);
        paymentToken.approve(address(marketplace), 1000 ether);
        marketplace.subscribe(modelId, 1);
        vm.stopPrank();

        uint256 platformFees = marketplace.totalPlatformFees();
        assertGt(platformFees, 0);

        uint256 ownerBalanceBefore = paymentToken.balanceOf(owner);
        marketplace.withdrawPlatformFees();
        uint256 ownerBalanceAfter = paymentToken.balanceOf(owner);

        assertEq(ownerBalanceAfter - ownerBalanceBefore, platformFees);
        assertEq(marketplace.totalPlatformFees(), 0);
    }

    function test_UpdatePaymentToken() public {
        MockERC20 newToken = new MockERC20("New Token", "NEW", 1000000 ether);
        
        marketplace.updatePaymentToken(address(newToken));
        
        assertEq(address(marketplace.paymentToken()), address(newToken));
    }
}

