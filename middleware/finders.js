const Resume = require("../models/Resume");
const Project = require("../models/Projects");
const Testimonial = require("../models/Testimonials");

async function getResume(req, res, next) {
  let resume;
  try {
    resume = await Resume.findById(req.params.id);

    if (resume == null) {
      return res.status(404).json({ message: "Cannot find resume" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.resume = resume;
  next();
}

async function getProject(req, res, next) {
  let project;
  try {
    project = await Project.findById(req.params.id);

    if (project == null) {
      return res.status(404).json({ message: "Cannot find project" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.project = project;
  next();
}

async function getTestimonial(req, res, next) {
  let testimonial;
  try {
    testimonial = await Testimonial.findById(req.params.id);

    if (testimonial == null) {
      return res.status(404).json({ message: "Cannot find testimonial" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.testimonial = testimonial;
  next();
}

module.exports = { getResume, getProject, getTestimonial };
