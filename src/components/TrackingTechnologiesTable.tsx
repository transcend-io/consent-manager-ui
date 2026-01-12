import { h, JSX } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { useIntl } from 'react-intl';
import { useAirgap } from '../hooks';
import { trackingTechnologiesMessages } from '../messages';
import {
  EMBEDDED_TRACKING_TECHNOLOGIES_MODE,
  EmbeddedTrackingTechnologiesMode,
} from '../settings';

/** Service metadata from airgap.getMetadata() */
interface ServiceMetadata {
  /** Service title */
  title?: string;
  /** Sites this service is used on */
  sites?: string[];
  /** Logo URL */
  logoSquare?: string;
  /** Cookies used by this service */
  cookies?: Array<{
    /** Cookie name */
    name: string;
    /** Tracking purposes */
    trackingPurposes?: string[];
    /** Max age in seconds */
    maxAge?: number | null;
  }>;
  /** Data flows for this service */
  dataFlows?: Array<{
    /** Value (URL/path) */
    value: string;
    /** Type (HOST, PATH, etc) */
    type: string;
    /** Tracking purposes */
    trackingPurposes?: string[];
  }>;
}

/** Relevant service with filtered flows and cookies */
interface RelevantService {
  /** The service metadata */
  service: ServiceMetadata;
  /** Data flows filtered to the current purpose */
  flows: NonNullable<ServiceMetadata['dataFlows']>;
  /** Cookies filtered to the current purpose */
  cookies: NonNullable<ServiceMetadata['cookies']>;
}

/** Metadata response from airgap.getMetadata() */
interface MetadataResponse {
  /** Services in the metadata */
  services?: ServiceMetadata[];
}

/**
 * Escape HTML entities
 *
 * @param s - String to escape
 * @returns Escaped string
 */
const escapeHtml = (s: string | undefined | null): string =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Convert maxAge seconds to human-readable duration
 *
 * @param maxAge - Max age in seconds
 * @returns Human-readable duration string
 */
const humanMaxAge = (maxAge: number | null | undefined): string => {
  if (maxAge === null || maxAge === undefined) return '';
  const n = Number(maxAge);
  if (!Number.isFinite(n)) return String(maxAge);
  if (n <= 0) return 'session';
  const d = Math.round(n / 86400);
  if (d >= 2) return `${d} days`;
  const h = Math.round(n / 3600);
  if (h >= 1) return `${h} hours`;
  const m = Math.round(n / 60);
  return m >= 1 ? `${m} minutes` : `${n} seconds`;
};

/**
 * Single purpose dropdown with services table
 */
function PurposeDropdown({
  purpose,
  services,
}: {
  /** Purpose name */
  purpose: string;
  /** Filtered services for this purpose */
  services: ServiceMetadata[];
}): JSX.Element | null {
  const { formatMessage } = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  const relevantServices = useMemo(
    () =>
      services.reduce<RelevantService[]>((result, svc) => {
        const flows = (svc.dataFlows || []).filter((d) =>
          (d.trackingPurposes || []).includes(purpose),
        );
        const cookies = (svc.cookies || []).filter((c) =>
          (c.trackingPurposes || []).includes(purpose),
        );
        if (flows.length > 0 || cookies.length > 0) {
          result.push({ service: svc, flows, cookies });
        }
        return result;
      }, []),
    [purpose, services],
  );

  if (relevantServices.length === 0) return null;

  const svcCount = relevantServices.length;
  const flowCount = relevantServices.reduce(
    (acc, s) => acc + s.flows.length,
    0,
  );
  const cookieCount = relevantServices.reduce(
    (acc, s) => acc + s.cookies.length,
    0,
  );

  /** @param e - Event */
  const handleToggle = (e: Event): void => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  /** @param e - Keyboard event */
  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="tracking-tech-card">
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="tracking-tech-summary"
      >
        <span
          className="tracking-tech-chevron"
          style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
        >
          ▸
        </span>
        <span>{formatMessage(trackingTechnologiesMessages.viewButton)}</span>
        <span className="tracking-tech-meta">
          {svcCount} services · {flowCount} data flows · {cookieCount} cookies
        </span>
      </div>
      {isOpen && (
        <div className="tracking-tech-scroll">
          <table
            role="table"
            className="tracking-tech-table"
            aria-label={`${escapeHtml(purpose)} tracking`}
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  className="tracking-tech-th"
                  style={{ width: '40%' }}
                >
                  Service
                </th>
                <th
                  scope="col"
                  className="tracking-tech-th"
                  style={{ width: '60%' }}
                >
                  Tracking
                </th>
              </tr>
            </thead>
            <tbody>
              {relevantServices.map(({ service, flows, cookies }, idx) => (
                <tr
                  key={service.title || idx}
                  className={idx % 2 === 1 ? 'tracking-tech-row-alt' : ''}
                >
                  <td className="tracking-tech-td">
                    <div className="tracking-tech-stack">
                      {service.logoSquare ? (
                        <span className="tracking-tech-service-name">
                          <img
                            className="tracking-tech-logo"
                            src={service.logoSquare}
                            alt=""
                          />
                          {escapeHtml(service.title)}
                        </span>
                      ) : (
                        <strong>{escapeHtml(service.title)}</strong>
                      )}
                    </div>
                  </td>
                  <td className="tracking-tech-td">
                    <div className="tracking-tech-row-stack">
                      {flows.length > 0 ? (
                        flows.map((f, i) => (
                          <div key={i} className="tracking-tech-kv">
                            <span className="tracking-tech-chip">
                              {escapeHtml(f.type)}
                            </span>
                            <span className="tracking-tech-mono">
                              {escapeHtml(f.value)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <span className="tracking-tech-empty">
                          No data flows
                        </span>
                      )}
                      {cookies.length > 0 ? (
                        cookies.map((c, i) => {
                          const age = humanMaxAge(c.maxAge);
                          return (
                            <div key={i} className="tracking-tech-kv">
                              <span className="tracking-tech-chip">Cookie</span>
                              <span className="tracking-tech-mono">
                                {escapeHtml(c.name)}
                              </span>
                              {age && (
                                <span className="tracking-tech-empty">
                                  ({escapeHtml(age)})
                                </span>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <span className="tracking-tech-empty">No cookies</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/**
 * Tracking technologies table component that displays services grouped by purpose
 */
export function TrackingTechnologiesTable({
  purpose,
  mode = EMBEDDED_TRACKING_TECHNOLOGIES_MODE,
}: {
  /** The purpose to show tracking technologies for */
  purpose: string;
  /** Mode: 'site-only' filters by current site, 'all' shows all */
  mode?: EmbeddedTrackingTechnologiesMode;
}): JSX.Element | null {
  const { airgap } = useAirgap();
  const [services, setServices] = useState<ServiceMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mode) {
      setLoading(false);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const airgapAny = airgap as any;
    if (typeof airgapAny.getMetadata !== 'function') {
      setLoading(false);
      return;
    }
    /**
     * Handle metadata response
     *
     * @param metadata - Metadata from airgap
     */
    const handleMetadata = (metadata: MetadataResponse): void => {
      let filteredServices = metadata.services || [];
      if (mode === 'site-only') {
        const currentHost = window.location.hostname;
        filteredServices = filteredServices.filter(
          (service) =>
            !service.sites?.length || service.sites.includes(currentHost),
        );
      }
      setServices(filteredServices);
      setLoading(false);
    };
    /**
     * Handle error
     *
     * @param err - Error object
     */
    const handleError = (err: Error): void => {
      setError(err.message);
      setLoading(false);
    };
    airgapAny.getMetadata().then(handleMetadata).catch(handleError);
  }, [airgap, mode]);

  if (!mode || loading || error) return null;

  const hasServicesForPurpose = services.some((svc) => {
    const flows = (svc.dataFlows || []).filter((d) =>
      (d.trackingPurposes || []).includes(purpose),
    );
    const cookies = (svc.cookies || []).filter((c) =>
      (c.trackingPurposes || []).includes(purpose),
    );
    return flows.length > 0 || cookies.length > 0;
  });

  if (!hasServicesForPurpose) return null;

  return <PurposeDropdown purpose={purpose} services={services} />;
}
