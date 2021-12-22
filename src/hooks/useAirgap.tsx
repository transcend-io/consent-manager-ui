// external
import { ComponentChildren, createContext, h, JSX } from 'preact';
import { StateUpdater, useContext, useState } from 'preact/hooks';

// main
import type { AirgapAPI } from '@transcend-io/airgap.js-types';

/**
 * Config context
 */
interface TConfigContext {
  /** The config */
  airgap: AirgapAPI;
  /** Set new config */
  setAirgap: StateUpdater<AirgapAPI>;
}

export const AirgapContext = createContext<TConfigContext>(
  {} as TConfigContext,
);

export const AirgapProvider = ({
  newAirgap,
  children,
}: {
  /** The new configuration */
  newAirgap: AirgapAPI;
  /** The children of this provider */
  children: ComponentChildren;
}): JSX.Element => {
  const [airgap, setAirgap] = useState<AirgapAPI>(newAirgap);

  return (
    <AirgapContext.Provider value={{ airgap, setAirgap }}>
      {children}
    </AirgapContext.Provider>
  );
};

export const useAirgap = (): TConfigContext => useContext(AirgapContext);
