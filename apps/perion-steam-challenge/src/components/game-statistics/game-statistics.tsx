import styles from './game-statistics.module.scss';
import {SteamGame} from "@perion.steam.challenge/steam-api";
import {formatHours, formatInteger, getSteamGameLargeCapsule} from "@perion.steam.challenge/utils";

/* eslint-disable-next-line */
export interface GameCountProps {
    playerName?: string
    playtimeAcrossAllGames?: number
    mostPlayedGame?: SteamGame
}

const AVERAGE_TIME_TO_READ_A_BOOK_HOURS = 7

function MostPlayedGame({ game }: { game?: SteamGame }) {
  if (!game) {
    return null
  }
  return <div className={styles.host}>
    <div className={styles.gameName}>{game.name}</div>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={getSteamGameLargeCapsule(game.appid)} alt={game.name} />
    <div className={styles.playtime}>{formatHours(game.playtime_forever)} hours</div>
  </div>
}

export function GameStatistics({playerName, playtimeAcrossAllGames = 0, mostPlayedGame }: GameCountProps) {
    return <>
      <p className={styles.heading}>{playerName}&rsquo;s most played game</p>
      <MostPlayedGame game={mostPlayedGame} />
      <div className={styles.playtimeAcrossAllGames}>
        <p>Across all games {playerName} has played for <strong>{formatHours(playtimeAcrossAllGames)} hours</strong></p>
        <p>That&rsquo;s about the time it takes to read <strong>{formatInteger(playtimeAcrossAllGames / (60 * AVERAGE_TIME_TO_READ_A_BOOK_HOURS))} books</strong></p>
      </div>
    </>
}
