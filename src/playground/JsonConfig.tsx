import { Fragment, h, JSX } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import Editor, { useMonaco, OnMount } from '@monaco-editor/react';
import type monaco from 'monaco-editor';
import { toJsonSchema } from './helpers/ioTsToJsonSchema';

interface JsonConfigProps<T> {
  /** The unique key to store the saved value under */
  localStorageKey: string;
  /** The initial, default value (this is also what its set to when the reset button is hit) */
  defaultValue: T;
  /** The io-ts type to edit, e.g., `TrackingPurposesTypes` */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ioTsType: any;
}

/**
 * JSON editor with JSON schema type checking
 */
export function JsonConfig<T>({
  localStorageKey,
  defaultValue,
  ioTsType,
}: JsonConfigProps<T>): JSX.Element {
  const monaco = useMonaco();
  const [modelUri, setModelUri] = useState<monaco.Uri | undefined>(undefined);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (monaco) {
      const modelUri = monaco.Uri.parse('a://b/foo.json'); // a made up unique URI for our model
      setModelUri(modelUri);

      // configure the JSON language support with schemas and schema associations
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [
          {
            uri: localStorageKey, // id of the first schema
            fileMatch: [modelUri.toString()], // associate with our model
            schema: toJsonSchema(ioTsType),
          },
        ],
      });
    }
  }, [monaco, localStorageKey, ioTsType]);

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
      trackingPurposes = JSON.stringify(defaultValue, null, 2);
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
    editorRef.current.setValue(JSON.stringify(defaultValue, null, 2));
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
