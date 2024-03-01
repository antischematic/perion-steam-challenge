import {applySchema} from "@perion.steam.challenge/utils";
import {GetOwnedGamesResponse} from "./types";
import {ownedGamesApiSchema, steamIdApiSchema} from "./schemas";

export class SteamApiClient {
  constructor(private apiKey: string) {
    if (!apiKey) {
      throw new Error('Invalid API Key')
    }
  }

  // eg. https://steamcommunity.com/id/monkyyy then vanityUrlName would be monkyyy
  async getSteamIdByVanityUrlName(vanityUrlName: string): Promise<string> {
    const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${this.apiKey}&vanityurl=${vanityUrlName}`
    const response = await fetch(url)
    const steamUser = applySchema(steamIdApiSchema, await response.json())
    if (!steamUser.response.success) {
      throw new Error('Not found', { cause: steamUser.response.message })
    }
    return steamUser.response.steamid
  }

  async getGamesBySteamId(steamId: string, { includeAppInfo = true, includePlayedFreeGames = true } = {}): Promise<GetOwnedGamesResponse> {
    const response = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${this.apiKey}&steamid=${steamId}&format=json&include_appinfo=${includeAppInfo}&include_played_free_games=${includePlayedFreeGames}`)
    const steamGamesByUserId = applySchema(ownedGamesApiSchema, await response.json())
    return steamGamesByUserId.response
  }
}
