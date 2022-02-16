// external
import { h, JSX } from 'preact';

// main
import { LanguageKey } from '@transcend-io/internationalization';

// global
import { sortSupportedLanguagesByPreference, useEmotion } from '../hooks';
import { selectableLanguages } from '../translations';
import type { HandleSetViewState } from '../types';

// local
import MenuItem from './MenuItem';

/**
 * The view for language settings
 */
export default function LanguageOptions({
  handleChangeLanguage,
  handleSetViewState,
}: {
  /** Handler to change the language selection */
  handleChangeLanguage: (language: LanguageKey) => void;
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
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
  function handleClick(language: LanguageKey): void {
    handleChangeLanguage(language);
    handleSetViewState('back');
  }

  // Selectable translations
  const availableTranslations = sortSupportedLanguagesByPreference(
    Object.keys(selectableLanguages) as LanguageKey[],
  );

  return (
    <div className={cx(containerStyle)}>
      {availableTranslations.map((language) => (
        <div key={language} className={cx(languageItemContainerStyle)}>
          <MenuItem
            label={selectableLanguages[language] || ''}
            type="button"
            onClick={() => handleClick(language)}
          >
            {selectableLanguages[language]}
          </MenuItem>
        </div>
      ))}
    </div>
  );
}
