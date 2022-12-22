import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { ViewState } from '@transcend-io/airgap.js-types';
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
        ViewState.NoticeAndDoNotSell,
        ViewState.DoNotSellDisclosure,
        ViewState.PrivacyPolicyNotice,
        ViewState.AcceptOrRejectAnalytics,
        ViewState.DoNotSellExplainer,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ].includes(viewState as any) &&
        (viewState === ViewState.CompleteOptions ? (
          !firstSelectedViewState ||
          firstSelectedViewState === ViewState.CompleteOptions ? null : (
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
              onClick={() => handleSetViewState(ViewState.CompleteOptions)}
            >
              {formatMessage(bottomMenuMessages.moreChoicesButtonPrimary)}
            </MenuItem>
          </div>
        ))}

      {viewState === ViewState.NoticeAndDoNotSell && (
        <div className="bottom-menu-item-container">
          <MenuItem
            label={formatMessage(noticeAndDoNotSellMessages.doNotSellLabel)}
            type="button"
            onClick={() => handleSetViewState(ViewState.CompleteOptions)}
          >
            {formatMessage(noticeAndDoNotSellMessages.doNotSellPrimary)}
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
          {formatMessage(bottomMenuMessages.showPolicyButtonPrimary)}
        </MenuItem>
      </div>
    </div>
  );
}
