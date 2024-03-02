import styles from './game-list.module.scss';
import { SteamGame } from '@perion.steam.challenge/steam-api';
import React from 'react';
import {
  Avatar,
  ListItem,
  ListItemText,
  VirtualList,
} from '@perion.steam.challenge/component-library';
import { formatHours, getSteamGameImage } from '@perion.steam.challenge/utils';

/* eslint-disable-next-line */
export interface GameListProps {
  games: SteamGame[];
}

function showAlert() {
  alert(
    'Not implemented, but we could show more information about a specific game, show player achievements, or compare with friends who own the same game, etc.'
  );
}

export function GameList({ games }: GameListProps) {
  if (games.length === 0) {
    return null;
  }

  return (
    <VirtualList
      data-testid="game-list"
      items={games}
      estimateSize={80}
      style={{ border: '4px solid black', padding: 16 }}
    >
      {(game) => (
        <ListItem style={{ paddingBottom: 16 }}>
          <a href="#" className={styles.link} onClick={showAlert}>
            <Avatar
              width={32}
              height={32}
              src={getSteamGameImage(game.appid, game.img_icon_url)}
            />
            <ListItemText
              primary={<strong>{game.name}</strong>}
              secondary={
                <span>
                  Play time:{' '}
                  {game.playtime_forever
                    ? `${formatHours(game.playtime_forever)} hours`
                    : 'Never played'}
                </span>
              }
            />
          </a>
        </ListItem>
      )}
    </VirtualList>
  );
}
