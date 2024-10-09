import { DefinedMessage } from '@transcend-io/internationalization';
import {
  completeOptionsMessages,
  completeOptionsInvertedMessages,
} from '../messages';

// Mapping of purposes to the message translation key
export const DEFAULT_PURPOSE_TO_MESSAGE_KEY: Record<string, DefinedMessage> = {
  Essential: completeOptionsMessages.essentialLabel,
  Functional: completeOptionsMessages.functionalLabel,
  Analytics: completeOptionsMessages.analyticsLabel,
  Advertising: completeOptionsMessages.advertisingLabel,
  SaleOfInfo: completeOptionsMessages.saleOfInfoLabel,
};

export const DEFAULT_PURPOSE_TO_DESCRIPTION_KEY: Record<
  string,
  DefinedMessage
> = {
  Essential: completeOptionsMessages.essentialDescription,
  Functional: completeOptionsMessages.functionalDescription,
  Analytics: completeOptionsMessages.analyticsDescription,
  Advertising: completeOptionsMessages.advertisingDescription,
  SaleOfInfo: completeOptionsMessages.saleOfInfoDescription,
}

export const DEFAULT_PURPOSE_TO_INVERTED_MESSAGE_KEY: Record<
  string,
  DefinedMessage
> = {
  Essential: completeOptionsMessages.essentialLabel,
  Functional: completeOptionsInvertedMessages.functionalLabel,
  Analytics: completeOptionsInvertedMessages.analyticsLabel,
  Advertising: completeOptionsInvertedMessages.advertisingLabel,
  SaleOfInfo: completeOptionsInvertedMessages.saleOfInfoLabel,
};

// Encode the default purpose ordering
export const ORDER_OF_PURPOSES = Object.keys(DEFAULT_PURPOSE_TO_MESSAGE_KEY);
