'use server'

import {z} from "zod";
import {PlayerSummary, SteamApiClient, SteamGame} from "@perion.steam.challenge/steam-api";
import {applySchema, sortBy} from "@perion.steam.challenge/utils";
import * as process from "process";

const getSteamGamesInputSchema = z.object({
  idValue: z.string(),
  idType: z.number({ coerce: true }),
});

const steam = new SteamApiClient(process.env.STEAM_API_KEY)

export interface GetSteamGamesApiData {
  playtimeAcrossAllGames: number
  mostPlayedGame?: SteamGame
  games: SteamGame[]
  totalNumberOfGamesOwned: number
  playerSummary: PlayerSummary
}

export interface GetSteamGamesApiSuccess {
  ok: true
  data: GetSteamGamesApiData
}

export interface GetSteamGamesApiError {
  ok: false
  message: string
}

export type GetSteamGamesApiResponse = GetSteamGamesApiSuccess | GetSteamGamesApiError

export async function getSteamGames(formData: FormData): Promise<GetSteamGamesApiResponse> {
  try {
    const {idValue, idType} = applySchema(getSteamGamesInputSchema, Object.fromEntries(formData))
    let steamId = idValue
    if (idType === 1) {
      const user = await steam.getSteamIdByVanityUrlName(idValue)
      if (user.success) {
        steamId = user.steamid
      } else {
        return {
          ok: false,
          message: `Not Found`
        }
      }
    }

    const steamGames = await steam.getGamesBySteamId(steamId)
    const games = sortBy(steamGames.games, game => game.name)
    const steamGamesSortedByPlaytime = sortBy(steamGames.games, game => game.playtime_forever ?? 0)
    const totalNumberOfGamesOwned = steamGames.game_count
    const mostPlayedGame = steamGamesSortedByPlaytime[steamGamesSortedByPlaytime.length - 1]
    const playtimeAcrossAllGames = games.reduce((acc, game) => acc + (game.playtime_forever ?? 0), 0)
    const playerSummary = await steam.getPlayerSummary(steamId)

    return {
      ok: true,
      data: {
        games,
        totalNumberOfGamesOwned,
        playtimeAcrossAllGames,
        mostPlayedGame,
        playerSummary
      }
    } as const
  } catch (e) {
    console.error(e)
    return {
      ok: false,
      message: 'Internal Server Error'
    } as const
  }
}
