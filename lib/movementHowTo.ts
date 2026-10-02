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
  "Follow the block as written.",
  "Quality before speed.",
  "If it bites, back off and reset.",
] as const;

export function movementKey(name: string): string {
  return name.toLowerCase().replace(/['’]/g, "").replace(/\s+/g, " ").trim();
}

function framesFor(slug: LicensedStretch): readonly string[] {
  return [1, 2, 3].map((index) => `/movement/${slug}/frame-${index}.svg`);
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
        "Empty-hand hinge",
        move([
          "Sit the hips back, like you're touching a wall behind you.",
          "Soft knees. The spine stays long.",
          "Empty hands. Groove the hinge before you pick up the bell.",
        ]),
      ],
      [
        "Light goblet squat",
        move([
          "Bell at the chest. Elbows point down.",
          "Sit between the hips. Heels stay down.",
          "Knees chase the toes. Not a forward fold.",
        ]),
      ],
      [
        "Dead-stop swing practice",
        move([
          "Park the bell dead. Reset the hinge every rep.",
          "Stand about a foot behind. Find the hinge, then grab.",
          "Hips throw. Arms just hold on.",
        ]),
      ],
      [
        "Hike pass",
        move([
          "Upper arms connect to the ribs.",
          "Forearms sit high on the inner thighs — that's the snap.",
          "Set-up is the first rep. Set-down is the last.",
        ]),
      ],
      [
        "Two-hand swing",
        move([
          "Sit the hips back. Touch the wall behind you.",
          "Dead arms. Hips throw, arms hold.",
          "Aim about chest height — 3 o'clock.",
          "Tall plank at the top. Eyes toward the horizon.",
        ]),
      ],
      [
        "Forward fold",
        move([
          "Soft knees. Let the head hang.",
          "Hinge. Don't yank the low back to get lower.",
          "One minute. Breathe.",
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
          "Roll onto your side. The bell arm stays packed and tall.",
          "The free hand walks out. The hips follow.",
          "Eyes on the bell. Light, and slow.",
        ]),
      ],
      [
        "Thoracic openers",
        move([
          "Open the upper back. Leave the low back out of it.",
          "One easy breath per reach.",
          "Warm-up range. Not a stretch contest.",
        ]),
      ],
      [
        "Goblet squat",
        move([
          "Bell at the chest. Elbows point down.",
          "Sit between the hips. Heels stay down.",
          "Knees chase the toes. Not a forward fold.",
        ]),
      ],
      [
        "Hand-to-hand deadlift",
        move([
          "Hinge first. Pass the bell from hand to hand down there.",
          "Tall spine. The bell stays close.",
          "Stand up like a swing set-up, then park it.",
        ]),
      ],
      [
        "Clean to rack hold",
        move([
          "Same hike as the swing, then tame the arc.",
          "Jab the elbow to 9 o'clock, then drop it under to 6.",
          "Soft catch. Hold the rack and breathe.",
        ]),
      ],
      [
        "Breath in rack",
        move([
          "The bell sits in the rack. Elbow tucked in.",
          "Breathe behind the shield. Ribs don't flare.",
          "The shoulder stays packed for the whole hold.",
        ]),
      ],
      [
        "Single clean",
        move([
          "Hips drive. The elbow path shortens the trip.",
          "Jab to 9, then under to 6. No wide loop.",
          "Soft catch. The bell sits like it is on a spring.",
        ]),
      ],
      [
        "Clean + push press",
        move([
          "Clean it quiet, then press from a packed rack.",
          "Hips help the press. The elbow stays close on the way down.",
          "Keep the bell near you. No crash on the forearm.",
        ]),
      ],
      [
        "Shoulder CARs",
        move([
          "One arm draws the biggest slow circle you own.",
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
        "Supine breathing",
        move([
          "On your back. A hand on the belly if you want a landmark.",
          "Inhale wide and low. Exhale long.",
          "One quiet minute.",
        ]),
      ],
      [
        "Glute bridge",
        move([
          "Heels down. Squeeze the glutes to lift.",
          "Ribs stay heavy. Don't crank the low back into a big arch.",
          "Eight smooth reps.",
        ]),
      ],
      [
        "Open half-kneeling",
        move([
          "Tall torso. Front heel planted.",
          "Open the hip. Don't dump the arch into the low back.",
          "Forty-five seconds a side. Easy and tall.",
        ]),
      ],
      [
        "Naked get-up segments",
        move([
          "Naked. Roll, elbow, post, kneel.",
          "Pack the shoulder. Wrist neutral. Arm nearly vertical.",
          "Plant the heel through the low sweep.",
        ]),
      ],
      [
        "Packed-shoulder floor press",
        move([
          "Shoulder packed into the floor before you press.",
          "Press straight. The wrist stays quiet.",
          "Light. This is the get-up's press, not a max.",
        ]),
      ],
      [
        "Partial get-up to hand",
        move([
          "Roll to the elbow, then post to the hand.",
          "Push away from the down elbow. Don't crash.",
          "Shoulder stays packed. Eyes up the arm.",
        ]),
      ],
      [
        "Full naked TGU",
        move([
          "Slow and vertical. One segment, then the next.",
          "Packed shoulder, planted heel, silent knee on the way down.",
          "Tall finish. Don't fold the low back into a deep arch.",
        ]),
      ],
      [
        "Full TGU",
        move([
          "Same chain with the bell. Both hands pick it up and put it down.",
          "Packed shoulder, planted heel, silent knee.",
          "Rest as you need. These are singles, not a race.",
        ]),
      ],
      [
        "Supine twist",
        move([
          "Knees fall to one side. Both shoulders stay on the floor.",
          "The turn lives in the ribs. Easy.",
          "Both sides.",
        ]),
      ],
      [
        "Hamstring floss",
        move([
          "Straighten and soften the leg, slow.",
          "Don't yank the end of the range.",
          "One minute a side.",
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
