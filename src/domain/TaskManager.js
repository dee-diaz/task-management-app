// CRUD operations, data management
import Task from "./Task";
import { DEFAULT_LISTS } from "../utils/Constants";

class TaskManager {
  constructor(storageAdapter) {
    this.storage = storageAdapter;
    this.tasks = this.loadTasks();
  }

  loadTasks() {
    const tasks = this.storage.get("tasks");
    return (tasks !== null) ? tasks : [];
  }

  getTasks() {
    console.table(this.tasks);
    return this.tasks;
  }

  saveTask(title, description, scheduleDate, deadlineDate, priority, list) {
    const newTask = new Task(title);
    (description) ? newTask.description = description : newTask.description = "";
    (scheduleDate) ? newTask.scheduleDate = scheduleDate : newTask.scheduleDate = DEFAULT_LISTS.TODAY.id;
    (deadlineDate) ? newTask.deadlineDate = deadlineDate : newTask.deadlineDate = "";
    (priority) ? newTask.priority = priority : newTask.priority = "";
    if (list) newTask._lists.push(list); // List class logic - refactor later
    this.tasks.push(newTask);
    this.storage.save("tasks", this.tasks);

    // Debug logs
    console.log("Task saved", newTask);
    console.table(this.storage.get("tasks"));

    return newTask;
  }

  deleteTask(taskId) {
    const deletedTask = this.tasks.find(task => task._id === taskId);
    const index = this.tasks.findIndex(task => task._id === taskId);
    if (index !== -1) this.tasks.splice(index, 1);
    this.storage.save("tasks", this.tasks);

    // Debug logs
    console.log(`Task '${deletedTask.title}' has been deleted`);
    console.table(this.tasks);

    return deletedTask;
  }

  editTask(taskId) {
    const taskToEdit = this.tasks.find(task => task._id === taskId);
    const index = this.tasks.findIndex(task => task._id === taskId);
    const id = taskToEdit.id;

    // some logic
  }
}


export default TaskManager;