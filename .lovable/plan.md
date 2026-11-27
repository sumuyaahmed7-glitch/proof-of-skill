# Build Proofwork, a skills-first hiring workspace

## Experience
- Replace the placeholder at `/` with a usable hiring-partner workspace for reviewing matched candidates.
- Make verified skills and project evidence the primary signals: searchable candidate rows, match rationale, evidence links, and shortlist actions.
- Include realistic example candidates and roles so the screen is useful immediately; keep all interactions in the browser for this first prototype.
- Use a responsive, editorial data-workspace design with a compact navigation rail, dense candidate list, and evidence detail panel.
- Use “Proofwork” as the temporary product name until the name question is answered.

## Technical details
- Keep this as one content route at `src/routes/index.tsx`; add the route-specific metadata required for the app.
- Define the visual system in `src/styles.css` using semantic OKLCH tokens; use the existing UI dependencies and accessible controls.
- Add a focused test for the candidate filtering/matching behavior, and verify the central review-and-shortlist flow in the running preview.
- No backend or account setup is needed for this browser-only prototype.
