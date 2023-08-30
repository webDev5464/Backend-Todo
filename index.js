import express from "express";
import cors from "cors";
import TodoDataDb from "./data/todoData.js";
import "./data/mongoosConect.js";

import dotenv from "dotenv";
dotenv.config();
import ConnectDb from "./data/mongoosConect.js";
ConnectDb(process.env.MONGO_URI);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h2>Backend already running</h2>");
});

//! Add data in mongoDb
app.post("/todoData", async (req, res) => {
  console.log(req.body);
  //? Create a new file
  const data = await TodoDataDb({
    heading: req.body.heading,
    title: req.body.title,
    date: req.body.date,
    time: req.body.time,
    des: req.body.des,
  });

  await data.save();

  const result = await data.save();
  if (result) {
    res.send({ success: true, message: "Your todo-list added" });
  } else {
    res.send({ success: false, message: "Error !" });
  }
});

//! Render data in frontend
app.get("/renderTodo", async (req, res) => {
  const RenderTodoData = await TodoDataDb.find({});
  res.send({ success: true, RenderTodoData: RenderTodoData });
});

//! Remove Data frontend true in backend
app.delete("/deleteTodo/:id", async (req, res) => {
  await TodoDataDb.findByIdAndDelete(req.params.id).then(() => {
    if (TodoDataDb) {
      res.send({ success: true, message: "delete list" });
    } else {
      res.send({ success: false, message: "Error !" });
    }
  });
});

// app.listen(3005, () => console.log("backend Started : 3005"));

//! deploy code
app.listen(process.env.PORT, () => console.log("localhost : 3005"));
