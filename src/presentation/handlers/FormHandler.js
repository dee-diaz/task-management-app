// Form interaction management
class FormHandler {
  constructor(formReference) {
    this.form = formReference;
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submitted')
  }
}


export default FormHandler;
