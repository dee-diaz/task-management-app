import TaskManager from "./domain/TaskManager";
import FilterService from "./services/FilterService";
import LocalStorageAdapter from "./infrastructure/LocalStorageAdapter";
import SidebarRenderer from "./presentation/renderers/SidebarRenderer";
import { DEFAULT_LISTS, customLists } from "./utils/Constants";

// Orchestrates all layers, manages application state
class App {
  constructor() {
    this.container = document.querySelector("#content");
    this.storage = new LocalStorageAdapter();
    this.taskManager = new TaskManager(this.storage);
    this.sidebar = new SidebarRenderer(this.container);
    this.updateSidebarCounters();
    // this.#bindEvents();
  }

  // Sidebar interactions
  updateSidebarCounters() {
    const tasks = this.taskManager.getTasks();

    Object.values(DEFAULT_LISTS).forEach((list) => {
      const count = FilterService.filterByList(tasks, list.id).length;
      this.sidebar.updateListCounter(list.id, count);
    });

    Object.values(customLists).forEach(list => {
      const count = FilterService.filterByList(tasks, list.id).length;
      this.sidebar.updateListCounter(list.id, count);
    })
  }

  saveUserName(name) {
    this.storage.save("user_name", name);
  }

  #bindEvents() {
    // some code;
  }
}

export default App;
