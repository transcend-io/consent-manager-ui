import { h, JSX } from 'preact';
import { getConsentLog } from './helpers/consentLog';

/**
 * Consent Log component
 */
export function ConsentLog(): JSX.Element {
  const consentLog = getConsentLog();

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
