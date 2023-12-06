import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  user_id: {
    type: String,
  },
  cart_products: {
    type: Array,
  },
  cart_count: {
    type: Number,
  },
});

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
