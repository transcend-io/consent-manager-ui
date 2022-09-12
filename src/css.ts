import { getAppContainer } from './consent-manager';
import { logger } from './logger';
import { scriptLocation } from './settings';
import { createHTMLElement } from './utils/create-html-element';

/**
 * Inject CSS into the application
 *
 * @param stylesheetUrl - The default URL to attempt to load CSS rom
 */
export const injectCss = (stylesheetUrl: string): void => {
  const root = getAppContainer();
  if (root && stylesheetUrl) {
    const link = createHTMLElement<HTMLLinkElement>('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = stylesheetUrl;
    link.href = new URL(stylesheetUrl, scriptLocation).href;
    root.appendChild(link);
  } else {
    logger.error(`Failed to inject css into consent manager!`);
  }
};
