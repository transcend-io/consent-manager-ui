import { ConsentSelection } from 'src/types';

import { useMemo } from 'preact/hooks';

import { DefinedMessage } from '@transcend-io/internationalization';

export interface PurposeMessages {
  /** The lookup of purpose trackingTypes to message key */
  purposeToMessageKey: Record<string, DefinedMessage>;
  /** The order of all purposes */
  orderOfPurposes: string[]
}

export const useGetPurposeMessageKeys = ({ consentSelection, defaultPurposeToMessageKey }: {
  /** The configured airgap purpose types */
  consentSelection: ConsentSelection;
  /** The lookup of messages for default purpose types */
  defaultPurposeToMessageKey: Record<string, DefinedMessage>;
}): PurposeMessages => {
  const purposeToMessageKey: Record<string, DefinedMessage> = useMemo(
    () =>
      // the purpose type is unique for the bundle
      Object.keys(consentSelection ?? {}).reduce(
        (allMessages, purposeType) => {
          if (allMessages[purposeType]) {
            return allMessages;
          }
          const customPurposeMessageLabel = `purpose.${purposeType}`;
          return {
            ...allMessages,
            [purposeType]: {
              id: customPurposeMessageLabel,
              defaultMessage: purposeType,
              description: `Translatable name for custom purpose '${purposeType}'`,
            } as DefinedMessage,
          };
        },
        defaultPurposeToMessageKey as Record<string, DefinedMessage>,
      ),
    [consentSelection, defaultPurposeToMessageKey],
  );
  const orderOfPurposes = useMemo(
    () => Object.keys(purposeToMessageKey),
    [purposeToMessageKey],
  );
  return { purposeToMessageKey, orderOfPurposes };
}
