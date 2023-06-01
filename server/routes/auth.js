const router = require("express").Router();
const passport = require("passport");
const wbm = require("../wbm");

const User = require("../models/userModel");

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const usernameCheck = await User.findOne({ name });
    if (usernameCheck) {
      return res.json({ msg: "Username already exists", status: false });
    }
    const emailCheck = await User.findOne({ email: email });
    if (emailCheck) {
      return res.json({ msg: "Email already exists", status: false });
    }
    if (password.length < 5) {
      return res.json({
        msg: "Password should be atleast 5 characters long",
        status: false,
      });
    }
    const user = await User.create({ name, email, password });
    return res
      .status(201)
      .json({ msg: "Registered successfully", status: true });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const emailCheck = await User.findOne({ email: email });
    if (emailCheck) {
      if (emailCheck.password === password) {
        return res.json({
          msg: "Logged in successfully",
          status: true,
          user: emailCheck,
        });
      } else {
        return res.json({ msg: "Invalid Password", status: false });
      }
    } else {
      return res.json({ msg: "Invalid Email", status: false });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/whatsapp", (req, res) => {
  const { phone, msg } = req.body;

  wbm
    .start({ qrCodeData: true, session: false, showBrowser: false })
    .then(async (qrCodeData) => {
      console.log(qrCodeData);
      res.send(qrCodeData);
      await wbm.waitQRCode();

      const phones = [phone];
      const message = "Hello! Stockx Update";

      await wbm.send(phones, message);
      await wbm.end();
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
