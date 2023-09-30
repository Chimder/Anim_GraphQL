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
  favorite:[String]
});

const UserModel = model("users", UserSchema);
export default UserModel;
