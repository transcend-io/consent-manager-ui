import { AirgapAPI, TranscendAPI } from '@transcend-io/airgap.js-types';
import { h, FunctionComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';

/**
 * Global window with airgap instance attached
 */
type WindowWithAirgap = typeof self & {
  /** Airgap instance should have been initialized on self when script added in header */
  transcend: TranscendAPI;
  /** Airgap API */
  airgap: AirgapAPI;
};

/**
 * A button that implements the logic for Do Not Sell/Do Not Share
 * to ensure compliance with laws like CPRA, CPA, CDPA
 */
export const DoNotSellButton: FunctionComponent = () => {
  // Ensure airgap was initialized
  const selfWithAirgap = self as WindowWithAirgap;
  if (!selfWithAirgap.airgap || !selfWithAirgap.transcend) {
    throw new Error(`Expected airgap and transcend to be initialized on self!`);
  }

  // Check if the user is opted into sale of data
  const [isSellingData, setIsSellingData] = useState(
    !!selfWithAirgap.airgap.getConsent().purposes.SaleOfInfo,
  );

  // update state variable when consent values change
  useEffect(() => {
    // Callback to re-calculate consent preferences
    const onConsentChange = (): void => {
      setIsSellingData(
        !!selfWithAirgap.airgap.getConsent().purposes.SaleOfInfo,
      );
    };

    // Add listener on change to re-calculate consent preferences
    selfWithAirgap.airgap.addEventListener('consent-change', onConsentChange);

    // Remove event listener when component dismounts
    return () =>
      selfWithAirgap.airgap.removeEventListener(
        'consent-change',
        onConsentChange,
      );
  }, [selfWithAirgap.airgap]);

  return (
    <button
      onClick={
        // only open modal if user is currently opted out
        isSellingData
          ? (event) => selfWithAirgap.transcend.doNotSell(event)
          : undefined
      }
      disabled={!isSellingData}
    >
      {isSellingData
        ? 'Do Not Sell My Personal Information'
        : 'We No Longer Sell Your Personal Information'}
    </button>
  );
};
