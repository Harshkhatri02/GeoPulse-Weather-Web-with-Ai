import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';

// Initialize dotenv
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Serve static files
app.use(express.static('public'));
app.use('/scripts', express.static(join(__dirname, 'public', 'scripts')));
app.use('/weatherDashboardImg', express.static(join(__dirname, 'public', 'weatherDashboardImg')));

// Set view engine
app.set('view engine', 'ejs');

// API Keys endpoint
app.get('/api/keys', (req, res) => {
    if (req.session && (req.session.loggedIn || req.session.signedUp)) {
        res.json({
            weatherApiKey: process.env.WEATHER_API_KEY,
            pixabayApiKey: process.env.PIXABAY_API_KEY
        });
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
});

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        session: req.session,
        name: req.session.name || '',
        userSavedLocation: req.session.userSavedLocation || ''
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 