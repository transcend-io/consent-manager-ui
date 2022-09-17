import { ViewState } from '@transcend-io/airgap.js-types';
import { h, JSX } from 'preact';
import { Config } from './Config';

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
          width: '100%',
          borderBottom: '1px solid gray',
          padding: '10px',
        }}
      >
        <p style={{ fontWeight: '600', fontSize: '12px', margin: '0 0 3px 0' }}>
          Open a view
        </p>
        {Object.values(ViewState).map((viewState) => (
          <button
            class="button secondary"
            key={viewState}
            onClick={() => setViewState(viewState)}
          >
            {viewState}
          </button>
        ))}
      </div>

      <div id="consent-manager-zone" />
    </div>
  );
}
