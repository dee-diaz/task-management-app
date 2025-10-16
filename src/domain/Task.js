import { format } from 'date-fns';

// Task model, basic task operations
class Task {
  constructor(title, description, scheduleDate, deadlineDate, priority, id) {
    this._id = id || crypto.randomUUID();
    this._creationDate = createDate();
    this.title = title;
    this.description = description;
    this.scheduleDate = scheduleDate;
    this.deadlineDate = deadlineDate;
    this.priority = priority;
    this._lists = ['All tasks'];
  }
}

function createDate() {
  const now = new Date();
  return format(now, 'dd-MM-yyyy HH:mm');
}

export default Task;
