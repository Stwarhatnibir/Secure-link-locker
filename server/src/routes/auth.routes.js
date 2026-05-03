const express = require("express");
const { body } = require("express-validator");
const { signup, login, getMe } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

const signupValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.get("/me", protect, getMe);

module.exports = router;
