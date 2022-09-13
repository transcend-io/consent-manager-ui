import Editor, { useMonaco } from '@monaco-editor/react';
import type { Uri } from 'monaco-editor';
import { Fragment, h, JSX } from 'preact';
import { TrackingPurposesTypes } from '@transcend-io/airgap.js-types';
import { useState, useEffect } from 'preact/hooks';

const defaultTrackingPurposes: TrackingPurposesTypes = {
  Advertising: {
    defaultConsent: 'Auto',
    configurable: true,
    essential: false,
    name: 'Advertising',
    description: 'Helps us and others serve ads relevant to you.',
    showInConsentManager: true,
    trackingType: 'Advertising',
  },
  Functional: {
    defaultConsent: 'Auto',
    configurable: true,
    essential: false,
    name: 'Functional',
    description: 'Personalization, autofilled forms, etc.',
    showInConsentManager: true,
    trackingType: 'Functional',
  },
  SaleOfInfo: {
    defaultConsent: 'Auto',
    configurable: true,
    essential: false,
    name: 'SaleOfInfo',
    description: 'Sale of personal information.',
    showInConsentManager: true,
    trackingType: 'SaleOfInfo',
  },
  Analytics: {
    defaultConsent: 'Auto',
    configurable: true,
    essential: false,
    name: 'Analytics',
    description: 'Help us learn how our site is used and how it performs.',
    showInConsentManager: true,
    trackingType: 'Analytics',
  },
  Essential: {
    name: 'Essential',
    description: '',
    defaultConsent: true,
    configurable: false,
    essential: true,
    showInConsentManager: false,
  },
  Unknown: {
    name: 'Unknown',
    description: '',
    defaultConsent: false,
    configurable: false,
    essential: false,
    showInConsentManager: false,
  },
};

/**
 * JSON Schema representation of `TrackingPurposesTypes`
 */
const trackingPurposesSchema = {
  type: 'object',
  patternProperties: {
    '^.*$': {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        defaultConsent: {
          enum: [
            true,
            false,
            'Auto',
            'AutoGDPR',
            'AutoDNT',
            'AutoGPC',
            'on',
            'off',
          ],
        },
        showInConsentManager: {
          type: 'boolean',
        },
        configurable: {
          type: 'boolean',
        },
        essential: {
          type: 'boolean',
        },
      },
      required: [
        'defaultConsent',
        'configurable',
        'essential',
        'name',
        'description',
        'showInConsentManager',
      ],
    },
  },
};

/**
 * The playground entrypoint
 */
export function ConfigTrackingPurposes(): JSX.Element {
  const monaco = useMonaco();
  const [modelUri, setModelUri] = useState<Uri | undefined>(undefined);

  useEffect(() => {
    if (monaco) {
      const modelUri = monaco.Uri.parse('a://b/foo.json'); // a made up unique URI for our model
      setModelUri(modelUri);

      // configure the JSON language support with schemas and schema associations
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [
          {
            uri: 'http://myserver/foo-schema.json', // id of the first schema
            fileMatch: [modelUri.toString()], // associate with our model
            schema: trackingPurposesSchema,
          },
        ],
      });
    }
  }, [monaco]);

  return (
    <Fragment>
      <Editor
        height="500px"
        defaultLanguage="json"
        path={modelUri?.toString()}
        defaultValue={JSON.stringify(defaultTrackingPurposes, null, 2)}
      />
    </Fragment>
  );
}
