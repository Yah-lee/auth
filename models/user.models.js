const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const User = sequelize.define("User", {
  id: {
    typeDataTypes: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
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
});

module.exports = User;
