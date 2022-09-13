/* eslint-disable no-console */
/* eslint-disable no-alert */
import { h, JSX } from 'preact';
import { TrackingPurposesTypes } from '@transcend-io/airgap.js-types';
import { useState } from 'preact/hooks';
import { isRight } from 'fp-ts/Either';

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
function validate(trackingPurposes: string): TrackingPurposesTypes {
  try {
    const newTrackingPurposes: TrackingPurposesTypes =
      JSON.parse(trackingPurposes);
    const decoded = TrackingPurposesTypes.decode(newTrackingPurposes);
    const isValid = isRight(decoded);
    if (!isValid) {
      console.error('Invalid tracking purposes', decoded);
      alert('Invalid object');
    }
    return newTrackingPurposes as TrackingPurposesTypes;
  } catch (error) {
    alert(`Invalid JSON\n${JSON.stringify(error, null, 2)}`);
    throw error;
  }
}

/**
 * The playground entrypoint
 */
export function ConfigTrackingPurposes(): JSX.Element {
  const [trackingPurposes, setTrackingPurposes] =
    useState<TrackingPurposesTypes>(defaultTrackingPurposes);

  const handleChange: JSX.GenericEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    const newTrackingPurposes = validate(event.currentTarget.value);
    setTrackingPurposes(newTrackingPurposes);
  };

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    localStorage.setItem('trackingPurposes', JSON.stringify(trackingPurposes));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="config-form">
        <label>
          Tracking purposes
          <code>
            <textarea
              style={{ height: '500px' }}
              type="text"
              name="trackingPurposes"
              value={JSON.stringify(trackingPurposes, null, 2)}
              onChange={handleChange}
            />
          </code>
        </label>

        <input type="submit" />
      </form>
    </div>
  );
}
/* eslint-enable no-console */
/* eslint-enable no-alert */
