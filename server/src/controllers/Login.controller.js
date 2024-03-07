import {validationResult} from "express-validator";
import {jsonGenerate} from "../utils/helpers.js";
import {StatusCode} from "../utils/constants.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import User from "../models/User.js";

const Login = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const {username, password} = req.body;
    const user = await User.findOne({username: username});
    if (!user) {
      res.json(
        jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY),
        "Username or Password is wrong"
      );
    }
  }

  const verfied = bcrypt.compareSync(password, user.password);
  if (!verfied) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY),
      "Username or Password is wrong"
    );
  }
  const token = Jwt.sign({userId: user._id, JWT_TOKEN_SECRET});

  return res.json(
    jsonGenerate(StatusCode.SUCCESS, "Login Successfull", {
      userId: user_id,
      token: token,
    })
  );

  res.json(
    jsonGenerate(StatusCode.VALIDATION_ERROR, "Validation error", errors.mapped)
  );
};
export default Login;
