---
name: define-mvp
description: Stage 3 probe tree — force a sharp line between v1 must-haves and v2 nice-to-haves
type: reference
---

# Stage 3: Define the MVP

## Goal

Force the user to draw a sharp line between "must have for v1" and "nice to have later." No more than 5 features, each one a single user-perceivable action.

## Opening Question

"If you could ship something in 2 weeks that made your persona say 'finally, this solves the worst part' — what would it do? List the smallest set of features that would still feel like a real solution."

## Question Format

Use a 2-step flow: a choice question to pick the MVP category, then a free-form question for the actual feature list.

**Step 1 — `AskUserQuestion` for the category:**

Question: "What kind of product is this MVP?"
Options:
- A) "CLI / terminal tool" (e.g. dev tool, automation script)
- B) "Web app / SaaS dashboard" (e.g. Notion-style editor, admin UI)
- C) "API / backend service" (e.g. mock server, payment integration)
- D) "Mobile app or browser extension"

After the user picks, lock that in and move to step 2.

**Step 2 — free-form text (the only place in this stage):**

"List 3-5 features for the MVP. For each one, write one sentence: what the user does, and what they feel after. If you list more than 5, I'll cut to 3 — be ruthless."

This is intentionally open-ended: feature ideas cannot be constrained to 4 options, and the user's creativity is the point of the question.

## Probe Tree

- **IF user lists more than 5 features**
  - Probe: "Pick the 3 that, if you removed them, the user would say 'this is useless.' Those are the core. Drop the rest to v2."
  - Follow-up: "For each of the 3: what does the user DO with the feature, and what do they FEEL after using it?"

- **IF user lists vague features** ("AI-powered", "smart matching", "personalized")
  - Probe: "Describe the user action in 5 seconds. They click X, type Y, and see Z. What is X, Y, Z?"
  - Follow-up: "If you had to build this WITHOUT AI, just plain rules, what would the dumbest working version look like?"

- **IF user says "everything in one"** ("I want a complete platform")
  - Probe: "Pick the ONE thing users would pay for on day 1. The rest can be empty placeholders. What is that one thing?"

- **IF user only has 1-2 features**
  - Probe: "That's lean. But is it enough that someone would pay $10/month for just this? If yes, let's keep it. If no, what's the smallest extra thing that makes it worth paying for?"

## Exit Criteria

Move to stage 4 only when ALL of these are true:

- [ ] User lists 1-5 features (target 3)
- [ ] Each feature describes a user action (not a technology)
- [ ] User can answer "what does the user feel after using this?" for at least the top 2 features
- [ ] User acknowledges that the unlisted features are explicitly v2, not forgotten

If any criterion is unmet, ask one more focused probe. Do not advance.

## Anti-patterns

**User mistakes to watch for:**
- Tech in disguise ("OAuth login with Google", "Postgres database"). Reframe: "What does the user DO, not how it's built?"
- Solutions looking for problems ("real-time collaboration"). Force the persona-driven answer.
- Scope creep disguised as MVP ("oh and also notifications, and analytics, and…"). Cut to 5.

**AI mistakes to avoid:**
- Don't suggest features. The user picks.
- Don't accept features that are clearly infrastructure (auth, payments, admin panels) unless the user insists. Probe: "Is this user-facing in v1, or can you hardcode it / skip it?"
- Don't let "5 features" silently grow to 7 because the user said "and one more thing."
