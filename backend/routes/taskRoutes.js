import express from "express";
import { Router } from "express";
import UserTask from "../models/userTask.js";
import User from "../models/users.js";

const routes = Router();

routes.post("/addTask", async (req, res) => {
  try {
    const { task, email } = req.body;

    const UserFound = await UserTask.findOne({ email });

    if (!UserFound) {
      const newUser = new UserTask({
        email,
        tasks: [{ task }],
      });
      await newUser.save();
      res.json({ success: true });
    }

    UserFound.tasks.push({ task });
    await UserFound.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
});

routes.post("/tasks", async (req, res) => {
  try {
    const { email } = req.body;
    const UserFound = await User.findOne({ email });

    if (!UserFound) {
      res.status(400).json({ success: false, message: "No User Found" });
    }

    const alltasks = await UserTask.findOne({ email });
    if (!alltasks) res.status(200).json([]);

    res.status(200).json(alltasks.tasks);
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
});

routes.post("/updateTask", async (req, res) => {
  try {
    const { _id, msg, email } = req.body;

    const UserFound = await UserTask.findOne({ email });

    if (!UserFound) res.status(404).json({ message: "User not found" });

    const taskToUpdate = UserFound.tasks.id(_id);

    if (!taskToUpdate) {
      return res.status(404).json({ message: "Task not found" });
    }

    taskToUpdate.task = msg;

    await UserFound.save();
     res.status(200).json({ success: true, data: UserFound });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
});

routes.post("/deleteTask/:_id", async (req, res) => {
  try {
    const {_id} = req.params;
    const {email} = req.body;
    const UserFound = await UserTask.findOne({email});

    if(!UserFound)
         res.status(404).json({message: "User not found" });

    UserFound.tasks = UserFound.tasks.filter((t)=> t._id != _id);
    await UserFound.save();
      
    res.status(200).json({message: "Task Deleted Successfully"});

  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
});

export default routes;
