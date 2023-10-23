const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
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
  email: {
    type: String,
    default: null,
    required: true,
  },
  cgpa: {
    type: String, // You may want to change this to a numeric type like Number if CGPA is a numeric value.
    default: null,
    required: true,
  },
  resume: {
    type: String,
    default: null,
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming this links to another model
    required: true,
  },
  status:{
    type:String,
    enum:["pending","rejected","accepted"],
    default:"pending"
  }
});

// Export the model using the correct schema
module.exports = mongoose.model('applicant', applicantSchema);