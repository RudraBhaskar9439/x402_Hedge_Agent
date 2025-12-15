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
// MongoDB Connection
const mongoUri = process.env.MONGODB_URI;
let mongoClient;
let db;

if (mongoUri) {
    try {
        mongoClient = new MongoClient(mongoUri);
    } catch (err) {
        console.error('❌ Failed to create MongoClient. Check your MONGODB_URI format.', err);
    }
} else {
    console.error('⚠️ MONGODB_URI is missing in environment variables! Database features will not work.');
}

// Start server immediately
const PORT = process.env.PORT || 3001;

let isDbConnected = false;

connectDB().then(() => {
    isDbConnected = true;
}).catch(err => {
    console.error('Initial DB connection failed but server is running:', err);
});

// Update connectDB to not exit
async function connectDB() {
    if (!mongoClient) return;
    try {
        await mongoClient.connect();
        db = mongoClient.db();
        isDbConnected = true;
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        isDbConnected = false;
        // Do not exit, allow server to run for logs/health check
    }
}

// Middleware
const allowedOrigins = [
    'http://localhost:3000',
    'https://alpha-agent007.vercel.app',
    'https://x402-hedge-agent007.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean).map(url => url ? url.replace(/\/$/, '') : '');

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
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
const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'dev_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
};

if (mongoUri) {
    sessionConfig.store = MongoStore.create({
        mongoUrl: mongoUri,
        ttl: 24 * 60 * 60
    });
} else {
    console.warn('⚠️ Using MemoryStore for sessions (non-persistent). set MONGODB_URI to fix.');
}

app.use(session(sessionConfig));

// Make DB available to routes
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Middleware to check DB status
app.use((req, res, next) => {
    if (req.path === '/health') return next();
    if (!isDbConnected) {
        return res.status(503).json({
            error: 'Service Unavailable',
            message: 'Database connection is not yet established'
        });
    }
    next();
});

// Routes
app.use('/api/payment', paymentRoutes);
app.use('/api/models', modelRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: isDbConnected ? 'ok' : 'maintenance',
        db: isDbConnected ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
});

app.listen(PORT, () => {
    console.log(`🚀 X402 Backend running on port ${PORT}`);
    console.log(`📡 Frontend URL: ${process.env.FRONTEND_URL}`);
    console.log(`💳 Payment wallet: ${process.env.PAYMENT_WALLET_ADDRESS}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    if (mongoClient) await mongoClient.close();
    process.exit(0);
});

module.exports = app;
