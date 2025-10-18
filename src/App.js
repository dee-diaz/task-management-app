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
import SortingService from './services/SortingService';

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
    this.form = document.querySelector('#form-task');
    this.formHandler = new FormHandler(this.form);
    this.bindEvents();
    this.lastClickedTaskId;
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

  renderCurrentList() {
    const tasks = this.taskManager.getTasks();
    const tasksFiltered = FilterService.filterByList(tasks, this.activeListId);
    const tasksSorted = SortingService.sortByPriority(tasksFiltered);
    this.taskRenderer.renderTaskList(tasksSorted);
  }

  renderMainApp() {
    this.sidebar.init(this.userName);
    this.sidebar.setActiveList(this.activeListId);
    this.updateSidebarCounters();
    this.taskRenderer.init();
    this.taskRenderer.renderListTitle(this.activeListId);
    this.renderCurrentList();
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
        this.form.reset();
        this.modal.showTaskModal();
      }

      if (e.target.closest('#btn-close-modal')) {
        this.modal.closeTaskModal();
      }

      if (e.target.closest('.btn-add-list')) {
        const container = document.querySelector('.custom-list');
        const button = e.target.closest('.btn-add-list');
        button.classList.add('hidden');

        const form = this.sidebar.createAddListInput();
        container.appendChild(form);
      }

      if (e.target.matches('#modal-start .btn-continue')) {
        this.modalHandler.handleStartModalContinue(e);
      }
      if (e.target.matches('#modal-start .btn-skip')) {
        this.modalHandler.handleNameSkip();
      }
      if (e.target.matches('#priority') && priorityPicker) {
        priorityPicker.classList.toggle('visible');
      }
      if (e.target.matches('#list') && listPicker) {
        listPicker.classList.toggle('visible');
      }

      if (e.target.id !== 'priority' && priorityPicker) {
        priorityPicker.classList.remove('visible');
      }

      if (e.target.id !== 'list' && listPicker) {
        listPicker.classList.remove('visible');
      }

      if (e.target.closest('[data-list]')) {
        const target = e.target.closest('[data-list]');
        const formattedListId =
          target.dataset.list[0].toUpperCase() +
          target.dataset.list.slice(1).replace('-', ' ');
        this.activeListId = formattedListId;
        this.sidebar.setActiveList(this.activeListId);
        this.taskRenderer.cleanListTitle();
        this.taskRenderer.renderListTitle(this.activeListId);
        this.renderCurrentList();
      }

      // Edit task
      if (
        e.target.closest('[data-id]') &&
        !e.target.matches('input[type="checkbox"]')
      ) {
        const target = e.target.closest('[data-id]');
        const taskId = target.dataset.id;
        this.lastClickedTaskId = taskId;
        const task = this.taskManager.getTask(taskId);
        const customList = FilterService.defineCustomList(task);

        this.modal.showTaskModal('edit');

        const titleInput = document.querySelector('#task-title');
        const descriptionInput = document.querySelector('#task-description');
        const scheduleInput = document.querySelector('#task-schedule');
        const deadlineInput = document.querySelector('#task-deadline');
        const priorityInput = document.querySelector('#priority');
        const listInput = document.querySelector('#list');

        titleInput.value = task.title;
        descriptionInput.value = task.description;
        scheduleInput.value = task.scheduleDate;
        deadlineInput.value = task.deadlineDate;
        priorityInput.value = task.priority;
        listInput.value = customList;

        if (priorityInput.value) this.taskRenderer.highlightPriorityChoice();
        if (listInput.value) this.taskRenderer.highlightListChoice();
      }

      if (e.target.closest('#btn-delete')) {
        this.taskManager.deleteTask(this.lastClickedTaskId);
        this.modal.closeTaskModal();
        this.form.reset();
        this.renderCurrentList();
        this.updateSidebarCounters();
      }

      if (e.target.closest('#btn-save-changes')) {
        const values = this.formHandler.saveFormData(this.form);
        this.taskManager.editTask(this.lastClickedTaskId, values);
        this.modal.closeTaskModal();
        this.renderCurrentList();
      }
    });

    if (priorityPicker)
      priorityPicker.addEventListener(
        'click',
        this.formHandler.handlePrioritySelect,
      );

    if (listPicker)
      listPicker.addEventListener('click', this.formHandler.handleListSelect);

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    document.querySelector('#modal-task').addEventListener('click', (e) => {
      const closed = this.modal.closeOnOutsideClick(e);

      if (closed) {
        const values = this.formHandler.saveFormData(this.form);
        this.taskManager.editTask(this.lastClickedTaskId, values);
        this.updateSidebarCounters();
        this.renderCurrentList();
      }
    });

    document.addEventListener('change', (e) => {
      if (e.target.matches('input[type="checkbox"]')) {
        const taskId = e.target.closest('li').dataset.id;
        const state = e.target.checked;
        this.taskManager.toggleCompletion(taskId, state);

        setTimeout(() => {
          this.updateSidebarCounters();
          this.renderCurrentList();
        }, 300);
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const values = this.formHandler.saveFormData(this.form);
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
      this.renderCurrentList();
      this.updateSidebarCounters();
    }
  }
}

export default App;
