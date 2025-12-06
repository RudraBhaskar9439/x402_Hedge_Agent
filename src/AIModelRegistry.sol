// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./IERC8004.sol";

/**
 * @title AIModelRegistry
 * @dev ERC-8004 compliant registry for AI trading models
 * 
 * Each AI model is an NFT that can:
 * - Generate trading signals
 * - Be queried for predictions
 * - Earn fees from inferences
 * - Build verifiable track record
 */
contract AIModelRegistry is IERC8004, ERC721, Ownable, ReentrancyGuard {
    
    struct AIModel {
        address owner;
        string modelURI;           // IPFS hash with model metadata
        uint256 inferencePrice;    // Price per prediction
        uint256 totalInferences;   // Total predictions made
        uint256 accuracy;          // Accuracy score (0-10000)
        uint256 totalRevenue;      // Total earnings
        bool isActive;
        uint256 createdAt;
        
        // Performance metrics
        uint256 correctPredictions;
        uint256 totalPredictions;
        int256 totalPnL;           // Cumulative P&L from signals
    }
    
    struct InferenceRequest {
        uint256 modelId;
        address requester;
        bytes inputData;
        bytes outputData;
        uint256 confidence;
        uint256 timestamp;
        bool completed;
        uint256 pricePaid;
    }
    
    // Storage
    mapping(uint256 => AIModel) public models;
    mapping(uint256 => InferenceRequest) public inferenceRequests;
    
    uint256 public nextModelId;
    uint256 public nextRequestId;
    
    uint256 public constant PLATFORM_FEE_PERCENT = 5; // 5%
    uint256 public totalPlatformFees;
    
    // Authorized oracles that can submit inferences
    mapping(address => bool) public authorizedOracles;
    
    constructor() ERC721("AI Trading Model", "AITM") Ownable(msg.sender) {
        nextModelId = 1;
        nextRequestId = 1;
    }
    
    /**
     * @notice Register a new AI trading model as NFT
     */
    function registerModel(
        string calldata modelURI,
        uint256 inferencePrice
    ) external override returns (uint256 modelId) {
        require(bytes(modelURI).length > 0, "Empty URI");
        require(inferencePrice > 0, "Invalid price");
        
        modelId = nextModelId++;
        
        models[modelId] = AIModel({
            owner: msg.sender,
            modelURI: modelURI,
            inferencePrice: inferencePrice,
            totalInferences: 0,
            accuracy: 5000, // Start at 50%
            totalRevenue: 0,
            isActive: true,
            createdAt: block.timestamp,
            correctPredictions: 0,
            totalPredictions: 0,
            totalPnL: 0
        });
        
        // Mint NFT to owner
        _safeMint(msg.sender, modelId);
        
        emit ModelRegistered(modelId, msg.sender, modelURI, inferencePrice);
    }
    
    /**
     * @notice Request a trading prediction from an AI model
     * @param modelId The AI model to query
     * @param inputData Encoded market data (price, volume, indicators, etc)
     */
    function requestInference(
        uint256 modelId,
        bytes calldata inputData
    ) external payable override nonReentrant returns (uint256 requestId) {
        AIModel storage model = models[modelId];
        require(model.isActive, "Model not active");
        require(msg.value >= model.inferencePrice, "Insufficient payment");
        
        requestId = nextRequestId++;
        
        inferenceRequests[requestId] = InferenceRequest({
            modelId: modelId,
            requester: msg.sender,
            inputData: inputData,
            outputData: "",
            confidence: 0,
            timestamp: block.timestamp,
            completed: false,
            pricePaid: msg.value
        });
        
        emit InferenceRequested(requestId, modelId, msg.sender, inputData);
    }
    
    /**
     * @notice Submit inference result (oracle or model owner)
     * @param requestId The request to fulfill
     * @param outputData Prediction: ["BUY"/"SELL"/"HOLD", targetPrice, stopLoss]
     * @param confidence Confidence score (0-10000)
     */
    function submitInference(
        uint256 requestId,
        bytes calldata outputData,
        uint256 confidence
    ) external override {
        InferenceRequest storage request = inferenceRequests[requestId];
        AIModel storage model = models[request.modelId];
        
        require(!request.completed, "Already completed");
        require(
            msg.sender == model.owner || authorizedOracles[msg.sender],
            "Not authorized"
        );
        require(confidence <= 10000, "Invalid confidence");
        
        // Update request
        request.outputData = outputData;
        request.confidence = confidence;
        request.completed = true;
        
        // Update model stats
        model.totalInferences++;
        
        // Distribute payment
        uint256 platformFee = (request.pricePaid * PLATFORM_FEE_PERCENT) / 100;
        uint256 modelOwnerFee = request.pricePaid - platformFee;
        
        model.totalRevenue += modelOwnerFee;
        totalPlatformFees += platformFee;
        
        // Transfer to model owner
        payable(model.owner).transfer(modelOwnerFee);
        
        emit InferenceCompleted(requestId, request.modelId, outputData, confidence);
    }
    
    /**
     * @notice Update model performance based on prediction outcome
     * @param requestId The inference request
     * @param wasCorrect Whether the prediction was correct
     * @param actualPnL The actual P&L from following the signal
     */
    function updateModelPerformance(
        uint256 requestId,
        bool wasCorrect,
        int256 actualPnL
    ) external {
        InferenceRequest storage request = inferenceRequests[requestId];
        require(request.completed, "Not completed");
        require(
            msg.sender == request.requester || msg.sender == owner(),
            "Not authorized"
        );
        
        AIModel storage model = models[request.modelId];
        
        model.totalPredictions++;
        if (wasCorrect) {
            model.correctPredictions++;
        }
        model.totalPnL += actualPnL;
        
        // Recalculate accuracy
        model.accuracy = (model.correctPredictions * 10000) / model.totalPredictions;
        
        emit PerformanceUpdated(
            request.modelId,
            model.accuracy,
            model.totalInferences
        );
    }
    
    /**
     * @notice Get model information
     */
    function getModelInfo(uint256 modelId) 
        external 
        view 
        override 
        returns (
            address owner_,
            string memory modelURI,
            uint256 inferencePrice,
            uint256 totalInferences,
            uint256 accuracy
        ) 
    {
        AIModel storage model = models[modelId];
        return (
            model.owner,
            model.modelURI,
            model.inferencePrice,
            model.totalInferences,
            model.accuracy
        );
    }
    
    /**
     * @notice Get detailed model metrics
     */
    function getModelMetrics(uint256 modelId) 
        external 
        view 
        returns (
            uint256 correctPredictions,
            uint256 totalPredictions,
            int256 totalPnL,
            uint256 totalRevenue,
            uint256 accuracy
        )
    {
        AIModel storage model = models[modelId];
        return (
            model.correctPredictions,
            model.totalPredictions,
            model.totalPnL,
            model.totalRevenue,
            model.accuracy
        );
    }
    
    /**
     * @notice Get inference result
     */
    function getInferenceResult(uint256 requestId) 
        external 
        view 
        override 
        returns (
            uint256 modelId,
            address requester,
            bytes memory outputData,
            uint256 confidence,
            uint256 timestamp
        )
    {
        InferenceRequest storage request = inferenceRequests[requestId];
        return (
            request.modelId,
            request.requester,
            request.outputData,
            request.confidence,
            request.timestamp
        );
    }
    
    /**
     * @notice Get top performing models
     */
    function getTopModels(uint256 count) 
        external 
        view 
        returns (uint256[] memory modelIds, uint256[] memory accuracies)
    {
        uint256 totalModels = nextModelId - 1;
        uint256 resultCount = count > totalModels ? totalModels : count;
        
        modelIds = new uint256[](resultCount);
        accuracies = new uint256[](resultCount);
        
        // Simple sorting (in production, do off-chain)
        for (uint256 i = 0; i < resultCount; i++) {
            uint256 maxAccuracy = 0;
            uint256 maxId = 0;
            
            for (uint256 j = 1; j < nextModelId; j++) {
                if (!models[j].isActive) continue;
                if (models[j].totalPredictions < 10) continue; // Min 10 predictions
                
                if (models[j].accuracy > maxAccuracy) {
                    bool alreadySelected = false;
                    for (uint256 k = 0; k < i; k++) {
                        if (modelIds[k] == j) {
                            alreadySelected = true;
                            break;
                        }
                    }
                    if (!alreadySelected) {
                        maxAccuracy = models[j].accuracy;
                        maxId = j;
                    }
                }
            }
            
            if (maxId > 0) {
                modelIds[i] = maxId;
                accuracies[i] = maxAccuracy;
            }
        }
        
        return (modelIds, accuracies);
    }
    
    /**
     * @notice Update model pricing
     */
    function updateModelPrice(uint256 modelId, uint256 newPrice) external {
        require(ownerOf(modelId) == msg.sender, "Not model owner");
        require(newPrice > 0, "Invalid price");
        
        models[modelId].inferencePrice = newPrice;
    }
    
    /**
     * @notice Deactivate model
     */
    function deactivateModel(uint256 modelId) external {
        require(ownerOf(modelId) == msg.sender, "Not model owner");
        models[modelId].isActive = false;
    }
    
    /**
     * @notice Authorize oracle for inference submission
     */
    function authorizeOracle(address oracle, bool authorized) external onlyOwner {
        authorizedOracles[oracle] = authorized;
    }
    
    /**
     * @notice Withdraw platform fees
     */
    function withdrawPlatformFees() external onlyOwner nonReentrant {
        uint256 amount = totalPlatformFees;
        require(amount > 0, "No fees");
        
        totalPlatformFees = 0;
        payable(owner()).transfer(amount);
    }
    
    /**
     * @notice Override transfers to update ownership
     */
    function _update(address to, uint256 tokenId, address auth)
        internal
        virtual
        override
        returns (address)
    {
        address from = super._update(to, tokenId, auth);
        
        // Update model owner
        if (to != address(0)) {
            models[tokenId].owner = to;
        }
        
        return from;
    }
}