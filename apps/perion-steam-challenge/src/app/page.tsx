'use client'

import styles from './page.module.scss';
import {GetOwnedGamesResponse, getSteamGames, SteamGame} from './actions'
import {useState, useTransition} from "react";

const defaultGames: GetOwnedGamesResponse = {
  games: [],
  game_count: 0
}

function GameCount({ value = 0 }) {
    return value > 0 && <div data-testid="game-count">You own {value} game{value !== 1 && 's'}</div>
}

function GameList({ games }: { games: SteamGame[] }) {
  if (games.length === 0) {
    return null
  }

  const children = games.map(game =>
    <div key={game.appid}>{game.name}</div>
  )

  return <div data-testid="game-list">{children}</div>
}

function GameSearch({ onSubmit }: { onSubmit: (formData: FormData) => void }) {
  const [idType, setIdType] = useState(1)

  return (
    <form action={onSubmit}>
      <div className="buttonGroup">
        <label><input name="idType" type="radio" value={0} checked={idType === 0} onChange={() => setIdType(0)} />Steam ID</label>
        <label><input name="idType" type="radio" value={1} checked={idType === 1} onChange={() => setIdType(1)}  />Vanity Name</label>
      </div>
      <label>
        <span>Enter your Steam {idType ? 'Vanity Name' : 'ID'}</span>
        <input name="idValue" type="text" />
      </label>
      <button data-testid="search">Search</button>
    </form>
  )
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
