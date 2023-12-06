import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  order_id: {
    type: String,
  },
  user_id: {
    type: mongoose.Types.ObjectId
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone_number: {
    type: Number,
  },
  second_phone_number: {
    type: Number,
  },
  address: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  district: {
    type: String,
  },
  place: {
    type: String,
  },
  total_price: {
    type: Number,
  },
  date: {
    type: Date,
  },
  product: {
    type: Object,
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

const bookingModel = mongoose.model("booking", bookingSchema);

export default bookingModel;
