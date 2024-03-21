const User = require("../models/UserModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await User.create({
      email,
      password,
    });
    res.status(201).json(users);
  } catch (error) {
    console.error("Error creating a new user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(orderId);

    if (!user) {
      return res
        .status(404)
        .json({ message: `Cannot find any book with ID ${userId}` });
    }

    const totalResults = await Order.countDocuments();
    res.header("Content-Range", `items 0-${totalResults - 1}/${totalResults}`);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId);
    if (!oruserder) {
      return res
        .status(404)
        .json({ message: `Cannot find any book with ID ${userId}` });
    }

    const totalResults = await Order.countDocuments();
    res.header("Content-Range", `items 0-${totalResults - 1}/${totalResults}`);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: `Cannot find any book with ID ${userId}` });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
