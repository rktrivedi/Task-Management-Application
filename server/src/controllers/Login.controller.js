import {validationResult} from "express-validator";
import {jsonGenerate} from "../utils/helpers.js";
import {StatusCode} from "../utils/constants.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import User from "../models/User.js";

const Login = async (req, res) => {
  const errors = validationResult(req);

  // Check for validation errors
  if (!errors.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Validation error",
        errors.mapped
      )
    );
  }

  const {username, password} = req.body;
  try {
    // Find the user by username
    const user = await User.findOne({username: username});

    // Check if the user exists
    if (!user) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Username or Password is wrong"
        )
      );
    }

    // Compare the provided password with the hashed password in the database
    const verified = bcrypt.compareSync(password, user.password);

    // Check if the password is correct
    if (!verified) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Username or Password is wrong"
        )
      );
    }

    // Generate a JWT token
    const token = Jwt.sign({userId: user._id}, "YOUR_JWT_SECRET_KEY");

    // Return success response with token and user ID
    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "Login Successful", {
        userId: user._id,
        token: token,
      })
    );
  } catch (error) {
    console.error("Error during login:", error);
    return res.json(
      jsonGenerate(StatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
    );
  }
};

export default Login;
