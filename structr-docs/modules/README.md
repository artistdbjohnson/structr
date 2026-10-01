# Structr · Module & Goal Info Briefs

**Product:** Doug’s App Builds / Structr  
**Purpose:** Shippable Info-page briefs for App Builder (`/info/[module]` or coming-soon empty states)  
**Template voice:** Mirror `/workspace/structr-docs/KETTLEBELL_MODULE_BRIEF.md`  
**Updated:** 2026-10-01 ~10:20 EDT  
**Sources:** `SOURCES.md`

Kettlebell day-one brief stays at repo root: `../KETTLEBELL_MODULE_BRIEF.md` (do **not** rewrite).

---

## Chip → brief mapping (`TRAIN_FOR_IA.md`)

### Day-one live chips

| Chip | Live content | Briefs |
|------|--------------|--------|
| **Kettlebell skill** | `mod_kettlebell` → Swing / Clean / Get-Up | `../KETTLEBELL_MODULE_BRIEF.md` |
| **Get stronger** | Same kettlebell templates + coming-soon rows | Full modules below |
| **Move freer** | Get-Up featured + coming-soon rows | Full modules below |

### Coming-soon rows under live chips

| Chip | Coming-soon row (IA label) | Brief file | Stable ID |
|------|----------------------------|------------|-----------|
| Get stronger | Dumbbell strength skill | `dumbbell_strength_BRIEF.md` | `mod_dumbbell_strength` |
| Get stronger | Barbell form basics | `barbell_form_BRIEF.md` | `mod_barbell_form` |
| Get stronger | Calisthenics ladder | `calisthenics_ladder_BRIEF.md` | `mod_calisthenics_ladder` |
| Move freer | Daily mobility session | `daily_mobility_BRIEF.md` | `mod_daily_mobility` |
| Move freer | Balance & get-up pack | `balance_getup_BRIEF.md` | `mod_balance_getup` |

### Coming-soon goal chips

| Chip (IA) | Brief file | Stable ID |
|-----------|------------|-----------|
| Bodyweight skills | `bodyweight_skills_BRIEF.md` | `goal_bodyweight` |
| Engine / race prep | `engine_race_prep_BRIEF.md` | `goal_engine` |
| Mat practice | `mat_practice_BRIEF.md` | `goal_mat` |
| Sport prep | `sport_prep_BRIEF.md` | `goal_sport` |
| Stay capable | `stay_capable_BRIEF.md` | `goal_stay_capable` |

---

## Full module briefs (priority)

| File | One-line | Default template |
|------|----------|------------------|
| `dumbbell_strength_BRIEF.md` | DB skill practice: Goblet · Press · Row | Goblet Squat Path |
| `barbell_form_BRIEF.md` | Big-three form practice: Squat · Bench · Deadlift | Squat Basics |
| `calisthenics_ladder_BRIEF.md` | Bodyweight ladders: Pull · Push · Squat | Pull Ladder |
| `daily_mobility_BRIEF.md` | Daily joint-control / move-freer sessions | Full-Body CARs Day |
| `balance_getup_BRIEF.md` | Balance + floor-to-stand + bridge to KB Get-Up | Steady Stance |

## Goal shells (shorter)

| File | One-line |
|------|----------|
| `bodyweight_skills_BRIEF.md` | Wider bar/wall skills home; calisthenics ladder is first module neighbor |
| `engine_race_prep_BRIEF.md` | Station/erg engine prep — not a GPS run clone |
| `mat_practice_BRIEF.md` | Yoga/Pilates mat packs — distinct from daily mobility |
| `sport_prep_BRIEF.md` | Gym-side / solo sport drills — no swing AI |
| `stay_capable_BRIEF.md` | Longevity/capability framing layer — never rehab clinic |

---

## Naming notes / IA conflicts

| Topic | Resolution |
|-------|------------|
| IA “Barbell form basics” vs slug `barbell_form` | Chip/row label keeps IA words; file/ID use `barbell_form` / `mod_barbell_form` |
| IA “Balance & get-up pack” vs kettlebell Get-Up Primer | Pack **bridges**; loaded get-up Bulk stays `tpl_getup` / `mod_kettlebell` |
| “Bodyweight skills” chip vs “Calisthenics ladder” module | Chip = goal shell; ladder = first module under Get stronger / bodyweight neighborhood |
| “Move freer” vs “Daily mobility” vs “Mat practice” | Mobility = joints/CARs; Mat = yoga/Pilates flow; Move freer chip routes both + get-up |
| “Stay capable” vs balance pack | Goal framing vs concrete module; both may surface Get-Up Primer |

---

## Suggested routes

| ID | Route |
|----|-------|
| `mod_kettlebell` | `/plans/info` or `/info/kettlebell` (existing) |
| `mod_dumbbell_strength` | `/info/dumbbell_strength` |
| `mod_barbell_form` | `/info/barbell_form` |
| `mod_calisthenics_ladder` | `/info/calisthenics_ladder` |
| `mod_daily_mobility` | `/info/daily_mobility` |
| `mod_balance_getup` | `/info/balance_getup` |
| `goal_*` | Coming-soon empty on `/plans` (no Start); optional `/info/goal_<slug>` later |

---

## Handoff

App Builder sole git writer. Nest: briefs + sources only. Voice: campfire; **no clinical/medical claims**; curated catalog; AI deferred.
