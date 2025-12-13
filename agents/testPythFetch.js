// Test script for getPythPrice (ESM compatible)
import fetch from 'node-fetch';

async function getPythPrice() {
  // Correct Pyth ETH/USD price feed ID (mainnet)
  const feedId = '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace';
  const url = `https://hermes.pyth.network/api/latest_price_feeds?ids[]=${feedId}`;
  try {
    const res = await fetch(url);
    const text = await res.text();
    try {
      // The API returns an array, not an object with a 'data' property
      const arr = JSON.parse(text);
      const priceFeed = arr[0];
      if (!priceFeed || !priceFeed.price) throw new Error('No price info');
      const price = Number(priceFeed.price.price) * Math.pow(10, priceFeed.price.expo);
      console.log('ETH/USD from Pyth:', price);
      return price;
    } catch (jsonErr) {
      console.error('Raw response (not JSON):', text);
      throw jsonErr;
    }
  } catch (err) {
    console.error('Pyth price fetch error:', err.message);
    return null;
  }
}

getPythPrice();
