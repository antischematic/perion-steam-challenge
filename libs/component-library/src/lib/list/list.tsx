import styles from './list.module.scss';
import {DetailedHTMLProps, HTMLAttributes, PropsWithChildren} from "react";
import classNames from "classnames";

/* eslint-disable-next-line */
export interface ListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {}

export function List({children, className, ...rest}: PropsWithChildren<ListProps>) {
  return (
    <ul className={classNames(styles.host, className)} {...rest}>
      {children}
    </ul>
  );
}
