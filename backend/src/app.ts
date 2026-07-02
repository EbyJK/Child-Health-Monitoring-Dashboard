import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes";
import userRoutes from "./routes/user.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use("/api/health", healthRoutes);
app.use("/api/users", userRoutes);


// Test Route
app.get("/", (_req, res) => {
  res.send("Backend is running ");
});

export default app;