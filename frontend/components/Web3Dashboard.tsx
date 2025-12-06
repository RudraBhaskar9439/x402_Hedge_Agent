"use client";
import React, { useState, useEffect } from 'react';
import { Wallet, Brain, Zap, DollarSign, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';

// Add type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

type Model = {
  id: number;
  name: string;
  accuracy: number;
  totalInferences: number;
  revenue: number;
};

const Web3Dashboard = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [chainId, setChainId] = useState<number | null>(null);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Contract addresses (from .env or deployment)
  const REGISTRY_ADDRESS = '0x...'; // Replace with actual
  const BASE_SEPOLIA_CHAIN_ID = 84532;

  // Connect wallet
  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('Please install MetaMask to use this app');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      // Get chain ID
      const chainId = await window.ethereum.request({
        method: 'eth_chainId'
      });

      setAddress(accounts[0]);
      setChainId(parseInt(chainId, 16));
      setConnected(true);

      // Check if on Base Sepolia
      if (parseInt(chainId, 16) !== BASE_SEPOLIA_CHAIN_ID) {
        await switchToBaseSepolia();
      }

      // Load models
      await loadModels();

    } catch (err) {
      setError(err.message);
      console.error('Connection error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Switch to Base Sepolia
  const switchToBaseSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x14a34' }], // 84532 in hex
      });
    } catch (switchError) {
      // Chain not added, add it
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x14a34',
            chainName: 'Base Sepolia',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18
            },
            rpcUrls: ['https://sepolia.base.org'],
            blockExplorerUrls: ['https://sepolia.basescan.org']
          }]
        });
      }
    }
  };

  // Load models from contract
  const loadModels = async () => {
    try {
      // This is where you'd integrate with ethers.js
      // For demo, using mock data
      const mockModels = [
        {
          id: 1,
          name: 'Renaissance Momentum AI',
          accuracy: 78.5,
          totalInferences: 1247,
          revenue: 2.45
        },
        {
          id: 2,
          name: 'Citadel Mean Reversion',
          accuracy: 82.3,
          totalInferences: 892,
          revenue: 1.89
        },
        {
          id: 3,
          name: 'Two Sigma ML',
          accuracy: 85.1,
          totalInferences: 2103,
          revenue: 4.21
        }
      ];

      setModels(mockModels);
    } catch (err) {
      console.error('Error loading models:', err);
    }
  };

  // Request inference from a model
  const requestInference = async (modelId) => {
    if (!connected) {
      setError('Please connect wallet first');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // In production, this would interact with the contract
      console.log(`Requesting inference from model ${modelId}`);
      
      // Mock transaction
      alert(`Inference request sent to Model #${modelId}\nCheck your wallet for confirmation`);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Format address
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with Connect Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              ERC-8004 AI Hub
            </h1>
            <p className="text-slate-400">Decentralized AI Trading Models</p>
          </div>

          <button
            onClick={connectWallet}
            disabled={loading}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
              connected
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-purple-600 hover:bg-purple-700'
            } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
          >
            <Wallet size={20} />
            {loading ? 'Connecting...' : connected ? formatAddress(address) : 'Connect Wallet'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-xl flex items-center gap-3">
            <AlertCircle className="text-red-400" />
            <span className="text-red-200">{error}</span>
          </div>
        )}

        {/* Connection Status */}
        {connected && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-xl flex items-center gap-3">
            <CheckCircle className="text-green-400" />
            <div>
              <span className="text-green-200 font-semibold">Connected to Base Sepolia</span>
              <div className="text-xs text-green-300 mt-1">
                Account: {address}
              </div>
            </div>
          </div>
        )}

        {/* Models Grid */}
        {connected ? (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Brain className="text-purple-400" />
              Available AI Models (ERC-8004)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  onRequest={() => requestInference(model.id)}
                />
              ))}
            </div>

            {/* How to Use */}
            <div className="mt-12 bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold mb-6">How to Use</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Step
                  number="1"
                  title="Connect Wallet"
                  description="Connect your MetaMask wallet to Base Sepolia network"
                />
                <Step
                  number="2"
                  title="Choose Model"
                  description="Browse AI models and check their performance metrics"
                />
                <Step
                  number="3"
                  title="Request Inference"
                  description="Pay a small fee to get trading predictions from AI models"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <Brain className="w-20 h-20 mx-auto mb-6 text-purple-400" />
            <h2 className="text-3xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Connect your wallet to access ERC-8004 AI trading models and start receiving predictions
            </p>
            <button
              onClick={connectWallet}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold transition-all duration-300 shadow-lg"
            >
              Connect Wallet to Get Started
            </button>
          </div>
        )}

        {/* Contract Links */}
        {connected && (
          <div className="mt-8 text-center text-sm text-slate-500">
            <a
              href={`https://sepolia.basescan.org/address/${REGISTRY_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition flex items-center justify-center gap-2"
            >
              View Registry Contract on BaseScan
              <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

type StepProps = {
  number: string;
  title: string;
  description: string;
};

const Step: React.FC<StepProps> = ({ number, title, description }) => (
  <div className="text-center">
    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
      {number}
    </div>
    <h4 className="font-bold mb-2">{title}</h4>
    <p className="text-sm text-slate-400">{description}</p>
  </div>
);

type ModelCardProps = {
  model: Model;
  onRequest: () => void;
};

const ModelCard: React.FC<ModelCardProps> = ({ model, onRequest }) => (
  <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700 hover:border-purple-500 transition-all duration-300 shadow-lg">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-xl font-bold mb-1">{model.name}</h3>
        <div className="text-xs text-slate-500">Model #{model.id}</div>
      </div>
      <div className="text-4xl">🤖</div>
    </div>

    <div className="space-y-3 mb-6">
      <div className="flex justify-between items-center">
        <span className="text-slate-400 text-sm">Accuracy</span>
        <span className="text-green-400 font-bold">{model.accuracy.toFixed(1)}%</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-slate-400 text-sm">Inferences</span>
        <span className="text-white font-semibold">{model.totalInferences}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-slate-400 text-sm">Total Revenue</span>
        <span className="text-yellow-400 font-semibold">{model.revenue.toFixed(2)} ETH</span>
      </div>
    </div>

    <div className="mt-3 text-center text-xs text-slate-500">
      0.0001 ETH per inference
    </div>
  </div>
);


export default Web3Dashboard;