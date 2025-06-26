import {
  ConsentManagerSupportedTranslationValue,
  CONSENT_MANAGER_SUPPORTED_LOCALES,
  LocaleValue,
  NATIVE_LANGUAGE_NAMES,
} from '@transcend-io/internationalization';

/**
 * Languages names, written in their native language
 * Omits some unnecessarily specific or duplicate languages
 */
export const nativeConsentLocaleNames = Object.fromEntries(
  (Object.entries(NATIVE_LANGUAGE_NAMES) as [LocaleValue, string][]).filter(
    ([key]) =>
      (Object.values(CONSENT_MANAGER_SUPPORTED_LOCALES) as string[]).includes(
        key
      ),
  ),
) as Pick<
  typeof NATIVE_LANGUAGE_NAMES,
  ConsentManagerSupportedTranslationValue
>;
