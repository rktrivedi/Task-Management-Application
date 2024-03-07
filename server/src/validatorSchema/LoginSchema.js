import {check} from "express-validator";

export const LoginSchema = [
  check("username", "username is required")
    .exists()
    .isAlphanumeric()
    .withMessage("Username Must be Alpha Numeric")
    .trim()
    .isLength({min: 6, max: 32}),

  check("password", "password is reuired").isLength({min: 6, max: 100}).trim(),
];
