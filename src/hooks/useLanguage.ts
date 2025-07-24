import { useCallback, useEffect, useState } from 'preact/hooks';
import {
  ConsentManagerSupportedTranslationValue,
  LocaleValue,
  LOCALE_KEY,
  LOCALE_TRANSLATION_MAP,
  TranslatedMessages,
  Translations,
} from '@transcend-io/internationalization';
import { settings } from '../settings';
import { getUserLocales } from '../utils/get-user-locales';
import { substituteHtml } from '../utils/substitute-html';
import { invertSafe } from '@transcend-io/type-utils';

export const loadedTranslations: Translations = Object.create(null);

/** Mapping of AWS base translation keys to list of Transcend locales that should use them */
export const INVERTED_TRANSLATE_LOCALE = invertSafe(LOCALE_TRANSLATION_MAP);

const getDuplicativeLocales = (lang: LocaleValue): LocaleValue[] =>
  INVERTED_TRANSLATE_LOCALE[LOCALE_TRANSLATION_MAP[lang]];

/**
 * Get nearest matching language from a list of supported languages
 *
 * @param preferred - Sorted language list in order of most preferable to least preferable
 * @param supported - List of supported languages to match from
 * @returns Nearest supported language, sorted by preferred language list
 */
export const getNearestSupportedLanguage = (
  preferred: LocaleValue[],
  supported: LocaleValue[],
): LocaleValue | undefined =>
  supported.find((language) =>
    preferred.some((preferredLang) => preferredLang.toLowerCase() === language),
  );

/**
 * Get nearest matching locale from a list of supported locales
 *
 * @param preferred - Sorted locale list in order of most preferable to least preferable
 * @param supported - List of supported locales to match from
 * @returns Nearest supported locale, sorted by preferred locale list
 */
export const getNearestSupportedLocale = (
  preferred: LocaleValue[],
  supported: LocaleValue[],
): LocaleValue | undefined => {
  // eslint-disable-next-line no-restricted-syntax
  for (const preferredLocale of preferred) {
    if (supported.includes(preferredLocale)) {
      return preferredLocale;
    }
  }
  return undefined;
};

/**
 * Picks a default language for the user
 *
 * @param supportedLocales - Set of supported locales
 * @returns the language key of the best default language for this user
 */
export function pickDefaultLanguage(
  supportedLocales: ConsentManagerSupportedTranslationValue[],
): ConsentManagerSupportedTranslationValue {
  if (settings.locale && supportedLocales.includes(settings.locale)) {
    return settings.locale;
  }

  const preferredLocales = getUserLocales();
  /* We should refactor this ASAP TODO: https://transcend.height.app/T-39777
   * Extend supportedLanguages to include locales that we consider equivalent
   * e.g. instead of just having en, include en-US, en-GB, en-AU, etc
   */
  const extendedSupportedLanguages = supportedLocales.flatMap((lang) =>
    getDuplicativeLocales(lang),
  );
  const nearestExtendedLanguage =
    getNearestSupportedLocale(preferredLocales, extendedSupportedLanguages) ||
    LOCALE_KEY.En;

  let nearestTranslation = nearestExtendedLanguage;
  if (!(supportedLocales as string[]).includes(nearestTranslation)) {
    nearestTranslation =
      getDuplicativeLocales(nearestTranslation).find((lang) =>
        supportedLocales.includes(
          lang as ConsentManagerSupportedTranslationValue,
        ),
      ) ?? LOCALE_KEY.En;
  }
  return nearestTranslation as ConsentManagerSupportedTranslationValue;
}

/**
 * Fetch message translations
 *
 * @param translationsLocation - Base path to fetching messages
 * @param language - Language to fetch
 * @returns The translations
 */
export const getTranslations = async (
  translationsLocation: string,
  language: ConsentManagerSupportedTranslationValue,
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
  supportedLanguages: ConsentManagerSupportedTranslationValue[];
  /** Base path to fetching messages */
  translationsLocation: string;
}): {
  /** The language in use */
  language: ConsentManagerSupportedTranslationValue;
  /** A change language callback */
  handleChangeLanguage: (
    language: ConsentManagerSupportedTranslationValue,
  ) => void;
  /** Message translations */
  messages: TranslatedMessages | undefined;
  /** HTML opening/closing tab variables */
  htmlTagVariables: Record<string, string>;
} {
  // The current language
  const [language, setLanguage] =
    useState<ConsentManagerSupportedTranslationValue>(() =>
      // choose a default language based on the browser selected
      pickDefaultLanguage(supportedLanguages),
    );

  // Hold the translations for that language (fetched async)
  const [messages, setMessages] = useState<TranslatedMessages | undefined>();

  // Store the HTML opening/closing tags we need to replace our tag variables with
  const [htmlTagVariables, setHtmlTagVariables] = useState<
    Record<string, string>
  >({});

  // Load the default translations
  useEffect(() => {
    getTranslations(translationsLocation, language).then((messages) => {
      // Replace raw HTML tags with variables bc raw HTML causes parsing errors
      const { substitutedMessages, tagVariables } = substituteHtml(messages);
      setHtmlTagVariables(tagVariables);
      setMessages(substitutedMessages);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeLanguage = useCallback(
    async (language: ConsentManagerSupportedTranslationValue) => {
      const newMessages = await getTranslations(translationsLocation, language);

      // Replace raw HTML tags with variables bc raw HTML causes parsing errors
      const { substitutedMessages, tagVariables } = substituteHtml(newMessages);
      setMessages(substitutedMessages);
      setHtmlTagVariables(tagVariables);
      setLanguage(language);
    },
    [setLanguage, translationsLocation],
  );

  return { language, handleChangeLanguage, messages, htmlTagVariables };
}
