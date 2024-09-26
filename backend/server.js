import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'; // Import CORS
import authRoutes from './routes/authRoutes.js';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Enable CORS for all requests
app.use(cors()); // Use CORS middleware

//Connect MongoDb
mongoose.connect(process.env.mongo)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("Database not connected", err));

// Middleware
app.use(express.json());

// Routes
app.use('/', authRoutes);

// Listen on the specified port
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
