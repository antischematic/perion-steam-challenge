import { applySchema } from '@perion.steam.challenge/utils';
import { OwnedGames } from './types';
import {
  ownedGamesApiSchema,
  playerSummarySchema,
  steamIdApiSchema,
} from './schemas';

export class SteamApiClient {
  constructor(private apiKey: string) {
    if (!apiKey) {
      throw new Error('Invalid API Key');
    }
  }

  // eg. https://steamcommunity.com/id/monkyyy then vanityUrlName would be monkyyy
  async getSteamIdByVanityUrlName(vanityUrlName: string) {
    const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${this.apiKey}&vanityurl=${vanityUrlName}`;
    const response = await fetch(url);
    const data = await response.json();
    const steamUser = applySchema(steamIdApiSchema, data);
    return steamUser.response;
  }

  async getGamesBySteamId(
    steamId: string,
    { includeAppInfo = true, includePlayedFreeGames = true } = {}
  ): Promise<OwnedGames> {
    const response = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${this.apiKey}&steamid=${steamId}&format=json&include_appinfo=${includeAppInfo}&include_played_free_games=${includePlayedFreeGames}`
    );
    const data = await response.json();
    const steamGamesByUserId = applySchema(ownedGamesApiSchema, data);
    return {
      games: [],
      game_count: 0,
      ...steamGamesByUserId.response,
    };
  }

  async getPlayerSummary(steamId: string) {
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${this.apiKey}&steamids=${steamId}`;
    const response = await fetch(url);
    const data = await response.json();
    const playerSummary = applySchema(playerSummarySchema, data);
    return playerSummary.response.players[0];
  }
}
