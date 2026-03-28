const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express(); // 🔥 FIRST create app

// 🔥 CORS (single, clean config)
app.use(cors({
  origin: "https://gen-ai-model.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
}));

// 🔥 handle preflight (VERY IMPORTANT)
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

// routes
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;