# structr

Structr is a training PWA. Cold load is the athletic wallpaper and the centered glass dock: **Train · Plans · You**. Plans opens **Train for** over that wallpaper; dismissing it returns to the pill. Workouts run Warm-up → Skill drills → Form → THE BULK → Cool-down and stay on this device.

Kettlebell (Swing Foundation, Clean Path, Get-Up Primer) is the day-one path. Strength, bodyweight, mobility, mat, engine, sport, and stay-capable plans can start too, built from moves the free RepDB set can picture. A few drills stay words only. See `structr-docs/REPDB.md`.

Exercise data by [RepDB](https://repdb.co) (repdb.co). Free-tier stills only — start/peak or one main frame from `exercise-dataset.com`. No paid animations, no `premium-samples`. In-app use with this credit. The pictures are not redistributed here as a dataset.

World's greatest stretch still uses Bryl Lim's Workout Guide drawings (CC BY-SA 4.0). RepDB has no match for that one.

## Routes

- `/` Wallpaper and the centered dock. Same closed default as Plans
- `/plans` Train for — Kettlebell skill (default), Get stronger, Move freer, and More goals
- `/plans/browse` Category → practice → plan
- `/plans/[id]` Phase outline and Start
- `/plans/info` Kettlebell module briefing
- `/info/kettlebell` Same kettlebell briefing
- `/info/dumbbell_strength` Dumbbell strength skill
- `/info/barbell_form` Barbell form basics
- `/info/calisthenics_ladder` Calisthenics ladder
- `/info/daily_mobility` Daily mobility
- `/info/balance_getup` Balance & get-up, with a bridge to Get-Up Primer
- `/info/bodyweight_skills` Bodyweight skills
- `/info/engine_race_prep` Engine / race prep
- `/info/mat_practice` Mat practice
- `/info/sport_prep` Sport prep
- `/info/stay_capable` Stay capable
- `/plans/info/[module]` Same Info pages

Train with no finished session opens Train for. After a finished session, Train offers the last template or Pick plan. An in-progress session resumes.

- `/session` Five-phase runner (dock hidden, resumes after refresh)
- `/session/complete` Summary
- `/you` Local history, lb/kg, credits, clear data

## Develop

```bash
npm install
npm run dev
```

`npm run build` produces the production build.

How-to checks: `npx tsx lib/movementHowTo.check.ts`
