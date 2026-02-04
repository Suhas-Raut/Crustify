require("dotenv").config(); // 👈 MUST be first line

const express = require("express");
const app = express();
const port = 5000;
const paymentRoutes = require("./Routes/payment");

// Initialize globals
global.foodData = [];
global.foodCategory = [];

// Connect DB
require("./db")(function (err, data, CatData) {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    global.foodData = data || [];
    global.foodCategory = CatData || [];
    console.log("Food and Category data loaded");
  }
});

// ✅ CORS Middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, auth-token"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


// ✅ Handle Preflight Requests
app.options("*", (req, res) => {
  res.sendStatus(200);
});

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Crustify Backend is running successfully",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", require("./Routes/Auth"));
app.use("/api/payment", paymentRoutes);



app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
