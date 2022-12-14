import { h, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { CONSENT_LOG_EVENT_TYPE, getConsentLog } from './helpers/consentLog';

/**
 * Consent Log component
 */
export function ConsentLog(): JSX.Element {
  const [consentLog, setConsentLog] = useState<string[]>(getConsentLog());

  // Keep consent log up to date
  useEffect(() => {
    /**
     * Update the consent log from local storage
     */
    function updateConsentLog(): void {
      setConsentLog(getConsentLog());
    }
    window.addEventListener(CONSENT_LOG_EVENT_TYPE, updateConsentLog);
    return () => {
      window.removeEventListener(CONSENT_LOG_EVENT_TYPE, updateConsentLog);
    };
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      <p style={{ fontWeight: '600', fontSize: '12px', margin: '0 0 3px 0' }}>
        Consent change events
      </p>
      {consentLog.reverse().map((logItem) => (
        <code key={logItem}>
          <pre>{logItem}</pre>
        </code>
      ))}
    </div>
  );
}
