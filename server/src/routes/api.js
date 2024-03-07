import express from "express";
import Register from "../controllers/Register.controller.js";
import {RegisterSchema} from "../validatorSchema/RegisterSchema.js";
import {LoginSchema} from "../validatorSchema/LoginSchema.js";
import Login from "../controllers/Login.controller.js";
import {createTask} from "../controllers/Task.controller.js";
import {check} from "express-validator";
import {GetTask} from "../controllers/TaskList.controller.js";
import {RemoveTodo} from "../controllers/RemoveTask.controller.js";

const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post("/register", RegisterSchema, Register);
apiRoute.post("/login", LoginSchema, Login);

// Protected routes;

apiProtected.post(
  "/createTask",
  [check(" title,Discription", "Task Discription is Required").exists()],
  createTask
);

// Completed Task Mark
apiProtected.post(
  "/markTask",
  [check("task_id", "task id is Required").exists()],
  createTask
);

// Delete Task

apiProtected.post(
  "/deleteTask",
  [check("task_id", "Task id is Required").exists()],
  RemoveTodo
);
// Fetch Task List
apiProtected.get("/tasklist", GetTask);
export default apiRoute;
