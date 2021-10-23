/**
 * getMergedConfig() returns the final config for the UI: { ...defaultConfig, ...bundleConfig, ...scriptConfig }
 */

// main
import {
  ConsentManagerConfig,
  ConsentManagerConfigInput,
  ViewState,
} from '@transcend-io/airgap.js-types';

// local
import { logger } from './logger';
import { airgapSettings, LOG_LEVELS } from './settings';
import { jsonParseSafe } from './utils/safe-json-parse';

// Default configurations
const defaultConfig: ConsentManagerConfig = {
  theme: {
    primaryColor: '#3333FF',
    fontColor: '#010101',
  },
  breakpoints: {
    tablet: '640px',
    desktop: '1024px',
  },
  privacyPolicy:
    airgapSettings.privacyCenter ||
    'https://privacy.transcend.io/policies?name=privacy-policy#privacy-policy',
  initialViewStateByPrivacyRegime: {
    // California
    CPRA: ViewState.NoticeAndDoNotSell,
    // EU
    GDPR: ViewState.QuickOptions,
    // Brazil
    LGPD: ViewState.QuickOptions,
    // Virginia (unreachable as we don't detect this regime yet)
    CDPA: ViewState.NoticeAndDoNotSell,
    // Colorado (unreachable as we don't detect this regime yet)
    CPA: ViewState.NoticeAndDoNotSell,
    // Other
    Unknown: ViewState.Hidden,
  },
  dismissedViewState: ViewState.Collapsed,
};

/**
 * Merges config from defaults and settings. JSON is automatically decoded.
 *
 * @returns the consent manager config to use in the UI
 */
export function getMergedConfig(): ConsentManagerConfig {
  const settingsConfig: ConsentManagerConfigInput =
    typeof airgapSettings.consentManagerConfig === 'string'
      ? jsonParseSafe(airgapSettings.consentManagerConfig, () => ({}))
      : airgapSettings.consentManagerConfig || {};

  // These consent manager settings can be configured through our backend or ag-bundler/config/{site}.json
  const config: ConsentManagerConfig = {
    ...defaultConfig,
    ...settingsConfig,
  } as ConsentManagerConfig;

  const safeToContinue = validateConfig(config);
  if (!safeToContinue) {
    throw new Error('Invalid consent manager config');
  }

  return config;
}

/**
 * Validates the configuration
 *
 * @param config - the provided config to validate
 * @returns a boolean on whether this is valid config
 */
function validateConfig(config: ConsentManagerConfig): boolean {
  const errors: string[] = [];
  const warnings: string[] = [];

  /* Validators */
  // Check that config is not empty
  if (Object.keys(config).length === 0) {
    errors.push('Consent manager UI config missing!');
  }

  /* Logging */
  if (warnings.length > 0 && LOG_LEVELS.has('warn')) {
    // Log warnings
    warnings.forEach((warning) => {
      logger.warn(warning, config);
    });
  }

  if (errors.length > 0) {
    // Log errors and return false
    if (LOG_LEVELS.has('error')) {
      errors.forEach((error) => {
        logger.error.styled('color: #686868', error, config);
      });
    }
    return false;
  }

  return true;
}
