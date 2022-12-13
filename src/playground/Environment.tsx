import { UserPrivacySignal } from '@transcend-io/airgap.js-types';
import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';

/**
 * Get current privacy signals
 */
export function getPrivacySignalsFromLocalStorage(): Set<UserPrivacySignal> {
  const privacySignalsString = localStorage.getItem('getPrivacySignals');
  if (!privacySignalsString) {
    localStorage.setItem('getPrivacySignals', JSON.stringify([]));
  }
  return new Set(JSON.parse(privacySignalsString));
}

/**
 * Browser environment
 */
export function Environment(): JSX.Element {
  const [gpcChecked, setGpcChecked] = useState<boolean>(
    getPrivacySignalsFromLocalStorage().has('GPC'),
  );
  const [dntChecked, setDntChecked] = useState<boolean>(
    getPrivacySignalsFromLocalStorage().has('DNT'),
  );

  const handleGpcChecked = (): void => {
    setGpcChecked(!gpcChecked);
  };
  const handleDntChecked = (): void => {
    setDntChecked(!dntChecked);
  };

  const privacySignals = [];
  if (gpcChecked) privacySignals.push('GPC');
  if (dntChecked) privacySignals.push('DNT');
  localStorage.setItem('getPrivacySignals', JSON.stringify(privacySignals));

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '28px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          id="GPC"
          name="GPC"
          checked={gpcChecked}
          onClick={handleGpcChecked}
          style={{ marginLeft: 0 }}
        />
        <label for="GPC">GPC</label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
        <input
          type="checkbox"
          id="DNT"
          name="DNT"
          checked={dntChecked}
          onClick={handleDntChecked}
        />
        <label for="DNT">DNT</label>
      </div>
    </form>
  );
}
