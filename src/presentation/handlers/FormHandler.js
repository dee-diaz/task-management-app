// Form interaction management
class FormHandler {
  constructor(formReference) {
    this.form = formReference;
  }

  handleDateSelect() {
    console.log('Choose a date');
  }

  handlePrioritySelect() {
    console.log('Choose a priority');
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
