export const PROJECTS = [
  { id: "01", title: "Horizon Component Library", subtitle: "Angular / Storybook", description: "Co-founded and grew a shared Angular component library to 50+ reusable components adopted across all Horizon applications, fully documented in Storybook.", tags: ["Angular", "TypeScript", "Storybook", "SCSS"], accent: "#BF4A2F" },
  { id: "02", title: "Skyline Customer Portal", subtitle: "Angular / NgRx", description: "Engineered a full-lifecycle customer portal enabling policyholders to manage applications mid-journey and monitor payments, targeting 25% adoption by end of 2026.", tags: ["Angular", "NgRx", "RxJS", "TypeScript"], accent: "#2D6A5A" },
  { id: "03", title: "Online Application System", subtitle: "Angular / NgRx", description: "Led frontend development replacing a paper-based life insurance process — instant decision rates jumped from under 4% to 46%, exam-free applications from 0% to 80%.", tags: ["Angular", "NgRx", "TypeScript", "SCSS"], accent: "#3B5E8A" },
  { id: "04", title: "Application Manager", subtitle: "Angular / TypeScript", description: "Built an internal dashboard enabling underwriters to manage assigned cases and auto-generated tasks, cutting the average underwriting cycle from 50+ days to ~11 days.", tags: ["Angular", "TypeScript", "RxJS", "REST API"], accent: "#7A5C3D" },
];

export const SKILLS = [
  { name: "Angular", years: 7 },
  { name: "TypeScript", years: 7 },
  { name: "JavaScript", years: 7 },
  { name: "RxJS", years: 7 },
  { name: "HTML / SCSS", years: 7 },
  { name: "Nx", years: 4 },
];

export const TOOLS = ["Jest / Jasmine", "Storybook", "Nx Monorepo", "SonarQube", "PostgreSQL", "SignalR", "Datadog", "CI/CD Pipelines"];

export const EXPERIENCE = [
  { period: "2020 — Present", role: "Application Engineer", company: "Banner Life Insurance", summary: "Built the Horizon component library (50+ components) and four micro-libraries for auth, error handling, metrics, and real-time communication via SignalR. Co-led migration to an Nx monorepo and from Karma/Jasmine to Jest. Engineered the Skyline customer portal in Angular/NgRx for full-lifecycle policy management." },
  { period: "2018 — 2020", role: "Associate Application Engineer", company: "Banner Life Insurance", summary: "Led frontend development of a rules-driven Angular app replacing a paper-based insurance process — instant decision rates from under 4% to 46%, exam-free applications from 0% to 80%. Built the Application Manager dashboard, cutting underwriting cycle time from 50+ days to ~11 days." },
  { period: "2017 — 2018", role: "Member Technical Staff", company: "Zoho Corp.", summary: "Spearheaded early data modeling for Zoho Contract Management using PostgreSQL, reducing data redundancy by 20%. Collaborated in a 13-member team implementing backend APIs using PostgreSQL, Java, and an internal Zoho framework." },
];
