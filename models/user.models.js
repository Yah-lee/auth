const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const generate8DigitId = () => {
  // Generate a random number between 10000000 and 99999999 to ensure it's always 8 digits
  return Math.floor(10000000 + Math.random() * 90000000);
};

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    defaultValue: generate8DigitId, // Use the function to generate the id
  },
  First_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Last_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Phone_Number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
