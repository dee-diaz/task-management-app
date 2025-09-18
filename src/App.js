import TaskManager from "./domain/TaskManager";
import LocalStorageAdapter from "./infrastructure/LocalStorageAdapter";


// Orchestrates all layers, manages application state
class App {
  constructor() {
    this.storage = new LocalStorageAdapter();
    this.taskManager = new TaskManager(this.storage);
    this.#bindEvents();
  }

  saveUserName(name) {
    this.storage.save('user_name', name);
  }

  #bindEvents() {
    // some code;
  }
}


export default App;