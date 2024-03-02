import styles from './list-item-text.module.scss';
import {ReactNode} from "react";

export interface ListItemTextProps {
  primary?: ReactNode,
  secondary?: ReactNode
}

export function ListItemText({ primary, secondary }: ListItemTextProps) {
  return <div className={styles.host}>
    <div className={styles.primary}>{primary}</div>
    <div className={styles.secondary}>{secondary}</div>
  </div>
}
