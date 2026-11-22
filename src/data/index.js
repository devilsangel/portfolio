export const PROJECTS = [
  { id: "01", title: "Shared Component Library", subtitle: "Angular / Storybook", description: "Co-founded and grew an Angular component library to 50+ reusable components, documented in Storybook and shared across 6 applications in three product lines.", tags: ["Angular", "TypeScript", "Storybook", "SCSS"], accent: "#BF4A2F" },
  { id: "02", title: "Claude Code Plugin Marketplace", subtitle: "AI-Assisted Development", description: "Set up a company-wide Claude Code plugin marketplace and built its frontend plugin: hooks, agents and workflows that cut typical feature delivery from 1–2 days to 1–2 hours for 10 developers while keeping new code above 80% test coverage.", tags: ["Claude Code", "Agents", "Hooks", "Workflows"], accent: "#8A5A9E" },
  { id: "03", title: "Internal AI Assistants", subtitle: "Angular / RAG", description: "Built the Angular frontends for two internal AI assistants: a multi-model chat with model switching, and a RAG assistant with per-department document management that grew from a Licensing proof of concept to Underwriting and Audit.", tags: ["Angular", "TypeScript", "RAG", "Azure AI"], accent: "#2D6A5A" },
  { id: "04", title: "Frontend Platform & Monorepo", subtitle: "Nx / GitHub Actions", description: "Architected micro-libraries for auth, error handling, metrics and real-time messaging, co-led their move into an Nx monorepo, and replaced manual npm releases with automated CI/CD gated by SonarQube, Xray and unit tests.", tags: ["Nx", "GitHub Actions", "SignalR", "Datadog"], accent: "#3B5E8A" },
  { id: "05", title: "Online Application System", subtitle: "Angular / TypeScript", description: "Led frontend development replacing a paper-based life insurance process. Instant decision rates rose from under 4% to 46%, and exam-free applications from 0% to 80%.", tags: ["Angular", "TypeScript", "RxJS", "SCSS"], accent: "#7A5C3D" },
  { id: "06", title: "Application Manager", subtitle: "Angular / TypeScript", description: "Built an internal dashboard for underwriters to manage assigned cases and auto-generated tasks, cutting the average underwriting cycle from 50+ days to about 11. Later extended it to give external agents real-time application status.", tags: ["Angular", "TypeScript", "RxJS", "REST API"], accent: "#A0662B" },
];

export const SKILLS = [
  { name: "Angular", years: 8 },
  { name: "TypeScript", years: 8 },
  { name: "JavaScript", years: 8 },
  { name: "RxJS", years: 8 },
  { name: "HTML / SCSS", years: 8 },
  { name: "Nx", years: 4 },
];

export const TOOLS = ["NgRx", "Jest / Jasmine", "Storybook", "Nx Monorepo", "SonarQube", "GitHub Actions", "Docker", "PostgreSQL", "SignalR", "Datadog", "Claude Code", "Azure AI"];

export const EXPERIENCE = [
  { period: "2020 — Present", role: "Application Engineer", company: "Banner Life Insurance", summary: "Co-founded a 50+ component Angular library used by 6 applications, and built micro-libraries for auth, error handling, metrics and SignalR messaging. Co-led the move to an Nx monorepo with automated GitHub Actions releases, and led the test migration to Jest. Built the frontends for two internal AI assistants, launched a company-wide Claude Code plugin marketplace, and mentor junior engineers on design systems." },
  { period: "2018 — 2020", role: "Associate Application Engineer", company: "Banner Life Insurance", summary: "Led frontend development of a rules-driven Angular app replacing a paper-based insurance process: instant decision rates from under 4% to 46%, exam-free applications from 0% to 80%. Built the Application Manager dashboard, cutting underwriting cycle time from 50+ days to about 11, and established the team's unit testing practices." },
  { period: "2017 — 2018", role: "Member Technical Staff", company: "Zoho Corp.", summary: "Spearheaded early data modeling for Zoho Contract Management using PostgreSQL, reducing data redundancy by 20%. Collaborated in a 13-member team implementing backend APIs using PostgreSQL, Java, and an internal Zoho framework." },
];

export const EDUCATION = [
  { title: "M.S. Computer Science, Artificial Intelligence", org: "Georgia Institute of Technology", period: "Expected 2028" },
  { title: "B.Tech. Computer Science and Engineering", org: "College of Engineering Trivandrum", period: "2013 — 2017" },
  { title: "Azure AI Cloud Developer Associate", org: "Microsoft Certified", period: "2026" },
];

export const RESUME_URL = "https://resume.josephkevin.dev";
export const EMAIL = "josephkevin1995@gmail.com";
// Canonical public URL of this site; used for sitemap, RSS and link previews.
export const SITE_URL = "https://josephkevin.dev";
export const SITE_TITLE = "Kevin Joseph — Frontend Engineer";
export const SITE_DESCRIPTION = "Portfolio of Kevin Joseph, a frontend engineer with 8+ years building Angular and TypeScript apps, design systems, and AI-assisted workflows.";
