import mongoose from "mongoose";
import Product from "../models/productModel.js";

// Get all products

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    if (!name || !description || !price || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      user: req.user.id, // ensure req.user is populated from auth middleware
    });

    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error saving product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// delete
export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Ownership check
    if (product.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this product",
      });
    }

    await product.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};