interface LinkProps {
  /** Specifies where to open the linked document */
  target?: string;
  /** Specifies the relationship between the current document and the linked document */
  rel?: string;
}

/**
 * Get link props based on load options
 *
 * @param isMobile - whether the environment is mobile
 * @returns link props
 */
export function getLinkProps(isMobile: string): LinkProps {
  return isMobile === 'on'
    ? {}
    : {
        target: '_blank',
        rel: 'noopener noreferrer',
      };
}
