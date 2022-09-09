import { airgapStub } from './airgapStub';
import { h, render } from 'preact';
import Main from './Main';

/**
 * Add Airgap API stub to window/self/globalThis
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-restricted-globals
self.airgap = Object.assign(airgapStub, self.airgap);

const divToInjectPlayground = document.getElementById('playground');
if (!divToInjectPlayground) {
  throw new Error('Element not found with id `playground`');
}

/**
 * Render preact App
 */
render(<Main />, divToInjectPlayground);
