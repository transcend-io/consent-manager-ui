import { MOCK_PURPOSES } from './constants';

export type MockPurposeKeys = keyof typeof MOCK_PURPOSES;
export type MockPurposeValues = typeof MOCK_PURPOSES[MockPurposeKeys];
export type MockPurposeNames = MockPurposeValues['name']
