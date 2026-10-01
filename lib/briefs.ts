import fs from "fs";
import path from "path";

/** Inline runs inside paragraphs, lists, quotes, and table cells. */
export type Inline =
  | { t: "text"; v: string }
  | { t: "strong"; v: string }
  | { t: "em"; v: string }
  | { t: "code"; v: string };

export type Block =
  | { t: "p"; inlines: Inline[] }
  | { t: "h3"; text: string }
  | { t: "ul"; items: Inline[][] }
  | { t: "ol"; items: Inline[][] }
  | { t: "quote"; inlines: Inline[] }
  | { t: "table"; headers: Inline[][]; rows: Inline[][][] };

export type BriefSection = {
  heading: string;
  blocks: Block[];
};

export type ParsedBrief = {
  title: string;
  sections: BriefSection[];
};

const BRIEF_DIRS = [
  path.join(process.cwd(), "structr-docs", "modules"),
  "/workspace/structr-docs/modules",
];

/** Designer notes stay in the file. The Info page shows the practice copy. */
function skipSection(heading: string): boolean {
  return /suggested ui|ui map|ship note/i.test(heading);
}

function cleanHeading(raw: string): string {
  return raw.replace(/^\d+\.\s+/, "").trim();
}

export function parseInline(input: string): Inline[] {
  const source = input.replace(/\s+/g, " ").trim();
  if (!source) return [];
  const re = /(\*\*([^*]+)\*\*|`([^`]+)`|(^|[^*])\*([^*]+)\*)/g;
  const out: Inline[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(source))) {
    const start = match.index + (match[4] ? match[4].length : 0);
    if (start > cursor) out.push({ t: "text", v: source.slice(cursor, start) });
    if (match[2]) out.push({ t: "strong", v: match[2] });
    else if (match[3]) out.push({ t: "code", v: match[3] });
    else if (match[5]) out.push({ t: "em", v: match[5] });
    cursor = match.index + match[0].length;
  }
  if (cursor < source.length) out.push({ t: "text", v: source.slice(cursor) });
  return out.filter((part) => part.v.length > 0);
}

function isTableLine(line: string): boolean {
  return line.trim().startsWith("|");
}

function splitRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

function isSeparator(cells: string[]): boolean {
  return cells.every((cell) => /^:?-{3,}:?$/.test(cell.replace(/\s/g, "")));
}

export function parseBrief(markdown: string): ParsedBrief {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let title = "Info";
  for (const line of lines) {
    const heading = line.match(/^#\s+(.+)/);
    if (heading) {
      title = heading[1]
        .replace(/^Structr\s*·\s*/i, "")
        .replace(/\s*Info Brief$/i, "")
        .replace(/^Goal Shell\s*·\s*/i, "")
        .trim();
      break;
    }
  }

  const sections: BriefSection[] = [];
  let current: BriefSection | null = null;
  let skipping = false;
  let i = 0;

  function pushBlock(block: Block) {
    if (current && !skipping) current.blocks.push(block);
  }

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (/^##\s+/.test(trimmed)) {
      const heading = cleanHeading(trimmed.replace(/^##\s+/, ""));
      skipping = skipSection(heading);
      current = { heading, blocks: [] };
      if (!skipping) sections.push(current);
      i += 1;
      continue;
    }

    if (!current || skipping || trimmed === "" || trimmed === "---" || trimmed.startsWith("# ")) {
      i += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      pushBlock({ t: "h3", text: trimmed.replace(/^###\s+/, "") });
      i += 1;
      continue;
    }

    if (trimmed.startsWith(">")) {
      const parts: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        parts.push(lines[i].trim().replace(/^>\s?/, ""));
        i += 1;
      }
      pushBlock({ t: "quote", inlines: parseInline(parts.join(" ")) });
      continue;
    }

    if (isTableLine(trimmed)) {
      const rawRows: string[][] = [];
      while (i < lines.length && isTableLine(lines[i].trim())) {
        const cells = splitRow(lines[i]);
        if (!isSeparator(cells)) rawRows.push(cells);
        i += 1;
      }
      if (rawRows.length > 0) {
        const [header, ...rest] = rawRows;
        pushBlock({
          t: "table",
          headers: header.map((cell) => parseInline(cell)),
          rows: rest.map((row) => row.map((cell) => parseInline(cell))),
        });
      }
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: Inline[][] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(parseInline(lines[i].trim().replace(/^[-*]\s+/, "")));
        i += 1;
      }
      pushBlock({ t: "ul", items });
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: Inline[][] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(parseInline(lines[i].trim().replace(/^\d+\.\s+/, "")));
        i += 1;
      }
      pushBlock({ t: "ol", items });
      continue;
    }

    const parts: string[] = [];
    while (i < lines.length && lines[i].trim() !== "") {
      const row = lines[i].trim();
      if (
        /^#{1,3}\s+/.test(row) ||
        row.startsWith(">") ||
        isTableLine(row) ||
        /^[-*]\s+/.test(row) ||
        /^\d+\.\s+/.test(row) ||
        row === "---"
      ) {
        break;
      }
      parts.push(row);
      i += 1;
      // Bold-led lines (questions, Purpose, Who) stay their own paragraphs.
      if (/^\*\*/.test(row)) break;
      if (i < lines.length && /^\*\*/.test(lines[i].trim())) break;
    }
    if (parts.length > 0) pushBlock({ t: "p", inlines: parseInline(parts.join(" ")) });
  }

  return { title, sections: sections.filter((section) => section.blocks.length > 0) };
}

export function loadBriefMarkdown(slug: string): string | null {
  const fileName = `${slug}_BRIEF.md`;
  for (const dir of BRIEF_DIRS) {
    const full = path.join(dir, fileName);
    try {
      if (fs.existsSync(full)) return fs.readFileSync(full, "utf8");
    } catch {
      /* Try the next location. */
    }
  }
  return null;
}

export function loadParsedBrief(slug: string): ParsedBrief | null {
  const markdown = loadBriefMarkdown(slug);
  return markdown ? parseBrief(markdown) : null;
}
