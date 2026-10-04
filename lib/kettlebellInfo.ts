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
    purpose: "Get the two-hand swing to feel like yours.",
    who: "First day with a bell, or you're coming back and the swing has turned into a squat.",
    note: "Start here if you've never done one of these.",
    phases: [
      { name: "Warm-up", detail: "Hips, a stretch, sit-back practice, a light squat" },
      { name: "Skill drills", detail: "Set-down swings and the hike pass, light" },
      { name: "Form", detail: "Two-hand swings with a bell you can own" },
      { name: "THE BULK", detail: "More two-hand swings · aim for 7–8", bulk: true },
      { name: "Cool-down", detail: "Fold, hips, breathe" },
    ],
  },
  {
    id: "clean-path",
    name: "Clean Path",
    time: "~40–50 min",
    purpose: "A clean that lands quiet. No bang on the forearm. No yank on the shoulder.",
    who: "Once the sit-back feels honest, and you want presses or faster work next.",
    phases: [
      { name: "Warm-up", detail: "Light arm bars, upper back, goblet squat" },
      { name: "Skill drills", detail: "Hand-to-hand deadlift, clean to a hold, breathe there" },
      { name: "Form", detail: "Single cleans with a bell you can own" },
      { name: "THE BULK", detail: "Clean and push press · aim for 7–8", bulk: true },
      { name: "Cool-down", detail: "Slow shoulder circles, child's pose, breathe" },
    ],
  },
  {
    id: "get-up-primer",
    name: "Get-Up Primer",
    time: "~40–50 min",
    purpose: "Learn the get-up in pieces, then put a full one together.",
    who: "You want the balance and a strong shoulder. A skill day. Leave the grind for another time.",
    phases: [
      { name: "Warm-up", detail: "Breathing on your back, a bridge, half-kneeling" },
      { name: "Skill drills", detail: "Get-up pieces with no bell, then a light floor press" },
      { name: "Form", detail: "Partway up to the hand, then a full get-up with no bell" },
      { name: "THE BULK", detail: "Full get-up, one at a time · aim for 6–7", bulk: true },
      { name: "Cool-down", detail: "A twist, easy hamstrings, breathe" },
    ],
  },
  {
    id: "hike-only",
    name: "Hike Only",
    time: "~20–25 min",
    purpose: "Just the hike pass. The rest of the swing waits.",
    who: "The swing keeps turning into a squat, or you want the snap on its own.",
    phases: [
      { name: "Warm-up", detail: "Hips, then a sit-back with no bell" },
      { name: "Skill drills", detail: "Hike pass only" },
      { name: "Form", detail: "The same hike, light bell" },
      { name: "THE BULK", detail: "More hikes · aim for 6–7", bulk: true },
      { name: "Cool-down", detail: "Fold, breathe" },
    ],
  },
  {
    id: "roll-to-elbow",
    name: "Roll to Elbow",
    time: "~20–25 min",
    purpose: "Just the roll up to the elbow. The rest of the get-up waits.",
    who: "You get stuck leaving the floor, and a full get-up is too much for today.",
    phases: [
      { name: "Warm-up", detail: "Breathing on your back, a few bridges" },
      { name: "Skill drills", detail: "Roll to the elbow, no bell" },
      { name: "Form", detail: "The same roll, still no bell" },
      { name: "THE BULK", detail: "More rolls to the elbow · aim for 5–6", bulk: true },
      { name: "Cool-down", detail: "A twist, breathe" },
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
    note: "Hike pass: upper arms against your ribs, forearms high on the inside of your thighs. That contact is what snaps the hips. Start there. End by setting the bell down the same way.",
  },
  {
    id: "clean",
    label: "Clean",
    job: "Same backswing as the swing. Then keep the bell close so it lands on your chest and forearm instead of whipping out.",
    clock: [
      { step: "1", label: "Start" },
      { step: "2", label: "Backswing" },
      { step: "3", label: "Elbow forward" },
      { step: "4", label: "Tuck under" },
    ],
    misses: [
      {
        name: "Bell loops out",
        look: "It swings wide, then smacks your forearm.",
        cue: "Punch the elbow forward, then drop it under the bell.",
      },
      {
        name: "Throwing with the arms",
        look: "You dip and heave it up.",
        cue: "Let your hips drive it. A short elbow path keeps it close.",
      },
      {
        name: "It bangs your arm",
        look: "A hard clank when it lands.",
        cue: "Catch it soft, like it lands on a cushion.",
      },
      {
        name: "Shoulder lets go",
        look: "The bell pulls you forward on the way down.",
        cue: "Keep it close. Elbow comes back in on the way down too.",
      },
    ],
  },
  {
    id: "get-up",
    label: "Get-up",
    job: "Slow and tall. Strength and balance in one long chain. Most people get stuck rolling up to the elbow. That's a normal place to practice.",
    misses: [
      {
        name: "Shoulder up by your ear",
        look: "The elbow softens and the shoulder floats.",
        cue: "Keep the shoulder down. Wrist straight. Arm almost straight up.",
      },
      {
        name: "Heel comes up",
        look: "The heel on the bell side lifts when you sweep or stand.",
        cue: "Keep that heel down through the sweep and on the way back.",
      },
      {
        name: "You drop",
        look: "You fall from the elbow to the floor.",
        cue: "Push away from the down elbow. Let the bell balance you.",
      },
      {
        name: "Rushing the pieces",
        look: "It blurs into one motion.",
        cue: "No bell, or a light one, first. Roll, elbow, hand, kneel.",
      },
      {
        name: "Big arch in the low back",
        look: "Your low back folds when you bridge high.",
        cue: "The bridge at the elbow is optional. Think long, from knee to shoulder.",
      },
    ],
    checklist: [
      "Both hands pick the bell up and set it down.",
      "The shoulder on the bell side stays down.",
      "The free arm stays long, away from your ear.",
      "The knee touches down quietly.",
      "You finish tall, with your low back out of a deep arch.",
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
  { range: "7–8", text: "Hard, and still clean. Where swing and clean usually land.", bulk: true },
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
  "Cleans, get-ups, and presses usually want a lighter bell than the two-hand swing.",
  "One bell is enough to start. A second size gives you a light one for learning and a heavier one for The Bulk.",
  "Stepping up 4–8 kg is normal. Own a weight, then earn the next.",
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "Is this a workout app or a practice log?",
    a: "It's practice. The sessions have a shape, and The Bulk is real work. The point is better swings, cleans, and get-ups.",
  },
  {
    q: "Which plan do I open first?",
    a: "Swing Foundation, unless the sit-back already feels like yours and you want the clean or the get-up.",
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
    a: "Swing and clean: about 7 or 8. Hard, and still crisp. Get-Up Primer sits more like 6 or 7. One careful rep at a time.",
  },
  {
    q: "Do I need two matching bells?",
    a: "One bell is enough at the start. Two bells at once is a later chapter.",
  },
  {
    q: "Where do I go when I'm lost?",
    a: "Read the cues here, then find a coach when you can. Film swings from the side. Film get-ups from the front and the side.",
  },
];
