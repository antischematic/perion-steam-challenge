'use client'

import styles from './page.module.scss';
import {GetOwnedGamesResponse, getSteamGames} from './actions'
import {useState, useTransition} from "react";
import {GameList} from "../components/game-list/game-list"
import {GameSearch} from "../components/game-search/game-search";
import {GameCount} from "../components/game-count/game-count";

const defaultGames: GetOwnedGamesResponse = {
  games: [],
  game_count: 0
}

export default function Index() {
  const [{ games = [], game_count }, setSteamGames] = useState(defaultGames)
  const [error, setError] = useState<string | null>(null)
  const [transition, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
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
    <GameSearch onSubmit={handleSubmit} />
    <GameCount value={game_count} />
    <GameList games={games} />
  </>);
}
