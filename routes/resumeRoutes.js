require("dotenv").config;

const express = require("express");
const Resume = require("../models/Resume");
const { getResume } = require("../middleware/finders");

const app = express.Router();

// GET ALL RESUME
app.get("/", async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.status(201).send(resumes);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET ONE RESUME
app.get("/:id", getResume, (req, res) => {
  res.send(res.resume);
});

// CREATE A RESUME
app.post("/", async (req, res) => {
  const { date, place, event, details } = req.body;

  let resume = new Resume({
    date,
    place,
    event,
    details,
  });

  try {
    const newResume = await resume.save();
    res.status(201).json(newResume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE RESUME
app.put("/:id", getResume, async (req, res) => {
  const { date, place, event, details } = req.body;
  if (date) res.resume.date = date;
  if (place) res.resume.place = place;
  if (event) res.resume.event = event;
  if (details) res.resume.details = details;

  try {
    const updatedResume = await res.resume.save();
    res.status(201).send(updatedResume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE RESUME
app.delete("/:id", getResume, async (req, res) => {
  try {
    await res.resume.remove();
    res.json({ message: "Deleted resume" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;
