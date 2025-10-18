import { PRIORITY } from "../../utils/Constants";

// Form interaction management
class FormHandler {
  constructor(formReference) {
    this.form = formReference;
  }

  handlePrioritySelect(e) {
    const priorityInput = document.querySelector('#priority');

    const listItems = document.querySelectorAll('.priority-picker li');
    listItems.forEach(item => item.classList.remove('active'));

    const selectedListItem = e.target.closest('li');
    selectedListItem.classList.add('active');

    if (selectedListItem.id === 'low-priority') priorityInput.value = PRIORITY.LOW;
    if (selectedListItem.id === 'medium-priority') priorityInput.value = PRIORITY.MEDIUM;
    if (selectedListItem.id === 'high-priority') priorityInput.value = PRIORITY.HIGH;
  }

  handleListSelect(e) {
    if (e.target.matches('h5')) return;
    const listInput = document.querySelector('#list');
    listInput.value = e.target.textContent;
  }

  saveFormData(form) {
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    console.log(values);
    return values;
  }
}

export default FormHandler;
