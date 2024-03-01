import styles from './game-list.module.scss';
import {SteamGame} from "../../app/actions";

/* eslint-disable-next-line */
export interface GameListProps {
    games: SteamGame[]
}

export function GameList({ games }: GameListProps ) {
    if (games.length === 0) {
        return null
    }

    const children = games.map(game =>
        <div key={game.appid}>{game.name}</div>
    )

    return <div data-testid="game-list">{children}</div>
}
