// external
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h, JSX } from 'preact';

// global
import type { DisclosureMap } from '../types';

// eslint-disable-next-line jsdoc/require-returns, jsdoc/require-param
/**
 * Any required disclosures
 */
export default function Disclosures({
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
