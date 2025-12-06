import React, { useState, useEffect } from 'react';
import { TrendingUp, Trophy, Activity, DollarSign, Cpu, Zap, Users, Brain, Target, Award } from 'lucide-react';

const ERC8004Dashboard = () => {
  const [models, setModels] = useState([
    { 
      id: 1, 
      name: 'Renaissance Momentum AI', 
      nftImage: '🤖',
      owner: '0x1234...5678',
      strategy: 'Momentum',
      accuracy: 78.5,
      totalInferences: 1247,
      revenue: 2.45,
      subscribers: 23,
      signalPrice: 0.0001,
      confidence: 85,
      recentSignal: { asset: 'ETH', action: 'BUY', target: 2150, confidence: 85 }
    },
    { 
      id: 2, 
      name: 'Citadel Mean Reversion', 
      nftImage: '🧠',
      owner: '0xabcd...efgh',
      strategy: 'Mean Reversion',
      accuracy: 82.3,
      totalInferences: 892,
      revenue: 1.89,
      subscribers: 18,
      signalPrice: 0.0001,
      confidence: 78,
      recentSignal: { asset: 'BTC', action: 'SELL', target: 42000, confidence: 78 }
    },
    { 
      id: 3, 
      name: 'Two Sigma ML', 
      nftImage: '⚡',
      owner: '0x9876...4321',
      strategy: 'ML-Based',
      accuracy: 85.1,
      totalInferences: 2103,
      revenue: 4.21,
      subscribers: 35,
      signalPrice: 0.0002,
      confidence: 92,
      recentSignal: { asset: 'ETH', action: 'BUY', target: 2200, confidence: 92 }
    },
    { 
      id: 4, 
      name: 'Bridgewater Risk Parity', 
      nftImage: '📊',
      owner: '0x5555...6666',
      strategy: 'Risk Parity',
      accuracy: 73.2,
      totalInferences: 456,
      revenue: 0.91,
      subscribers: 12,
      signalPrice: 0.00015,
      confidence: 71,
      recentSignal: { asset: 'SOL', action: 'HOLD', target: 95, confidence: 71 }
    }
  ]);

  const [competition, setCompetition] = useState({
    name: 'ERC-8004 Alpha Battle',
    status: 'Active',
    timeLeft: '1h 23m',
    prizePool: '5.45 ETH',
    participants: 12,
    leader: 'Two Sigma ML'
  });

  const [stats, setStats] = useState({
    totalModels: 47,
    totalInferences: 15420,
    totalVolume: '124.5 ETH',
    avgAccuracy: 79.2
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setModels(prev => prev.map(model => ({
        ...model,
        accuracy: Math.min(100, Math.max(60, model.accuracy + (Math.random() - 0.5) * 2)),
        totalInferences: model.totalInferences + (Math.random() > 0.7 ? 1 : 0),
        revenue: model.revenue + (Math.random() > 0.8 ? 0.0001 : 0),
        confidence: Math.min(100, Math.max(50, model.confidence + (Math.random() - 0.5) * 5))
      })).sort((a, b) => b.accuracy - a.accuracy));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <Brain className="w-12 h-12 text-purple-400" />
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                ERC-8004 AI Hedge Fund
              </h1>
              <p className="text-slate-400 text-lg">On-Chain AI Models • Verifiable Inference • NFT Trading</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={<Brain />}
            title="Active AI Models"
            value={stats.totalModels}
            subtitle="NFTs minted"
            trend="+5 today"
          />
          <StatCard 
            icon={<Zap />}
            title="Total Inferences"
            value={stats.totalInferences.toLocaleString()}
            subtitle="On-chain predictions"
            trend="+234 today"
          />
          <StatCard 
            icon={<DollarSign />}
            title="Total Volume"
            value={stats.totalVolume}
            subtitle="Inference fees"
            trend="+12.3%"
          />
          <StatCard 
            icon={<Target />}
            title="Avg Accuracy"
            value={`${stats.avgAccuracy.toFixed(1)}%`}
            subtitle="Verified on-chain"
            trend="+2.1%"
          />
        </div>

        {/* Competition Banner */}
        <div className="bg-gradient-to-r from-purple-800 via-pink-800 to-purple-800 rounded-2xl p-6 mb-8 border border-purple-500 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="text-yellow-400 w-8 h-8" />
                <h2 className="text-3xl font-bold">{competition.name}</h2>
                <span className="px-3 py-1 bg-green-500 rounded-full text-sm font-bold">
                  {competition.status}
                </span>
              </div>
              <p className="text-purple-200 text-lg">
                Leading: <span className="font-bold text-white">{competition.leader}</span> • 
                Time: {competition.timeLeft} • 
                Participants: {competition.participants}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-yellow-400">{competition.prizePool}</div>
              <div className="text-purple-200">Prize Pool</div>
            </div>
          </div>
        </div>

        {/* AI Models Leaderboard */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-700 bg-slate-900/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-green-400 w-6 h-6" />
                <h2 className="text-2xl font-bold">AI Model Leaderboard (ERC-8004)</h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Live Updates
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">AI Model (NFT)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Strategy</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Accuracy</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Inferences</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Revenue</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Subscribers</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Latest Signal</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model, index) => (
                  <tr 
                    key={model.id}
                    className="border-t border-slate-700 hover:bg-slate-700/30 transition-all duration-300"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {index === 0 && <span className="text-3xl">🥇</span>}
                        {index === 1 && <span className="text-3xl">🥈</span>}
                        {index === 2 && <span className="text-3xl">🥉</span>}
                        {index > 2 && <span className="text-slate-400 font-semibold text-lg">#{index + 1}</span>}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{model.nftImage}</div>
                        <div>
                          <div className="font-bold text-lg">{model.name}</div>
                          <div className="text-xs text-slate-400">
                            NFT #{model.id} • {model.owner}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                        {model.strategy}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="text-lg font-bold text-green-400">
                          {model.accuracy.toFixed(1)}%
                        </div>
                        <div className="w-24 bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${model.accuracy}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-slate-300 font-semibold">
                        {model.totalInferences.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-500">on-chain</div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-yellow-400 font-bold text-lg">
                        {model.revenue.toFixed(3)} ETH
                      </div>
                      <div className="text-xs text-slate-400">
                        ${(model.revenue * 2000).toFixed(0)}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-slate-300 font-semibold">{model.subscribers}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            model.recentSignal.action === 'BUY' ? 'bg-green-500' :
                            model.recentSignal.action === 'SELL' ? 'bg-red-500' :
                            'bg-gray-500'
                          }`}>
                            {model.recentSignal.action}
                          </span>
                          <span className="font-semibold">{model.recentSignal.asset}</span>
                        </div>
                        <div className="text-xs text-slate-400">
                          Target: ${model.recentSignal.target} • 
                          {model.recentSignal.confidence}% conf
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Brain className="w-8 h-8" />}
            title="AI Models as NFTs"
            description="Each AI trading model is minted as an ERC-721 NFT. Own, trade, and earn from high-performing models."
            color="purple"
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="On-Chain Inference"
            description="Every prediction is recorded on Base L2. Verifiable performance, immutable track record."
            color="blue"
          />
          <FeatureCard
            icon={<DollarSign className="w-8 h-8" />}
            title="Direct Revenue"
            description="Models earn fees directly from inference requests. No middleman, no platform cut."
            color="green"
          />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-2">
            <Cpu className="w-4 h-4" />
            <span>Powered by ERC-8004 Standard</span>
          </div>
          <div className="text-slate-500 text-xs">
            Built on Base L2 • All inference verifiable on-chain
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-600">
            <a href="#" className="hover:text-purple-400 transition">View on BaseScan</a>
            <span>•</span>
            <a href="#" className="hover:text-purple-400 transition">Documentation</a>
            <span>•</span>
            <a href="#" className="hover:text-purple-400 transition">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, subtitle, trend }) => (
  <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition-all duration-300 shadow-lg">
    <div className="flex items-center gap-3 mb-3">
      <div className="text-purple-400">{icon}</div>
      <div className="text-slate-400 text-sm font-medium">{title}</div>
    </div>
    <div className="text-4xl font-bold mb-1">{value}</div>
    <div className="text-slate-500 text-sm mb-2">{subtitle}</div>
    <div className="text-green-400 text-sm font-semibold">{trend}</div>
  </div>
);

const FeatureCard = ({ icon, title, description, color }) => {
  const colorClasses = {
    purple: 'from-purple-500/20 to-purple-900/20 border-purple-500/50 text-purple-400',
    blue: 'from-blue-500/20 to-blue-900/20 border-blue-500/50 text-blue-400',
    green: 'from-green-500/20 to-green-900/20 border-green-500/50 text-green-400'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl p-6 border backdrop-blur-xl`}>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default ERC8004Dashboard;