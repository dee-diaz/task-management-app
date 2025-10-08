// Reusable priority selector UI component
import { PRIORITY } from '../../utils/Constants';

class PriorityPicker {
  constructor() {
    this.create();
  }

  create() {
    const container = document.createElement('div');
    container.className = 'priority-picker';
    const title = document.createElement('h5');
    title.textContent = 'Priority';
    const list = document.createElement('ul');

    for (let i = 0; i < Object.values(PRIORITY).length; i++) {
      const li = document.createElement('li');
      li.id = Object.values(PRIORITY)[i].toLowerCase() + '-priority';
      const exclamation = document.createElement('span');
      exclamation.className = 'exclamation';
      const text = document.createElement('span');
      text.className = 'text';
      text.textContent = Object.values(PRIORITY)[i];
      exclamation.textContent = '!'.repeat(i + 1);

      switch (Object.values(PRIORITY)[i]) {
        case 'Low':
          exclamation.classList.add('low');
          break;
        case 'Medium':
          exclamation.classList.add('medium');
          break;
        case 'High':
          exclamation.classList.add('high');
          break;
      }

      li.appendChild(exclamation);
      li.appendChild(text);
      list.appendChild(li);
    }

    container.appendChild(title);
    container.appendChild(list);

    const mainContainer = document.querySelector('.row-3');
    mainContainer.appendChild(container);
  }

  show() {
    const picker = document.querySelector('.priority-picker');
    if (!picker.classList.contains('visible')) picker.classList.add('visible');
  }
}

export default PriorityPicker;
