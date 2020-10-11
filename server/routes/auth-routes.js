const router = require("express").Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = process.env.REACT_APP_WEBSITE_URL || "http://localhost:3000";

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  }
});
router.get("/test", (req, res) => {
  res.status(201).json({test:"Auth Working properly"});
});
// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with google
router.get("/google",passport.authenticate("google", { scope: ["profile", "email"] }));

// redirect to home page after successfully login via google
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    // successRedirect: CLIENT_HOME_PAGE_URL,
    successRedirect:process.env.NODE_ENV === 'production'? `${process.env.REACT_APP_WEBSITE_URL}/compete`: "http://localhost:3000/compete",
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;
