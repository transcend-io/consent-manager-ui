import {
  ConsentManagerSupportedTranslationValue,
  CONSENT_MANAGER_SUPPORTED_LOCALES
} from '@transcend-io/internationalization';

/**
 * Languages names, written in their native language
 * Omits some unnecessarily specific or duplicate languages
 */
export const selectableLanguages: {
  [key in ConsentManagerSupportedTranslationValue]: string;
} = {
  /* English */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.En]: 'English',
  /* French */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.FrFr]: 'Français',
  /* German */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.DeDe]: 'Deutsch',
  /* Italian */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.ItIt]: 'Italiano',
  /* Portuguese (Brazil) */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.PtBr]: 'Português',
  /* Spanish (Latin America & Caribbean) */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.Es419]: 'Español',
  /* Spanish (Castilian) */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.EsEs]: 'Español (Castellano)',
  /* Czech */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.CsCz]: 'Čeština',
  /* Danish */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.DaDk]: 'Dansk',
  /* Finnish */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.FiFi]: 'Suomi',
  /* Greek */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.ElGr]: 'ελληνικά',
  /* Lithuanian */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.LtLt]: 'Lietuvių',
  /* Norwegian Bokmål */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.NbNi]: 'Bokmål',
  /* Polish */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.PlPl]: 'Polski',
  /* Romanian */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.RoRo]: 'Română',
  /* Russian */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.RuRu]: 'Русский язык',
  /* Latn-Serbian (Latin) */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.SrLatnRs]: 'Srpski',
  /* Swedish */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.SvSe]: 'Svenska',
  /* Arabic */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.ArAe]: 'العربية',
  /* Japanese */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.JaJp]: '日本語',
  /* Korean */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.KoKr]: '한국어',
  /* Chinese Simplified */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.ZhCn]: '汉语',
  /* Chinese (Traditional) */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.ZhHk]: '漢語',
  /* Russian */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.RuRu]: 'Русский язык',
  /* Afrikaans */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.AfZz]: 'Afrikaans',
  /* Bulgarian */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.BgBg]: 'български',
  /* Croatian */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.HrHr]: 'Hrvatski',
  /* Hungarian */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.HuHu]: 'Magyar',
  /* Indonesian */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.IdId]: 'Bahasa Indonesia',
  /* Malay */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.MsMy]: 'Bahasa Melayu',
  /* Hindi */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.HiIn]: 'हिन्दी',
  /* Marathi */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.MrIn]: 'मराठी',
  /* Tamil */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.TaIn]: 'தமிழ்',
  /* Thai */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.ThTh]: 'ภาษาไทย',
  /* Turkish */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.TrTr]: 'Türkçe',
  /* Ukrainian */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.UkUa]: 'українська мова',
  /* Vietnamese */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.ViVn]: 'Tiếng Việt',
  /* Dutch */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.NlNl]: 'Nederlands',
  /* Hebrew */
  [CONSENT_MANAGER_SUPPORTED_LOCALES.HeIl]: 'עברית',
};
