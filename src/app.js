import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import * as userController from "./controllers/userController.js";
import * as eventController from "./controllers/eventController";
import jwt from "jsonwebtoken";
import connection from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);
app.post("/sign-in", userController.signIn);

app.post("/financial-events", eventController.create);
app.get("/financial-events", eventController.get);

app.get("/financial-events/sum", eventController.getSum);

export default app;
