import styles from './button.module.scss';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import classNames from 'classnames';

/* eslint-disable-next-line */
export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button className={classNames(styles.host, className)} {...rest}>
      {children}
    </button>
  );
}
