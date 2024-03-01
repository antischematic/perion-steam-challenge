'use server'

import {z} from "zod";
import {SteamApiClient} from "@perion.steam.challenge/steam-api";
import {applySchema} from "@perion.steam.challenge/utils";
import * as process from "process";

const getSteamGamesInputSchema = z.object({
  idValue: z.string(),
  idType: z.number({ coerce: true }),
});

const steam = new SteamApiClient(process.env.STEAM_API_KEY)

export async function getSteamGames(formData: FormData) {
  try {
    const {idValue, idType} = applySchema(getSteamGamesInputSchema, Object.fromEntries(formData))
    const steamId = idType ? await steam.getSteamIdByVanityUrlName(idValue) : idValue
    return {
      ok: true,
      data: await steam.getGamesBySteamId(steamId)
    } as const
  } catch (e) {
    console.error(e)
    return {
      ok: false,
      message: 'Internal Server Error'
    } as const
  }
}
