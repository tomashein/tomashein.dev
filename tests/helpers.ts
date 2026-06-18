export function setPathname(pathname: string): void {
  Object.defineProperty(window, 'location', {
    configurable: true,
    writable: true,
    value: { pathname, origin: 'https://tomashein.dev' },
  });
}

export function setNavigatorLanguages(languages: string[]): void {
  Object.defineProperty(navigator, 'languages', {
    configurable: true,
    writable: true,
    value: languages,
  });
}
