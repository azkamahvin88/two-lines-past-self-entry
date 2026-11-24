// Two Lines to Your Past Self — make.fun entry (program/v1, Node 22+).
//
// Writes the entry — exactly two lines — to /output/entry.txt.
// Deterministic, no network, no model calls. The text is a fixed
// constant chosen by the author after brainstorming 12 candidates and
// scoring each against the judge brief: how concrete the moment is,
// and how clearly line 2 traces cause and effect.
//
// Line 1 warns the past self about one specific moment in a single
// sentence: the apology email to a co-founder, unsent on the night of
// 3 November 2021 and left in drafts for six months. The moment is
// dated, named, and actionable — there is exactly one thing to do
// differently, at exactly one time.
//
// Line 2 says in one sentence why it mattered and what changed: six
// silent months turned a fixable argument into a resignation, and the
// company died the day neither of them spoke first. It is a clean
// cause-and-effect chain (silence -> resignation -> the company ends),
// and the sting is that the silence was meant to avoid a hard
// conversation — the avoidance itself is what killed the company.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR (or OUTPUT_DIR)
// stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: two lines, one sentence each.
const LINES = [
  "Send the apology email to your co-founder on the night of 3 November 2021 instead of leaving it in drafts for six months.",
  "Six silent months turned a fixable argument into a resignation, and the company you built together died the day neither of you spoke first.",
];

const ENTRY = LINES.join("\n");

// Gate guard: the entry must be exactly two lines, each exactly one
// sentence (a single terminal period, nothing else). Fail loudly here
// rather than writing an entry the judge cannot read as two lines.
if (LINES.length !== 2) {
  throw new Error(`entry must be exactly two lines, got ${LINES.length}`);
}
for (const [i, line] of LINES.entries()) {
  const periods = (line.match(/\./g) ?? []).length;
  if (periods !== 1 || !line.endsWith(".") || line.trim().length === 0) {
    throw new Error(
      `line ${i + 1} must be exactly one sentence, got ${JSON.stringify(line)}`,
    );
  }
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR?.trim() ||
  process.env.OUTPUT_DIR?.trim() ||
  "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY + "\n", "utf8");

console.log(
  `Wrote ${[...ENTRY].length} characters (${LINES.length} lines) to ${outFile}`,
);
console.log(ENTRY);
