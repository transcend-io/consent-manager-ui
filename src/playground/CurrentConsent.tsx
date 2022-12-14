import { TrackingConsentDetails } from '@transcend-io/airgap.js-types';
import { h, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { airgapStub } from './airgapStub';

/**
 * Current consent
 */
export function CurrentConsent(): JSX.Element {
  const [currentConsent, setCurrentConsent] = useState<TrackingConsentDetails>(
    airgapStub.getConsent(),
  );

  useEffect(() => {
    localStorage.setItem('currentConsent', JSON.stringify(currentConsent));
  }, [currentConsent]);

  const handleChange = (purpose: string, value: boolean): void => {
    const newConsent = {
      ...currentConsent,
      purposes: { ...currentConsent.purposes, [purpose]: value },
    };
    setCurrentConsent(newConsent);
  };

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '28px',
      }}
    >
      {Object.entries(currentConsent.purposes).map(([purpose, value], i) => (
        <div
          key={purpose}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: i ? '5px' : '',
          }}
        >
          <input
            type="checkbox"
            id={purpose}
            name={purpose}
            checked={!!value}
            onClick={() => handleChange(purpose, !value)}
          />
          <label for={purpose}>{purpose}</label>
        </div>
      ))}
    </form>
  );
}
