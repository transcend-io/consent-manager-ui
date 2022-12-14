import { ViewState } from '@transcend-io/airgap.js-types';
import { h, JSX } from 'preact';
import { Config } from './Config';
import { ConsentLog } from './ConsentLog';

/**
 * The playground entrypoint
 */
export default function Main(): JSX.Element {
  const setViewState = (viewState: ViewState): void => {
    window.transcend?.showConsentManager({ viewState });
  };

  return (
    <div>
      <Config />

      <div
        style={{
          borderBottom: '1px solid gray',
          padding: '10px',
        }}
      >
        <p style={{ fontWeight: '600', fontSize: '12px', margin: '0 0 3px 0' }}>
          Open a view
        </p>
        {Object.values(ViewState)
          .filter((viewState) => viewState !== ViewState.DoNotSellDisclosure)
          .map((viewState) => (
            <button
              class="button secondary"
              key={viewState}
              onClick={() => setViewState(viewState)}
            >
              {viewState}
            </button>
          ))}
        <button
          class="button secondary"
          onClick={(e) => window.transcend?.doNotSell(e)}
        >
          Do Not Sell or Share My Personal Information
        </button>
      </div>

      <ConsentLog />

      <div id="consent-manager-zone" />
    </div>
  );
}
