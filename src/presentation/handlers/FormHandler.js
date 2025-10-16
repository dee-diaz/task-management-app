// Form interaction management
class FormHandler {
  constructor(formReference) {
    this.form = formReference;
  }

  handleDateSelect() {
    console.log('Choose a date');
  }

  handlePrioritySelect(e) {
    const priorityInput = document.querySelector('#priority');
    if (e.target.matches('h5')) return;
    if (e.target.matches('.text')) {
      priorityInput.value = e.target.textContent;
    } else if (e.target.matches('.exclamation')) {
      priorityInput.value = e.target.nextElementSibling.textContent;
    } else {
      priorityInput.value = e.target.children[1].textContent;
    }
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
