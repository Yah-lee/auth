const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const User = require("../models/user.models");
const { error } = require("console");

// Create User Function
exports.Create_User = async (req, res) => {
  const { First_Name, Last_Name, Email, Phone_Number, Password } = req.body;

  // Check if email already exists
  const Exists_Email = await User.findOne({ where: { Email } });
  if (Exists_Email) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // Check if phone number already exists
  const Exists_Phone_Number = await User.findOne({
    where: { Phone_Number },
  });
  if (Exists_Phone_Number) {
    return res.status(400).json({ error: "Phone number already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(Password, 10);

  // Create new user
  try {
    const New_user = await User.create({
      First_Name,
      Last_Name,
      Email,
      Phone_Number,
      Password: hashedPassword,
    });
    return res.status(201).json({ New_user });
  } catch (err) {
    console.error("Error creating user", err.message);
    return res.status(500).json({
      error: "Error creating user",
      message: err.message,
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
    const foundUser = await User.findOne({
      where: {
        [Op.or]: [{ Email: identifier }, { Phone_Number: identifier }],
      },
    });

    if (!foundUser) {
      return res.status(404).json({ error: "Invalid Email or Phone Number" });
    }

    if (!foundUser.Password) {
      return res.status(500).json({
        error: "User's password is missing in the database",
      });
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



// Find User Function
exports.Find_One = async (req, res) => {
  const { id, email, phoneNumber } = req.query;

  try {
    // Determine which field to use in the search
    const whereCondition = id
      ? { id }
      : email
      ? { Email: email }
      : phoneNumber
      ? { Phone_Number: phoneNumber }
      : null;

    if (!whereCondition) {
      return res.status(400).json({ error: "Please provide an id, email, or phone number to search." });
    }

    const user = await User.findOne({ where: whereCondition });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error finding user", err.message);
    return res.status(500).json({
      error: "Error finding user",
      message: err.message,
    });
  }
};

// find all users
exports.Find_All = async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    return res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching users", err.message);
    return res.status(500).json({
      error: "Error fetching users",
      message: err.message,
    });
  }
};