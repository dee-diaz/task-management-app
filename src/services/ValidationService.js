// Task/List validation rules
class ValidationService {
  static validateInput(input) {
    const minLength = 1;
    if (input.trim().length < minLength) {
      console.warn('Title should be at least 1 character');
      document.querySelector("#task-title").focus();
      return false;
    } else {
      return true;
    }
  }
}

export default ValidationService;
