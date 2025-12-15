// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./AIModelRegistry.sol";

/**
 * @title AITradingCompetition
 * @dev Competitive arena where AI models battle for best predictions
 * 
 * Features:
 * - Time-bound competitions
 * - Prize pools
 * - Leaderboard tracking
 * - Performance verification
 */
contract AITradingCompetition is Ownable, ReentrancyGuard {
    
    enum CompetitionStatus { Pending, Active, Completed, Cancelled }
    
    struct Competition {
        uint256 id;
        string name;
        uint256 startTime;
        uint256 endTime;
        uint256 entryFee;
        uint256 prizePool;
        CompetitionStatus status;
        uint256[] participantModels;
        uint256 winnerModelId;
        uint256 totalParticipants;
    }
    
    struct ModelScore {
        uint256 modelId;
        uint256 correctPredictions;
        uint256 totalPredictions;
        int256 totalPnL;
        uint256 finalScore;
    }
    
    AIModelRegistry public modelRegistry;
    
    mapping(uint256 => Competition) public competitions;
    mapping(uint256 => mapping(uint256 => ModelScore)) public competitionScores;
    mapping(uint256 => mapping(uint256 => bool)) public hasEntered;
    
    uint256 public competitionCount;
    uint256 public constant PLATFORM_FEE_PERCENT = 10;
    
    event CompetitionCreated(
        uint256 indexed competitionId,
        string name,
        uint256 startTime,
        uint256 endTime
    );
    
    event ModelEntered(
        uint256 indexed competitionId,
        uint256 indexed modelId,
        address indexed owner
    );
    
    event PredictionMade(
        uint256 indexed competitionId,
        uint256 indexed modelId,
        bytes prediction
    );
    
    event CompetitionCompleted(
        uint256 indexed competitionId,
        uint256 indexed winnerModelId,
        uint256 prize
    );
    
    constructor(address _modelRegistry) Ownable(msg.sender) {
        require(_modelRegistry != address(0), "Invalid registry");
        modelRegistry = AIModelRegistry(payable(_modelRegistry));
    }
    
    /**
     * @notice Create a new trading competition
     */
    function createCompetition(
        string memory name,
        uint256 startTime,
        uint256 duration,
        uint256 entryFee
    ) external onlyOwner returns (uint256) {
        require(startTime > block.timestamp, "Start time must be future");
        require(duration > 0, "Invalid duration");
        
        uint256 competitionId = competitionCount++;
        
        competitions[competitionId] = Competition({
            id: competitionId,
            name: name,
            startTime: startTime,
            endTime: startTime + duration,
            entryFee: entryFee,
            prizePool: 0,
            status: CompetitionStatus.Pending,
            participantModels: new uint256[](0),
            winnerModelId: 0,
            totalParticipants: 0
        });
        
        emit CompetitionCreated(competitionId, name, startTime, startTime + duration);
        
        return competitionId;
    }
    
    /**
     * @notice Enter an AI model into competition
     * @param competitionId The competition to enter
     * @param modelId The model to enter
     */
    function enterCompetition(
        uint256 competitionId,
        uint256 modelId
    ) external payable nonReentrant {
        Competition storage comp = competitions[competitionId];
        
        require(comp.status == CompetitionStatus.Pending, "Not accepting entries");
        require(block.timestamp < comp.startTime, "Already started");
        require(!hasEntered[competitionId][modelId], "Already entered");
        require(msg.value >= comp.entryFee, "Insufficient entry fee");
        
        // Verify model ownership
        address modelOwner = modelRegistry.ownerOf(modelId);
        require(modelOwner == msg.sender, "Not model owner");
        
        // Verify model has minimum track record
        (,,,uint256 totalInferences,) = modelRegistry.getModelInfo(modelId);
        require(totalInferences >= 10, "Insufficient track record");
        
        comp.participantModels.push(modelId);
        comp.prizePool += msg.value;
        comp.totalParticipants++;
        hasEntered[competitionId][modelId] = true;
        
        // Initialize score
        competitionScores[competitionId][modelId] = ModelScore({
            modelId: modelId,
            correctPredictions: 0,
            totalPredictions: 0,
            totalPnL: 0,
            finalScore: 0
        });
        
        emit ModelEntered(competitionId, modelId, msg.sender);
    }
    
    /**
     * @notice Start competition
     */
    function startCompetition(uint256 competitionId) external {
        Competition storage comp = competitions[competitionId];
        
        require(comp.status == CompetitionStatus.Pending, "Already started");
        require(block.timestamp >= comp.startTime, "Not yet time");
        require(comp.totalParticipants >= 2, "Need at least 2 participants");
        
        comp.status = CompetitionStatus.Active;
    }
    
    /**
     * @notice Submit prediction result for a model in competition
     * @param competitionId The competition
     * @param modelId The model that made prediction
     * @param wasCorrect Whether prediction was correct
     * @param pnl P&L from the prediction
     */
    function recordPrediction(
        uint256 competitionId,
        uint256 modelId,
        bool wasCorrect,
        int256 pnl
    ) external {
        Competition storage comp = competitions[competitionId];
        require(comp.status == CompetitionStatus.Active, "Not active");
        require(hasEntered[competitionId][modelId], "Model not in competition");
        require(
            msg.sender == owner() || msg.sender == modelRegistry.ownerOf(modelId),
            "Not authorized"
        );
        
        ModelScore storage score = competitionScores[competitionId][modelId];
        
        score.totalPredictions++;
        if (wasCorrect) {
            score.correctPredictions++;
        }
        score.totalPnL += pnl;
        
        // Calculate score: 60% accuracy, 40% PnL
        uint256 accuracyScore = score.totalPredictions > 0
            ? (score.correctPredictions * 6000) / score.totalPredictions
            : 0;
        
        // PnL score: normalize PnL (cap at 4000, negative PnL = 0)
        uint256 pnlScore = 0;
        if (score.totalPnL > 0) {
            // Cap PnL score at 4000 (scaled)
            uint256 normalizedPnL = uint256(score.totalPnL);
            pnlScore = normalizedPnL > 4000 ? 4000 : normalizedPnL;
        }
        
        score.finalScore = accuracyScore + pnlScore;
    }
    
    /**
     * @notice Complete competition and distribute prizes
     */
    function completeCompetition(uint256 competitionId) external nonReentrant {
        Competition storage comp = competitions[competitionId];
        
        require(comp.status == CompetitionStatus.Active, "Not active");
        require(block.timestamp >= comp.endTime, "Not ended");
        
        // Find winner (highest score)
        uint256 winnerModelId = 0;
        uint256 highestScore = 0;
        
        for (uint256 i = 0; i < comp.participantModels.length; i++) {
            uint256 modelId = comp.participantModels[i];
            uint256 score = competitionScores[competitionId][modelId].finalScore;
            
            if (score > highestScore) {
                highestScore = score;
                winnerModelId = modelId;
            }
        }
        
        require(winnerModelId > 0, "No winner");
        
        comp.winnerModelId = winnerModelId;
        comp.status = CompetitionStatus.Completed;
        
        // Distribute prizes
        uint256 platformFee = (comp.prizePool * PLATFORM_FEE_PERCENT) / 100;
        uint256 winnerPrize = comp.prizePool - platformFee;
        
        address winner = modelRegistry.ownerOf(winnerModelId);
        payable(winner).transfer(winnerPrize);
        payable(owner()).transfer(platformFee);
        
        emit CompetitionCompleted(competitionId, winnerModelId, winnerPrize);
    }
    
    /**
     * @notice Get competition details
     */
    function getCompetition(uint256 competitionId)
        external
        view
        returns (Competition memory)
    {
        return competitions[competitionId];
    }

    /**
     * @notice Get competition leaderboard
     */
    function getLeaderboard(uint256 competitionId)
        external
        view
        returns (uint256[] memory modelIds, uint256[] memory scores)
    {
        Competition storage comp = competitions[competitionId];
        uint256 participantCount = comp.participantModels.length;
        
        modelIds = new uint256[](participantCount);
        scores = new uint256[](participantCount);
        
        // Copy and sort
        for (uint256 i = 0; i < participantCount; i++) {
            modelIds[i] = comp.participantModels[i];
            scores[i] = competitionScores[competitionId][modelIds[i]].finalScore;
        }
        
        // Bubble sort (descending)
        for (uint256 i = 0; i < participantCount; i++) {
            for (uint256 j = i + 1; j < participantCount; j++) {
                if (scores[j] > scores[i]) {
                    (scores[i], scores[j]) = (scores[j], scores[i]);
                    (modelIds[i], modelIds[j]) = (modelIds[j], modelIds[i]);
                }
            }
        }
        
        return (modelIds, scores);
    }
    
    /**
     * @notice Get model score in competition
     */
    function getModelScore(uint256 competitionId, uint256 modelId)
        external
        view
        returns (
            uint256 correctPredictions,
            uint256 totalPredictions,
            int256 totalPnL,
            uint256 finalScore
        )
    {
        ModelScore storage score = competitionScores[competitionId][modelId];
        return (
            score.correctPredictions,
            score.totalPredictions,
            score.totalPnL,
            score.finalScore
        );
    }
    
    /**
     * @notice Get all competitions
     */
    function getActiveCompetitions()
        external
        view
        returns (uint256[] memory activeIds)
    {
        uint256 activeCount = 0;
        
        // Count active
        for (uint256 i = 0; i < competitionCount; i++) {
            if (competitions[i].status == CompetitionStatus.Active ||
                competitions[i].status == CompetitionStatus.Pending) {
                activeCount++;
            }
        }
        
        // Collect active
        activeIds = new uint256[](activeCount);
        uint256 index = 0;
        for (uint256 i = 0; i < competitionCount; i++) {
            if (competitions[i].status == CompetitionStatus.Active ||
                competitions[i].status == CompetitionStatus.Pending) {
                activeIds[index++] = i;
            }
        }
        
        return activeIds;
    }

    /**
     * @notice Get all participants in a competition
     */
    function getCompetitionParticipants(uint256 competitionId)
        external
        view
        returns (uint256[] memory modelIds, address[] memory owners)
    {
        Competition storage comp = competitions[competitionId];
        uint256 count = comp.participantModels.length;
        
        modelIds = new uint256[](count);
        owners = new address[](count);
        
        for (uint256 i = 0; i < count; i++) {
            modelIds[i] = comp.participantModels[i];
            owners[i] = modelRegistry.ownerOf(modelIds[i]);
        }
        
        return (modelIds, owners);
    }

    /**
     * @notice Check if competition can be started (time reached and has participants)
     */
    function canStartCompetition(uint256 competitionId)
        external
        view
        returns (bool)
    {
        Competition storage comp = competitions[competitionId];
        return comp.status == CompetitionStatus.Pending &&
               block.timestamp >= comp.startTime &&
               comp.totalParticipants >= 2;
    }

    /**
     * @notice Check if competition can be completed (time reached)
     */
    function canCompleteCompetition(uint256 competitionId)
        external
        view
        returns (bool)
    {
        Competition storage comp = competitions[competitionId];
        return comp.status == CompetitionStatus.Active &&
               block.timestamp >= comp.endTime;
    }
    
    /**
     * @notice Cancel competition (before start)
     */
    function cancelCompetition(uint256 competitionId) external onlyOwner nonReentrant {
        Competition storage comp = competitions[competitionId];
        
        require(comp.status == CompetitionStatus.Pending, "Cannot cancel");
        require(block.timestamp < comp.startTime, "Already started");
        
        comp.status = CompetitionStatus.Cancelled;
        
        // Refund all participants
        for (uint256 i = 0; i < comp.participantModels.length; i++) {
            uint256 modelId = comp.participantModels[i];
            address modelOwner = modelRegistry.ownerOf(modelId);
            payable(modelOwner).transfer(comp.entryFee);
        }
    }
}