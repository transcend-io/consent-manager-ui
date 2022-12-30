import type { UserPrivacySignal } from '@transcend-io/airgap.js-types';

export const PRIVACY_SIGNAL_NAME = new Map<UserPrivacySignal, string>([
  ['DNT', 'Do-Not-Track'],
  ['GPC', 'Global Privacy Control'],
]);
