const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  type: String,
  metrics: {
    weight: Number,
    reps: Number,
    distance: Number,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;