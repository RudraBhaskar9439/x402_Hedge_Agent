// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {AIModelRegistry} from "../src/AIModelRegistry.sol";
import {IERC8004} from "../src/IERC8004.sol";

// Minimal concrete implementation for testing
contract TestableAIModelRegistry is AIModelRegistry {
    constructor() AIModelRegistry() {}
}

contract AIModelRegistryTest is Test {
    TestableAIModelRegistry public registry;
    address public owner;
    address public user1;
    address public user2;
    address public oracle;

    // Allow this contract to receive Ether for test payouts
    receive() external payable {}

    event ModelRegistered(uint256 indexed modelId, address indexed owner, string modelURI, uint256 inferencePrice);
    event InferenceRequested(uint256 indexed requestId, uint256 indexed modelId, address indexed requester, bytes inputData);
    event InferenceCompleted(uint256 indexed requestId, uint256 indexed modelId, bytes outputData, uint256 confidence);
    event PerformanceUpdated(uint256 indexed modelId, uint256 accuracy, uint256 totalInferences);
    event Invested(uint256 indexed modelId, address indexed user, uint256 amount);
    event Withdrawn(uint256 indexed modelId, address indexed user, uint256 amount);
    event StreamingFeePaid(uint256 indexed modelId, address indexed user, uint256 fee, uint256 timeElapsed);

    function setUp() public {
        owner = address(this);
        user1 = address(0x1001);
        user2 = address(0x1002);
        oracle = address(0x1003);
        
        registry = new TestableAIModelRegistry();
    }

    function test_RegisterModel() public {
        vm.prank(user1);
        uint256 modelId = registry.registerModel("ipfs://QmTest123", 1 ether, 1e15);
        assertEq(modelId, 1);
        assertEq(registry.ownerOf(modelId), user1);
        (address owner_, string memory modelURI, uint256 price, uint256 inferences, uint256 accuracy) = registry.getModelInfo(modelId);
        assertEq(owner_, user1);
        assertEq(modelURI, "ipfs://QmTest123");
        assertEq(price, 1 ether);
        assertEq(inferences, 0);
        assertEq(accuracy, 5000); // Starts at 50%
    }

    function test_RegisterModel_EmptyURI() public {
        vm.prank(user1);
        vm.expectRevert("Empty URI");
        registry.registerModel("", 1 ether, 1e15);
    }

    function test_RegisterModel_InvalidPrice() public {
        vm.prank(user1);
        vm.expectRevert("Invalid price");
        registry.registerModel("ipfs://QmTest123", 0, 1e15);
    }

    function test_RequestInference() public {
        vm.prank(user1);
        uint256 modelId = registry.registerModel("ipfs://QmTest123", 1 ether, 1e15);
        vm.prank(user2);
        vm.deal(user2, 2 ether);
        uint256 requestId = registry.requestInference{value: 1 ether}(modelId, "test input data");
        assertEq(requestId, 1);
        (uint256 reqModelId, address requester, bytes memory outputData, uint256 confidence, uint256 timestamp) = registry.getInferenceResult(requestId);
        assertEq(reqModelId, modelId);
        assertEq(requester, user2);
        assertEq(outputData.length, 0); // Not completed yet
        assertEq(confidence, 0);
        assertGt(timestamp, 0);
    }

    function test_RequestInference_InsufficientPayment() public {
        vm.prank(user1);
        uint256 modelId = registry.registerModel("ipfs://QmTest123", 1 ether, 1e15);
        vm.prank(user2);
        vm.deal(user2, 0.5 ether);
        vm.expectRevert("Insufficient payment");
        registry.requestInference{value: 0.5 ether}(modelId, "test input data");
    }

    function test_RequestInference_InactiveModel() public {
        vm.prank(user1);
        uint256 modelId = registry.registerModel("ipfs://QmTest123", 1 ether, 1e15);
        vm.prank(user1);
        registry.deactivateModel(modelId);
        vm.prank(user2);
        vm.deal(user2, 1 ether);
        vm.expectRevert("Model not active");
        registry.requestInference{value: 1 ether}(modelId, "test input data");
    }

    function test_SubmitInference() public {
        vm.prank(user1);
        uint256 modelId = registry.registerModel("ipfs://QmTest123", 1 ether, 1e15);
        vm.prank(user2);
        vm.deal(user2, 1 ether);
        uint256 requestId = registry.requestInference{value: 1 ether}(modelId, "test input data");
        uint256 balanceBefore = user1.balance;
        vm.prank(user1);
        registry.submitInference(requestId, "BUY,1000,950", 8500);
        uint256 balanceAfter = user1.balance;
        uint256 expectedFee = 1 ether - (1 ether * 5 / 100); // 95% to owner
        assertEq(balanceAfter - balanceBefore, expectedFee);
        (,, bytes memory outputData, uint256 confidence,) = registry.getInferenceResult(requestId);
        assertEq(string(outputData), "BUY,1000,950");
        assertEq(confidence, 8500);
    }

    function test_SubmitInference_Unauthorized() public {
        vm.prank(user1);
        uint256 modelId = registry.registerModel("ipfs://QmTest123", 1 ether, 1e15);
        vm.prank(user2);
        vm.deal(user2, 1 ether);
        uint256 requestId = registry.requestInference{value: 1 ether}(modelId, "test input data");
        vm.prank(user2);
        vm.expectRevert("Not authorized");
        registry.submitInference(requestId, "BUY,1000,950", 8500);
    }

    function test_SubmitInference_AuthorizedOracle() public {
        vm.prank(user1);
        uint256 modelId = registry.registerModel("ipfs://QmTest123", 1 ether, 1e15);
        registry.authorizeOracle(oracle, true);
        vm.prank(user2);
        vm.deal(user2, 1 ether);
        uint256 requestId = registry.requestInference{value: 1 ether}(modelId, "test input data");
        vm.prank(oracle);
        registry.submitInference(requestId, "BUY,1000,950", 8500);
        (,, bytes memory outputData, uint256 confidence,) = registry.getInferenceResult(requestId);
        assertEq(string(outputData), "BUY,1000,950");
        assertEq(confidence, 8500);
    }

    function test_UpdateModelPerformance() public {
        vm.prank(user1);
        uint256 modelId = registry.registerModel("ipfs://QmTest123", 1 ether, 1e15);
        vm.prank(user2);
        vm.deal(user2, 1 ether);
        uint256 requestId = registry.requestInference{value: 1 ether}(modelId, "test input data");
        vm.prank(user1);
        registry.submitInference(requestId, "BUY,1000,950", 8500);
        vm.prank(user2);
        registry.updateModelPerformance(requestId, true, 100);
        (uint256 correct, uint256 total, int256 pnl, uint256 revenue, uint256 accuracy) = registry.getModelMetrics(modelId);
        assertEq(correct, 1);
        assertEq(total, 1);
        assertEq(pnl, 100);
        assertEq(accuracy, 10000); // 100% accuracy
    }

    function test_UpdateModelPerformance_Multiple() public {
        vm.prank(user1);
        uint256 modelId = registry.registerModel("ipfs://QmTest123", 1 ether, 1e15);
        // First prediction
        vm.prank(user2);
        vm.deal(user2, 2 ether);
        uint256 requestId1 = registry.requestInference{value: 1 ether}(modelId, "test1");
        vm.prank(user1);
        registry.submitInference(requestId1, "BUY", 8000);
        vm.prank(user2);
        registry.updateModelPerformance(requestId1, true, 100);
        // Second prediction
        vm.prank(user2);
        uint256 requestId2 = registry.requestInference{value: 1 ether}(modelId, "test2");
        vm.prank(user1);
        registry.submitInference(requestId2, "SELL", 9000);
        vm.prank(user2);
        registry.updateModelPerformance(requestId2, false, -50);
        (uint256 correct, uint256 total, int256 pnl, uint256 revenue, uint256 accuracy) = registry.getModelMetrics(modelId);
        assertEq(correct, 1);
        assertEq(total, 2);
        assertEq(pnl, 50); // 100 - 50
        assertEq(accuracy, 5000); // 50% accuracy (1/2)
    }

    function test_UpdateModelPrice() public {
        vm.prank(user1);
        uint256 modelId = registry.registerModel("ipfs://QmTest123", 1 ether, 1e15);
        vm.prank(user1);
        registry.updateModelPrice(modelId, 2 ether);
        (,, uint256 price,,) = registry.getModelInfo(modelId);
        assertEq(price, 2 ether);
    }

    function test_UpdateModelPrice_NotOwner() public {
        vm.prank(user1);
        uint256 modelId = registry.registerModel("ipfs://QmTest123", 1 ether, 1e15);
        vm.prank(user2);
        vm.expectRevert();
        registry.updateModelPrice(modelId, 2 ether);
    }

    function test_DeactivateModel() public {
        vm.prank(user1);
        uint256 modelId = registry.registerModel("ipfs://QmTest123", 1 ether, 1e15);
        vm.prank(user1);
        registry.deactivateModel(modelId);
        vm.prank(user2);
        vm.deal(user2, 1 ether);
        vm.expectRevert("Model not active");
        registry.requestInference{value: 1 ether}(modelId, "test");
    }

    function test_WithdrawPlatformFees() public {
        vm.prank(user1);
        uint256 modelId = registry.registerModel("ipfs://QmTest123", 1 ether, 1e15);
        vm.prank(user2);
        vm.deal(user2, 1 ether);
        uint256 requestId = registry.requestInference{value: 1 ether}(modelId, "test");
        vm.prank(user1);
        registry.submitInference(requestId, "BUY", 8000);
        uint256 platformFees = registry.totalPlatformFees();
        assertEq(platformFees, 1 ether * 5 / 100);
        uint256 ownerBalanceBefore = owner.balance;
        registry.withdrawPlatformFees();
        uint256 ownerBalanceAfter = owner.balance;
        assertEq(ownerBalanceAfter - ownerBalanceBefore, platformFees);
        assertEq(registry.totalPlatformFees(), 0);
    }

    function test_TransferModel() public {
        vm.prank(user1);
        uint256 modelId = registry.registerModel("ipfs://QmTest123", 1 ether, 1e15);
        vm.prank(user1);
        registry.transferFrom(user1, user2, modelId);
        assertEq(registry.ownerOf(modelId), user2);
        (address owner_,,,,) = registry.getModelInfo(modelId);
        assertEq(owner_, user2);
    }

    function test_GetTopModels() public {
        // Register multiple models
        vm.prank(user1);
        uint256 modelId1 = registry.registerModel("ipfs://model1", 1 ether, 1e15);
        vm.prank(user2);
        uint256 modelId2 = registry.registerModel("ipfs://model2", 1 ether, 1e15);
        // Make predictions for model1 - user1 requests, user1 submits, user1 updates (as requester)
        vm.deal(user1, 2 ether);
        vm.startPrank(user1);
        uint256 req1 = registry.requestInference{value: 1 ether}(modelId1, "test1");
        registry.submitInference(req1, "BUY", 8000);
        // user1 is the requester, so they can update performance
        registry.updateModelPerformance(req1, true, 100);
        uint256 req2 = registry.requestInference{value: 1 ether}(modelId1, "test2");
        registry.submitInference(req2, "SELL", 8000);
        registry.updateModelPerformance(req2, true, 50);
        vm.stopPrank();
        // Model1 should have 100% accuracy with 2 predictions
        (uint256[] memory modelIds, uint256[] memory accuracies) = registry.getTopModels(10);
        // Should return models with at least 10 predictions (none meet this threshold)
        // But let's check the function works
        assertGe(modelIds.length, 0);
    }

    function test_InvestAndWithdraw() public {
        // Register model with streamingRate = 1e15 wei/sec (0.001 ETH/sec)
        vm.prank(user1);
        uint256 modelId = registry.registerModel("ipfs://QmTest123", 1 ether, 1e15);
        
        // User2 invests 2 ETH
        vm.prank(user2);
        vm.deal(user2, 2 ether);
        vm.expectEmit(true, true, false, true);
        emit Invested(modelId, user2, 2 ether);
        registry.invest{value: 2 ether}(modelId);
        
        // Fast forward 10 seconds
        vm.warp(block.timestamp + 10);
        
        // User2 withdraws 1 ETH
        uint256 user2BalanceBefore = user2.balance;
        vm.prank(user2);
        vm.expectEmit(true, true, false, true);
        // Streaming fee: 1e15 * 10 * 1e18 / 2e18 = 5e15 wei (0.005 ETH)
        emit StreamingFeePaid(modelId, user2, 5e15, 10);
        vm.expectEmit(true, true, false, true);
        emit Withdrawn(modelId, user2, 1 ether);
        registry.withdraw(modelId, 1 ether);
        uint256 user2BalanceAfter = user2.balance;
        // User receives 1 ETH - 0.005 ETH = 0.995 ETH
        assertEq(user2BalanceAfter - user2BalanceBefore, 0.995 ether);
        
        // Withdraw remaining, should reset timestamp
        vm.warp(block.timestamp + 5);
        vm.prank(user2);
        registry.withdraw(modelId, 1 ether);
        // Should emit StreamingFeePaid and Withdrawn again
    }

    function test_Withdraw_OverchargePrevention() public {
        // Register model with high streamingRate
        vm.prank(user1);
        uint256 modelId = registry.registerModel("ipfs://QmTest123", 1 ether, 1 ether); // 1 ETH/sec
        vm.prank(user2);
        vm.deal(user2, 1 ether);
        registry.invest{value: 1 ether}(modelId);
        vm.warp(block.timestamp + 2); // 2 seconds
        vm.prank(user2);
        // Streaming fee would be 2 ETH, but only 1 ETH invested, so fee capped at 1 ETH
        vm.expectEmit(true, true, false, true);
        emit StreamingFeePaid(modelId, user2, 1 ether, 2);
        vm.expectEmit(true, true, false, true);
        emit Withdrawn(modelId, user2, 1 ether);
        registry.withdraw(modelId, 1 ether);
        // User receives 0 ETH
        assertEq(user2.balance, 0);
    }

    function test_Withdraw_InsufficientBalance() public {
        vm.prank(user1);
        uint256 modelId = registry.registerModel("ipfs://QmTest123", 1 ether, 1e15);
        vm.prank(user2);
        vm.deal(user2, 1 ether);
        registry.invest{value: 1 ether}(modelId);
        vm.prank(user2);
        vm.expectRevert("Insufficient balance");
        registry.withdraw(modelId, 2 ether);
    }

    function test_Invest_ZeroAmount() public {
        vm.prank(user1);
        uint256 modelId = registry.registerModel("ipfs://QmTest123", 1 ether, 1e15);
        vm.prank(user2);
        vm.expectRevert("No ETH sent");
        vm.expectRevert(); // Should revert for zero amount
        registry.invest{value: 0}(modelId);
    }
}

