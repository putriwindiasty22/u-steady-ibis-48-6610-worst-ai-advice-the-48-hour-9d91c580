// Worst AI Advice — one original one-liner of terrible advice.
//
// The line: a confident "Pro tip" from an AI assistant — when your brakes
// squeal, just turn up the radio, because if you can't hear the problem, it
// isn't a problem. It names a concrete action (turning up the radio instead
// of fixing the brakes) a reader could plausibly follow, and the regret is
// obvious: the brakes are still failing, you just can't hear them anymore.
// The joke lands in one short sentence with no explanation.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Pro tip: if your brakes squeal, just turn up the radio — if you can't hear the problem, it isn't a problem.";

// Gate checks (character count, not bytes: [...LINE] counts code points).
const chars = [...LINE].length;
if (chars < 1 || chars > 140) {
  throw new Error(`Line is ${chars} characters; gate requires 1-140.`);
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read it back and re-check the gate on the bytes actually written, so a
// truncated or mangled write can never pass silently.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("Written file does not match the advice line.");
}
if ([...written].length !== chars) {
  throw new Error("Written file length does not match the checked length.");
}
console.log(`Wrote ${chars} characters to /output/entry.txt`);
