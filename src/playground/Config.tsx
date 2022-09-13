import { Fragment, h, JSX } from 'preact';
import {
  TrackingPurposesTypes,
  PrivacyRegimeEnum,
} from '@transcend-io/airgap.js-types';
import { useState } from 'preact/hooks';
import { isRight } from 'fp-ts/Either';

import { JsonConfig } from './JsonConfig';
import { defaultTrackingPurposes } from './defaults';
/**
 * The playground entrypoint
 */
export function Config(): JSX.Element {
  const [inputs, setInputs] = useState({
    age: '',
  });

  const handleChange: JSX.GenericEventHandler<HTMLInputElement> = (event) => {
    const { name } = event.currentTarget;
    const { value } = event.currentTarget;

    if (name === 'trackingPurposes') {
      const newTrackingPurposes = JSON.parse(value);
      isRight(TrackingPurposesTypes.decode(newTrackingPurposes));
    }
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    alert(JSON.stringify(inputs));
  };

  return (
    <Fragment>
      <JsonConfig
        localStorageKey="getPurposeTypes"
        defaultValue={defaultTrackingPurposes}
        ioTsType={TrackingPurposesTypes}
      />
      <form onSubmit={handleSubmit} id="config-form">
        <label for="age">Age:</label>
        <input
          name="age"
          type="text"
          value={inputs.age}
          onChange={handleChange}
        />

        <label for="regime">Regime:</label>
        <select name="regimes" id="regime">
          {Object.keys(PrivacyRegimeEnum).map((regime) => (
            <option key={regime} value={regime}>
              {regime}
            </option>
          ))}
        </select>

        <input type="submit" />
      </form>
    </Fragment>
  );
}
