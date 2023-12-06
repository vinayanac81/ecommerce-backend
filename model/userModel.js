import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  referral_code: {
    type: String,
  },
  referrals: {
    type: Array,
  },
  block: {
    type: Boolean,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  wallet: {
    type: Number,
  },
});

const userModel = mongoose.model("users", userSchema);
export default userModel;
