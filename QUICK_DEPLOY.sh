#!/bin/bash

# Quick Deploy Script for AI Hedge Fund Contracts
# This script helps deploy contracts to different networks

set -e

echo "🚀 AI Hedge Fund Contract Deployment"
echo "======================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found!"
    echo ""
    echo "Creating .env.example..."
    cat > .env.example << EOF
# Private key for deployment (NEVER commit this file with real keys!)
PRIVATE_KEY=your_private_key_here

# Base Sepolia RPC URL
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# Basescan API key for contract verification (optional)
BASESCAN_API_KEY=your_basescan_api_key_here
EOF
    echo "✅ Created .env.example"
    echo ""
    echo "Please create a .env file with your credentials:"
    echo "  cp .env.example .env"
    echo "  # Then edit .env and add your PRIVATE_KEY and RPC_URL"
    echo ""
    exit 1
fi

# Source .env file
source .env

# Check for required variables
if [ -z "$PRIVATE_KEY" ] || [ "$PRIVATE_KEY" == "your_private_key_here" ]; then
    echo "❌ PRIVATE_KEY not set in .env file"
    exit 1
fi

# Network selection
echo "Select deployment network:"
echo "1) Local Anvil (for testing)"
echo "2) Base Sepolia Testnet"
echo "3) Simulate only (dry run)"
read -p "Enter choice [1-3]: " choice

case $choice in
    1)
        echo ""
        echo "📡 Deploying to Local Anvil..."
        echo "Make sure Anvil is running: anvil"
        echo ""
        forge script script/DeployLocal.s.sol:DeployLocalScript \
            --rpc-url http://localhost:8545 \
            --broadcast \
            --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
            -vvvv
        ;;
    2)
        if [ -z "$BASE_SEPOLIA_RPC_URL" ]; then
            echo "❌ BASE_SEPOLIA_RPC_URL not set in .env"
            exit 1
        fi
        echo ""
        echo "📡 Deploying to Base Sepolia Testnet..."
        echo ""
        forge script script/Deploy.s.sol:DeployScript \
            --rpc-url "$BASE_SEPOLIA_RPC_URL" \
            --broadcast \
            --verify \
            -vvvv
        ;;
    3)
        echo ""
        echo "🔍 Simulating deployment (dry run)..."
        echo ""
        if [ -z "$BASE_SEPOLIA_RPC_URL" ]; then
            RPC_URL="https://sepolia.base.org"
        else
            RPC_URL="$BASE_SEPOLIA_RPC_URL"
        fi
        forge script script/Deploy.s.sol:DeployScript \
            --rpc-url "$RPC_URL" \
            -vvvv
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment script completed!"
echo ""
echo "Next steps:"
echo "1. Save the contract addresses from the output above"
echo "2. Update script/Interact.s.sol with the new addresses"
echo "3. Test the contracts using the interaction scripts"

