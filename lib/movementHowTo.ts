/**
 * Session how-to copy.
 * Pictures come from the free RepDB stills (start/peak or one main frame)
 * when a block has a matching exercise id. World's greatest stretch keeps
 * the Workout Guide drawings — RepDB has no match for it.
 * Moves with no free still stay words only. See structr-docs/REPDB.md.
 */

import { repdbSheet, type RepdbShape } from "./repdb";

export const MOVEMENT_ART_CREDIT = {
  creator: "Bryl Lim",
  work: "Workout Guide",
  workUrl: "https://bryllim.github.io/workout-guide/",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  changes: "Unmodified copies, bundled in this app for offline use.",
} as const;

const LICENSED_STRETCHES = ["worlds-greatest-stretch"] as const;

export type LicensedStretch = (typeof LICENSED_STRETCHES)[number];

export type MovementArtSource = "repdb" | "guide";

export type MovementGuide = {
  name: string;
  cues: readonly string[];
  frames: readonly string[] | null;
  labels: readonly string[] | null;
  /** RepDB exercise id, when the stills come from that free set. */
  repdbId: string | null;
  source: MovementArtSource | null;
  mapped: boolean;
};

type Art =
  | { kind: "guide"; slug: LicensedStretch }
  | { kind: "repdb"; id: string; shape: RepdbShape };

type Move = {
  cues: readonly string[];
  art?: Art;
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
};

function move(cues: readonly string[], art?: Art): Move {
  return art ? { cues, art } : { cues };
}

const rep = (id: string, shape: RepdbShape = "pair"): Art => ({ kind: "repdb", id, shape });
const still = (id: string): Art => rep(id, "still");

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
          { kind: "guide", slug: "worlds-greatest-stretch" },
        ),
      ],
      [
        "Sit-back, no bell",
        move(
          [
            "Push your hips back, like you're about to sit in a chair.",
            "Coaches call that a hinge. Knees soft. Back stays long.",
            "No bell yet. Learn the sit-back before you pick one up.",
          ],
          rep("bodyweight-good-morning"),
        ),
      ],
      [
        "Light goblet squat",
        move(
          [
            "Bell at the chest. Elbows point down.",
            "Sit between the hips. Heels stay down.",
            "Knees follow your toes. Sit down between your feet.",
          ],
          rep("goblet-squat"),
        ),
      ],
      [
        "Set-down swings",
        move(
          [
            "Set the bell down between reps. It stays still.",
            "Stand about a foot behind it. Hips back, then grab the handle.",
            "Your hips throw it. Your arms just hang on.",
          ],
          rep("kettlebell-swing"),
        ),
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
        move(
          [
            "Push your hips back, like you're closing a car door behind you.",
            "Arms stay loose. Hips throw the bell. Hands just hold on.",
            "Let it float to about chest height, out in front of you.",
            "Stand tall at the top. Look out, toward the horizon.",
          ],
          rep("kettlebell-swing"),
        ),
      ],
      [
        "Forward fold",
        move(
          [
            "Soft knees. Let your head hang.",
            "Fold from the hips. Don't pull your low back to get lower.",
            "A minute. Just breathe.",
          ],
          still("standing-forward-fold"),
        ),
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
        move(
          [
            "On hands and knees. Slide one arm under the other.",
            "Let the shoulder and the upper back turn. Hips stay quiet.",
            "Easy range. One breath, then the other side.",
          ],
          still("thread-the-needle"),
        ),
      ],
      [
        "Goblet squat",
        move(
          [
            "Bell at the chest. Elbows point down.",
            "Sit between the hips. Heels stay down.",
            "Knees follow your toes. Sit down between your feet.",
          ],
          rep("goblet-squat"),
        ),
      ],
      [
        "Hand-to-hand deadlift",
        move(
          [
            "Hips back first. Pass the bell from hand to hand down there.",
            "Back stays tall. Keep the bell close to you.",
            "Stand up the way you'd start a swing, then set it down.",
          ],
          rep("kettlebell-deadlift"),
        ),
      ],
      [
        "Clean to rack hold",
        move(
          [
            "Same backswing as the swing, then keep the bell close.",
            "Punch the elbow forward, then drop it under the bell.",
            "Catch it soft. Hold it on your chest and forearm, and breathe.",
          ],
          rep("kettlebell-swing-clean"),
        ),
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
        move(
          [
            "Hips drive it. A short elbow path keeps the bell close.",
            "Elbow forward, then under the bell. No big loop.",
            "Catch it soft, like it lands on a cushion.",
          ],
          rep("kettlebell-swing-clean"),
        ),
      ],
      [
        "Clean + push press",
        move(
          [
            "Clean it quietly, then press from that same spot on your chest.",
            "A little help from the hips. Elbow stays close on the way down.",
            "Keep the bell near you. Don't let it crash on your forearm.",
          ],
          rep("one-arm-kettlebell-push-press"),
        ),
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
          still("childs-pose"),
        ),
      ],
      [
        "Breathing on your back",
        move(
          [
            "Lie on your back. A hand on your belly if you want a landmark.",
            "Breathe in wide and low. Breathe out long.",
            "One quiet minute.",
          ],
          still("savasana"),
        ),
      ],
      [
        "Glute bridge",
        move(
          [
            "Heels down. Squeeze your butt to lift.",
            "Ribs stay heavy. Don't crank your low back into a big arch.",
            "Eight smooth reps.",
          ],
          rep("glute-bridge"),
        ),
      ],
      [
        "Half-kneel hip open",
        move(
          [
            "Tall chest. Front heel planted.",
            "Open the front of that hip. Keep the arch out of your low back.",
            "Forty-five seconds a side. Easy and tall.",
          ],
          still("kneeling-hip-flexor-stretch"),
        ),
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
        move(
          [
            "Set your shoulder into the floor before you press.",
            "Press straight up. Wrist stays quiet.",
            "Keep it light. Same press you'll use in the get-up.",
          ],
          rep("one-arm-kettlebell-floor-press"),
        ),
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
        move(
          [
            "Same chain, with the bell. Both hands pick it up and set it down.",
            "Shoulder down, heel planted, quiet knee.",
            "Rest when you need it. One rep, then another when you're ready.",
          ],
          rep("kettlebell-turkish-get-ups"),
        ),
      ],
      [
        "Twist on your back",
        move(
          [
            "Let your knees fall to one side. Both shoulders stay on the floor.",
            "The turn lives in your ribs. Easy.",
            "Both sides.",
          ],
          still("supine-spinal-twist"),
        ),
      ],
      [
        "Easy hamstrings",
        move([
          "Straighten the leg, then soften it. Slow.",
          "Don't yank the end of the stretch.",
          "A minute a side.",
        ]),
      ],
      [
        "Bodyweight squat",
        move(
          [
            "Feet planted. Sit between your hips.",
            "Heels stay down. Knees follow your toes.",
            "Stand up the same way you sat down. No bounce at the bottom.",
          ],
          rep("bodyweight-squat"),
        ),
      ],
      [
        "Dumbbell floor press",
        move(
          [
            "Lie on the floor. Set your shoulders into it before you press.",
            "Elbows stay a little in, not flared out wide.",
            "Press up. Soft at the top. Don't slam the elbows.",
          ],
          rep("dumbbell-floor-press"),
        ),
      ],
      [
        "Dumbbell bench press",
        move(
          [
            "Shoulder blades set on the bench. Ribs stay down.",
            "Lower until the bells are near your chest. Elbows stay a bit tucked.",
            "Press up. Finish soft. The bells stay over your wrists.",
          ],
          rep("db-bench-press"),
        ),
      ],
      [
        "Kneeling wrist stretch",
        move(
          [
            "On all fours. Palms down, fingers pointing back if that's easy.",
            "Shift a little weight into the hands. Keep it mild.",
            "If the wrists complain, ease off. A little range is enough.",
          ],
          still("kneeling-wrist-stretch"),
        ),
      ],
      [
        "Cross-body shoulder stretch",
        move(
          [
            "Bring one arm across your chest. The other hand holds it there.",
            "Shoulder stays down, away from your ear.",
            "Easy pull. Both sides.",
          ],
          still("cross-body-shoulder-stretch"),
        ),
      ],
      [
        "Doorway chest stretch",
        move(
          [
            "Forearm on the door frame. Step through until the chest opens.",
            "Ribs stay down. Don't arch to get more stretch.",
            "Both sides. Stop before it pinches.",
          ],
          still("doorway-chest-stretch"),
        ),
      ],
      [
        "Single-arm dumbbell row",
        move(
          [
            "One hand and one knee on a bench, or a sturdy chair.",
            "Pull the elbow toward your hip. The chest stays pointed down.",
            "Lower the whole way. No twist to finish the rep.",
          ],
          rep("single-arm-db-row"),
        ),
      ],
      [
        "Bent-over dumbbell row",
        move(
          [
            "Hips back, back long. The bells hang under your shoulders.",
            "Pull both elbows toward your hips. Neck stays long.",
            "Lower slowly. Don't heave with your low back.",
          ],
          rep("bent-over-db-row"),
        ),
      ],
      [
        "Cat-cow",
        move(
          [
            "On hands and knees. Round the back, then gently arch.",
            "Move one breath at a time. The neck follows the back.",
            "Small and smooth. This is a warm-up, not a contest.",
          ],
          still("cat-cow"),
        ),
      ],
      [
        "Barbell back squat",
        move(
          [
            "Bar on the meat of your upper back. Hands hold it there.",
            "Sit between your hips. Knees follow your toes. Heels stay down.",
            "Stand up. Chest stays proud. Don't let the bar roll your neck.",
          ],
          rep("squat"),
        ),
      ],
      [
        "Pause squat",
        move(
          [
            "Same squat. Sit down and pause for a breath at the bottom.",
            "Don't bounce out of the hole. Own it, then stand.",
            "Light bar. The pause is the point.",
          ],
          rep("pause-squat"),
        ),
      ],
      [
        "Romanian deadlift",
        move(
          [
            "Soft knees. Push the hips back until the hamstrings talk.",
            "Bar stays close to your legs. Back stays long.",
            "Stand tall by driving the hips forward. Don't yank the bar.",
          ],
          rep("romanian-deadlift"),
        ),
      ],
      [
        "Barbell deadlift",
        move(
          [
            "Bar over the middle of your feet. Hips back, then grip.",
            "Push the floor away. The bar stays close the whole way up.",
            "Stand tall. Set it down the same path. No bounce off the floor.",
          ],
          rep("deadlift"),
        ),
      ],
      [
        "Barbell floor press",
        move(
          [
            "Lie on the floor. Bar in your hands, shoulders set.",
            "Lower until your upper arms rest on the floor. Pause.",
            "Press up. Elbows stay a little in. Wrists quiet.",
          ],
          rep("floor-press"),
        ),
      ],
      [
        "Bench press",
        move(
          [
            "Feet down. Shoulder blades pinched into the bench. Ribs quiet.",
            "Lower the bar to your chest. Elbows stay a bit tucked.",
            "Press up. Soft lock. The bar stays over your wrists.",
          ],
          rep("bench-press"),
        ),
      ],
      [
        "Dead hang",
        move(
          [
            "Hang from a bar. Arms long. Shoulders away from your ears.",
            "Breathe. Step off while you still can.",
            "A bar hang. Not a fingerboard.",
          ],
          still("dead-hang"),
        ),
      ],
      [
        "Scapular pull-ups",
        move(
          [
            "Hang. Without bending the elbows much, pull the shoulders down.",
            "The chest lifts a little. Then let it go.",
            "Small move. Own it before you chase a pull-up.",
          ],
          rep("scapular-pull-ups"),
        ),
      ],
      [
        "Inverted row",
        move(
          [
            "Bar at a height you can hang under. Body in one long line.",
            "Pull your chest toward the bar. Elbows toward your hips.",
            "Lower slowly. Raise the bar if this is too hard.",
          ],
          rep("inverted-row"),
        ),
      ],
      [
        "Negative pull-ups",
        move(
          [
            "Jump or step to the top, chin near the bar.",
            "Lower yourself as slowly as you can. All the way down.",
            "If you drop, the bar is still winning. Slow it next time.",
          ],
          rep("negative-pull-ups"),
        ),
      ],
      [
        "Pull-up",
        move(
          [
            "Hang first. Then pull until your chin clears the bar.",
            "Body stays quiet. No big swing.",
            "Lower all the way. If the chin won't clear, use the negative.",
          ],
          rep("pull-up"),
        ),
      ],
      [
        "Knee push-ups",
        move(
          [
            "Hands under your shoulders. Knees down. Body one line from head to knee.",
            "Chest goes toward the floor. Elbows stay a little in.",
            "Press back up. Don't let the hips sag.",
          ],
          rep("knee-push-ups"),
        ),
      ],
      [
        "Incline push-up",
        move(
          [
            "Hands on a bench or a sturdy ledge, higher than your feet.",
            "Body one straight line. Chest toward the hands.",
            "The higher the hands, the easier it is. Use that.",
          ],
          rep("incline-push-ups"),
        ),
      ],
      [
        "Push-up",
        move(
          [
            "Hands under shoulders. Body one long line. Toes down.",
            "Chest toward the floor. Elbows stay a little in.",
            "Press the floor away. Hips don't sag and don't pike up.",
          ],
          rep("push-up"),
        ),
      ],
      [
        "High plank",
        move(
          [
            "Hands under shoulders. Legs long. One straight line.",
            "Push the floor away so the shoulders stay broad.",
            "Breathe. Don't let the low back sag.",
          ],
          still("high-plank"),
        ),
      ],
      [
        "Split squat",
        move(
          [
            "One foot forward, one back. Drop the back knee toward the floor.",
            "Front heel stays down. Knee follows the toes.",
            "Stand up through the front foot. Both sides.",
          ],
          rep("split-squat"),
        ),
      ],
      [
        "Bodyweight reverse lunge",
        move(
          [
            "Step one foot back and drop that knee toward the floor.",
            "Front heel stays down. Torso stays tall.",
            "Push back to standing. Both sides.",
          ],
          rep("bodyweight-reverse-lunge"),
        ),
      ],
      [
        "Walking lunge",
        move(
          [
            "Step forward and drop the back knee. Front heel stays down.",
            "Stand up and bring the back foot through. Keep walking.",
            "Tall chest. Short steps if you wobble.",
          ],
          rep("walking-lunge"),
        ),
      ],
      [
        "Step-ups",
        move(
          [
            "A sturdy step. Whole foot on it. Drive up to standing.",
            "Don't push off the back toes to cheat the rise.",
            "Step down quietly. Both sides.",
          ],
          rep("step-ups"),
        ),
      ],
      [
        "Pike push-ups",
        move(
          [
            "Hips high, like a tent. Hands shoulder-width. Head toward the floor.",
            "Bend the elbows and lower the crown of your head.",
            "Press back up. This is the wall path, not a freestanding handstand.",
          ],
          rep("pike-push-ups"),
        ),
      ],
      [
        "Wall push-ups",
        move(
          [
            "Hands on the wall. Walk your feet back until you feel the push.",
            "Chest toward the wall. Elbows a little in.",
            "Easy version of a push-up. Use it when the floor is too much.",
          ],
          rep("wall-push-ups"),
        ),
      ],
      [
        "Downward-facing dog",
        move(
          [
            "Hips high. Heels reach toward the floor. They don't have to land.",
            "Arms long. Head hangs. Back feels long, not rounded hard.",
            "Pedal the feet if the calves talk.",
          ],
          still("downward-dog"),
        ),
      ],
      [
        "Dolphin pose",
        move(
          [
            "Forearms on the floor. Hips high, like a dog with the elbows down.",
            "Press the forearms away. Shoulders stay broad.",
            "A step toward the wall. Stop if the shoulders pinch.",
          ],
          still("dolphin-pose"),
        ),
      ],
      [
        "Bench dips",
        move(
          [
            "Hands on a bench behind you. Feet out front.",
            "Bend the elbows and lower. Shoulders stay down.",
            "Press back up. Bend the knees if the straight-leg version is harsh.",
          ],
          rep("bench-dips"),
        ),
      ],
      [
        "Straight bar dips",
        move(
          [
            "Support yourself on the bars, arms long, shoulders down.",
            "Lower until the shoulders stay happy. Don't chase depth that pinches.",
            "Press back up. If you can't, stay on the bench dip today.",
          ],
          rep("straight-bar-dips"),
        ),
      ],
      [
        "Dead bug",
        move(
          [
            "On your back. Arms to the ceiling. Knees bent up.",
            "Reach one arm and the opposite leg away. Low back stays heavy.",
            "Come back. Switch sides. Slow.",
          ],
          rep("dead-bug"),
        ),
      ],
      [
        "Bird-dog",
        move(
          [
            "Hands and knees. Reach one arm and the opposite leg long.",
            "Hips stay level. Don't twist to get higher.",
            "Come back. Switch. Quiet and slow.",
          ],
          rep("bird-dog"),
        ),
      ],
      [
        "Side plank",
        move(
          [
            "On one forearm, body in a straight line from head to feet.",
            "Hips up. The bottom shoulder stays away from your ear.",
            "Drop the bottom knee down if the full version shakes you apart.",
          ],
          still("side-plank"),
        ),
      ],
      [
        "Hollow body hold",
        move(
          [
            "On your back. Low back pressed into the floor.",
            "Arms and legs reach long. Lift them only as high as the back stays down.",
            "Breathe. If the back peels up, make the shape smaller.",
          ],
          still("hollow-body-hold"),
        ),
      ],
      [
        "Muscle-up practice",
        move(
          [
            "Only if a strict pull-up is already easy. Otherwise skip this.",
            "Pull high, then the chest comes over the bar. Don't kip to fake it.",
            "One careful rep beats five sloppy ones. Step down if the shoulders pinch.",
          ],
          rep("muscle-ups"),
        ),
      ],
      [
        "Pigeon",
        move(
          [
            "Front shin across, back leg long behind you.",
            "Sit tall first. Fold forward only if the front hip stays easy.",
            "Both sides. A block or a cushion under the hip is fair.",
          ],
          still("pigeon-stretch"),
        ),
      ],
      [
        "Standing side bend",
        move(
          [
            "Stand tall. Reach one arm up and lean gently to the other side.",
            "Both feet stay planted. Don't crumple the low back.",
            "Both sides. A breath at the end of the lean.",
          ],
          still("standing-side-bend"),
        ),
      ],
      [
        "Neck side stretch",
        move(
          [
            "Sit or stand tall. Ear toward one shoulder.",
            "The other shoulder stays down. A light hand on the head is enough.",
            "Both sides. No yanking.",
          ],
          still("neck-side-stretch"),
        ),
      ],
      [
        "Low lunge",
        move(
          [
            "One foot forward, back knee down. Hips sink a little.",
            "Tall chest. The front heel stays down.",
            "Both sides. Easy. This is an opener, not a sprint.",
          ],
          still("low-lunge"),
        ),
      ],
      [
        "Warrior I",
        move(
          [
            "Long stance. Front knee bends. Back heel can angle in.",
            "Arms reach up. Ribs stay down. Hips point forward as they can.",
            "Both sides. Steady breath.",
          ],
          still("warrior-one"),
        ),
      ],
      [
        "Warrior II",
        move(
          [
            "Long stance. Front knee bends over the ankle. Arms reach wide.",
            "Look over the front hand. Shoulders stay down.",
            "Both sides. Strong legs, quiet face.",
          ],
          still("warrior-two"),
        ),
      ],
      [
        "Down dog to low lunge",
        move(
          [
            "Start in the down dog. Step one foot up between your hands.",
            "Back knee can rest. Then send the hips back to the dog.",
            "Switch sides. Smooth, not a race.",
          ],
          rep("downward-dog-to-low-lunge"),
        ),
      ],
      [
        "Easy pose",
        move(
          [
            "Sit cross-legged, or on a cushion if your knees complain.",
            "Tall through the crown of the head. Shoulders down.",
            "Just sit and breathe. Nothing to perform.",
          ],
          still("easy-pose"),
        ),
      ],
      [
        "Pilates roll down",
        move(
          [
            "Sit tall. Tuck the chin and roll back one vertebra at a time.",
            "Stop where you can still come back up without a heave.",
            "Roll back up to tall. Smooth.",
          ],
          rep("pilates-roll-down"),
        ),
      ],
      [
        "Pilates spine stretch",
        move(
          [
            "Sit tall, legs long in front, as straight as is honest.",
            "Reach forward from the hips. Head follows. Don't yank.",
            "Stack back up one piece at a time.",
          ],
          rep("pilates-spine-stretch-forward"),
        ),
      ],
      [
        "Pilates saw",
        move(
          [
            "Sit tall, legs apart. Twist, then reach the hand toward the little toe.",
            "The sit bones stay down. The reach is small.",
            "Come up. Other side. Like a slow saw, not a wrench.",
          ],
          rep("pilates-saw"),
        ),
      ],
      [
        "Clamshells",
        move(
          [
            "Lie on your side, knees bent, feet together.",
            "Open the top knee. Hips stay stacked. Don't roll back.",
            "Close it slowly. Both sides.",
          ],
          rep("clamshells"),
        ),
      ],
      [
        "Single-leg glute bridge",
        move(
          [
            "Same bridge. One foot planted, the other leg long or bent up.",
            "Hips stay level. Don't let the working knee cave.",
            "Both sides. Drop to two feet if it wobbles.",
          ],
          rep("single-leg-glute-bridge"),
        ),
      ],
      [
        "Seated forward fold",
        move(
          [
            "Sit with legs long. Fold from the hips, not by rounding hard.",
            "Knees can soften. Hands rest where they rest.",
            "Breathe. Don't pull yourself deeper.",
          ],
          still("seated-forward-fold"),
        ),
      ],
      [
        "Pilates leg pull",
        move(
          [
            "A plank on your hands. Body one line.",
            "Lift one leg a little, then set it down. Hips stay still.",
            "Switch legs. If the plank falls apart, just hold the plank.",
          ],
          rep("pilates-leg-pull-front"),
        ),
      ],
      [
        "Jumping jacks",
        move(
          [
            "Jump the feet out as the hands go overhead. Back together.",
            "Land soft. Knees stay a little bent.",
            "Easy pace. This is to get warm, not to win.",
          ],
          rep("jumping-jacks"),
        ),
      ],
      [
        "Burpees",
        move(
          [
            "Squat down, step or hop the feet back, then stand up.",
            "A push-up in the middle is optional. Skip the jump if you want.",
            "Smooth and repeatable. Stop while your form is still yours.",
          ],
          still("burpees"),
        ),
      ],
      [
        "Rowing machine",
        move(
          [
            "Push with the legs first. Then the body swings back. Arms finish last.",
            "Come back: arms, body, then knees. Don't yank with the low back.",
            "The strap stays about at your lower ribs.",
          ],
          rep("rowing-machine"),
        ),
      ],
      [
        "Air bike",
        move(
          [
            "Sit tall. Feet on the pedals. Hands on the moving handles.",
            "Push and pull the arms while the legs pedal.",
            "Steady breath. Don't slump over the console.",
          ],
          still("air-bike"),
        ),
      ],
      [
        "Mountain climbers",
        move(
          [
            "A plank. Drive one knee toward the chest, then the other.",
            "Hips stay about level. Shoulders over the hands.",
            "A pace you can keep. Sloppy speed doesn't count.",
          ],
          rep("mountain-climbers"),
        ),
      ],
      [
        "High knees",
        move(
          [
            "March or jog in place. Knees come up. Land on the balls of the feet.",
            "Tall chest. Arms swing easy.",
            "Soft and short. This is a warm-up, not a sprint.",
          ],
          still("high-knees"),
        ),
      ],
      [
        "Walking",
        move(
          [
            "An easy walk. Tall. Arms swing.",
            "You should be able to talk in a full sentence.",
            "Turn around when you need to. This stays easy on purpose.",
          ],
          still("walking"),
        ),
      ],
      [
        "Stationary bike",
        move(
          [
            "Seat high enough that the knee stays a little bent at the bottom.",
            "Pedal smooth. Hands light on the bars.",
            "Easy gear. You are moving blood, not racing.",
          ],
          still("stationary-bike"),
        ),
      ],
      [
        "Incline walk",
        move(
          [
            "A slight hill on the treadmill, or any uphill you can talk through.",
            "Don't hold the rails. Shorten the step if you need to.",
            "Easy. Save the hard hills for another day.",
          ],
          still("incline-treadmill-walk"),
        ),
      ],
      [
        "Legs up the wall",
        move(
          [
            "Lie down and rest your legs up a wall, or on a chair.",
            "Arms out. Low back can have a small gap. That's fine.",
            "Stay. Breathe. Let the legs drain.",
          ],
          still("legs-up-the-wall"),
        ),
      ],
      [
        "Kettlebell reverse lunge",
        move(
          [
            "Bell at the chest, or down by your side. Step one foot back.",
            "Front heel stays down. Torso tall.",
            "Push back to standing. Both sides. Light bell.",
          ],
          rep("kettlebell-reverse-lunge"),
        ),
      ],
      [
        "Suitcase carry",
        move(
          [
            "One bell in one hand, like a heavy bag.",
            "Stand tall. Don't lean away from the bell. Short steps.",
            "Switch hands. If you tip, the bell is too heavy today.",
          ],
          still("suitcase-carry"),
        ),
      ],
      [
        "Farmer's walk",
        move(
          [
            "A bell in each hand, or one heavy bell if that's what you have.",
            "Tall. Short steps. Shoulders down, away from your ears.",
            "Set them down like you mean it. Don't drop them.",
          ],
          still("kettlebell-farmers-walk"),
        ),
      ],
      [
        "Goblet lunge",
        move(
          [
            "Bell at the chest. Step forward or back into a lunge.",
            "Front heel down. Elbows point down. Tall chest.",
            "Both sides. The bell stays glued to you.",
          ],
          rep("kettlebell-goblet-lunge"),
        ),
      ],
      [
        "Kettlebell halo",
        move(
          [
            "Bell by the horns, at your chest. Circle it around your head.",
            "Elbows stay close. The bell passes close to the hair, not out wide.",
            "Both directions. Ribs stay quiet. Slow.",
          ],
          rep("kettlebell-halo"),
        ),
      ],
      [
        "Rotational lunge",
        move(
          [
            "A lunge, then turn the chest toward the front leg.",
            "The turn comes from the ribs and hips, not a wrench of the low back.",
            "Both sides. Light bell. Smooth.",
          ],
          rep("kettlebell-rotational-lunge"),
        ),
      ],
      [
        "Kettlebell russian twist",
        move(
          [
            "Sit, heels down or light, bell at the chest.",
            "Turn side to side. The chest turns. The bell stays close.",
            "Don't use the low back as a crank. Small turns count.",
          ],
          rep("kettlebell-russian-twist"),
        ),
      ],
      [
        "Tree pose",
        move(
          [
            "Stand on one foot. The other foot rests on the calf or the inner thigh, not the knee.",
            "A hand on a counter is allowed. Eyes on something still.",
            "Both sides. Soft knee on the standing leg.",
          ],
          still("tree-pose"),
        ),
      ],
      [
        "Heel-to-toe walk",
        move(
          [
            "Walk a line. Heel touches the toe of the other foot.",
            "Eyes forward. Arms out if you want balance.",
            "Slow. A wall nearby is fine.",
          ],
          still("heel-to-toe-walk"),
        ),
      ],
      [
        "Calf raise",
        move(
          [
            "Stand tall. Rise onto the balls of the feet. Pause.",
            "Lower slowly. A hand on a wall if you wobble.",
            "Both feet. Easy and full.",
          ],
          rep("bodyweight-calf-raise"),
        ),
      ],
      [
        "Single-leg calf raise",
        move(
          [
            "One foot. Rise up, pause, lower slowly.",
            "Hold a wall. The knee stays soft, not locked hard.",
            "Both sides. Two feet if one is too shaky today.",
          ],
          rep("single-leg-calf-raise"),
        ),
      ],
      [
        "Standing calf stretch",
        move(
          [
            "Hands on a wall. One foot back, heel down.",
            "Lean until the back calf feels a stretch, not a stab.",
            "Both sides. Knee of the back leg stays straight-ish.",
          ],
          still("standing-calf-stretch"),
        ),
      ],
      [
        "Shadow boxing",
        move([
          "Hands up by the cheeks. Chin tucked a little. Light feet.",
          "Punch the air in front of you. Snap back. Don't chase power.",
          "A round, then a breath. Shoulders stay down.",
        ]),
      ],
      [
        "Fingerboard hang",
        move([
          "Only if you already use a fingerboard. Skip it if you don't.",
          "There is no fingerboard picture in the free set. The bar hang is the stand-in.",
          "Short hangs. Open the hands while you can still breathe. Shoulders down.",
        ]),
      ],
    ] as const
  ).map(([name, spec]) => [movementKey(name), spec]),
);

export function movementHowTo(name: string): MovementGuide {
  const found = MOVES[movementKey(name)];
  if (!found) {
    return { name, cues: FALLBACK_CUES, frames: null, labels: null, repdbId: null, source: null, mapped: false };
  }
  if (!found.art) {
    return { name, cues: found.cues, frames: null, labels: null, repdbId: null, source: null, mapped: true };
  }
  if (found.art.kind === "guide") {
    return {
      name,
      cues: found.cues,
      frames: FRAMES[found.art.slug],
      labels: null,
      repdbId: null,
      source: "guide",
      mapped: true,
    };
  }
  const sheet = repdbSheet(found.art.id, found.art.shape);
  return {
    name,
    cues: found.cues,
    frames: sheet.frames,
    labels: sheet.labels,
    repdbId: found.art.id,
    source: "repdb",
    mapped: true,
  };
}
