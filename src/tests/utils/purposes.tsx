import { DEFAULT_PURPOSE_TO_INVERTED_MESSAGE_KEY, DEFAULT_PURPOSE_TO_MESSAGE_KEY } from '../../components/constants';
import { MOCK_PURPOSES_OPTED_IN } from './constants';

/** Mock purpose key */
type MockPurposeKey = keyof typeof MOCK_PURPOSES_OPTED_IN
/** Mock purpose value */
type MockPurpose = (typeof MOCK_PURPOSES_OPTED_IN)[MockPurposeKey]

/** Mock purpose entry tuple */
type PurposeEntry = [
  keyof typeof MOCK_PURPOSES_OPTED_IN,
  (typeof MOCK_PURPOSES_OPTED_IN)[keyof typeof MOCK_PURPOSES_OPTED_IN],
]

// Making this a function bc this is reused a lot
// Deep copy is to prevent accidental mock purpose mutation
export const getPurposeEntries = (): PurposeEntry[] =>
  JSON.parse(JSON.stringify(Object.entries(MOCK_PURPOSES_OPTED_IN))) as PurposeEntry[]

// Making this a function bc this is reused a lot
// Deep copy is to prevent accidental mock purpose mutation
export const getPurposeValues = (): MockPurpose[] =>
  JSON.parse(JSON.stringify(Object.values(MOCK_PURPOSES_OPTED_IN))) as MockPurpose[]

export const getPurposeMessage = (purpose: MockPurpose): string =>
  purpose.name in DEFAULT_PURPOSE_TO_MESSAGE_KEY
    ? DEFAULT_PURPOSE_TO_MESSAGE_KEY[purpose.name].defaultMessage
    : purpose.name;

export const getPurposeMessageInverted = (purpose: MockPurpose): string =>
  purpose.name in DEFAULT_PURPOSE_TO_INVERTED_MESSAGE_KEY
    ? DEFAULT_PURPOSE_TO_INVERTED_MESSAGE_KEY[purpose.name].defaultMessage
    : purpose.name;
