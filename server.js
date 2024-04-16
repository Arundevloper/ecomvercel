import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnect.js";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// Configure environment variables
dotenv.config();

// Connect to database and start server
await connectDB(); // Wait for database connection to establish

// Get current filename and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// Middleware setup
app.use(express.json());
const corsOption = {
  origin: ["https://ecomvercel.onrender.com/"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOption));
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(morgan("dev")); // Logging middleware

// Serve React app
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Routes
app.use("/api/v1/product/", productRoutes);
app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/category/", categoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Port
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
