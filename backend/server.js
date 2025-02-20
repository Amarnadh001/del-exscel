import cors from "cors";
import 'dotenv/config';
import express from "express";
import { connectDB } from "./config/db.js";
import cartRouter from "./routes/cartRoute.js";
import foodRouter from "./routes/foodRoute.js";
import orderRouter from "./routes/orderRoute.js";
import userRouter from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

// App configuration
const app = express();
const port = process.env.PORT || 4000;

// Enhanced CORS configuration
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    process.env.ADMIN_URL || 'http://localhost:5174'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  credentials: true
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions)); // ✅ Secure CORS configuration

// Database connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/auth", authRoute); // ✅ Auth routes

// Remove this incorrect route
// app.use("/api/verify", orderRouter); ❌

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('🚨 Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Health check
app.get("/", (req, res) => {
  res.json({ status: "active", message: "Food Ordering API Service" });
});

app.listen(port, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`🔗 Access endpoints at http://localhost:${port}`);
});
// mongodb+srv://amarnadh:369082@cluster0.wbhb7.mongodb.net/?