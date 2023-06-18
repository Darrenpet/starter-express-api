const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  project_id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  netlify: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Project", projectSchema);
