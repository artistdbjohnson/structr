# structr

Structr is a kettlebell day-one training PWA. Cold load is the athletic wallpaper and the centered glass dock: **Train · Plans · You**. Plans opens **Train for** over that wallpaper; dismissing it returns to the pill. Workouts run Warm-up → Skill drills → Form → THE BULK → Cool-down and stay on this device.

Only Swing Foundation, Clean Path, and Get-Up Primer can start. Everything else in the catalog is coming soon.

## Routes

- `/` Wallpaper and the centered dock. Same closed default as Plans
- `/plans` Train for — Kettlebell skill (default), Get stronger, Move freer, and More goals
- `/plans/browse` Category → module → template tree
- `/plans/[id]` Phase outline and Start (`swing-foundation`, `clean-path`, `get-up-primer`)
- `/plans/info` Kettlebell module briefing
- `/info/kettlebell` Same kettlebell briefing
- `/info/dumbbell_strength` Dumbbell strength skill
- `/info/barbell_form` Barbell form basics
- `/info/calisthenics_ladder` Calisthenics ladder
- `/info/daily_mobility` Daily mobility
- `/info/balance_getup` Balance & get-up, with a bridge to Get-Up Primer
- `/info/bodyweight_skills` Bodyweight skills overview
- `/info/engine_race_prep` Engine / race prep overview
- `/info/mat_practice` Mat practice overview
- `/info/sport_prep` Sport prep overview
- `/info/stay_capable` Stay capable overview
- `/plans/info/[module]` Same Info pages

Train with no finished session opens Train for. After a finished session, Train offers the last template or Pick plan. An in-progress session resumes.

- `/session` Five-phase runner (dock hidden, resumes after refresh)
- `/session/complete` Summary
- `/you` Local history, lb/kg, clear data

## Develop

```bash
npm install
npm run dev
```

`npm run build` produces the production build.
