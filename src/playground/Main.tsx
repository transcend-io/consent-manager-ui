import { ViewState } from '@transcend-io/airgap.js-types';
import { h, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Config } from './Config';

/**
 * The playground entrypoint
 */
export default function Main(): JSX.Element {
  // const [consentManager, setConsentManager] = useState<HTMLElement | null>(
  //   null,
  // );
  const setViewState = (viewState: ViewState): void => {
    window.transcend?.showConsentManager({ viewState });
  };

  useEffect(() => {
    const pollForConsentUI = setInterval(() => {
      const elt = document.getElementById('transcend-consent-manager');
      if (elt) {
        clearInterval(pollForConsentUI);
        // setConsentManager(elt);

        const targetZone = document.getElementById('consent-manager-zone');
        if (!targetZone) {
          throw new Error('Missing Consent target zone.');
        }
        targetZone.appendChild(elt);
      }
    }, 50);
  }, []);

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
            class="button"
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
