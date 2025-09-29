import TaskManager from "./domain/TaskManager";
import FilterService from "./services/FilterService";
import LocalStorageAdapter from "./infrastructure/LocalStorageAdapter";
import SidebarRenderer from "./presentation/renderers/SidebarRenderer";
import ModalRenderer from "./presentation/renderers/ModalRenderer";
import ModalHandler from "./presentation/handlers/ModalHandler";
import { DEFAULT_LISTS, customLists } from "./utils/Constants";

// Orchestrates all layers, manages application state
class App {
  constructor() {
    this.firstStart = true;
    this.container = document.querySelector("#content");
    this.storage = new LocalStorageAdapter();
    this.taskManager = new TaskManager(this.storage);
    // this.sidebar = new SidebarRenderer(this.container);
    this.modal = new ModalRenderer(this.container);
    // this.updateSidebarCounters();
    this.showModal();
    this.modalHandler = new ModalHandler(this.modal);
    // this.bindEvents();
  }

  showModal() {
    if (this.firstStart === true) this.modal.showOnboardingModal();
  }

  // Sidebar interactions
  updateSidebarCounters() {
    const tasks = this.taskManager.getTasks();
    const mergedLists = {...DEFAULT_LISTS, ...customLists};

    Object.values(mergedLists).forEach((list) => {
      const count = FilterService.filterByList(tasks, list.id).length;
      this.sidebar.updateListCounter(list.id, count);
    });
  }

  saveUserName(name) {
    this.storage.save("user_name", name);
  }

  bindEvents() {
    // some code;
  }
}

export default App;
