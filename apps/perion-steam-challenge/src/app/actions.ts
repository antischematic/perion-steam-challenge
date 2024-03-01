'use server'

import {z, ZodType} from "zod";

const schema = z.object({
  idValue: z.string(),
  idType: z.number({ coerce: true }),
});

export async function getSteamGames(formData: FormData) {
  try {
    const {idValue, idType} = applySchema(schema, Object.fromEntries(formData))
    const steamid = idType ? await getSteamIdByVanityUrlName(idValue) : idValue
    return {
      ok: true,
      data: await getGamesBySteamId(steamid)
    } as const
  } catch (e) {
    console.error(e)
    return {
      ok: false,
      message: 'Internal Server Error'
    } as const
  }
}

const { STEAM_API_KEY } = process.env

type ResolveVanityURLResponse = {
  success: true
  steamid: string
} | {
  success: false
  message: string
}

export interface SteamGame {
  appid: number
  name: string
  playtime_2weeks?: number
  playtime_forever?: number
  // To construct the images use http://media.steampowered.com/steamcommunity/public/images/apps/{appid}/{hash}.jpg
  img_icon_url?: string
  img_logo_url?: string
  has_community_visible_stats?: boolean
}

export type GetOwnedGamesResponse = {
  game_count?: number
  games?: SteamGame[]
}

const steamIdApiSchema = z.object({
  response: z.union([
    z.object({
      success: z.coerce.boolean().pipe(z.literal(true)),
      steamid: z.string(),
    }),
    z.object({
      success: z.coerce.boolean().pipe(z.literal(false)),
      message: z.string()
    })
  ])
})

// eg. https://steamcommunity.com/id/monkyyy then vanityUrlName would be monkyyy
async function getSteamIdByVanityUrlName(vanityUrlName: string): Promise<string> {
  const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${STEAM_API_KEY}&vanityurl=${vanityUrlName}`
  const response = await fetch(url)
  const steamUser = applySchema(steamIdApiSchema, await response.json())
  if (!steamUser.response.success) {
    throw new Error('Not found', { cause: steamUser.response.message })
  }
  return steamUser.response.steamid
}

const ownedGamesApiSchema = z.object({
  response: z.object({
    game_count: z.number(),
    games: z.array(z.object({
      appid: z.number(),
      name: z.string(),
      playtime_2weeks: z.optional(z.number()),
      playtime_forever: z.optional(z.number()),
      img_icon_url: z.optional(z.string()),
      img_logo_url: z.optional(z.string()),
      has_community_visible_stats: z.optional(z.boolean()),
    })),
  }).partial()
})

async function getGamesBySteamId(steamId: string, { includeAppInfo = true, includePlayedFreeGames = true } = {}): Promise<GetOwnedGamesResponse> {
  const response = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}&format=json&include_appinfo=${includeAppInfo}&include_played_free_games=${includePlayedFreeGames}`)
  const steamGamesByUserId = applySchema(ownedGamesApiSchema, await response.json())
  return steamGamesByUserId.response
}

function applySchema<T extends ZodType>(schema: T, body: unknown): z.infer<T> {
  const parsed = schema.safeParse(body)

  if (parsed.success) {
    return parsed.data
  }

  throw new Error('Bad request', { cause: parsed.error })
}
