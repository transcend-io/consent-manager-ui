// ==UserScript==
// @name         airgap.js GDPR regime
// @namespace    https://transcend.io/consent-manager
// @version      1.0.1
// @description  Spoofs airgap.js GDPR regime detection
// @author       Transcend Inc.
// @icon64       https://app.transcend.io/favicon.png
// @match        *://*/*
// @grant        none
// @run-at       document-start
// @charset      UTF-8
// ==/UserScript==

// Spoof EU locale for GDPR hasLanguage() check
Object.defineProperty(Navigator.prototype, 'languages', {
  get: () => ['xx-BE'], // Unknown (Belgium)
  configurable: false,
  enumerable: true,
});

// Spoof unknown timezone for inCATimeZone() check
Intl.DateTimeFormat.prototype.resolvedOptions = () => ({
  timeZone: 'Unknown/Unknown',
});
