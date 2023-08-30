import express from "express";
//* npm i mongoose
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  heading: String,
  title: String,
  date: String,
  time: String,
  des: String,
});

const TodoDataDb = mongoose.model("TodoData", UserSchema);

export default TodoDataDb;
