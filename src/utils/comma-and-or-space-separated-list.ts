/**
 * RegExp for splitting strings that represent command and/or space-separated lists of tokens.
 *
 * Empty/whitespace-only entries are ignored.
 */
export const COMMA_AND_OR_SPACE_SEPARATED_LIST = /(?:\s*(?:,\s*)+|\s+)/;
