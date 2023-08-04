import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import type { ViewState } from '@transcend-io/airgap.js-types';
import { bottomMenuMessages, noticeAndDoNotSellMessages } from '../messages';
import type { HandleSetViewState } from '../types';
import { MenuItem } from './MenuItem';

/**
 * Renders the menu for the bottom of the banner
 */
export function BottomMenu({
  viewState,
  handleSetViewState,
  firstSelectedViewState,
  secondaryPolicy,
  privacyPolicy,
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
}): JSX.Element {
  const { formatMessage } = useIntl();

  return (
    <div className="bottom-menu-container">
      {viewState === 'LanguageOptions' ? (
        <div className="bottom-menu-item-container">
          <MenuItem
            label={formatMessage(bottomMenuMessages.backButtonTooltip)}
            type="button"
            onClick={(e) => handleSetViewState('back', e)}
          >
            {formatMessage(bottomMenuMessages.backButtonText)}
          </MenuItem>
        </div>
      ) : (
        ![
          'NoticeAndDoNotSell',
          'DoNotSellDisclosure',
          'OptOutDisclosure',
          'PrivacyPolicyNotice',
          'AcceptOrRejectAnalytics',
          'AcceptAllOrMoreChoices',
          'AcceptOrRejectAllOrMoreChoices',
          'CompleteOptionsInverted',
          'DoNotSellExplainer',
          'LanguageOptions',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ].includes(viewState as any) &&
        (viewState === 'CompleteOptions' ? (
          !firstSelectedViewState ||
          firstSelectedViewState === 'CompleteOptions' ? null : (
            <div className="bottom-menu-item-container">
              <MenuItem
                label={formatMessage(
                  bottomMenuMessages.simplerChoicesButtonLabel,
                )}
                type="button"
                onClick={() => handleSetViewState(firstSelectedViewState)}
              >
                {formatMessage(bottomMenuMessages.simplerChoicesButtonPrimary)}
              </MenuItem>
            </div>
          )
        ) : (
          <div className="bottom-menu-item-container">
            <MenuItem
              label={formatMessage(bottomMenuMessages.moreChoicesButtonLabel)}
              type="button"
              onClick={() => handleSetViewState('CompleteOptions')}
            >
              {formatMessage(bottomMenuMessages.moreChoicesButtonPrimary)}
            </MenuItem>
          </div>
        ))
      )}

      {viewState === 'NoticeAndDoNotSell' && (
        <div className="bottom-menu-item-container">
          <MenuItem
            label={formatMessage(noticeAndDoNotSellMessages.doNotSellLabel)}
            type="button"
            onClick={() => handleSetViewState('CompleteOptions')}
          >
            {formatMessage(noticeAndDoNotSellMessages.doNotSellPrimary)}
          </MenuItem>
        </div>
      )}

      {secondaryPolicy && viewState === 'CompleteOptionsInverted' && (
        <div className="bottom-menu-item-container">
          <MenuItem
            label={formatMessage(
              bottomMenuMessages.showSecondaryPolicyButtonLabel,
            )}
            type="a"
            href={secondaryPolicy}
            target="_blank"
            rel="noopener noreferrer"
          >
            {formatMessage(bottomMenuMessages.showSecondaryPolicyButton)}
          </MenuItem>
        </div>
      )}

      <div className="bottom-menu-item-container">
        <MenuItem
          label={formatMessage(bottomMenuMessages.showPolicyButtonLabel)}
          type="a"
          href={privacyPolicy}
          target="_blank"
          rel="noopener noreferrer"
        >
          {formatMessage(
            viewState === 'CompleteOptionsInverted'
              ? bottomMenuMessages.showPolicyButtonCompleteOptionsInverted
              : bottomMenuMessages.showPolicyButtonPrimary,
          )}
        </MenuItem>
      </div>
    </div>
  );
}
