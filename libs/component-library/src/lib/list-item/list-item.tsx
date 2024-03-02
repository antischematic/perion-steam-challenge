import styles from './list-item.module.scss';
import {DetailedHTMLProps, HTMLAttributes, PropsWithChildren, ReactNode} from "react";
import classNames from "classnames";

/* eslint-disable-next-line */
export interface ListItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {}

export function ListItem({children, className, ...rest}: PropsWithChildren<ListItemProps>) {
  return (
    <li className={classNames(styles.host, className)} {...rest}>
      {children}
    </li>
  );
}

export interface ListItemTextProps {
  primary: ReactNode,
  secondary: ReactNode
}

export function ListItemText({ primary, secondary }: ListItemTextProps) {
  return <div className={classNames(styles.host, styles.listItem)}>
    <div className={styles.primary}>{primary}</div>
    <div className={styles.primary}>{secondary}</div>
  </div>
}
