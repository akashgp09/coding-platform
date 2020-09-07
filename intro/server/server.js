const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user"); //new addition
const InitiateMongoServer = require("./config/db");
const cors = require("cors");
const path = require("path");

const mongoose = require("mongoose");
// const Question = require("./model/question");
const questionRouter = require("./routes/questionRouter");
// Initiate Mongo Server
// InitiateMongoServer();

mongoose.connect(
  "mongodb+srv://webdev:webdevteam1@cluster0.jv8em.mongodb.net/content?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    poolSize: 4,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

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
