import styles from './input.module.scss';
import {DetailedHTMLProps, InputHTMLAttributes} from "react";
import classNames from "classnames";

/* eslint-disable-next-line */
export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export function Input({ className, ...rest}: InputProps) {
  return (
    <input className={classNames(styles.host, className)} {...rest} />
  );
}

export default Input;
