import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { movementHowTo, movementKey } from "./movementHowTo.ts";
import { TEMPLATES } from "./templates.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const withArt = new Set<string>();

for (const template of TEMPLATES) {
  for (const phase of template.phases) {
    for (const block of phase.blocks) {
      const guide = movementHowTo(block.name);
      assert.equal(guide.mapped, true, `${template.id} ${block.name} needs a how-to`);
      assert.equal(guide.name, block.name);
      assert.ok(guide.cues.length >= 2 && guide.cues.length <= 4, block.name);
      for (const cue of guide.cues) {
        assert.ok(cue.trim().length > 8, cue);
      }
      if (!guide.frames) continue;
      withArt.add(movementKey(block.name));
      assert.equal(guide.frames.length, 3, block.name);
      for (const frame of guide.frames) {
        assert.match(frame, /^\/movement\/[a-z0-9-]+\/frame-[123]\.svg$/);
        assert.equal(frame.includes("cdn"), false);
        assert.equal(frame.includes("jsdelivr"), false);
        const file = join(root, "public", frame.slice(1));
        assert.equal(existsSync(file), true, frame);
        const svg = readFileSync(file, "utf8");
        assert.equal(svg.startsWith("<svg"), true, frame);
        assert.equal(svg.includes("<script"), false, frame);
        assert.equal(svg.includes("href="), false, frame);
      }
    }
  }
}

assert.deepEqual([...withArt].sort(), ["childs pose", "worlds greatest stretch"]);

const hike = movementHowTo("Hike pass");
assert.equal(hike.frames, null);
assert.ok(hike.cues.some((cue) => /ribs/i.test(cue)));
assert.ok(hike.cues.some((cue) => /setting the bell down/i.test(cue)));

const stretch = movementHowTo("World's greatest stretch");
assert.ok(stretch.frames?.every((frame) => frame.includes("worlds-greatest-stretch")));

for (const name of ["Goblet squat", "Light goblet squat", "Glute bridge", "Forward fold", "Easy hamstrings", "Hip circles", "Sit-back, no bell"]) {
  assert.equal(movementHowTo(name).frames, null, name);
}

assert.equal(movementHowTo("Not a real block").mapped, false);

console.log("movement how-to checks passed");
