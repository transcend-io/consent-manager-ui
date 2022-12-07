import { h, JSX } from 'preact';
import {
  TrackingPurposesTypes,
  ConsentManagerConfig,
} from '@transcend-io/airgap.js-types';

import { JsonConfigModal } from './JsonConfig';
import { defaultConfig, defaultTrackingPurposes } from './defaults';
import { Environment } from './Environment';

/**
 * The playground entrypoint
 */
export function Config(): JSX.Element {
  return (
    <div
      style={{
        borderBottom: '1px solid gray',
        padding: '10px',
        display: 'flex',
      }}
    >
      <div>
        <p style={{ fontWeight: '600', fontSize: '12px', margin: '0 0 3px 0' }}>
          Config
        </p>
        <JsonConfigModal
          name="loadOptions"
          localStorageKey="loadOptionsEditor"
          defaultValue={defaultConfig}
          ioTsType={ConsentManagerConfig}
          onSave={(value, userInitiated) => {
            if (!userInitiated) return;
            // Set load options in local storage (which are loaded in index.ts)
            localStorage.setItem('loadOptions', value);
            // Reload config
            window.location.reload();
          }}
        />
        <JsonConfigModal
          name="airgap.getPurposeTypes()"
          localStorageKey="getPurposeTypes"
          defaultValue={defaultTrackingPurposes}
          ioTsType={TrackingPurposesTypes}
        />
      </div>
      <div style={{ padding: '0 20px' }}>
        <p style={{ fontWeight: '600', fontSize: '12px', margin: '0 0 3px 0' }}>
          Environment
        </p>
        <Environment />
      </div>
    </div>
  );
}
