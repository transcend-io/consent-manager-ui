// main
import { ConsentManagerLanguageKey } from '@transcend-io/internationalization';

export const CONSENT_MANAGER_SUPPORTED_LANGUAGES = Object.values(
  ConsentManagerLanguageKey,
);

/**
 * Languages names, written in their native language
 * Omits some unnecessarily specific or duplicate languages
 */
export const selectableLanguages: {
  [key in ConsentManagerLanguageKey]: string;
} = {
  /* English */
  [ConsentManagerLanguageKey.En]: 'English',
  /* French */
  [ConsentManagerLanguageKey.FrFr]: 'Français',
  /* German */
  [ConsentManagerLanguageKey.DeDe]: 'Deutsch',
  /* Italian */
  [ConsentManagerLanguageKey.ItIt]: 'Italiano',
  /* Portuguese (Brazil) */
  [ConsentManagerLanguageKey.PtBr]: 'Português',
  /* Spanish (Latin America & Caribbean) */
  [ConsentManagerLanguageKey.Es419]: 'Español',
  /* Spanish (Castilian) */
  [ConsentManagerLanguageKey.EsEs]: 'Español (Castillano)',
  /* Czech */
  [ConsentManagerLanguageKey.CsCz]: 'Čeština',
  /* Danish */
  [ConsentManagerLanguageKey.DaDk]: 'Dansk',
  /* Finnish */
  [ConsentManagerLanguageKey.FiFi]: 'Suomi',
  /* Greek */
  [ConsentManagerLanguageKey.ElGr]: 'ελληνικά',
  /* Lithuanian */
  [ConsentManagerLanguageKey.LtLt]: 'Lietuvių',
  /* Norwegian Bokmål */
  [ConsentManagerLanguageKey.NbNi]: 'Bokmål',
  /* Polish */
  [ConsentManagerLanguageKey.PlPl]: 'Polski',
  /* Romanian */
  [ConsentManagerLanguageKey.RoRo]: 'Română',
  /* Russian */
  [ConsentManagerLanguageKey.RuRu]: 'Русский язык',
  /* Latn-Serbian (Latin) */
  [ConsentManagerLanguageKey.SrLatnRs]: 'Srpski',
  /* Swedish */
  [ConsentManagerLanguageKey.SvSe]: 'Svenska',
  /* Arabic */
  [ConsentManagerLanguageKey.ArAe]: 'العربية',
  /* Japanese */
  [ConsentManagerLanguageKey.JaJp]: '日本語',
  /* Korean */
  [ConsentManagerLanguageKey.KoKr]: '한국어',
  /* Chinese Simplified */
  [ConsentManagerLanguageKey.ZhCn]: '汉语',
  /* Chinese (Traditional) */
  [ConsentManagerLanguageKey.ZhHk]: '漢語',
  /* Russian */
  [ConsentManagerLanguageKey.RuRu]: 'Русский язык',
  /* Afrikaans */
  [ConsentManagerLanguageKey.AfZz]: 'Afrikaans',
  /* Bulgarian */
  [ConsentManagerLanguageKey.BgBg]: 'български',
  /* Croatian */
  [ConsentManagerLanguageKey.HrHr]: 'Hrvatski',
  /* Hungarian */
  [ConsentManagerLanguageKey.HuHu]: 'Magyar',
  /* Indonesian */
  [ConsentManagerLanguageKey.IdId]: 'Bahasa Indonesia',
  /* Malay */
  [ConsentManagerLanguageKey.MsMy]: 'Bahasa Melayu',
  /* Hindi */
  [ConsentManagerLanguageKey.HiIn]: 'हिन्दी',
  /* Marathi */
  [ConsentManagerLanguageKey.MrIn]: 'मराठी',
  /* Tamil */
  [ConsentManagerLanguageKey.TaIn]: 'தமிழ்',
  /* Thai */
  [ConsentManagerLanguageKey.ThTh]: 'ภาษาไทย',
  /* Turkish */
  [ConsentManagerLanguageKey.TrTr]: 'Türkçe',
  /* Ukrainian */
  [ConsentManagerLanguageKey.UkUa]: 'українська мова',
  /* Vietnamese */
  [ConsentManagerLanguageKey.ViVn]: 'Tiếng Việt',
  /* Dutch */
  [ConsentManagerLanguageKey.NlNl]: 'Nederlands',
  /* Hebrew */
  [ConsentManagerLanguageKey.HeIl]: 'עברית',
};
