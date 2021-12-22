import type {
  AirgapAPI,
  TrackingConsent,
  TranscendAPI,
} from '@transcend-io/airgap.js-types';

declare global {
  /**
   * Mapping from event listeners to their underlying types
   */
  interface WindowEventMap {
    // Example:
    // /** Emit when the airgap.js API is ready to by used */
    // 'airgap-ready': CustomEvent<AirgapAPI>;
  }
  /** Declare global properties */
  interface Window {
    /** setConsentWithoutAuth utility injected for tests */
    setConsentWithoutAuth: (consent: TrackingConsent) => boolean;
    /** resetWithoutAuth utility injected for tests */
    resetWithoutAuth: (autoReload?: boolean) => boolean;
    /**
     * `requestIdleCallback()`
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
     */
    requestIdleCallback: (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions,
    ) => number;
    /**
     * `cancelIdleCallback()`
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback
     */
    cancelIdleCallback: (callbackId: number) => void;
    /** analytics.js interface */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    analytics?: any;
    /** airgap.js interface */
    airgap?: AirgapAPI;
    /** Transcend Consent Manager interface */
    transcend?: TranscendAPI;
    /** authorizedFetch debug utility */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorizedFetch?: any;
    /** authorizeMutation debug utility */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorizeMutation?: any;
    /** SubmitEvent */
    SubmitEvent: typeof Event;
    /** Fix incorrect URLSearchParams constructor param types */
    URLSearchParams: {
      /** URLSearchParams prototype */
      prototype: URLSearchParams;
      /** `new URLSearchParams(FormData)` is valid */
      new (
        init?:
          | string[][]
          | Record<string, string>
          | string
          | URLSearchParams
          | FormData,
      ): URLSearchParams;
      /** Serialize params to string */
      toString(): string;
    };

    /** WebTransport */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    WebTransport?: any;

    // TODO: https://github.com/transcend-io/main/issues/9311
    // The following unfortunately doesn't fix TypeScript's broken timer util types:

    // /** setTimeout */
    // setTimeout(
    //   handler: TimerHandler,
    //   timeout?: number | undefined,
    //   ...arguments: any[]
    // ): number;
    // /** clearTimeout */
    // clearTimeout(handle?: number | undefined): void;
    // /** setInterval */
    // setInterval(
    //   handler: TimerHandler,
    //   timeout?: number | undefined,
    //   ...arguments: any[]
    // ): number;
    // /** clearInterval */
    // clearInterval(handle?: number | undefined): void;
  }

  /** Fix TS built-in type */
  interface PerformanceEntry {
    /** PerformanceEntry type */
    type: string;
  }
}
