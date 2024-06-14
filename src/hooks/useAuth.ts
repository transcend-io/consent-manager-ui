import { useCallback, useState } from 'preact/hooks';
import type { AirgapAuth } from '@transcend-io/airgap.js-types';
import type { HandleChangeAuthKey } from '../types';

/**
 * State management for consent manager view states
 *
 * @param defaultStates - the states to open/close to
 * @returns the view state and a function to switch view states
 */
export function useAuth(): {
  /** The currently stored auth key */
  auth?: AirgapAuth;
  /** A handler for the auth key */
  handleChangeAuthKey: HandleChangeAuthKey;
} {
  const [state, setState] = useState<{
    /** Airgap auth */
    auth?: AirgapAuth;
  }>({});

  /**
   * When the viewState is set, update the view state and track previous state + whether the modal has (ever) been dismissed
   *
   * @param requestedViewState - the requested next view state, 'open', 'close', or 'back'
   */
  const handleChangeAuthKey: HandleChangeAuthKey = useCallback(
    (auth: AirgapAuth) => {
      setState({ auth });
    },
    [state, setState],
  );

  return {
    handleChangeAuthKey,
    auth: state.auth,
  };
}
