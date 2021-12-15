// These SKIP rules are needed to prevent our reference to airgap.js.d.ts from being removed
/* SKIP ordered-imports */
/* eslint-disable @typescript-eslint/triple-slash-reference */
// external
/// <reference path="./@types/airgap.js.d.ts" />

// local
import { init } from './init';

init();

/* eslint-enable @typescript-eslint/triple-slash-reference */
