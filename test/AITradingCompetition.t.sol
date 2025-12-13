// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {AITradingCompetition} from "../src/AITradingCompetition.sol";
import {AIModelRegistry} from "../src/AIModelRegistry.sol";

contract AITradingCompetitionTest is Test {
    AITradingCompetition public competition;
    AIModelRegistry public registry;
    
    address public owner;
    address public modelOwner1;
    address public modelOwner2;
    address public modelOwner3;

    // Allow test contract to receive ETH
    receive() external payable {}

    event CompetitionCreated(uint256 indexed competitionId, string name, uint256 startTime, uint256 endTime);
    event ModelEntered(uint256 indexed competitionId, uint256 indexed modelId, address indexed owner);
    event CompetitionCompleted(uint256 indexed competitionId, uint256 indexed winnerModelId, uint256 prize);

    function setUp() public {
        owner = address(this);
        modelOwner1 = address(0x1001); // Use regular addresses, not precompiles
        modelOwner2 = address(0x1002);
        modelOwner3 = address(0x1003);

        registry = new AIModelRegistry();
        competition = new AITradingCompetition(address(registry));
    }

    function _createModelWithTrackRecord(address modelOwner) internal returns (uint256 modelId) {
        vm.prank(modelOwner);
        modelId = registry.registerModel("ipfs://model", 1 ether, 1e15);

        // Create track record (need at least 10 inferences)
        vm.prank(modelOwner);
        vm.deal(modelOwner, 20 ether);
        for (uint256 i = 0; i < 10; i++) {
            uint256 requestId = registry.requestInference{value: 1 ether}(modelId, "test");
            vm.prank(modelOwner);
            registry.submitInference(requestId, "BUY", 8000);
        }
    }

    function test_CreateCompetition() public {
        uint256 startTime = block.timestamp + 1 days;
        uint256 competitionId = competition.createCompetition(
            "Test Competition",
            startTime,
            7 days,
            1 ether
        );

        assertEq(competitionId, 0);
        
        // Access struct using getCompetition function
        AITradingCompetition.Competition memory comp = competition.getCompetition(competitionId);
        
        assertEq(comp.id, 0);
        assertEq(comp.name, "Test Competition");
        assertEq(comp.startTime, startTime);
        assertEq(comp.endTime, startTime + 7 days);
        assertEq(comp.entryFee, 1 ether);
        assertEq(uint256(comp.status), uint256(AITradingCompetition.CompetitionStatus.Pending));
    }

    function test_CreateCompetition_InvalidStartTime() public {
        vm.expectRevert("Start time must be future");
        competition.createCompetition("Test", block.timestamp - 1, 7 days, 1 ether);
    }

    function test_CreateCompetition_InvalidDuration() public {
        vm.expectRevert("Invalid duration");
        competition.createCompetition("Test", block.timestamp + 1 days, 0, 1 ether);
    }

    function test_EnterCompetition() public {
        uint256 startTime = block.timestamp + 1 days;
        uint256 competitionId = competition.createCompetition(
            "Test Competition",
            startTime,
            7 days,
            1 ether
        );

        uint256 modelId = _createModelWithTrackRecord(modelOwner1);

        vm.prank(modelOwner1);
        vm.deal(modelOwner1, 2 ether);
        competition.enterCompetition{value: 1 ether}(competitionId, modelId);

        AITradingCompetition.Competition memory comp = competition.getCompetition(competitionId);
        
        assertEq(comp.prizePool, 1 ether);
        assertEq(comp.participantModels.length, 1);
        assertEq(comp.totalParticipants, 1);
        assertTrue(competition.hasEntered(competitionId, modelId));
    }

    function test_EnterCompetition_InsufficientTrackRecord() public {
        uint256 startTime = block.timestamp + 1 days;
        uint256 competitionId = competition.createCompetition(
            "Test Competition",
            startTime,
            7 days,
            1 ether
        );

        vm.prank(modelOwner1);
        uint256 modelId = registry.registerModel("ipfs://model", 1 ether, 1e15);

        vm.prank(modelOwner1);
        vm.deal(modelOwner1, 2 ether);
        vm.expectRevert("Insufficient track record");
        competition.enterCompetition{value: 1 ether}(competitionId, modelId);
    }

    function test_EnterCompetition_NotOwner() public {
        uint256 startTime = block.timestamp + 1 days;
        uint256 competitionId = competition.createCompetition(
            "Test Competition",
            startTime,
            7 days,
            1 ether
        );

        uint256 modelId = _createModelWithTrackRecord(modelOwner1);

        vm.prank(modelOwner2);
        vm.deal(modelOwner2, 2 ether);
        vm.expectRevert("Not model owner");
        competition.enterCompetition{value: 1 ether}(competitionId, modelId);
    }

    function test_EnterCompetition_InsufficientFee() public {
        uint256 startTime = block.timestamp + 1 days;
        uint256 competitionId = competition.createCompetition(
            "Test Competition",
            startTime,
            7 days,
            1 ether
        );

        uint256 modelId = _createModelWithTrackRecord(modelOwner1);

        vm.prank(modelOwner1);
        vm.deal(modelOwner1, 0.5 ether);
        vm.expectRevert("Insufficient entry fee");
        competition.enterCompetition{value: 0.5 ether}(competitionId, modelId);
    }

    function test_EnterCompetition_AlreadyEntered() public {
        uint256 startTime = block.timestamp + 1 days;
        uint256 competitionId = competition.createCompetition(
            "Test Competition",
            startTime,
            7 days,
            1 ether
        );

        uint256 modelId = _createModelWithTrackRecord(modelOwner1);

        vm.prank(modelOwner1);
        vm.deal(modelOwner1, 3 ether);
        competition.enterCompetition{value: 1 ether}(competitionId, modelId);

        vm.prank(modelOwner1);
        vm.expectRevert("Already entered");
        competition.enterCompetition{value: 1 ether}(competitionId, modelId);
    }

    function test_StartCompetition() public {
        uint256 startTime = block.timestamp + 1 days;
        uint256 competitionId = competition.createCompetition(
            "Test Competition",
            startTime,
            7 days,
            1 ether
        );

        uint256 modelId1 = _createModelWithTrackRecord(modelOwner1);
        uint256 modelId2 = _createModelWithTrackRecord(modelOwner2);

        vm.prank(modelOwner1);
        vm.deal(modelOwner1, 2 ether);
        competition.enterCompetition{value: 1 ether}(competitionId, modelId1);

        vm.prank(modelOwner2);
        vm.deal(modelOwner2, 2 ether);
        competition.enterCompetition{value: 1 ether}(competitionId, modelId2);

        vm.warp(startTime);

        competition.startCompetition(competitionId);

        AITradingCompetition.Competition memory comp = competition.getCompetition(competitionId);
        
        assertEq(uint256(comp.status), uint256(AITradingCompetition.CompetitionStatus.Active));
    }

    function test_StartCompetition_NotEnoughParticipants() public {
        uint256 startTime = block.timestamp + 1 days;
        uint256 competitionId = competition.createCompetition(
            "Test Competition",
            startTime,
            7 days,
            1 ether
        );

        uint256 modelId1 = _createModelWithTrackRecord(modelOwner1);

        vm.prank(modelOwner1);
        vm.deal(modelOwner1, 2 ether);
        competition.enterCompetition{value: 1 ether}(competitionId, modelId1);

        vm.warp(startTime);

        vm.expectRevert("Need at least 2 participants");
        competition.startCompetition(competitionId);
    }

    function test_RecordPrediction() public {
        uint256 startTime = block.timestamp + 1 days;
        uint256 competitionId = competition.createCompetition(
            "Test Competition",
            startTime,
            7 days,
            1 ether
        );

        uint256 modelId1 = _createModelWithTrackRecord(modelOwner1);
        uint256 modelId2 = _createModelWithTrackRecord(modelOwner2);

        vm.prank(modelOwner1);
        vm.deal(modelOwner1, 2 ether);
        competition.enterCompetition{value: 1 ether}(competitionId, modelId1);

        vm.prank(modelOwner2);
        vm.deal(modelOwner2, 2 ether);
        competition.enterCompetition{value: 1 ether}(competitionId, modelId2);

        vm.warp(startTime);
        competition.startCompetition(competitionId);

        vm.prank(modelOwner1);
        competition.recordPrediction(competitionId, modelId1, true, 100);

        (uint256 correct, uint256 total, int256 pnl, uint256 finalScore) = 
            competition.getModelScore(competitionId, modelId1);
        
        assertEq(correct, 1);
        assertEq(total, 1);
        assertEq(pnl, 100);
        assertGt(finalScore, 0);
    }

    function test_RecordPrediction_NotActive() public {
        uint256 startTime = block.timestamp + 1 days;
        uint256 competitionId = competition.createCompetition(
            "Test Competition",
            startTime,
            7 days,
            1 ether
        );

        uint256 modelId1 = _createModelWithTrackRecord(modelOwner1);

        vm.prank(modelOwner1);
        vm.deal(modelOwner1, 2 ether);
        competition.enterCompetition{value: 1 ether}(competitionId, modelId1);

        vm.prank(modelOwner1);
        vm.expectRevert("Not active");
        competition.recordPrediction(competitionId, modelId1, true, 100);
    }

    function test_CompleteCompetition() public {
        uint256 startTime = block.timestamp + 1 days;
        uint256 competitionId = competition.createCompetition(
            "Test Competition",
            startTime,
            7 days,
            1 ether
        );

        uint256 modelId1 = _createModelWithTrackRecord(modelOwner1);
        uint256 modelId2 = _createModelWithTrackRecord(modelOwner2);

        vm.prank(modelOwner1);
        vm.deal(modelOwner1, 2 ether);
        competition.enterCompetition{value: 1 ether}(competitionId, modelId1);

        vm.prank(modelOwner2);
        vm.deal(modelOwner2, 2 ether);
        competition.enterCompetition{value: 1 ether}(competitionId, modelId2);

        vm.warp(startTime);
        competition.startCompetition(competitionId);

        // Model1 makes better predictions
        vm.prank(modelOwner1);
        competition.recordPrediction(competitionId, modelId1, true, 200);
        vm.prank(modelOwner1);
        competition.recordPrediction(competitionId, modelId1, true, 150);

        // Model2 makes worse predictions
        vm.prank(modelOwner2);
        competition.recordPrediction(competitionId, modelId2, true, 50);
        vm.prank(modelOwner2);
        competition.recordPrediction(competitionId, modelId2, false, -30);

        vm.warp(startTime + 7 days + 1);

        uint256 winnerBalanceBefore = modelOwner1.balance;
        competition.completeCompetition(competitionId);
        uint256 winnerBalanceAfter = modelOwner1.balance;

        AITradingCompetition.Competition memory comp = competition.getCompetition(competitionId);
        
        assertEq(uint256(comp.status), uint256(AITradingCompetition.CompetitionStatus.Completed));
        assertEq(comp.winnerModelId, modelId1);
        assertEq(winnerBalanceAfter - winnerBalanceBefore, comp.prizePool - (comp.prizePool * 10 / 100)); // 90% to winner
    }

    function test_GetLeaderboard() public {
        uint256 startTime = block.timestamp + 1 days;
        uint256 competitionId = competition.createCompetition(
            "Test Competition",
            startTime,
            7 days,
            1 ether
        );

        uint256 modelId1 = _createModelWithTrackRecord(modelOwner1);
        uint256 modelId2 = _createModelWithTrackRecord(modelOwner2);
        uint256 modelId3 = _createModelWithTrackRecord(modelOwner3);

        vm.prank(modelOwner1);
        vm.deal(modelOwner1, 2 ether);
        competition.enterCompetition{value: 1 ether}(competitionId, modelId1);

        vm.prank(modelOwner2);
        vm.deal(modelOwner2, 2 ether);
        competition.enterCompetition{value: 1 ether}(competitionId, modelId2);

        vm.prank(modelOwner3);
        vm.deal(modelOwner3, 2 ether);
        competition.enterCompetition{value: 1 ether}(competitionId, modelId3);

        vm.warp(startTime);
        competition.startCompetition(competitionId);

        // Model1: best
        vm.prank(modelOwner1);
        competition.recordPrediction(competitionId, modelId1, true, 300);

        // Model2: middle
        vm.prank(modelOwner2);
        competition.recordPrediction(competitionId, modelId2, true, 100);

        // Model3: worst
        vm.prank(modelOwner3);
        competition.recordPrediction(competitionId, modelId3, false, -50);

        (uint256[] memory modelIds, uint256[] memory scores) = competition.getLeaderboard(competitionId);
        
        assertEq(modelIds.length, 3);
        assertEq(modelIds[0], modelId1); // Highest score
        assertGt(scores[0], scores[1]);
        assertGt(scores[1], scores[2]);
    }

    function test_CancelCompetition() public {
        uint256 startTime = block.timestamp + 1 days;
        uint256 competitionId = competition.createCompetition(
            "Test Competition",
            startTime,
            7 days,
            1 ether
        );

        uint256 modelId1 = _createModelWithTrackRecord(modelOwner1);

        vm.prank(modelOwner1);
        vm.deal(modelOwner1, 2 ether);
        competition.enterCompetition{value: 1 ether}(competitionId, modelId1);

        uint256 modelOwnerBalanceBefore = modelOwner1.balance;
        competition.cancelCompetition(competitionId);
        uint256 modelOwnerBalanceAfter = modelOwner1.balance;

        assertEq(modelOwnerBalanceAfter - modelOwnerBalanceBefore, 1 ether); // Refunded

        AITradingCompetition.Competition memory comp = competition.getCompetition(competitionId);
        
        assertEq(uint256(comp.status), uint256(AITradingCompetition.CompetitionStatus.Cancelled));
    }

    function test_CancelCompetition_AlreadyStarted() public {
        uint256 startTime = block.timestamp + 1 days;
        uint256 competitionId = competition.createCompetition(
            "Test Competition",
            startTime,
            7 days,
            1 ether
        );

        uint256 modelId1 = _createModelWithTrackRecord(modelOwner1);
        uint256 modelId2 = _createModelWithTrackRecord(modelOwner2);

        vm.prank(modelOwner1);
        vm.deal(modelOwner1, 2 ether);
        competition.enterCompetition{value: 1 ether}(competitionId, modelId1);

        vm.prank(modelOwner2);
        vm.deal(modelOwner2, 2 ether);
        competition.enterCompetition{value: 1 ether}(competitionId, modelId2);

        vm.warp(startTime);
        competition.startCompetition(competitionId);

        vm.expectRevert("Cannot cancel");
        competition.cancelCompetition(competitionId);
    }

    function test_GetActiveCompetitions() public {
        uint256 startTime1 = block.timestamp + 1 days;
        uint256 competitionId1 = competition.createCompetition(
            "Competition 1",
            startTime1,
            7 days,
            1 ether
        );

        uint256 startTime2 = block.timestamp + 2 days;
        uint256 competitionId2 = competition.createCompetition(
            "Competition 2",
            startTime2,
            7 days,
            1 ether
        );

        uint256[] memory activeIds = competition.getActiveCompetitions();
        assertGe(activeIds.length, 2);
    }
}

