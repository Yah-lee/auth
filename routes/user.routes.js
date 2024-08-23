const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controllers");

router.post("/Create_User", controller.Create_User);

router.post("/Login_User", controller.Login_User);

router.get("/", controller.Find_One);

module.exports = router;
