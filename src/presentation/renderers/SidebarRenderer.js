import { DEFAULT_LISTS } from "../../utils/Constants";
import logoSvg from "../../assets/img/logo.svg";

// Pure sidebar display logic, no business rules
class SidebarRenderer {
  constructor(container) {
    this.container = container;
    this.activeListId = "today";
    this.initSidebar();
  }

  renderGreeting(userName) {
    const greetingCont = document.querySelector(".greeting");
    const h3 = document.createElement("h3");
    userName ? (h3.textContent = `Hey, ${userName}`) : (h3.textContent = "Hey");
    const logo = document.createElement("img");
    logo.src = logoSvg;

    greetingCont.appendChild(logo);
    greetingCont.appendChild(h3);
  }

  renderDefaultLists(lists) {
    // Today, All tasks, Completed с их счетчиками
    const defaultList = document.querySelector(".default-list");

    lists.forEach((list) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.setAttribute("data-list", list.id.toLowerCase());
      const div = document.createElement("div");

      const svgns = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgns, "svg");
      svg.setAttribute("width", "20");
      svg.setAttribute("height", "20");
      svg.setAttribute("viewBox", "0 0 20 20");
      svg.setAttribute("fill", "none");

      const path = document.createElementNS(svgns, "path");
      path.setAttribute("d", list.svgPath);

      svg.appendChild(path);

      const para = document.createElement("p");
      para.textContent = list.id;

      const counter = document.createElement("span");
      counter.textContent = "12";

      div.appendChild(svg);
      div.appendChild(para);
      button.appendChild(div);
      button.appendChild(counter);
      li.appendChild(button);
      defaultList.appendChild(li);
    });
  }

  renderCustomLists(lists) {
    // Personal, Work, Family с их счетчиками
  }

  updateListCounter(listId, count) {
    // Обновляет конкретный счетчик без перерисовки всего сайдбара
  }

  setActiveList(listId) {
    // Визуально выделяет активный список
  }

  initSidebar() {
    const sidebar = document.createElement("div");
    sidebar.className = "sidebar";
    const greeting = document.createElement("div");
    greeting.className = "greeting";

    const defaultList = document.createElement("ul");
    defaultList.className = "default-list";

    sidebar.appendChild(greeting);
    sidebar.appendChild(defaultList);
    this.container.appendChild(sidebar);

    // REMOVE LATER
    this.renderGreeting("Dee");
    this.renderDefaultLists(DEFAULT_LISTS);
  }
}

export default SidebarRenderer;
