// external
import { ComponentChild, h, JSX } from 'preact';

// global
import { useConfig, useEmotion } from '../hooks';

/**
 * The header title of the modal
 */
export default function Title({
  children,
}: {
  /** Component children */
  children: ComponentChild;
}): JSX.Element {
  const { config } = useConfig();
  const { css, cx } = useEmotion();

  const paragraphStyle = css`
    color: ${config.theme.fontColor};
    font-size: 14px;
    margin: 0 0 18px 0;

    @media (min-width: ${config.breakpoints.tablet}) {
      margin: 18px 18px 0 0;
    }
  `;

  return <p className={cx(paragraphStyle)}>{children}</p>;
}
