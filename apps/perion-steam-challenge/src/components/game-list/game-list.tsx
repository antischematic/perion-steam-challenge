import styles from './game-list.module.scss';
import {SteamGame} from "@perion.steam.challenge/steam-api";
import React from "react"
import {Avatar, ListItem, ListItemText, VirtualList} from "@perion.steam.challenge/component-library";

/* eslint-disable-next-line */
export interface GameListProps {
    games: SteamGame[]
}

export function GameList({ games }: GameListProps ) {
    if (games.length === 0) {
        return null
    }

    return (
        <VirtualList data-testid="game-list" items={games} estimateSize={215}>
          {(game) => (
            <ListItem>
              <Avatar src={getSteamGameHeader(game.appid)} />
              <ListItemText primary={game.name} secondary={`Hours played: ${formatHours(game.playtime_forever)}`} />
            </ListItem>
          )}
        </VirtualList>
    )
}

function formatHours(minutes = 0) {
  return Math.floor(minutes / 60)
}

// This is the only image we can get from the official API documentation
function getSteamGameImage(appId: number, hash?: string) {
  return hash && `http://media.steampowered.com/steamcommunity/public/images/apps/${appId}/${hash}.jpg`
}

// Ideally we shouldn't leech off other CDNs without permission
function getSteamGameHeader(appId: number) {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`
}

function getSteamGameHeroCapsule(appId: number) {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/hero_capsule.jpg`
}

function getSteamGameLargeCapsule(appId: number) {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/capsule_616x353.jpg`
}

function getSteamGameSmallCapsule(appId: number) {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/capsule_231x87.jpg`
}
