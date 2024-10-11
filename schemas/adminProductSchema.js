const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productRating: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    inStock: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    productImages: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: {
          type: String,
          default: "Amazon Products",
        },
      },
    ],

    productSpecifications: {
      color: String,
      size: String,
      weight: String,
      material: String,
      dimensions: String,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          required: true,
        },
        comments: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", productSchema);
module.exports = Products;
