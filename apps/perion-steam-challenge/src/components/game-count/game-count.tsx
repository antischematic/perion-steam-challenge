import styles from './game-count.module.scss';

/* eslint-disable-next-line */
export interface GameCountProps {
    value?: number
}

export function GameCount({ value = 0 }: GameCountProps) {
    return value > 0 && <div data-testid="game-count">You own {value} game{value !== 1 && 's'}</div>
}
