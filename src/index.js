import "./style.css";
import App from "./App";
import Task from "./domain/Task";
import TaskManager from "./domain/TaskManager";

const taskManager = new TaskManager();

taskManager.addTask("Go for a walk", "nothing really");
taskManager.addTask("Shave ass");
taskManager.addTask("Cook dinner");
taskManager.addTask("Dance");


const tasks = taskManager.getAllTasks();

console.log(tasks)