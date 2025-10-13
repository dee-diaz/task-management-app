import { DEFAULT_LISTS, PRIORITY } from '../../utils/Constants';
import { format } from 'date-fns';
import FilterService from '../../services/FilterService';

class TaskRenderer {
  constructor(container) {
    this.container = container;
  }

  renderListTitle(listId) {
    const main = document.querySelector('.main');
    const h1 = document.querySelector('#list-title');
    h1.textContent = listId;

    if (listId === DEFAULT_LISTS.TODAY.id) {
      const today = format(new Date(), 'EEEE, MMMM d');
      const para = document.createElement('p');
      para.id = 'todays-date';
      para.textContent = today;
      const secondChild = main.children[1];
      main.insertBefore(para, secondChild);
    }
  }

  renderTask(id, title, deadlineDate, priority, list) {
    const li = document.createElement('li');
    li.setAttribute('data-id', id);
    li.className = 'task-list-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const label = document.createElement('label');
    label.textContent = title;
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'input-wrapper';
    inputWrapper.appendChild(checkbox);
    inputWrapper.appendChild(label);

    const rowTop = document.createElement('div');
    rowTop.className = 'row-top';
    const span = document.createElement('span');
    span.className = `priority ${priority.toLowerCase()}`;
    switch (priority) {
      case PRIORITY.LOW:
        span.textContent = '!';
        checkbox.classList.add(PRIORITY.LOW.toLowerCase());
        break;
      case PRIORITY.MEDIUM:
        span.textContent = '!!';
        checkbox.classList.add(PRIORITY.MEDIUM.toLowerCase());
        break;
      case PRIORITY.HIGH:
        span.textContent = '!!!';
        checkbox.classList.add(PRIORITY.HIGH.toLowerCase());
        break;
    }

    const rowBottom = document.createElement('div');
    rowBottom.className = 'row-bottom';
    const due = document.createElement('span');
    due.className = 'due';
    if (deadlineDate) due.textContent = `Due ${deadlineDate}`;
    const customListName = document.createElement('span');
    customListName.className = 'custom-list';
    customListName.textContent = list;

    rowBottom.appendChild(due);
    rowBottom.appendChild(customListName);

    rowTop.appendChild(inputWrapper);
    rowTop.appendChild(span);

    li.appendChild(rowTop);
    li.appendChild(rowBottom);

    return li;
  }

  renderTaskList(tasks) {
    const taskList = document.querySelector('.task-list');
    this.cleanTaskList(taskList);
    tasks.forEach((task) => {
      const customList = FilterService.defineCustomList(task);
      const li = this.renderTask(
        task._id,
        task.title,
        task.deadlineDate,
        task.priority,
        customList,
      );
      taskList.appendChild(li);
    });
  }

  cleanTaskList(listEl) {
    listEl.innerHTML = '';
  }

  init() {
    const main = document.createElement('div');
    main.className = 'main';

    const h1 = document.createElement('h1');
    h1.id = 'list-title';

    const addBtn = document.createElement('button');
    addBtn.className = 'btn btn-add';
    addBtn.id = 'btn-add';
    addBtn.textContent = 'Add new task';

    const ul = document.createElement('ul');
    ul.className = 'task-list';

    main.appendChild(h1);
    main.appendChild(addBtn);
    main.appendChild(ul);
    this.container.appendChild(main);
  }
}

export default TaskRenderer;
