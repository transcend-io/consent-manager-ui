// external
import { h, JSX } from 'preact';

// main
import { ViewState } from '@transcend-io/airgap.js-types';
import { LanguageKey } from '@transcend-io/internationalization';

// global
import { useEmotion, viewStateIsClosed } from '../hooks';
import type { HandleSetViewState } from '../types';

// local
import AcceptAll from './AcceptAll';
import BottomMenu from './BottomMenu';
import Collapsed from './Collapsed';
import CompleteOptions from './CompleteOptions';
import LanguageButton from './LanguageButton';
import LanguageOptions from './LanguageOptions';
import { FullLogo } from './Logo';
import Modal from './Modal';
import NoticeAndDoNotSell from './NoticeAndDoNotSell';
import QuickOptions from './QuickOptions';

/**
 * Presents view states (collapsed, GDPR-mode, CCPA-mode etc)
 *
 * @param root0
 */
export default function Main({
  viewState,
  mode,
  handleSetViewState,
  handleChangeLanguage,
}: {
  /** The current viewState of the consent manager */
  viewState: ViewState;
  /** Whether we're in opt-in consent mode or give-notice mode */
  mode: 'CONSENT' | 'NOTICE';
  /** Updater function for viewState */
  handleSetViewState: HandleSetViewState;
  /** Updater function for language change */
  handleChangeLanguage: (language: LanguageKey) => void;
}): JSX.Element {
  const { css, cx } = useEmotion();

  const padding = 21; // px
  const bottomMenuStyle = css`
    position: absolute;
    bottom: ${padding}px;
    width: calc(100% - ${padding}px * 2);
    height: 17px;
  `;

  // Modal open views
  if (!viewStateIsClosed(viewState)) {
    return (
      <Modal viewState={viewState} padding={padding}>
        {viewState === ViewState.QuickOptions && (
          <QuickOptions handleSetViewState={handleSetViewState} />
        )}

        {viewState === ViewState.AcceptAll && (
          <AcceptAll handleSetViewState={handleSetViewState} />
        )}

        {viewState === ViewState.CompleteOptions && (
          <CompleteOptions handleSetViewState={handleSetViewState} />
        )}

        {viewState === ViewState.NoticeAndDoNotSell && (
          <NoticeAndDoNotSell handleSetViewState={handleSetViewState} />
        )}

        {viewState === ViewState.LanguageOptions && (
          <LanguageOptions
            handleSetViewState={handleSetViewState}
            handleChangeLanguage={handleChangeLanguage}
          />
        )}

        <div className={cx(bottomMenuStyle)}>
          <FullLogo />
          <BottomMenu
            viewState={viewState}
            mode={mode}
            handleSetViewState={handleSetViewState}
          />
          <LanguageButton
            handleSetViewState={handleSetViewState}
            viewState={viewState}
          />
        </div>
      </Modal>
    );
  }

  // Modal collapsed view
  if (viewState === ViewState.Collapsed) {
    return <Collapsed handleSetViewState={handleSetViewState} />;
  }

  // Completely hidden
  return <div />;
}
