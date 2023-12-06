import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
  brand_name: {
    type: String,
  },
});

const brandModel = mongoose.model("brand", brandSchema);

export default brandModel;
