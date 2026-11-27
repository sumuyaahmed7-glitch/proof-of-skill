# Proof of Skill
live link=https://id-preview--76a5820d-6d6d-46c6-b98c-c5f9d363286d.lovable.app/?__lovable_receipt=mat_4tfbg7xdyz9qmt4jhb1eqg73z7
 Overview

SkillProof helps people who are shut out of the job market for lack of "local experience" or personal referrals. Candidates build **verified, evidence-backed skill profiles**, learn from local mentors, complete structured fellowships or returnships, and are matched with hiring partners based on what they can actually do.

## The Problem

Capable people are repeatedly rejected because they lack:

- **Local work experience**, as is common for graduates, newcomers and career returners.
- **Professional networks and referrals**, which many employers still rely on to hire.

Employers can't see skills that aren't "locally proven", and candidates can't get the experience that would prove them. The result is a cycle that reinforces inequality and wastes talent.

## Our Solution

SkillProof replaces pedigree and who-you-know with proof, through three connected pillars:

| Pillar | What it does |
|---|---|
| **Mentorship** | Matches candidates with experienced local professionals for guidance, feedback and introductions. |
| **Fellowships / Returnships** | Short, structured placements with partner employers that produce a verified local-experience credential. |
| **Skills-based Talent Matching** | Matches candidates to roles using verified skills and project evidence, with transparent scoring. |

## SDG Alignment

- **SDG 8, Decent Work and Economic Growth:** creates pathways into productive, decent employment.
- **SDG 10, Reduced Inequalities:** removes referral and "local experience" barriers for underrepresented groups.
- **SDG 17, Partnerships for the Goals:** unites employers, mentors, educators and community organizations.

## Key Features

- Role-based registration and login
- **Verified skills profiles** with a skills taxonomy and evidence (projects, assessments, certificates, endorsements)
- Candidate-to-mentor and candidate-to-fellowship matching with explainable scores
- Full fellowship lifecycle: posting, application, selection, milestones, completion
- **Verified local-experience credential** issued on completion
- Full mentorship lifecycle: request, acceptance, scheduling, notes, feedback
- Referral and endorsement system from mentors and employers
- Dashboards for candidates, partners and administrators
- Email and in-app notifications
- Mobile-first, accessible, low-bandwidth-friendly interface

## User Roles

| Role | Capabilities |
|---|---|
| **Candidate** | Build a skills profile, upload evidence, request mentors, apply to fellowships, earn credentials. |
| **Mentor** | Set expertise and availability, accept mentees, log sessions, verify and endorse skills. |
| **Hiring Partner** | Post fellowships and roles, review matched candidates, give references, track hires. |
| **Admin / Coordinator** | Approve partners and mentors, manage cohorts, monitor outcomes and impact. |

## How Skill Verification and Matching Work

**Verification:** each skill on a profile can be backed by one or more forms of proof:

1. Self-declared skill (lowest weight)
2. Evidence uploaded (project, portfolio, certificate)
3. Assessment completed
4. Mentor or employer endorsement
5. Demonstrated during a fellowship (highest weight)

**Matching:** the engine scores candidates against mentors and opportunities using:

- Verified skills and proficiency level
- Strength of evidence behind each skill
- Career goals and domain interests
- Availability, location and work-mode preferences
- Mentor expertise and capacity

Every match shows a **score and a plain-language explanation**. Attributes such as name, gender, age, ethnicity and photo are **never** used in scoring.

## Tech Stack

> Update this section to match your implementation.

| Layer | Technology |
|---|---|
| Frontend | `[e.g. React, Tailwind CSS]` |
| Backend | `[e.g. Node.js / Express, Django, Laravel]` |
| Database | `[e.g. PostgreSQL, MySQL]` |
| Auth | `[e.g. JWT, sessions]` |
| Notifications | `[e.g. SMTP, SendGrid]` |
| Deployment | `[e.g. Render, Vercel, Docker]` |

## System Architecture

```
┌───────────────┐      ┌──────────────────┐      ┌────────────────┐
│   Frontend    │ ───▶ │   Backend API    │ ───▶ │    Database    │
│ (Web / Mobile)│ ◀─── │ Auth • Matching  │ ◀─── │ Users, Skills, │
└───────────────┘      │ Verification     │      │ Evidence,      │
                       │ Fellowships      │      │ Matches, Logs  │
                       │ Mentorship       │      └────────────────┘
                       │ Notifications    │
                       └──────────────────┘
```

**Core entities:** Users, Profiles, Skills, Evidence, Endorsements, Mentorships, Sessions, Fellowships, Applications, Credentials, Partners, Notifications, Audit Logs.

## Getting Started

### Prerequisites

- `[Runtime, e.g. Node.js 20+ or Python 3.11+]`
- `[Database, e.g. PostgreSQL 15+]`
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/skillproof.git
cd skillproof

# 2. Install dependencies
[e.g. npm install]

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your database and secret values

# 4. Set up the database
[e.g. npm run migrate && npm run seed]

# 5. Start the development server
[e.g. npm run dev]
```

### Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Database connection string |
| `JWT_SECRET` | Secret used to sign auth tokens |
| `EMAIL_HOST` / `EMAIL_USER` / `EMAIL_PASS` | SMTP settings for notifications |
| `APP_URL` | Public URL of the application |

## Project Structure

```
skillproof/
├── client/              # Frontend application
├── server/              # Backend API
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── services/
│   │   ├── matching/    # Matching engine
│   │   └── verification/# Skill evidence and credentials
│   └── middleware/
├── database/            # Migrations and seeds
├── docs/                # Design docs, ERD, wireframes
├── tests/
├── .env.example
└── README.md
```

## Usage

1. **Candidates** sign up, build a skills profile, upload evidence, and request a mentor or apply for fellowships.
2. **Mentors** accept mentees, run sessions, and verify or endorse skills.
3. **Hiring partners** post fellowships, review matched candidates, and give references.
4. **Admins** approve users, manage cohorts, and review impact dashboards.

## Impact Metrics

- Candidates, mentors and partners onboarded
- Skills verified and evidence items submitted
- Mentorship sessions completed
- Fellowships completed and credentials issued
- Placement rate from fellowship to employment
- Time-to-hire and retention at 6 and 12 months
- Participation by underrepresented groups (collected with consent, reported only in aggregate)

## Fairness, Privacy and Security

- **Bias controls:** protected attributes are excluded from matching; scores are explainable and auditable.
- **Privacy:** consent-based data collection, minimal data stored, role-based visibility.
- **Security:** hashed passwords, input validation, access control and audit logs.

## Roadmap

- [ ] MVP: profiles, evidence, mentorship, fellowships, basic matching
- [ ] Skills assessments and shareable verified credentials
- [ ] Employer analytics and cohort reporting
- [ ] Mobile app
- [ ] Multi-language support
- [ ] Integrations with job boards and learning platforms

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

Distributed under the `[MIT]` License. See `LICENSE` for details.

## Contact

**Project Maintainer:** `[Your Name]`
**Email:** `[your.email@example.com]`
**Repository:** `https://github.com/<your-username>/skillproof`

---

*SkillProof: because skills should count wherever you earned them.*
