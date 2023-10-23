const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobName: {
    type: String,
    default: null,
    required: true,
  },
  jobImage: {
    type: String,
    default: null,
    required: true,
  },
  jobDescription: {
    type: String,
    default: null,
    required: true,
  },
  package:{
    type: String,
    default: null,
    required: true,
  },
  company:{
    type: String,
    default: null,
    required: true,
  }
});

// Export the model
module.exports = mongoose.model('job', jobSchema);