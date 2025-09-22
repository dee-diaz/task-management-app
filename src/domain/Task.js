// Task model, basic task operations
class Task {
  constructor(title, description, scheduleDate, deadlineDate, priority) {
    this._id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.scheduleDate = scheduleDate;
    this.deadlineDate = deadlineDate;
    this.priority = priority;
    this._lists = ["All tasks"];
  }
}



export default Task;