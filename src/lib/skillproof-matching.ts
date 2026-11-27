export type CandidateSkill = {
  name: string;
  level: string;
  verified: boolean;
  verificationMethod: string;
};

export type ProjectEvidence = {
  title: string;
  summary: string;
  outcome: string;
  proofType: string;
  skills: string[];
};

export type CandidateProfile = {
  id: string;
  name: string;
  initials: string;
  avatarTone: "mint" | "coral" | "blue" | "gold" | "rose" | "violet";
  headline: string;
  location: string;
  availability: string;
  summary: string;
  skills: CandidateSkill[];
  projects: ProjectEvidence[];
};

export type HiringRole = {
  id: string;
  title: string;
  team: string;
  description: string;
  requiredSkills: string[];
};

export type CandidateMatch = {
  candidate: CandidateProfile;
  score: number;
  verifiedSkills: string[];
  projectEvidenceSkills: string[];
};

const normalize = (value: string) => value.trim().toLocaleLowerCase();

export function calculateSkillMatch(
  candidate: CandidateProfile,
  role: HiringRole,
): Omit<CandidateMatch, "candidate"> {
  const requiredSkills = Array.from(new Set(role.requiredSkills.map(normalize)));
  if (requiredSkills.length === 0) {
    return { score: 0, verifiedSkills: [], projectEvidenceSkills: [] };
  }

  const verifiedSkills = role.requiredSkills.filter((requiredSkill) =>
    candidate.skills.some(
      (skill) => skill.verified && normalize(skill.name) === normalize(requiredSkill),
    ),
  );
  const projectEvidenceSkills = role.requiredSkills.filter((requiredSkill) =>
    candidate.projects.some((project) =>
      project.skills.some((skillName) => normalize(skillName) === normalize(requiredSkill)),
    ),
  );

  const verifiedCoverage = verifiedSkills.length / requiredSkills.length;
  const evidenceCoverage = projectEvidenceSkills.length / requiredSkills.length;
  const score = Math.round(verifiedCoverage * 60 + evidenceCoverage * 40);

  return { score, verifiedSkills, projectEvidenceSkills };
}

export function matchCandidates(
  candidates: CandidateProfile[],
  role: HiringRole,
  query = "",
  shortlistedIds?: ReadonlySet<string>,
): CandidateMatch[] {
  const normalizedQuery = normalize(query);

  return candidates
    .filter((candidate) => shortlistedIds === undefined || shortlistedIds.has(candidate.id))
    .filter((candidate) => {
      if (!normalizedQuery) return true;
      const searchableText = [
        candidate.name,
        candidate.headline,
        candidate.location,
        ...candidate.skills.map((skill) => skill.name),
        ...candidate.projects.flatMap((project) => [project.title, project.summary, project.outcome]),
      ]
        .join(" ")
        .toLocaleLowerCase();

      return searchableText.includes(normalizedQuery);
    })
    .map((candidate) => ({ candidate, ...calculateSkillMatch(candidate, role) }))
    .sort(
      (a, b) =>
        b.score - a.score || a.candidate.name.localeCompare(b.candidate.name, "en"),
    );
}

export const HIRING_ROLES: HiringRole[] = [
  {
    id: "frontend-engineer",
    title: "Frontend engineer",
    team: "Product engineering",
    description: "Build accessible, dependable product experiences.",
    requiredSkills: ["React", "TypeScript", "Accessibility", "Design systems"],
  },
  {
    id: "product-designer",
    title: "Product designer",
    team: "Product design",
    description: "Shape clear, inclusive journeys from research to launch.",
    requiredSkills: ["Product discovery", "Interaction design", "Prototyping", "Accessibility"],
  },
  {
    id: "data-analyst",
    title: "Data analyst",
    team: "Insights",
    description: "Turn trustworthy analysis into better product decisions.",
    requiredSkills: ["SQL", "Python", "Data visualization", "Experiment design"],
  },
];

export const CANDIDATES: CandidateProfile[] = [
  {
    id: "maya-chen",
    name: "Maya Chen",
    initials: "MC",
    avatarTone: "mint",
    headline: "Frontend engineer",
    location: "Montreal, Canada",
    availability: "Available in 3 weeks",
    summary: "Builds inclusive product flows and dependable interface systems.",
    skills: [
      { name: "React", level: "Advanced", verified: true, verificationMethod: "Code sample review" },
      { name: "TypeScript", level: "Advanced", verified: true, verificationMethod: "Practical challenge" },
      { name: "Accessibility", level: "Advanced", verified: true, verificationMethod: "Accessibility audit" },
      { name: "Design systems", level: "Strong", verified: true, verificationMethod: "Project review" },
      { name: "Interaction design", level: "Strong", verified: true, verificationMethod: "Work sample" },
    ],
    projects: [
      {
        title: "Fieldwork dashboard",
        summary: "Reworked a multi-step intake into a clear, low-friction workflow.",
        outcome: "Piloted with 6 community teams",
        proofType: "Live product",
        skills: ["React", "TypeScript", "Accessibility"],
      },
      {
        title: "Design system bridge",
        summary: "Created reusable, documented patterns for a growing product suite.",
        outcome: "24 accessible patterns shipped",
        proofType: "Component library",
        skills: ["React", "TypeScript", "Design systems"],
      },
    ],
  },
  {
    id: "jamal-rivers",
    name: "Jamal Rivers",
    initials: "JR",
    avatarTone: "coral",
    headline: "Product engineer",
    location: "Toronto, Canada",
    availability: "Available now",
    summary: "Turns complex service requirements into fast, accessible interfaces.",
    skills: [
      { name: "React", level: "Advanced", verified: true, verificationMethod: "Practical challenge" },
      { name: "TypeScript", level: "Advanced", verified: true, verificationMethod: "Code sample review" },
      { name: "Accessibility", level: "Strong", verified: true, verificationMethod: "Accessibility audit" },
      { name: "Design systems", level: "Strong", verified: true, verificationMethod: "Project review" },
      { name: "SQL", level: "Working", verified: true, verificationMethod: "Practical challenge" },
    ],
    projects: [
      {
        title: "Public benefits navigator",
        summary: "Built a guided service finder with keyboard-first navigation.",
        outcome: "Cut incomplete applications by 31%",
        proofType: "Live product",
        skills: ["React", "TypeScript", "Accessibility"],
      },
      {
        title: "Reusable form kit",
        summary: "Standardized validation and error states across a service platform.",
        outcome: "Adopted across 4 product flows",
        proofType: "Component library",
        skills: ["React", "Design systems"],
      },
    ],
  },
  {
    id: "nia-brooks",
    name: "Nia Brooks",
    initials: "NB",
    avatarTone: "blue",
    headline: "UI engineer",
    location: "Ottawa, Canada",
    availability: "Available in 2 weeks",
    summary: "Pairs thoughtful interaction patterns with precise front-end craft.",
    skills: [
      { name: "React", level: "Advanced", verified: true, verificationMethod: "Code sample review" },
      { name: "TypeScript", level: "Strong", verified: true, verificationMethod: "Practical challenge" },
      { name: "Accessibility", level: "Advanced", verified: true, verificationMethod: "Accessibility audit" },
      { name: "Design systems", level: "Strong", verified: false, verificationMethod: "Project evidence" },
      { name: "Prototyping", level: "Strong", verified: true, verificationMethod: "Work sample" },
    ],
    projects: [
      {
        title: "Open transit planner",
        summary: "Designed a route comparison flow for screen and keyboard users.",
        outcome: "Mapped 18 accessible journey states",
        proofType: "Open-source project",
        skills: ["React", "TypeScript", "Accessibility", "Design systems"],
      },
      {
        title: "Interface pattern kit",
        summary: "Documented responsive states for shared navigation components.",
        outcome: "12 patterns tested with users",
        proofType: "Work sample",
        skills: ["Design systems", "Accessibility"],
      },
    ],
  },
  {
    id: "sol-park",
    name: "Sol Park",
    initials: "SP",
    avatarTone: "gold",
    headline: "Frontend developer",
    location: "Vancouver, Canada",
    availability: "Available in 1 month",
    summary: "Makes responsive, resilient interfaces for products used every day.",
    skills: [
      { name: "React", level: "Advanced", verified: true, verificationMethod: "Practical challenge" },
      { name: "TypeScript", level: "Strong", verified: true, verificationMethod: "Code sample review" },
      { name: "Accessibility", level: "Strong", verified: true, verificationMethod: "Accessibility audit" },
      { name: "Design systems", level: "Working", verified: false, verificationMethod: "Project evidence" },
      { name: "Python", level: "Working", verified: true, verificationMethod: "Practical challenge" },
    ],
    projects: [
      {
        title: "Community booking flow",
        summary: "Simplified appointment scheduling across mobile and desktop.",
        outcome: "Reduced booking steps from 7 to 3",
        proofType: "Live product",
        skills: ["React", "TypeScript", "Accessibility"],
      },
      {
        title: "Pattern library refresh",
        summary: "Updated shared controls and documented responsive behavior.",
        outcome: "20 components documented",
        proofType: "Component library",
        skills: ["React", "Design systems"],
      },
    ],
  },
  {
    id: "lara-santos",
    name: "Lara Santos",
    initials: "LS",
    avatarTone: "rose",
    headline: "Design technologist",
    location: "Halifax, Canada",
    availability: "Available now",
    summary: "Connects interaction design with practical, testable interface work.",
    skills: [
      { name: "React", level: "Strong", verified: true, verificationMethod: "Code sample review" },
      { name: "TypeScript", level: "Working", verified: false, verificationMethod: "Project evidence" },
      { name: "Accessibility", level: "Strong", verified: true, verificationMethod: "Accessibility audit" },
      { name: "Design systems", level: "Advanced", verified: true, verificationMethod: "Project review" },
      { name: "Prototyping", level: "Advanced", verified: true, verificationMethod: "Work sample" },
    ],
    projects: [
      {
        title: "Accessible checkout study",
        summary: "Prototyped and tested a clearer purchase and confirmation flow.",
        outcome: "Improved task completion in 5 usability sessions",
        proofType: "Work sample",
        skills: ["React", "Accessibility", "Design systems"],
      },
      {
        title: "Motion-safe components",
        summary: "Built interface patterns that respect reduced-motion settings.",
        outcome: "8 patterns tested across devices",
        proofType: "Component library",
        skills: ["React", "Design systems"],
      },
    ],
  },
  {
    id: "eli-brooks",
    name: "Eli Brooks",
    initials: "EB",
    avatarTone: "violet",
    headline: "Web developer",
    location: "Calgary, Canada",
    availability: "Available in 3 weeks",
    summary: "Builds focused product features and contributes clear project notes.",
    skills: [
      { name: "React", level: "Strong", verified: true, verificationMethod: "Practical challenge" },
      { name: "TypeScript", level: "Working", verified: false, verificationMethod: "Project evidence" },
      { name: "Accessibility", level: "Working", verified: false, verificationMethod: "Project evidence" },
      { name: "Design systems", level: "Working", verified: true, verificationMethod: "Project review" },
      { name: "SQL", level: "Strong", verified: true, verificationMethod: "Practical challenge" },
    ],
    projects: [
      {
        title: "Local services directory",
        summary: "Created a searchable directory with clear, reusable UI patterns.",
        outcome: "Indexed 120 community services",
        proofType: "Live product",
        skills: ["React", "TypeScript", "Design systems"],
      },
      {
        title: "Accessible filter controls",
        summary: "Improved keyboard support and empty states for a search experience.",
        outcome: "Validated 10 interaction states",
        proofType: "Work sample",
        skills: ["Accessibility", "Design systems"],
      },
    ],
  },
];