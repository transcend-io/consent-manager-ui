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
        const shadow = elt.shadowRoot;
        const interiorContainer = shadow.children[0];
        console.log(interiorContainer);
        const modal = interiorContainer.querySelectorAll('.modal-container');
        console.log(modal);

        modal.style.position = 'absolute';
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
