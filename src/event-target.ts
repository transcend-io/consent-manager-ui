/**
 * Extend EventTarget to include the Transcend toStringTag
 */
export class TranscendEventTarget extends EventTarget {
  #stringTag = 'Transcend';

  /**
   * Add Transcend to the string tag
   *
   * @returns string
   */
  get [Symbol.toStringTag](): string {
    return this.#stringTag;
  }

  /**
   * Allow airgap.js code to overwrite [Symbol.toStringTag]
   */
  set [Symbol.toStringTag](updatedStringTag: string) {
    this.#stringTag = updatedStringTag;
  }

  /**
   * @param args - EventTarget constructor parameters
   */
  constructor(...args: ConstructorParameters<typeof EventTarget>) {
    super(...args);
  }
}
