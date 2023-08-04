import { useCallback, useState } from 'preact/hooks';
import type {
  AirgapAuth,
  DismissedViewState,
  ResponseViewState,
  InitialViewState,
  ViewState,
  ViewStateEventDetails,
  TranscendEventType,
} from '@transcend-io/airgap.js-types';
import { logger } from '../logger';
import type { HandleSetViewState } from '../types';

/**
 * Helper to determine whether a view state is closed
 *
 * @param viewState - the current view state
 * @returns a boolean whether this is closed
 */
export function isViewStateClosed(
  viewState: ViewState,
): viewState is DismissedViewState {
  const closedViewStates: ViewState[] = ['Hidden', 'Closed', 'Collapsed'];
  return closedViewStates.includes(viewState);
}

/**
 * Helper to determine whether a view state is a ResponseViewState
 *
 * @param viewState - the current view state
 * @returns a boolean whether this is a ResponseViewState
 */
export function isResponseViewState(
  viewState: ViewState,
): viewState is ResponseViewState {
  const responseViewStates: ViewState[] = ['DoNotSellDisclosure'];
  return responseViewStates.includes(viewState);
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
  eventTarget,
}: {
  /** Which state this consent manager should go to when opened */
  initialViewState: InitialViewState;
  /** Which state this consent manager should go to when closed */
  dismissedViewState: DismissedViewState;
  /** The event target on the `transcend` API, where we will dispatch view state change events */
  eventTarget: EventTarget;
}): {
  /** The current view state */
  viewState: ViewState;
  /** A handler for the view state */
  handleSetViewState: HandleSetViewState;
  /** The first view state when opening the modal */
  firstSelectedViewState: ViewState | null;
  /** Airgap auth */
  auth?: AirgapAuth;
} {
  const [state, setState] = useState<{
    /** The current view state */
    current: ViewState;
    /** The previous view state - used for going back */
    previous: ViewState | null;
    /** The first view state when opening the modal */
    firstSelectedViewState: ViewState | null;
    /** Airgap auth */
    auth?: AirgapAuth;
  }>({
    current: 'Hidden',
    previous: null,
    firstSelectedViewState: null,
  });

  /**
   * When the viewState is set, update the view state and track previous state + whether the modal has (ever) been dismissed
   *
   * @param requestedViewState - the requested next view state, 'open', 'close', or 'back'
   */
  const handleSetViewState: HandleSetViewState = useCallback(
    (requestedViewState, auth, resetFirstSelectedViewState = false) => {
      switch (requestedViewState) {
        // Request to go back to the previous page
        case 'back':
          if (state.previous !== null) {
            setState({
              current: state.previous,
              previous: state.current,
              auth,
              firstSelectedViewState: state.firstSelectedViewState,
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
            auth,
            firstSelectedViewState:
              initialViewState || state.firstSelectedViewState,
          });
          break;

        // Request to close the modal, to the closed view state (which depends on whether customer wants to display the collapse view or hide it)
        case 'close':
          setState({
            current: dismissedViewState,
            previous: state.current,
            auth,
            firstSelectedViewState: null,
          });
          break;

        // Request to go to a specific view state, e.g. the language options page
        default:
          setState({
            current: requestedViewState,
            previous: state.current,
            auth,
            firstSelectedViewState: resetFirstSelectedViewState
              ? requestedViewState
              : state.firstSelectedViewState || requestedViewState,
          });
          break;
      }
    },
    [state, setState, initialViewState, dismissedViewState],
  );

  // Now that the viewState has updated, dispatch an event on the `transcend` API / event target
  const eventDetails: ViewStateEventDetails = {
    viewState: state.current,
    previousViewState: state.previous,
  };
  const eventType: TranscendEventType = 'view-state-change';
  eventTarget.dispatchEvent(
    new CustomEvent(eventType, {
      detail: eventDetails,
    }),
  );

  return {
    viewState: state.current,
    handleSetViewState,
    auth: state.auth,
    firstSelectedViewState: state.firstSelectedViewState,
  };
}
