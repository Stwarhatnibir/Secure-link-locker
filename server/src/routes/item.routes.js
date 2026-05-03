const express = require("express");
const { body } = require("express-validator");
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/item.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.use(protect);

const itemValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("category")
    .isIn(["login", "note", "link", "card", "identity", "other"])
    .withMessage("Invalid category"),
];

router.get("/", getItems);
router.post("/", itemValidation, createItem);
router.put("/:id", itemValidation, updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
