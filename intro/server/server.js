const express = require("express");
const bodyParser = require("body-parser");
// const user = require("./routes/user"); //new addition
const cors = require("cors");
const path = require("path");

const mongoose = require("mongoose");

const questionRouter = require("./routes/questionRouter");

require("dotenv").config();
const cookieSession = require("cookie-session");

// const port = 4000;
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const session = require("express-session");
const authRoutes = require("./routes/auth-routes");
const User = require("./model/user-model");
const keys = require("./config/keys");

const cookieParser = require("cookie-parser"); // parse cookie header
// const dotenv = require("dotenv");
// dotenv.config({ path: "./config/.env" });

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
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
// app.use("/user", user);
app.use("/question", questionRouter);

app.use(
  cookieSession({
    name: "session",
    keys: [keys.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// parse cookies
app.use(cookieParser());

// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

// set up cors to allow us to accept requests from our client

// set up routes
app.use("/auth", authRoutes);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated",
    });
  } else {
    next();
  }
};

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies,
  });
});
app.get("/profile/:id", async (req, res) => {
  let user = await User.find({ _id: req.query.id });

  if (user) {
    return res.status(200).json(user);
  }
  res.send({ err: "No User Found" });
});
app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
