import { airgapStub } from './airgapStub';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-restricted-globals
self.airgap = Object.assign(airgapStub, self.airgap);
