import { CSP_NONCE } from './config';
import { getAppContainer } from './consent-manager';
import { logger } from './logger';
import { createHTMLElement } from './utils';

/**
 * Inject CSS into the application
 *
 * @param stylesheetUrl - The default URL to attempt to load CSS rom
 * @returns Promise that finishes when the stylesheet has loaded
 */
export const injectCss = (stylesheetUrl: string): Promise<void> =>
  new Promise((res) => {
    const root = getAppContainer();
    if (root && stylesheetUrl) {
      const link = createHTMLElement<HTMLLinkElement>('link');
      if (CSP_NONCE) {
        link.nonce = CSP_NONCE;
      }
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.id = stylesheetUrl;
      link.href = stylesheetUrl;
      link.addEventListener('load', () => res());
      root.appendChild(link);
    } else {
      logger.error(`Failed to inject css into consent manager!`);
    }
  });
