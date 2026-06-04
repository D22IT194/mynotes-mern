import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB }from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;



app.use(cors({
    origin: "http://localhost:5173", // Allow requests from this origin
})); // Enable CORS for all routes

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/upload", express.static("upload"));
app.use(rateLimiter); // Apply rate limiter middleware to all routes

 app.use("/api/notes", notesRoutes); 
 app.use("/api/auth", authRoutes);
 app.use("/api/admin", adminRoutes);


connectDB().then(() => {
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

})
 

