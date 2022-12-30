import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import type { ViewState } from '@transcend-io/airgap.js-types';
import { useConfig } from '../hooks';
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
}: {
  /** The first view state when opening the modal */
  firstSelectedViewState: ViewState | null;
  /** The current viewState */
  viewState: ViewState;
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
}): JSX.Element {
  const { config } = useConfig();
  const { formatMessage } = useIntl();

  return (
    <div className="bottom-menu-container">
      {![
        'NoticeAndDoNotSell',
        'DoNotSellDisclosure',
        'PrivacyPolicyNotice',
        'AcceptOrRejectAnalytics',
        'CompleteOptionsInverted',
        'DoNotSellExplainer',
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
        ))}

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

      {config.secondaryPolicy && viewState === 'CompleteOptionsInverted' && (
        <div className="bottom-menu-item-container">
          <MenuItem
            label={formatMessage(
              bottomMenuMessages.showSecondaryPolicyButtonLabel,
            )}
            type="a"
            href={config.secondaryPolicy}
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
          href={config.privacyPolicy}
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
