import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  favotite:[String]
});

const UserModel = model("users", UserSchema);
export default UserModel;
