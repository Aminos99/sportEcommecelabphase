const User = require("../models/UserModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const adduser = async (req, res) => {
  try {
    const { Name, email, password } = req.body;

    if (!Name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // 🔐 Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      Name,
      email,
      password: hashedPassword, // ✅ store the hashed password
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login request:", { email, password }); // 🐞 Log incoming data

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log("Login successful");
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        Name: user.Name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("Login error:", err); // 🐞 Print full error
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}

module.exports = {adduser, login}