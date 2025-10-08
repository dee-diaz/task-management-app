// Form interaction management
class FormHandler {
  constructor(formReference) {
    this.form = formReference;
  }

  handleDateSelect() {
    console.log('Choose a date');
  }

  handlePrioritySelect(e) {
    console.log(e.target);
  }

  handleListSelect() {
    console.log('Choose a list');
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('Submitted');
  }
}


export default FormHandler;
