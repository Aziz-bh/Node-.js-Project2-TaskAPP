const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

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
router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    if (!tasks || tasks.length === 0) {
      res.status(404).send();
    } else {
      res.status(200).send(tasks);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/task/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).send();
    } else {
      res.status(200).send(task);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send();
  }
});
router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((u) => allowedUpdates.includes(u));
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates !" });
  }
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body);
    if (!task) {
      res.status(404).send();
    }

    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
