/**
 * The one piece that matters on a move, and what to leave alone for now.
 * The how sheet asks for the piece before it shows pictures or the cue list.
 */

export type MovementPiece = {
  piece: string;
  ignore: string;
};

function key(name: string): string {
  return name.toLowerCase().replace(/['’]/g, "").replace(/\s+/g, " ").trim();
}

function entry(name: string, piece: string, ignore: string): [string, MovementPiece] {
  return [key(name), { piece, ignore }];
}

const PIECES: Record<string, MovementPiece> = Object.fromEntries([
  entry("Hip circles", "The pelvis draws the circle. The chest stays still.", "How big the circle looks. Easy range is enough."),
  entry("World's greatest stretch", "Turn from the ribs, with the hand reaching up.", "How deep the lunge gets."),
  entry("Sit-back, no bell", "Hips go back. The back stays long.", "How low you sit. There is no bell yet."),
  entry("Light goblet squat", "Sit between your hips with the bell at your chest.", "How heavy it is. Light is the point."),
  entry("Set-down swings", "The bell starts and ends on the floor, still.", "Chaining swings together. Set it down."),
  entry("Hike pass", "Upper arms into your ribs. Forearms high on the inside of your thighs.", "How far the bell would travel on a swing. This is only the hike."),
  entry("Two-hand swing", "Your hips throw the bell. Your arms just hang on.", "How high it floats. Chest height is enough."),
  entry("Forward fold", "Fold from the hips and let the head hang.", "How close your hands get to the floor."),
  entry("90/90 hip", "Sit tall in the two corners before you fold.", "Forcing the front knee down."),
  entry("Box breathe", "Four even parts. In, hold, out, hold.", "Making the breath bigger. Quiet is enough."),
  entry("Arm bars (light)", "The arm with the bell stays long while you roll.", "How far the hips open. Eyes stay on the bell."),
  entry("Upper-back openers", "The upper back turns. The hips stay put.", "How far the arm threads through."),
  entry("Goblet squat", "Heels stay down while you sit between your feet.", "The bell bouncing off your chest."),
  entry("Hand-to-hand deadlift", "Hips back first, then pass the bell close.", "Speed of the handoff."),
  entry("Clean to rack hold", "The bell stays close and lands on your chest and forearm.", "A big loop out to the side."),
  entry("Breathe in the rack", "Breathe behind the bell. The elbow stays in.", "How long you can hold your breath."),
  entry("Single clean", "Hips drive it. The elbow path stays short.", "Heaving it up with your arm."),
  entry("Clean + push press", "Clean it quietly, then press from that same spot.", "A dip that turns into a jump."),
  entry("Slow shoulder circles", "One arm draws a slow circle. The rest of you stays still.", "Whipping the arm around."),
  entry("Child's pose", "Hips toward the heels. Forehead down. Breathe.", "Stretching harder. Nothing to chase."),
  entry("Breathing on your back", "The breath goes wide and low.", "A perfect hand position. A hand on the belly is optional."),
  entry("Glute bridge", "Squeeze your butt to lift. Ribs stay heavy.", "A big arch in the low back."),
  entry("Half-kneel hip open", "Tall chest. Open the front of the hip.", "Arching the low back to feel more."),
  entry("Get-up pieces, no bell", "One piece, then the next. Roll, elbow, hand, kneel.", "Smoothing it into one motion."),
  entry("Roll to elbow", "Roll up onto the elbow and stop there.", "The hand, the kneel, and standing. Those are other days."),
  entry("Floor press", "Set the shoulder into the floor before you press.", "Locking the elbow hard at the top."),
  entry("Partial get-up to hand", "Roll to the elbow, then push up onto the hand.", "Standing up. Stop at the hand."),
  entry("Full get-up, no bell", "The arm stays tall the whole way up and down.", "Speed. One piece, then the next."),
  entry("Full get-up", "Same tall arm, now with the bell. Shoulder stays down.", "Rushing the pieces together."),
  entry("Twist on your back", "Knees fall to one side. Both shoulders stay down.", "How far the knees go."),
  entry("Easy hamstrings", "Straighten, then soften. Don't yank the end.", "Touching your toes."),
  entry("Bodyweight squat", "Sit between your hips and stand up the same way.", "Bouncing out of the bottom."),
  entry("Dumbbell floor press", "Shoulders set. Elbows stay a little in.", "Flaring the elbows out wide."),
  entry("Dumbbell bench press", "Shoulder blades stay set on the bench. Ribs stay down.", "Bouncing the bells off your chest."),
  entry("Kneeling wrist stretch", "A little weight into the hands. Keep it mild.", "Sitting all the way back onto the wrists."),
  entry("Cross-body shoulder stretch", "Arm across the chest. That shoulder stays down.", "Pulling the arm harder."),
  entry("Doorway chest stretch", "Step through until the chest opens. Ribs stay down.", "Arching to get a bigger stretch."),
  entry("Single-arm dumbbell row", "Pull the elbow toward your hip. The chest stays pointed down.", "Twisting to finish the rep."),
  entry("Bent-over dumbbell row", "Hips back, back long, elbows toward your hips.", "Heaving with the low back."),
  entry("Cat-cow", "Round, then gently arch, one breath at a time.", "A big dramatic arch."),
  entry("Barbell back squat", "Sit between your hips. The bar stays on the meat of your upper back.", "How fast you stand up."),
  entry("Pause squat", "Own the bottom for a breath, then stand.", "Bouncing out of the hole."),
  entry("Romanian deadlift", "Hips back until the hamstrings talk. The bar stays close.", "Rounding to touch the floor."),
  entry("Barbell deadlift", "Push the floor away. The bar stays close the whole way.", "Yanking the bar off the floor."),
  entry("Barbell floor press", "Upper arms rest on the floor, then you press.", "Bouncing the arms off the floor."),
  entry("Bench press", "Bar to the chest, elbows a bit tucked, then press.", "The bar drifting toward your face."),
  entry("Dead hang", "Hang long. Shoulders away from your ears. Breathe.", "How long you can suffer. Step off while you still can."),
  entry("Scapular pull-ups", "Pull the shoulders down without much elbow bend.", "Chasing a full pull-up."),
  entry("Inverted row", "Body in one line. Pull the chest toward the bar.", "Shrugging the shoulders up to your ears."),
  entry("Negative pull-ups", "Lower yourself slowly, all the way down.", "Dropping once your chin is over the bar."),
  entry("Pull-up", "Hang first, then pull until the chin clears.", "A big swing of the body."),
  entry("Knee push-ups", "One line from head to knee. Chest goes toward the floor.", "The hips sagging."),
  entry("Incline push-up", "Body one straight line, chest toward the hands.", "How low the hands are. Higher is allowed."),
  entry("Push-up", "One long line. Elbows a little in. Press the floor away.", "A sag or a pike in the hips."),
  entry("High plank", "Push the floor away so the shoulders stay broad.", "How long you can hold a sagging back."),
  entry("Split squat", "Back knee drops. Front heel stays down.", "The front knee diving in."),
  entry("Bodyweight reverse lunge", "Step back, torso tall, front heel down.", "A short choppy step that pitches you forward."),
  entry("Walking lunge", "Step, drop, stand, and bring the back foot through.", "Leaning the chest over the front knee."),
  entry("Step-ups", "The whole foot drives you up. Don't push off the back toes.", "A step so high you have to heave."),
  entry("Pike push-ups", "Hips high. Head toward the floor. Press back up.", "A freestanding handstand. This is the pike."),
  entry("Wall push-ups", "Chest toward the wall. Elbows a little in.", "Walking the feet so far back that the shape breaks."),
  entry("Downward-facing dog", "Hips high, arms long, head hanging.", "Heels that must touch the floor."),
  entry("Dolphin pose", "Forearms down, hips high, shoulders broad.", "How close the head gets to the floor."),
  entry("Bench dips", "Bend the elbows and keep the shoulders down.", "Depth that pinches the front of the shoulder."),
  entry("Straight bar dips", "Support yourself tall first. Lower only as far as the shoulders like.", "Chest-to-bar depth on day one."),
  entry("Dead bug", "Reach away. The low back stays heavy on the floor.", "How straight the leg gets."),
  entry("Bird-dog", "Reach long. The hips stay level.", "Lifting the leg higher by twisting."),
  entry("Side plank", "One straight line. Hips up.", "A full straight-leg hold if the knee-down version is the honest one."),
  entry("Hollow body hold", "Low back pressed into the floor. Make the shape smaller if it peels up.", "How high the legs and arms look."),
  entry("Muscle-up practice", "Only if a strict pull-up is already easy. Pull high, then the chest comes over.", "A kip that fakes the rep. Skip it otherwise."),
  entry("Pigeon", "Sit tall first. Fold only if the front hip stays easy.", "Pushing the front hip into the floor."),
  entry("Standing side bend", "Reach up and lean. Both feet stay planted.", "Crumpling the low back to get further."),
  entry("Neck side stretch", "Ear toward the shoulder. The other shoulder stays down.", "Pulling on the head."),
  entry("Low lunge", "Tall chest. Front heel down. An easy sink.", "How deep the hip goes."),
  entry("Warrior I", "Long stance, arms up, ribs down.", "Forcing the hips square."),
  entry("Warrior II", "Front knee over the ankle. Arms reach wide. Shoulders down.", "The gaze, the costume, the perfect picture."),
  entry("Down dog to low lunge", "Step through, then send the hips back. Smooth.", "Racing the pass."),
  entry("Easy pose", "Sit tall and breathe. Nothing to perform.", "A perfect cross of the legs."),
  entry("Pilates roll down", "Roll back one piece at a time, only as far as you can return.", "Falling back and heaving up."),
  entry("Pilates spine stretch", "Reach from the hips. Stack back up one piece at a time.", "Yanking the hands toward the feet."),
  entry("Pilates saw", "A small twist, then a small reach. Sit bones stay down.", "Wrenching toward the toe."),
  entry("Clamshells", "Open the top knee. Hips stay stacked.", "Rolling the top hip back to get more range."),
  entry("Single-leg glute bridge", "Hips stay level on one foot.", "The working knee caving in."),
  entry("Seated forward fold", "Fold from the hips. Knees can soften.", "Pulling yourself deeper."),
  entry("Pilates leg pull", "Lift one leg a little. The hips stay still.", "A high kick. If the plank falls apart, just hold it."),
  entry("Jumping jacks", "Feet out, hands up, land soft.", "Speed. This is only to get warm."),
  entry("Burpees", "Down and back up in a shape you can repeat.", "A prize for the sloppiest fast rep."),
  entry("Rowing machine", "Legs, then body, then arms. Come back the other way.", "Yanking with the low back."),
  entry("Air bike", "Sit tall and keep a steady breath.", "Slumping over the console to go harder."),
  entry("Mountain climbers", "Drive a knee in. Hips stay about level.", "Sloppy speed."),
  entry("High knees", "Knees come up. Land soft. Chest stays tall.", "Sprinting in place."),
  entry("Walking", "An easy walk you can talk through.", "Pace. Turn around whenever you need to."),
  entry("Stationary bike", "Smooth pedals. An easy gear.", "The number on the screen."),
  entry("Incline walk", "A hill you can talk through. Don't hold the rails.", "A steep setting."),
  entry("Legs up the wall", "Legs up. Stay and breathe.", "How straight the legs are."),
  entry("Kettlebell reverse lunge", "Step back, front heel down, torso tall.", "The bell pulling you forward."),
  entry("Suitcase carry", "Stand tall with the bell in one hand. Don't lean away from it.", "How heavy it looks. If you tip, it's too heavy."),
  entry("Farmer's walk", "Tall, short steps, shoulders down.", "Leaning into a march. Set the bells down."),
  entry("Goblet lunge", "The bell stays at your chest. Front heel stays down.", "The bell drifting off your body."),
  entry("Kettlebell halo", "Circle the bell close to your head. Ribs stay quiet.", "A wide loop that wrenches you."),
  entry("Rotational lunge", "The turn comes from the ribs and hips.", "Wrenching the low back to get further around."),
  entry("Kettlebell russian twist", "The chest turns. The bell stays close.", "Using the low back as a crank."),
  entry("Tree pose", "One foot, eyes on something still. A hand on a counter is allowed.", "The free foot on the knee, and a perfect arms-up shape."),
  entry("Heel-to-toe walk", "Heel touches the toe in front. Slow.", "Looking down at your feet the whole way."),
  entry("Calf raise", "Rise up, pause, lower slowly.", "Bouncing at the bottom."),
  entry("Single-leg calf raise", "One foot, a wall if you need it, lower slowly.", "A locked hard knee."),
  entry("Standing calf stretch", "Back heel down until the calf feels a stretch, not a stab.", "Pushing the heel through the floor."),
  entry("Shadow boxing", "Hands come back to the cheeks. Snap, don't load up.", "Power. You are punching the air."),
  entry("Fingerboard hang", "Short hangs only, and only if you already use a board.", "A long hang. Skip it if you don't have a board."),
]);

function fallback(name: string): MovementPiece {
  const trimmed = name.trim() || "this";
  const base = trimmed.replace(/,\s*(easy|slow|one piece)$/i, "").trim() || trimmed;
  return {
    piece: `The shape of ${base}. Same way each time.`,
    ignore: "Speed, and anything extra around it.",
  };
}

export function hasWrittenPiece(name: string): boolean {
  return Boolean(PIECES[key(name)]);
}

export function movementPiece(name: string): MovementPiece {
  const found = PIECES[key(name)];
  if (found) return found;
  const base = name.replace(/,\s*(easy|slow|one piece)$/i, "").trim();
  const fromBase = base ? PIECES[key(base)] : undefined;
  return fromBase ?? fallback(name);
}
