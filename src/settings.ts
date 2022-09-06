// main
import type { LogLevel } from '@transcend-io/airgap.js-types';

// local
import { COMMA_AND_OR_SPACE_SEPARATED_LIST } from './utils/comma-and-or-space-separated-list';

export const apiEventName = 'tcmUIApiEvent';

const { currentScript: thisScript } = document;

export const scriptLocation = new URL(
  (thisScript instanceof HTMLScriptElement
    ? thisScript?.src
    : thisScript instanceof SVGScriptElement
    ? thisScript?.href?.baseVal
    : null) ?? location.href,
);

/**
 * Get Airgap settings, merging overrides set on view.transcend and view.airgap
 *
 * @returns airgap settings
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAirgapSettings(): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-restricted-globals
  const airgapInit = (self as any)?.airgap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-restricted-globals
  const transcendInit = (self as any)?.transcend;
  // transcend.loadOptions is used to inject settings from our backend
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const embeddedLoadOptions: any | undefined = {
    ...airgapInit?.loadOptions,
    ...transcendInit?.loadOptions,
  };

  // Pull data attributes from the current <script> tag
  const dataset: DOMStringMap = thisScript
    ? thisScript.dataset
    : Object.create(null);

  return embeddedLoadOptions
    ? { ...dataset, ...embeddedLoadOptions }
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ({ ...dataset } as unknown as any);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const settings: any = getAirgapSettings();

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
const logLevelsSetting = (settings.log ?? '').toLowerCase();

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
