// ==UserScript==
// @name         airgap.js unknown regime
// @namespace    https://transcend.io/consent-manager
// @version      1.0.0
// @description  Spoofs airgap.js regime detection
// @author       Transcend Inc.
// @icon64       https://app.transcend.io/favicon.png
// @match        *://*/*
// @grant        none
// @run-at       document-start
// @charset      UTF-8
// ==/UserScript==

// Spoof unknown timezone for timezone checks
Intl.DateTimeFormat.prototype.resolvedOptions = () => ({
  timeZone: 'Unknown/Unknown',
});

// Spoof unknown locale for hasLanguage() check
Object.defineProperty(Navigator.prototype, 'languages', {
  get: () => ['xx-XX'], // Unknown
  configurable: false,
  enumerable: true,
});
