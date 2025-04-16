const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const path = require('path');
const app = express();
const UserRoutes = require('./routes/User.route');
const OrderRoutes = require('./routes/Order.route')
const ProductRoutes = require('./routes/Product.route')
require('dotenv').config();



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  });
app.use(express.static(path.join(__dirname, 'frontend', 'build')));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.use('/api/user', UserRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/products', ProductRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});