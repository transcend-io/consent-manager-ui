// main
import { createLogger } from '@transcend-io/logger';

// local
import { LOG_LEVELS } from './settings';

export const logger = createLogger('Transcend', LOG_LEVELS);
