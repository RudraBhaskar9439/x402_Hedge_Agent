// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./AIModelRegistry.sol";

/**
 * @title AISignalMarketplace
 * @dev Marketplace for AI trading signals with subscription model
 * 
 * Features:
 * - Subscribe to AI models
 * - Receive real-time signals
 * - Pay-per-signal or subscription
 * - Performance-based pricing
 */
contract AISignalMarketplace is Ownable, ReentrancyGuard {
    
    struct Subscription {
        uint256 modelId;
        address subscriber;
        uint256 startTime;
        uint256 endTime;
        uint256 signalsReceived;
        bool isActive;
    }
    
    struct Signal {
        uint256 modelId;
        uint256 timestamp;
        string asset;           // e.g., "ETH", "BTC"
        string action;          // "BUY", "SELL", "HOLD"
        uint256 targetPrice;    // Target price
        uint256 stopLoss;       // Stop loss price
        uint256 confidence;     // 0-10000
        bytes extraData;        // Additional signal data
    }
    
    AIModelRegistry public modelRegistry;
    IERC20 public paymentToken; // USDC or stablecoin
    
    // Subscription types
    mapping(uint256 => mapping(address => Subscription)) public subscriptions;
    mapping(uint256 => Signal[]) public modelSignals;
    
    // Pricing models
    mapping(uint256 => uint256) public subscriptionPrice; // Monthly price
    mapping(uint256 => uint256) public perSignalPrice;
    
    // Stats
    mapping(uint256 => uint256) public totalSubscribers;
    mapping(uint256 => uint256) public totalSignals;
    
    uint256 public constant PLATFORM_FEE_PERCENT = 5;
    uint256 public totalPlatformFees;
    
    event SignalPublished(
        uint256 indexed modelId,
        string asset,
        string action,
        uint256 confidence,
        uint256 timestamp
    );
    
    event Subscribed(
        uint256 indexed modelId,
        address indexed subscriber,
        uint256 duration
    );
    
    event SignalPurchased(
        uint256 indexed modelId,
        address indexed buyer,
        uint256 price
    );
    
    constructor(
        address _modelRegistry,
        address _paymentToken
    ) Ownable(msg.sender) {
        modelRegistry = AIModelRegistry(_modelRegistry);
        paymentToken = IERC20(_paymentToken);
    }
    
    /**
     * @notice Set pricing for a model
     */
    function setModelPricing(
        uint256 modelId,
        uint256 monthlyPrice,
        uint256 signalPrice
    ) external {
        require(modelRegistry.ownerOf(modelId) == msg.sender, "Not model owner");
        
        subscriptionPrice[modelId] = monthlyPrice;
        perSignalPrice[modelId] = signalPrice;
    }
    
    /**
     * @notice Subscribe to a model's signals (monthly)
     */
    function subscribe(uint256 modelId, uint256 months) external nonReentrant {
        require(months > 0 && months <= 12, "Invalid duration");
        require(subscriptionPrice[modelId] > 0, "Model not available");
        
        uint256 totalPrice = subscriptionPrice[modelId] * months;
        uint256 platformFee = (totalPrice * PLATFORM_FEE_PERCENT) / 100;
        uint256 modelOwnerFee = totalPrice - platformFee;
        
        // Transfer payment
        require(
            paymentToken.transferFrom(msg.sender, address(this), totalPrice),
            "Payment failed"
        );
        
        // Create/update subscription
        Subscription storage sub = subscriptions[modelId][msg.sender];
        
        bool isNewSubscription = !sub.isActive || sub.endTime <= block.timestamp;
        
        uint256 startTime = block.timestamp;
        if (sub.isActive && sub.endTime > block.timestamp) {
            startTime = sub.endTime; // Extend existing subscription
        }
        
        sub.modelId = modelId;
        sub.subscriber = msg.sender;
        sub.startTime = isNewSubscription ? block.timestamp : sub.startTime; // Keep original start time for extensions
        sub.endTime = startTime + (months * 30 days);
        sub.isActive = true;
        
        // Only increment if it's a new subscription
        if (isNewSubscription) {
            totalSubscribers[modelId]++;
        }
        
        // Pay model owner
        address modelOwner = modelRegistry.ownerOf(modelId);
        require(paymentToken.transfer(modelOwner, modelOwnerFee), "Transfer failed");
        
        totalPlatformFees += platformFee;
        
        emit Subscribed(modelId, msg.sender, months);
    }
    
    /**
     * @notice Purchase a single signal (pay-per-signal)
     */
    function purchaseSignal(uint256 modelId, uint256 signalIndex) 
        external 
        nonReentrant 
    {
        require(signalIndex < modelSignals[modelId].length, "Invalid signal");
        require(perSignalPrice[modelId] > 0, "Not available");
        
        uint256 price = perSignalPrice[modelId];
        uint256 platformFee = (price * PLATFORM_FEE_PERCENT) / 100;
        uint256 modelOwnerFee = price - platformFee;
        
        // Transfer payment
        require(
            paymentToken.transferFrom(msg.sender, address(this), price),
            "Payment failed"
        );
        
        // Pay model owner
        address modelOwner = modelRegistry.ownerOf(modelId);
        require(paymentToken.transfer(modelOwner, modelOwnerFee), "Transfer failed");
        
        totalPlatformFees += platformFee;
        
        emit SignalPurchased(modelId, msg.sender, price);
    }
    
    /**
     * @notice Publish a new trading signal
     */
    function publishSignal(
        uint256 modelId,
        string calldata asset,
        string calldata action,
        uint256 targetPrice,
        uint256 stopLoss,
        uint256 confidence,
        bytes calldata extraData
    ) external {
        require(modelRegistry.ownerOf(modelId) == msg.sender, "Not model owner");
        require(confidence <= 10000, "Invalid confidence");
        (,,,uint256 totalInferences,uint256 accuracy) = modelRegistry.getModelInfo(modelId);
        require(totalInferences > 0, "Model not initialized");
        
        Signal memory signal = Signal({
            modelId: modelId,
            timestamp: block.timestamp,
            asset: asset,
            action: action,
            targetPrice: targetPrice,
            stopLoss: stopLoss,
            confidence: confidence,
            extraData: extraData
        });
        
        modelSignals[modelId].push(signal);
        totalSignals[modelId]++;
        
        emit SignalPublished(modelId, asset, action, confidence, block.timestamp);
    }
    
    /**
     * @notice Check if address has active subscription
     */
    function hasActiveSubscription(uint256 modelId, address user)
        external
        view
        returns (bool)
    {
        Subscription storage sub = subscriptions[modelId][user];
        return sub.isActive && block.timestamp <= sub.endTime;
    }
    
    /**
     * @notice Get latest signals from a model
     */
    function getLatestSignals(uint256 modelId, uint256 count)
        external
        view
        returns (Signal[] memory)
    {
        Signal[] storage allSignals = modelSignals[modelId];
        uint256 total = allSignals.length;
        uint256 resultCount = count > total ? total : count;
        
        Signal[] memory result = new Signal[](resultCount);
        
        for (uint256 i = 0; i < resultCount; i++) {
            result[i] = allSignals[total - resultCount + i];
        }
        
        return result;
    }
    
    /**
     * @notice Get signal by index
     */
    function getSignal(uint256 modelId, uint256 index)
        external
        view
        returns (Signal memory)
    {
        require(index < modelSignals[modelId].length, "Invalid index");
        return modelSignals[modelId][index];
    }
    
    /**
     * @notice Get subscription info
     */
    function getSubscription(uint256 modelId, address user)
        external
        view
        returns (
            uint256 startTime,
            uint256 endTime,
            uint256 signalsReceived,
            bool isActive
        )
    {
        Subscription storage sub = subscriptions[modelId][user];
        return (
            sub.startTime,
            sub.endTime,
            sub.signalsReceived,
            sub.isActive
        );
    }
    
    /**
     * @notice Get model stats
     */
    function getModelStats(uint256 modelId)
        external
        view
        returns (
            uint256 subscribers,
            uint256 signals,
            uint256 monthlyPrice,
            uint256 signalPrice
        )
    {
        return (
            totalSubscribers[modelId],
            totalSignals[modelId],
            subscriptionPrice[modelId],
            perSignalPrice[modelId]
        );
    }
    
    /**
     * @notice Cancel subscription
     */
    function cancelSubscription(uint256 modelId) external {
        Subscription storage sub = subscriptions[modelId][msg.sender];
        require(sub.isActive, "No active subscription");
        
        sub.isActive = false;
        // Only decrement if count is greater than 0 to prevent underflow
        if (totalSubscribers[modelId] > 0) {
            totalSubscribers[modelId]--;
        }
    }
    
    /**
     * @notice Withdraw platform fees
     */
    function withdrawPlatformFees() external onlyOwner nonReentrant {
        uint256 amount = totalPlatformFees;
        require(amount > 0, "No fees");
        
        totalPlatformFees = 0;
        require(paymentToken.transfer(owner(), amount), "Transfer failed");
    }
    
    /**
     * @notice Update payment token
     */
    function updatePaymentToken(address newToken) external onlyOwner {
        paymentToken = IERC20(newToken);
    }
}