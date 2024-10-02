import type {
  GetTranscendPolicies,
  TranscendPolicy,
} from '@transcend-io/airgap.js-types';
import type {
  ConsentManagerLanguageKey,
  LanguageKey,
} from '@transcend-io/internationalization';
import type { ObjByString } from '@transcend-io/type-utils';
import { compile } from './compile';

/**
 * Update a translation for a particular message
 *
 * @param translations - Translations
 * @param locale - The language to fetch
 * @returns The message with the translation updated or created
 */
function getTranslation(
  translations: {
    /** Language of translation */
    locale: LanguageKey;
    /** Value of translation */
    value: string;
  }[],
  locale: LanguageKey,
): string {
  return (
    translations.find((translation) => translation.locale === locale)?.value ||
    ''
  );
}

/**
 * Fetch a set of policy documents defined in Transcend.
 *
 * Pull the proper translation for the specified policies, and inject any template variables.
 *
 * @param input - Input for fetching policies
 * @param cdnLocation - Location of the CDN to fetch the policy from
 * @param activeLocale - The currently active locale
 * @param activeVariables - Active global variables
 * @returns the fetched policies
 */
export async function getTranscendPolicies(
  input: GetTranscendPolicies,
  cdnLocation: string,
  activeLocale: ConsentManagerLanguageKey,
  activeVariables: ObjByString,
): Promise<TranscendPolicy[]> {
  // The URL to pull the translation from
  const resolvedUrl = `${cdnLocation}/privacyCenterPolicies-${
    input.locale || activeLocale
  }.json`;

  // Fetch the content
  const response = await fetch(resolvedUrl);

  // Check if the response is ok (status code 200-299)
  if (!response.ok) {
    throw new Error(`Network response was not ok ${response.statusText}`);
  }

  // Parse the JSON data from the response
  const parsed = await response.json();

  // Grab all variables
  const allVariables = {
    ...activeVariables,
    ...input.variables,
  };

  // TODO: https://transcend.height.app/T-39372 - enforce API shape with codec
  // Convert the parsed data into the expected format
  const formatted: TranscendPolicy[] = parsed.map(
    (policy: {
      /** ID of policy  */
      id: string;
      /** Title of policy */
      title: {
        /** Default message of title */
        defaultMessage: string;
      };
      /** Versions of policy */
      versions: {
        /** Content of policy */
        content: {
          /** Default message of content */
          defaultMessage: string;
          /** Translations */
          translations: {
            /** Language of translation */
            locale: LanguageKey;
            /** Value of translation */
            value: string;
          }[];
        };
      }[];
    }): TranscendPolicy => {
      const content =
        getTranslation(policy.versions[0].content.translations, activeLocale) ||
        getTranslation(
          policy.versions[0].content.translations,
          activeLocale.split('-')[0] as LanguageKey,
        ) ||
        policy.versions[0].content.defaultMessage;
      return {
        id: policy.id,
        title: policy.title.defaultMessage,
        content: Object.keys(allVariables).length
          ? compile(content, allVariables)
          : content,
      };
    },
  );

  // Filter by IDs of titles
  return input.policyIds || input.policyTitles
    ? formatted.filter(
        (policy) =>
          (input.policyIds || []).includes(policy.id) ||
          (input.policyTitles || []).includes(policy.title),
      )
    : formatted;
}
