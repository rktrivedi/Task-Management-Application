import express from "express";
import Register from "../controllers/Register.controller.js";
import {RegisterSchema} from "../validatorSchema/RegisterSchema.js";
import {LoginSchema} from "../validatorSchema/LoginSchema.js";
import Login from "../controllers/Login.controller.js";

const apiRoute = express.Router();

apiRoute.post("/register", RegisterSchema, Register);
apiRoute.post("/login", LoginSchema, Login);

export default apiRoute;
