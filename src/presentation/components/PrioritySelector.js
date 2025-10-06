// Reusable priority selector UI component
import { PRIORITY } from '../../utils/Constants';

class PriorityPicker {
  constructor() {
    this.picker = this.createPriorityPicker();
  }

  createPriorityPicker() {
    const container = document.createElement('div');
    container.className = 'priority-picker';
    const title = document.createElement('h5');
    title.textContent = 'Priority';
    const list = document.createElement('ul');
    const values = ['None', 'Low', 'Medium', 'High'];

    for (let i = 0; i < 4; i++) {
      const li = document.createElement('li');
      const button = document.createElement('button');
      const exclamation = document.createElement('span');
      exclamation.textContent = '!'.repeat(i);
      button.appendChild(exclamation);
      button.textContent = values[i];
      li.appendChild(button);
      list.appendChild(li);
    }

    container.appendChild(title);
    container.appendChild(list);
    return container;
  }

  showPicker() {
    const container = document.querySelector('.row-3');
    container.appendChild(this.picker);
  }
}

export default PriorityPicker;
