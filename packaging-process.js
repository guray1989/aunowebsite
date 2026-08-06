document.addEventListener('DOMContentLoaded', function () {
  const steps = document.querySelectorAll('.packaging-process__step');
  if (!steps.length) return;

  steps.forEach((step) => {
    const toggle = step.querySelector('.packaging-process__toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function (event) {
      event.stopPropagation();
      const willOpen = !step.classList.contains('is-open');

      steps.forEach((other) => {
        other.classList.remove('is-open');
        const otherToggle = other.querySelector('.packaging-process__toggle');
        if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
      });

      if (willOpen) {
        step.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
