require("dotenv").config;

const express = require("express");
const Project = require("../models/Projects");
const { getProject } = require("../middleware/finders");

const app = express.Router();

// GET ALL PROJECTS
app.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(201).send(projects);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET ONE PROJECT
app.get("/:id", getProject, (req, res) => {
  res.send(res.project);
});

// CREATE A PROJECT
app.post("/", async (req, res) => {
  const { title, details, img, github, netlify } = req.body;

  let project = new Project({
    title,
    details,
    img,
    github,
    netlify,
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE PROJECTS
app.put("/:id", getProject, async (req, res) => {
  const { title, details, img, github, netlify } = req.body;
  if (title) res.project.title = title;
  if (details) res.project.details = details;
  if (img) res.project.img = img;
  if (github) res.project.github = github;
  if (netlify) res.project.netlify = netlify;

  try {
    const updatedProject = await res.project.save();
    res.status(201).send(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE PROJECTS
app.delete("/:id", getProject, async (req, res) => {
  try {
    await res.project.remove();
    res.json({ message: "Deleted project" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;
