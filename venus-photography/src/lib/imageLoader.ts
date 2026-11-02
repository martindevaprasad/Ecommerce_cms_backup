"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

export default function imageLoader({ src, width }: LoaderArgs) {
  if (src.startsWith("/")) return `${src}?w=${width}`;
  return `${src}?auto=compress&cs=tinysrgb&w=${width}`;
}
