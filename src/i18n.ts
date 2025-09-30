import {
  ConsentManagerSupportedTranslationValue,
  CONSENT_MANAGER_SUPPORTED_LOCALES,
  LocaleValue,
  NATIVE_LANGUAGE_NAMES,
} from '@transcend-io/internationalization';

/**
 * Languages names, written in their native language
 * Omits some unnecessarily specific or duplicate languages
 *
 * Trims "(${country})" from the language name if it's the only instance of that language
 * (i.e., "English (US)" becomes "English" when it's the only version of "en" available)
 */
export const nativeConsentLocaleNames = Object.fromEntries(
  (Object.entries(NATIVE_LANGUAGE_NAMES) as [LocaleValue, string][]).filter(
    ([key]) =>
      (Object.values(CONSENT_MANAGER_SUPPORTED_LOCALES) as string[]).includes(
        key,
      ),
  ).map(([localeValue, languageName], index, list) => {
    const [languageCode] = localeValue.split('-');
    // Check if this is the only instance of this language code (e.g., ["en-US"], but not ["en-US", "en-GB"])
    if (list.filter(([localeValue]) => localeValue.split('-')[0] === languageCode).length === 1) {
      return [localeValue, languageName.replace(/\(.+?\)/g, '').trim()];
    }
    return [localeValue, languageName];
  }),
) as Pick<
  typeof NATIVE_LANGUAGE_NAMES,
  ConsentManagerSupportedTranslationValue
>;
