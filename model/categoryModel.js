import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  category_name: {
    type: String,
  },
});

const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
