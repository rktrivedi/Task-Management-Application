import {validationResult} from "express-validator";
import {jsonGenerate} from "../utils/helpers.js";
import {StatusCode} from "../utils/constants.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const Register = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const {name, username, password, email} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //Checking Existing User

    const userExist = await User.findOne({
      $or: [
        {
          email: email,
        },
        {
          username: username,
        },
      ],
    });

    if (userExist) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "User or Email already Exists"
        )
      );
    }

    //Save to DB
    try {
      const result = await User.create({
        name: name,
        email: email,
        password: hashPassword,
        username: username,
      });
      res.json(
        jsonGenerate(StatusCode.SUCCESS, "Registation Successfull", result)
      );
    } catch (error) {
      console.log(error);
    }
  }

  res.json(
    jsonGenerate(
      StatusCode.VALIDATION_ERROR,
      "Validation error",
      errors.mapped()
    )
  );
};

export default Register;
