import {z, ZodType} from "zod";

export function applySchema<T extends ZodType>(schema: T, body: unknown): z.infer<T> {
  const parsed = schema.safeParse(body)

  if (parsed.success) {
    return parsed.data
  }

  throw new Error(parsed.error.message, { cause: parsed.error })
}

export function sortBy<T extends unknown[]>(list: T, select: (item: T[number]) => number): T[number][] {
  return list.slice().sort((a, b) => {
    return (select(a) - select(b))
  })
}
