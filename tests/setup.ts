import { setNavigatorLanguages, setPathname } from './helpers';

setNavigatorLanguages(['en-US', 'en']);

beforeEach(() => {
  window.localStorage.clear();
  setPathname('/');
  setNavigatorLanguages(['en-US', 'en']);
});
