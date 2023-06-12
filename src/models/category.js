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
    tasks: [
      {
        task: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "task",
        },
      },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
