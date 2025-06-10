import { ComponentChild, h } from 'preact';
import { render, RenderOptions, RenderResult } from '@testing-library/preact';
import { AirgapProvider } from '../../hooks/useAirgap';
import { IntlProvider } from 'react-intl';
import { ConsentManagerLanguageKey } from '@transcend-io/internationalization';
import { AirgapAPI } from '@transcend-io/airgap.js-types';
import * as prettier from '@prettier/sync';
import { TestWindow } from './types';

export const testWindow = window as unknown as TestWindow;

interface CustomRenderResult extends RenderResult {
  /** Prettified container outerHTML for use in snapshotting */
  snapshot: string;
}

interface RenderWrapperProps {
  /** Arbitrary children to be provided by the test */
  children: ComponentChild[];
}

const wrapper = ({ children }: RenderWrapperProps): ComponentChild => {
  const { messages } = testWindow.JEST_SETUP_VARS;
  return (
    <IntlProvider
      locale={ConsentManagerLanguageKey.En}
      messages={messages || {}}
      defaultLocale={ConsentManagerLanguageKey.En}
    >
      {
        (
          <AirgapProvider
            newAirgap={window.airgap as AirgapAPI}
            authKey={undefined}
          >
            {children}
          </AirgapProvider> // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ) as any
      }
    </IntlProvider>
  );
};

const customRender = (
  ui: ComponentChild,
  options: RenderOptions = {},
): CustomRenderResult => {
  const result = render(ui, { wrapper, ...options });
  const snapshot = result.container.outerHTML;
  const prettySnapshot = prettier.format(snapshot, { parser: 'html' });
  return {
    snapshot: prettySnapshot,
    ...result,
  };
};

export { customRender as render };
