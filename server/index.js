import express from "express";
import { register } from "./src/controllers/user.controllers.js";
import { login } from "./src/controllers/user.controllers.js";
const app = express();
app.use(express.json());
app.post("/api/v1/auth/register/", register);
app.post("api/v1/auth/login", login);

export default app;
