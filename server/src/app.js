import express from "express";
import mongoose from "mongoose";
import apiRoute from "./utils/api.js";
import {DB_CONNECT} from "./utils/constants.js";

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
app.use(express.json());
app.use("/api/", apiRoute);
app.listen(PORT, () => console.log("Server is Runnig"));
