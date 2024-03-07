import {validationResult} from "express-validator";
import {jsonGenerate} from "../utils/helpers.js";
import {StatusCode, JWT_TOKEN_SECRET} from "../utils/constants.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const RemoveTodo = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Task id is Required",
        error.mapped()
      )
    );
  }

  try {
    const result = await Task.findOneAndDelete({
      userId: req.userId,
      _id: req.body.todo,
    });

    if (result) {
      const user = await User.findOneAndUpdate(
        {
          _id: req.userId,
        },
        {$pull: {Task: req.body.task_id}}
      );
      return res.json(jsonGenerate(StatusCode.SUCCESS, "Task Delete", null));
    }
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could Not Delete", null)
    );
  }
};
