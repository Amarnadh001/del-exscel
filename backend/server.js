import cors from "cors";
import express from "express";
import { connectDB } from "./config/db.js";
import cartRouter from "./routes/cartRoute.js";
import foodRouter from "./routes/foodRoute.js";
import orderRouter from "./routes/orderRoute.js";
import userRouter from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

const app = express();
const port = process.env.PORT || 4000;


// Enhanced CORS configuration
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || 'https://del-exscel-frontend.onrender.com',
    process.env.ADMIN_URL || 'https://del-exscel-admin.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'], // Allow 'token' header
  credentials: true,
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions)); // Use the corsOptions here

// Explicit preflight handling for /api/cart/add
app.options("/api/cart/add", cors(corsOptions));

>>>>>>> 331a8a534b3d9290b4a3f261be6994821e59f234
// Database connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/auth", authRoute);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error("🚨 Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Health check
app.get("/", (req, res) => {
  res.json({ status: "active", message: "Food Ordering API Service" });
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV || "development"} mode`);
// Health check
app.get("/", (req, res) => {
  res.json({ status: "active", message: "Food Ordering API Service" });
});

app.listen(port, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`🔗 Access endpoints at http://localhost:${port}`);
});
// mongodb+srv://amarnadh:369082@cluster0.wbhb7.mongodb.net/?
