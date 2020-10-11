const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const questionRouter = require("./server/routes/questionRouter");
require("dotenv").config();
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./server/config/passport-setup");
const session = require("express-session");
const authRoutes = require("./server/routes/auth-routes");
const User = require("./server/model/user-model");
const keys = require("./server/config/keys");
const cookieParser = require("cookie-parser"); // parse cookie header
const app = express();
// Middleware
app.use(bodyParser.json());
mongoose.connect(process.env.DB_MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});



// PORT
const PORT = process.env.PORT || 5000;

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
app.use(
  cors({
    origin: process.env.REACT_APP_WEBSITE_URL || "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);





// set up routes
app.use("/question", questionRouter);
app.get("/profile/:id", async (req, res) => {
  let user = await User.find({ _id: req.query.id });

  if (user) {
    return res.status(200).json(user);
  }
  res.send({ err: "No User Found" });
});
app.use("/auth", authRoutes);


if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}






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

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
