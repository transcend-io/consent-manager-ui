import { airgapStub } from './airgapStub';
import { h, render } from 'preact';
import Main from './Main';

/**
 * Add Airgap API stub to window/self/globalThis
 */
window.airgap = Object.assign(airgapStub, window.airgap);

const divToInjectPlayground = document.getElementById('playground');
if (!divToInjectPlayground) {
  throw new Error('Element not found with id `playground`');
}

/**
 * Render preact App
 */
render(<Main />, divToInjectPlayground);
