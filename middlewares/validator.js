const { body } = require("express-validator");

const isValidPassword = (value) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!passwordRegex.test(value)) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
    );
  }
  return true;
};

const RegisterValidator = [
  body("First_Name").notEmpty().withMessage("First name is required"),
  body("Last_Name").notEmpty().withMessage("Last name is required"),
  body("Email")
    .optional()
    .isEmail()
    .withMessage("Invalid Email format")
    .custom((value) => {
      if (value && !value.endsWith("@gmail.com")) {
        throw new Error("Email must be gmail.com");
      }
      return true;
    }),
  body("Phone_Number")
    .optional()
    .isMobilePhone()
    .withMessage("Phone number must contain only numbers"),
  body("Password")
    .notEmpty()
    .withMessage("Password is required")
    .custom(isValidPassword),
];

module.exports = { RegisterValidator };
