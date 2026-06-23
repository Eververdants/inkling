---
name: inkling
description: Use this skill when the user wants to start a new software project but doesn't know what to build. Triggers on /inkling, "I want to start a project", "help me brainstorm", "I need project ideas", "what should I build", "想做个项目", "帮我想个点子", or any request for software project brainstorming from scratch. Does NOT trigger when the user has a concrete project in mind or is asking for technical advice on an existing project.
---

# /inkling — Software Project Brainstorming

Drive a 5-stage recursive probing conversation to help a user with no clear project idea converge on one concrete, defensible software project, then write the result to `docs/ideas/YYYY-MM-DD-<slug>-idea.md`.

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

Run these stages in order. Each stage loads its probe tree from a reference file. The user can always go back to a previous stage.

| # | Stage | Reference | What you extract |
|---|-------|-----------|------------------|
| 1 | Discover the Problem | `references/discover-problem.md` | A one-sentence problem, specific affected group, emotional weight |
| 2 | Discover the Audience | `references/discover-audience.md` | One specific persona, one usage scene, one reachable channel |
| 3 | Define the MVP | `references/define-mvp.md` | 1-5 user-facing features, each with action + value |
| 4 | Choose the Tech | `references/choose-tech.md` | Primary stack, deployment target, honest risks |
| 5 | Differentiate | `references/differentiate.md` | 1+ real competitor, a specific gap, a one-sentence differentiator |

**Per-stage loop:** 2-4 turns. Total across all stages: 8-12 turns (target 10).

**Within each stage, follow the layered probe principle:**
- Turn 1: concrete fact (what scenario?)
- Turn 2: quantification (how much, how often?)
- Turn 3: emotion (how painful?)

After each stage, confirm with the user via `AskUserQuestion`:
- "Satisfied with this stage?"
  - Option A: "Move to next stage"
  - Option B: "Add more detail to this stage"
  - Option C: "Go back to previous stage"

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

## Auto user-level detection

After the first 1-2 answers, infer the user's level. State it once, then proceed.

| Signal | Inferred level | Adjustment |
|--------|---------------|-----------|
| Uses dev jargon, names specific tech, references "users" or "MRR" | Indie dev | Skip basics, ask about go-to-market and competitor gaps |
| Says "I don't code" / asks "what's an API" | Non-coder | Suggest no-code tools (Bolt.new, Cursor, Replit Agent) |
| Describes users/businesses, not themselves | PM / non-tech | Ask business questions; frame MVP as spec for an engineer |

## Write to disk

After stage 5 exits:
1. Render the full proposal in chat from `templates/proposal-template.md`. Do NOT write yet.
2. Confirm via `AskUserQuestion`:
   - "Satisfied with the proposal?"
     - Option A: "Write to disk as-is"
     - Option B: "Edit a specific section (you'll be asked which)"
     - Option C: "Start over with a different angle"
3. On "Write to disk" confirmation, save to `docs/ideas/YYYY-MM-DD-<slug>-idea.md`:
   - `<slug>` = lowercase kebab-case, 2-4 words, derived from the stage-1 problem
   - Create `docs/ideas/` if absent
4. After saving, offer 3 follow-ups in a single `AskUserQuestion`:
   - "What next?"
     - Option A: "Break this into an implementation plan"
     - Option B: "Sketch the week-1 task list for the MVP"
     - Option C: "Discuss technical risks now"

If the user says "I need to think" at any point: save current state to `docs/ideas/.drafts/<timestamp>-draft.md` and stop.

## Hard rules

1. **One question at a time** unless asking for sub-options of the same theme. **Default to `AskUserQuestion` (multi-choice) when 2-4 options cover the answer space; reserve open-ended text for genuinely free-form answers** (see "Question formatting: choice-first" above).
2. **Confirm before advancing** between stages.
3. **User can always go back** to a previous stage.
4. **Show full markdown before writing** — never write silently.
5. **Never decide for the user** — give options, let them pick.
6. **No placeholders** in the final proposal. Skipped sections read "(skipped by user)".
7. **No premature proposal** — all 5 stages must exit before generating the final markdown.
8. **No silent edits** — once a stage is confirmed, do not change it unless the user asks.
9. **Choose by default, type by exception** — ~80% of questions must be `AskUserQuestion` multi-choice. Free-form text is for ~20% (personal stories, free-form feature lists, emotion).

## Edge cases

| Scenario | Handling |
|----------|----------|
| User gives all 5 stages of info in one message | From stage 1, only ask clarification questions (quantify, emotion), don't repeat known info |
| User says "I don't know" twice | Switch to "stimulus mode": offer 3 contrasting examples (designer / kid / enterprise), let user pick closest |
| User says "I need to think" | Stop immediately, save draft to `docs/ideas/.drafts/<ts>-draft.md` |
| User switches topic mid-flow | Save current progress, ask "Saved to X. Start a new direction?" |
| User already has a clear idea (e.g. "I want to build a Notion organizer") | Skip stage 1, enter stage 2 (audience is still useful to probe) |
| User has a clear idea AND a clear audience | Skip stages 1-2, enter stage 3 |
| User asks "how does this work?" | Show current stage name + remaining stages |

## Self-test scenarios

Before shipping this skill, mentally walk through these:

**Scenario A — "Vague user"**
- Input: "I want to make something but I don't know what"
- Expected: AI starts from stage 1's deepest probe ("what annoyed you last week?"), runs ≥3 turns

**Scenario B — "Has idea, vague on details"**
- Input: "I want to build a tool to organize Notion notes"
- Expected: AI skips stage 1, enters stage 2 (audience and scenario)

**Scenario C — "Full info dump"**
- Input: One message covering problem, audience, MVP, tech, competitors
- Expected: AI starts at stage 1, only asks clarification questions (quantify, emotion), doesn't repeat known info

If any scenario fails, fix the relevant reference file or this SKILL.md, then re-test.
