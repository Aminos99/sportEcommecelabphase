const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    Name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', 
          required: true
        },
        quantity: {
          type: Number,
          default: 1, 
          min: 1, 
        }
      }
    ],
  }, { timestamps: true });
  
module.exports = mongoose.model('User', UserSchema);

