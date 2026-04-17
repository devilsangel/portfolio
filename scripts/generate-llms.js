import { SKILLS, TOOLS, EXPERIENCE, PROJECTS } from "../src/data/index.js";
import { writeFileSync } from "fs";

const lines = [
  `# Kevin Joseph — Frontend Engineer`,
  ``,
  `## Skills`,
  ...SKILLS.map((s) => `- ${s.name}: ${s.years} years`),
  ``,
  `## Tools`,
  TOOLS.join(", "),
  ``,
  `## Experience`,
  ...EXPERIENCE.flatMap((e) => [
    `${e.period}: ${e.role} at ${e.company}`,
    `  ${e.summary}`,
    ``,
  ]),
  `## Projects`,
  ...PROJECTS.flatMap((p) => [
    `### ${p.title} (${p.subtitle})`,
    p.description,
    `Tags: ${p.tags.join(", ")}`,
    ``,
  ]),
];

writeFileSync("public/llms.txt", lines.join("\n"));
console.log("Generated public/llms.txt");
