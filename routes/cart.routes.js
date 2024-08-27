const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controllers");

router.post("/update-quantity", cartController.updateQuantity);

router.delete("/remove-item/:cartItemId", cartController.removeItem);

router.get("/recalculate/:userId", cartController.recalculateCart);

module.exports = router;
