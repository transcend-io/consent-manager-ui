const LOCAL_STORAGE_KEY = 'consent-log';

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
  const consentLog = getConsentLog();
  consentLog.push(logItem);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(consentLog));
}
