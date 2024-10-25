import { DefinedMessage } from '@transcend-io/internationalization';
import {
  completeOptionsInvertedMessages,
  purposeMessages,
} from '../messages';

// Mapping of purposes to the message translation key
export const DEFAULT_PURPOSE_TO_MESSAGE_KEY: Record<string, DefinedMessage> = {
  Essential: purposeMessages['essential.title'],
  Functional: purposeMessages['functional.title'],
  Analytics: purposeMessages['analytics.title'],
  Advertising: purposeMessages['advertising.title'],
  SaleOfInfo: purposeMessages['saleOfInfo.title'],
};

export const DEFAULT_PURPOSE_TO_DESCRIPTION_KEY: Record<
  string,
  DefinedMessage
> = {
  Essential: purposeMessages['essential.description'],
  Functional: purposeMessages['functional.description'],
  Analytics: purposeMessages['analytics.description'],
  Advertising: purposeMessages['advertising.description'],
  SaleOfInfo: purposeMessages['saleOfInfo.description'],
}

export const DEFAULT_PURPOSE_TO_INVERTED_MESSAGE_KEY: Record<
  string,
  DefinedMessage
> = {
  Essential: purposeMessages['essential.title'],
  Functional: completeOptionsInvertedMessages.functionalLabel,
  Analytics: completeOptionsInvertedMessages.analyticsLabel,
  Advertising: completeOptionsInvertedMessages.advertisingLabel,
  SaleOfInfo: completeOptionsInvertedMessages.saleOfInfoLabel,
};

// Encode the default purpose ordering
export const ORDER_OF_PURPOSES = Object.keys(DEFAULT_PURPOSE_TO_MESSAGE_KEY);
