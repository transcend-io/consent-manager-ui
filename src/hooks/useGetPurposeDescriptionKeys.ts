import camelCase from 'lodash/camelCase';

import type {
  TrackingPurposeDetails,
  TrackingPurposesTypes,
} from '@transcend-io/airgap.js-types';

import { ConsentSelection } from '../types';
import { defaultTrackingPurposes } from 'src/playground/defaults';

import { useMemo } from 'preact/hooks';

import { DefinedMessage } from '@transcend-io/internationalization';

const PURPOSE_MESSAGE_PREFIX = 'purpose.trackingType';

export const useGetPurposeDescriptionKeys = ({
  consentSelection,
  defaultPurposeToDescriptionKey,
  airgapPurposes,
}: {
  /** The configured airgap purpose types */
  consentSelection: ConsentSelection;
  /** The lookup of messages for default purpose types */
  defaultPurposeToDescriptionKey: Record<string, DefinedMessage>;
  /** Airgap purposes data */
  airgapPurposes: TrackingPurposesTypes;
}): Record<string, DefinedMessage> => {
  const purposeToDescriptionKey: Record<string, DefinedMessage> = useMemo(
    () =>
      // the purpose type is unique for the bundle
      Object.keys(consentSelection ?? {}).reduce((allMessages, purposeType) => {
        const purposeMessageDescriptionId = `${PURPOSE_MESSAGE_PREFIX}.${camelCase(purposeType)}.description`;
        return {
          ...allMessages,
          [purposeType]: {
            id: purposeMessageDescriptionId,
            defaultMessage: airgapPurposes[purposeType]?.description,
            description: `Translatable description for purpose '${purposeType}'`,
          } as DefinedMessage,
        };
      }, defaultPurposeToDescriptionKey as Record<string, DefinedMessage>),
    [consentSelection, defaultPurposeToDescriptionKey],
  );

  return purposeToDescriptionKey;
};
