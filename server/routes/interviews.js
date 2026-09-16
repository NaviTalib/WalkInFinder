const express = require("express");
const router = express.Router();

const Interview = require("../models/Interview");

// GET all interviews
router.get("/", async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate("postedBy", "name email profileImage")
      .sort({ createdAt: -1 });

    res.json(interviews);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get interviews"
    });
  }
});


// GET single interview
router.get("/:id", async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id)
      .populate("postedBy", "name email profileImage");

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found"
      });
    }

    res.json(interview);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get interview"
    });
  }
});

// CREATE interview
router.post("/", async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const interview = await Interview.create({
      ...req.body,
      postedBy: req.user._id,
    });

    res.status(201).json({
      message: "Interview posted successfully",
      interview,
    });
  } catch (error) {
    console.error("POST INTERVIEW ERROR:", error);

    res.status(500).json({
      message: "Failed to post interview",
      error: error.message,
    });
  }
});

module.exports = router;