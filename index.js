const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const userRoutes = require("./routes/user.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(userRoutes);

// Database Sync and Server Start
const port = 6000;

sequelize.sync().then(() => {
  console.log("Database connected.");
  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
}).catch(err => {
  console.error("Database connection failed:", err);
});
