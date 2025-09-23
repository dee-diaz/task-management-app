import { DEFAULT_LISTS, customLists } from "../../utils/Constants";
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
    const defaultList = document.querySelector(".default-list");

    lists.forEach((list) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      const attrVal = list.id.toLowerCase().replace(" ", "-");
      button.setAttribute("data-list", attrVal);
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
    const customList = document.querySelector(".custom-list");
    const h3 = document.createElement("h3");
    h3.textContent = "My lists";
    const ul = document.createElement("ul");

    customList.appendChild(h3);
    customList.appendChild(ul);

    Object.values(lists).forEach((list) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      const attrVal = list.id.toLowerCase().replace(" ", "-");
      button.setAttribute("data-list", attrVal);
      const div = document.createElement("div");

      const svgns = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgns, "svg");
      svg.setAttribute("width", "12");
      svg.setAttribute("height", "12");
      svg.setAttribute("viewBox", "0 0 12 12");
      svg.setAttribute("fill", "none");
      const circle = document.createElementNS(svgns, "circle");
      circle.setAttribute("cx", "6");
      circle.setAttribute("cy", "6");
      circle.setAttribute("r", "5.5");
      circle.setAttribute("stroke", list.color);
      svg.appendChild(circle);

      const para = document.createElement("p");
      para.textContent = list.id;

      const counter = document.createElement("span");
      counter.textContent = "0";

      div.appendChild(svg);
      div.appendChild(para);
      button.appendChild(div);
      button.appendChild(counter);
      li.appendChild(button);
      ul.appendChild(li);
    });
  }

  updateListCounter(listId, count) {
    const attrName = listId.toLowerCase().replace(" ", "-");
    const counterEl = document.querySelector(`[data-list="${attrName}"] span`);
    counterEl.textContent = count;

    //Debug log
    console.log(listId, count);
  }

  setActiveList(listId) {
    const allLists = document.querySelectorAll("[data-list]");
    const attrName = listId.toLowerCase().replace(" ", "-");
    allLists.forEach((list) => list.classList.remove("active"));
    const list = document.querySelector(`[data-list="${attrName}"]`);
    list.classList.add("active");
  }

  initSidebar() {
    const sidebar = document.createElement("div");
    sidebar.className = "sidebar";
    const greeting = document.createElement("div");
    greeting.className = "greeting";

    const defaultList = document.createElement("ul");
    defaultList.className = "default-list";

    const customList = document.createElement("div");
    customList.className = "custom-list";

    sidebar.appendChild(greeting);
    sidebar.appendChild(defaultList);
    sidebar.appendChild(customList);
    this.container.appendChild(sidebar);

    // REVIEW LATER
    this.renderGreeting("Dee");
    this.renderDefaultLists(DEFAULT_LISTS);
    this.renderCustomLists(customLists);
    this.setActiveList(this.activeListId);
  }
}

export default SidebarRenderer;
