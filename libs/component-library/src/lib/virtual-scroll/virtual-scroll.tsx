import styles from './virtual-scroll.module.scss';

/* eslint-disable-next-line */
export interface VirtualScrollProps {}

export function VirtualScroll(props: VirtualScrollProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to VirtualScroll!</h1>
    </div>
  );
}

export default VirtualScroll;
