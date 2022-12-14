const LOCAL_STORAGE_KEY = 'consent-log';
export const CONSENT_LOG_EVENT_TYPE = 'consent-log-changed';
export const CONSENT_LOG_MAX_LENGTH = 6;

/**
 * Appended list of set consent calls
 *
 * @returns a list of consent call strings
 */
export function getConsentLog(): string[] {
  const consentLog = localStorage.getItem(LOCAL_STORAGE_KEY) || '[]';
  return JSON.parse(consentLog);
}

/**
 * Append a consent call to the consent log
 *
 * @param logItem - the log item to add
 */
export function appendConsentLog(logItem: string): void {
  let consentLog = getConsentLog();
  // Append to consent log
  consentLog.push(logItem);
  if (consentLog.length > CONSENT_LOG_MAX_LENGTH) {
    // Drop earlier elements
    consentLog = consentLog.slice(consentLog.length - CONSENT_LOG_MAX_LENGTH);
  }
  // Set in local storage
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(consentLog));
  // Dispatch update event
  const event = new Event(CONSENT_LOG_EVENT_TYPE);
  window.dispatchEvent(event);
}
