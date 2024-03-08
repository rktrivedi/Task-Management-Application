import express from "express";
import mongoose from "mongoose";
import apiRoute, {apiProtected} from "./routes/api.js";
import {DB_CONNECT} from "./utils/constants.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import cors from "cors";
const app = express();
// MongoDB Connection Established
async function connectToMongoDB() {
  try {
    await mongoose.connect(DB_CONNECT, {useNewUrlParser: true});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();
// Port Defined ..Express
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use("/api/", apiRoute);
app.use("/api/", AuthMiddleware, apiProtected);
app.listen(PORT, () => console.log("Server is Runnig"));
