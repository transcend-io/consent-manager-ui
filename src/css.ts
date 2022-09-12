// main
import { getAppContainer } from './consent-manager';
import { logger } from './logger';

/**
 * Inject CSS into the application
 *
 * @param stylesheetUrl - The default URL to attempt to load CSS rom
 */
export const injectCss = (stylesheetUrl: string): void => {
  const root = getAppContainer();
  if (root && stylesheetUrl) {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = stylesheetUrl;
    link.href = stylesheetUrl;

    document.head.appendChild(link);
  } else {
    logger.error(`Failed to inject css into consent manager!`);
  }
};
