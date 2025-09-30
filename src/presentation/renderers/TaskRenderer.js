import { DEFAULT_LISTS } from "../../utils/Constants";
import { format } from "date-fns";

class TaskRenderer {
  constructor(container) {
    this.container = container;
  }

  renderListTitle(listId) {
    const main = document.querySelector(".main");
    const h1 = document.querySelector("#list-title");
    h1.textContent = listId;

    if (listId === DEFAULT_LISTS.TODAY.id) {
      const today = format(new Date(), "EEEE, MMMM d");
      const para = document.createElement("p");
      para.setAttribute("id", "todays-date");
      para.textContent = today;
      const secondChild = main.children[1];
      main.insertBefore(para, secondChild);
    }
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
