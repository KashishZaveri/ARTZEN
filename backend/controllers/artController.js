import mongoose from "mongoose";
import Product from "../models/productModel.js";

// 🎯 Fetch a single artwork by ID
export const getSingleArt = async (req, res) => {
  try {
    const art = await Product.findById(req.params.id);

    if (!art) {
      return res.status(404).json({ success: false, message: "Artwork not found" });
    }

    // ✅ Include success flag for consistent frontend checks
    res.status(200).json({ success: true, data: art });
  } catch (error) {
    console.error("Error fetching single artwork:", error);
    res.status(500).json({ success: false, message: "Server Error: Cannot fetch artwork" });
  }
};

// 🖼️ Fetch all artworks for the logged-in user
export const getMyArts = async (req, res) => {
  try {
    const myArts = await Product.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: myArts });
  } catch (error) {
    console.error("Error fetching user artworks:", error);
    res.status(500).json({
      success: false,
      message: "Server Error. Unable to retrieve your artworks.",
    });
  }
};

// 🗑️ Delete an artwork owned by the user
export const deleteMyArt = async (req, res) => {
  try {
    const art = await Product.findById(req.params.id);

    if (!art) {
      return res.status(404).json({ success: false, message: "Artwork not found" });
    }

    if (art.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized: Not your artwork" });
    }

    await art.deleteOne();
    res.status(200).json({ success: true, message: "Artwork deleted successfully" });
  } catch (error) {
    console.error("Error deleting artwork:", error);
    res.status(500).json({ success: false, message: "Server Error. Could not delete artwork." });
  }
};

// ✏️ Update an existing artwork
export const updateMyArt = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Artwork not found" });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error updating artwork:", error);
    res.status(500).json({ success: false, message: "Server Error. Could not update artwork." });
  }
};