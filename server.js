require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const { generalLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();

// ✅ Enable trust proxy (important for Render, Vercel, etc.)
app.set('trust proxy', 1);

// Security & middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_BASE_URL, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(generalLimiter);

// Connect DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health
app.get('/health', (req, res) => res.json({ status: 'OK' }));

// Error handler
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
