import { ViewState, TranscendAPI } from '@transcend-io/airgap.js-types';
import { h, JSX } from 'preact';
import { Config } from './Config';

declare global {
  interface Window {
    /** Transcend API */
    transcend?: TranscendAPI;
  }
}

/**
 * The playground entrypoint
 */
export default function Main(): JSX.Element {
  const setViewState = (viewState: ViewState): void => {
    window.transcend?.showConsentManager({ viewState });
  };

  return (
    <div>
      <h1>Consent Manager UI Playground</h1>
      <Config />

      {Object.values(ViewState).map((viewState) => (
        <button
          class="button"
          key={viewState}
          onClick={() => setViewState(viewState)}
        >
          {viewState}
        </button>
      ))}
    </div>
  );
}
