import { z } from 'zod';

export const ownedGamesApiSchema = z.object({
  response: z
    .object({
      game_count: z.number(),
      games: z.array(
        z.object({
          appid: z.number(),
          name: z.string(),
          playtime_2weeks: z.optional(z.number()),
          playtime_forever: z.optional(z.number()),
          img_icon_url: z.optional(z.string()),
          img_logo_url: z.optional(z.string()),
          has_community_visible_stats: z.optional(z.boolean()),
        })
      ),
    })
    .partial(),
});

export const steamIdApiSchema = z.object({
  response: z.union([
    z.object({
      success: z.coerce.boolean().pipe(z.literal(true)),
      steamid: z.string(),
    }),
    z.object({
      success: z.literal(42).transform<false>(() => false),
      message: z.string(),
    }),
  ]),
});

export const playerSummarySchema = z.object({
  response: z.object({
    players: z.array(
      z.object({
        steamid: z.string(),
        communityvisibilitystate: z.number(),
        profilestate: z.number(),
        personaname: z.string(),
        profileurl: z.string(),
        avatar: z.string(),
        avatarmedium: z.string(),
        avatarfull: z.string(),
        avatarhash: z.string(),
        lastlogoff: z.optional(z.number()),
        personastate: z.number(),
        primaryclanid: z.optional(z.string()),
        timecreated: z.optional(z.number()),
        personastateflags: z.optional(z.number()),
        loccountrycode: z.optional(z.string()),
      })
    ),
  }),
});
