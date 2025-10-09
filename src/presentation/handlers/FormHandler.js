// Form interaction management
class FormHandler {
  constructor(formReference) {
    this.form = formReference;
  }

  handleDateSelect() {
    console.log('Choose a date');
  }

  handlePrioritySelect(e) {
    const picker = document.querySelector('.priority-picker');
    const priorityInput = document.querySelector('#priority');

    if (e.target.matches('.text')) {
      priorityInput.value = e.target.textContent;
    } else if (e.target.matches('.exclamation')) {
      priorityInput.value = e.target.nextElementSibling.textContent;
    } else {
      priorityInput.value = e.target.children[1].textContent;
    }
    picker.classList.remove('visible');
  }

  handleListSelect(e) {
    console.log('Choose a list');
    const picker = document.querySelector('.list-picker');
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('Submitted');
  }
}


export default FormHandler;
