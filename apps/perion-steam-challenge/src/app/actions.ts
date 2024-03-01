'use server'

import {z} from "zod";
import {SteamApiClient, SteamGame} from "@perion.steam.challenge/steam-api";
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
    const steamId = idType ? await steam.getSteamIdByVanityUrlName(idValue) : idValue
    const steamGames = await steam.getGamesBySteamId(steamId)
    const games = steamGames.games
    const steamGamesSortedByPlaytime = sortBy(games, game => game.playtime_forever ?? 0).reverse()
    const totalNumberOfGamesOwned = steamGames.game_count ?? 0
    const mostPlayedGame = steamGamesSortedByPlaytime[0]
    const playtimeAcrossAllGames = steamGamesSortedByPlaytime
        .reduce((acc, next) => acc + (next.playtime_forever ?? 0), 0)
    return {
      ok: true,
      data: {
        games,
        totalNumberOfGamesOwned,
        playtimeAcrossAllGames,
        mostPlayedGame,
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
