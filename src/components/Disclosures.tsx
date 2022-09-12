import { h, JSX } from 'preact';
import type { DisclosureMap } from '../types';

/**
 * Any required disclosures
 */
export function Disclosures({
  disclosureMap,
  requiredDisclosuresHeader,
}: {
  /** A mapping between purposes and their disclosures (if they have showInConsentManager=true) */
  disclosureMap: DisclosureMap;
  /** The heading title */
  requiredDisclosuresHeader: string;
}): JSX.Element {
  return (
    <div>
      <p>{requiredDisclosuresHeader}</p>
      <ul>
        {Object.entries(disclosureMap).map(
          ([purpose, { name, description }]) => (
            <li key={purpose}>
              {name} - {description}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
