const mongoose = require('mongoose');

const fitnessGoalSchema = new mongoose.Schema({
  goalType: String,
  targetMetrics: {
    weight: Number,
    reps: Number,
    distance: Number,
  },
});

module.exports = fitnessGoalSchema;
