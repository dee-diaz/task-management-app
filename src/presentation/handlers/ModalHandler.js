// Modal interaction management
class ModalHandler {
  constructor(modalRenderer) {
    this.modalRenderer = modalRenderer;
    this.currentStep = 1;

    this.bindEventListeners();
  }

  bindEventListeners() {
    // Event delegation for all modals
    document.addEventListener("click", (e) => {
      if (e.target.matches(".btn-continue")) {
        this.handleStartModalContinue(e);
      }
      if (e.target.matches(".btn-skip")) {
        this.handleNameSkip();
      }
    });
  }

  handleStartModalContinue(e) {
    if (this.currentStep === 1) {
      this.modalRenderer.renderOnboardingSecondStep();
      this.currentStep = 2;
    } else if (this.currentStep === 2) {
      e.preventDefault();
      console.log("Continue");
    }
  }

  handleNameSkip() {
    console.log("Skip");
  }
}


export default ModalHandler;