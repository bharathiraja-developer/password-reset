const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./controlles/user");
app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);

module.exports = app;
