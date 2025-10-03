import logoSvg from '../../assets/img/logo-2.svg';

class ModalRenderer {
  constructor(container) {
    this.container = container;
    this.createTaskModal();
  }

  showOnboardingModal() {
    const modal = document.createElement('dialog');
    modal.id = 'modal-start';
    const img = document.createElement('img');
    img.className = 'logo';
    img.src = logoSvg;
    const h1 = document.createElement('h1');
    h1.textContent = 'Welcome to Enso';
    const para = document.createElement('p');
    para.textContent =
      'Your simple space for getting things done. Organize tasks, create lists, stay focused.';
    const button = document.createElement('button');
    button.className = 'btn btn-primary btn-continue';
    button.setAttribute('autofocus', '');
    button.textContent = 'Continue';
    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    const paginationItem1 = document.createElement('div');
    paginationItem1.classList.add('active');
    const paginationItem2 = document.createElement('div');
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
    const modal = document.querySelector('#modal-start');
    modal.innerHTML = '';

    const img = document.createElement('img');
    img.className = 'logo';
    img.src = logoSvg;
    const h1 = document.createElement('h1');
    h1.textContent = 'What’s your name?';

    const form = document.createElement('form');
    form.setAttribute('id', 'form-name');

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'user-name');
    input.setAttribute('name', 'user-name');
    input.setAttribute('placeholder', 'Your first name');

    form.appendChild(input);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'actions';

    const buttonSkip = document.createElement('button');
    buttonSkip.className = 'btn btn-secondary btn-skip';
    buttonSkip.textContent = 'Skip';

    const buttonContinue = document.createElement('button');
    buttonContinue.setAttribute('type', 'submit');
    buttonContinue.setAttribute('form', 'form-name');
    buttonContinue.className = 'btn btn-primary btn-continue';
    buttonContinue.textContent = 'Continue';

    actionsDiv.appendChild(buttonSkip);
    actionsDiv.appendChild(buttonContinue);

    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    const paginationItem1 = document.createElement('div');
    const paginationItem2 = document.createElement('div');
    paginationItem2.classList.add('active');
    pagination.appendChild(paginationItem1);
    pagination.appendChild(paginationItem2);

    modal.appendChild(img);
    modal.appendChild(h1);
    modal.appendChild(form);
    modal.appendChild(actionsDiv);
    modal.appendChild(pagination);
  }

  closeOnboardingModal() {
    const modal = document.querySelector('#modal-start');
    modal.remove();
  }


  createTaskModal() {
    const body = document.querySelector('body');
    const modal = document.createElement('dialog');
    modal.id = 'modal-task';

    const svgns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgns, 'svg');
    svg.id = 'btn-close-modal';
    svg.setAttribute('viewBox', '0 0 20 20');
    svg.setAttribute('fill', 'none');
    const path = document.createElementNS(svgns, 'path');
    path.setAttribute(
      'd',
      'M16.0673 15.1828C16.1254 15.2409 16.1714 15.3098 16.2028 15.3857C16.2343 15.4615 16.2505 15.5429 16.2505 15.625C16.2505 15.7071 16.2343 15.7884 16.2028 15.8643C16.1714 15.9402 16.1254 16.0091 16.0673 16.0672C16.0092 16.1252 15.9403 16.1713 15.8644 16.2027C15.7885 16.2342 15.7072 16.2503 15.6251 16.2503C15.543 16.2503 15.4617 16.2342 15.3858 16.2027C15.3099 16.1713 15.241 16.1252 15.1829 16.0672L10.0001 10.8836L4.81729 16.0672C4.70002 16.1844 4.54096 16.2503 4.3751 16.2503C4.20925 16.2503 4.05019 16.1844 3.93292 16.0672C3.81564 15.9499 3.74976 15.7908 3.74976 15.625C3.74976 15.4591 3.81564 15.3001 3.93292 15.1828L9.11651 9.99998L3.93292 4.81717C3.81564 4.69989 3.74976 4.54083 3.74976 4.37498C3.74976 4.20913 3.81564 4.05007 3.93292 3.93279C4.05019 3.81552 4.20925 3.74963 4.3751 3.74963C4.54096 3.74963 4.70002 3.81552 4.81729 3.93279L10.0001 9.11639L15.1829 3.93279C15.3002 3.81552 15.4593 3.74963 15.6251 3.74963C15.791 3.74963 15.95 3.81552 16.0673 3.93279C16.1846 4.05007 16.2505 4.20913 16.2505 4.37498C16.2505 4.54083 16.1846 4.69989 16.0673 4.81717L10.8837 9.99998L16.0673 15.1828Z',
    );
    path.setAttribute('fill', '#A5A5A5');
    svg.appendChild(path);

    const form = document.createElement('form');
    form.id = 'form-task';
    const row1 = document.createElement('div');
    row1.className = 'row-1';

    form.appendChild(row1);

    modal.appendChild(svg);
    modal.appendChild(form);

    body.appendChild(modal);
  }

  showTaskModal() {
    const modal = document.querySelector('#modal-task');
    modal.showModal();
  }

  closeTaskModal() {
    const modal = document.querySelector('#modal-task');
    modal.close();
  }
}

export default ModalRenderer;
