const express = require("express");
const app = express();
const cors = require("cors");
const port = 8899;

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/user.routes");

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
