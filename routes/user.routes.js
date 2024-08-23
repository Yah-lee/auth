const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controllers");

router.post("/Create_User", controller.Create_User);

router.post("/Login_User", controller.Login_User);

router.get("/Find_One", controller.Find_One);

router.get("/Find_All", controller.Find_All);

module.exports = router;
