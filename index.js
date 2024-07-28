const express = require("express");
const core = require("core");
const bodyParser = require("body-parser");

require("dotenv").config();

const routes = require("./routes/user.routes");

const app = express();

app.use(core());
app.use(bodyParser.json());
app.use(routes);

jvvc;

app.get("/", (req, res) => {
  return res.json("Wellcome to my api");
});

const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})