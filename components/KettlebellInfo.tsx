import Link from "next/link";
import {
  BELLS,
  FAQ,
  GEAR_NOTES,
  PHASE_PATH,
  RPE_GAUGE,
  RPE_REASONS,
  RPE_SCALE,
  SAFETY,
  TEMPLATE_BRIEFS,
  rpeZone,
} from "@/lib/kettlebellInfo";
import { StartPlanButton } from "./StartPlanButton";
import styles from "./kettlebellInfo.module.css";

export function KettlebellInfo() {
  return (
    <main className={styles.page}>
      <div className={styles.bar}>
        <Link className={styles.back} href="/plans">
          ‹ Plans
        </Link>
      </div>
      <div className={styles.wrap}>
        <header className={styles.hero}>
          <h1>Kettlebell</h1>
          <p className={styles.promise}>Skill practice. Three paths. Five phases.</p>
        </header>

        <section className={styles.section} aria-labelledby="practice-heading">
          <h2 id="practice-heading">Practice</h2>
          <p className={styles.prose}>
            A kettlebell is a cast-iron ball with a handle. The swing, the clean, and the get-up are skills —
            patterns you groove the way you would practice a serve or a kata.
          </p>
          <p className={styles.prose}>
            These sessions are practice, not a crush-yourself workout. Conditioning shows up when the reps stay
            clean. Leave something in the tank. Come back tomorrow sharp.
          </p>
          <p className={styles.safetyNote}>
            If something hurts sharp — not “working hard” — park the bell. Film a set, or find a coach when you
            can.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="path-heading">
          <h2 id="path-heading">Five phases</h2>
          <p className={styles.prose}>Every session walks the same path. The order stays fixed.</p>
          <div className={styles.card}>
            <ol className={styles.phases}>
              {PHASE_PATH.map((phase) => (
                <li key={phase.name} data-bulk={phase.bulk ? "true" : undefined}>
                  <span className={styles.mark} aria-hidden="true" />
                  <span className={styles.phaseLabel}>
                    <span className={styles.phaseName}>{phase.name}</span>
                    <span className={styles.phaseHint}>{phase.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="templates-heading">
          <h2 id="templates-heading">Three templates</h2>
          <p className={styles.prose}>Times are approximate. Pick with your eyes open.</p>
          <div className={styles.templates}>
            {TEMPLATE_BRIEFS.map((template) => (
              <article key={template.id} className={styles.template}>
                <div className={styles.templateHead}>
                  <h3>{template.name}</h3>
                  <span className={styles.time}>{template.time}</span>
                </div>
                <p className={styles.purpose}>{template.purpose}</p>
                <p className={styles.who}>
                  <span>Who</span>
                  {template.who}
                </p>
                <ul className={styles.shape}>
                  {template.phases.map((phase) => (
                    <li key={phase.name} data-bulk={phase.bulk ? "true" : undefined}>
                      <strong>{phase.name}</strong>
                      <span>{phase.detail}</span>
                    </li>
                  ))}
                </ul>
                {template.note ? <p className={styles.defaultNote}>{template.note}</p> : null}
                <Link className={styles.textLink} href={`/plans/${template.id}`}>
                  View plan
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="safety-heading">
          <h2 id="safety-heading">Common misses</h2>
          <p className={styles.prose}>Cues, not a lecture. Open the skill you are practicing.</p>
          <div className={styles.stack}>
            {SAFETY.map((panel) => (
              <details key={panel.id} className={styles.panel} name="kettlebell-safety" open={panel.id === "swing"}>
                <summary className={styles.summary}>
                  {panel.label}
                  <span className={styles.plus} aria-hidden="true" />
                </summary>
                <div className={styles.panelBody}>
                  <p>{panel.job}</p>
                  {panel.clock ? (
                    <ol className={styles.clock} aria-label="Clean clock">
                      {panel.clock.map((step) => (
                        <li key={step.step}>
                          <strong>{step.step}</strong>
                          <span>{step.label}</span>
                        </li>
                      ))}
                    </ol>
                  ) : null}
                  <ul className={styles.misses}>
                    {panel.misses.map((miss) => (
                      <li key={miss.name}>
                        <p className={styles.missName}>{miss.name}</p>
                        <p className={styles.missLook}>{miss.look}</p>
                        <p className={styles.missCue}>{miss.cue}</p>
                      </li>
                    ))}
                  </ul>
                  {panel.note ? <p className={styles.note}>{panel.note}</p> : null}
                  {panel.checklist ? (
                    <div>
                      <p className={styles.asideLabel}>Worth remembering</p>
                      <ul className={styles.checks}>
                        {panel.checklist.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="bulk-heading">
          <h2 id="bulk-heading">The Bulk</h2>
          <p className={styles.prose}>
            RPE is how hard it felt, on a simple 1–10 scale. You log it after The Bulk, not after every phase.
          </p>
          <div className={styles.card}>
            <div className={styles.gauge} role="img" aria-label="RPE from 1, easy, to 10, nothing left. 7 and 8 are the usual Bulk target.">
              {RPE_GAUGE.map((score) => (
                <span key={score} data-zone={rpeZone(score)}>
                  {score}
                </span>
              ))}
            </div>
            <ul className={styles.scale}>
              {RPE_SCALE.map((row) => (
                <li key={row.range} data-bulk={row.bulk ? "true" : undefined}>
                  <strong>{row.range}</strong>
                  <span>{row.text}</span>
                </li>
              ))}
            </ul>
            <ol className={styles.reasons}>
              {RPE_REASONS.map((reason, index) => (
                <li key={reason.title}>
                  <span className={styles.index}>{index + 1}</span>
                  <span>
                    <strong>{reason.title}</strong>
                    {reason.body}
                  </span>
                </li>
              ))}
            </ol>
            <p className={styles.closer}>
              After the last Bulk set, pause one breath and tap the number that matches how hard it felt.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="gear-heading">
          <h2 id="gear-heading">Gear</h2>
          <p className={styles.prose}>
            Cast bells are the usual hardstyle choice: a stable base, and a handle that balances grip and glide.
            Competition bells are fine if that's what you have. This map is a community starting point. Match it
            to your strength, not a label.
          </p>
          <div className={styles.card}>
            <ul className={styles.bells}>
              {BELLS.map((bell) => (
                <li key={bell.who}>
                  <span className={styles.bellWho}>{bell.who}</span>
                  <span className={styles.bellSize}>
                    <strong>{bell.kg}</strong>
                    {bell.lb ? <span>{bell.lb}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
            <ul className={styles.gearNotes}>
              {GEAR_NOTES.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <p className={styles.floor}>
              Flat ground, a clear arc, shoes you trust — or barefoot, if that's your practice. Room to hike and to
              park the bell.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="faq-heading">
          <h2 id="faq-heading">Questions</h2>
          <div className={styles.faq}>
            {FAQ.map((item) => (
              <details key={item.q} className={styles.panel} name="kettlebell-faq">
                <summary className={`${styles.summary} ${styles.question}`}>
                  {item.q}
                  <span className={styles.plus} aria-hidden="true" />
                </summary>
                <p className={styles.answer}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-label="Next">
          <h2>When you are ready</h2>
          <p className={styles.prose}>Open the plans, or start Swing Foundation.</p>
          <div className={styles.actions}>
            <Link className={styles.ctaGhost} href="/plans">
              Open Plans
            </Link>
            <StartPlanButton
              templateId="swing-foundation"
              label="Start Swing Foundation"
              className={styles.ctaPrimary}
            />
          </div>
        </section>

        <footer className={styles.footer}>
          <p>Technique notes drawn from hardstyle coaching standards.</p>
          <p>
            Swing, clean, and get-up cues follow that teaching. The 1–10 scale is plain effort language, not a lab
            score. Nothing here is medical advice.
          </p>
        </footer>
      </div>
    </main>
  );
}
