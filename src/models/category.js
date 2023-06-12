const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    priority: {
      type: Number,
      default: 0,
    },
    deadline: {
      type: Date,
    },
    hide: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

categorySchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "category",
  });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
