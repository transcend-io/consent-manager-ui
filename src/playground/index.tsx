import { airgapStub } from './airgapStub';
import { h, render } from 'preact';
import Main from './Main';

/**
 * Add Airgap API stub to window/self/globalThis
 */
window.airgap = Object.assign(airgapStub, window.airgap);

/**
 * Check for loadOptions in local storage, and inject onto transcendInit
 */
let loadOptions = {};
const loadOptionsInStorage = localStorage.getItem('loadOptions');
if (loadOptionsInStorage) {
  try {
    loadOptions = JSON.parse(loadOptionsInStorage);
  } catch (err) {}
}
window.transcend = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  loadOptions,
  ...window.transcend,
};

const divToInjectPlayground = document.getElementById('playground');
if (!divToInjectPlayground) {
  throw new Error('Element not found with id `playground`');
}

/**
 * Render preact App
 */
render(<Main />, divToInjectPlayground);
