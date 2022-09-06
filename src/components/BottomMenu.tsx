// external
import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';

// main
import { ViewState } from '@transcend-io/airgap.js-types';

// global
import { useConfig, useEmotion } from '../hooks';
import { bottomMenuMessages, noticeAndDoNotSellMessages } from '../messages';
import type { HandleSetViewState } from '../types';

// local
import MenuItem from './MenuItem';

/**
 * Renders the menu for the bottom of the banner
 */
export default function BottomMenu({
  viewState,
  handleSetViewState,
}: {
  /** The current viewState */
  viewState: ViewState;
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
}): JSX.Element {
  const { config } = useConfig();
  const { formatMessage } = useIntl();
  const { css, cx } = useEmotion();

  const menuContainerStyle = css`
    width: calc(100% - 60px);
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin: 0 auto;

    @media (min-width: ${config.breakpoints.tablet}) {
      width: calc(100% - 150px);
      justify-content: space-evenly;
    }
  `;

  const menuItemContainerStyle = css`
    width: auto;
  `;

  return (
    <div className={cx(menuContainerStyle)}>
      {![
        ViewState.NoticeAndDoNotSell,
        ViewState.DoNotSellDisclosure,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ].includes(viewState as any) && (
        <div className={cx(menuItemContainerStyle)}>
          {viewState === ViewState.CompleteOptions ? (
            <MenuItem
              label={formatMessage(
                bottomMenuMessages.simplerChoicesButtonLabel,
              )}
              type="button"
              onClick={() => handleSetViewState(ViewState.QuickOptions)}
            >
              {formatMessage(bottomMenuMessages.simplerChoicesButtonPrimary)}
            </MenuItem>
          ) : (
            <MenuItem
              label={formatMessage(bottomMenuMessages.moreChoicesButtonLabel)}
              type="button"
              onClick={() => handleSetViewState(ViewState.CompleteOptions)}
            >
              {formatMessage(bottomMenuMessages.moreChoicesButtonPrimary)}
            </MenuItem>
          )}
        </div>
      )}

      {viewState === ViewState.NoticeAndDoNotSell && (
        <div className={cx(menuItemContainerStyle)}>
          <MenuItem
            label={formatMessage(noticeAndDoNotSellMessages.doNotSellLabel)}
            type="button"
            onClick={() => handleSetViewState(ViewState.CompleteOptions)}
          >
            {formatMessage(noticeAndDoNotSellMessages.doNotSellPrimary)}
          </MenuItem>
        </div>
      )}

      <div className={cx(menuItemContainerStyle)}>
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
