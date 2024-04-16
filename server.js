import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnect.js";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
// Configure environment variables
dotenv.config();


const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

  // Create Express app
  const app = express();

  // Middleware setup
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname,'./client/build')));



  app.use('*',function(req,res){
    res.sendFile(path.join(__dirname),'./client/build/index.html');
  })

  // Routes
  app.use("/api/v1/product/", productRoutes);
  app.use("/api/v1/auth/", authRoutes);
  app.use("/api/v1/category/", categoryRoutes);

  // Serve React app from the build folder
  app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "client", "build", "index.html"));
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
  });

  // Port
  const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  // Start the server
  app.listen(PORT, () => {
    console.log(
      `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
        .white
    );
  });
});
