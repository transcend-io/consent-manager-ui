import { h, JSX } from 'preact';
import {
  TrackingPurposesTypes,
  UserPrivacySignal,
  ConsentManagerConfig,
} from '@transcend-io/airgap.js-types';

import { JsonConfigModal } from './JsonConfig';
import {
  defaultConfig,
  defaultTrackingPurposes,
  defaultUserPrivacySignal,
} from './defaults';

/**
 * The playground entrypoint
 */
export function Config(): JSX.Element {
  return (
    <div
      style={{
        width: '100%',
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
          localStorageKey="getConfig"
          defaultValue={defaultConfig}
          ioTsType={ConsentManagerConfig}
        />
        <JsonConfigModal
          localStorageKey="getPurposeTypes"
          defaultValue={defaultTrackingPurposes}
          ioTsType={TrackingPurposesTypes}
        />
      </div>
      <div style={{ padding: '0 20px' }}>
        <p style={{ fontWeight: '600', fontSize: '12px', margin: '0 0 3px 0' }}>
          Environment
        </p>

        <form
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              id="GPC"
              name="GPC"
              checked
              style={{ marginLeft: 0 }}
            />
            <label for="GPC">GPC</label>
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}
          >
            <input type="checkbox" id="DNT" name="DNT" checked />
            <label for="DNT">DNT</label>
          </div>
        </form>

        {/* <JsonConfigModal
          localStorageKey="getPrivacySignals"
          defaultValue={defaultUserPrivacySignal}
          ioTsType={UserPrivacySignal}
        /> */}
      </div>
    </div>
  );
}
