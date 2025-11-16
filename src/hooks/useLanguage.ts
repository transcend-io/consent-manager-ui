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
