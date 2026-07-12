# Hackathon Checklist

Use this checklist to stay organized during a typical 8-hour build sprint.

## Before Coding

- [ ] Confirm the team problem statement and judging criteria.
- [ ] Assign owners for product, frontend, backend, pitch, and demo prep.
- [ ] Clone the repository and confirm everyone can run the project locally.
- [ ] Copy `.env.example` to `.env.local` and verify required credentials.
- [ ] Agree on a minimum viable scope for the first working demo.
- [ ] Create the initial issue list or task board.

## During Coding

- [ ] Keep route-level work thin and reusable.
- [ ] Build new UI from existing primitives before adding custom components.
- [ ] Commit small working increments often.
- [ ] Track unfinished polish separately from must-have functionality.
- [ ] Capture screenshots and short clips while features become stable.
- [ ] Keep README notes updated so submission work is not left to the end.

## Testing

- [ ] Smoke test the primary user flow after every meaningful milestone.
- [ ] Check empty, loading, and error states for important screens.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Verify environment-dependent flows with the final `.env.local` values.

## Repository

- [ ] Keep the default branch clean and reviewable.
- [ ] Use descriptive branch names and PR summaries.
- [ ] Remove dead files, obvious placeholders, and unused experiments.
- [ ] Confirm secrets are not committed.

## README

- [ ] Replace placeholders with the actual problem, solution, and architecture.
- [ ] Add screenshots.
- [ ] Add the demo video link.
- [ ] Add the live deployment link.
- [ ] Add team member details if required by the event.

## Deployment

- [ ] Choose the deployment target early enough to test it before submission.
- [ ] Configure production environment variables.
- [ ] Verify the deployed build matches local expectations.
- [ ] Test the live URL on desktop and mobile.

## Before Submission

- [ ] Finalize the README.
- [ ] Record and upload the demo video.
- [ ] Re-run lint and build checks.
- [ ] Confirm the repository link is public or shared correctly.
- [ ] Walk through the judging flow once without coding.
