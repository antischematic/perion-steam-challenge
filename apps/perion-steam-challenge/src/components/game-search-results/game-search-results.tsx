import styles from './game-search-results.module.scss';
import { GetSteamGamesApiData } from '../../app/actions';
import { GameList } from '../game-list/game-list';
import { GameStatistics } from '../game-statistics/game-statistics';
import { formatNumber } from '@perion.steam.challenge/utils';

export function GameSearchResults(props?: { results?: GetSteamGamesApiData }) {
  if (!props?.results) {
    return null;
  }
  const {
    games,
    totalNumberOfGamesOwned,
    playtimeAcrossAllGames,
    mostPlayedGame,
    playerSummary,
  } = props.results;

  if (playerSummary.profilestate !== 1) {
    return <p className={styles.heading}>This account doesn&rsquo;t have a profile :/</p>
  }

  if (playerSummary.communityvisibilitystate === 1) {
    return <p className={styles.heading}>This account is private :/</p>
  }

  if (games.length === 0) {
    return <p className={styles.heading}>{playerSummary.personaname}&rsquo;s game list is private :/</p>
  }

  return (
    <>
      {playerSummary && (
        <p className={styles.heading} data-testid="game-count">
          Showing {formatNumber(totalNumberOfGamesOwned)} game
          {totalNumberOfGamesOwned !== 1 && 's'} from{' '}
          {playerSummary.personaname}&rsquo;s library
        </p>
      )}
      <GameList games={games} />
      <GameStatistics
        playerName={playerSummary.personaname}
        playtimeAcrossAllGames={playtimeAcrossAllGames}
        mostPlayedGame={mostPlayedGame}
      />
    </>
  );
}
