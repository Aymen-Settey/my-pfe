const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.signup = async (req, res, next) => {
  try {
    const { email, motDePasse, nom, role } = req.body;

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const err = new Error("Email already exists");
      err.status = 400;
      throw err;
    }

    // Create user
    const user = new User({ email, motDePasse, nom, role });
    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(user),
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, motDePasse } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("Account not found");
      err.status = 404;
      throw err;
    }

    // Check password
    const isMatch = await user.comparePassword(motDePasse);
    if (!isMatch) {
      const err = new Error("Invalid email or password");
      err.status = 401;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(user),
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};
