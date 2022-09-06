// main
import { LanguageKey } from '@transcend-io/internationalization';

/**
 * Translations of intl messages
 */
export const CONSENT_MANAGER_TRANSLATIONS: LanguageKey[] = [
  // TODO: https://transcend.height.app/T-5873 - migrate these
  LanguageKey.En,
  LanguageKey.Ar,
  LanguageKey.Fr,
  LanguageKey.De,
  LanguageKey.It,
  LanguageKey.Ja,
  LanguageKey.Ru,

  LanguageKey.DeAt,
  LanguageKey.DeCh,
  LanguageKey.ItCh,
  LanguageKey.FrCh,
  LanguageKey.NlBe,
  LanguageKey.HeIl,
  LanguageKey.EnNz,
  LanguageKey.ArAe,
  LanguageKey.FrFr,
  LanguageKey.DeDe,
  LanguageKey.ItIt,
  LanguageKey.AfZz,
  LanguageKey.BgBg,
  LanguageKey.ZhCn,
  LanguageKey.HrHr,
  LanguageKey.CsCz,
  LanguageKey.DaDk,
  LanguageKey.EnGb,
  LanguageKey.EnCa,
  LanguageKey.EnAe,
  LanguageKey.FiFi,
  LanguageKey.ElGr,
  LanguageKey.HiIn,
  LanguageKey.HuHu,
  LanguageKey.IdId,
  LanguageKey.JaJp,
  LanguageKey.KoKr,
  LanguageKey.LtLt,
  LanguageKey.MsMy,
  LanguageKey.MrIn,
  LanguageKey.NbNi,
  LanguageKey.PlPl,
  LanguageKey.PtBr,
  LanguageKey.PtPt,
  LanguageKey.RoRo,
  LanguageKey.RuRu,
  LanguageKey.SrLatnRs,
  LanguageKey.SvSe,
  LanguageKey.TaIn,
  LanguageKey.ThTh,
  LanguageKey.TrTr,
  LanguageKey.UkUa,
  LanguageKey.ViVn,
  LanguageKey.ZuZa,
  LanguageKey.EnUS,
  LanguageKey.EnAu,
  LanguageKey.FrBe,
  LanguageKey.FrCa,
  LanguageKey.EnIe,
  LanguageKey.NlNl,
  LanguageKey.EsEs,
  LanguageKey.Es419,
  LanguageKey.ZhHk,
];

/**
 * Languages names, written in their native language
 * Omits some unnecessarily specific or duplicative languages
 */
export const selectableLanguages: { [key in LanguageKey]?: string } = {
  /* English */
  [LanguageKey.En]: 'English',
  /* French */
  [LanguageKey.Fr]: 'Français',
  /* German */
  [LanguageKey.De]: 'Deutsch',
  /* Italian */
  [LanguageKey.It]: 'Italiano',
  /* Portuguese (Brazil) */
  [LanguageKey.PtBr]: 'Português',
  /* Spanish (Latin America & Caribbean) */
  [LanguageKey.Es419]: 'Español',
  /* Spanish (Castilian) */
  [LanguageKey.EsEs]: 'Español (Castillano)',
  /* Czech */
  [LanguageKey.CsCz]: 'Čeština',
  /* Danish */
  [LanguageKey.DaDk]: 'Dansk',
  /* Finnish */
  [LanguageKey.FiFi]: 'Suomi',
  /* Greek */
  [LanguageKey.ElGr]: 'ελληνικά',
  /* Lithuanian */
  [LanguageKey.LtLt]: 'Lietuvių',
  /* Norwegian Bokmål */
  [LanguageKey.NbNi]: 'Bokmål',
  /* Polish */
  [LanguageKey.PlPl]: 'Polski',
  /* Romanian */
  [LanguageKey.RoRo]: 'Română',
  /* Russian */
  [LanguageKey.RuRu]: 'Русский язык',
  /* Latn-Serbian (Latin) */
  [LanguageKey.SrLatnRs]: 'Srpski',
  /* Swedish */
  [LanguageKey.SvSe]: 'Svenska',
  /* Arabic */
  [LanguageKey.Ar]: 'العربية',
  /* Japanese */
  [LanguageKey.Ja]: '日本語',
  /* Korean */
  [LanguageKey.KoKr]: '한국어',
  /* Chinese Simplified */
  [LanguageKey.ZhCn]: '汉语',
  /* Chinese (Traditional) */
  [LanguageKey.ZhHk]: '漢語',
  /* Russian */
  [LanguageKey.Ru]: 'Русский язык',
  // /* Arabic UAE */
  // [LanguageKey.ArAe]: 'العربية (الإمارات العربية المتحدة)',
  // /* French */
  // [LanguageKey.FrFr]: 'Français (France)',
  // /* German */
  // [LanguageKey.DeDe]: 'Deutsch (Deutschland)',
  // /* Italian */
  // [LanguageKey.ItIt]: 'Italiano (Italia)',
  /* Afrikaans */
  [LanguageKey.AfZz]: 'Afrikaans',
  /* Bulgarian */
  [LanguageKey.BgBg]: 'български',
  /* Croatian */
  [LanguageKey.HrHr]: 'Hrvatski',
  // /* English (United Kingdom) */
  // [LanguageKey.EnGb]: 'English (United Kingdom)',
  // /* English (Canada) */
  // [LanguageKey.EnCa]: 'English (Canada)',
  // /* English (UAE) */
  // [LanguageKey.EnAe]: 'English (UAE)',
  /* Hungarian */
  [LanguageKey.HuHu]: 'Magyar',
  /* Indonesian */
  [LanguageKey.IdId]: 'Bahasa Indonesia',
  // /* Japanese */
  // [LanguageKey.JaJp]: '日本語',
  /* Malay */
  [LanguageKey.MsMy]: 'Bahasa Melayu',
  /* Hindi */
  [LanguageKey.HiIn]: 'हिन्दी',
  /* Marathi */
  [LanguageKey.MrIn]: 'मराठी',
  // /* Portuguese (Portugal) */
  // [LanguageKey.PtPt]: 'Português (Portugal)',
  /* Tamil */
  [LanguageKey.TaIn]: 'தமிழ்',
  /* Thai */
  [LanguageKey.ThTh]: 'ภาษาไทย',
  /* Turkish */
  [LanguageKey.TrTr]: 'Türkçe',
  /* Ukrainian */
  [LanguageKey.UkUa]: 'українська мова',
  /* Vietnamese */
  [LanguageKey.ViVn]: 'Tiếng Việt',
  /* Zulu */
  [LanguageKey.ZuZa]: 'isiZulu',
  // /* USA */
  // [LanguageKey.EnUS]: 'English (US)',
  // /* Australia */
  // [LanguageKey.EnAu]: 'English (Australia)',
  // /* Belgium */
  // [LanguageKey.FrBe]: 'Français (Belgique)',
  // /* Quebec */
  // [LanguageKey.FrCa]: 'Français (Québec)',
  // /* Ireland */
  // [LanguageKey.EnIe]: 'English (Ireland)',
  /* Dutch */
  [LanguageKey.NlNl]: 'Nederlands',
};
