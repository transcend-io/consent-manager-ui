import { DefinedMessage } from '@transcend-io/internationalization';
import { completeOptionsMessages } from '../messages';

// Mapping of purposes to the message translation key
export const DEFAULT_PURPOSE_TO_MESSAGE_KEY: Record<string, DefinedMessage> = {
  Essential: completeOptionsMessages.essentialLabel,
  Functional: completeOptionsMessages.functionalLabel,
  Analytics: completeOptionsMessages.analyticsLabel,
  Advertising: completeOptionsMessages.advertisingLabel,
  SaleOfInfo: completeOptionsMessages.saleOfInfoLabel,
};

// Encode the default purpose ordering
export const ORDER_OF_PURPOSES = Object.keys(DEFAULT_PURPOSE_TO_MESSAGE_KEY);
