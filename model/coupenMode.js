import mongoose from "mongoose";

const coupenSchema = mongoose.Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
  },
  discount: {
    type: Number,
  },
  min_amount: {
    type: Number,
  },
  max_discount: {
    type: Number,
  },
  create_date: {
    type: Date,
  },
  expiry_date: {
    type: Date,
  },
  is_deleted: {
    type: Boolean,
  },
});

const coupenModel = mongoose.model("coupen", coupenSchema);

export default coupenModel;
