const Order = require('../models/OrderModel');
const Product = require('../models/productModel'); 
const User = require('../models/UserModel')
const createOrder = async (req, res) => {
  try {
    const { products, shippingAddress, contactDetails, paymentDetails } = req.body;
    const userId = req.user.id;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty, cannot place an order' });
    }

    let totalAmount = 0;
    const orderProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
      }

      const productTotal = product.price * item.quantity;
      orderProducts.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price
      });

      totalAmount += productTotal;
    }

    const newOrder = new Order({
      userId,
      products: orderProducts,
      shippingAddress,
      contactDetails,
      paymentDetails,
      totalAmount
    });

    await newOrder.save();

    await User.findByIdAndUpdate(userId, { $set: { cart: [] } });

    // Optional: populate before returning (if you want a richer response)
    const populatedOrder = await Order.findById(newOrder._id)
      .populate('userId', 'Name email')
      .populate('products.productId', 'name price');

    res.status(201).json({ message: 'Order placed successfully', order: populatedOrder });
  } catch (err) {
    console.error("Error in createOrder:", err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'Name email')  
      .populate('products.productId', 'name price'); 

    res.status(200).json({
      message: 'Orders retrieved successfully',
      orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'Name email')
      .populate('products.productId', 'name price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order retrieved successfully',
      order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status, paymentStatus },
      { new: true } 
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order updated successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order deleted successfully',
      order: deletedOrder
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};
