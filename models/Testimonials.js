const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  testimonial_id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  relation: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
