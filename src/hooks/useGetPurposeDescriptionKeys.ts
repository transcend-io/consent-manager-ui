import type { TrackingPurposesTypes } from '@transcend-io/airgap.js-types';

import { ConsentSelection } from '../types';

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
      // hard-coding Essential since it's not provided by consentSelection
      [...Object.keys(consentSelection ?? {}), 'Essential'].reduce(
        (allMessages, purposeType) => {
          // making sure default message for Essential is not overwritten
          // by missing Essential message from airgap
          if (airgapPurposes[purposeType]?.description) {
            const purposeMessageDescriptionId = `${PURPOSE_MESSAGE_PREFIX}.${purposeType}.description`;
            return {
              ...allMessages,
              [purposeType]: {
                id: purposeMessageDescriptionId,
                defaultMessage: airgapPurposes[purposeType]?.description,
                description: `Translatable description for purpose '${purposeType}'`,
              } as DefinedMessage,
            };
          }
          return { ...allMessages };
        },
        defaultPurposeToDescriptionKey as Record<string, DefinedMessage>,
      ),
    [consentSelection, defaultPurposeToDescriptionKey],
  );

  return purposeToDescriptionKey;
};
