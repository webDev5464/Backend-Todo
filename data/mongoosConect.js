import mongoose from "mongoose";

/*
!local host code
mongoose.connect('mongodb://127.0.0.1:27017/todoData').then(()=> {
  console.log('Connected Mongoose');
})
*/

//! deploy code
const ConnectDb = async (MONGO_URI) => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connect mongoose atlas db"));
};

export default ConnectDb;
