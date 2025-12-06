const Product = require('../models/Product');
const Review = require('../models/Review');

// Fetch all products that are currently in stock
// We sort by creation date (newest first) to show latest additions prominently
exports.getAllProducts = async (req, res) => {
  try {
    // Find only products marked as in stock, sort descending by creation date
    const products = await Product.find({ inStock: true }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    // If database query fails, send error response with details
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Retrieve a single product by its unique MongoDB ID
// This is used for the product detail page
exports.getProductById = async (req, res) => {
  try {
    // Extract ID from URL parameters and query database
    const product = await Product.findById(req.params.id);
    
    // If no product found with this ID, return 404 status
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Get all reviews for a specific product
// Reviews are sorted newest first so users see recent feedback
exports.getProductReviews = async (req, res) => {
  try {
    // Find reviews where the product field matches our product ID
    // Sort by creation date in descending order (newest on top)
    const reviews = await Review.find({ product: req.params.id }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Create a new review for a product
// This validates input and saves the review to the database
exports.addProductReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    
    // Validate that all required fields are present
    // Without this check, incomplete reviews could be saved
    if (!name || !rating || !comment) {
      return res.status(400).json({ message: 'Please provide name, rating, and comment' });
    }
    
    // Ensure rating is within valid range (1-5 stars)
    // This prevents invalid ratings like 0 or 10
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    
    // Verify the product exists before allowing a review
    // This prevents reviews for non-existent products
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Create new review document with the validated data
    const review = new Review({
      product: req.params.id,
      name,
      rating,
      comment
    });
    
    // Save to database and return success response with the created review
    // The 201 status code indicates successful resource creation
    await review.save();
    
    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error: error.message });
  }
};