// main
import { createHTMLElement } from '../utils/create-html-element';
import { getAppContainer } from '../consent-manager';
import { scriptLocation, settings } from '../settings';

export const mainCSS: string =
  settings.css ??
  `import url(${JSON.stringify(new URL('cm.css', scriptLocation).href)})`;

export const loadCSS = (css = mainCSS): void => {
  const root = getAppContainer();
  if (root) {
    const style = createHTMLElement<HTMLStyleElement>('style');
    style.append(css);
    root?.appendChild(style);
  }
};
