const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { v4: uuidv4 } = require('uuid');

const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users", // Name of the table/model
      key: "id", // Primary key of the Users table
    },
    onDelete: "CASCADE", // Ensure cart items are deleted when a user is deleted
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Products", // Name of the table/model
      key: "id", // Primary key of the Products table
    },
    onDelete: "CASCADE", // Ensure cart items are deleted when a product is deleted
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1, // Default quantity is 1 if not specified
  },
  priceAtTime: {
    type: DataTypes.FLOAT,
    allowNull: false, // The price of the product at the time it was added to the cart
  },
}, {
  timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' timestamps
});

module.exports = Cart;
