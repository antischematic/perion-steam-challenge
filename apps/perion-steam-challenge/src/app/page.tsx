'use client'

import styles from './page.module.scss';
import {getSteamGames, GetSteamGamesApiData} from './actions'
import {useState, useTransition} from "react";
import {GameList} from "../components/game-list/game-list"
import {GameSearch} from "../components/game-search/game-search";
import {GameCount} from "../components/game-count/game-count";

const defaultGames: GetSteamGamesApiData = {
  games: [],
  totalNumberOfGamesOwned: 0,
  mostPlayedGame: undefined,
  playtimeAcrossAllGames: 0
}

export default function Index() {
  const [{ games, totalNumberOfGamesOwned, playtimeAcrossAllGames, mostPlayedGame }, setSteamGames] = useState(defaultGames)
  const [error, setError] = useState<string | null>(null)
  const [transition, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      setError(null)
      const result = await getSteamGames(formData)
      if (result.ok) {
        setSteamGames(result.data)
      } else {
        setError(result.message)
      }
    })
  }

  return (<>
    <h1>Welcome</h1>
    { transition && <div>Loading</div> }
    { error && <div>{error}</div>}
    { playtimeAcrossAllGames > 0 && <div>Total days played: {Math.ceil(playtimeAcrossAllGames / (60 * 24))}</div>}
    { mostPlayedGame && <div>Most played game: {mostPlayedGame.name}</div>}
    <GameSearch onSubmit={handleSubmit} />
    <GameCount value={totalNumberOfGamesOwned} />
    <GameList games={games} />
  </>);
}
