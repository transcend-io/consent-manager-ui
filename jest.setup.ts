/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from '@jest/globals';
import { readFileSync } from 'node:fs';

import { airgapStub } from './src/playground/airgapStub';

declare global {
  interface Window {
    /** TODO */
    JEST_SETUP_VARS: Record<string, unknown>;
  }
}

const mockAg = readFileSync('./src/ag-mock.js').toString();

const newScript = document.createElement('script');
newScript.innerHTML = mockAg;

document.head.append(newScript);

window.JEST_SETUP_VARS = {};

const MESSAGES_PATH = 'src/translations/en.json';
const messagesStringified = readFileSync(MESSAGES_PATH, 'utf8');
const messages = JSON.parse(messagesStringified);

window.JEST_SETUP_VARS.messages = messages;

(window as any).fetch = jest.fn().mockImplementation((path: any) => {
  const data = readFileSync(path, 'utf8');
  return Promise.resolve({
    ok: true,
    json: () => JSON.parse(data),
  });
});

/**
 * Add Airgap API stub to window/self/globalThis
 */
(window as any).airgap = Object.assign(airgapStub, (window as any).airgap);

/* eslint-enable @typescript-eslint/no-explicit-any */
