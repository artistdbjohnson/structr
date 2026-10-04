import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { hasWrittenPiece } from "./movementPiece.ts";
import { movementHowTo, movementKey } from "./movementHowTo.ts";
import { REPDB_CREDIT } from "./repdb.ts";
import { TEMPLATES } from "./templates.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const withGuide = new Set<string>();
const withRepdb = new Set<string>();

const CUE_ONLY = [
  "Hip circles",
  "Hike pass",
  "90/90 hip",
  "Box breathe",
  "Arm bars (light)",
  "Breathe in the rack",
  "Slow shoulder circles",
  "Get-up pieces, no bell",
  "Roll to elbow",
  "Partial get-up to hand",
  "Full get-up, no bell",
  "Easy hamstrings",
  "Shadow boxing",
  "Fingerboard hang",
];

for (const template of TEMPLATES) {
  for (const phase of template.phases) {
    for (const block of phase.blocks) {
      const guide = movementHowTo(block.name);
      assert.equal(guide.mapped, true, `${template.id} ${block.name} needs a how-to`);
      assert.equal(guide.name, block.name);
      assert.ok(guide.cues.length >= 2 && guide.cues.length <= 4, `${block.name} cue count`);
      assert.equal(hasWrittenPiece(block.name), true, `${block.name} needs one piece`);
      assert.ok(guide.piece.trim().length > 8, `${block.name} piece`);
      assert.ok(guide.ignore.trim().length > 8, `${block.name} ignore`);
      assert.notEqual(guide.piece, guide.ignore, block.name);
      for (const cue of guide.cues) {
        assert.ok(cue.trim().length > 8, cue);
      }
      if (!guide.frames) {
        assert.equal(guide.source, null, block.name);
        continue;
      }
      assert.ok(guide.source === "repdb" || guide.source === "guide", block.name);
      for (const frame of guide.frames) {
        assert.equal(frame.includes("premium"), false, frame);
        assert.equal(frame.includes("premium-samples"), false, frame);
      }
      if (guide.source === "guide") {
        withGuide.add(movementKey(block.name));
        assert.equal(guide.frames.length, 3, block.name);
        assert.equal(guide.repdbId, null);
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
        continue;
      }
      withRepdb.add(movementKey(block.name));
      assert.ok(guide.repdbId, block.name);
      assert.ok(guide.labels && guide.labels.length === guide.frames.length, block.name);
      assert.ok(guide.frames.length === 1 || guide.frames.length === 2, block.name);
      for (const frame of guide.frames) {
        assert.match(frame, /^https:\/\/exercise-dataset\.com\/images\/flat\/[a-z0-9-]+-(start|peak|main)\.webp$/);
      }
      if (guide.frames.length === 2) {
        assert.deepEqual(guide.labels, ["Start", "Peak"]);
      }
    }
  }
}

assert.deepEqual([...withGuide].sort(), ["worlds greatest stretch"]);

for (const name of CUE_ONLY) {
  const guide = movementHowTo(name);
  assert.equal(guide.mapped, true, name);
  assert.equal(guide.frames, null, name);
}

const swing = movementHowTo("Two-hand swing");
assert.equal(swing.repdbId, "kettlebell-swing");
assert.equal(swing.frames?.length, 2);

const deadlift = movementHowTo("Hand-to-hand deadlift");
assert.equal(deadlift.repdbId, "kettlebell-deadlift");

const goblet = movementHowTo("Goblet squat");
assert.equal(goblet.repdbId, "goblet-squat");

const tgu = movementHowTo("Full get-up");
assert.equal(tgu.repdbId, "kettlebell-turkish-get-ups");

const child = movementHowTo("Child's pose");
assert.equal(child.repdbId, "childs-pose");
assert.equal(child.frames?.length, 1);

const hike = movementHowTo("Hike pass");
assert.equal(hike.frames, null);
assert.ok(hike.cues.some((cue) => /ribs/i.test(cue)));
assert.ok(hike.cues.some((cue) => /setting the bell down/i.test(cue)));
assert.ok(/ribs|forearms/i.test(hike.piece));
assert.ok(/swing/i.test(hike.ignore));

const roll = movementHowTo("Roll to elbow");
assert.equal(roll.mapped, true);
assert.equal(roll.frames, null);
assert.ok(/elbow/i.test(roll.piece));
assert.ok(/hand|stand/i.test(roll.ignore));

const stretch = movementHowTo("World's greatest stretch");
assert.ok(stretch.frames?.every((frame) => frame.includes("worlds-greatest-stretch")));

assert.equal(movementHowTo("Not a real block").mapped, false);
assert.ok(REPDB_CREDIT.includes("RepDB (repdb.co)"));
assert.ok(withRepdb.size > 20);

console.log(`movement how-to checks passed (${withRepdb.size} repdb, ${withGuide.size} drawings)`);
