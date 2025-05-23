const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String, 
    required: true
  },
  category: {
    type: String, 
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  confirmedOrders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'  // Assuming you have an Order model
  }]
}, { timestamps: true }); 

module.exports = mongoose.model('Product', productSchema);


