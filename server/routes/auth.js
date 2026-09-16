const express = require("express");
const passport = require("passport");

const router = express.Router();

// Start Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google redirects here after login
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    // Redirect to profile page upon successful login
    res.redirect("http://localhost:5173/profile");
  }
);

// Get logged-in user
router.get("/user", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: "Not logged in",
    });
  }

  res.json(req.user);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      return res.status(500).json({
        message: "Logout failed",
      });
    }

    res.json({
      message: "Logged out successfully",
    });
  });
});

module.exports = router;