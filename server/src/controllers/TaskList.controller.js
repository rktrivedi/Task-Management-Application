import {jsonGenerate} from "../utils/helpers.js";
import {StatusCode, JWT_TOKEN_SECRET} from "../utils/constants.js";
import User from "../models/User.js";

export const GetTask = async (req, res) => {
  try {
    const list = await User.findById(req.userId)
      .select("_password")
      .populate("todos")
      .exec();

    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "All Task List Fetched", list)
    );
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error", error)
    );
  }
};
