import assert from "node:assert/strict";
import { BEND_REPS, BEND_SESSIONS, bendLine, focusTotals } from "./focusBend.ts";
import { buildLearnedTemplate, matchCatalogPlan, resolveLearnName } from "./learnSkill.ts";
import { QUIET_STOP_SEC, quietStopDelaysMs } from "./quietStop.ts";
import { createSession, templateForSession } from "./session.ts";
import { MODULES } from "./taxonomy.ts";
import { getTemplate, TEMPLATES } from "./templates.ts";
import type { WorkoutSession } from "./types.ts";

assert.equal(QUIET_STOP_SEC, 10);
for (const phase of ["warmup", "form", "bulk", "cooldown"] as const) {
  assert.deepEqual(quietStopDelaysMs("session-quiet", phase), [], phase);
}
const delays = quietStopDelaysMs("session-quiet", "skill");
assert.ok(delays.length === 1 || delays.length === 2);
assert.ok(delays[0] >= 8000 && delays[0] < 16000);
if (delays[1] != null) assert.ok(delays[1] >= delays[0] + QUIET_STOP_SEC * 1000);
assert.deepEqual(quietStopDelaysMs("session-quiet", "skill"), delays);
assert.notDeepEqual(quietStopDelaysMs("other-session", "skill"), delays);

assert.equal(matchCatalogPlan("Swing Foundation")?.id, "swing-foundation");
assert.equal(matchCatalogPlan("Clean Path")?.id, "clean-path");
assert.equal(matchCatalogPlan("Get-Up Primer")?.id, "get-up-primer");
assert.equal(matchCatalogPlan("Hike Only")?.id, "hike-only");
assert.equal(matchCatalogPlan("roll to elbow")?.id, "roll-to-elbow");
assert.equal(matchCatalogPlan("Kettlebell skill practice")?.id, "swing-foundation");
assert.equal(matchCatalogPlan("hike")?.id, "hike-only");
assert.equal(matchCatalogPlan("The two-hand swing")?.id, "swing-foundation");

const kept = ["swing-foundation", "clean-path", "get-up-primer", "hike-only", "roll-to-elbow"];
for (const id of kept) assert.ok(TEMPLATES.some((template) => template.id === id), id);
const kettlebell = MODULES.find((module) => module.id === "mod_kettlebell");
assert.ok(kettlebell);
assert.deepEqual(kettlebell?.templateIds.slice(0, 3), ["tpl_swing", "tpl_clean", "tpl_getup"]);
assert.ok(kettlebell?.templateIds.includes("tpl_hike"));
assert.ok(kettlebell?.templateIds.includes("tpl_roll"));

const hike = getTemplate("hike-only");
const roll = getTemplate("roll-to-elbow");
assert.ok(hike && roll);
assert.deepEqual(
  hike?.phases.find((step) => step.id === "skill")?.blocks.map((item) => item.name),
  ["Hike pass"],
);
assert.deepEqual(
  roll?.phases.find((step) => step.id === "skill")?.blocks.map((item) => item.name),
  ["Roll to elbow"],
);
for (const id of ["form", "bulk"] as const) {
  assert.deepEqual(hike?.phases.find((step) => step.id === id)?.blocks.map((item) => item.name), ["Hike pass"]);
  assert.deepEqual(roll?.phases.find((step) => step.id === id)?.blocks.map((item) => item.name), ["Roll to elbow"]);
}

const built = buildLearnedTemplate("  paddle boarding ");
assert.equal(built.name, "Paddle boarding");
assert.equal(getTemplate(built.id), undefined);
assert.deepEqual(
  built.phases.map((step) => step.id),
  ["warmup", "skill", "form", "bulk", "cooldown"],
);
assert.equal(buildLearnedTemplate("paddle boarding").id, built.id);
const session = createSession(built, "lb");
assert.equal(session.templateId, built.id);
assert.equal(templateForSession(session)?.name, "Paddle boarding");
assert.equal(templateForSession({ templateId: "missing-plan-id" }), undefined);
assert.equal(resolveLearnName("Swing Foundation")?.kind, "plan");
assert.equal(resolveLearnName("zorbing on tuesday")?.kind, "built");
assert.equal(resolveLearnName("   "), null);

function finished(templateId: string, name: string, reps: number, startedAt: string): WorkoutSession {
  const template = getTemplate(templateId);
  assert.ok(template);
  const next = createSession(template, "lb");
  next.templateName = name;
  next.startedAt = startedAt;
  next.endedAt = startedAt;
  next.status = "complete";
  const skill = next.phases.find((step) => step.id === "skill");
  assert.ok(skill);
  skill.blocks = [{ blockId: "check", reps, sets: 1 }];
  return next;
}

const early = [
  finished("swing-foundation", "Swing Foundation", 40, "2026-10-04T12:00:00.000Z"),
  finished("swing-foundation", "Swing Foundation", 40, "2026-10-03T12:00:00.000Z"),
  finished("swing-foundation", "Swing Foundation", 40, "2026-10-02T12:00:00.000Z"),
  finished("hike-only", "Hike Only", 200, "2026-10-01T12:00:00.000Z"),
];
const earlyTotal = focusTotals(early);
assert.ok(earlyTotal);
assert.equal(earlyTotal?.templateId, "swing-foundation");
assert.equal(earlyTotal?.sessions, 3);
assert.equal(earlyTotal?.reps, 120);
assert.equal(earlyTotal?.early, true);
assert.match(bendLine(earlyTotal), /still early/i);

const bent = [
  finished("hike-only", "Hike Only", BEND_REPS / BEND_SESSIONS, "2026-10-04T12:00:00.000Z"),
  finished("hike-only", "Hike Only", BEND_REPS / BEND_SESSIONS, "2026-10-03T12:00:00.000Z"),
  finished("hike-only", "Hike Only", BEND_REPS / BEND_SESSIONS, "2026-10-02T12:00:00.000Z"),
  finished("hike-only", "Hike Only", BEND_REPS / BEND_SESSIONS, "2026-10-01T12:00:00.000Z"),
  finished("swing-foundation", "Swing Foundation", 500, "2026-09-01T12:00:00.000Z"),
];
const bentTotal = focusTotals(bent);
assert.equal(bentTotal?.sessions, BEND_SESSIONS);
assert.equal(bentTotal?.reps, BEND_REPS);
assert.equal(bentTotal?.early, false);
assert.match(bendLine(bentTotal!), /hit the bend/i);
assert.equal(bentTotal?.planName, "Hike Only");

console.log("skill-learn checks passed");
