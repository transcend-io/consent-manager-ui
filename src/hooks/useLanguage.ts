// external
import { useCallback, useEffect, useState } from 'preact/hooks';

// main
import {
  ConsentManagerLanguageKey,
  TranslatedMessages,
  Translations,
} from '@transcend-io/internationalization';

export const loadedTranslations: Translations = Object.create(null);

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
const getAllSubLanguages = (langCode: ConsentManagerLanguageKey): string[] =>
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
  preferred: ConsentManagerLanguageKey[],
  supported: ConsentManagerLanguageKey[],
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
  supported: ConsentManagerLanguageKey[],
): ConsentManagerLanguageKey | undefined =>
  supported.find((language) =>
    getAllSubLanguages(language).some((lang) =>
      preferred.some((preferredLang) => preferredLang.toLowerCase() === lang),
    ),
  );

/**
 * Picks a default language for the user
 *
 * @param supportedLanguages - Set of supported languages
 * @returns the language key of the best default language for this user
 */
export function pickDefaultLanguage(
  supportedLanguages: ConsentManagerLanguageKey[],
): ConsentManagerLanguageKey {
  const preferredLanguages = getUserLanguages();
  return (
    getNearestSupportedLanguage(preferredLanguages, supportedLanguages) ||
    ConsentManagerLanguageKey.En
  );
}

/**
 * Sorts the supported languages by the user's preferences
 *
 * @param languages - an object of translations
 * @returns a list of language keys, sorted
 */
export const sortSupportedLanguagesByPreference = (
  languages: ConsentManagerLanguageKey[],
): ConsentManagerLanguageKey[] =>
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
 * Fetch message translations
 *
 * @param translationsLocation - Base path to fetching messages
 * @param language - Language to fetch
 * @returns The translations
 */
export const getTranslations = async (
  translationsLocation: string,
  language: ConsentManagerLanguageKey,
): Promise<TranslatedMessages> => {
  loadedTranslations[language] ??= await (async () => {
    const pathToFetch = `${translationsLocation}/${language}.json`;
    const response = await fetch(pathToFetch);
    if (!response.ok) {
      throw new Error(`Failed to load translations for language ${language}`);
    }
    return response.json();
  })();

  return loadedTranslations[language];
};

/**
 * Sets the language to use in translator
 *
 * @param options - Options
 * @returns the language and a change language callback
 */
export function useLanguage({
  supportedLanguages,
  translationsLocation,
}: {
  /** Set of supported languages */
  supportedLanguages: ConsentManagerLanguageKey[];
  /** Base path to fetching messages */
  translationsLocation: string;
}): {
  /** The language in use */
  language: ConsentManagerLanguageKey;
  /** A change language callback */
  handleChangeLanguage: (language: ConsentManagerLanguageKey) => void;
  /** Message translations */
  messages: TranslatedMessages | undefined;
} {
  // The current language
  const [language, setLanguage] = useState<ConsentManagerLanguageKey>(() =>
    // choose a default language based on the browser selected
    pickDefaultLanguage(supportedLanguages),
  );

  // Hold the translations for that language (fetched async)
  const [messages, setMessages] = useState<TranslatedMessages | undefined>();

  // Load the default translations
  useEffect(() => {
    getTranslations(translationsLocation, language).then((messages) =>
      setMessages(messages),
    );
  }, []);

  const handleChangeLanguage = useCallback(
    async (language: ConsentManagerLanguageKey) => {
      await getTranslations(translationsLocation, language);
      setLanguage(language);
    },
    [setLanguage],
  );

  return { language, handleChangeLanguage, messages };
}
