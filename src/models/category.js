const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    priority: {
      type: Number,
      default: 0,
    },
    deadline: {
      type: Date,
      validate(value) {
        if (value < new Date()) {
          throw new Error("The deadline has already passed.");
        }
      },
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

categorySchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "category",
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
