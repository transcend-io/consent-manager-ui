export const createHTMLElement = <TElt extends HTMLElement>(
  tagName: string,
): TElt =>
  document.createElementNS('http://www.w3.org/1999/xhtml', tagName) as TElt;
