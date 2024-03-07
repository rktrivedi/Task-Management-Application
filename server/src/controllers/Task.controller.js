import {validationResult} from "express-validator";
import {jsonGenerate} from "../utils/helpers.js";
import {StatusCode} from "../utils/constants.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const createTask = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Task is Required",
        error.mapped()
      )
    );
  }
  try {
    const result = await Task.create({
      userId: req.userId,
      title: req.body.title,
      description: req.body.description,
    });
    if (result) {
      const user = await User.findOneAndUpdate(
        {_id: req.userId},
        {$push: {Task: result}}
      );
      return res.json(jsonGenerate(StatusCode.SUCCESS, "Task Created", result));
    }
  } catch (error) {
    return res.json(
      jsonGenerate(
        StatusCode.UNPROCESSABLE_ENTITY,
        "Something wen wrong",
        error
      )
    );
  }
};
//description
