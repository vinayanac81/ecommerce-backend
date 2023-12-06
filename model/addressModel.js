import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  user_id: {
    type: mongoose.Types.ObjectId
  },
  email: {
    type: String,
  },
  phone_number: {
    type: Number,
  },
  // second_phone_number: {
  //   type: Number,
  // },
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
  state:{
    type:String
  }
});

const addressModel = mongoose.model("address", addressSchema);
export default addressModel;
