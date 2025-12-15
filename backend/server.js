const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const paymentRoutes = require('./routes/payment');
const modelRoutes = require('./routes/models');
const x402Middleware = require('./middleware/x402');

const app = express();

// MongoDB Connection
const mongoClient = new MongoClient(process.env.MONGODB_URI);
let db;

async function connectDB() {
    try {
        await mongoClient.connect();
        db = mongoClient.db();
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    'https://alpha-agent007.vercel.app',
    'https://x402-hedge-agent007.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean).map(url => url ? url.replace(/\/$/, '') : '');

console.log('Allowed Origins:', allowedOrigins);

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Check if origin is allowed (tolerant of trailing slashes)
        const isAllowed = allowedOrigins.some(allowed =>
            origin === allowed ||
            origin === allowed + '/' ||
            origin.replace(/\/$/, '') === allowed
        );

        if (isAllowed) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'x-wallet-address', 'Access-Control-Allow-Origin'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Explicit fallback for OPTIONS preflight
app.options('*', (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin) || allowedOrigins.includes(origin?.replace(/\/$/, ''))) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, x-wallet-address, Access-Control-Allow-Origin');
        res.header('Access-Control-Allow-Credentials', 'true');
        return res.sendStatus(200);
    }
    next();
}, cors(corsOptions));

app.use(express.json());

// Session Management
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 24 * 60 * 60 // 1 day
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

// Make DB available to routes
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Routes
app.use('/api/payment', paymentRoutes);
app.use('/api/models', modelRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3001;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 X402 Backend running on port ${PORT}`);
        console.log(`📡 Frontend URL: ${process.env.FRONTEND_URL}`);
        console.log(`💳 Payment wallet: ${process.env.PAYMENT_WALLET_ADDRESS}`);
    });
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoClient.close();
    process.exit(0);
});

module.exports = app;
