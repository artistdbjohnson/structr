# Structr Modules — Sources & Confidence

**Scope:** All briefs under `/workspace/structr-docs/modules/`  
**Researched:** 2026-10-01 (America/New_York)  
**Rule:** Only URLs actually searched or fetched. No invented quotes, numbers, or studies.  
**Kettlebell (already shipped):** see `/workspace/structr-docs/KETTLEBELL_MODULE_SOURCES.md` — not duplicated here.

---

## Tools that worked / gaps

| Tool | Result |
|------|--------|
| **WebSearch** | Dumbbell, barbell, calisthenics, CARs/mobility, balance/floor-rise, Hyrox/yoga/Pilates/sport/longevity discovery |
| **WebFetch** | Strength Basecamp big-three cues; Motive Training CARs explainer; FitNEXT goblet squat form |
| **Jina** (`r.jina.ai`) | **401 IP reputation** on anonymous queries this run — not used for primary citations |
| **yt-dlp** | On PATH; **not relied on** for these briefs (prior kettlebell run hit YT 429) |
| **agent-reach** | On PATH; social channels not unlocked — **skipped** (no cookie config) |
| **Internal docs** | `KETTLEBELL_MODULE_BRIEF.md`, `TRAIN_FOR_TAXONOMY.md`, `TRAIN_FOR_IA.md`, `MVP_IA.md` |

---

## A. `mod_dumbbell_strength` — confidence **Med–High**

| Cluster | Conf | URLs used |
|---------|------|-----------|
| Goblet squat setup / mistakes (heels, knees, upright torso) | **High** | https://fitnext.co.uk/blog/goblet-squat-form/ (fetched) · https://www.healthline.com/health/fitness-exercise/dumbbell-goblet-squat (search) |
| DB press elbows ~45°, ribs down, no momentum | **Med–High** | https://exercisepick.com/how-to-properly-dumbbell-press/ · https://dumbbellspick.com/how-to-properly-lift-dumbbells/ |
| Row: elbow path, neutral spine, no twist | **Med** | https://fitnesscfgyms.com/ultimate-checklist-for-dumbbell-workout-exercises/ |
| Pattern menu (squat/hinge/push/pull) | **Med** | Same checklist article |
| Product phases / RPE-on-Bulk | **High** (internal) | `MVP_IA.md` |

**Not claimed:** Specific starting-weight RCTs; injury-rate stats.

---

## B. `mod_barbell_form` — confidence **High** (cue synthesis) / **Med** (any one coach’s dogma)

| Cluster | Conf | URLs used |
|---------|------|-----------|
| Three-cue squat / bench / deadlift model | **High** | https://strengthbasecamp.com/blog/squat-bench-deadlift-form-beginners (fetched) |
| Tension / wedge / slack-out coaching language | **Med–High** | https://www.powerrackstrength.com/coaching-the-big-three-lifts-squat-bench-and-deadlift-done-right/ |
| Beginner fault list (knee cave, bar drift, hips shoot) | **Med–High** | https://persistenceathletics.com/fitness-tips/training/movement-basics |
| Cue-as-task framing | **Med** | https://barbell-logic.com/improve-your-learning-with-tasks/ |
| WH trainer mistake/fix video article | **Med** | https://www.womenshealthmag.com/fitness/a69732598/how-to-do-a-barbell-squat-chest-press-build-and-burn/ |
| Product model | **High** | `MVP_IA.md` · taxonomy §A |

**Not claimed:** Powerlifting injury epidemiology numbers; “perfect form or injured” absolutism (Basecamp itself cautions beginners against that panic frame).

---

## C. `mod_calisthenics_ladder` — confidence **Med–High**

| Cluster | Conf | URLs used |
|---------|------|-----------|
| Pull-up progression ladder | **High** | https://strengthinsider.com/calisthenics/calisthenics-progression-guide/ · https://fitloop.app/guides/upper-body-calisthenics |
| Advance when clean + reserve | **Med–High** | Strength Insider progression guide |
| Handstand / wall mistakes (banana back, wrists, practice fresh) | **Med–High** | https://www.gymnasetips.com/handstand-progression/ · https://summerfunfitness.com/7-reasons-why-you-cant-hold-a-handstand/ |
| Skill vs strength pairing / wrist prep culture | **Med** | https://thenicslab.com/programming-guide |
| Demand/fit in Structr catalog | **Med–High** | `TRAIN_FOR_TAXONOMY.md` §E |

**Not claimed:** Exact weeks-to-handstand guarantees; channel subscriber counts as proof.

---

## D. `mod_daily_mobility` — confidence **High** (practice definition) / **Med** (mechanistic biology)

| Cluster | Conf | URLs used |
|---------|------|-----------|
| CARs definition: active, slow, tensed, neighbors still | **High** | https://www.movewithpurpose.com/controlled-articular-rotations-guide (fetched) |
| Daily practice / “teeth brushing” framing; not whole FRC system | **High** | Same · https://www.petrafishermovement.com/cars/ |
| Hip CAR mistakes (momentum, missing corners) | **Med** | https://eathealthy365.com/avoiding-common-hip-car-exercise-errors/ |
| Morning routine tension / isolation cues | **Med** | https://www.centercirclefit.com/resources/controlled-articular-rotations-cars-everyday · https://movebetterhp.com/courses/morning-cars-routine/ |
| Cartilage / immobilization mechanistic cites inside Motive article | **Low–Med** for Info page | Listed in Motive refs — **do not paste study stats on Info UI** without reading full papers |
| Engagement demand band | **High** (taxonomy) | Hyperhuman mobility session share via `TRAIN_FOR_TAXONOMY.md` (cite taxonomy, don’t invent %) |

**Voice rule:** lifestyle mobility — never treat/rehab/physio.

---

## E. `mod_balance_getup` — confidence **Med** (practice design) / **High** (don’t medicalize)

| Cluster | Conf | URLs used |
|---------|------|-----------|
| Balance progressions (support → less contact; surfaces/tasks) | **Med–High** | https://www.acefitness.org/continuing-education/certified/march-2026/9083/how-to-design-balance-exercise-programs-for-older-adults/ |
| Practical supported balance holds | **Med** | https://www.une.edu/sites/default/files/2025-01/Balancing%20Act%20Manual%205th%20edition.pdf (search snippet; PDF not fully mirrored) |
| Backward chaining floor-rise teaching logic | **Med–High** (method exists) | https://www.mdpi.com/2077-0383/14/15/5293 · https://pmc.ncbi.nlm.nih.gov/articles/PMC13023370/ |
| Balance confidence literature overview | **Med** | https://pmc.ncbi.nlm.nih.gov/articles/PMC3283571/ |
| Get-up segment cues | **High** | Reuse kettlebell sources: StrongFirst get-up articles in `KETTLEBELL_MODULE_SOURCES.md` — **bridge only, don’t rewrite** |
| Product framing / ACSM older adults trend | **High** | `TRAIN_FOR_TAXONOMY.md` §D/H · ACSM 2026 link therein |

**Critical:** Pilot RCTs inform that stepwise floor-rise *practice* exists; Info page must **not** claim medical fall-prevention outcomes or rehab efficacy. Campfire “capability / confidence” only.

---

## F. Goal shells — confidence by chip

| Goal ID | Conf | Primary sources |
|---------|------|-----------------|
| `goal_bodyweight` | **Med–High** fit | Taxonomy §E · calisthenics URLs in §C |
| `goal_engine` | **High** demand / **Med** Structr ownership | Taxonomy §B/F · https://www.boxrox.com/hyrox-expands-global-2026-27-season-to-2-million-athletes-and-107-races/ (via taxonomy) · Hyrox+yoga/Pilates commentary: https://fitnessgoddessretreats.com/how-to-combine-hyrox-with-yoga-or-pilates/ (directional only) |
| `goal_mat` | **High** cultural demand | Taxonomy §C · Yoga With Adriene / ACSM #5 pointers in taxonomy |
| `goal_sport` | **Med** | Taxonomy §G · DRVN / Frez / Jitsu mentions there (vendor figures soft) |
| `goal_stay_capable` | **High** trend / **Med** pay willingness | Taxonomy §H · ACSM older adults #2 · balance URLs in §E |

Goal shells intentionally **do not** invent template programming detail — names only.

---

## What we did **not** claim

- Invented percentages, study results, or “research shows X%” on Info copy  
- Medical fall-prevention guarantees, rehab protocols, or injury treatment  
- Official HYROX / StrongFirst / FRC product affiliation  
- YouTube view counts as primary evidence this run  
- Reddit consensus (channels locked / no cookies)

---

## Internal product sources (all modules)

| Doc | Used for |
|-----|----------|
| `MVP_IA.md` | Five phases; Bulk RPE required; session logging rules |
| `TRAIN_FOR_TAXONOMY.md` | Demand bands, fit tags, ship waves, chip labels |
| `TRAIN_FOR_IA.md` | Chip → comingSoon mapping; empty states; `/info/[module]` pattern |
| `KETTLEBELL_MODULE_BRIEF.md` | Voice/section template; Get-Up Primer bridge |

---

*Update this file when a module ships or a URL is re-fetched successfully (esp. Jina/yt-dlp).*
