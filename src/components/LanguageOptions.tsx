import { h, JSX } from 'preact';
import { ConsentManagerLanguageKey } from '@transcend-io/internationalization';
import { sortSupportedLanguagesByPreference } from '../hooks';
import { selectableLanguages } from '../i18n';
import type { HandleSetViewState } from '../types';
import { MenuItem } from './MenuItem';
import type { AirgapAuth } from '@transcend-io/airgap.js-types';
import { useMemo } from 'preact/hooks';

/**
 * The view for language settings
 */
export function LanguageOptions({
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
    <div className="language-options-container">
      {availableTranslations.map((language) => (
        <div key={language} className="language-item-container">
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
