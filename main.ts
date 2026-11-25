// Can Your Agent Pump This Bounty, Please? - entry program.
// Writes one hype line (under 200 characters) to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I told my agent to pump this bounty and it pumped so hard it entered itself. Your turn.";

const MAX_CHARS = 199;

if (LINE.length < 1 || LINE.length > MAX_CHARS) {
  throw new Error(
    `line must be 1-${MAX_CHARS} characters, got ${LINE.length}`,
  );
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
// Read-back check: the written file must hold exactly the validated line.
if (readFileSync(outPath, "utf8") !== LINE + "\n") {
  throw new Error("entry.txt contents do not match the validated line");
}
