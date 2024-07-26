
import { ComponentChild, h } from 'preact';
import { fireEvent, render, RenderResult } from '@testing-library/preact';
import { AirgapProvider } from '../hooks/useAirgap'
import { IntlProvider } from 'react-intl';
import { ConsentManagerLanguageKey } from '@transcend-io/internationalization';
// import { airgapStub } from '../playground/airgapStub';
import { AirgapAPI } from '@transcend-io/airgap.js-types';
import { MockPurposeNames } from './types';




/**
 * Add Airgap API stub to window/self/globalThis
 */
// window.airgap = Object.assign(airgapStub, window.airgap);

const wrapper = ({ children }: any) => {
  const messages = (window as any).JEST_SETUP_VARS.messages;
  return (
    <IntlProvider
      locale={ConsentManagerLanguageKey.En}
      messages={messages || {}}
      defaultLocale={ConsentManagerLanguageKey.En}
    >
      {<AirgapProvider newAirgap={window.airgap as AirgapAPI}>
        {children}
        </AirgapProvider> as any}
      </IntlProvider>
  )
}

const customRender = (ui: ComponentChild, options: any = {}) =>
  render(ui, {wrapper, ...options})

export const clickPurposeCheckbox = <T extends RenderResult>(screen: T, purposeName: MockPurposeNames) => {
  const checkboxEl = screen
    .queryByText('Advertising', {exact: false})
    ?.querySelector('input');
  if (checkboxEl) fireEvent.click(checkboxEl);
}

export { customRender as render };
