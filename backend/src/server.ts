

import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  console.log("Starting server...");
  console.log("Connecting to MongoDB...");

  await connectDB();

  console.log("MongoDB connected. Starting Express...");

  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
};

startServer();