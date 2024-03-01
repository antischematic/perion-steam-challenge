import {z} from "zod";

export const ownedGamesApiSchema = z.object({
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

export const steamIdApiSchema = z.object({
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
