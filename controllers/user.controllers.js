const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const user = require("../models/user.models");
const { error } = require("console");

// Create User Function
exports.Create_User = async (req, res) => {
  const { First_Name, Last_Name, Email, Phone_Number, Password } = req.body;

  // check if email already exists
  const Exists_Email = await user.findOne({ where: { Email: Email } });
  if (Exists_Email) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // check if phone number already exists
  const Exists_Phone_NUmber = await user.findOne({
    where: { Phone_Number: Phone_Number },
  });
  if (Exists_Phone_NUmber) {
    return res.status(400).json({ error: "Phone number already exists" });
  }
  // hash password
  const hashedPassword = await bcrypt.hash(Password, 10);

  // create new user
  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    const New_user = await user.create({
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
    const foundUser = await user.findOne({
      where: {
        [Op.or]: [{ Email: identifier }, { Phone_Number: identifier }],
      },
    });

    if (!foundUser) {
      return res.status(404).json({ error: "Invalid Email or Phone Number" });
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

exports.findOne = async (req, res) => {
  const { identifier } = req.params; // Assume identifier is passed as a URL parameter

  try {
    // Find user by first name, last name, email, or phone number using Sequelize's Op.or
    const foundUser = await user.findOne({
      where: {
        [Op.or]: [
          { First_Name: identifier },
          { Last_Name: identifier },
          { Email: identifier },
          { Phone_Number: identifier },
        ],
      },
    });

    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return found user details (excluding the password)
    return res.status(200).json({
      id: foundUser.id, // Assuming 'id' is the primary key field in your user model
      First_Name: foundUser.First_Name,
      Last_Name: foundUser.Last_Name,
      Email: foundUser.Email,
      Phone_Number: foundUser.Phone_Number,
    });
  } catch (err) {
    console.error("Error finding user", err.message);
    return res.status(500).json({
      error: "Error finding user",
      details: err.message,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await user.findAll();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error finding all users", err.message);
    return res.status(500).json({ error: "Failed to find all users" });
  }
};
