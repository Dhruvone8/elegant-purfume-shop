const mongoose = require("mongoose");

// Define the structure of a product document in MongoDB
// Each field has validation rules and constraints
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,  // Product must have a name
      trim: true,      // Remove whitespace from start/end automatically
    },
    description: {
      type: String,
      required: true,  // Short description for product cards
    },
    fullDescription: {
      type: String,
      required: true,  // Longer description for product detail page
    },
    price: {
      type: Number,
      required: true,
      min: 0,          // Price can't be negative
    },
    originalPrice: {
      type: Number,
      min: 0,          // Used to show discounts, optional field
    },
    category: {
      type: String,
      required: true,
      // Restrict to predefined categories for consistency
      enum: ["Men", "Women", "Unisex", "Luxury", "Premium"],
    },
    brand: {
      type: String,
      required: true,  // Every product needs a brand name
    },
    type: {
      type: String,
      required: true,
      // Define allowed perfume types
      enum: ["Eau de Parfum", "Eau de Toilette", "Cologne", "Perfume Oil"],
    },
    gender: {
      type: String,
      required: true,
      // Target audience for the fragrance
      enum: ["Men", "Women", "Unisex"],
    },
    images: [
      {
        type: String,
        required: true,  // Store image URLs as strings in an array
      },
    ],
    sizes: [
      {
        type: String,
        required: true,  // Available bottle sizes (e.g., "50ml", "100ml")
      },
    ],
    rating: {
      type: Number,
      default: 0,      // Start with 0 rating, will be calculated from reviews
      min: 0,
      max: 5,          // Rating scale is 0-5 stars
    },
    reviewsCount: {
      type: Number,
      default: 0,      // Track total number of reviews for display
    },
    isNewArrival: {
      type: Boolean,
      default: false,  // Flag to highlight new products
    },
    inStock: {
      type: Boolean,
      default: true,   // Assume products are in stock by default
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    // Useful for sorting and tracking when products were added/modified
    timestamps: true,
  }
);

// Custom method to recalculate average rating when reviews change
// This keeps the product rating in sync with its reviews
productSchema.methods.updateRating = async function () {
  // Get access to Review model (can't require at top due to circular dependency)
  const Review = mongoose.model("Review");
  
  // Fetch all reviews for this specific product
  const reviews = await Review.find({ product: this._id });

  if (reviews.length > 0) {
    // Calculate average rating by summing all ratings and dividing by count
    const avgRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    
    // Round to 1 decimal place for cleaner display (e.g., 4.7 instead of 4.6666)
    this.rating = Math.round(avgRating * 10) / 10;
    this.reviewsCount = reviews.length;
  } else {
    // Reset to 0 if no reviews exist
    this.rating = 0;
    this.reviewsCount = 0;
  }

  // Save the updated product document with new rating
  await this.save();
};

// Export the model so we can use it in other files
// Mongoose will create a "products" collection based on this schema
module.exports = mongoose.model("Product", productSchema);