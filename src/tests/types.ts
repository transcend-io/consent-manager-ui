import { TranslatedMessages } from '@transcend-io/internationalization';

export interface TestWindow extends Window {
  /** Jest setup variables */
  JEST_SETUP_VARS: {
    /** Cached english messages read from en.json */
    messages: TranslatedMessages
  } & Record<string, unknown>;
}
