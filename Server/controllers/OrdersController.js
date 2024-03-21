const Order = require("../models/OrderModel");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { email, totalPrice, basket, status, createAt } = req.body;

    const order = await Order.create({
      email,
      basket,
      totalPrice,
      status,
      createAt,
    });
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating a new order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ message: `Cannot find any book with ID ${orderId}` });
    }

    const totalResults = await Order.countDocuments();
    res.header("Content-Range", `items 0-${totalResults - 1}/${totalResults}`);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { email, totalPrice, basket, status, createdAt } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        email,
        totalPrice,
        basket,
        status,
        createdAt,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ message: `Cannot find any order with ID ${orderId}` });
    }

    const totalResults = await Order.countDocuments();
    res.header("Content-Range", `items 0-${totalResults - 1}/${totalResults}`);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ message: `Cannot find any book with ID ${orderId}` });
    }

    res.status(200).json(order);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
