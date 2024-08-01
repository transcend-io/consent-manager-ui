/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from '@jest/globals';
import { readFileSync } from 'fs';

import { airgapStub } from './src/playground/airgapStub';
import { testWindow } from './src/tests/utils'

import { init as initMockAirgap } from './src/tests/ag-mock'
import { MOCK_PURPOSES } from './src/tests/constants'

initMockAirgap(MOCK_PURPOSES)

testWindow.JEST_SETUP_VARS = { messages: {} };

const MESSAGES_PATH = 'src/translations/en.json';
const messagesStringified = readFileSync(MESSAGES_PATH, 'utf8');
const messages = JSON.parse(messagesStringified);

testWindow.JEST_SETUP_VARS.messages = messages;

(testWindow as any).fetch = jest.fn().mockImplementation((path: any) => {
  const data = readFileSync(path, 'utf8');
  return Promise.resolve({
    ok: true,
    json: () => JSON.parse(data),
  });
});

/**
 * Add Airgap API stub to window/self/globalThis
 */
(testWindow as any).airgap = Object.assign(airgapStub, (window as any).airgap);

/* eslint-enable @typescript-eslint/no-explicit-any */
