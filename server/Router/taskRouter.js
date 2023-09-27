const express = require("express");
const taskRouter = express.Router();
const Task = require("../Model/taskModel");

// Create a Task
taskRouter.post("/addtask", async (req, res) => {
  try {
    const { title, description, dueDate, createdBy } = req.body;
    const task = new Task({ title, description, dueDate, createdBy });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Get all task of user
taskRouter.get("/getalltask/", async (req, res) => {
  try {
    const userId = req.query.authId;
    const tasks = await Task.find({ createdBy: userId });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /tasks/:id: Delete a task by ID
taskRouter.delete("/deletetask/", async (req, res) => {
  const taskId = req.body.id;
  try {
    const task = await Task.findOneAndRemove({ _id: taskId });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(204).send(); // No content response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = taskRouter;
