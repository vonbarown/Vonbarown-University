require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const classDataRouter = require("./routes/classData");
const enrollmentRouter = require("./routes/enrollment");
const classRouter = require("./routes/class");
const authRouter = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.options("*", cors());

app.use("/class", classRouter);
app.use("/classData", classDataRouter);
app.use("/enrollment", enrollmentRouter);
app.use("/api/auth", authRouter);

app.use("*", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "../index.html"));
});

module.exports = app;
