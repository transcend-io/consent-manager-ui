import type { ObjByString } from '@transcend-io/type-utils';

/**
 * Render a template linked to handlebars
 *
 * @example <caption>Example usage of render</caption>
 * // The template string
 * const template = 'here there {{firstName}}';
 * // The parameters to fill the template with
 * const props = { firstName: 'Mason' };
 * // Returns
 * render(template, props);
 *
 * Note: the usage of this function is not recommended. It is better
 * to use react-intl on the frontend or handlebars on the backend, but
 * if you find yourself in a situation where you want to use handlebars
 * on the frontend with a dynamic message, this function can be used.
 * @param template - The template string
 * @param props - The parameters to fill the template with
 * @returns The template rendered
 */
export function compile(template: string, props: ObjByString): string {
  let res = template;
  Object.keys(props).forEach((prop) => {
    // loosely handlebars syntax
    res = res.split(`{{{${prop}}}}`).join(props[prop]);
    res = res.split(`{{{ ${prop} }}}`).join(props[prop]);
    res = res.split(`{{${prop}}}`).join(props[prop]);
    res = res.split(`{{ ${prop} }}`).join(props[prop]);

    // loosely react-intl syntax
    res = res.split(`{${prop}}`).join(props[prop]);
  });
  return res;
}
