import {
  BrowserLocaleKey,
  LocaleValue,
  LOCALE_BROWSER_MAP,
  LOCALE_KEY,
} from '@transcend-io/internationalization';

/**
 * Detect user-preferred languages from the user agent
 *
 * @returns an ordered list of preferred languages in BCP47 format
 */
export function getUserLocales(): LocaleValue[] {
  const browserLocales = (
    navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language]
  ) as BrowserLocaleKey[];
  const transcendLocales = browserLocales
    .map((browserLocale) => LOCALE_BROWSER_MAP[browserLocale])
    .filter((l) => !!l);
  return transcendLocales.length ? transcendLocales : [LOCALE_KEY.En];
}
