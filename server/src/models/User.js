import mongoose from "mongoose";
import Task from "./Task.js";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    min: 6,
    max: 32,
    required: true,
  },
  password: {
    type: String,
    min: 6,
    max: 32,
    required: true,
  },
  email: {
    type: String,
    min: 6,
    max: 32,
    required: true,
  },
  task: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
