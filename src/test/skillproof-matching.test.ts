import { describe, expect, it } from "vitest";

import {
  calculateSkillMatch,
  type CandidateProfile,
  type HiringRole,
} from "@/lib/skillproof-matching";

const role: HiringRole = {
  id: "sample-role",
  title: "Frontend engineer",
  team: "Product engineering",
  description: "Build accessible product experiences.",
  requiredSkills: ["React", "TypeScript", "Accessibility", "Design systems"],
};

const candidate: CandidateProfile = {
  id: "sample-candidate",
  name: "Sample Candidate",
  initials: "SC",
  avatarTone: "mint",
  headline: "Frontend engineer",
  location: "Montreal, Canada",
  availability: "Available now",
  summary: "Builds accessible product interfaces.",
  skills: [
    { name: "React", level: "Advanced", verified: true, verificationMethod: "Code review" },
    { name: "TypeScript", level: "Strong", verified: false, verificationMethod: "Project evidence" },
    { name: "Accessibility", level: "Strong", verified: true, verificationMethod: "Audit" },
  ],
  projects: [
    {
      title: "Accessible planner",
      summary: "A keyboard-friendly planning tool.",
      outcome: "Tested with 8 users",
      proofType: "Work sample",
      skills: ["React", "TypeScript", "Accessibility"],
    },
  ],
};

describe("SkillProof evidence-based matching", () => {
  it("combines verified skills and project evidence into the match score", () => {
    expect(calculateSkillMatch(candidate, role)).toEqual({
      score: 60,
      verifiedSkills: ["React", "Accessibility"],
      projectEvidenceSkills: ["React", "TypeScript", "Accessibility"],
    });
  });

  it("does not count an unverified skill as a verified skill", () => {
    const unverifiedOnly: CandidateProfile = {
      ...candidate,
      skills: [
        { name: "React", level: "Strong", verified: false, verificationMethod: "Project evidence" },
      ],
      projects: [],
    };

    expect(calculateSkillMatch(unverifiedOnly, role)).toEqual({
      score: 0,
      verifiedSkills: [],
      projectEvidenceSkills: [],
    });
  });

  it("does not let education or referrals affect the score", () => {
    const profileWithPedigreeAndReferral = {
      ...candidate,
      education: "Prestigious University",
      referredBy: "Executive referral",
    };

    expect(calculateSkillMatch(profileWithPedigreeAndReferral, role)).toEqual(
      calculateSkillMatch(candidate, role),
    );
  });
});