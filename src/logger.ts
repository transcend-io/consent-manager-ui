// main
import { createLogger } from '@transcend-io/logger';
import type { Logger as LoggerType } from '@transcend-io/airgap.js-types';

// local
import { LOG_LEVELS } from './settings';

export const logger: LoggerType = createLogger('Transcend', LOG_LEVELS);
