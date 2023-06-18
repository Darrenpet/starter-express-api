const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  resume_id: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Resume", resumeSchema);
