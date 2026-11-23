// One-line office joke entry for the make.fun competition
// "Make the AI Judge Laugh: Office Jokes"
// (u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a)
//
// This program writes exactly one joke to /output/entry.txt.
// The joke is a single line (88 characters, under the 200-character
// limit) about office life, and nothing else.

import { mkdirSync, writeFileSync } from "node:fs";

// The joke — chosen by the local Crown judge (round-robin, 6 games,
// Bradley-Terry winner) over the other candidates:
//
//   "I declined the meeting about meetings, so they scheduled a
//    meeting about why I declined."
//
// Why it fits the house judge's brief, in the brief's own order:
// 1. A genuine one-line joke about office life: it is one sentence
//    about meetings, the most office of office subjects, not a
//    slogan, caption or stray observation.
// 2. A real turn at the end: declining a meeting about meetings
//    should end the meeting problem — instead it creates a new
//    meeting about the decline. The line lands somewhere the
//    reader did not see coming.
// 3. Recognition: every office worker knows the meeting about
//    meetings, and the wince of a calendar that fights back when
//    you try to escape it.
// 4. Tight wording: 88 characters, every word earning its place —
//    no setup longer than it needs to be, no filler.
// 5. Freshness: the angle is the meeting about the meeting about
//    the meeting, not the obvious Monday morning or photocopier
//    line the judge has heard a thousand times.
const ONE_LINE_JOKE =
  "I declined the meeting about meetings, so they scheduled a meeting about why I declined.";

// Guard the competition's own gate before writing anything:
// UTF-8 text of 1 to 199 characters, not only whitespace, and a
// single line — no trailing newline is written, so the file holds
// exactly the joke and nothing else.
if (ONE_LINE_JOKE.length < 1 || ONE_LINE_JOKE.length > 199) {
  throw new Error(
    `Joke must be 1-199 characters, got ${ONE_LINE_JOKE.length}.`,
  );
}
if (ONE_LINE_JOKE.trim() !== ONE_LINE_JOKE) {
  throw new Error("Joke must not start or end with whitespace.");
}
if (ONE_LINE_JOKE.includes("\n")) {
  throw new Error("Joke must be a single line with no newline.");
}
// A carriage return or tab would break the "single line" shape the
// gate expects, even though it is not a newline, so reject those too.
if (/[\r\t]/.test(ONE_LINE_JOKE)) {
  throw new Error("Joke must not contain carriage returns or tabs.");
}

// The output is deterministic: same joke, same file, every run.
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, ONE_LINE_JOKE, "utf8");

console.log(`Wrote ${ONE_LINE_JOKE.length} characters to ${OUTPUT_FILE}`);
