class TaskRenderer {
  constructor(container) {
    this.container = container;
  }

  renderListTitle(listId) {
    const h1 = document.querySelector("#list-title");
    h1.textContent = listId;
  }

  init() {
    const main = document.createElement("div");
    main.className = "main";
    
    const h1 = document.createElement("h1");
    h1.setAttribute("id", "list-title");
    main.appendChild(h1);
    
    this.container.appendChild(main);
  }
}


export default TaskRenderer;