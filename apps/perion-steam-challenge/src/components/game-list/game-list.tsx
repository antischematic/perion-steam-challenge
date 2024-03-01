import styles from './game-list.module.scss';
import {SteamGame} from "@perion.steam.challenge/steam-api";
import React from "react"

/* eslint-disable-next-line */
export interface GameListProps {
    games: SteamGame[]
}

export function GameList({ games }: GameListProps ) {
    if (games.length === 0) {
        return null
    }

    const children = games.map(game => {
        const playtimeHours = Math.floor((game.playtime_forever ?? 0) / 60)
        return <React.Fragment key={game.appid}>
            <div>{game.name}</div>
            <div>Hours played: {playtimeHours}</div>
        </React.Fragment>
    })

    return <div data-testid="game-list">{children}</div>
}
