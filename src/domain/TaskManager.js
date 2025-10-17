// CRUD operations, data management
import Task from './Task';
import { DEFAULT_LISTS, customLists } from '../utils/Constants';

class TaskManager {
  constructor(storageAdapter) {
    this.storage = storageAdapter;
    this.tasks = this.loadTasks();
  }

  loadTasks() {
    const tasks = this.storage.get('tasks');
    return tasks !== null ? tasks : [];
  }

  getTask(taskId) {
    const tasks = this.storage.get('tasks');
    const task = tasks.filter((task) => task._id === taskId)[0];
    console.log(task);
    return task;
  }

  getTasks() {
    return this.tasks;
  }

  saveTask(title, description, scheduleDate, deadlineDate, priority, list, id) {
    const newTask = new Task(title);
    description
      ? (newTask.description = description)
      : (newTask.description = '');
    scheduleDate
      ? (newTask.scheduleDate = scheduleDate)
      : (newTask.scheduleDate = DEFAULT_LISTS.TODAY.id);
    deadlineDate
      ? (newTask.deadlineDate = deadlineDate)
      : (newTask.deadlineDate = '');
    priority ? (newTask.priority = priority) : (newTask.priority = '');

    // List logic
    if (scheduleDate === 'Today' || !scheduleDate) newTask._lists.push('Today');
    if (list) newTask._lists.push(list);
    if (id) newTask._id = id;
    this.tasks.push(newTask);
    this.storage.save('tasks', this.tasks);

    // Debug logs
    console.log('Task saved', newTask);
    console.table(this.storage.get('tasks'));

    return newTask;
  }

  deleteTask(taskId) {
    const deletedTask = this.tasks.find((task) => task._id === taskId);
    if (!deletedTask) {
      console.warn('Task to delete not found by ID');
      return;
    }
    const index = this.tasks.findIndex((task) => task._id === taskId);
    if (index !== -1) this.tasks.splice(index, 1);
    this.storage.save('tasks', this.tasks);

    // Debug log
    console.log(`Task '${deletedTask.title}' has been deleted`);

    return deletedTask;
  }

  editTask(taskId, formData) {
    const tasks = this.storage.get('tasks');
    const index = tasks.findIndex((task) => task._id === taskId);
    const task = tasks[index];

    if (index !== -1) {
      task.title = formData['task-title'];
      task.description = formData['task-description'];
      task.scheduleDate = formData['task-schedule'];
      task.deadlineDate = formData['task-deadline'];
      task.priority = formData['priority'];

      if (formData['list']) {
        task._lists.forEach((list, index) => {
          if (customLists[list.toLowerCase()]) {
            task._lists[index] = formData['list'];
          }
        });
      }

      this.tasks = tasks;
      this.storage.save('tasks', this.tasks);
    }
  }

  toggleCompletion(taskId, state) {
    const tasks = this.storage.get('tasks');
    const index = tasks.findIndex((task) => task._id === taskId);
    const task = tasks[index];
    task.completed = state;

    if (task.completed && (!task._lists.includes(DEFAULT_LISTS.COMPLETED.id))) {
      task._lists.push(DEFAULT_LISTS.COMPLETED.id);
    } else {
      const index = task._lists.findIndex(
        (list) => list === DEFAULT_LISTS.COMPLETED.id,
      );
      task._lists.splice(index, 1);
    }

    this.tasks = tasks;
    this.storage.save('tasks', this.tasks);
  }
}

export default TaskManager;
