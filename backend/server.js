// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import DB config
const productRoutes = require('./routes/productRoutes');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);

// Seed function (Keep existing logic if needed, or run manually)
const seedDatabase = async () => {
  const Product = require('./models/Product');
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('📦 Seeding database...');
      const seedProducts = require('./seedData');
      await Product.insertMany(seedProducts);
      console.log('✅ Database seeded!');
    }
  } catch (err) {
    console.error('Seeding error:', err);
  }
};
seedDatabase();

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));