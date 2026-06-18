function initNavigation() {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));

  if (!links.length) {
    console.warn('[navigation] no [data-nav-link] links found — navigation will not initialise');
    return;
  }

  const items = links
    .map((link) => {
      const id = link.hash.slice(1);
      const section = document.getElementById(id);
      return section ? { link, section } : null;
    })
    .filter((item): item is { link: HTMLAnchorElement; section: HTMLElement } => item !== null);

  if (!items.length) {
    console.warn('[navigation] no matching items between links and sections — navigation will not initialise');
    return;
  }

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  let activeLink: HTMLAnchorElement | null = null;

  const setActive = (next: HTMLAnchorElement) => {
    if (next === activeLink) return;
    activeLink?.classList.remove('active');
    activeLink?.removeAttribute('aria-current');
    next.classList.add('active');
    next.setAttribute('aria-current', 'page');
    activeLink = next;
  };

  const update = () => {
    const viewportHeight = window.innerHeight;
    let best: (typeof items)[number] | null = null;
    let maxVisible = 0;
    let lastAbove: (typeof items)[number] | null = null;
    let firstBelow: (typeof items)[number] | null = null;

    for (const item of items) {
      const rect = item.section.getBoundingClientRect();
      const visible = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));

      if (visible > maxVisible) {
        maxVisible = visible;
        best = item;
      }

      if (rect.bottom <= 0) {
        lastAbove = item;
      }

      if (rect.top >= viewportHeight && firstBelow === null) {
        firstBelow = item;
      }
    }

    const winner = best ?? lastAbove ?? firstBelow ?? items[0];
    setActive(winner.link);
  };

  let ticking = false;

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      update();
    });
  };

  update();

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });

  document.addEventListener('click', (event) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>('[data-nav-link]');
    if (!link || link.tagName !== 'A') return;
    event.preventDefault();
    const item = items.find((i) => i.link === link);
    if (!item) return;
    item.section.scrollIntoView({
      behavior: motionQuery.matches ? 'instant' : 'smooth',
    });
  });
}

initNavigation();
