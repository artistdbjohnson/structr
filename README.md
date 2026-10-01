# structr

Structr is a kettlebell day-one training PWA. Home is an athletic wallpaper and a vertical liquid-glass dock: **Train · Plans · You**. Workouts run Warm-up → Skill drills → Form → THE BULK → Cool-down and stay on this device.

## Routes

- `/` Home dock
- `/plans` Train for — Kettlebell skill (default), Get stronger, Move freer
- `/plans/browse` Category tree. Only kettlebell templates can start
- `/plans/[id]` Phase outline and Start
- `/plans/info` Kettlebell module briefing

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
