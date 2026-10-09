/**
 * How-sheet copy comes from the Vital Animations manifest.
 * A block name that matches a clip gets those instructions and the media.
 * Anything else stays words only — no stills, no remote pictures.
 */

import { vitalByName, type VitalPoster } from "./vital";

export const VITAL_CREDIT = "Animation: Vital Animations";

export type MovementGuide = {
  name: string;
  cues: readonly string[];
  vitalId: string | null;
  mp4: string | null;
  poster: VitalPoster | null;
  credit: string | null;
  mapped: boolean;
};

const FALLBACK_CUES = [
  "Do it the way the block is written.",
  "Smooth before fast.",
  "If it bites, ease off and start that rep over.",
] as const;

export function movementKey(name: string): string {
  return name.toLowerCase().replace(/['’]/g, "").replace(/\s+/g, " ").trim();
}

export function movementHowTo(name: string): MovementGuide {
  const found = vitalByName(name);
  if (!found) {
    return {
      name,
      cues: FALLBACK_CUES,
      vitalId: null,
      mp4: null,
      poster: null,
      credit: null,
      mapped: false,
    };
  }
  return {
    name,
    cues: found.instructions,
    vitalId: found.id,
    mp4: found.mp4,
    poster: found.poster,
    credit: VITAL_CREDIT,
    mapped: true,
  };
}
