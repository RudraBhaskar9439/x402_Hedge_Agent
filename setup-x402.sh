#!/bin/bash

echo "🚀 Setting up Off-Chain HTTP 402 Payment System..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if MongoDB is installed
echo -e "${BLUE}Checking MongoDB...${NC}"
if command -v mongod &> /dev/null; then
    echo -e "${GREEN}✓ MongoDB is installed${NC}"
    
    # Check if MongoDB is running
    if pgrep -x "mongod" > /dev/null; then
        echo -e "${GREEN}✓ MongoDB is running${NC}"
    else
        echo -e "${BLUE}Starting MongoDB...${NC}"
        brew services start mongodb-community
        sleep 2
        echo -e "${GREEN}✓ MongoDB started${NC}"
    fi
else
    echo -e "${RED}✗ MongoDB not found${NC}"
    echo -e "${BLUE}Installing MongoDB...${NC}"
    brew tap mongodb/brew
    brew install mongodb-community
    brew services start mongodb-community
    echo -e "${GREEN}✓ MongoDB installed and started${NC}"
fi

echo ""
echo -e "${BLUE}Setting up backend...${NC}"

# Navigate to backend directory
cd backend

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${BLUE}Creating .env file...${NC}"
    cp .env.example .env
    
    # Generate random session secret
    SESSION_SECRET=$(openssl rand -base64 32)
    
    # Update .env with generated secret
    sed -i '' "s/your-secret-key-change-this-in-production/$SESSION_SECRET/" .env
    
    echo -e "${GREEN}✓ .env file created${NC}"
    echo -e "${RED}⚠️  IMPORTANT: Edit backend/.env and add your PAYMENT_WALLET_ADDRESS${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

echo ""
echo -e "${GREEN}✅ Backend setup complete!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Edit backend/.env and add your PAYMENT_WALLET_ADDRESS"
echo "2. Run: cd backend && npm run dev"
echo "3. Update frontend/.env.local with API_URL and PAYMENT_WALLET_ADDRESS"
echo "4. Test the payment flow!"
echo ""
echo -e "${BLUE}📚 Read X402_OFFCHAIN_GUIDE.md for complete instructions${NC}"
