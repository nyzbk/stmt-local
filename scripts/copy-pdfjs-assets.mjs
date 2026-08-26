import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "node_modules/pdfjs-dist/standard_fonts");
const dest = join(root, "public/standard_fonts");

if (!existsSync(src)) {
  console.warn("[copy-pdfjs-assets] pdfjs-dist/standard_fonts not found — skip");
  process.exit(0);
}
mkdirSync(join(root, "public"), { recursive: true });
cpSync(src, dest, { recursive: true });
console.log("[copy-pdfjs-assets] copied standard_fonts → public/standard_fonts");
