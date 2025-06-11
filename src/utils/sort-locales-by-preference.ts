import { LocaleValue } from '@transcend-io/internationalization';
import { getUserLocales } from './get-user-locales';

/**
 * Sorts the supported languages by the user's preferences
 *
 * @param languages - an object of translations
 * @returns a list of language keys, sorted
 */
export const sortSupportedLocalesByPreference = <T extends LocaleValue>(
  languages: T[],
): T[] =>
  languages.sort((a, b) => {
    const preferredLanguagesFull = getUserLocales();

    // Only use first token e.g. fr-CA => fr, and remove dupes e.g. [en-US, en] => [en], by casting to set
    const preferredLanguagesShort = [
      ...new Set(preferredLanguagesFull.map((l) => l.split('-')[0])),
    ];
    const rank = (l: T): number =>
      preferredLanguagesFull.includes(l)
        ? preferredLanguagesFull.indexOf(l)
        : preferredLanguagesShort.includes(l)
          ? preferredLanguagesShort.indexOf(l)
          : Infinity;
    return rank(a) - rank(b);
  });
