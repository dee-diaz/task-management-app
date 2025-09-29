import logoSvg from "../../assets/img/logo-2.svg";

class ModalRenderer {
  constructor(container) {
    this.container = container;
  }

  // First step
  showOnboardingModal() {
    const modal = document.createElement("dialog");
    modal.setAttribute("id", "modal-start");
    const img = document.createElement("img");
    img.className = "logo";
    img.src = logoSvg;
    const h1 = document.createElement("h1");
    h1.textContent = "Welcome to Enso";
    const para = document.createElement("p");
    para.textContent =
      "Your simple space for getting things done. Organize tasks, create lists, stay focused.";
    const button = document.createElement("button");
    button.className = "btn btn-primary btn-continue";
    button.setAttribute("autofocus", "");
    button.textContent = "Continue";
    const pagination = document.createElement("div");
    pagination.className = "pagination";
    const paginationItem1 = document.createElement("div");
    paginationItem1.classList.add("active");
    const paginationItem2 = document.createElement("div");
    pagination.appendChild(paginationItem1);
    pagination.appendChild(paginationItem2);

    modal.appendChild(img);
    modal.appendChild(h1);
    modal.appendChild(para);
    modal.appendChild(button);
    modal.appendChild(pagination);
    this.container.appendChild(modal);
    modal.showModal();
  }

  renderOnboardingSecondStep() {
    const modal = document.querySelector("#modal-start");
    modal.innerHTML = "";

    const img = document.createElement("img");
    img.className = "logo";
    img.src = logoSvg;
    const h1 = document.createElement("h1");
    h1.textContent = "What’s your name?";

    const form = document.createElement("form");
    form.setAttribute("id", "form-name");

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "user-name");
    input.setAttribute("name", "user-name");
    input.setAttribute("placeholder", "Your first name");

    form.appendChild(input);

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";

    const buttonSkip = document.createElement("button");
    buttonSkip.className = "btn btn-secondary btn-skip";
    buttonSkip.textContent = "Skip";

    const buttonContinue = document.createElement("button");
    buttonContinue.setAttribute("type", "submit");
    buttonContinue.setAttribute("form", "form-name");
    buttonContinue.className = "btn btn-primary btn-continue";
    buttonContinue.textContent = "Continue";

    actionsDiv.appendChild(buttonSkip);
    actionsDiv.appendChild(buttonContinue);

    const pagination = document.createElement("div");
    pagination.className = "pagination";
    const paginationItem1 = document.createElement("div");
    const paginationItem2 = document.createElement("div");
    paginationItem2.classList.add("active");
    pagination.appendChild(paginationItem1);
    pagination.appendChild(paginationItem2);

    modal.appendChild(img);
    modal.appendChild(h1);
    modal.appendChild(form);
    modal.appendChild(actionsDiv);
    modal.appendChild(pagination);
  }
}

export default ModalRenderer;
