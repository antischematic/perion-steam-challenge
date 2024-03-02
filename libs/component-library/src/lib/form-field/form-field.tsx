import styles from './form-field.module.scss';
import {DetailedHTMLProps, HTMLAttributes} from "react";
import classNames from "classnames";

/* eslint-disable-next-line */
export interface FormFieldProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function FormField({ className, children, ...rest }: FormFieldProps) {
  return (
    <div className={classNames(styles.host, className)} {...rest}>
      {children}
    </div>
  );
}

export default FormField;
