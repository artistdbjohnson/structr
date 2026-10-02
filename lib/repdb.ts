/**
 * Free-tier RepDB stills only.
 * Images are static 512px flat WebP files (start/peak or a single main).
 * No premium-samples, no paid looping animations.
 * License: in-app use with visible attribution. Do not redistribute the dataset.
 */

export const REPDB_HOME = "https://repdb.co";

/** Required visible credit. Keep this sentence intact. */
export const REPDB_CREDIT = "Exercise data by RepDB (repdb.co)";

export const REPDB_IMAGE_BASE = "https://exercise-dataset.com/images/flat";

export type RepdbPose = "start" | "peak" | "main";

export type RepdbShape = "pair" | "still";

export function repdbImage(id: string, pose: RepdbPose): string {
  return `${REPDB_IMAGE_BASE}/${id}-${pose}.webp`;
}

export function repdbSheet(id: string, shape: RepdbShape): { frames: readonly string[]; labels: readonly string[] } {
  if (shape === "still") {
    return { frames: [repdbImage(id, "main")], labels: ["Still"] };
  }
  return {
    frames: [repdbImage(id, "start"), repdbImage(id, "peak")],
    labels: ["Start", "Peak"],
  };
}
