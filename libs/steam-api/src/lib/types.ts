
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
    game_count: number
    games: SteamGame[]
}
