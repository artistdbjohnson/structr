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
  { name: "Warm-up", detail: "Get loose" },
  { name: "Skill drills", detail: "Learn it light" },
  { name: "Form", detail: "Keep it clean" },
  { name: "THE BULK", detail: "The real work", bulk: true },
  { name: "Cool-down", detail: "Slow down" },
];

export const TEMPLATE_BRIEFS: TemplateBrief[] = [
  {
    id: "swing-foundation",
    name: "Swing Foundation",
    time: "~35–45 min",
    purpose: "Get the kettlebell swing to feel like yours.",
    who: "First day with a bell, or you're coming back and the swing has turned into a squat.",
    note: "Start here if you've never done one of these.",
    phases: [
      { name: "Warm-up", detail: "A hold march, a lift up, a light goblet squat" },
      { name: "Skill drills", detail: "Light kettlebell swings" },
      { name: "Form", detail: "Swings with a bell you can own" },
      { name: "THE BULK", detail: "More kettlebell swings · aim for 7–8", bulk: true },
      { name: "Cool-down", detail: "An easy walk, then an easy bike" },
    ],
  },
  {
    id: "clean-path",
    name: "Clean Path",
    time: "~35–45 min",
    purpose: "A kettlebell overhead press. This pack has no clean.",
    who: "Once the swing feels honest, and you want the bell to go overhead.",
    phases: [
      { name: "Warm-up", detail: "A hold march, a goblet squat, a lift up" },
      { name: "Skill drills", detail: "Light kettlebell overhead presses" },
      { name: "Form", detail: "Presses with a bell you can own" },
      { name: "THE BULK", detail: "More kettlebell overhead presses · aim for 7–8", bulk: true },
      { name: "Cool-down", detail: "An easy walk, then an easy bike" },
    ],
  },
  {
    id: "get-up-primer",
    name: "Get-Up Primer",
    time: "~35–45 min",
    purpose: "Pick the bell up off the floor and stand. This pack has no get-up.",
    who: "You want the lift from the floor. A skill day. Leave the grind for another time.",
    phases: [
      { name: "Warm-up", detail: "A hip thrust, a goblet squat, a hold march" },
      { name: "Skill drills", detail: "Light kettlebell lift ups" },
      { name: "Form", detail: "Lift ups with a bell you can own" },
      { name: "THE BULK", detail: "More kettlebell lift ups · aim for 6–7", bulk: true },
      { name: "Cool-down", detail: "An easy walk, then an easy bike" },
    ],
  },
];

export const SAFETY: SafetyPanel[] = [
  {
    id: "swing",
    label: "Swing",
    job: "Your hips snap and the bell floats. Shoulders stay over your hips. Hips stay back. Your back stays long.",
    misses: [
      {
        name: "It turns into a squat",
        look: "Hips drop. Knees shoot forward.",
        cue: "Sit your hips back, like there's a wall behind you.",
      },
      {
        name: "Arms do the work",
        look: "Your shoulders lift the bell.",
        cue: "Loose arms. Hips throw it. Hands just hold on.",
      },
      {
        name: "Standing too far",
        look: "You reach for the bell before you sit back.",
        cue: "Stand about a foot behind. Hips back, then grab.",
      },
      {
        name: "Bell too high",
        look: "It flies up by your face.",
        cue: "Let it float to about chest height. A heavy bell can finish a little lower.",
      },
      {
        name: "Wobbly finish",
        look: "You sway, and your chin pokes out.",
        cue: "Stand tall. Squeeze your butt and brace your belly. Look out.",
      },
    ],
    note: "The hike is the start of the swing. This pack shows the whole swing, not the hike on its own.",
  },
  {
    id: "clean",
    label: "Press",
    job: "The bell starts at the shoulder. Press it straight overhead, then bring it back to the shoulder.",
    misses: [
      {
        name: "The bell drifts forward",
        look: "It finishes out in front of you.",
        cue: "Press it straight up. The wrist stays over the shoulder.",
      },
      {
        name: "The ribs flare",
        look: "Your low back arches to get the bell up.",
        cue: "Brace. Keep the ribs down. Use a lighter bell.",
      },
      {
        name: "A soft elbow",
        look: "The arm never quite straightens.",
        cue: "Finish tall. Pause, then lower it slowly.",
      },
      {
        name: "Shoulder up by the ear",
        look: "The shoulder shrugs as you press.",
        cue: "Keep the shoulder down, away from the ear.",
      },
    ],
  },
  {
    id: "get-up",
    label: "Lift up",
    job: "The bell starts on the floor. Hinge, grip it, and stand up. Set it back down the same way.",
    misses: [
      {
        name: "The back rounds",
        look: "You reach for the bell with a curved back.",
        cue: "Hips back first. Brace. Keep the back flat.",
      },
      {
        name: "Arms do the lift",
        look: "You yank the bell with your shoulders.",
        cue: "Drive through the heels. Hips and knees stand you up.",
      },
      {
        name: "The bell swings out",
        look: "It leaves your legs on the way up.",
        cue: "Keep it close. Stand up, then set it down close.",
      },
      {
        name: "You bounce it",
        look: "The bell hits the floor and pops back up.",
        cue: "Lower it. Let it settle. Then the next rep.",
      },
    ],
    checklist: [
      "Both hands on the handle.",
      "The back stays flat.",
      "Heels drive the stand.",
      "The bell stays close.",
      "You set it down. You don't drop it.",
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
  { range: "1–3", text: "Easy. Warm-up kind of easy." },
  { range: "4–5", text: "Working. You can still talk." },
  { range: "6–7", text: "Focused. The reps still look good." },
  { range: "7–8", text: "Hard, and still clean. Where the swing and the press usually land.", bulk: true },
  { range: "9", text: "Almost empty. A little left." },
  { range: "10", text: "Nothing left. Save this for a rare day." },
];

export const RPE_REASONS: { title: string; body: string }[] = [
  {
    title: "The Bulk is the real work.",
    body: "Warm-up and cool-down get you in and get you out. Skill and form are for learning the move. The Bulk is when you ask how hard it felt.",
  },
  {
    title: "The same bell feels different.",
    body: "Sleep, stress, and dinner change it. The number says that, so you don't have to rewrite the plan every morning.",
  },
  {
    title: "Leave a little.",
    body: "Tomorrow you want a sharp swing. Writing the number down is how you notice when to stop.",
  },
  {
    title: "So a 7 still means a 7.",
    body: "A 7 on You is a 7 next month. You can skip the number on the other parts. Mark it before you leave The Bulk.",
  },
];

export const BELLS: { who: string; kg: string; lb?: string }[] = [
  { who: "Woman, everyday strength", kg: "8 / 12 / 16 kg", lb: "≈ 18 / 26 / 35 lb" },
  { who: "Woman, already strong", kg: "12 / 16 / 20 kg" },
  { who: "Man, everyday strength", kg: "16 / 24 kg", lb: "≈ 35 / 53 lb" },
  { who: "Man, already strong", kg: "24 / 32 kg" },
];

export const GEAR_NOTES = [
  "Swings like a bell heavy enough that your arms can't fake it. Too light, and your shoulders start doing the swing.",
  "Presses and lift-ups usually want a lighter bell than the two-hand swing.",
  "One bell is enough to start. A second size gives you a light one for learning and a heavier one for The Bulk.",
  "Stepping up 4–8 kg is normal. Own a weight, then earn the next.",
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "Is this a workout app or a practice log?",
    a: "It's practice. The sessions have a shape, and The Bulk is real work. The point is better swings, presses, and lift-ups.",
  },
  {
    q: "Which plan do I open first?",
    a: "Swing Foundation, unless the swing already feels like yours and you want the press or the lift up.",
  },
  {
    q: "Do I need a number on every part?",
    a: "No. Warm-up, skill, form, and cool-down are optional. The Bulk needs a number before you move on.",
  },
  {
    q: "What if it falls apart in The Bulk?",
    a: "Stop early. Mark a higher number, or take a lighter bell next time. A clean set you cut short beats a messy one you force.",
  },
  {
    q: "Can I reorder the parts?",
    a: "These first sessions stay in order. Warm-up, then skill, then form, then The Bulk, then cool-down.",
  },
  {
    q: "How hard should The Bulk feel?",
    a: "Swing and press: about 7 or 8. Hard, and still crisp. Get-Up Primer sits more like 6 or 7. One careful lift at a time.",
  },
  {
    q: "Do I need two matching bells?",
    a: "One bell is enough at the start. Two bells at once is a later chapter.",
  },
  {
    q: "Where do I go when I'm lost?",
    a: "Open How on the move. The clip shows the shape. Film your own set from the side when you can.",
  },
];
