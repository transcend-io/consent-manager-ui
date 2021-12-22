// external
import { RefObject } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';

/**
 * The width and height of the element
 */
type Size = {
  /** The width of the DOM node */
  width: number;
  /** The height of the DOM node */
  height: number;
};

/**
 * Hook to get the referenced DOM node's size
 */
export function useElementSize(elementRef: RefObject<HTMLElement>): Size {
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  const updateSize = useCallback(() => {
    const node = elementRef.current;
    if (node) {
      setSize({
        width: node.offsetWidth || 0,
        height: node.offsetHeight || 0,
      });
    }
  }, [elementRef]);

  // Initial size on mount
  useEffect(() => {
    updateSize();
  }, [updateSize]);

  return size;
}
