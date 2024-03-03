import { z, ZodType } from 'zod';
import * as React from 'react';

export function applySchema<T extends ZodType>(
  schema: T,
  body: unknown
): z.infer<T> {
  const parsed = schema.safeParse(body);

  if (parsed.success) {
    return parsed.data;
  }

  throw new Error(parsed.error.message, { cause: parsed.error });
}

export function sortBy<T extends unknown[]>(
  list: T,
  select: (item: T[number]) => string | number | boolean | bigint
): T[number][] {
  return list.slice().sort((a, b) => {
    const selectA = select(a),
      selectB = select(b);
    return Object.is(selectA, selectB) ? 0 : selectA < selectB ? -1 : 1;
  });
}

export function mergeRefs<T = unknown>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined | null>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

export function formatHours(minutes = 0) {
  return new Intl.NumberFormat('en-AU', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  }).format(minutes / 60);
}

export function formatInteger(num = 0) {
  return new Intl.NumberFormat('en-AU', { maximumFractionDigits: 0 }).format(
    num
  );
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat().format(num);
}

// This is the only image we can get from the official API documentation
export function getSteamGameImage(appId: number, hash?: string) {
  return (
    hash &&
    `https://media.steampowered.com/steamcommunity/public/images/apps/${appId}/${hash}.jpg`
  );
}

// Ideally we shouldn't leech off other CDNs without permission
export function getSteamGameHeader(appId: number) {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`;
}

export function getSteamGameHeroCapsule(appId: number) {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/hero_capsule.jpg`;
}

export function getSteamGameLargeCapsule(appId: number) {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/capsule_616x353.jpg`;
}

export function getSteamGameSmallCapsule(appId: number) {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/capsule_231x87.jpg`;
}
