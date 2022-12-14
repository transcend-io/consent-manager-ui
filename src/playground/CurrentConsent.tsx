import { TrackingConsentDetails } from '@transcend-io/airgap.js-types';
import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { airgapStub } from './airgapStub';

/**
 * Current consent
 */
export function CurrentConsent(): JSX.Element {
  const [currentConsent, setCurrentConsent] = useState<TrackingConsentDetails>(
    getDefaultConsent(),
  );

  /**
   * Check purpose types and set them all to true for default
   * Return type same as `airgap.getConsent()`
   */
  function getDefaultConsent(): TrackingConsentDetails {
    const purposeTypes = airgapStub.getPurposeTypes();
    const purposes: Record<string, boolean> = {};
    Object.keys(purposeTypes).forEach((purpose) => {
      purposes[purpose] = true;
    });
    return {
      purposes,
      confirmed: true,
      timestamp: new Date().toISOString(),
    };
  }

  const handleChange = (purpose: string, value: boolean): void => {
    const newConsent = {
      ...currentConsent,
      purposes: { ...currentConsent.purposes, [purpose]: value },
    };
    setCurrentConsent(newConsent);
  };

  // localStorage.setItem('currentConsent', JSON.stringify(privacySignals));

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
