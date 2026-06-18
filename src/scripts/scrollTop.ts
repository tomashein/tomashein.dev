function initScrollTop() {
  const button = document.querySelector<HTMLButtonElement>('[data-scroll-top]');

  if (!button) {
    console.warn('[scrollTop] no [data-scroll-top] button found — scroll to top will not initialise');
    return;
  }

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const update = () => {
    const pastThreshold = window.scrollY >= window.innerHeight;
    button.toggleAttribute('hidden', !pastThreshold);
  };

  update();

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: motionQuery.matches ? 'instant' : 'smooth',
    });
  });
}

initScrollTop();
