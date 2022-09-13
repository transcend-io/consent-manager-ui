/* eslint-disable no-console */

import { Fragment, h, JSX } from 'preact';
import { TrackingPurposesTypes } from '@transcend-io/airgap.js-types';
import { useState } from 'preact/hooks';
import reporter from 'io-ts-reporters';

const defaultTrackingPurposes: TrackingPurposesTypes = {
  Advertising: {
    defaultConsent: 'Auto',
    configurable: true,
    essential: false,
    name: 'Advertising',
    description: 'Helps us and others serve ads relevant to you.',
    showInConsentManager: true,
    trackingType: 'Advertising',
  },
  Functional: {
    defaultConsent: 'Auto',
    configurable: true,
    essential: false,
    name: 'Functional',
    description: 'Personalization, autofilled forms, etc.',
    showInConsentManager: true,
    trackingType: 'Functional',
  },
  SaleOfInfo: {
    defaultConsent: 'Auto',
    configurable: true,
    essential: false,
    name: 'SaleOfInfo',
    description: 'Sale of personal information.',
    showInConsentManager: true,
    trackingType: 'SaleOfInfo',
  },
  Analytics: {
    defaultConsent: 'Auto',
    configurable: true,
    essential: false,
    name: 'Analytics',
    description: 'Help us learn how our site is used and how it performs.',
    showInConsentManager: true,
    trackingType: 'Analytics',
  },
  Essential: {
    name: 'Essential',
    description: '',
    defaultConsent: true,
    configurable: false,
    essential: true,
    showInConsentManager: false,
  },
  Unknown: {
    name: 'Unknown',
    description: '',
    defaultConsent: false,
    configurable: false,
    essential: false,
    showInConsentManager: false,
  },
};

/**
 * Validate trackingPurposes input
 */
function validate(trackingPurposes: string):
  | {
      /** Error message */
      errors: string[];
    }
  | {
      /** Valid object */
      obj: TrackingPurposesTypes;
    } {
  try {
    const newTrackingPurposes: TrackingPurposesTypes =
      JSON.parse(trackingPurposes);
    const decoded = TrackingPurposesTypes.decode(newTrackingPurposes);
    const errors = reporter.report(decoded);
    if (errors.length) {
      console.error('Invalid tracking purposes', errors);
      return {
        errors,
      };
    }
    return {
      obj: newTrackingPurposes as TrackingPurposesTypes,
    };
  } catch (error) {
    return {
      errors: [`Invalid JSON\n${JSON.stringify(error, null, 2)}`],
    };
  }
}

/**
 * The playground entrypoint
 */
export function ConfigTrackingPurposes(): JSX.Element {
  const [trackingPurposes, setTrackingPurposes] =
    useState<TrackingPurposesTypes>(defaultTrackingPurposes);
  const [validationErrorMessages, setValidationErrorMessages] = useState<
    string[]
  >(['']);

  const handleChange: JSX.GenericEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    const newTrackingPurposes = validate(event.currentTarget.value);
    if ('errors' in newTrackingPurposes) {
      setValidationErrorMessages(newTrackingPurposes.errors);
    } else {
      setTrackingPurposes(newTrackingPurposes.obj);
      setValidationErrorMessages([]);
    }
  };

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    localStorage.setItem('trackingPurposes', JSON.stringify(trackingPurposes));
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} class="in">
        <label for="trackingPurposes">Tracking purposes</label>
        <textarea
          id="trackingPurposes"
          style={{ height: '300px' }}
          type="text"
          name="trackingPurposes"
          value={JSON.stringify(trackingPurposes, null, 2)}
          onChange={handleChange}
        />

        <input type="submit" />
      </form>
      <ul>
        {validationErrorMessages.map((validationErrorMessage) => (
          <li key={validationErrorMessage}>{validationErrorMessage}</li>
        ))}
      </ul>
    </Fragment>
  );
}
/* eslint-enable no-console */
