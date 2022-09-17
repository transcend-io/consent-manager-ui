import { ComponentChild, h, JSX } from 'preact';
import type { ViewState } from '@transcend-io/airgap.js-types';

/**
 * Styling for the banner/modal container
 */
export function Modal({
  children,
}: {
  /** The current view state */
  viewState: ViewState;
  /** Inner HTML of modal */
  children: ComponentChild;
}): JSX.Element {
  return (
    <div role="dialog" className="modal-container">
      <div role="document" className="modal-container-inner">
        {children}
      </div>
    </div>
  );
}
