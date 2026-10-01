import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { PHASE_PATH } from "@/lib/kettlebellInfo";
import type { Block, BriefSection, Inline, ParsedBrief } from "@/lib/briefs";
import type { InfoEntry } from "@/lib/taxonomy";
import { StartPlanButton } from "./StartPlanButton";
import { SoonNotify } from "./SoonNotify";
import styles from "./kettlebellInfo.module.css";

const PHRASES: { phrase: string; href: string }[] = [
  { phrase: "Get-Up Primer", href: "/plans/get-up-primer" },
  { phrase: "Kettlebell skill", href: "/plans" },
  { phrase: "Calisthenics ladder", href: "/info/calisthenics_ladder" },
  { phrase: "Daily mobility", href: "/info/daily_mobility" },
];

function plain(inlines: Inline[]): string {
  return inlines.map((part) => part.v).join("");
}

function linkPhrases(value: string): ReactNode[] {
  const pattern = new RegExp(`(${PHRASES.map((item) => item.phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const bits = value.split(pattern);
  return bits.map((bit, index) => {
    const found = PHRASES.find((item) => item.phrase === bit);
    if (!found) return bit;
    return (
      <Link key={`${bit}-${index}`} className={styles.inlineLink} href={found.href}>
        {bit}
      </Link>
    );
  });
}

function Rich({ inlines }: { inlines: Inline[] }) {
  return (
    <>
      {inlines.map((part, index) => {
        if (part.t === "strong") return <strong key={index}>{linkPhrases(part.v)}</strong>;
        if (part.t === "em") return <em key={index}>{linkPhrases(part.v)}</em>;
        if (part.t === "code") return <code key={index}>{part.v}</code>;
        return <span key={index}>{linkPhrases(part.v)}</span>;
      })}
    </>
  );
}

function isQuestion(block: Block): boolean {
  return block.t === "p" && block.inlines.length === 1 && block.inlines[0].t === "strong";
}

function TableBlock({ block }: { block: Extract<Block, { t: "table" }> }) {
  const labels = block.headers.map(plain).join(" ").toLowerCase();
  const miss = labels.includes("mistake") || labels.includes("better cue");
  if (miss) {
    return (
      <ul className={styles.misses}>
        {block.rows.map((row, index) => (
          <li key={index}>
            <p className={styles.missName}>
              <Rich inlines={row[0] ?? []} />
            </p>
            {row[1] ? (
              <p className={styles.missLook}>
                <Rich inlines={row[1]} />
              </p>
            ) : null}
            {row[2] ? (
              <p className={styles.missCue}>
                <Rich inlines={row[2]} />
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={styles.pairs}>
      {block.rows.map((row, index) => (
        <li key={index}>
          <strong>
            <Rich inlines={row[0] ?? []} />
          </strong>
          {row.slice(1).map((cell, cellIndex) => (
            <span key={cellIndex}>
              <Rich inlines={cell} />
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
}

function Blocks({ blocks, faq }: { blocks: Block[]; faq: boolean }) {
  const nodes: ReactNode[] = [];
  let i = 0;
  while (i < blocks.length) {
    const block = blocks[i];
    if (faq && isQuestion(block) && block.t === "p") {
      const answer: Block[] = [];
      i += 1;
      while (i < blocks.length && !isQuestion(blocks[i])) {
        answer.push(blocks[i]);
        i += 1;
      }
      nodes.push(
        <details key={`q-${i}`} className={styles.panel} name="module-faq">
          <summary className={`${styles.summary} ${styles.question}`}>
            {plain(block.inlines)}
            <span className={styles.plus} aria-hidden="true" />
          </summary>
          <div className={styles.panelBody}>
            <Blocks blocks={answer} faq={false} />
          </div>
        </details>,
      );
      continue;
    }

    if (block.t === "h3") {
      const body: Block[] = [];
      i += 1;
      while (i < blocks.length && blocks[i].t !== "h3") {
        body.push(blocks[i]);
        i += 1;
      }
      nodes.push(
        <article key={`h3-${block.text}`} className={`${styles.template} ${styles.h3card}`}>
          <h3>{block.text}</h3>
          <Blocks blocks={body} faq={faq} />
        </article>,
      );
      continue;
    }

    nodes.push(<BlockView key={`b-${i}`} block={block} />);
    i += 1;
  }
  return <>{nodes}</>;
}

function BlockView({ block }: { block: Block }) {
  if (block.t === "p") {
    return (
      <p className={styles.prose}>
        <Rich inlines={block.inlines} />
      </p>
    );
  }
  if (block.t === "quote") {
    return (
      <p className={styles.safetyNote}>
        <Rich inlines={block.inlines} />
      </p>
    );
  }
  if (block.t === "ul") {
    return (
      <ul className={styles.bullets}>
        {block.items.map((item, index) => (
          <li key={index}>
            <Rich inlines={item} />
          </li>
        ))}
      </ul>
    );
  }
  if (block.t === "ol") {
    return (
      <ol className={styles.ordered}>
        {block.items.map((item, index) => (
          <li key={index}>
            <Rich inlines={item} />
          </li>
        ))}
      </ol>
    );
  }
  if (block.t === "table") return <TableBlock block={block} />;
  return null;
}

function SectionView({ section }: { section: BriefSection }) {
  const faq = /faq/i.test(section.heading);
  const templates = /template/i.test(section.heading);
  return (
    <section className={styles.section} aria-labelledby={section.heading}>
      <h2 id={section.heading}>{section.heading}</h2>
      {faq ? <div className={styles.faq}>{<Blocks blocks={section.blocks} faq />}</div> : <Blocks blocks={section.blocks} faq={false} />}
      {templates ? <p className={styles.defaultNote}>These templates aren’t startable yet.</p> : null}
    </section>
  );
}

export function BriefInfo({ entry, brief }: { entry: InfoEntry; brief: ParsedBrief }) {
  return (
    <main className={styles.page} data-info={entry.slug} data-status={entry.status}>
      <div className={styles.bar}>
        <Link className={styles.back} href="/plans">
          ‹ Train for
        </Link>
      </div>
      <div className={styles.wrap}>
        <header className={styles.hero}>
          <p className={styles.crumbs}>{entry.crumbs.join(" → ")}</p>
          <h1>{entry.title}</h1>
          <p className={styles.promise}>{entry.promise}</p>
          {entry.status === "soon" ? (
            <p className={styles.soonPill}>Coming soon · nothing here starts a session</p>
          ) : null}
        </header>

        {brief.sections.map((section, index) => (
          <Fragment key={section.heading}>
            <SectionView section={section} />
            {index === 0 ? (
              <section className={styles.section} aria-labelledby="phase-path">
                <h2 id="phase-path">Five phases</h2>
                <p className={styles.prose}>Every session walks this path. The order stays fixed.</p>
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
            ) : null}
          </Fragment>
        ))}

        {entry.bridgeGetUp ? (
          <section className={styles.section} aria-labelledby="getup-bridge">
            <div className={`${styles.card} ${styles.bridge}`}>
              <h2 id="getup-bridge">Continue with Get-Up Primer</h2>
              <p className={styles.prose}>
                The loaded get-up already lives in kettlebell. This page doesn’t start its own session. Open the
                live primer when you want the bell.
              </p>
              <div className={styles.actions}>
                <Link className={styles.ctaGhost} href="/plans/get-up-primer">
                  View Get-Up Primer
                </Link>
                <StartPlanButton templateId="get-up-primer" label="Start Get-Up Primer" className={styles.ctaPrimary} />
              </div>
            </div>
          </section>
        ) : null}

        <section className={styles.section} aria-label="Next">
          <h2>{entry.status === "soon" ? "While this is in the works" : "When you are ready"}</h2>
          <div className={styles.actions}>
            {entry.ctas.map((cta) => (
              <Link key={cta.href + cta.label} className={styles.ctaGhost} href={cta.href}>
                {cta.label}
              </Link>
            ))}
            {entry.status === "soon" ? <SoonNotify id={entry.slug} /> : null}
          </div>
        </section>

        <footer className={styles.footer}>
          <p>Practice notes for a curated catalog. Nothing here is medical advice, rehab, or a physio plan.</p>
          {entry.status === "soon" ? <p>Coming soon stays on this device until the templates are written. No generated plans.</p> : null}
        </footer>
      </div>
    </main>
  );
}
