import styles from './button.module.scss';
import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

/* eslint-disable-next-line */
export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export function Button({children, ...rest}: ButtonProps) {
  return (
      <button {...rest}>{children}</button>
  );
}
