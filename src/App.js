import TaskManager from './domain/TaskManager';
import FilterService from './services/FilterService';
import LocalStorageAdapter from './infrastructure/LocalStorageAdapter';
import SidebarRenderer from './presentation/renderers/SidebarRenderer';
import ModalRenderer from './presentation/renderers/ModalRenderer';
import ModalHandler from './presentation/handlers/ModalHandler';
import { DEFAULT_LISTS, customLists } from './utils/Constants';
import TaskRenderer from './presentation/renderers/TaskRenderer';

// Orchestrates all layers, manages application state
class App {
  constructor() {
    this.activeListId = DEFAULT_LISTS.TODAY.id;
    this.storage = new LocalStorageAdapter();
    this.taskManager = new TaskManager(this.storage);
    this.firstStart = this.checkFirstStart();
    this.userName;
    this.container = document.querySelector('#content');
    this.sidebar = new SidebarRenderer(this.container);
    this.modal = new ModalRenderer(this.container);
    this.modalHandler = new ModalHandler(this.modal, (userName) => {
      this.handleOnboardingComplete(userName);
    });
    this.taskRenderer = new TaskRenderer(this.container);
    this.init();
    this.bindEvents();
  }

  checkFirstStart() {
    return this.storage.get('user-name') === null;
  }

  loadUserName() {
    this.userName = this.storage.get('user-name');
  }

  // Sidebar interactions
  updateSidebarCounters() {
    const tasks = this.taskManager.getTasks();
    const mergedLists = { ...DEFAULT_LISTS, ...customLists };

    Object.values(mergedLists).forEach((list) => {
      const count = FilterService.filterByList(tasks, list.id).length;
      this.sidebar.updateListCounter(list.id, count);
    });
  }

  handleOnboardingComplete(userName) {
    this.storage.save('user-name', userName);
    this.userName = userName;
    this.renderMainApp();
  }

  renderMainApp() {
    this.sidebar.init(this.userName);
    this.sidebar.setActiveList(this.activeListId);
    this.updateSidebarCounters();
    this.taskRenderer.init();
    this.taskRenderer.renderListTitle(this.activeListId);
  }

  init() {
    if (this.firstStart === true) {
      this.modal.showOnboardingModal();
    } else {
      this.loadUserName();
      this.renderMainApp();
    }
  }

  bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('#btn-add')) {
        console.log("yes you clicked, so what?")
      }
    })
  }

  
}

export default App;
