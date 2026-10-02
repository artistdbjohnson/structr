/**
 * Session how-to copy, plus art only where a block name matches a
 * Workout Guide stretch (CC BY-SA 4.0, files in public/movement).
 * Kettlebell patterns stay on the Structr cue card. No MuscleWiki,
 * ExRx, ACE/NASM, or RepDB artwork.
 *
 * Nearby catalog hits that do not map cleanly stay placeholders:
 * goblet squat and glute bridge are not stretches, hamstring floss is
 * not the hamstring stretch, and forward fold is not the seated fold.
 */

export const MOVEMENT_ART_CREDIT = {
  creator: "Bryl Lim",
  work: "Workout Guide",
  workUrl: "https://bryllim.github.io/workout-guide/",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  changes: "Unmodified copies, bundled in this app for offline use.",
} as const;

const LICENSED_STRETCHES = ["worlds-greatest-stretch", "childs-pose"] as const;

export type LicensedStretch = (typeof LICENSED_STRETCHES)[number];

export type MovementGuide = {
  name: string;
  cues: readonly string[];
  frames: readonly string[] | null;
  mapped: boolean;
};

type Move = {
  cues: readonly string[];
  slug?: LicensedStretch;
};

const FALLBACK_CUES = [
  "Do it the way the block is written.",
  "Smooth before fast.",
  "If it bites, ease off and start that rep over.",
] as const;

export function movementKey(name: string): string {
  return name.toLowerCase().replace(/['’]/g, "").replace(/\s+/g, " ").trim();
}

const FRAMES: Record<LicensedStretch, readonly string[]> = {
  "worlds-greatest-stretch": [1, 2, 3].map(
    (index) => `/movement/worlds-greatest-stretch/frame-${index}.svg`,
  ),
  "childs-pose": [1, 2, 3].map((index) => `/movement/childs-pose/frame-${index}.svg`),
};

function framesFor(slug: LicensedStretch): readonly string[] {
  return FRAMES[slug];
}

function move(cues: readonly string[], slug?: LicensedStretch): Move {
  return slug ? { cues, slug } : { cues };
}

const MOVES: Record<string, Move> = Object.fromEntries(
  (
    [
      [
        "Hip circles",
        move([
          "Stand tall and draw a slow circle with one hip.",
          "The chest stays quiet. The pelvis does the drawing.",
          "Both directions. Easy range, then a little more.",
        ]),
      ],
      [
        "World's greatest stretch",
        move(
          [
            "Long lunge. The back knee can rest.",
            "Hand inside the front foot, then reach the free arm to the sky.",
            "Turn from the ribs. Four a side, unhurried.",
          ],
          "worlds-greatest-stretch",
        ),
      ],
      [
        "Sit-back, no bell",
        move([
          "Push your hips back, like you're about to sit in a chair.",
          "Coaches call that a hinge. Knees soft. Back stays long.",
          "No bell yet. Learn the sit-back before you pick one up.",
        ]),
      ],
      [
        "Light goblet squat",
        move([
          "Bell at the chest. Elbows point down.",
          "Sit between the hips. Heels stay down.",
          "Knees follow your toes. Sit down between your feet.",
        ]),
      ],
      [
        "Set-down swings",
        move([
          "Set the bell down between reps. It stays still.",
          "Stand about a foot behind it. Hips back, then grab the handle.",
          "Your hips throw it. Your arms just hang on.",
        ]),
      ],
      [
        "Hike pass",
        move([
          "Tuck your upper arms into your ribs.",
          "Forearms rest high on the inside of your thighs. That's the snap.",
          "Start from this setup. Finish by setting the bell down the same way.",
        ]),
      ],
      [
        "Two-hand swing",
        move([
          "Push your hips back, like you're closing a car door behind you.",
          "Arms stay loose. Hips throw the bell. Hands just hold on.",
          "Let it float to about chest height, out in front of you.",
          "Stand tall at the top. Look out, toward the horizon.",
        ]),
      ],
      [
        "Forward fold",
        move([
          "Soft knees. Let your head hang.",
          "Fold from the hips. Don't pull your low back to get lower.",
          "A minute. Just breathe.",
        ]),
      ],
      [
        "90/90 hip",
        move([
          "Front shin and back shin make two corners.",
          "Sit tall first. Fold over the front leg only if it stays easy.",
          "Switch sides. No prize for forcing it.",
        ]),
      ],
      [
        "Box breathe",
        move([
          "In for four. Hold four. Out for four. Hold four.",
          "Ribs quiet. Shoulders stay down.",
          "Two minutes. Let the session come down.",
        ]),
      ],
      [
        "Arm bars (light)",
        move([
          "Roll onto your side. The arm with the bell stays long and tall.",
          "Your free hand walks out. Your hips follow.",
          "Eyes on the bell. Light, and slow.",
        ]),
      ],
      [
        "Upper-back openers",
        move([
          "Open your upper back. Leave your low back out of it.",
          "One easy breath each time you reach.",
          "Easy range. Save the big effort for later.",
        ]),
      ],
      [
        "Goblet squat",
        move([
          "Bell at the chest. Elbows point down.",
          "Sit between the hips. Heels stay down.",
          "Knees follow your toes. Sit down between your feet.",
        ]),
      ],
      [
        "Hand-to-hand deadlift",
        move([
          "Hips back first. Pass the bell from hand to hand down there.",
          "Back stays tall. Keep the bell close to you.",
          "Stand up the way you'd start a swing, then set it down.",
        ]),
      ],
      [
        "Clean to rack hold",
        move([
          "Same backswing as the swing, then keep the bell close.",
          "Punch the elbow forward, then drop it under the bell.",
          "Catch it soft. Hold it on your chest and forearm, and breathe.",
        ]),
      ],
      [
        "Breathe in the rack",
        move([
          "The bell rests on your chest and forearm. That's the rack. Elbow stays in.",
          "Breathe behind the bell. Let your ribs stay quiet.",
          "Shoulder stays down, away from your ear.",
        ]),
      ],
      [
        "Single clean",
        move([
          "Hips drive it. A short elbow path keeps the bell close.",
          "Elbow forward, then under the bell. No big loop.",
          "Catch it soft, like it lands on a cushion.",
        ]),
      ],
      [
        "Clean + push press",
        move([
          "Clean it quietly, then press from that same spot on your chest.",
          "A little help from the hips. Elbow stays close on the way down.",
          "Keep the bell near you. Don't let it crash on your forearm.",
        ]),
      ],
      [
        "Slow shoulder circles",
        move([
          "One arm draws the biggest slow circle you can.",
          "Everything else stays still.",
          "Both ways. No whipping it around.",
        ]),
      ],
      [
        "Child's pose",
        move(
          [
            "Hips toward the heels. Arms long.",
            "Forehead down. Breathe into the back.",
            "Let the session land. Nothing to chase.",
          ],
          "childs-pose",
        ),
      ],
      [
        "Breathing on your back",
        move([
          "Lie on your back. A hand on your belly if you want a landmark.",
          "Breathe in wide and low. Breathe out long.",
          "One quiet minute.",
        ]),
      ],
      [
        "Glute bridge",
        move([
          "Heels down. Squeeze your butt to lift.",
          "Ribs stay heavy. Don't crank your low back into a big arch.",
          "Eight smooth reps.",
        ]),
      ],
      [
        "Half-kneel hip open",
        move([
          "Tall chest. Front heel planted.",
          "Open the front of that hip. Keep the arch out of your low back.",
          "Forty-five seconds a side. Easy and tall.",
        ]),
      ],
      [
        "Get-up pieces, no bell",
        move([
          "No bell. Roll, then elbow, then hand, then kneel.",
          "Shoulder stays down. Wrist straight. Arm almost straight up.",
          "Keep the heel down when you sweep the leg through.",
        ]),
      ],
      [
        "Floor press",
        move([
          "Set your shoulder into the floor before you press.",
          "Press straight up. Wrist stays quiet.",
          "Keep it light. Same press you'll use in the get-up.",
        ]),
      ],
      [
        "Partial get-up to hand",
        move([
          "Roll to your elbow, then push up onto your hand.",
          "Push away from the down elbow. Don't drop.",
          "Shoulder stays down. Eyes follow the arm up.",
        ]),
      ],
      [
        "Full get-up, no bell",
        move([
          "Slow. One piece, then the next. The arm stays tall.",
          "Shoulder down, heel planted, quiet knee on the way down.",
          "Finish standing tall. Keep your low back out of a deep arch.",
        ]),
      ],
      [
        "Full get-up",
        move([
          "Same chain, with the bell. Both hands pick it up and set it down.",
          "Shoulder down, heel planted, quiet knee.",
          "Rest when you need it. One rep, then another when you're ready.",
        ]),
      ],
      [
        "Twist on your back",
        move([
          "Let your knees fall to one side. Both shoulders stay on the floor.",
          "The turn lives in your ribs. Easy.",
          "Both sides.",
        ]),
      ],
      [
        "Easy hamstrings",
        move([
          "Straighten the leg, then soften it. Slow.",
          "Don't yank the end of the stretch.",
          "A minute a side.",
        ]),
      ],
    ] as const
  ).map(([name, spec]) => [movementKey(name), spec]),
);

export function movementHowTo(name: string): MovementGuide {
  const found = MOVES[movementKey(name)];
  if (!found) {
    return { name, cues: FALLBACK_CUES, frames: null, mapped: false };
  }
  const frames = found.slug ? framesFor(found.slug) : null;
  return { name, cues: found.cues, frames, mapped: true };
}
