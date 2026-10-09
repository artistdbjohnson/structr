/**
 * Vital Animations free pack. How sheets read this manifest.
 * Posters and MP4s stay unloaded until a sheet opens.
 */

import manifest from "../public/how/vital/manifest.json";

export type VitalPoster = {
  avif: string;
  webp: string;
};

export type VitalExercise = {
  id: string;
  slug: string;
  name: string;
  label: string;
  bodyPart: string;
  equipment: string;
  target: string;
  instructions: readonly string[];
  mp4: string;
  poster: VitalPoster;
  credit: string;
};

type RawVital = {
  id: string;
  slug: string;
  name: string;
  bodyPart: string;
  equipment: string;
  target: string;
  instructions: string[];
  mp4: string;
  poster: VitalPoster;
  credit: string;
};

export function vitalLabel(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function vitalKey(name: string): string {
  return name.toLowerCase().replace(/['’]/g, "").replace(/\s+/g, " ").trim();
}

export const VITAL_EXERCISES: readonly VitalExercise[] = (manifest as RawVital[]).map((item) => ({
  id: item.id,
  slug: item.slug,
  name: item.name,
  label: vitalLabel(item.name),
  bodyPart: item.bodyPart,
  equipment: item.equipment,
  target: item.target,
  instructions: item.instructions,
  mp4: item.mp4,
  poster: item.poster,
  credit: item.credit,
}));

const BY_KEY = new Map<string, VitalExercise>();
for (const exercise of VITAL_EXERCISES) {
  BY_KEY.set(vitalKey(exercise.label), exercise);
  BY_KEY.set(vitalKey(exercise.name), exercise);
  BY_KEY.set(vitalKey(exercise.slug.replace(/-/g, " ")), exercise);
}

export function vitalByName(name: string): VitalExercise | undefined {
  return BY_KEY.get(vitalKey(name));
}

/** Display name for a manifest slug. Throws if the clip is not in the pack. */
export function vitalMove(slug: string): string {
  const found = VITAL_EXERCISES.find((item) => item.slug === slug);
  if (!found) throw new Error(`Missing vital clip: ${slug}`);
  return found.label;
}
