import { DefinedMessage } from '@transcend-io/internationalization';
import {
  completeOptionsInvertedMessages,
  purposeMessages,
} from '../messages';

// Mapping of purposes to the message translation key
export const DEFAULT_PURPOSE_TO_MESSAGE_KEY: Record<string, DefinedMessage> = {
  Essential: purposeMessages['Essential.title'],
  Functional: purposeMessages['Functional.title'],
  Analytics: purposeMessages['Analytics.title'],
  Advertising: purposeMessages['Advertising.title'],
  SaleOfInfo: purposeMessages['SaleOfInfo.title'],
};

export const DEFAULT_PURPOSE_TO_DESCRIPTION_KEY: Record<
  string,
  DefinedMessage
> = {
  Essential: purposeMessages['Essential.description'],
  Functional: purposeMessages['Functional.description'],
  Analytics: purposeMessages['Analytics.description'],
  Advertising: purposeMessages['Advertising.description'],
  SaleOfInfo: purposeMessages['SaleOfInfo.description'],
}

export const DEFAULT_PURPOSE_TO_INVERTED_MESSAGE_KEY: Record<
  string,
  DefinedMessage
> = {
  Essential: purposeMessages['Essential.title'],
  Functional: completeOptionsInvertedMessages.functionalLabel,
  Analytics: completeOptionsInvertedMessages.analyticsLabel,
  Advertising: completeOptionsInvertedMessages.advertisingLabel,
  SaleOfInfo: completeOptionsInvertedMessages.saleOfInfoLabel,
};

// Encode the default purpose ordering
export const ORDER_OF_PURPOSES = Object.keys(DEFAULT_PURPOSE_TO_MESSAGE_KEY);
