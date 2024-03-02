import styles from './spinner.module.scss';
import classNames from 'classnames';

/* eslint-disable-next-line */
export interface SpinnerProps {
  spin?: boolean;
  className?: string;
}

export function Spinner({ spin, className }: SpinnerProps) {
  return spin ? (
    <span className={classNames(styles.host, className)}></span>
  ) : null;
}

export default Spinner;
