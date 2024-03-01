import styles from './feature-tile.module.scss';

/* eslint-disable-next-line */
export interface FeatureTileProps {}

export function FeatureTile(props: FeatureTileProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FeatureTile!</h1>
    </div>
  );
}

export default FeatureTile;
