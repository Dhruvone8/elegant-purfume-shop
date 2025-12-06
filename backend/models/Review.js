const mongoose = require('mongoose');

// Define what a review looks like in our database
// Reviews are separate documents linked to products
const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to a Product document
    ref: 'Product',                         // Tells Mongoose this links to Product model
    required: true                          // Every review must belong to a product
  },
  name: {
    type: String,
    required: true,  // Reviewer's name
    trim: true,      // Clean up any extra whitespace
  },
  rating: {
    type: Number,
    required: true,
    min: 1,          // Minimum 1 star
    max: 5           // Maximum 5 stars
  },
  comment: {
    type: String,
    required: true,  // The actual review text
    trim: true,
  }
}, {
  // Automatically track when reviews are created/updated
  // This lets us show "Reviewed on [date]" to users
  timestamps: true
});

// Post-save hook runs automatically after a review is saved
// This ensures the product's rating updates immediately when someone reviews it
reviewSchema.post('save', async function() {
  // Get the Product model to access the product this review is for
  const Product = mongoose.model('Product');
  
  // Find the product that was just reviewed
  const product = await Product.findById(this.product);
  
  if (product) {
    // Trigger the custom updateRating method we defined in Product model
    // This recalculates the average rating based on all reviews
    await product.updateRating();
  }
});

// Export the Review model for use in controllers and routes
module.exports = mongoose.model('Review', reviewSchema);