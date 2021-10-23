// main
import type { AirgapSettings, LogLevel } from '@transcend-io/airgap.js-types';

// local
import { COMMA_AND_OR_SPACE_SEPARATED_LIST } from './utils/comma-and-or-space-separated-list';

export const apiEventName = 'tcmUIApiEvent';

/**
 * Get Airgap settings, merging overrides set on view.transcend and view.airgap
 *
 * @returns airgap settings
 */
function getAirgapSettings(): AirgapSettings {
  const airgapInit = self.airgap;
  const transcendInit = self.transcend;
  // transcend.loadOptions is used to inject settings from our backend
  const embeddedLoadOptions: AirgapSettings | undefined = {
    ...airgapInit?.loadOptions,
    ...transcendInit?.loadOptions,
  };

  // Pull data attributes (e.g. data-telemetry) from the Airgap <script> tag
  const { currentScript } = document;
  const dataset: DOMStringMap = currentScript
    ? currentScript.dataset
    : Object.create(null);

  return embeddedLoadOptions
    ? { ...dataset, ...embeddedLoadOptions }
    : ({ ...dataset } as unknown as AirgapSettings);
}

export const airgapSettings: AirgapSettings = getAirgapSettings();

const validLogLevels: LogLevel[] = [
  'fatal',
  'error',
  'warn',
  'info',
  'log',
  'debug',
  'trace',
];

/** Default log level */
const DEFAULT_LOG_LEVEL: LogLevel = 'info';

const inheritLogLevels = (logLevels: LogLevel[]): LogLevel[] => {
  let maxLogLevel = -1;
  logLevels.forEach((logLevel) => {
    const index = validLogLevels.indexOf(logLevel);
    if (index !== -1) {
      maxLogLevel = Math.max(index, maxLogLevel);
    }
  });
  return maxLogLevel !== -1 ? validLogLevels.slice(0, maxLogLevel + 1) : [];
};

const wildcardLogLevels = ['all', '*'];
const logLevelsSetting = (airgapSettings.log ?? '').toLowerCase();

/**
 * Enabled log levels
 *
 * Example input: data-log="DEBUG,,, INFO ,ERROR, ,WARN"
 *
 * Parsed log level list: new Set(['info', 'error', 'fatal', 'log', 'debug'])
 */
export const LOG_LEVELS = new Set<LogLevel>(
  inheritLogLevels(
    wildcardLogLevels.includes(logLevelsSetting)
      ? validLogLevels
      : !logLevelsSetting || logLevelsSetting === 'off'
      ? []
      : (logLevelsSetting
          .toLowerCase()
          .split(COMMA_AND_OR_SPACE_SEPARATED_LIST) as LogLevel[]),
  ),
);

/**
 * Boolean for whether to log at all
 */
export const LOG_ENABLED: boolean =
  LOG_LEVELS.size > validLogLevels.indexOf(DEFAULT_LOG_LEVEL);
