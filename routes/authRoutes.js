const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const { validateUser, validateLogin } = require("../validators");

router.post("/signup", validateUser, signup);
router.post("/login", validateLogin, login);

module.exports = router;
