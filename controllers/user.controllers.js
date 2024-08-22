const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const user = require("../models/user.models");

// Create User Function
exports.Create_User = async (req, res) => {
  const { First_Name, Last_Name, Email, Phone_Number, Password } = req.body;

  try {
    // Check if the user already exists by Email
    const existingUser = await user.findOne({ where: { Email } });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Check if the phone number already exists
    const existingPhoneNumber = await user.findOne({ where: { Phone_Number } });
    if (existingPhoneNumber) {
      return res.status(409).json({ error: "Phone number already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create the new user
    const New_user = await user.create({
      First_Name,
      Last_Name,
      Email,
      Phone_Number,
      Password: hashedPassword,
    });

    return res.status(201).json(New_user);
  } catch (err) {
    console.error("Error creating user", err.message);
    return res.status(500).json({
      error: "Error creating user",
      details: err.message,
    });
  }
};

// Login User Function
exports.Login_User = async (req, res) => {
  const { identifier, Password } = req.body; // 'identifier' can be either email or phone number

  if (!Password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    // Find user by email or phone number using Sequelize's Op.or
    const foundUser = await user.findOne({
      where: {
        [Op.or]: [{ Email: identifier }, { Phone_Number: identifier }],
      },
    });

    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!foundUser.Password) {
      return res
        .status(500)
        .json({ error: "User's password is missing in the database" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(Password, foundUser.Password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // If the user is found and the password matches
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: foundUser.id, // Assuming 'id' is the primary key field in your user model
        First_Name: foundUser.First_Name,
        Last_Name: foundUser.Last_Name,
        Email: foundUser.Email,
        Phone_Number: foundUser.Phone_Number,
      },
    });
  } catch (err) {
    console.error("Error during login", err.message);
    return res.status(500).json({
      error: "Error during login",
      details: err.message,
    });
  }
};
