import Editor, { useMonaco } from '@monaco-editor/react';
import type { Uri } from 'monaco-editor';
import { Fragment, h, JSX } from 'preact';
import { TrackingPurposesTypes } from '@transcend-io/airgap.js-types';
import { useState, useEffect } from 'preact/hooks';
import { toJsonSchema } from './ioTsToJSONSchema';
import { defaultTrackingPurposes } from './defaults';

/**
 * JSON editor with JSON schema type checking
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
            schema: toJsonSchema(TrackingPurposesTypes),
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
