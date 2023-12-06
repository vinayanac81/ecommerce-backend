import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  product_name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },
  sub_category: {
    type: String,
  },
  stock: {
    type: Number,
  },
  image: {
    type: String,
  },
  disable: {
    type: Boolean,
  },
});

const productModel = mongoose.model("products", productSchema);

export default productModel;
