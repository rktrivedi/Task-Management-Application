import {validationResult} from "express-validator";
import {jsonGenerate} from "../utils/helpers";
import {StatusCode} from "../utils/constants";
import Task from "../models/Task";

export const MarkTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "task id is Required",
        errors.mapped()
      )
    );
  }

  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.body.todo_id,
        userId: req.userId,
      },
      {
        $set: {
          isCompleted: true,
        },
      },
      {new: false}
    );

    if (task) {
      return res.json(jsonGenerate(StatusCode.SUCCESS, "Task Updated", task));
    }
  } catch (error) {
    console.error(error);
    return res.json(
      jsonGenerate(
        StatusCode.UNPROCESSABLE_ENTITY,
        "Task Could Not Update",
        null
      )
    );
  }
};
