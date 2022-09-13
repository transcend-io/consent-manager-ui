import { h, JSX } from 'preact';
import { Config } from './Config';
/**
 * The playground entrypoint
 */
export default function Main(): JSX.Element {
  return (
    <div>
      <h1>Consent Manager UI Playground</h1>
      <Config />
    </div>
  );
}
