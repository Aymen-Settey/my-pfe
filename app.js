// app.js
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);

// Example route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PFE Tracking API is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler for unmatched routes
app.use((req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.status = 404;
  next(err);
});

// Global error handler (MUST be last)
app.use(errorHandler);

module.exports = app;
