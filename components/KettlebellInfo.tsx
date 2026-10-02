import Link from "next/link";
import { getCategory, getModule } from "@/lib/taxonomy";
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
  const kettlebell = getModule("mod_kettlebell");
  const category = kettlebell ? getCategory(kettlebell.categoryId) : undefined;

  return (
    <main className={styles.page}>
      <div className={styles.bar}>
        <Link className={styles.back} href="/plans">
          ‹ Train for
        </Link>
      </div>
      <div className={styles.wrap}>
        <header className={styles.hero}>
          {category && kettlebell ? (
            <p className={styles.crumbs}>
              {category.name}
              <span aria-hidden="true"> → </span>
              {kettlebell.name}
            </p>
          ) : null}
          <h1>Kettlebell</h1>
          <p className={styles.promise}>The swing, the clean, and the get-up. Same five-part session every time.</p>
        </header>

        <section className={styles.section} aria-labelledby="practice-heading">
          <h2 id="practice-heading">Practice</h2>
          <p className={styles.prose}>
            A kettlebell is a cast-iron ball with a handle. The swing, the clean, and the get-up are skills. You
            practice them the way you'd practice a throw — a little every time, until they feel like yours.
          </p>
          <p className={styles.prose}>
            You'll get tired. Leave something for tomorrow so you come back sharp.
          </p>
          <p className={styles.safetyNote}>
            If it hurts in a sharp way, the kind that isn't just hard work, set the bell down. Film a set, or find
            a coach when you can.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="path-heading">
          <h2 id="path-heading">Five phases</h2>
          <p className={styles.prose}>Every session goes in this order.</p>
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
          <h2 id="templates-heading">Three plans</h2>
          <p className={styles.prose}>Times are a guess. Read the plan before you start.</p>
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
          <p className={styles.prose}>Short cues. Open the move you're actually doing.</p>
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
                    <ol className={styles.clock} aria-label="Clean, step by step">
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
            After The Bulk, mark how hard it felt, from 1 to 10. People sometimes call that RPE. Here it just
            means how hard. You can skip the number on the other parts.
          </p>
          <div className={styles.card}>
            <div className={styles.gauge} role="img" aria-label="How hard, from 1 easy to 10 nothing left. 7 and 8 are the usual Bulk target.">
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
              After the last set, take one breath and tap the number that matches.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="gear-heading">
          <h2 id="gear-heading">Gear</h2>
          <p className={styles.prose}>
            A regular cast-iron bell is the usual pick. It sits flat, and the handle is easy to hold and to let
            slide. A competition bell is fine if that's what you own. This map is a starting guess. Match it to
            how strong you are today.
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
              Flat ground. A clear path for the bell. Shoes you trust, or barefoot if that's how you train. Room to
              swing, and room to set the bell down.
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
          <p className={styles.prose}>Open the plans, or just start Swing Foundation.</p>
          <div className={styles.actions}>
            <Link className={styles.ctaGhost} href="/plans">
              Train for
            </Link>
            <StartPlanButton
              templateId="swing-foundation"
              label="Start Swing Foundation"
              className={styles.ctaPrimary}
            />
          </div>
        </section>

        <footer className={styles.footer}>
          <p>These notes come from coaches who teach the swing, the clean, and the get-up.</p>
          <p>
            The 1–10 scale is just how hard it felt. If something is injured, talk to a person who can look at you.
          </p>
        </footer>
      </div>
    </main>
  );
}
