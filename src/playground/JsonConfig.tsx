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
  /** Optional callback on save */
  onSave?: (value: string, userInitiated: boolean) => void;
}

/**
 * JSON editor with JSON schema type checking
 */
function JsonConfig<T>({
  localStorageKey,
  defaultValue,
  ioTsType,
  onSave,
}: JsonConfigProps<T>): JSX.Element {
  const monaco = useMonaco();
  const [modelUri, setModelUri] = useState<monaco.Uri | undefined>(undefined);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (monaco) {
      const modelUri = monaco.Uri.parse(`a://b/${localStorageKey}.json`); // a made up unique URI for our model
      setModelUri(modelUri);

      // Get JSON Schema from io-ts types
      const jsonSchema = toJsonSchema(ioTsType);

      // configure the JSON language support with schemas and schema associations
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [
          {
            uri: localStorageKey, // id of the first schema
            fileMatch: [modelUri.toString()], // associate with our model
            schema: jsonSchema,
          },
        ],
      });

      monaco.editor.setTheme('vs-light');
    }
  }, [monaco, localStorageKey, ioTsType]);

  /**
   * Set the ref
   */
  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    save(false);
  };

  /**
   * Get initial value from local storage, or if unset, the default
   */
  function getInitialValue(): string {
    let initialValue = localStorage.getItem(localStorageKey);
    if (!initialValue) {
      initialValue = JSON.stringify(defaultValue, null, 2);
    }
    return initialValue;
  }

  /**
   * Show the editor's text value
   */
  function save(userInitiated: boolean): void {
    if (!editorRef.current) {
      throw new Error('Editor has not mounted');
    }
    const value = editorRef.current.getValue();
    localStorage.setItem(localStorageKey, value);
    // Fire callback (if there is one)
    if (onSave) {
      onSave(value, userInitiated);
    }
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
        defaultLanguage="json"
        path={modelUri?.toString()}
        defaultValue={getInitialValue()}
        onMount={handleEditorDidMount}
      />
      <button class="button" onClick={() => save(true)}>
        Save
      </button>
      <button class="button" onClick={reset}>
        Reset
      </button>
    </Fragment>
  );
}

/**
 * The modal editor
 */
export function JsonConfigModal<T>(props: JsonConfigProps<T>): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <button class="button" onClick={() => setIsOpen(true)}>
        Edit {props.localStorageKey}
      </button>
      <div
        style={{
          display: isOpen ? 'initial' : 'none',
          position: 'fixed',
          height: '90vh',
          width: '90vw',
          top: '5vh',
          left: '5vw',
          zIndex: 1,
          background: '#fff',
          borderRadius: '18px',
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px) saturate(5)',
        }}
      >
        <div
          style={{
            height: '100%',
            padding: '30px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <h3>Editing {props.localStorageKey}</h3>
          <JsonConfig {...props} />
          <button class="button" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      </div>
      <div
        style={{
          display: isOpen ? 'initial' : 'none',
          position: 'fixed',
          height: '100%',
          width: '100%',
          top: '0',
          left: '0',
          opacity: '0.8',
          backdropFilter: 'blur(20px) saturate(5)',
          zIndex: 0,
          background: '#fff',
        }}
      />
    </Fragment>
  );
}
