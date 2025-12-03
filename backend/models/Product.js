const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Unisex", "Luxury", "Premium"],
    },
    brand: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Eau de Parfum", "Eau de Toilette", "Cologne", "Perfume Oil"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Unisex"],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    sizes: [
      {
        type: String,
        required: true,
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Update rating when reviews change
productSchema.methods.updateRating = async function () {
  const Review = mongoose.model("Review");
  const reviews = await Review.find({ product: this._id });

  if (reviews.length > 0) {
    const avgRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    this.rating = Math.round(avgRating * 10) / 10;
    this.reviewsCount = reviews.length;
  } else {
    this.rating = 0;
    this.reviewsCount = 0;
  }

  await this.save();
};

module.exports = mongoose.model("Product", productSchema);
