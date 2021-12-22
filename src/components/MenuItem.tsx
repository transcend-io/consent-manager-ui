// external
import { ComponentChild, Fragment, h, JSX } from 'preact';

// global
import { useConfig, useEmotion } from '../hooks';

/**
 * Props that are always on this element
 */
interface MenuItemBaseProps
  extends JSX.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  /** Aria Label */
  label: string;
  /** Inner HTML of <a> tag */
  children: ComponentChild;
}

/**
 * Props if this is a button
 */
interface MenuItemButtonProps extends MenuItemBaseProps {
  /** Whether this is a button or a tag */
  type: 'button';
}

/**
 * Props if this is an anchor (a tag)
 */
interface MenuItemAnchorProps extends MenuItemBaseProps {
  /** Whether this is a button or a tag */
  type: 'a';
}

/**
 * Props for this menu item, which may be a button or an anchor (<a>) tag
 * If type === button, then includes button native props
 * If type === a, then includes anchor native props
 */
type MenuItemProps = MenuItemAnchorProps | MenuItemButtonProps;

/**
 * A set of buttons to choose a set of predefined options
 *
 * @param root0
 * @returns Menu item
 */
export default function MenuItem({
  label,
  type,
  onClick,
  children,
}: MenuItemProps): JSX.Element {
  const { config } = useConfig();
  const { css, cx } = useEmotion();

  const menuItemStyle = css`
    background: unset;
    border: unset;
    width: unset;
    padding: unset;
    margin: unset;

    margin: 0 auto;
    display: block;
    min-width: fit-content;
    width: auto;
    text-align: center;
    line-height: 1.5em;
    font-family: inherit;
    font-size: 10px;
    font-weight: 500;
    color: ${config.theme.fontColor};
    @media (min-width: ${config.breakpoints.tablet}) {
      font-size: 12px;
    }

    transition: text-decoration 150ms;
    text-decoration: underline;
    text-decoration-color: rgba(1, 1, 1, 0);
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
      text-decoration-color: rgba(1, 1, 1, 1);
      text-decoration-thickness: 1px;
      text-underline-offset: 2px;
    }
  `;

  return (
    <Fragment>
      {type === 'button' && (
        <button
          onClick={onClick as JSX.MouseEventHandler<HTMLButtonElement>}
          className={cx(menuItemStyle)}
          aria-label={label}
          title={label}
        >
          {children}
        </button>
      )}
      {type === 'a' && (
        <a
          className={cx(menuItemStyle)}
          href={config.privacyPolicy}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
        >
          {children}
        </a>
      )}
    </Fragment>
  );
}
