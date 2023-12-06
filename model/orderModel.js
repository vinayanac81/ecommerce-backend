import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  order_id: {
    type: String,
  },
  address_id: {
    type: mongoose.Types.ObjectId,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
  },
  discount_price: {
    type: Number,
  },
  after_discount: {
    type: Number,
  },
  total_price: {
    type: Number,
  },
  date: {
    type: Date,
  },
  products: {
    type: Array,
  },
  order_status: {
    type: String,
  },
  payment_status: {
    type: String,
  },
  payment_method: {
    type: String,
  },
});

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
