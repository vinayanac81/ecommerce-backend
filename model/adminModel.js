import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
});

const adminModel = mongoose.model("admin", adminSchema);

export default adminModel;
