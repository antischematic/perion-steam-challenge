import styles from './button-group.module.scss';

/* eslint-disable-next-line */
export interface ButtonGroupProps {}

export function ButtonGroup(props: ButtonGroupProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ButtonGroup!</h1>
    </div>
  );
}

export default ButtonGroup;
