import Editor, { useMonaco, OnMount } from '@monaco-editor/react';
import type monaco from 'monaco-editor';
import { Fragment, h, JSX } from 'preact';
import { TrackingPurposesTypes } from '@transcend-io/airgap.js-types';
import { useState, useEffect, useRef } from 'preact/hooks';
import { toJsonSchema } from './ioTsToJSONSchema';
import { defaultTrackingPurposes } from './defaults';

/**
 * JSON editor with JSON schema type checking
 */
export function ConfigTrackingPurposes(): JSX.Element {
  const monaco = useMonaco();
  const [modelUri, setModelUri] = useState<monaco.Uri | undefined>(undefined);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const localStorageKey = 'getPurposeTypes';

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

  /**
   * Set the ref
   */
  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    save();
  };

  /**
   * Get initial value from local storage, or if unset, the default
   */
  function getInitialValue(): string {
    let trackingPurposes = localStorage.getItem(localStorageKey);
    if (!trackingPurposes) {
      trackingPurposes = JSON.stringify(defaultTrackingPurposes, null, 2);
    }
    return trackingPurposes;
  }

  /**
   * Show the editor's text value
   */
  function save(): void {
    if (!editorRef.current) {
      throw new Error('Editor has not mounted');
    }
    const trackingPurposes = editorRef.current.getValue();
    localStorage.setItem(localStorageKey, trackingPurposes);
  }

  /**
   * Reset to default
   */
  function reset(): void {
    if (!editorRef.current) {
      throw new Error('Editor has not mounted');
    }
    editorRef.current.setValue(
      JSON.stringify(defaultTrackingPurposes, null, 2),
    );
  }

  return (
    <Fragment>
      <Editor
        height="500px"
        defaultLanguage="json"
        path={modelUri?.toString()}
        defaultValue={getInitialValue()}
        onMount={handleEditorDidMount}
      />
      <button onClick={save}>Save</button>
      <button onClick={reset}>Reset</button>
    </Fragment>
  );
}
