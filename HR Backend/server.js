const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const candidateRoutes = require('./routes/candidateRoutes');
// const dropdownRoutes = require("./routes/dropdownRoutes");
const dropdownRoutes = require("./routes/dropdownRoutes");
const userRoutes = require("./routes/userRoutes");



// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS with credentials
app.use(cors({
  credentials: true,
  origin: "sq-hiring-tool.netlify.app", // Ensure this matches your frontend URL
}));



// Middleware for parsing JSON and cookies
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());


// Configure sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_default_secret', // Replace with a secure secret
  resave: false, // Prevents resaving session if nothing changed
  saveUninitialized: false, // Don't save uninitialized sessions
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // MongoDB connection string
    collectionName: 'sessions', // Name of the collection to store sessions
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
    httpOnly: true, // Protect against XSS
    secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
    sameSite: 'strict', // Prevent CSRF
  },
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidateRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dropdowns", dropdownRoutes);
// Start the servercr
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
