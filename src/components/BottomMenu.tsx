import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import type { ViewState } from '@transcend-io/airgap.js-types';
import { DefinedMessage } from '@transcend-io/internationalization';
import { bottomMenuMessages, noticeAndDoNotSellMessages } from '../messages';
import type { HandleSetViewState } from '../types';
import { MenuItem } from './MenuItem';
import { ObjByString } from '@transcend-io/type-utils';
import { settings } from '../settings';
import { getLinkProps } from '../utils/getLinkProps';

const VIEW_STATE_TO_MESSAGE: { [k in ViewState]: DefinedMessage | undefined } =
  {
    LanguageOptions: bottomMenuMessages.showPolicyButtonLanguageOptions,
    DoNotSellDisclosure: bottomMenuMessages.showPolicyButtonDoNotSellDisclosure,
    OptOutDisclosure: bottomMenuMessages.showPolicyButtonOptOutDisclosure,
    QuickOptions: bottomMenuMessages.showPolicyButtonQuickOptions,
    QuickOptions3: bottomMenuMessages.showPolicyButtonQuickOptions3,
    AcceptAll: bottomMenuMessages.showPolicyButtonAcceptAll,
    AcceptAllOrMoreChoices:
      bottomMenuMessages.showPolicyButtonAcceptAllOrMoreChoices,
    AcceptOrRejectAll: bottomMenuMessages.showPolicyButtonAcceptOrRejectAll,
    AcceptOrRejectAllOrMoreChoices:
      bottomMenuMessages.showPolicyButtonAcceptOrRejectAllOrMoreChoices,
    AcceptOrRejectAnalytics:
      bottomMenuMessages.showPolicyButtonAcceptOrRejectAnalytics,
    AcceptOrRejectAdvertising:
      bottomMenuMessages.showPolicyButtonAcceptOrRejectAdvertising,
    AcceptAllRejectAllToggle:
      bottomMenuMessages.showPolicyButtonAcceptAllRejectAllToggle,
    NoticeAndDoNotSell: bottomMenuMessages.showPolicyButtonNoticeAndDoNotSell,
    DoNotSellExplainer: bottomMenuMessages.showPolicyButtonDoNotSellExplainer,
    PrivacyPolicyNotice: bottomMenuMessages.showPolicyButtonPrivacyPolicyNotice,
    CompleteOptions: bottomMenuMessages.showPolicyButtonCompleteOptions,
    CompleteOptionsInverted:
      bottomMenuMessages.showPolicyButtonCompleteOptionsInverted,
    // These shouldn't require text for a policy link
    Collapsed: bottomMenuMessages.showPolicyButtonCompleteOptionsInverted,
    Closed: bottomMenuMessages.showPolicyButtonCompleteOptionsInverted,
    Hidden: bottomMenuMessages.showPolicyButtonCompleteOptionsInverted,
    TCF_EU: undefined,
    CompleteOptionsToggles:
      bottomMenuMessages.showPolicyButtonCompleteOptionsToggles,
    PrivacyPolicyNoticeWithCloseButton:
      bottomMenuMessages.showPolicyButtonPrivacyPolicyNoticeWithCloseButton,
  };

/**
 * Renders the menu for the bottom of the banner
 */
export function BottomMenu({
  viewState,
  handleSetViewState,
  firstSelectedViewState,
  secondaryPolicy,
  privacyPolicy,
  globalUiVariables,
}: {
  /** The first view state when opening the modal */
  firstSelectedViewState: ViewState | null;
  /** The current viewState */
  viewState: ViewState;
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
  /** Privacy policy */
  privacyPolicy: string;
  /** Secondary policy */
  secondaryPolicy: string;
  /** Global UI view state variables */
  globalUiVariables: ObjByString;
}): JSX.Element {
  const { formatMessage } = useIntl();
  const policyMessage = VIEW_STATE_TO_MESSAGE[viewState];

  return (
    <div className="bottom-menu-container">
      {viewState === 'LanguageOptions' ? (
        <div className="bottom-menu-item-container">
          <MenuItem
            label={formatMessage(
              bottomMenuMessages.backButtonTooltip,
              globalUiVariables,
            )}
            type="button"
            onClick={(e) => handleSetViewState('back', e)}
          >
            {formatMessage(
              bottomMenuMessages.backButtonText,
              globalUiVariables,
            )}
          </MenuItem>
        </div>
      ) : (
        ![
          'NoticeAndDoNotSell',
          'DoNotSellDisclosure',
          'OptOutDisclosure',
          'PrivacyPolicyNotice',
          'PrivacyPolicyNoticeWithCloseButton',
          'AcceptOrRejectAnalytics',
          'AcceptAllOrMoreChoices',
          'AcceptOrRejectAllOrMoreChoices',
          'CompleteOptionsInverted',
          'DoNotSellExplainer',
          'LanguageOptions',
          'AcceptAllRejectAllToggle',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ].includes(viewState as any) &&
        (['CompleteOptions', 'CompleteOptionsToggles'].includes(viewState) ? (
          !firstSelectedViewState ||
          ['CompleteOptions', 'CompleteOptionsToggles'].includes(
            firstSelectedViewState
          ) ? null : (
            <div className="bottom-menu-item-container">
              <MenuItem
                label={formatMessage(
                  bottomMenuMessages.simplerChoicesButtonLabel,
                  globalUiVariables,
                )}
                type="button"
                onClick={() => handleSetViewState(firstSelectedViewState)}
              >
                {formatMessage(
                  bottomMenuMessages.simplerChoicesButtonPrimary,
                  globalUiVariables,
                )}
              </MenuItem>
            </div>
          )
        ) : (
          <div className="bottom-menu-item-container">
            <MenuItem
              label={formatMessage(
                bottomMenuMessages.moreChoicesButtonLabel,
                globalUiVariables,
              )}
              type="button"
              onClick={() =>
                handleSetViewState(
                  settings?.moreChoicesView
                    ? settings.moreChoicesView
                    : 'CompleteOptions'
                )
              }
            >
              {formatMessage(
                bottomMenuMessages.moreChoicesButtonPrimary,
                globalUiVariables,
              )}
            </MenuItem>
          </div>
        ))
      )}

      {viewState === 'NoticeAndDoNotSell' && (
        <div className="bottom-menu-item-container">
          <MenuItem
            label={formatMessage(
              noticeAndDoNotSellMessages.doNotSellLabel,
              globalUiVariables,
            )}
            type="button"
            onClick={() => handleSetViewState('CompleteOptions')}
          >
            {formatMessage(
              noticeAndDoNotSellMessages.doNotSellPrimary,
              globalUiVariables,
            )}
          </MenuItem>
        </div>
      )}

      {
        // Privacy Link - CompleteOptionsInverted special case
        secondaryPolicy && viewState === 'CompleteOptionsInverted' && (
          <div className="bottom-menu-item-container">
            <MenuItem
              label={formatMessage(
                bottomMenuMessages.showSecondaryPolicyButtonLabel,
                globalUiVariables,
              )}
              type="a"
              href={secondaryPolicy}
              {...getLinkProps(settings.isMobile)}
            >
              {formatMessage(
                bottomMenuMessages.showSecondaryPolicyButton,
                globalUiVariables,
              )}
            </MenuItem>
          </div>
        )
      }

      <div className="bottom-menu-item-container">
        <MenuItem
          label={formatMessage(
            bottomMenuMessages.showPolicyButtonLabel,
            globalUiVariables,
          )}
          type="a"
          href={privacyPolicy}
          {...getLinkProps(settings.isMobile)}
        >
          {policyMessage
            ? formatMessage(policyMessage, globalUiVariables)
            : 'Undefined Policy Link Message'}
        </MenuItem>
      </div>
    </div>
  );
}
