// external
import { h, JSX } from 'preact';

// main
import { ConsentManagerLanguageKey } from '@transcend-io/internationalization';

// global
import { sortSupportedLanguagesByPreference, useEmotion } from '../hooks';
import { selectableLanguages } from '../i18n';
import type { HandleSetViewState } from '../types';

// local
import MenuItem from './MenuItem';
import { AirgapAuth } from '@transcend-io/airgap.js-types';
import { useMemo } from 'preact/hooks';

/**
 * The view for language settings
 */
export default function LanguageOptions({
  handleChangeLanguage,
  handleSetViewState,
  supportedLanguages,
}: {
  /** Handler to change the language selection */
  handleChangeLanguage: (language: ConsentManagerLanguageKey) => void;
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
  /** Supported consent manager languages */
  supportedLanguages: ConsentManagerLanguageKey[];
}): JSX.Element {
  const { css, cx } = useEmotion();

  const containerStyle = css`
    width: 100%;
    height: 100%;
    animation: fadeIn 200ms ease-in;

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 auto;
    justify-content: space-evenly;
  `;

  const languageItemContainerStyle = css`
    padding: 12px;
  `;

  /**
   * Handler for language button click - selects language
   *
   * @param language - The language selected
   */
  function handleClick(
    language: ConsentManagerLanguageKey,
    e: AirgapAuth,
  ): void {
    handleChangeLanguage(language);
    handleSetViewState('back', e);
  }

  // Selectable translations
  const availableTranslations = useMemo(
    () => sortSupportedLanguagesByPreference(supportedLanguages),
    [supportedLanguages],
  );

  return (
    <div className={cx(containerStyle)}>
      {availableTranslations.map((language) => (
        <div key={language} className={cx(languageItemContainerStyle)}>
          <MenuItem
            label={selectableLanguages[language] || ''}
            type="button"
            onClick={(e) => handleClick(language, e)}
          >
            {selectableLanguages[language]}
          </MenuItem>
        </div>
      ))}
    </div>
  );
}
