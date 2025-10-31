/**
 * Helper function to detect if the app is running in a WebView.
 *
 * @returns boolean - true if running in a WebView, false otherwise.
 */
export function isWebView(): boolean {
  const userAgent = navigator.userAgent || navigator.vendor;

  // Generic WebView detection (Android + iOS)
  const isAndroidWebView = /\bwv\b/.test(userAgent);
  const isIOSWebView = /iPhone|iPod|iPad/i.test(userAgent) && !/Safari/i.test(userAgent);

  // Some in-app browsers
  const inAppIndicators = ['FBAN', 'FBAV', 'Instagram', 'Line', 'LinkedInApp', 'Twitter', 'Pinterest'];

  return (
    isAndroidWebView ||
    isIOSWebView ||
    inAppIndicators.some((ind) => userAgent.includes(ind))
  );
}
