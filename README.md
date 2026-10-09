# structr

Structr is a training PWA. Cold load is the athletic wallpaper and the centered glass dock: **Train · Plans · You**. No tab is selected until you tap one. Train opens **Train for**, Plans opens the plan catalog, and You opens the phone's sessions. Workouts run Warm-up → Skill drills → Form → THE BULK → Cool-down and stay on this device.

Kettlebell (Swing Foundation, Clean Path, Get-Up Primer) is the day-one path. Other startable plans use the same 50 Vital Animations clips. Modules that would need a bench, pull-up, row, push-up, conventional deadlift, or core work stay coming soon.

Animation: Vital Animations. How sheets show the poster, then a muted loop. Home, Plans, and Train do not load the clips.

## Routes

- `/` Wallpaper and the centered dock. Nothing selected
- `/train` Train for — Kettlebell skill (default), Get stronger, Move freer, and More goals
- `/plans` Plans — category, practice, then plan
- `/plans/browse` Same Plans sheet
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

Train with no finished session opens Train for. After a finished session, Train offers the last template or Pick plan, which opens Train for. An in-progress session resumes. Leaving a session reopens the dock tab that was selected.

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
