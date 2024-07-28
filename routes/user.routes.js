const controllers = require("../controllers/user.controllers");
const routes = require("express").Router();

module.exports = routes
  .get("/", controllers.getAll)
  .post("/", controllers.create)
  .get("/:id", controllers.getOne)
  .put("/:id", controllers.update)
  .delete("/:id", controllers.delete);
