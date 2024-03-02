import styles from './input.module.scss';
import React, {DetailedHTMLProps, InputHTMLAttributes, Ref} from "react";
import classNames from "classnames";

/* eslint-disable-next-line */
export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Input = React.forwardRef(({ className, ...rest}: InputProps, ref: Ref<HTMLInputElement>) => {
  return (
    <input className={classNames(styles.host, className)} {...rest} ref={ref} />
  );
})
