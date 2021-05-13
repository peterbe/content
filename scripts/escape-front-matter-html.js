#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const fm = require("front-matter");

for (const file of process.argv.slice(2)) {
  console.assert(path.basename(file) === "index.html");
  const rawContent = fs.readFileSync(file, "utf-8");
  const { frontmatter, body, bodyBegin } = fm(rawContent);
  const escapedFrontmatter = frontmatter
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const height = escapedFrontmatter.match(/\n/g).length + 2 + 1;
  const padding = bodyBegin - 1 - height;
  const extraWhitespace = "\n".repeat(padding);
  const newBody = `---\n${escapedFrontmatter}\n---\n${extraWhitespace}${body}\n`;
  fs.writeFileSync(file, newBody, "utf-8");
}
