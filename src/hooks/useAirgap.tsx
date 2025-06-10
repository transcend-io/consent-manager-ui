import { ComponentChildren, createContext, h, JSX } from 'preact';
import { StateUpdater, useCallback, useContext, useState } from 'preact/hooks';
import type {
  AirgapAPI,
  AirgapAuth,
  AirgapAuthMap,
} from '@transcend-io/airgap.js-types';

/**
 * Config context
 */
interface TConfigContext {
  /** The config */
  airgap: AirgapAPI;
  /** Set new config */
  setAirgap: StateUpdater<AirgapAPI>;
  /** Helper to build strict auth from potentially non-strict auth */
  buildStrictAuth: ({
    auth,
  }: {
    /** Potentially non-strict auth */
    auth: AirgapAuth;
  }) => AirgapAuth;
}

export const AirgapContext = createContext<TConfigContext>(
  {} as TConfigContext,
);

export const AirgapProvider = ({
  newAirgap,
  authKey,
  children,
}: {
  /** The new configuration */
  newAirgap: AirgapAPI;
  /** The auth key */
  authKey: AirgapAuthMap['key'];
  /** The children of this provider */
  children: ComponentChildren;
}): JSX.Element => {
  const [airgap, setAirgap] = useState<AirgapAPI>(newAirgap);

  const buildStrictAuth = useCallback(
    ({ auth }: { /** Potentially non-strict auth */ auth: AirgapAuth }) => {
      if (!auth) {
        return auth;
      }

      /* eslint-disable no-param-reassign */
      /* eslint-disable @typescript-eslint/no-explicit-any */
      (auth as any).key = authKey;
      (auth as any).interaction = auth;
      /* eslint-enable no-param-reassign */
      /* eslint-enable @typescript-eslint/no-explicit-any */

      return auth;
    },
    [authKey],
  );

  return (
    <AirgapContext.Provider value={{ airgap, setAirgap, buildStrictAuth }}>
      {children}
    </AirgapContext.Provider>
  );
};

export const useAirgap = (): TConfigContext => useContext(AirgapContext);
