// external
import { ComponentChildren, createContext, h, JSX } from 'preact';
import { StateUpdater, useContext, useState } from 'preact/hooks';

// main
import { ConsentManagerConfig } from '@transcend-io/airgap.js-types';

/**
 * Config context
 */
interface TConfigContext {
  /** The config */
  config: Required<ConsentManagerConfig>;
  /** Set new config */
  setConfig: StateUpdater<Required<ConsentManagerConfig>>;
}

/**
 * Context to pass Emotion through the app
 */
export const ConfigContext = createContext<TConfigContext>(
  {} as TConfigContext,
);

export const ConfigProvider = ({
  newConfig,
  children,
}: {
  /** The new configuration */
  newConfig: Required<ConsentManagerConfig>;
  /** The children of this provider */
  children: ComponentChildren;
}): JSX.Element => {
  const [config, setConfig] =
    useState<Required<ConsentManagerConfig>>(newConfig);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = (): TConfigContext => useContext(ConfigContext);
