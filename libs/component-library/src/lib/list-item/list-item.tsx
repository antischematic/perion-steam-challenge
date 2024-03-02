import styles from './list-item.module.scss';
import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';

/* eslint-disable-next-line */
export interface ListItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {}

export function ListItem({
  children,
  className,
  ...rest
}: PropsWithChildren<ListItemProps>) {
  return (
    <li className={classNames(styles.host, className)} {...rest}>
      {children}
    </li>
  );
}
