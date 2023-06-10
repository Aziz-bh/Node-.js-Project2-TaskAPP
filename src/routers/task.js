const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

const auth = require("../middleware/auth");

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
});
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// set a filter
// completed=true for example
// get tasks?limit=10&skip=20
router.get("/tasks", auth, async (req, res) => {
  const match = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  try {
    const tasks = await Task.find({ owner: req.user._id, ...match })
      .skip(req.query.skip ? req.query.skip : 0)
      .limit(parseInt(req.query.limit ? req.query.limit : 20))
      .sort({ createdAt: req.query.sortBy === "desc" ? -1 : 1 });
    if (!tasks || tasks.length === 0) {
      res.status(404).send();
    } else {
      res.status(200).send(tasks);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      res.status(404).send();
    } else {
      res.status(200).send(task);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send();
  }
});
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((u) => allowedUpdates.includes(u));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates !" });
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      res.status(404).send();
    }
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
