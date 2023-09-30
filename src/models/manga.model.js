import { Schema, model } from "mongoose";

const MankaSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  img: String,
  imgHeader: String,
  author: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  describe: String,
  genres: [String],
});

const MankaModel = model("mankas", MankaSchema);
export default MankaModel;
