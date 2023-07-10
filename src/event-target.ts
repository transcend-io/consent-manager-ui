/**
 * Extend EventTarget to include the Transcend toStringTag
 */
export class TranscendEventTarget extends EventTarget {
  #stringTag: string = 'Transcend';

  get [Symbol.toStringTag]() {
    console.log(this.#stringTag);
    return this.#stringTag;
  }

  // Allow airgap.js code to overwrite [Symbol.toStringTag]
  set [Symbol.toStringTag](updatedStringTag: string) {
    this.#stringTag = updatedStringTag;
  }

  constructor(...args: ConstructorParameters<typeof EventTarget>) {
    super(...args);
  }
}
