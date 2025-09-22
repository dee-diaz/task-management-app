import { DEFAULT_LISTS } from "../../utils/Constants";
import logoSvg from "../../assets/img/logo.svg";

// Pure sidebar display logic, no business rules
class SidebarRenderer {
  constructor(container) {
    this.container = container;
    this.activeListId = DEFAULT_LISTS[0].id;
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
    // Today, All tasks, Completed with their counters
    const defaultList = document.querySelector(".default-list");

    lists.forEach((list) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      const attrName = list.id.toLowerCase().replace(" ", "-");
      button.setAttribute("data-list", attrName);
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
      counter.textContent = "0";

      div.appendChild(svg);
      div.appendChild(para);
      button.appendChild(div);
      button.appendChild(counter);
      li.appendChild(button);
      defaultList.appendChild(li);
    });
  }

  renderCustomLists(lists) {
    // Personal, Work, Family with their counters
  }

  updateListCounter(listId, count) {
    // Updates a specific counter without re-rendeting the entire sidebar
    const attrName = listId.toLowerCase().replace(" ", "-");
    const counterEl = document.querySelector(`[data-list="${attrName}"] span`);
    counterEl.textContent = count;

    //Debug log
    console.log(listId, count);
  }

  setActiveList(listId) {
    // Visually highlights the active list
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
