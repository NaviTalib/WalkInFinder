const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

const passport = require("./config/passport");

const interviewRoutes = require("./routes/interviews");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set to true if using HTTPS in production
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/interviews", interviewRoutes);
app.use("/auth", authRoutes);

// Home
app.get("/", (req, res) => {
  res.json({
    message: "WalkInFinder API is running 🚀",
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on http://localhost:${process.env.PORT || 5000}`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });