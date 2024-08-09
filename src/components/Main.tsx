import { h, JSX } from 'preact';
import type {
  AirgapAPI,
  AirgapAuth,
  ConsentManagerConfig,
  ViewState,
} from '@transcend-io/airgap.js-types';
import { ConsentManagerLanguageKey } from '@transcend-io/internationalization';
import { isResponseViewState, isViewStateClosed } from '../hooks';
import type { HandleSetViewState } from '../types';
import { Collapsed } from './Collapsed';
import { AcceptAll } from './AcceptAll';
import { BottomMenu } from './BottomMenu';
import { CompleteOptions } from './CompleteOptions';
import { LanguageButton } from './LanguageButton';
import { LanguageOptions } from './LanguageOptions';
import { CompleteOptionsInverted } from './CompleteOptionsInverted';
import { TranscendLogo } from './TranscendLogo';
import { NoticeAndDoNotSell } from './NoticeAndDoNotSell';
import { QuickOptions } from './QuickOptions';
import { OptOutDisclosure } from './OptOutDisclosure';
import { AcceptOrRejectAdvertising } from './AcceptOrRejectAdvertising';
import { AcceptOrRejectAll } from './AcceptOrRejectAll';
import { DoNotSellDisclosure } from './DoNotSellDisclosure';
import { AcceptOrRejectAnalytics } from './AcceptOrRejectAnalytics';
import { DoNotSellExplainer } from './DoNotSellExplainer';
import { QuickOptions3 } from './QuickOptions3';
import { PrivacyPolicyNotice } from './PrivacyPolicyNotice';
import { PrivacyPolicyNoticeWithCloseButton } from './PrivacyPolicyNoticeWithCloseButton';
import { AcceptAllOrMoreChoices } from './AcceptAllOrMoreChoices';
import { AcceptOrRejectAllOrMoreChoices } from './AcceptOrRejectAllOrMoreChoices';
import { AcceptAllRejectAllToggle } from './AcceptAllRejectAllToggle';
import { useEffect, useRef } from 'preact/hooks';
import { CompleteOptionsToggles } from './CompleteOptionsToggles';
import { useIntl } from 'react-intl';
import { messages } from '../messages';
import { initialFocusElement } from '../helpers';

/**
 * Presents view states (collapsed, GDPR-mode, CCPA-mode etc)
 */
export function Main({
  airgap,
  viewState,
  config,
  firstSelectedViewState,
  handleSetViewState,
  handleChangeLanguage,
  supportedLanguages,
  modalOpenAuth,
}: {
  /** airgap.js API */
  airgap: AirgapAPI;
  /** Configuration for consent UI */
  config: ConsentManagerConfig;
  /** The on click event passed as authentication to airgap. Needed for do-not-sell acknowledgement */
  modalOpenAuth?: AirgapAuth;
  /** The current viewState of the consent manager */
  viewState: ViewState;
  /** First view state selected when transcend.showConsentManager() is called */
  firstSelectedViewState: ViewState | null;
  /** Updater function for viewState */
  handleSetViewState: HandleSetViewState;
  /** Updater function for language change */
  handleChangeLanguage: (language: ConsentManagerLanguageKey) => void;
  /** Set of supported languages */
  supportedLanguages: ConsentManagerLanguageKey[];
}): JSX.Element {
  const { formatMessage } = useIntl();
  // need to focus the element marked with data-initialFocus when the modal is opened
  // regular autofocus attributes caused errors, thus the data attribute usage
  // NOTE: if we want to meet a11y guidelines we will need to implement a focus trap as well
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isViewStateClosed(viewState) && dialogRef.current) {
      // This setTimeout was necessary for the api triggered states, (DoNotSell|OptOut)Disclosure
      setTimeout(() => {
        if (dialogRef.current) initialFocusElement(dialogRef.current);
      }, 0);
    }
  }, [viewState, dialogRef]);

  // Modal open views
  if (!isViewStateClosed(viewState)) {
    if (!isResponseViewState(viewState) && !airgap.getConsent().prompted) {
      airgap.setPrompted(true);
    }
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={formatMessage(messages.modalAriaLabel)}
        aria-live="polite"
        className="modal-container"
        id="consentManagerMainDialog"
        ref={dialogRef}
      >
        <div class="modal-container-top">
            {viewState === 'CompleteOptions' && (
              <svg 
                onClick={() => handleSetViewState(firstSelectedViewState)}
                class="pointer"
                fill="#000000" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g data-name="Layer 2">
                <g data-name="arrow-ios-back">
                <rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/>
                <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"/>
                </g>
                </g>
              </svg>
            )}
            {viewState != 'CompleteOptions' && (
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" viewBox="0 0 27 25" fill="none">
                <g clip-path="url(#clip0_6658_13102)">
                  <path d="M26.1073 7.99466C25.7728 7.17888 25.2351 6.46499 24.5468 5.92277C23.8146 5.35819 22.9492 4.99772 22.0368 4.8772C21.511 4.80665 20.9776 4.8153 20.4542 4.90286C19.9088 4.99985 19.3773 5.16467 18.8717 5.39357C18.6184 5.50262 18.3716 5.61487 18.1215 5.7143C17.3592 6.17397 16.4921 6.42487 15.6052 6.44235C15.1444 6.44456 14.6847 6.39508 14.2347 6.29481C13.9972 6.24347 13.7626 6.17924 13.532 6.10238C13.31 6.02959 13.0807 5.98225 12.8483 5.96126C12.313 5.93933 11.7769 5.96724 11.2467 6.04464L9.98064 6.18576H9.94266C9.59623 5.84115 9.21299 5.53672 8.80003 5.27811C8.69571 5.1878 8.56852 5.12892 8.43287 5.10812C8.03405 5.10812 7.9391 5.58601 7.91694 5.89711C7.89437 6.27857 7.92851 6.66131 8.01823 7.03248C8.04887 7.18279 8.09889 7.32837 8.16699 7.46547C8.20809 7.64559 8.26204 7.82246 8.32841 7.99466C8.19321 8.16642 8.08632 8.35921 8.0119 8.56556C7.9874 8.63613 7.95557 8.70387 7.91694 8.76762C7.78631 8.95565 7.64468 9.13558 7.49281 9.30644C6.99271 9.89337 6.46095 10.4514 5.9292 11.0063C5.67915 11.2661 3.52999 11.9845 2.28924 12.3854C2.33111 10.3576 2.94712 8.38469 4.06394 6.7015C5.18076 5.01831 6.75135 3.69572 8.58878 2.89117C10.4262 2.08662 12.4531 1.83398 14.4282 2.16333C16.4032 2.49268 18.2433 3.39015 19.7294 4.74891C19.9467 4.68582 20.1676 4.63655 20.3909 4.60137C20.7049 4.54988 21.0225 4.52414 21.3405 4.5244H21.4608C19.6418 2.50716 17.1978 1.17949 14.5329 0.760974C11.8681 0.342458 9.1421 0.858169 6.80581 2.22281C4.46953 3.58746 2.66291 5.71928 1.68477 8.26569C0.70663 10.8121 0.615559 13.6205 1.42662 16.2265C2.23769 18.8325 3.90229 21.0799 6.14513 22.597C8.38797 24.1141 11.0747 24.81 13.7609 24.5697C16.4471 24.3293 18.9718 23.1671 20.9176 21.2752C22.8634 19.3833 24.1135 16.8751 24.4614 14.1655L24.2715 14.2841C23.9782 14.4435 23.6747 14.5828 23.3631 14.7011L23.0655 14.8261L22.9326 14.8871C22.4373 17.1701 21.2113 19.2232 19.4454 20.7272C17.6795 22.2312 15.4726 23.1018 13.168 23.2035C14.203 21.6352 16.2889 18.5562 16.8997 18.1328C17.7438 17.5513 18.5878 16.9889 19.4319 16.4458C20.2232 15.9519 21.0145 15.4836 21.8533 15.0507C22.2109 14.8678 22.5749 14.6914 22.9484 14.5343C23.3483 14.3803 23.7393 14.2036 24.1195 14.0051C24.7986 13.6184 25.3727 13.0675 25.7908 12.4015C26.1878 11.7672 26.4237 11.0433 26.4776 10.2943C26.5326 9.50898 26.4058 8.72152 26.1073 7.99466ZM14.4974 9.51812C14.3218 9.64502 14.1134 9.71692 13.8979 9.72491C13.6824 9.73289 13.4693 9.6766 13.2851 9.56302C13.1064 9.45385 12.9643 9.29263 12.8773 9.10039C12.7904 8.90816 12.7626 8.69384 12.7977 8.48538C12.8069 8.43851 12.8196 8.39242 12.8356 8.34746C12.7882 8.47255 12.7502 8.57839 12.8356 8.32822C12.9211 8.07805 12.8895 8.18389 12.8356 8.30898C12.9166 8.11519 13.0531 7.95048 13.2275 7.83613C13.4018 7.72178 13.606 7.66305 13.8137 7.66752C14.0314 7.67202 14.2428 7.74215 14.4209 7.86898C14.5991 7.9958 14.7359 8.17355 14.8139 8.37954C14.8879 8.57871 14.8971 8.79665 14.8402 9.0015C14.7832 9.20635 14.6631 9.38738 14.4974 9.51812Z" fill="black"/>
                </g>
                <defs>
                  <clipPath id="clip0_6658_13102">
                    <rect width="25.5" height="24" fill="white" transform="translate(0.887329 0.61792)"/>
                  </clipPath>
                </defs>
              </svg>
            )}
        </div>
        <div role="document" className="modal-container-inner" tabIndex={0}>
          <div
            role="main"
            className="inner-container"
            aria-description={formatMessage(messages.modalAriaDescription)}
          >
            {viewState === 'QuickOptions' && (
              <QuickOptions handleSetViewState={handleSetViewState} />
            )}

            {viewState === 'AcceptAll' && (
              <AcceptAll handleSetViewState={handleSetViewState} />
            )}

            {viewState === 'AcceptOrRejectAnalytics' && (
              <AcceptOrRejectAnalytics
                handleSetViewState={handleSetViewState}
              />
            )}
            {viewState === 'AcceptOrRejectAdvertising' && (
              <AcceptOrRejectAdvertising
                handleSetViewState={handleSetViewState}
              />
            )}

            {viewState === 'DoNotSellExplainer' && (
              <DoNotSellExplainer
                handleSetViewState={handleSetViewState}
                fontColor={config.theme.fontColor}
              />
            )}

            {viewState === 'CompleteOptionsToggles' && (
              <CompleteOptionsToggles
                handleSetViewState={handleSetViewState}
                fontColor={config.theme.fontColor}
              />
            )}

            {viewState === 'QuickOptions3' && (
              <QuickOptions3 handleSetViewState={handleSetViewState} />
            )}

            {viewState === 'PrivacyPolicyNotice' && (
              <PrivacyPolicyNotice handleSetViewState={handleSetViewState} />
            )}

            {viewState === 'PrivacyPolicyNoticeWithCloseButton' && (
              <PrivacyPolicyNoticeWithCloseButton
                handleSetViewState={handleSetViewState}
                fontColor={config.theme.fontColor}
              />
            )}

            {viewState === 'AcceptOrRejectAll' && (
              <AcceptOrRejectAll handleSetViewState={handleSetViewState} />
            )}

            {viewState === 'AcceptAllRejectAllToggle' && (
              <AcceptAllRejectAllToggle
                handleSetViewState={handleSetViewState}
                fontColor={config.theme.fontColor}
              />
            )}

            {viewState === 'AcceptAllOrMoreChoices' && (
              <AcceptAllOrMoreChoices handleSetViewState={handleSetViewState} />
            )}

            {viewState === 'AcceptOrRejectAllOrMoreChoices' && (
              <AcceptOrRejectAllOrMoreChoices
                handleSetViewState={handleSetViewState}
              />
            )}

            {viewState === 'DoNotSellDisclosure' && modalOpenAuth && (
              <DoNotSellDisclosure
                handleSetViewState={handleSetViewState}
                modalOpenAuth={modalOpenAuth}
              />
            )}

            {viewState === 'OptOutDisclosure' && modalOpenAuth && (
              <OptOutDisclosure
                handleSetViewState={handleSetViewState}
                modalOpenAuth={modalOpenAuth}
              />
            )}

            {viewState === 'CompleteOptions' && (
              <CompleteOptions handleSetViewState={handleSetViewState} />
            )}

            {viewState === 'CompleteOptionsInverted' && (
              <CompleteOptionsInverted
                handleSetViewState={handleSetViewState}
              />
            )}

            {viewState === 'NoticeAndDoNotSell' && (
              <NoticeAndDoNotSell handleSetViewState={handleSetViewState} />
            )}

            {viewState === 'LanguageOptions' && (
              <LanguageOptions
                handleSetViewState={handleSetViewState}
                handleChangeLanguage={handleChangeLanguage}
                supportedLanguages={supportedLanguages}
              />
            )}
          </div>
{/*          <div role="contentinfo" className="footer-container">
            <TranscendLogo fontColor={config.theme.fontColor} />
            <BottomMenu
              firstSelectedViewState={firstSelectedViewState}
              viewState={viewState}
              handleSetViewState={handleSetViewState}
              privacyPolicy={config.privacyPolicy}
              secondaryPolicy={config.secondaryPolicy}
            />
            <LanguageButton
              handleSetViewState={handleSetViewState}
              viewState={viewState}
              fontColor={config.theme.fontColor}
              supportedLanguages={supportedLanguages}
            />
          </div>
*/}        </div>
      </div>
    );
  }

  // Modal collapsed view
  if (
    viewState === 'Collapsed' &&
    (!firstSelectedViewState || !isViewStateClosed(firstSelectedViewState))
  ) {
    return <Collapsed handleSetViewState={handleSetViewState} />;
  }

  // Completely hidden
  return <div />;
}
