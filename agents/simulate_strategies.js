// Simulate strategies on real Pyth ETH/USD price feed
import fetch from 'node-fetch';
import fs from 'fs';

const FEED_ID = '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace';

async function fetchPriceSeries() {
  // Get last 200 minutes
  const end = Math.floor(Date.now() / 1000);
  const start = end - 200 * 60;
  const url = `https://benchmarks.pyth.network/v1/shims/historical/price/${FEED_ID}?resolution=60&start_time=${start}&end_time=${end}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data || !data.prices) throw new Error('No price series');
  // Each point: { price, publish_time, ... }
  return data.prices.map(pt => ({
    date: new Date(pt.publish_time * 1000).toISOString(),
    price: Number(pt.price) * Math.pow(10, pt.exponent)
  }));
}

function simulateStrategy(strategy, prices) {
  let eth = 1000;
  let usd = 0;
  let correct = 0, total = 0;
  let history = [];
  let trades = [];
  for (let i = 0; i < prices.length - 1; i++) {
    const current = prices[i].price;
    const next = prices[i + 1].price;
    history.push(current);
    let action = 'HOLD';
    if (strategy === 'momentum') {
      if (history.length >= 20) {
        const ma20 = history.slice(-20).reduce((a, b) => a + b, 0) / 20;
        if (current > ma20 * 1.02) action = 'BUY';
        else if (current < ma20 * 0.98) action = 'SELL';
      }
    } else if (strategy === 'mean-reversion') {
      if (history.length >= 30) {
        const mean = history.reduce((a, b) => a + b, 0) / history.length;
        const stdDev = Math.sqrt(history.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / history.length);
        const zScore = (current - mean) / stdDev;
        if (zScore < -1.5) action = 'BUY';
        else if (zScore > 1.5) action = 'SELL';
      }
    } else if (strategy === 'ml') {
      if (history.length >= 10) {
        const shortMA = history.slice(-5).reduce((a, b) => a + b, 0) / 5;
        const longMA = history.slice(-20).reduce((a, b) => a + b, 0) / 20;
        const volatility = Math.sqrt(history.slice(-10).reduce((sq, n) => sq + Math.pow(n - shortMA, 2), 0) / 10);
        const momentum = shortMA / longMA;
        const mlScore = (momentum - 1) * 100 - (volatility / current) * 50;
        if (mlScore > 5) action = 'BUY';
        else if (mlScore < -5) action = 'SELL';
      }
    } else if (strategy === 'random') {
      action = ['BUY', 'SELL', 'HOLD'][Math.floor(Math.random() * 3)];
    }
    // Simulate trade
    if (action === 'BUY' && eth > 0) {
      usd += eth * current;
      trades.push({ type: 'BUY', price: current, date: prices[i].date });
      eth = 0;
      if (next > current) correct++;
      total++;
    } else if (action === 'SELL' && usd > 0) {
      eth += usd / current;
      trades.push({ type: 'SELL', price: current, date: prices[i].date });
      usd = 0;
      if (next < current) correct++;
      total++;
    }
  }
  // Final portfolio value in USD
  const finalUsd = eth * prices[prices.length - 1].price + usd;
  return {
    pnl: finalUsd - 1000 * prices[0].price,
    accuracy: total ? (correct / total) * 100 : 0,
    trades,
    equityCurve: prices.map((pt, idx) => {
      let val = eth * pt.price + usd;
      return { date: pt.date, value: val };
    })
  };
}

async function main() {
  const prices = await fetchPriceSeries();
  const strategies = ['momentum', 'mean-reversion', 'ml', 'random'];
  const results = {};
  for (const s of strategies) {
    results[s] = simulateStrategy(s, prices);
  }
  fs.writeFileSync('strategy_sim_results.json', JSON.stringify({ prices, results }, null, 2));
  console.log('Simulation complete. Results saved to strategy_sim_results.json');
}

main();
