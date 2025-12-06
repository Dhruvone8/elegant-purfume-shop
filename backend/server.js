// Load environment variables from .env file into process.env
// This allows us to access configuration like PORT and MONGODB_URI
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

// Establish connection to MongoDB before starting the server
// This ensures our database is ready when requests come in
connectDB();

const app = express();

// Enable Cross-Origin Resource Sharing so our frontend can communicate with this API
// Without this, browsers would block requests from different origins (like localhost:5173 to localhost:5000)
app.use(cors());

// Parse incoming JSON payloads in request bodies
// This middleware makes req.body available with parsed JSON data
app.use(express.json());

// Parse URL-encoded form data (like traditional form submissions)
// Extended option allows for rich objects and arrays to be encoded
app.use(express.urlencoded({ extended: true }));

// Mount product-related routes under the /api/products path
// All routes defined in productRoutes will be prefixed with this
app.use('/api/products', productRoutes);

// Seed function checks if database is empty and populates it with initial data
// This is useful for development and demo purposes
const seedDatabase = async () => {
  const Product = require('./models/Product');
  try {
    // Count existing products to avoid duplicating seed data
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('📦 Seeding database...');
      const seedProducts = require('./seedData');
      // Insert all seed products in one batch operation for efficiency
      await Product.insertMany(seedProducts);
      console.log('✅ Database seeded!');
    }
  } catch (err) {
    console.error('Seeding error:', err);
  }
};
seedDatabase();

// Global error handler middleware catches any errors that occur in routes
// It prevents the server from crashing and sends a proper error response
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// Use PORT from environment variables, fallback to 5000 for local development
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));