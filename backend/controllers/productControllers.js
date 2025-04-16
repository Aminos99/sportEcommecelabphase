const Product = require('../models/productModel');
const cloudinary = require('cloudinary').v2; 
const multer = require('multer');
const User = require('../models/UserModel')
const mongoose = require('mongoose');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('img'); 

const addProduct = async (req, res) => {
  const { name, description, price, image, category, stock } = req.body;

  try {
    if (
      [name, description, price, image, category, stock].some(
        (field) => field === undefined || field === null || field === ''
      )
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category,
      stock
    });

    await newProduct.save();

    res.status(201).json({
      message: 'Product added successfully',
      product: newProduct
    });

  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ message: 'Error saving product' });
  }
};

const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.status(200).json({ url: result.secure_url }); 
  } catch (error) {
    res.status(500).json({ message: 'Image upload failed', error });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const { sort, search } = req.query;

    let sortOption = {};

    // Sorting logic
    switch (sort) {
      case "price-low":
        sortOption = { price: 1 };
        break;
      case "price-high":
        sortOption = { price: -1 };
        break;
      case "newest":
        sortOption = { createdAt: -1 };
        break;
      case "featured":
        sortOption = { featured: -1 };
        break;
      default:
        break;
    }

    // Search logic
    let query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" }; // Case-insensitive name match
    }

    // Fetch products from MongoDB with query and sort
    const products = await Product.find(query).sort(sortOption);

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
};


  const getNewestProducts = async (req, res) => {
    try {
      const newestProducts = await Product.find()
        .sort({ createdAt: -1 }) // newest first
        .limit(10); // optional: limit the number of results
      res.status(200).json({ products: newestProducts });
    } catch (err) {
      console.error('Error fetching newest products:', err);
      res.status(500).json({ message: 'Failed to fetch newest products', error: err.message });
    }
  };
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product retrieved successfully',
      product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  const { productId } = req.params; // Get productId from URL parameters
  const userId = req.user.id; // Get the userId from the decoded JWT (req.user)

  try {
    // Ensure that the user exists in the database using the userId from the token
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the product from the cart
    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();

    // Respond with the updated cart
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error('Error:', error);  // Log the error for debugging purposes
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { removeFromCart };



const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, category, stock } = req.body;

    const product = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, category, stock },
      { new: true } 
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const productObjectId = new mongoose.Types.ObjectId(productId);


    const productIndex = user.cart.findIndex(item =>
      item.productId.toString() === productId
    );

    if (productIndex > -1) {
      user.cart[productIndex].quantity += quantity;
    } else {
      user.cart.push({ productId: productObjectId, quantity });
    }

    await user.save();
    res.status(200).json({ message: 'Product added to cart', cart: user.cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const getCart = async (req, res) => {
  const userId = req.user.id; // or req.user._id depending on your token

  try {
    const user = await User.findById(userId).populate('cart.productId');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Cart retrieved successfully',
      cart: user.cart,
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};




module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addProduct,
  uploadImage,
  addToCart,
  getCart,
  removeFromCart,
  getNewestProducts,
};
