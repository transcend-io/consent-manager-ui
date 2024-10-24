import { useCallback, useEffect, useState } from 'preact/hooks';
import {
  ConsentManagerLanguageKey,
  LanguageKey,
  TranslatedMessages,
  Translations,
} from '@transcend-io/internationalization';
import { settings } from '../settings';
import { substituteHtml } from '../utils/substitute-html';
import { invertSafe } from '@transcend-io/type-utils';

export const loadedTranslations: Translations = Object.create(null);

/**
 * Mapping of browser locale to AWS base translation key
 *
 * TODO: https://transcend.height.app/T-39777
 * This is here for a quick fix of our CM UI translation logic. Copied from the monorepo's extract_intl.ts
 * This should be removed ASAP (it should be in the intl repo and imported, not in here or extract_intl.ts)
 */
export const TRANSLATE_LOCALE: { [k in LanguageKey]: string } = {
  [LanguageKey.EsEs]: 'es',
  [LanguageKey.NlNl]: 'nl',
  [LanguageKey.NlBe]: 'nl',
  [LanguageKey.Es419]: 'es-MX',
  [LanguageKey.ZhHk]: 'zh-TW',
  [LanguageKey.AfZz]: 'af',
  [LanguageKey.Ar]: 'ar',
  [LanguageKey.En]: 'en',
  [LanguageKey.Fr]: 'fr',
  [LanguageKey.Es]: 'es',
  [LanguageKey.De]: 'de',
  [LanguageKey.It]: 'it',
  [LanguageKey.Ja]: 'ja',
  [LanguageKey.Ru]: 'ru',
  [LanguageKey.ArAe]: 'ar',
  [LanguageKey.FrFr]: 'fr',
  [LanguageKey.DeDe]: 'de',
  [LanguageKey.ItIt]: 'it',
  [LanguageKey.BgBg]: 'bg',
  [LanguageKey.ZhCn]: 'zh',
  [LanguageKey.HrHr]: 'hr',
  [LanguageKey.CsCz]: 'cs',
  [LanguageKey.DaDk]: 'da',
  [LanguageKey.EnGb]: 'en',
  [LanguageKey.FiFi]: 'fi',
  [LanguageKey.ElGr]: 'el',
  [LanguageKey.HiIn]: 'hi',
  [LanguageKey.HuHu]: 'hu',
  [LanguageKey.IdId]: 'id',
  [LanguageKey.JaJp]: 'ja',
  [LanguageKey.KoKr]: 'ko',
  [LanguageKey.LtLt]: 'lt',
  [LanguageKey.MsMy]: 'ms',
  [LanguageKey.NbNi]: 'no',
  [LanguageKey.PlPl]: 'pl',
  [LanguageKey.PtBr]: 'pt',
  [LanguageKey.PtPt]: 'pt',
  [LanguageKey.RoRo]: 'ro',
  [LanguageKey.RuRu]: 'ru',
  [LanguageKey.SrLatnRs]: 'sr',
  [LanguageKey.SvSe]: 'sv',
  [LanguageKey.TaIn]: 'ta',
  [LanguageKey.ThTh]: 'th',
  [LanguageKey.TrTr]: 'tr',
  [LanguageKey.UkUa]: 'uk',
  [LanguageKey.ViVn]: 'vi',
  [LanguageKey.EnUS]: 'en',
  [LanguageKey.EnAu]: 'en',
  [LanguageKey.FrBe]: 'fr',
  [LanguageKey.EnIe]: 'en',
  [LanguageKey.EnCa]: 'en',
  [LanguageKey.EnAe]: 'en',
  [LanguageKey.DeAt]: 'de',
  [LanguageKey.DeCh]: 'de',
  [LanguageKey.ItCh]: 'it',
  [LanguageKey.FrCh]: 'fr',
  [LanguageKey.HeIl]: 'he',
  [LanguageKey.EnNz]: 'en',
  [LanguageKey.EtEe]: 'et',
  [LanguageKey.IsIs]: 'is',
  [LanguageKey.LvLv]: 'lv',
  [LanguageKey.MtMt]: 'mt',
  [LanguageKey.SkSk]: 'sk',
  [LanguageKey.SlSl]: 'sl',
  [LanguageKey.MrIn]: 'mr',
  [LanguageKey.ZuZa]: 'en',
};

/** Mapping of AWS base translation keys to list of browser locales that should use them */
export const INVERTED_TRANSLATE_LOCALE = invertSafe(TRANSLATE_LOCALE);

const getDuplicativeLocalizations = (lang: LanguageKey): LanguageKey[] =>
  INVERTED_TRANSLATE_LOCALE[TRANSLATE_LOCALE[lang]];

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
 * Picks a default language for the user
 *
 * @param supportedLanguages - Set of supported languages
 * @returns the language key of the best default language for this user
 */
export function pickDefaultLanguage(
  supportedLanguages: ConsentManagerLanguageKey[],
): ConsentManagerLanguageKey {
  if (settings.locale && supportedLanguages.includes(settings.locale)) {
    return settings.locale;
  }

  const preferredLanguages = getUserLanguages();
  /* We should refactor this ASAP TODO: https://transcend.height.app/T-39777
   * Extend supportedLanguages to include locales that we consider equivalent
   * e.g. instead of just having en, include en-US, en-GB, en-AU, etc
   */
  const extendedSupportedLanguages = supportedLanguages
    .map((lang: ConsentManagerLanguageKey) => getDuplicativeLocalizations(lang))
    .flat();
  const nearestExtendedLanguage =
    getNearestSupportedLanguage(
      preferredLanguages,
      sortSupportedLanguagesByPreference(extendedSupportedLanguages),
    ) || ConsentManagerLanguageKey.En;

  let nearestTranslation = nearestExtendedLanguage;
  if (!supportedLanguages.includes(nearestTranslation)) {
    nearestTranslation = getDuplicativeLocalizations(nearestTranslation).find(
      (lang) => supportedLanguages.includes(lang),
    );
  }
  return nearestTranslation;
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
  /** HTML opening/closing tab variables */
  htmlTagVariables: Record<string, string>;
} {
  // The current language
  const [language, setLanguage] = useState<ConsentManagerLanguageKey>(() =>
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
    async (language: ConsentManagerLanguageKey) => {
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
