const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} = require('../controllers/OrderController');
const authenticated = require('../middlewares/auth')
router.post('/create',authenticated, createOrder);
router.get('/getOrders',authenticated, getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
