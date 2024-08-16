const express = require("express");
const app = express();
const core = require("core");
const port = 4000;

app.use(core());
app.use(express.json());

const userRoutes = require("./routes/user.routes");

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
