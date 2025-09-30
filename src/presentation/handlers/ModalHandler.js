// Modal interaction management
class ModalHandler {
  constructor(modalRenderer, onComplete) {
    this.modalRenderer = modalRenderer;
    this.onComplete = onComplete;
    this.onboardingStep = 1;
    this.bindEvents();
  }

  bindEvents() {
    // Event delegation for all modals
    document.addEventListener('click', (e) => {
      if (e.target.matches('#modal-start .btn-continue')) {
        this.handleStartModalContinue(e);
      }
      if (e.target.matches('#modal-start .btn-skip')) {
        this.handleNameSkip();
      }
    });
  }

  handleStartModalContinue(e) {
    if (this.onboardingStep === 1) {
      this.modalRenderer.renderOnboardingSecondStep();
      this.onboardingStep = 2;
    } else if (this.onboardingStep === 2) {
      e.preventDefault();
      this.onboardingStep = 1;
      const inputVal =
        document.querySelector('#modal-start input').value || 'buddy';
      this.modalRenderer.closeOnboardingModal();
      this.onComplete(inputVal);
    }
  }

  handleNameSkip() {
    const defaultName = 'buddy';
    this.modalRenderer.closeOnboardingModal();
    this.onComplete(defaultName);
  }
}

export default ModalHandler;
