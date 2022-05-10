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
import { settings, LOG_LEVELS } from './settings';
import { jsonParseSafe } from './utils/safe-json-parse';

const {
  privacyCenter,
  privacyPolicy = privacyCenter || '/privacy',
  dismissedViewState = ViewState.Collapsed,
} = settings;

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
  privacyPolicy,
  dismissedViewState,
};

/**
 * Merges config from defaults and settings. JSON is automatically decoded.
 *
 * @returns the consent manager config to use in the UI
 */
export function getMergedConfig(): ConsentManagerConfig {
  const settingsConfig: ConsentManagerConfigInput =
    typeof settings.consentManagerConfig === 'string'
      ? jsonParseSafe(settings.consentManagerConfig, () => ({}))
      : settings.consentManagerConfig || {};

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
 * Validate recognized view states.
 *
 * @param viewState - the view state to validate
 * @param param - Parameter name to use in error messages
 * @param errors - list of errors to append to
 * @returns whether viewState is a recognized view state
 */
const validateViewState = (
  viewState: ViewState,
  param: string,
  errors: string[],
): boolean => {
  const valid = !Object.values(ViewState).some(
    (knownViewState) => knownViewState === viewState,
  );
  if (!valid) {
    errors.push(`Unrecognized ${param}: ${viewState}`);
  }
  return valid;
};

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

  const dismissedViewStateParam = 'dismissedViewState';
  const initialViewStateByPrivacyRegimeParam =
    'initialViewStateByPrivacyRegime';
  const {
    [dismissedViewStateParam]: dismissedViewState,
    [initialViewStateByPrivacyRegimeParam]: initialViewStateByPrivacyRegime,
  } = config;
  if (dismissedViewState) {
    validateViewState(dismissedViewState, dismissedViewStateParam, errors);
  }
  if (initialViewStateByPrivacyRegime) {
    Object.values(initialViewStateByPrivacyRegime).forEach((viewState) => {
      validateViewState(
        viewState,
        `${initialViewStateByPrivacyRegimeParam} map value`,
        errors,
      );
    });
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
