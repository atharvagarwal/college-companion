const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    default: null,
    required: true,
  },
  eventImage: {
    type: String,
    default: null,
    required: true,
  },
  applied: [
    {
      name: {
        type: String,
        default: null,
        required: true,
      },
      regNo: {
        type: String,
        default: null,
        required: true,
      },
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      }
    }
  ],
  expiresAt: {
    type: Date,
    default: Date.now,
    index: { expires: '1w' } // Expires in 1 week
  }
});

// Export the model
module.exports = mongoose.model('event', eventSchema);
