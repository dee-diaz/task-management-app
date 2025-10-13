import TaskManager from './domain/TaskManager';
import FilterService from './services/FilterService';
import LocalStorageAdapter from './infrastructure/LocalStorageAdapter';
import SidebarRenderer from './presentation/renderers/SidebarRenderer';
import ModalRenderer from './presentation/renderers/ModalRenderer';
import ModalHandler from './presentation/handlers/ModalHandler';
import FormHandler from './presentation/handlers/FormHandler';
import { DEFAULT_LISTS, customLists } from './utils/Constants';
import TaskRenderer from './presentation/renderers/TaskRenderer';
import initDatePickers from './presentation/components/Calendar';
import initDropdowns from './presentation/components/dropdowns';
import ValidationService from './services/ValidationService';

// Orchestrates all layers, manages application state
class App {
  constructor() {
    this.activeListId = DEFAULT_LISTS.ALL_TASKS.id;
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
    this.form = document.querySelector('#form-task');
    this.formHandler = new FormHandler(this.form);
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

  renderTaskList(listId) {
    const taskList = document.querySelector('.task-list');
    this.cleanTaskList(taskList);
    const tasks = this.taskManager.getTasks();
    const tasksFiltered = FilterService.filterByList(tasks, listId);
    tasksFiltered.forEach((task) => {
      const customList = FilterService.defineCustomList(task);
      const li = this.taskRenderer.renderTask(
        task._id,
        task.title,
        task.deadlineDate,
        task.priority,
        customList,
      );
      taskList.appendChild(li);
    });
  }

  cleanTaskList(listEl) {
    listEl.innerHTML = '';
  }

  renderMainApp() {
    this.sidebar.init(this.userName);
    this.sidebar.setActiveList(this.activeListId);
    this.updateSidebarCounters();
    this.taskRenderer.init();
    this.taskRenderer.renderListTitle(this.activeListId);
    this.renderTaskList(this.activeListId);
  }

  init() {
    if (this.firstStart === true) {
      this.modal.showOnboardingModal();
    } else {
      this.loadUserName();
      this.renderMainApp();
      initDatePickers();
      initDropdowns();
    }
  }

  bindEvents() {
    const priorityPicker = document.querySelector('.priority-picker');
    const listPicker = document.querySelector('.list-picker');

    document.addEventListener('click', (e) => {
      if (e.target.matches('#btn-add')) {
        this.modal.showTaskModal();
      }

      if (e.target.matches('#btn-close-modal')) {
        this.modal.closeTaskModal();
      }

      if (e.target.matches('#modal-start .btn-continue')) {
        this.modalHandler.handleStartModalContinue(e);
      }
      if (e.target.matches('#modal-start .btn-skip')) {
        this.modalHandler.handleNameSkip();
      }
      if (
        e.target.matches('#task-schedule') ||
        e.target.matches('#task-deadline')
      ) {
        this.formHandler.handleDateSelect();
      }
      if (e.target.matches('#priority')) {
        priorityPicker.classList.toggle('visible');
      }
      if (e.target.matches('#list')) {
        listPicker.classList.toggle('visible');
      }

      if (e.target.id !== 'priority') {
        priorityPicker.classList.remove('visible');
      }

      if (e.target.id !== 'list') {
        listPicker.classList.remove('visible');
      }
    });

    priorityPicker.addEventListener(
      'click',
      this.formHandler.handlePrioritySelect,
    );

    listPicker.addEventListener('click', this.formHandler.handleListSelect);

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const validatedTitle = ValidationService.validateInput(
      values['task-title'],
    );

    if (validatedTitle) {
      this.taskManager.saveTask(
        values['task-title'],
        values['task-description'],
        values['task-schedule'],
        values['task-deadline'],
        values['priority'],
        values['list'],
      );

      this.form.reset();
      this.modal.closeTaskModal();
      this.renderTaskList(this.activeListId);
    }
  }
}

export default App;
