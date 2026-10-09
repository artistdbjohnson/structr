import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { movementHowTo } from "./movementHowTo.ts";
import { TEMPLATES } from "./templates.ts";
import { VITAL_EXERCISES } from "./vital.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

assert.equal(VITAL_EXERCISES.length, 50);

for (const template of TEMPLATES) {
  for (const step of template.phases) {
    for (const block of step.blocks) {
      const guide = movementHowTo(block.name);
      assert.equal(guide.mapped, true, `${template.id} ${block.name} needs a vital clip`);
      assert.equal(guide.name, block.name);
      assert.ok(guide.vitalId, block.name);
      assert.ok(guide.mp4?.startsWith("/how/vital/"), block.name);
      assert.ok(guide.mp4?.endsWith(".mp4"), block.name);
      assert.ok(guide.poster?.avif.endsWith(".avif"), block.name);
      assert.ok(guide.poster?.webp.endsWith(".webp"), block.name);
      assert.equal(guide.credit, "Animation: Vital Animations", block.name);
      assert.ok(guide.cues.length >= 2, `${block.name} steps`);
      for (const file of [guide.mp4, guide.poster?.avif, guide.poster?.webp]) {
        assert.ok(file, block.name);
        assert.equal(file.includes("exercise-dataset"), false, file);
        assert.equal(file.includes("/movement/"), false, file);
        assert.equal(existsSync(join(root, "public", file.slice(1))), true, file);
      }
    }
  }
}

const swing = movementHowTo("Kettlebell swing");
assert.equal(swing.vitalId, "0072");
assert.equal(swing.mp4, "/how/vital/0072.mp4");
assert.ok(swing.cues.some((cue) => /hips/i.test(cue)));

const goblet = movementHowTo("Dumbbell goblet squat");
assert.equal(goblet.vitalId, "0064");

const press = movementHowTo("Kettlebell overhead press");
assert.equal(press.vitalId, "0094");

const lift = movementHowTo("Kettlebell lift up");
assert.equal(lift.vitalId, "0071");

const missing = movementHowTo("Bench press");
assert.equal(missing.mapped, false);
assert.equal(missing.mp4, null);
assert.equal(missing.poster, null);

assert.equal(existsSync(join(root, "public/movement")), false);
assert.equal(existsSync(join(root, "lib/repdb.ts")), false);

console.log(`movement how-to checks passed (${VITAL_EXERCISES.length} vital clips)`);
