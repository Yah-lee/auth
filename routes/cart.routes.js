const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controllers");

router.post("/", cartController.addItemToCart);
router.get("/:userId", cartController.getCartItems);

module.exports = router;
