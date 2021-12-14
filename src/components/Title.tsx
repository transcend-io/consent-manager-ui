// external
import { ComponentChild, h, JSX } from 'preact';

// global
import { useConfig, useEmotion } from '../hooks';

/**
 * The header title of the modal
 *
 * @param root0
 */
export default function Title({
  children,
  align = 'center',
}: {
  /** Component children */
  children: ComponentChild;
  /** Align left or center */
  align?: 'left' | 'center';
}): JSX.Element {
  const { config } = useConfig();
  const { css, cx } = useEmotion();

  const titleStyle = css`
    font-size: 18px;
    font-weight: 700;
    color: ${config.theme.fontColor};
    margin: 0 0 18px 0;
    text-align: center;

    @media (min-width: ${config.breakpoints.tablet}) {
      margin: ${align === 'center' ? '0 0 18px 0' : '0 18px 0 0'};
      text-align: ${align};
    }
  `;

  return <p className={cx(titleStyle)}>{children}</p>;
}
