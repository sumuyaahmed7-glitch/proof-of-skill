import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Bookmark,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  FileText,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CANDIDATES,
  HIRING_ROLES,
  calculateSkillMatch,
  matchCandidates,
  type CandidateMatch,
  type CandidateProfile,
  type HiringRole,
} from "@/lib/skillproof-matching";

const initialRole = HIRING_ROLES.find((role) => role.id === "frontend-engineer");
if (!initialRole) {
  throw new Error("SkillProof needs a default hiring role.");
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillProof | Evidence-first talent matching" },
      {
        name: "description",
        content:
          "Review candidate matches grounded in verified skills and project evidence, not pedigree or referrals.",
      },
      { property: "og:title", content: "SkillProof | Evidence-first talent matching" },
      {
        property: "og:description",
        content: "Match candidates to roles through verified skills and project evidence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkillProofPage,
});

type WorkspaceView = "matches" | "shortlist";

function SkillProofPage() {
  const [roleId, setRoleId] = useState(initialRole.id);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<WorkspaceView>("matches");
  const [selectedCandidateId, setSelectedCandidateId] = useState("maya-chen");
  const [shortlistedIds, setShortlistedIds] = useState<ReadonlySet<string>>(() => new Set());

  const activeRole = HIRING_ROLES.find((role) => role.id === roleId) ?? initialRole;
  const visibleMatches = useMemo(
    () =>
      matchCandidates(
        CANDIDATES,
        activeRole,
        query,
        view === "shortlist" ? shortlistedIds : undefined,
      ),
    [activeRole, query, shortlistedIds, view],
  );
  const selectedMatch =
    visibleMatches.find((match) => match.candidate.id === selectedCandidateId) ??
    visibleMatches[0];

  function toggleShortlist(candidateId: string) {
    setShortlistedIds((current) => {
      const next = new Set(current);
      if (next.has(candidateId)) {
        next.delete(candidateId);
      } else {
        next.add(candidateId);
      }
      return next;
    });
  }

  return (
    <div className="skillproof-shell">
      <aside className="side-rail">
        <div className="brand-row">
          <span className="brand-symbol" aria-hidden="true">
            <Sparkles />
          </span>
          <span className="brand-wordmark">SkillProof</span>
        </div>

        <div className="workspace-switcher">
          <span className="workspace-icon" aria-hidden="true">
            <Briefcase />
          </span>
          <span className="workspace-copy">
            <strong>Sample workspace</strong>
            <span>Hiring team</span>
          </span>
          <ChevronRight className="workspace-chevron" aria-hidden="true" />
        </div>

        <div className="rail-section-label">Workspace</div>
        <nav className="rail-navigation" aria-label="Workspace views">
          <Button
            type="button"
            variant="ghost"
            className="rail-nav-button"
            data-active={view === "matches"}
            onClick={() => setView("matches")}
          >
            <Users aria-hidden="true" />
            <span>Matches</span>
            <span className="rail-nav-count">{CANDIDATES.length}</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="rail-nav-button"
            data-active={view === "shortlist"}
            onClick={() => setView("shortlist")}
          >
            <Bookmark aria-hidden="true" />
            <span>Shortlist</span>
            <span className="rail-nav-count">{shortlistedIds.size}</span>
          </Button>
        </nav>

        <div className="rail-footer">
          <ShieldCheck aria-hidden="true" />
          <span>Evidence first</span>
          <small>Education and referrals are not scored.</small>
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Hiring workspace</span>
            <ChevronRight aria-hidden="true" />
            <strong>Candidate matching</strong>
          </div>
          <div className="topbar-profile">
            <span className="sample-label">Sample profiles</span>
            <span className="profile-initials" aria-hidden="true">HT</span>
          </div>
        </header>

        <main className="main-content">
          <div className="page-intro">
            <div>
              <p className="eyebrow">Skills-first hiring</p>
              <h1>Candidates for {activeRole.title}</h1>
              <p className="page-subtitle">Match signals from verified skills and project outcomes.</p>
            </div>
            <div className="role-picker">
              <label htmlFor="role-picker-trigger">Open role</label>
              <Select value={roleId} onValueChange={setRoleId}>
                <SelectTrigger id="role-picker-trigger" className="role-select-trigger">
                  <SelectValue aria-label="Choose an open role" />
                </SelectTrigger>
                <SelectContent align="end">
                  {HIRING_ROLES.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <section className="matching-section" aria-label="Candidate matches">
            <div className="matching-toolbar">
              <Tabs
                value={view}
                onValueChange={(value) => setView(value === "shortlist" ? "shortlist" : "matches")}
              >
                <TabsList className="match-tabs-list" aria-label="Candidate list">
                  <TabsTrigger value="matches" className="match-tab">
                    Matches <span className="tab-count">{CANDIDATES.length}</span>
                  </TabsTrigger>
                  <TabsTrigger value="shortlist" className="match-tab">
                    Shortlist <span className="tab-count">{shortlistedIds.size}</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="search-field">
                <Search className="search-icon" aria-hidden="true" />
                <Input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search skills or project evidence"
                  aria-label="Search candidates by name, skill, or project"
                  className="search-input"
                />
                {query ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="clear-search"
                    aria-label="Clear search"
                    title="Clear search"
                    onClick={() => setQuery("")}
                  >
                    <X aria-hidden="true" />
                  </Button>
                ) : null}
              </div>
            </div>

            <div className="match-surface">
              <section className="candidate-list-panel" aria-label="Matched candidates list">
                <div className="list-heading">
                  <div>
                    <h2>{view === "shortlist" ? "Shortlisted candidates" : "Matched candidates"}</h2>
                    <span>{visibleMatches.length} profiles</span>
                  </div>
                  <span className="sort-label">Highest match</span>
                </div>

                {visibleMatches.length > 0 ? (
                  <div className="candidate-list" role="list">
                    {visibleMatches.map((match) => (
                      <CandidateRow
                        key={match.candidate.id}
                        match={match}
                        role={activeRole}
                        selected={match.candidate.id === selectedMatch?.candidate.id}
                        onSelect={() => setSelectedCandidateId(match.candidate.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <span className="empty-state-icon"><Search aria-hidden="true" /></span>
                    <h3>{view === "shortlist" ? "Your shortlist is clear" : "No candidates found"}</h3>
                    <p>
                      {view === "shortlist"
                        ? "Add a candidate to keep their evidence close."
                        : "Try another name, skill, or project."}
                    </p>
                  </div>
                )}
              </section>

              {selectedMatch ? (
                <CandidateDetails
                  match={selectedMatch}
                  role={activeRole}
                  shortlisted={shortlistedIds.has(selectedMatch.candidate.id)}
                  onToggleShortlist={() => toggleShortlist(selectedMatch.candidate.id)}
                />
              ) : (
                <div className="profile-empty" aria-label="Candidate details">
                  <span className="empty-state-icon"><FileText aria-hidden="true" /></span>
                  <p>Candidate evidence will appear here.</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function CandidateRow({
  match,
  role,
  selected,
  onSelect,
}: {
  match: CandidateMatch;
  role: HiringRole;
  selected: boolean;
  onSelect: () => void;
}) {
  const { candidate } = match;

  return (
    <Button
      type="button"
      variant="ghost"
      className="candidate-row"
      data-selected={selected}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className={`candidate-avatar avatar-tone--${candidate.avatarTone}`} aria-hidden="true">
        {candidate.initials}
      </span>
      <span className="candidate-copy">
        <span className="candidate-name-line">
          <strong>{candidate.name}</strong>
          <CheckCircle2 className="verified-indicator" aria-label="Has verified skills" />
        </span>
        <span className="candidate-subline">
          {candidate.headline} <span aria-hidden="true">·</span> {candidate.location}
        </span>
        <span className="candidate-proof-line">
          {match.verifiedSkills.length}/{role.requiredSkills.length} verified
          <span aria-hidden="true">·</span>
          {match.projectEvidenceSkills.length} project proofs
        </span>
      </span>
      <span className="row-score">
        <span>Match</span>
        <strong>{match.score}%</strong>
      </span>
    </Button>
  );
}

function CandidateDetails({
  match,
  role,
  shortlisted,
  onToggleShortlist,
}: {
  match: CandidateMatch;
  role: HiringRole;
  shortlisted: boolean;
  onToggleShortlist: () => void;
}) {
  const { candidate } = match;

  return (
    <aside className="profile-panel" aria-label={`${candidate.name} evidence profile`}>
      <div className="profile-header">
        <div className={`profile-avatar avatar-tone--${candidate.avatarTone}`} aria-hidden="true">
          {candidate.initials}
        </div>
        <div className="profile-heading-copy">
          <p className="eyebrow">Candidate evidence</p>
          <h2>{candidate.name}</h2>
          <p>{candidate.headline}</p>
        </div>
      </div>

      <div className="profile-meta">
        <span><MapPin aria-hidden="true" />{candidate.location}</span>
        <span><Briefcase aria-hidden="true" />{candidate.availability}</span>
      </div>

      <p className="candidate-summary">{candidate.summary}</p>

      <section className="score-block" aria-label="Role match score">
        <div className="score-heading">
          <span>Match to {role.title}</span>
          <strong>{match.score}%</strong>
        </div>
        <progress value={match.score} max={100} aria-label={`${match.score}% match`} />
        <p>{match.verifiedSkills.length} verified skills · {match.projectEvidenceSkills.length} skills shown in projects</p>
      </section>

      <section className="profile-section">
        <div className="section-title-row">
          <h3>Verified skills</h3>
          <span>{match.verifiedSkills.length}/{role.requiredSkills.length}</span>
        </div>
        <div className="skill-evidence-list">
          {role.requiredSkills.map((requiredSkill) => {
            const skill = candidate.skills.find(
              (candidateSkill) => candidateSkill.name.toLowerCase() === requiredSkill.toLowerCase(),
            );
            const hasProjectEvidence = match.projectEvidenceSkills.some(
              (evidenceSkill) => evidenceSkill.toLowerCase() === requiredSkill.toLowerCase(),
            );
            const isVerified = skill?.verified === true;

            return (
              <div className="skill-evidence-row" key={requiredSkill}>
                <span className={`skill-state ${isVerified ? "skill-state--verified" : hasProjectEvidence ? "skill-state--evidence" : "skill-state--pending"}`}>
                  {isVerified ? <CheckCircle2 aria-hidden="true" /> : <CircleDashed aria-hidden="true" />}
                </span>
                <span className="skill-evidence-copy">
                  <strong>{requiredSkill}</strong>
                  <span>
                    {isVerified
                      ? skill.verificationMethod
                      : hasProjectEvidence
                        ? "Project evidence"
                        : "No verified proof yet"}
                  </span>
                </span>
                <span className="skill-level">{skill?.level ?? "—"}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="profile-section project-section">
        <div className="section-title-row">
          <h3>Project evidence</h3>
          <span>{candidate.projects.length} projects</span>
        </div>
        <div className="project-evidence-list">
          {candidate.projects.map((project) => (
            <article className="project-evidence" key={project.title}>
              <div className="project-title-row">
                <span className="project-icon"><FileText aria-hidden="true" /></span>
                <div>
                  <h4>{project.title}</h4>
                  <span>{project.proofType}</span>
                </div>
              </div>
              <p>{project.summary}</p>
              <div className="project-outcome"><Check aria-hidden="true" />{project.outcome}</div>
              <div className="project-skill-tags">
                {project.skills
                  .filter((skill) => role.requiredSkills.some((required) => required.toLowerCase() === skill.toLowerCase()))
                  .map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="fairness-note">
        <ShieldCheck aria-hidden="true" />
        <p><strong>Evidence-led review</strong><span>Education and referrals are not part of this score.</span></p>
      </div>

      <Button
        type="button"
        variant={shortlisted ? "secondary" : "default"}
        className="shortlist-button"
        aria-pressed={shortlisted}
        onClick={onToggleShortlist}
      >
        <Bookmark aria-hidden="true" />
        {shortlisted ? "Remove from shortlist" : "Add to shortlist"}
      </Button>
    </aside>
  );
}
