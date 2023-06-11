const User = require("../models/user");
const Task = require("../models/task");
const productivity = async (req, res, next) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    // Do something with the tasks array
    if(tasks.length!==0)
      req.user.prod=(tasks.filter((task) => task.completed === false).length /
        tasks.length)*100;
      console.log("🚀 ~ file: productivity.js:10 ~ productivity ~ req.user:", req.user.prod)
    next();
  } catch (error) {
    // Handle any errors that occurred
    console.error(error);
  }
};

module.exports = productivity;
