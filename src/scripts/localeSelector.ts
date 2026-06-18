import { isValidLocale, saveLocale } from '@helpers/locale';

function initLocaleSelector() {
  const links = document.querySelectorAll<HTMLAnchorElement>('[data-locale]');

  if (!links.length) {
    console.warn('[localeSelector] no [data-locale] links found — locale preference will not be saved on navigation');
    return;
  }

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const raw = link.dataset.locale;

      if (!isValidLocale(raw)) return;

      if (link.getAttribute('aria-current') === 'page') {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      saveLocale(raw);
      window.location.href = link.href;
    });
  });
}

initLocaleSelector();
