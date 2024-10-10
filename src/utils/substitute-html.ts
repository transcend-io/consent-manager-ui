import { TranslatedMessages } from '@transcend-io/internationalization';

/**
 * Takes in a set of messages which may or may not contain HTML and replaces any
 * HTML tags so that format.js can successfully internationalize them without
 * running into parsing errors and using the fallback option
 *
 * @param messages - Raw precompiled messages (sometimes containing html tags)
 * @returns Messages with all HTML opening/closing tags substituted and the variables to replace those substitutions
 */
export function substituteHtml(messages: TranslatedMessages): {
  /** The set of messages with their HTML opening/closing tags substituted */
  substitutedMessages: TranslatedMessages,
  /** The set of variables used to replace the substitutions with their corresponding HTML opening/closing tags */
  tagVariables: Record<string, string>
} {
  const substitutedMessages = { ...messages};
  const tagVariables: Record<string, string> = {};
  Object.entries(substitutedMessages).forEach(([key, rawMessage]) => {
    let placeholderMessage = rawMessage;
    const htmlTags = [...rawMessage.matchAll(/<[^>]+>/g)].flat()
    htmlTags.forEach((tag, idx) => {
      const uniqKey = key.replaceAll('.', '_');
      placeholderMessage = placeholderMessage.replace(tag, `{tcm_${uniqKey}_tag_match_${idx}}`);
      tagVariables[`tcm_${uniqKey}_tag_match_${idx}`] = tag
    });
    substitutedMessages[key] = placeholderMessage;
  });
  return { substitutedMessages, tagVariables };
}
