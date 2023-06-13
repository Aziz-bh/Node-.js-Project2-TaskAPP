const express = require("express");
const Category = require("../models/category");
const router = new express.Router();

const auth = require("../middleware/auth");

router.get("/category", auth, async (req, res) => {
  try {
    res.send(await Category.find({ owner: req.user._id }));
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/category", auth, async (req, res) => {
  try {
    const cat = new Category(req.body);
    cat.owner = req.user._id;
    await cat.save();
    res.status(200).send(cat);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
module.exports = router;
