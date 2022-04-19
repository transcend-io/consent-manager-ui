// external
import { useCallback, useState } from 'preact/hooks';

// main
import {
  DismissedViewState,
  InitialViewState,
  ViewState,
} from '@transcend-io/airgap.js-types';

// global
import { logger } from '../logger';
import type { HandleSetViewState, RequestedViewState } from '../types';

/**
 * Helper to determine whether a view state is closed
 *
 * @param viewState - the current view state
 * @returns a boolean whether this is closed
 */
export function viewStateIsClosed(viewState: ViewState): boolean {
  const closedViewStates: ViewState[] = [
    ViewState.Hidden,
    ViewState.Closed,
    ViewState.Collapsed,
  ];
  return closedViewStates.includes(viewState);
}

/**
 * State management for consent manager view states
 *
 * @param defaultStates - the states to open/close to
 * @returns the view state and a function to switch view states
 */
export function useViewState({
  initialViewState,
  dismissedViewState,
}: {
  /** Which state this consent manager should go to when opened */
  initialViewState: InitialViewState;
  /** Which state this consent manager should go to when closed */
  dismissedViewState: DismissedViewState;
}): {
  /** The current view state */
  viewState: ViewState;
  /** A handler for the view state */
  handleSetViewState: HandleSetViewState;
} {
  const [state, setState] = useState<{
    /** The current view state */
    current: ViewState;
    /** The previous view state - used for going back */
    previous: ViewState | null;
  }>({
    current: ViewState.Hidden,
    previous: null,
  });

  /**
   * When the viewState is set, update the view state and track previous state + whether the modal has (ever) been dismissed
   *
   * @param requestedViewState - the requested next view state, 'open', 'close', or 'back'
   */
  const handleSetViewState: HandleSetViewState = useCallback(
    (requestedViewState: RequestedViewState) => {
      switch (requestedViewState) {
        // Request to go back to the previous page
        case 'back':
          if (state.previous !== null) {
            setState({
              current: state.previous,
              previous: state.current,
            });
          } else {
            logger.warn('Tried to go back when there is no previous state');
          }
          break;

        // Request to open the modal, to the initial view state (which depends on the user's region)
        case 'open':
          setState({
            current: initialViewState,
            previous: state.current,
          });
          break;

        // Request to close the modal, to the closed view state (which depends on whether customer wants to display the collapse view or hide it)
        case 'close':
          setState({
            current: dismissedViewState,
            previous: state.current,
          });
          break;

        // Request to go to a specific view state, e.g. the language options page
        default:
          setState({
            current: requestedViewState,
            previous: state.current,
          });
          break;
      }
    },
    [state, setState, initialViewState, dismissedViewState],
  );

  return {
    viewState: state.current,
    handleSetViewState,
  };
}
