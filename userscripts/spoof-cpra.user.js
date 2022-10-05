// ==UserScript==
// @name         airgap.js CPRA regime
// @namespace    https://transcend.io/consent-manager
// @version      1.0.1
// @description  Spoofs airgap.js CPRA regime detection
// @author       Transcend Inc.
// @icon64       https://app.transcend.io/favicon.png
// @match        *://*/*
// @grant        none
// @run-at       document-start
// @charset      UTF-8
// ==/UserScript==

// Spoof California timezone for inCATimeZone() check
Intl.DateTimeFormat.prototype.resolvedOptions = () => ({
  timeZone: 'America/Los_Angeles',
});

// Spoof unknown locale for GDPR hasLanguage() check
Object.defineProperty(Navigator.prototype, 'languages', {
  get: () => ['xx-XX'], // Unknown (Belgium)
  configurable: false,
  enumerable: true,
});
