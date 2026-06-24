---
name: inkling
description: >
  Use this skill when the user wants to build a software project but doesn't
  know what to build — it drives a structured 5-stage conversation (problem
  → audience → MVP → tech → differentiation) that converges on a concrete,
  defensible project idea. Works for any software: web, mobile, CLI, API,
  plugin, bot, or game. Triggers on "I want to start a project", "help me
  brainstorm", "I need project ideas", "what should I build", vague requests
  like "I want to make something", learning-driven requests like "build X to
  learn X", and Chinese "想做个项目" / "帮我想个点子". Skip if the user
  already has a concrete project in mind, needs implementation help, or is
  asking about an existing codebase.
---

# /inkling — Software Project Brainstorming

Drive a 5-stage recursive probing conversation to help a user with no clear project idea converge on one concrete, defensible software project, then write the result to `<calling-project>/docs/ideas/YYYY-MM-DD-<slug>-idea.md`.

## When to use this skill

Use this skill when ALL of the following are true:
- The user does not have a concrete project in mind
- The user wants help thinking of what to build
- The intent is software (web, mobile, CLI, API, plugin, bot, game, script, etc.)

Do NOT use this skill if:
- The user has already named a project and wants help building it
- The user is asking for technical advice on an existing codebase
- The user wants project management or task planning for an existing project

## The 5-stage flow

Run these stages in order. **Before each stage, read its reference file** to load the probe tree, opening questions, and exit criteria. The user can always go back to a previous stage.

| # | Stage | Reference | What you extract |
|---|-------|-----------|------------------|
| 1 | Discover the Problem | `references/discover-problem.md` → read before first question | A one-sentence problem, specific affected group, emotional weight |
| 2 | Discover the Audience | `references/discover-audience.md` → read before stage 2 | One specific persona, one usage scene, one reachable channel |
| 3 | Define the MVP | `references/define-mvp.md` → read before stage 3 | 1-5 user-facing features, each with action + value |
| 4 | Choose the Tech | `references/choose-tech.md` → read before stage 4 | Primary stack, deployment target, honest risks |
| 5 | Differentiate | `references/differentiate.md` → read before stage 5 | 1+ real competitor, a specific gap, a one-sentence differentiator |

**Per-stage loop:** Typical range is 2-4 turns per stage, but exit criteria always take precedence. If the user needs more probing to meet the exit criteria, continue — do not rush. Total across all stages: 8-12 turns is a good target, not a hard limit.

**Within each stage, follow the layered probe principle:**
- Turn 1: concrete fact (what scenario?)
- Turn 2: quantification (how much, how often?)
- Turn 3: emotion (how painful?)

After each stage, confirm with the user via `AskUserQuestion`. **Vary your phrasing per stage:**
- Stage 1 → Stage 2: "Satisfied with this stage?"
  - Options: "Move to next stage" / "Add more detail" / "Go back"
- Stage 2 → Stage 3: "Does the audience feel right?"
  - Options: "Move to features" / "Refine this persona" / "Go back"
- Stage 3 → Stage 4: "Happy with this feature set?"
  - Options: "Move to tech discussion" / "Adjust features" / "Go back"
- Stage 4 → Stage 5: "Tech direction feel solid?"
  - Options: "Move to differentiation" / "Reconsider tech" / "Go back"
- Stage 5 → Proposal: "All 5 stages done. Ready to see the proposal?"
  - Options: "Yes, render it" / "Refine one more angle" / "Go back"

One confirmation per stage transition is sufficient. Do not confirm again in the next message.

## Question formatting: choice-first

**Default to `AskUserQuestion` (multi-choice) whenever 2-4 options cover the answer space.** The user clicks an option instead of typing. Open-ended text questions are reserved for genuinely unconstrained answers (free-form descriptions, personal stories).

**Use `AskUserQuestion` for (~80% of questions):**
- Stage 1 opening (offer 3-4 common starting paths: vague / known / free-form / suggestion list)
- Persona selection (offer 4 common persona types: developer / designer / PM / writer)
- MVP category (CLI / web app / API / mobile/extension)
- Tech stack selection (offer 4 common stacks based on user's experience level)
- No-code path selection (Bolt.new / Cursor / Replit Agent / v0.dev)
- Competitor selection (offer common ones or "let me search first")
- Stage transition confirmations
- Slug and filename confirmation
- Final write-to-disk confirmation
- The 3 follow-up offers after writing

**Use open-ended text for (~20% of questions):**
- The user describing a personal scene
- The user naming a specific person they have in mind
- The user explaining why something hurts (emotion)
- Free-form MVP feature list (when 4 options can't cover it)

**Batch related sub-options into a single `AskUserQuestion` call** (4 options max) rather than 4 separate prompts. Example: instead of asking "tech stack?" then "deployment?" then "database?" — combine into one question with 4 pre-built stack options.

**Tactical rules:**
- Always include an "Other / Let me describe in my own words" option so the user can fall through to free-form if none fit.
- For stimulus mode ("I don't know" twice), present 3 contrasting examples (designer / kid / enterprise) as options rather than open-ended.
- When offering 3 follow-ups after writing, use one `AskUserQuestion` with 3 options, not three separate questions.

## CRITICAL: User-level detection (do this in Stage 1)

**After the user's first 1-2 answers in Stage 1, you MUST infer the user's level and state it explicitly.** Say "I detect you're a [level] — I'll tailor the conversation from here." Then proceed. Do not skip this step.

| Signal | Inferred level | Adjustment |
|--------|---------------|-----------|
| Uses dev jargon, names specific tech, references "users" or "MRR" | Indie dev | Skip basics, ask about go-to-market and competitor gaps |
| Says "I don't code" / asks "what's an API" | Non-coder | Suggest no-code tools (Bolt.new, Cursor, Replit Agent) |
| Describes users/businesses, not themselves | PM / non-tech | Ask business questions; frame MVP as spec for an engineer |

If the signal is mixed (e.g., mentions tech but not confidently), probe: "How technical are you feeling about building this? Do you code, use no-code tools, or want to describe it to someone who builds it for you?"

This MUST happen during stage 1. If you skip it, you risk using the wrong tone and recommendations for the rest of the conversation.

## Project naming

The user has not named their project. You must ask for a name. After stage 3 (features are defined), ask: "This needs a name. Any ideas? If not, I can suggest 2-3 options based on what we've discussed." Let the user pick; never decide unilaterally.

## Write to disk

After stage 5 exits:
1. Check: you should have a project name from the user. If not, ask one more time via `AskUserQuestion`.
2. Read `templates/proposal-template.md`, then render the full proposal in chat using it. Do NOT write to disk yet.
3. Confirm via `AskUserQuestion`:
   - "Satisfied with the proposal?"
     - Option A: "Write to disk as-is"
     - Option B: "Edit a specific section (you'll be asked which)"
     - Option C: "Start over with a different angle"
3. On "Write to disk" confirmation, save to `<calling-project-root>/docs/ideas/YYYY-MM-DD-<slug>-idea.md`:
   - `<slug>` = lowercase kebab-case, 2-4 words, derived from the stage-1 problem
   - Resolve path relative to the calling project's root (not the skill's own directory)
   - Create `docs/ideas/` if absent
4. **Validate:** Read the file back from disk and verify that all filled sections are present and no section contains placeholder text. If validation fails, fix and re-save.
5. After saving and validating, offer 3 follow-ups in a single `AskUserQuestion`:
   - "What next?"
     - Option A: "Break this into an implementation plan"
     - Option B: "Sketch the week-1 task list for the MVP"
     - Option C: "Discuss technical risks now"

If the user says "I need to think" at any point: save current state to `<calling-project>/docs/ideas/.drafts/<timestamp>-draft.md` and stop.

## Hard rules

1. **One question per turn.** Never ask two different things at once. Batch related sub-options into a single `AskUserQuestion` call (4 options max) rather than 4 separate prompts.
2. **Default to `AskUserQuestion`.** When 2-4 options cover the answer space, present them as multi-choice. Reserve free-form text for genuinely open-ended answers (~20% of questions: personal stories, emotion, free-form feature lists). See "Question formatting: choice-first" above.
3. **Confirm before advancing** between stages.
4. **User can always go back** to a previous stage.
5. **Show full markdown before writing** — never write silently.
6. **Never decide for the user** — give options, let them pick. This includes the project name.
7. **No placeholders** in the final proposal. Skipped sections read "(skipped by user)".
8. **No premature proposal** — all 5 stages must exit before generating the final markdown.
9. **No silent edits** — once a stage is confirmed, do not change it unless the user asks.
10. **One confirmation per stage transition** — do not confirm again in the next message.

## Edge cases

| Scenario | Handling |
|----------|----------|
| User gives all 5 stages of info in one message | From stage 1, only ask clarification questions (quantify, emotion), don't repeat known info |
| User says "I don't know" twice | Switch to "stimulus mode": offer 3 contrasting project examples from 3 angles, let user pick closest. Options: (a) a tool solving a personal annoyance (e.g., CLI to track coding activity), (b) a utility for a group you belong to (e.g., shared grocery list), (c) a small business tool (e.g., invoice generator). Tailor examples to what the user hinted at |
| User says "I need to think" | Stop immediately, save draft to `<calling-project>/docs/ideas/.drafts/<ts>-draft.md` |
| User switches topic mid-flow | Save current progress, ask "Saved to X. Start a new direction?" |
| User wants to go back to a previous stage | Re-enter the requested stage from its opening question. Previous extraction from that stage is replaced. Any downstream stages that depended on changed answers should be revisited too |
| User changed mind about a confirmed stage answer | Ask which part changed. Update just that part. If it invalidates downstream stage outputs, note: "This changes things for stage N too — let's revisit that as well" |
| User says "I want to build X to learn it" (learning-driven, not problem-driven) | Enter stage 1 but frame the problem as "what's a real problem worth learning X through?" If user insists on learning-first, skip to stage 3 with a simple learning-scoped MVP and set expectations that the project may not have a real market |
| User already has a clear idea (e.g. "I want to build a Notion organizer") | Skip stage 1, enter stage 2 (audience is still useful to probe) |
| User has a clear idea AND a clear audience | Skip stages 1-2, enter stage 3 |
| Stage 3 MVP type conflicts with stage 4 tech path (e.g. CLI tool + no-code web builder, or mobile app + Python-only stack) | When detected, ask the user: "Your MVP type and tech path don't naturally align. Option A: adjust MVP type to fit the tech. Option B: pick a different tech path. Option C: proceed anyway with a known workaround." |
| User asks "how does this work?" | Show current stage name + remaining stages |

## Self-test scenarios

Before shipping this skill, mentally walk through these:

**Scenario A — "Vague user"**
- Input: "I want to make something but I don't know what"
- Expected: AI starts from stage 1's deepest probe ("what annoyed you last week?"), runs ≥3 turns
- Check: user-level detection MUST be stated after user's 1st or 2nd answer

**Scenario B — "Has idea, vague on details"**
- Input: "I want to build a tool to organize Notion notes"
- Expected: AI skips stage 1, enters stage 2 (audience and scenario)

**Scenario C — "Full info dump"**
- Input: One message covering problem, audience, MVP, tech, competitors
- Expected: AI starts at stage 1, only asks clarification questions (quantify, emotion), doesn't repeat known info
- Check: user-level detection still stated after first answer

**Scenario D — "Learning-driven"**
- Input: "I want to build a Rust project to learn Rust"
- Expected: AI enters stage 1 but frames the problem as finding a real-world itch to apply Rust to, rather than assuming "learn Rust" is a sufficient project goal. If user insists, skips to stage 3 with a learning-scoped MVP.

**Scenario E — "Tech-audience mismatch"**
- Input: User picks "CLI tool" in stage 3 then "no-code path (Bolt.new)" in stage 4
- Expected: AI flags the inconsistency and offers to adjust MVP type, switch tech, or proceed with workaround

**Scenario F — "Non-coder"**
- Input: "I don't code. I need a simple app for my restaurant."
- Expected: user-level states "non-coder", stage 4 suggests no-code tools. Language stays plain throughout.

**Scenario G — "Go back"**
- Input: Starts normally, then in stage 3 says "Actually, I want to revisit stage 2 — my audience isn't right."
- Expected: AI re-enters stage 2 from its opening question, previous stage 2 extraction is replaced.

If any scenario fails, fix the relevant reference file or this SKILL.md, then re-test.
