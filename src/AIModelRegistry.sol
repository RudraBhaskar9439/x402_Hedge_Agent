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
        uint256 streamingRate;     // x402: fee per second (in wei)
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

    struct InvestmentInfo {
        uint256 amount;
        uint256 lastInvestTimestamp;
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

    // User investments: modelId => user => InvestmentInfo
    mapping(uint256 => mapping(address => InvestmentInfo)) public investments;

    event Invested(uint256 indexed modelId, address indexed user, uint256 amount);
    event Withdrawn(uint256 indexed modelId, address indexed user, uint256 amount);
    event StreamingFeePaid(uint256 indexed modelId, address indexed user, uint256 fee, uint256 timeElapsed);
    
    constructor() ERC721("AI Trading Model", "AITM") Ownable(msg.sender) {
        nextModelId = 1;
        nextRequestId = 1;
    }
    

    function registerModel(
        string calldata modelURI,
        uint256 inferencePrice,
        uint256 streamingRate
    ) public returns (uint256 modelId) {
        require(bytes(modelURI).length > 0, "Empty URI");
        require(inferencePrice > 0, "Invalid price");
        require(streamingRate > 0, "Invalid streaming rate");
        
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
            totalPnL: 0,
            streamingRate: streamingRate
        });
        
        // Mint NFT to owner
        _safeMint(msg.sender, modelId);
        
        emit ModelRegistered(modelId, msg.sender, modelURI, inferencePrice);
    }

    // Compatibility: legacy 2-arg registerModel for IERC8004
    function registerModel(
        string calldata modelURI,
        uint256 inferencePrice
    ) external override returns (uint256 modelId) {
        // Use a default streamingRate for legacy interface
        return registerModel(modelURI, inferencePrice, 1e15);
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
        (bool sent, ) = payable(model.owner).call{value: modelOwnerFee}("");
        require(sent, "Failed to send to model owner");
        
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
     * @notice Reactivate model
     */
    function reactivateModel(uint256 modelId) external {
        require(ownerOf(modelId) == msg.sender, "Not model owner");
        models[modelId].isActive = true;
    }

    /**
     * @notice Update streaming rate for a model
     */
    function updateStreamingRate(uint256 modelId, uint256 newStreamingRate) external {
        require(ownerOf(modelId) == msg.sender, "Not model owner");
        require(newStreamingRate > 0, "Invalid streaming rate");
        models[modelId].streamingRate = newStreamingRate;
    }

    /**
     * @notice Get user's investment information for a model
     */
    function getInvestmentInfo(uint256 modelId, address user)
        external
        view
        returns (
            uint256 amount,
            uint256 lastInvestTimestamp,
            uint256 currentStreamingFee
        )
    {
        InvestmentInfo storage inv = investments[modelId][user];
        AIModel storage model = models[modelId];
        
        uint256 value = 0;
        if (inv.amount > 0 && totalShares[modelId] > 0) {
            // Calculate current asset value of shares
            value = (inv.amount * totalManagedAssets[modelId]) / totalShares[modelId];
        }
        
        // Return 0 fee for now until streaming fee is properly integrated with vaults
        return (value, inv.lastInvestTimestamp, 0);
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
        (bool sent, ) = payable(owner()).call{value: amount}("");
        require(sent, "Withdraw failed");
    }
    

    // Vault Storage
    mapping(uint256 => uint256) public totalShares;
    mapping(uint256 => uint256) public totalManagedAssets; // Assets tracked by the vault

    // Safe External Call Event
    event StrategyExecuted(uint256 indexed modelId, address target, uint256 value, bytes data);
    event YieldDistributed(uint256 indexed modelId, uint256 amount);

    /**
     * @notice Invest in an AI model/strategy (Real Yield Vault)
     * @dev Mints shares based on current Net Asset Value (NAV)
     */
    function invest(uint256 modelId) external payable nonReentrant {
        AIModel storage model = models[modelId];
        require(model.isActive, "Model not active");
        require(msg.value > 0, "No ETH sent");
        
        uint256 assets = msg.value;
        uint256 shares;
        
        // Calculate shares to mint
        // If totalShares is 0, mint 1:1
        if (totalShares[modelId] == 0) {
            shares = assets;
        } else {
            // shares = (assets * totalShares) / totalManagedAssets
            // Use current balance before this deposit for calculation
            uint256 priorAssets = totalManagedAssets[modelId];
            shares = (assets * totalShares[modelId]) / priorAssets;
        }
        
        require(shares > 0, "Zero shares minted");
        
        InvestmentInfo storage inv = investments[modelId][msg.sender];
        if (inv.amount == 0) { // Reusing amount field for shares to avoid struct change if possible, or mapping semantics change
            inv.lastInvestTimestamp = block.timestamp;
        }
        
        // Update state
        inv.amount += shares; // Using 'amount' to store 'shares'
        totalShares[modelId] += shares;
        totalManagedAssets[modelId] += assets;
        
        emit Invested(modelId, msg.sender, assets);
    }

    /**
     * @notice Withdraw investment + yield
     * @param modelId The model identifier
     * @param sharesToBurn Amount of shares to withdraw (enter 0 for max)
     */
    function withdraw(uint256 modelId, uint256 sharesToBurn) external nonReentrant {
        InvestmentInfo storage inv = investments[modelId][msg.sender];
        uint256 userShares = inv.amount; // 'amount' stores shares
        
        if (sharesToBurn == 0 || sharesToBurn > userShares) {
            sharesToBurn = userShares;
        }
        
        require(sharesToBurn > 0, "No shares to withdraw");
        
        // Calculate asset value: (shares * totalAssets) / totalShares
        uint256 assets = (sharesToBurn * totalManagedAssets[modelId]) / totalShares[modelId];
        require(assets > 0, "Zero assets");
        
        // Standard x402 Streaming Fee Logic (Optional: Apply to profit only?)
        // For simplicity, we keep original logic but apply to the *Asset Value*
        AIModel storage model = models[modelId];
        uint256 timeElapsed = block.timestamp - inv.lastInvestTimestamp;
        // Fee rate is "wei per second" in original, which implies fixed fee.
        // For a Vault, usually fee is % of AUM.
        // Let's assume streamingRate is scaled (e.g. 1e18 = 100%) or keep it simple fixed fee per share?
        // Let's drop the complex streaming fee for the Vault Launch to ensure "Real Yield" works first.
        
        // Update State
        inv.amount -= sharesToBurn;
        totalShares[modelId] -= sharesToBurn;
        totalManagedAssets[modelId] -= assets;
        
        if (inv.amount == 0) {
            inv.lastInvestTimestamp = 0;
        }
        
        // Transfer assets to user
        (bool sent, ) = payable(msg.sender).call{value: assets}("");
        require(sent, "Withdraw failed");
        
        emit Withdrawn(modelId, msg.sender, assets);
    }
    
    /**
     * @notice Execute a DeFi interaction to generate yield (The "Algorithm")
     * @dev Only model owner can call. Funds must be returned to account for "Yield".
     */
    function executeStrategy(
        uint256 modelId,
        address target,
        uint256 value,
        bytes calldata data
    ) external payable nonReentrant {
        require(models[modelId].owner == msg.sender, "Not model owner");
        
        // Safety check: Don't allow calling this contract or the registry
        require(target != address(this), "Cannot call self");
        
        // Execute call
        (bool success, ) = target.call{value: value}(data);
        require(success, "Strategy failed");
        
        // Update Managed Assets based on actual balance?
        // If we send funds OUT, we depend on them coming BACK or being tracked.
        // For simulation/hackathon: We assume funds sent out are "Deployed" and still part of NAV.
        // Real logic: Use an adapter to check balance of target protocol.
        // Simplified Logic: We trust the owner doesn't rug-pull (It's a "Hedge Agent").
        // But to track NAV, if funds leave, totalManagedAssets shouldn't decrease if they are just "invested".
        // If funds return with profit, totalManagedAssets should Increase.
        
        emit StrategyExecuted(modelId, target, value, data);
    }
    
    /**
     * @notice Inject yield/profit into the pool (e.g. after a profitable trade)
     */
    function depositYield(uint256 modelId) external payable {
        require(msg.value > 0, "No yield sent");
        require(totalShares[modelId] > 0, "No shareholders");
        
        totalManagedAssets[modelId] += msg.value;
        emit YieldDistributed(modelId, msg.value);
    }
    
    // Allow contract to receive ETH (from swaps/yield)
    receive() external payable {}

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