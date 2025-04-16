const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addToCart,
  getCart,
  removeFromCart,
  getNewestProducts,
} = require('../controllers/productControllers');
const authenticated = require('../middlewares/auth')
const { LimitImageSize } = require('../middlewares/ResizePicture');
const { uploadImage } = require('../controllers/productControllers')
// Create product route with multer middleware applied
router.post('/addProduct', LimitImageSize, addProduct);  // Upload image before passing to controller
router.get('/', getAllProducts);
router.get('/newest', getNewestProducts);
router.get('/getCart',authenticated,getCart)
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/delete', authenticated,deleteProduct);
router.post('/upload-image', uploadImage);
router.post('/addToCart',authenticated,addToCart)


router.delete('/removeFromCart/:productId',authenticated, removeFromCart);
module.exports = router;
