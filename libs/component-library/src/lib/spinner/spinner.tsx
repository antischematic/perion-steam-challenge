import styles from './spinner.module.scss';

/* eslint-disable-next-line */
export interface SpinnerProps {}

export function Spinner(props: SpinnerProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Spinner!</h1>
    </div>
  );
}

export default Spinner;
