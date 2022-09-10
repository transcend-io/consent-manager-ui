// main
import {
  LanguageKey,
  TranslatedMessages,
  Translations,
} from '@transcend-io/internationalization';
import { pickDefaultLanguage } from '../hooks/useLanguage';
import { settings } from '../settings';
import { CONSENT_MANAGER_TRANSLATIONS } from './index';

export const loadedTranslations: Translations = Object.create(null);
const translationsLocation = settings.messages ?? './🌐';

export const getTranslations = async (
  language: LanguageKey = pickDefaultLanguage(),
): Promise<TranslatedMessages> => {
  if (!CONSENT_MANAGER_TRANSLATIONS.includes(language)) {
    throw new Error(`No translations found for language ${language}`);
  }
  // eslint-disable-next-line no-return-assign
  return (loadedTranslations[language] ??= await (async () => {
    const response = await fetch(`${translationsLocation}/${language}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load translations for language ${language}`);
    }
    return response.json();
  })());
};

export const getAllTranslations = async (
  loadAllTranslations = false,
  // eslint-disable-next-line require-await
): Promise<Translations> =>
  loadAllTranslations
    ? // load unloaded translations
      (async () => {
        await Promise.all(
          CONSENT_MANAGER_TRANSLATIONS.filter(
            (language) => !(language in loadedTranslations),
          ).map(async (language) => {
            await getTranslations(language);
          }),
        );
        return loadedTranslations;
      })()
    : loadedTranslations;
