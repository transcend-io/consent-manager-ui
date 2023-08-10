import { ConsentSelection } from '../types';

import { useMemo } from 'preact/hooks';

import { DefinedMessage } from '@transcend-io/internationalization';

const CUSTOM_PURPOSE_MESSAGE_PREFIX = 'cm-ui.purpose';

export const useGetPurposeMessageKeys = ({
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
      Object.keys(consentSelection ?? {}).reduce((allMessages, purposeType) => {
        if (allMessages[purposeType]) {
          return allMessages;
        }
        const customPurposeMessageLabel = `${CUSTOM_PURPOSE_MESSAGE_PREFIX}.${purposeType}`;
        return {
          ...allMessages,
          [purposeType]: {
            id: customPurposeMessageLabel,
            defaultMessage: purposeType,
            description: `Translatable name for custom purpose '${purposeType}'`,
          } as DefinedMessage,
        };
      }, defaultPurposeToMessageKey as Record<string, DefinedMessage>),
    [consentSelection, defaultPurposeToMessageKey],
  );

  return purposeToMessageKey;
};
