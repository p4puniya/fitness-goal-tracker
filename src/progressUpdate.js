// Import required modules
const express = require('express');
const router = express.Router();
const FitnessGoal = require('../models/fitnessGoal');

// Define the API endpoint for progress update
router.post('/progress', async (req, res) => {
  try {
    const { goalId, weight, reps, distance } = req.body;

    // Update the fitness goal document in the database
    const updatedGoal = await FitnessGoal.findByIdAndUpdate(
      goalId,
      { 'targetMetrics.weight': weight, 'targetMetrics.reps': reps, 'targetMetrics.distance': distance },
      { new: true }
    );

    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress.' });
  }
});

module.exports = router;
