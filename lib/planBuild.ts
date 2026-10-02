import type { PhaseId, TemplateBlock, TemplatePhase } from "./types";

const INTENTS: Record<PhaseId, string> = {
  warmup: "Get warm. Easy moves. Nothing heavy yet.",
  skill: "Learn the move before you rush it.",
  form: "Working sets. Keep them clean.",
  bulk: "The main work. This is the part that counts.",
  cooldown: "Slow down. Breathe. Let it settle.",
};

export function block(
  id: string,
  name: string,
  detail: string,
  extra: Partial<TemplateBlock> = {},
): TemplateBlock {
  return { id, name, detail, ...extra };
}

export function phase(
  id: PhaseId,
  rpe: TemplatePhase["rpe"],
  blocks: TemplateBlock[],
  rpeTarget?: string,
  intent?: string,
): TemplatePhase {
  const names: Record<PhaseId, string> = {
    warmup: "Warm-up",
    skill: "Skill drills",
    form: "Form",
    bulk: "THE BULK",
    cooldown: "Cool-down",
  };
  return {
    id,
    name: names[id],
    intent: intent ?? INTENTS[id],
    rpe,
    rpeTarget,
    blocks,
  };
}
