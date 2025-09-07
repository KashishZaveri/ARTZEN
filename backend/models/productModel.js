import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: {
      public_id: { type: String },
      secure_url: { type: String },
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
