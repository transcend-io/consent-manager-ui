import { AirgapAPI } from '@transcend-io/airgap.js-types';
import { ConsentSelection } from './types';

/**
 * Helper to get the tracking purposes for rendering
 * in the consent prompt UI
 *
 * @param airgap - airgap.js API
 * @returns The tracking purposes which should be rendered
 */
export function getConsentSelections(airgap: AirgapAPI): ConsentSelection {
  // Get the current consent state of Airgap from storage
  const consent = airgap.getConsent();

  // Prepare a mapping between purposes and consent selections from local storage
  const initialConsentSelections: ConsentSelection = {};

  // Get the purposes for processing configured for this organization.
  const purposeTypes = airgap.getPurposeTypes();

  // By default reflect airgap.getPurposeTypes API
  Object.keys(purposeTypes).forEach((purpose) => {
    const { configurable, showInConsentManager } = purposeTypes[purpose];

    if (showInConsentManager && configurable) {
      // For purposes that you can opt in/out of, prepare toggles
      initialConsentSelections[purpose] = !!consent.purposes[purpose];
    }
  });

  return initialConsentSelections;
}
