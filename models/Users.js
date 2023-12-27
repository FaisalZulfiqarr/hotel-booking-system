const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  role: { type: String, required: true }, // String is shorthand for {type: String}
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNo: { type: Number, required: true, unique: true },
  address: { type: String, required: true },
  salary: { type: Number, required: true },
  age: { type: Number },
  gender: { type: String },
  dateOfBirth: { type: Date },
  createdAt: { type: Date, default: Date.now },
});
const Users = mongoose.model("users", UserSchema);
// for creating index in mongodb so that email should be unique:
// User.createIndexes();
module.exports = Users;
