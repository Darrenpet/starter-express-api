require("dotenv").config;

const express = require("express");
const Testimonial = require("../models/Testimonials");
const { getTestimonial } = require("../middleware/finders");

const app = express.Router();

// GET ALL TESTIMONIALS
app.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(201).send(testimonials);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET ONE TESTIMONIAL
app.get("/:id", getTestimonial, (req, res) => {
  res.send(res.testimonial);
});

// CREATE A TESTIMONIAL
app.post("/", async (req, res) => {
  const { name, quote, img, relation } = req.body;

  let testimonial = new Testimonial({
    name,
    quote,
    img,
    relation,
  });

  try {
    const newTestimonial = await testimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE TESTIMONIALS
app.put("/:id", getTestimonial, async (req, res) => {
  const { name, quote, img, relation } = req.body;
  if (name) res.testimonial.name = name;
  if (quote) res.testimonial.quote = quote;
  if (img) res.testimonial.img = img;
  if (relation) res.testimonial.relation = relation;

  try {
    const updatedTestimonial = await res.testimonial.save();
    res.status(201).send(updatedTestimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE TESTIMONIALS
app.delete("/:id", getTestimonial, async (req, res) => {
  try {
    await res.testimonial.remove();
    res.json({ message: "Deleted testimonial" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;
