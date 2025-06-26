import { h, JSX } from 'preact';
import { ConsentManagerSupportedTranslationValue } from '@transcend-io/internationalization';
import { sortSupportedLocalesByPreference } from '../utils';
import { nativeConsentLocaleNames } from '../i18n';
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
  supportedLocales,
}: {
  /** Handler to change the language selection */
  handleChangeLanguage: (
    language: ConsentManagerSupportedTranslationValue,
  ) => void;
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
  /** Supported consent manager languages */
  supportedLocales: ConsentManagerSupportedTranslationValue[];
}): JSX.Element {
  /**
   * Handler for language button click - selects language
   *
   * @param language - The language selected
   */
  function handleClick(
    language: ConsentManagerSupportedTranslationValue,
    e: AirgapAuth,
  ): void {
    handleChangeLanguage(language);
    handleSetViewState('back', e);
  }

  // Selectable translations
  const sortedSupportedLocales = useMemo(
    () => sortSupportedLocalesByPreference(supportedLocales),
    [supportedLocales],
  );

  return (
    <div className="language-options-container">
      {sortedSupportedLocales.map((language) => (
        <div key={language} className="language-item-container">
          <MenuItem
            label={nativeConsentLocaleNames[language] || ''}
            type="button"
            onClick={(e) => handleClick(language, e)}
          >
            {nativeConsentLocaleNames[language]}
          </MenuItem>
        </div>
      ))}
    </div>
  );
}
