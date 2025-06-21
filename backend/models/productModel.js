import { mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
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
}, {
    timestamps: true,   //createdAt, updatedAt
});
const Product = mongoose.model("Product", productSchema);
export default Product;