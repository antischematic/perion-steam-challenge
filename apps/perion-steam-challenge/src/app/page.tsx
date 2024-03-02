'use client'

import {getSteamGames, GetSteamGamesApiData} from './actions'
import {useState} from "react";
import {GameSearch} from "../components/game-search/game-search";
import {GameSearchResults} from "../components/game-search-results/game-search-results";
import styles from "./page.module.scss"

export default function Index() {
  const [steamGames, setSteamGames] = useState<GetSteamGamesApiData>()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setError(null)
    const result = await getSteamGames(formData)
    if (result.ok) {
      setSteamGames(result.data)
    } else {
      setError(result.message)
    }
  }

  return (<div className={styles.host}>
    <h1 className={styles.heading}>Welcome</h1>
    { error && <div className={styles.errorMessage}>{error}</div>}
    <GameSearch onSubmit={handleSubmit} />
    <GameSearchResults results={steamGames} />
  </div>);
}
