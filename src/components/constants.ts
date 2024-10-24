import { DefinedMessage } from '@transcend-io/internationalization';
import {
  completeOptionsMessages,
  completeOptionsInvertedMessages,
} from '../messages';

// Mapping of purposes to the message translation key
export const DEFAULT_PURPOSE_TO_MESSAGE_KEY: Record<string, DefinedMessage> = {
  Essential: completeOptionsMessages['essential.title'],
  Functional: completeOptionsMessages['functional.title'],
  Analytics: completeOptionsMessages['analytics.title'],
  Advertising: completeOptionsMessages['advertising.title'],
  SaleOfInfo: completeOptionsMessages['saleOfInfo.title'],
};

export const DEFAULT_PURPOSE_TO_DESCRIPTION_KEY: Record<
  string,
  DefinedMessage
> = {
  Essential: completeOptionsMessages['essential.description'],
  Functional: completeOptionsMessages['functional.description'],
  Analytics: completeOptionsMessages['analytics.description'],
  Advertising: completeOptionsMessages['advertising.description'],
  SaleOfInfo: completeOptionsMessages['saleOfInfo.description'],
}

export const DEFAULT_PURPOSE_TO_INVERTED_MESSAGE_KEY: Record<
  string,
  DefinedMessage
> = {
  Essential: completeOptionsMessages['essential.title'],
  Functional: completeOptionsInvertedMessages.functionalLabel,
  Analytics: completeOptionsInvertedMessages.analyticsLabel,
  Advertising: completeOptionsInvertedMessages.advertisingLabel,
  SaleOfInfo: completeOptionsInvertedMessages.saleOfInfoLabel,
};

// Encode the default purpose ordering
export const ORDER_OF_PURPOSES = Object.keys(DEFAULT_PURPOSE_TO_MESSAGE_KEY);
