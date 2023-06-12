const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    hide: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
taskSchema.virtual("categories", {
  ref: "Category",
  localField: "_id",
  foreignField: "tasks",
});
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
