// main
import { Translations, LanguageKey } from '@transcend-io/internationalization';

// local
import AfZz_TRANSLATIONS from './af-ZA.json';
import ArAe_TRANSLATIONS from './ar-AE.json';
import Ar_TRANSLATIONS from './ar.json';
import BgBg_TRANSLATIONS from './bg-BG.json';
import CsCz_TRANSLATIONS from './cs-CZ.json';
import DaDk_TRANSLATIONS from './da-DK.json';
import DeDe_TRANSLATIONS from './de-DE.json';
import De_TRANSLATIONS from './de.json';
import ElGr_TRANSLATIONS from './el-GR.json';
import EnAe_TRANSLATIONS from './en-AE.json';
import EnAu_TRANSLATIONS from './en-AU.json';
import EnCa_TRANSLATIONS from './en-CA.json';
import EnGb_TRANSLATIONS from './en-GB.json';
import EnIe_TRANSLATIONS from './en-IE.json';
import EnUS_TRANSLATIONS from './en-US.json';
import En_TRANSLATIONS from './en.json';
import Es419_TRANSLATIONS from './es-419.json';
import EsEs_TRANSLATIONS from './es-ES.json';
import FiFi_TRANSLATIONS from './fi-FI.json';
import FrBe_TRANSLATIONS from './fr-BE.json';
import FrCa_TRANSLATIONS from './fr-CA.json';
import FrFr_TRANSLATIONS from './fr-FR.json';
import Fr_TRANSLATIONS from './fr.json';
import HiIn_TRANSLATIONS from './hi-IN.json';
import HrHr_TRANSLATIONS from './hr-HR.json';
import HuHu_TRANSLATIONS from './hu-HU.json';
import IdId_TRANSLATIONS from './id-ID.json';
import ItIt_TRANSLATIONS from './it-IT.json';
import It_TRANSLATIONS from './it.json';
import JaJp_TRANSLATIONS from './ja-JP.json';
import Ja_TRANSLATIONS from './ja.json';
import KoKr_TRANSLATIONS from './ko-KR.json';
import LtLt_TRANSLATIONS from './lt-LT.json';
import MrIn_TRANSLATIONS from './mr-IN.json';
import MsMy_TRANSLATIONS from './ms-MY.json';
import NbNi_TRANSLATIONS from './nb-NO.json';
import NlNl_TRANSLATIONS from './nl-NL.json';
import PlPl_TRANSLATIONS from './pl-PL.json';
import PtBr_TRANSLATIONS from './pt-BR.json';
import PtPt_TRANSLATIONS from './pt-PT.json';
import RoRo_TRANSLATIONS from './ro-RO.json';
import RuRu_TRANSLATIONS from './ru-RU.json';
import Ru_TRANSLATIONS from './ru.json';
import SrLatnRs_TRANSLATIONS from './sr-Latn-RS.json';
import SvSe_TRANSLATIONS from './sv-SE.json';
import TaIn_TRANSLATIONS from './ta-IN.json';
import ThTh_TRANSLATIONS from './th-TH.json';
import TrTr_TRANSLATIONS from './tr-TR.json';
import UkUa_TRANSLATIONS from './uk-UA.json';
import ViVn_TRANSLATIONS from './vi-VN.json';
import ZhCn_TRANSLATIONS from './zh-CN.json';
import ZhHk_TRANSLATIONS from './zh-HK.json';
import ZuZa_TRANSLATIONS from './zu-ZA.json';

/**
 * Translations of intl messages
 */
export const CONSENT_MANAGER_TRANSLATIONS: Translations = {
  // TODO: https://transcend.height.app/T-5873 - migrate these
  [LanguageKey.En]: En_TRANSLATIONS,
  [LanguageKey.Ar]: Ar_TRANSLATIONS,
  [LanguageKey.Fr]: Fr_TRANSLATIONS,
  [LanguageKey.De]: De_TRANSLATIONS,
  [LanguageKey.It]: It_TRANSLATIONS,
  [LanguageKey.Ja]: Ja_TRANSLATIONS,
  [LanguageKey.Ru]: Ru_TRANSLATIONS,

  [LanguageKey.ArAe]: ArAe_TRANSLATIONS,
  [LanguageKey.FrFr]: FrFr_TRANSLATIONS,
  [LanguageKey.DeDe]: DeDe_TRANSLATIONS,
  [LanguageKey.ItIt]: ItIt_TRANSLATIONS,
  [LanguageKey.AfZz]: AfZz_TRANSLATIONS,
  [LanguageKey.BgBg]: BgBg_TRANSLATIONS,
  [LanguageKey.ZhCn]: ZhCn_TRANSLATIONS,
  [LanguageKey.HrHr]: HrHr_TRANSLATIONS,
  [LanguageKey.CsCz]: CsCz_TRANSLATIONS,
  [LanguageKey.DaDk]: DaDk_TRANSLATIONS,
  [LanguageKey.EnGb]: EnGb_TRANSLATIONS,
  [LanguageKey.EnCa]: EnCa_TRANSLATIONS,
  [LanguageKey.EnAe]: EnAe_TRANSLATIONS,
  [LanguageKey.FiFi]: FiFi_TRANSLATIONS,
  [LanguageKey.ElGr]: ElGr_TRANSLATIONS,
  [LanguageKey.HiIn]: HiIn_TRANSLATIONS,
  [LanguageKey.HuHu]: HuHu_TRANSLATIONS,
  [LanguageKey.IdId]: IdId_TRANSLATIONS,
  [LanguageKey.JaJp]: JaJp_TRANSLATIONS,
  [LanguageKey.KoKr]: KoKr_TRANSLATIONS,
  [LanguageKey.LtLt]: LtLt_TRANSLATIONS,
  [LanguageKey.MsMy]: MsMy_TRANSLATIONS,
  [LanguageKey.MrIn]: MrIn_TRANSLATIONS,
  [LanguageKey.NbNi]: NbNi_TRANSLATIONS,
  [LanguageKey.PlPl]: PlPl_TRANSLATIONS,
  [LanguageKey.PtBr]: PtBr_TRANSLATIONS,
  [LanguageKey.PtPt]: PtPt_TRANSLATIONS,
  [LanguageKey.RoRo]: RoRo_TRANSLATIONS,
  [LanguageKey.RuRu]: RuRu_TRANSLATIONS,
  [LanguageKey.SrLatnRs]: SrLatnRs_TRANSLATIONS,
  [LanguageKey.SvSe]: SvSe_TRANSLATIONS,
  [LanguageKey.TaIn]: TaIn_TRANSLATIONS,
  [LanguageKey.ThTh]: ThTh_TRANSLATIONS,
  [LanguageKey.TrTr]: TrTr_TRANSLATIONS,
  [LanguageKey.UkUa]: UkUa_TRANSLATIONS,
  [LanguageKey.ViVn]: ViVn_TRANSLATIONS,
  [LanguageKey.ZuZa]: ZuZa_TRANSLATIONS,
  [LanguageKey.EnUS]: EnUS_TRANSLATIONS,
  [LanguageKey.EnAu]: EnAu_TRANSLATIONS,
  [LanguageKey.FrBe]: FrBe_TRANSLATIONS,
  [LanguageKey.FrCa]: FrCa_TRANSLATIONS,
  [LanguageKey.EnIe]: EnIe_TRANSLATIONS,
  [LanguageKey.NlNl]: NlNl_TRANSLATIONS,
  [LanguageKey.EsEs]: EsEs_TRANSLATIONS,
  [LanguageKey.Es419]: Es419_TRANSLATIONS,
  [LanguageKey.ZhHk]: ZhHk_TRANSLATIONS,
};

/**
 * Languages names, written in their native language
 * Omits some unnecessarily specific or duplicative languages
 */
export const selectableLanguages: { [key in LanguageKey]?: string } = {
  /* English */
  [LanguageKey.En]: 'English',
  /* French */
  [LanguageKey.Fr]: 'Fran??ais',
  /* German */
  [LanguageKey.De]: 'Deutsch',
  /* Italian */
  [LanguageKey.It]: 'Italiano',
  /* Portuguese (Brazil) */
  [LanguageKey.PtBr]: 'Portugu??s',
  /* Spanish (Latin America & Caribbean) */
  [LanguageKey.Es419]: 'Espa??ol',
  /* Spanish (Castilian) */
  [LanguageKey.EsEs]: 'Espa??ol (Castillano)',
  /* Czech */
  [LanguageKey.CsCz]: '??e??tina',
  /* Danish */
  [LanguageKey.DaDk]: 'Dansk',
  /* Finnish */
  [LanguageKey.FiFi]: 'Suomi',
  /* Greek */
  [LanguageKey.ElGr]: '????????????????',
  /* Lithuanian */
  [LanguageKey.LtLt]: 'Lietuvi??',
  /* Norwegian Bokm??l */
  [LanguageKey.NbNi]: 'Bokm??l',
  /* Polish */
  [LanguageKey.PlPl]: 'Polski',
  /* Romanian */
  [LanguageKey.RoRo]: 'Rom??n??',
  /* Russian */
  [LanguageKey.RuRu]: '?????????????? ????????',
  /* Latn-Serbian (Latin) */
  [LanguageKey.SrLatnRs]: 'Srpski',
  /* Swedish */
  [LanguageKey.SvSe]: 'Svenska',
  /* Arabic */
  [LanguageKey.Ar]: '??????????????',
  /* Japanese */
  [LanguageKey.Ja]: '?????????',
  /* Korean */
  [LanguageKey.KoKr]: '?????????',
  /* Chinese Simplified */
  [LanguageKey.ZhCn]: '??????',
  /* Chinese (Traditional) */
  [LanguageKey.ZhHk]: '??????',
  /* Russian */
  [LanguageKey.Ru]: '?????????????? ????????',
  // /* Arabic UAE */
  // [LanguageKey.ArAe]: '?????????????? (???????????????? ?????????????? ??????????????)',
  // /* French */
  // [LanguageKey.FrFr]: 'Fran??ais (France)',
  // /* German */
  // [LanguageKey.DeDe]: 'Deutsch (Deutschland)',
  // /* Italian */
  // [LanguageKey.ItIt]: 'Italiano (Italia)',
  /* Afrikaans */
  [LanguageKey.AfZz]: 'Afrikaans',
  /* Bulgarian */
  [LanguageKey.BgBg]: '??????????????????',
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
  // [LanguageKey.JaJp]: '?????????',
  /* Malay */
  [LanguageKey.MsMy]: 'Bahasa Melayu',
  /* Hindi */
  [LanguageKey.HiIn]: '??????????????????',
  /* Marathi */
  [LanguageKey.MrIn]: '???????????????',
  // /* Portuguese (Portugal) */
  // [LanguageKey.PtPt]: 'Portugu??s (Portugal)',
  /* Tamil */
  [LanguageKey.TaIn]: '???????????????',
  /* Thai */
  [LanguageKey.ThTh]: '?????????????????????',
  /* Turkish */
  [LanguageKey.TrTr]: 'T??rk??e',
  /* Ukrainian */
  [LanguageKey.UkUa]: '???????????????????? ????????',
  /* Vietnamese */
  [LanguageKey.ViVn]: 'Ti???ng Vi???t',
  /* Zulu */
  [LanguageKey.ZuZa]: 'isiZulu',
  // /* USA */
  // [LanguageKey.EnUS]: 'English (US)',
  // /* Australia */
  // [LanguageKey.EnAu]: 'English (Australia)',
  // /* Belgium */
  // [LanguageKey.FrBe]: 'Fran??ais (Belgique)',
  // /* Quebec */
  // [LanguageKey.FrCa]: 'Fran??ais (Qu??bec)',
  // /* Ireland */
  // [LanguageKey.EnIe]: 'English (Ireland)',
  /* Dutch */
  [LanguageKey.NlNl]: 'Nederlands',
};
