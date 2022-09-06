// external
import { useCallback, useState } from 'preact/hooks';

// main
import { LanguageKey } from '@transcend-io/internationalization';

// global
import { CONSENT_MANAGER_TRANSLATIONS } from '../translations/constants';
import { getTranslations } from '../translations/loader';

/**
 * Detect user-preferred languages from the user agent
 *
 * @returns an ordered list of preferred languages in BCP47 format
 */
export function getUserLanguages(): readonly string[] {
  return navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language];
}

/**
 * Get all potential sub-languages from a given ISO 639-1 or BCP47 language code
 *
 * @param langCode - ISO 639-1 or BCP47 format language code
 * @returns Array of potential sub-languages, sorted by most to least specific
 */
const getAllSubLanguages = (langCode: LanguageKey): string[] =>
  langCode
    .toLowerCase()
    .split('-')
    .flatMap((_, i, tags) => tags.slice(0, i + 1).join('-'))
    .reverse();

/**
 * Match preferred language list against a supported languages list
 *
 * @param preferred - Sorted language list in order of most preferable to least preferable
 * @param supported - List of supported languages to match from
 * @returns Preferred languages (including sub-language matches) that match supported languages list
 */
export const matchLanguages = (
  preferred: LanguageKey[],
  supported: LanguageKey[],
): string[] => {
  const matches = new Set<string>();
  const allSupportedLanguages = supported.flatMap(getAllSubLanguages);
  return preferred.flatMap(getAllSubLanguages).filter((language) => {
    if (!allSupportedLanguages.includes(language)) {
      return false;
    }
    const unique = !matches.has(language);
    if (unique) {
      matches.add(language);
    }
    return unique;
  });
};

/**
 * Get nearest matching language from a list of supported languages
 *
 * @param preferred - Sorted language list in order of most preferable to least preferable
 * @param supported - List of supported languages to match from
 * @returns Nearest supported language, sorted by preferred language list
 */
export const getNearestSupportedLanguage = (
  preferred: readonly string[],
  supported: LanguageKey[],
): LanguageKey | undefined =>
  supported.find((language) =>
    getAllSubLanguages(language).some((lang) =>
      preferred.some((preferredLang) => preferredLang.toLowerCase() === lang),
    ),
  );

/**
 * Picks a default language for the user
 *
 * @returns the language key of the best default language for this user
 */
export function pickDefaultLanguage(): LanguageKey {
  const preferredLanguages = getUserLanguages();
  const supportedLanguages = CONSENT_MANAGER_TRANSLATIONS;
  return (
    getNearestSupportedLanguage(preferredLanguages, supportedLanguages) ||
    LanguageKey.En
  );
}

/**
 * Sorts the supported languages by the user's preferences
 *
 * @param languages - an object of translations
 * @returns a list of language keys, sorted
 */
export const sortSupportedLanguagesByPreference = (
  languages: LanguageKey[],
): LanguageKey[] =>
  languages.sort((a, b) => {
    const preferredLanguagesFull = getUserLanguages();

    // Only use first token e.g. fr-CA => fr, and remove dupes e.g. [en-US, en] => [en], by casting to set
    const preferredLanguagesShort = [
      ...new Set(preferredLanguagesFull.map((l) => l.split('-')[0])),
    ];
    const rank = (l: string): number =>
      preferredLanguagesFull.includes(l)
        ? preferredLanguagesFull.indexOf(l)
        : preferredLanguagesShort.includes(l)
        ? preferredLanguagesShort.indexOf(l)
        : Infinity;
    return rank(a) - rank(b);
  });

/**
 * Sets the language to use in translator
 *
 * @returns the language and a change language callback
 */
export function useLanguage(): {
  /** The language in use */
  language: LanguageKey;
  /** A change language callback */
  handleChangeLanguage: (language: LanguageKey) => void;
} {
  // Set the language
  const [language, setLanguage] = useState<LanguageKey>(() =>
    pickDefaultLanguage(),
  );

  const handleChangeLanguage = useCallback(
    async (language: LanguageKey) => {
      await getTranslations(language);
      setLanguage(language);
    },
    [setLanguage],
  );

  return { language, handleChangeLanguage };
}
