const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    salary: {
      type: String
    },

    experience: {
      type: String
    },

    eligibility: {
      type: String
    },

    skills: {
      type: [String],
      default: []
    },

    documents: {
      type: [String],
      default: []
    },

    description: {
      type: String,
      required: true
    },

    mapLink: {
      type: String
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

// TTL Index with a 24-hour buffer (86400 seconds)
// This ensures the listing stays visible for the entire day of the interview 
// and gets automatically deleted from MongoDB 24 hours after the interview date.
interviewSchema.index({ date: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model("Interview", interviewSchema);