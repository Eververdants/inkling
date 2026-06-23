---
name: idea
description: Use this skill when the user wants to start a new software project but doesn't know what to build. Triggers on /idea, "I want to start a project", "help me brainstorm", "I need project ideas", "what should I build", "想做个项目", "帮我想个点子", or any request for software project brainstorming from scratch. Does NOT trigger when the user has a concrete project in mind or is asking for technical advice on an existing project.
---

# /idea — Software Project Brainstorming

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

After each stage, confirm with the user: "Satisfied with this? Add anything, or move to the next stage?"

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
2. Ask: "Here's your proposal. Satisfied? Modify any section, or write to disk?"
3. On confirmation, save to `docs/ideas/YYYY-MM-DD-<slug>-idea.md`:
   - `<slug>` = lowercase kebab-case, 2-4 words, derived from the stage-1 problem
   - Create `docs/ideas/` if absent
4. After saving, offer 3 follow-ups: implementation plan, week-1 task breakdown, or technical risk discussion.

If the user says "I need to think" at any point: save current state to `docs/ideas/.drafts/<timestamp>-draft.md` and stop.

## Hard rules

1. **One question at a time** unless asking for sub-options of the same theme.
2. **Confirm before advancing** between stages.
3. **User can always go back** to a previous stage.
4. **Show full markdown before writing** — never write silently.
5. **Never decide for the user** — give options, let them pick.
6. **No placeholders** in the final proposal. Skipped sections read "(skipped by user)".
7. **No premature proposal** — all 5 stages must exit before generating the final markdown.
8. **No silent edits** — once a stage is confirmed, do not change it unless the user asks.

## Edge cases

| Scenario | Handling |
|----------|----------|
| User gives all 5 stages of info in one message | From stage 1, only ask clarification questions (quantify, emotion), don't repeat known info |
| User says "I don't know" twice | Switch to "stimulus mode": offer 3 contrasting examples (designer / kid / enterprise), let user pick closest |
| User says "I need to think" | Stop immediately, save draft to `docs/ideas/.drafts/<ts>-draft.md` |
| User switches topic mid-flow | Save current progress, ask "Saved to X. Start a new direction?" |
| User already has a clear idea | Skip stages 1-2, enter stage 3 |
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
