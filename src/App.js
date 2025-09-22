import TaskManager from "./domain/TaskManager";
import LocalStorageAdapter from "./infrastructure/LocalStorageAdapter";
import SidebarRenderer from "./presentation/renderers/SidebarRenderer";


// Orchestrates all layers, manages application state
class App {
  constructor() {
    this.container = document.querySelector("#content");
    this.storage = new LocalStorageAdapter();
    this.taskManager = new TaskManager(this.storage);
    this.sidebar = new SidebarRenderer(this.container);
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