// CRUD operations, data management
import Task from "./Task";

class TaskManager {
  constructor(storageAdapter) {
    this.storage = storageAdapter;
    this.tasks = [];
  }

  addTask(title, description, scheduleDate, deadlineDate, priority) {
    const task = new Task(title, description, scheduleDate, deadlineDate, priority);
    this.tasks.push(task);
  }

  deleteTask(taskId) {
    // delete task
  }

  editTask(taskId) {
    // edit task
  }

  getAllTasks() {
    return this.tasks;
  }
}


export default TaskManager;