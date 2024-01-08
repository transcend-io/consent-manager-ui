/* eslint-disable max-classes-per-file */

export const { userAgent } = navigator as {
  /** user agent information */
  userAgent: string
};
export const IS_EDGEHTML = userAgent.includes('Edge/');
export const SAFARI_VERSION =
  userAgent.includes('Safari/') &&
  !userAgent.includes('Chrome/') &&
  userAgent.match(/Version\/(\d+)/)?.[1];

export const brand = <T>(object: T, brand: string): T =>
  Object.defineProperty(object, Symbol.toStringTag, {
    value: brand,
    enumerable: true,
    configurable: false,
    writable: false,
  });

const STRING_TAG = 'Transcend';

/**
 * EventTarget shim
 */
export const EventTargetShim = Object.freeze(
  IS_EDGEHTML || (SAFARI_VERSION && +SAFARI_VERSION < 14)
    ? /**
       * EventTarget shim for EdgeHTML and Safari <14
       *
       * Note that this shim performs worse than a full polyfill,
       * but it results in a much smaller build size and maintains
       * native compatibility with EventTarget.prototype.
       */
    class {
      /**
       * EventTarget constructor shim
       */
      constructor() {
        // This is one of the lightest real-EventTarget-inheriting
        // structures instantiable in EdgeHTML and Safari <14.
        // const target = call(nativeCreateDocument, domImplementation, '', '');
        const target = document.implementation.createDocument('', '');
        // eslint-disable-next-line no-constructor-return
        return brand(target, STRING_TAG);
      }
    }
    : /**
       * airgap.js-branded native EventTarget subclass
       */
    class extends EventTarget {
      /**
       * Branding applicator constructor
       *
       * @param args - EventTarget constructor arguments
       */
      constructor(...args: ConstructorParameters<typeof EventTarget>) {
        super(...args);
        brand(this, STRING_TAG);
      }
    },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any as typeof EventTarget;
/* eslint-enable max-classes-per-file */
