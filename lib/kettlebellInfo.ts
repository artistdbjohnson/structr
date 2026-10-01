export type PhaseLine = {
  name: string;
  detail: string;
  bulk?: boolean;
};

export type TemplateBrief = {
  id: string;
  name: string;
  time: string;
  purpose: string;
  who: string;
  phases: PhaseLine[];
  note?: string;
};

export type Miss = {
  name: string;
  look: string;
  cue: string;
};

export type SafetyPanel = {
  id: string;
  label: string;
  job: string;
  misses: Miss[];
  clock?: { step: string; label: string }[];
  note?: string;
  checklist?: string[];
};

export const PHASE_PATH: PhaseLine[] = [
  { name: "Warm-up", detail: "Prep" },
  { name: "Skill drills", detail: "Groove" },
  { name: "Form", detail: "Quality" },
  { name: "THE BULK", detail: "Stimulus", bulk: true },
  { name: "Cool-down", detail: "Downshift" },
];

export const TEMPLATE_BRIEFS: TemplateBrief[] = [
  {
    id: "swing-foundation",
    name: "Swing Foundation",
    time: "~35–45 min",
    purpose: "Own the hardstyle hinge and a crisp two-hand swing.",
    who: "Day-one kettlebellers, returners cleaning up a squatty swing, anyone building a durable practice base.",
    note: "Default when you've never started.",
    phases: [
      { name: "Warm-up", detail: "Hips, stretch, empty hinge, light goblet" },
      { name: "Skill drills", detail: "Dead-stop swings and the hike pass, light" },
      { name: "Form", detail: "Two-hand swings at a working load" },
      { name: "THE BULK", detail: "Higher-volume two-hand swings · RPE 7–8", bulk: true },
      { name: "Cool-down", detail: "Fold, 90/90, breathe" },
    ],
  },
  {
    id: "clean-path",
    name: "Clean Path",
    time: "~40–50 min",
    purpose: "Groove a quiet rack — a clean that doesn't bruise the forearm or yank the shoulder.",
    who: "After the hinge feels honest. People moving toward presses, push presses, or denser ballistic work.",
    phases: [
      { name: "Warm-up", detail: "Light arm bars, thoracic openers, goblet" },
      { name: "Skill drills", detail: "Hand-to-hand deadlift, clean to a rack hold, breath in the rack" },
      { name: "Form", detail: "Single cleans at a working load" },
      { name: "THE BULK", detail: "Clean + push press · RPE 7–8", bulk: true },
      { name: "Cool-down", detail: "Shoulder CARs, child's pose, breathe" },
    ],
  },
  {
    id: "get-up-primer",
    name: "Get-Up Primer",
    time: "~40–50 min",
    purpose: "Build the get-up in pieces, then string a full rep without drama.",
    who: "Anyone who wants the mobility and packed-shoulder drill. Skill-day energy, not a grind.",
    phases: [
      { name: "Warm-up", detail: "Supine breath, glute bridge, open half-kneeling" },
      { name: "Skill drills", detail: "Naked segments — roll, elbow, post, kneel — and a packed floor press" },
      { name: "Form", detail: "Partial get-up to the hand, then a naked full get-up" },
      { name: "THE BULK", detail: "Full get-up singles · RPE 6–7", bulk: true },
      { name: "Cool-down", detail: "Twist, hamstring floss, breathe" },
    ],
  },
];

export const SAFETY: SafetyPanel[] = [
  {
    id: "swing",
    label: "Swing",
    job: "Dynamic hip hinge. Shoulders above hips, hips above knees, spine staying honest. Not a squat. Not a stiff-legged deadlift.",
    misses: [
      {
        name: "Squatty swing",
        look: "Hips drop. Knees travel forward.",
        cue: "Sit the hips back. Touch the wall behind you.",
      },
      {
        name: "Arm-puller",
        look: "Shoulders do the work.",
        cue: "Dead arms. Hips throw, arms hold.",
      },
      {
        name: "Bad set-up",
        look: "Standing too far, reaching for the bell first.",
        cue: "Stand about a foot behind. Find the hinge, then grab.",
      },
      {
        name: "Over-swing",
        look: "Bell flies to eye level or overhead.",
        cue: "Aim about chest height — 3 o'clock. A heavy bell may finish a touch lower.",
      },
      {
        name: "Soft top",
        look: "Wobbly plank, chin poking.",
        cue: "Tall plank: glutes and abs on. Eyes toward the horizon.",
      },
    ],
    note: "Hike pass: upper arms connect to the ribs, forearms high on the inner thighs — that's the trigger to snap the hips. Set-up is the first rep. Set-down is the last.",
  },
  {
    id: "clean",
    label: "Clean",
    job: "Same hike as the swing, then tame the arc so the bell does not whip out and crash into the forearm.",
    clock: [
      { step: "5", label: "Start" },
      { step: "8", label: "Hike" },
      { step: "9", label: "Elbow" },
      { step: "6", label: "Under" },
    ],
    misses: [
      {
        name: "Wide arc",
        look: "Bell loops out, then smacks the rack.",
        cue: "Jab the elbow to 9 o'clock, then drop it under to 6.",
      },
      {
        name: "Casting",
        look: "Dip and throw with the arms.",
        cue: "Hips drive. The elbow path shortens the trip.",
      },
      {
        name: "Hard catch",
        look: "Clank on the forearm.",
        cue: "Soft catch. The bell sits like it is on a spring.",
      },
      {
        name: "Unpacked shoulder",
        look: "Bell pulls you forward on the way down.",
        cue: "Keep the bell close. Jab the elbow back on the descent too.",
      },
    ],
  },
  {
    id: "get-up",
    label: "Get-up",
    job: "Slow, vertical, packed. Mobility, stability, and strength in one long chain. The early sticky point for most people is the roll to elbow.",
    misses: [
      {
        name: "Shrugging the bell arm",
        look: "Soft elbow, floating shoulder.",
        cue: "Pack the shoulder. Wrist neutral. Arm nearly vertical.",
      },
      {
        name: "Floating heel",
        look: "Bell-side heel lifts on the sweep or the stand.",
        cue: "Plant that heel through the low sweep and the reverse.",
      },
      {
        name: "Crashing down",
        look: "Drop from the elbow to the floor.",
        cue: "Push away from the down elbow. Use the bell as a counterbalance.",
      },
      {
        name: "Rushing segments",
        look: "A blurry chain.",
        cue: "Naked or light partials first. Roll, elbow, post, kneel.",
      },
      {
        name: "High bridge",
        look: "Low back flops if you bridge high.",
        cue: "Bridge at the elbow is optional. Lengthen the knee-to-shoulder line.",
      },
    ],
    checklist: [
      "Both hands pick the bell up and put it down.",
      "Bell-side shoulder stays packed.",
      "Free arm does not shrug.",
      "Silent knee on the way down.",
      "Tall finish, without folding the low back into a deep arch.",
    ],
  },
];

export const RPE_GAUGE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export function rpeZone(score: number): "easy" | "steady" | "focus" | "bulk" | "high" {
  if (score <= 3) return "easy";
  if (score <= 5) return "steady";
  if (score === 6) return "focus";
  if (score <= 8) return "bulk";
  return "high";
}

export const RPE_SCALE: { range: string; text: string; bulk?: boolean }[] = [
  { range: "1–3", text: "Easy. Warm-up feel." },
  { range: "4–5", text: "Working. Conversation still fine." },
  { range: "6–7", text: "Focused. Quality still high." },
  { range: "7–8", text: "Hard but clean. Typical swing and clean target.", bulk: true },
  { range: "9", text: "Almost max. Little left." },
  { range: "10", text: "Nothing left. We don't chase this every day." },
];

export const RPE_REASONS: { title: string; body: string }[] = [
  {
    title: "The Bulk is the main stimulus.",
    body: "Warm-up and cool-down prep and downshift. Skill drills and Form groove the pattern. The Bulk is where density and load meet — that's when “how hard was that?” matters.",
  },
  {
    title: "Your day isn't a spreadsheet.",
    body: "Sleep, stress, and last night’s dinner change how the same bell feels. RPE lets the session tell the truth without rewriting the template every morning.",
  },
  {
    title: "Practice, not a pile.",
    body: "Leave a little in the tank so tomorrow’s practice is sharp. Logging the number builds the habit of noticing.",
  },
  {
    title: "One shared language.",
    body: "A 7 on You means the same thing later. Optional on the other phases. Required before you leave The Bulk.",
  },
];

export const BELLS: { who: string; kg: string; lb?: string }[] = [
  { who: "Average-strength woman", kg: "8 / 12 / 16 kg", lb: "≈ 18 / 26 / 35 lb" },
  { who: "Stronger woman", kg: "12 / 16 / 20 kg" },
  { who: "Average-strength man", kg: "16 / 24 kg", lb: "≈ 35 / 53 lb" },
  { who: "Stronger man", kg: "24 / 32 kg" },
];

export const GEAR_NOTES = [
  "Swings often want a bell heavy enough that the arms can't cheat. Too light grooves a shoulder-driven fake swing.",
  "Cleans, get-ups, and presses often want a lighter bell than the two-hand swing.",
  "One bell can start you. A second size unlocks light for skill and heavier for The Bulk.",
  "Jumps of 4–8 kg are normal here. Own a weight, then earn the next.",
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "Is this a workout app or a practice log?",
    a: "Practice first. Sessions have structure and a real Bulk. The point is better swings, cleans, and get-ups.",
  },
  {
    q: "Which template do I open first?",
    a: "Swing Foundation, unless you already own a clean hinge and want rack or get-up work.",
  },
  {
    q: "Do I need RPE on every phase?",
    a: "No. Optional on warm-up, skill, form, and cool-down. Required on The Bulk before you advance.",
  },
  {
    q: "What if my form falls apart mid-Bulk?",
    a: "Park early. Note a higher RPE, or a lighter bell next time. Precision beats a sloppy set you force to the end.",
  },
  {
    q: "Can I reorder phases?",
    a: "Not in these day-one sessions. The five-phase order is fixed on purpose.",
  },
  {
    q: "How heavy should The Bulk feel?",
    a: "Swing and Clean: about 7–8. Hard, crisp, not a collapse. Get-Up Primer sits more like 6–7 — controlled singles.",
  },
  {
    q: "Do I need two matching bells?",
    a: "No for day one. Doubles are a later chapter.",
  },
  {
    q: "Where do I go when I'm lost on technique?",
    a: "Use the cues here, then a coach when you can. Film swings from the side. Film get-ups from the front and the side.",
  },
];
