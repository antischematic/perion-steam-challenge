import {z, ZodType} from "zod";
import * as React from "react";

export function applySchema<T extends ZodType>(schema: T, body: unknown): z.infer<T> {
  const parsed = schema.safeParse(body)

  if (parsed.success) {
    return parsed.data
  }

  throw new Error(parsed.error.message, { cause: parsed.error })
}

export function sortBy<T extends unknown[]>(list: T, select: (item: T[number]) => string | number | boolean | bigint): T[number][] {
  return list.slice().sort((a, b) => {
    const selectA = select(a), selectB = select(b)
    return Object.is(selectA, selectB) ? 0 : selectA < selectB ? -1 : 1
  })
}

export function mergeRefs<T = unknown>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined | null>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
