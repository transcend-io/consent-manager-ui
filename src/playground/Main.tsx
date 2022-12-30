import { CopiedViewStates } from '../config';
import type { ViewState } from '@transcend-io/airgap.js-types';
import { h, JSX } from 'preact';
import { Config } from './Config';
import { ConsentLog } from './ConsentLog';
import { CurrentConsent } from './CurrentConsent';

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

      {/* View State laucher */}
      <div
        style={{
          borderBottom: '1px solid gray',
          padding: '10px',
        }}
      >
        <p style={{ fontWeight: '600', fontSize: '12px', margin: '0 0 3px 0' }}>
          Open a view
        </p>
        {Object.values(CopiedViewStates)
          .filter((viewState) => viewState !== 'DoNotSellDisclosure')
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

      {/* Current consent */}
      <div
        style={{
          borderBottom: '1px solid gray',
          padding: '10px',
        }}
      >
        <p style={{ fontWeight: '600', fontSize: '12px', margin: '0 0 3px 0' }}>
          Current consent (in the playground, this will not change based on
          selections in the UI)
        </p>
        <CurrentConsent />
      </div>

      <ConsentLog />

      <div id="consent-manager-zone" />
    </div>
  );
}
