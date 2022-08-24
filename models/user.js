import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  since: {
    type: Date,
  },
  cocktails: { value: String },
});

mongoose.models = {};

const User = mongoose.model("User", user);

export default User;
