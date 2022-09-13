import { h, JSX } from 'preact';

/**
 * Browser environment
 */
export function Environment(): JSX.Element {
  return (
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
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
        <input type="checkbox" id="DNT" name="DNT" checked />
        <label for="DNT">DNT</label>
      </div>
    </form>
  );
}
