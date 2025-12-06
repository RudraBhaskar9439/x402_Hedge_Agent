// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IERC8004
 * @dev Interface for Decentralized AI Inference System
 * ERC 8004 Standard: On-Chain AI Model registration and interference
 */

 interface IERC8004 {

    // Emitted when a new AI model is registered
    event ModelRegistered(
        uint256 indexed modelId,
        address indexed owner,
        string modelURI,
        uint256 inferencePrice
    );

    // Emitted when an inference is requested
    event InferenceRequested(
        uint256 indexed requestId,
        uint256 indexed modelId,
        address indexed requester,
        bytes inputData
    );

    // Emitted when an interference is completed
    event InferenceCompleted(
        uint256 indexed requestId,
        uint256 indexed modelId,
        bytes outputData,
        uint256 confidence
    );

    // Emitted when model performance is updated
    event PerformanceUpdated(
        uint256 indexed modelId,
        uint256 accuracy,
        uint256 totalInferences
    );

    /**
     * @notice Register a new AI Model
     * @param modelURI URI pointing to model metadata (IPFS/Arweave)
     * @param inferencePrice Price per inference in wei
     * @return modelId The unique identifier foe the registered model
     */

     function registerModel(
        string calldata modelURI,
        uint256 inferencePrice
     ) external returns (uint256 modelId);

     /**
     * @notice Request an inference from a model
     * @param modelId The model to use for inference
     * @param inputData Encoded input data for the model
     * @return requestId The unique identifier for this inference request
     */
    function requestInference(
        uint256 modelId,
        bytes calldata inputData
    ) external payable returns (uint256 requestId);
    
    /**
     * @notice Submit inference result (called by model owner/oracle)
     * @param requestId The inference request ID
     * @param outputData The inference result
     * @param confidence Confidence score (0-10000 for 2 decimals)
     */
    function submitInference(
        uint256 requestId,
        bytes calldata outputData,
        uint256 confidence
    ) external;
    
    /**
     * @notice Get model information
     * @param modelId The model identifier
     * @return owner Model owner address
     * @return modelURI URI to model metadata
     * @return inferencePrice Price per inference
     * @return totalInferences Total number of inferences
     * @return accuracy Model accuracy score (0-10000)
     */
    function getModelInfo(uint256 modelId) external view returns (
        address owner,
        string memory modelURI,
        uint256 inferencePrice,
        uint256 totalInferences,
        uint256 accuracy
    );
    
    /**
     * @notice Get inference result
     * @param requestId The inference request ID
     * @return modelId The model used
     * @return requester Who requested the inference
     * @return outputData The inference result
     * @return confidence Confidence score
     * @return timestamp When completed
     */
    function getInferenceResult(uint256 requestId) external view returns (
        uint256 modelId,
        address requester,
        bytes memory outputData,
        uint256 confidence,
        uint256 timestamp
    );

 }