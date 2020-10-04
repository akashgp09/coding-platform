const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user"); //new addition
const cors = require("cors");
const path = require("path");

const mongoose = require("mongoose");

const questionRouter = require("./routes/questionRouter");

require("dotenv").config();

mongoose.connect(process.env.REACT_APP_DB_MONGO_URI, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();

// PORT
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("../public"));
app.get("/", (req, res) => {
  res.sendStatus(200);
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);
app.use("/question", questionRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
