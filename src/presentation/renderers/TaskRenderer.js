import { DEFAULT_LISTS } from '../../utils/Constants';
import { format } from 'date-fns';

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

  renderTask(id, title) {
    const li = document.createElement('li');
    li.setAttribute('data-id', id);
    li.className = 'task-list-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = title;
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'input-wrapper';
    inputWrapper.appendChild(checkbox);
    inputWrapper.appendChild(label);

    const rowTop = document.createElement('div');
    rowTop.className = 'row-top';
    const priority = document.createElement('span');
    priority.className = 'priority';
    priority.textContent = '!!';

    const rowBottom = document.createElement('div');
    rowBottom.className = 'row-bottom';
    const due = document.createElement('span');
    due.className = 'due';
    due.textContent = `Due tomorrow`;
    const customListName = document.createElement('span');
    customListName.className = 'custom-list';
    customListName.textContent = `Work`

    rowBottom.appendChild(due);
    rowBottom.appendChild(customListName);

    rowTop.appendChild(inputWrapper);
    rowTop.appendChild(priority);

    li.appendChild(rowTop);
    li.appendChild(rowBottom);

    return li;
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
