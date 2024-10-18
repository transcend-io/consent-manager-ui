/**
 * getMergedConfig() returns the final config for the UI: { ...baseConfig, ...bundleConfig, ...scriptConfig }
 */

import type {
  ConsentManagerConfig,
  ConsentManagerConfigInput,
  ExperienceToInitialViewState,
} from '@transcend-io/airgap.js-types';
import { ViewState } from '@transcend-io/airgap.js-types/build/enums/viewState';
import { CONSENT_MANAGER_SUPPORTED_LANGUAGES } from './i18n';
import { logger } from './logger';
import { settings, LOG_LEVELS, extraConfig } from './settings';
import { jsonParseSafe } from './utils/safe-json-parse';
import { MergedConsentManagerConfig } from './types';

const {
  privacyCenter,
  privacyPolicy = privacyCenter || '/privacy',
  secondaryPolicy,
  languages,
  dismissedViewState = 'Hidden',
  nonce
} = settings;

/**
 * This enum is copied to avoid airgap.js-types
 * being a production dependency for this package.
 * TODO: https://transcend.height.app/T-20982 - consider
 * a simpler option, such as a dedicated package for constants
 */
export const DEFAULT_VIEW_STATE_BY_PRIVACY_REGIME_COPIED: ExperienceToInitialViewState =
  {
    // EU
    GDPR: 'TCF_EU',
    // Brazil
    LGPD: 'QuickOptions',
    // US: California
    CPRA: 'Hidden',
    // US: Virginia
    CDPA: 'Hidden',
    // US: Colorado
    CPA: 'Hidden',
    // US
    nFADP: 'Hidden',
    // US: Nevada
    NEVADA_SB220: 'Hidden',
    // Other
    Unknown: 'Hidden',
  };

// Base configuration
const baseConfig: Omit<
  ConsentManagerConfig,
  'privacyPolicy' | 'dismissedViewState' | 'secondaryPolicy'
> = {
  css: '',
  messages: '',
  theme: {
    primaryColor: '#3333FF',
    fontColor: '#010101',
  },
  breakpoints: {
    tablet: '640px',
    desktop: '1024px',
  },
  initialViewStateByPrivacyRegime: DEFAULT_VIEW_STATE_BY_PRIVACY_REGIME_COPIED,
};

/**
 * Merges config from defaults and settings. JSON is automatically decoded.
 *
 * @returns the consent manager config to use in the UI
 */
export function getMergedConfig(): MergedConsentManagerConfig {
  const settingsConfig: ConsentManagerConfigInput =
    typeof settings === 'string'
      ? jsonParseSafe(settings, () => ({}))
      : settings || {};

  const settingsConfigInitialViewStateByPrivacyRegime =
    settingsConfig?.initialViewStateByPrivacyRegime;
  // Skip initialViewStateByPrivacyRegime config in settings if empty
  if (
    settingsConfigInitialViewStateByPrivacyRegime &&
    Object.keys(settingsConfigInitialViewStateByPrivacyRegime).length === 0
  ) {
    delete settingsConfig?.initialViewStateByPrivacyRegime;
  }
  // These consent manager settings can be configured through our backend or ag-bundler/config/{site}.json
  const config: ConsentManagerConfig = {
    ...baseConfig,
    ...settingsConfig,
    ...extraConfig,
  } as ConsentManagerConfig;
  config.privacyPolicy ??= privacyPolicy;
  config.secondaryPolicy ??= secondaryPolicy;
  config.dismissedViewState ??= dismissedViewState;
  config.languages ??= languages;
  if (typeof config.initialViewStateByPrivacyRegime === 'string') {
    config.initialViewStateByPrivacyRegime = JSON.parse(
      config.initialViewStateByPrivacyRegime,
    );
  }

  // Determine the language settings to use
  const existingLanguages = config.languages
    ? config.languages.trim().split(/\s*,\s*/)
    : [];
  const supportedLanguages = !config.languages
    ? CONSENT_MANAGER_SUPPORTED_LANGUAGES
    : CONSENT_MANAGER_SUPPORTED_LANGUAGES.filter((lang) =>
        existingLanguages.includes(lang),
      );

  const safeToContinue = validateConfig(config);
  if (!safeToContinue) {
    throw new Error('Invalid consent manager config');
  }

  return { config, supportedLanguages };
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
  const valid = Object.values(ViewState).some(
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
      if (viewState) {
        validateViewState(
          viewState,
          `${initialViewStateByPrivacyRegimeParam} map value`,
          errors,
        );
      }
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

export const CSP_NONCE = nonce;
if (CSP_NONCE) {
  const currentScriptDataset = document.currentScript?.dataset;
  if (currentScriptDataset) {
    delete currentScriptDataset.nonce;
  }
}
