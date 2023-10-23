const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
  updateTitle: {
    type: String,
    default: null,
    required: true,
  },
  updateDescription: {
    type: String,
    default: null,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    index: { expires: '1w' } // Expires in 1 week
  }
});

// Export the model
module.exports = mongoose.model('update', updateSchema);