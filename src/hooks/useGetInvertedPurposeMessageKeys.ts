import { ConsentSelection } from '../types';

import { useMemo } from 'preact/hooks';

import { DefinedMessage } from '@transcend-io/internationalization';

const PURPOSE_MESSAGE_PREFIX = 'purpose.trackingType';

export const useGetInvertedPurposeMessageKeys = ({
  consentSelection,
  defaultPurposeToMessageKey,
}: {
  /** The configured airgap purpose types */
  consentSelection: ConsentSelection;
  /** The lookup of messages for default purpose types */
  defaultPurposeToMessageKey: Record<string, DefinedMessage>;
}): Record<string, DefinedMessage> => {
  const purposeToMessageKey: Record<string, DefinedMessage> = useMemo(
    () =>
      // the purpose type is unique for the bundle
      [...Object.keys(consentSelection ?? {}), 'Essential'].reduce(
        (allMessages, purposeType) => {
            if (allMessages[purposeType]) {
                return allMessages;
            }
            const purposeMessageLabel = `${PURPOSE_MESSAGE_PREFIX}.${purposeType}.title`;
            return {
                ...allMessages,
                [purposeType]: {
                id: purposeMessageLabel,
                defaultMessage: defaultPurposeToMessageKey[purposeType]?.defaultMessage
                    || purposeType,
                description: `Translatable name for purpose '${purposeType}'`,
                } as DefinedMessage,
            };
        },
        defaultPurposeToMessageKey as Record<string, DefinedMessage>,
      ),
    [consentSelection, defaultPurposeToMessageKey],
  );

  return purposeToMessageKey;
};
