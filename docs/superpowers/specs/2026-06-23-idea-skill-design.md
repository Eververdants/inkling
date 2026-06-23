# /idea Skill — Design Document

**Date:** 2026-06-23
**Status:** Approved
**Author:** brainstorming session with user

## 1. Purpose

A Claude Code / Anthropic-agents skill that helps users who want to start a new software project but don't know what to build. The user invokes `/idea` (or a natural-language trigger) and the skill drives a 5-stage recursive probing conversation that ends with a written project proposal.

## 2. Goals & Non-Goals

### Goals
- Help a user with zero pre-formed idea converge on one concrete, defensible software project
- Produce a written 5-section proposal saved to `docs/ideas/`
- Match the recursive-probing style: 8-12 total turns (target 10), each answer unfolds the next question
- Work in Claude Code, Cursor, Trae, Codex (any agent supporting the Anthropic SKILL.md format)
- Auto-detect user level (beginner / indie dev / PM) from the first 1-2 answers
- All SKILL.md and prompt content in English (community-friendly)

### Non-Goals
- Not a general-purpose chatbot. If the user already has a concrete project, this skill should NOT trigger.
- Not a project planner. After proposal is saved, the skill points to next-step options but does not itself produce a task plan.
- Not domain-broad. Software projects only — no writing, business, or non-tech content.
- Not multi-lingual. The skill itself is English-only; the user can answer in any language and the AI adapts conversationally.

## 3. Triggers

**Slash command:** `/idea`

**Natural-language phrases (matched in SKILL.md `description`):**
- "I want to start a project"
- "help me brainstorm"
- "I need project ideas"
- "what should I build"
- "想做个项目" / "帮我想个点子" (Chinese — Anthropic agents with multilingual support)

**Negative triggers (do NOT fire):**
- User already names a concrete project: "help me build a Notion plugin"
- User asks for technical advice on an existing project
- User asks for project management or planning of an existing project

## 4. File Layout

The project root (`IdeasSkill/`) IS the skill folder. When installed, the user copies the whole project to `.claude/skills/idea/` (or platform equivalent). All files therefore live at the project root, not in a subdirectory.

```
.                                          # project root = skill folder
├── SKILL.md                                # Main entry: triggers, hard rules, flow
├── README.md                               # User-facing docs
├── LICENSE                                 # MIT
├── references/
│   ├── discover-problem.md                 # Stage 1
│   ├── discover-audience.md                # Stage 2
│   ├── define-mvp.md                       # Stage 3
│   ├── choose-tech.md                      # Stage 4
│   └── differentiate.md                    # Stage 5
├── templates/
│   └── proposal-template.md                # 5-section proposal template
└── examples/
    ├── cli-time-tracker.md                 # Worked example 1
    └── api-mock-server.md                  # Worked example 2
```

## 5. Five-Stage Flow

| # | Stage | Reference | Opening question | Exit criteria |
|---|-------|-----------|------------------|---------------|
| 1 | Problem | `discover-problem.md` | "What problem are you trying to solve, or what frustrates you?" | User can state the problem in 1 sentence, names a specific group, shows emotional weight |
| 2 | Audience | `discover-audience.md` | "Who has this problem most acutely?" | At least 1 concrete user persona + 1 specific usage scenario |
| 3 | MVP | `define-mvp.md` | "What's the smallest set of features that would make those users say 'finally'?" | User lists ≤5 core features, each with perceived user value |
| 4 | Tech | `choose-tech.md` | "What platforms / languages do you already know or want to learn?" | User picks a primary stack + deployment target |
| 5 | Differentiate | `differentiate.md` | "What already exists? What's missing?" | User names ≥1 closest competitor + ≥1 differentiator |

**Per-stage internal loop:** 2-4 recursive turns. Total across all 5 stages: 8-12 turns (target 10).

**Layered probe principle within each stage:**
- Turn 1: concrete fact (what scenario?)
- Turn 2: quantification (how much, how often?)
- Turn 3: emotion (how painful?)

## 6. Probe Tree Convention (applies to all 5 reference files)

Each reference file follows this structure:

```markdown
# Stage N: <Name>

## Goal
<what the AI is trying to extract>

## Opening Question
<the first question, must be open-ended>

## Probe Tree
<IF-THEN rules for follow-ups>
- IF user gives vague answer → probe X
- IF user names a problem area → probe Y
- IF user gives a personal pain → probe Z

## Exit Criteria
<bulleted list of conditions that mean the stage is done>

## Anti-patterns
<common user mistakes and AI mistakes to avoid>
```

## 7. Output: 5-Section Proposal

Saved to `docs/ideas/YYYY-MM-DD-<slug>-idea.md`.

`<slug>` is derived from stage-1 keywords: lowercase, kebab-case, 2-4 words.

Template (`templates/proposal-template.md`):

```markdown
# <Project Name>

## 1. One-liner
<≤20 words: what + for whom>

## 2. Problem
<2-3 paragraphs: scenario + prevalence/severity + why now>

## 3. Target User & Scenario
<1 persona paragraph + 1 concrete usage story (time, place, action)>

## 4. MVP Features
<3-5 bullets: action + user-perceivable value>

## 5. Why You, Why Now
<2-3 paragraphs: competitor landscape + differentiator + founder fit>

---
*Generated by /idea on <date>*
*Conversation log: <3-line summary of the 5 stages>*
```

## 8. Write-to-Disk Flow

1. After stage 5 exit, the AI renders the full proposal in chat (does NOT write yet).
2. AI asks: "Here's your proposal. Satisfied? Modify any section, or write to disk?"
3. On user confirmation:
   - Compute path: `docs/ideas/<YYYY-MM-DD>-<slug>-idea.md`
   - Create `docs/ideas/` if absent
   - Use `Write` tool to save
4. After save, AI offers 3 follow-up options:
   - "Enter implementation plan?"
   - "Break down week-1 tasks for the MVP?"
   - "Discuss technical risks now?"
5. If user says "I need to think" at any point: save current state to `docs/ideas/.drafts/<timestamp>-draft.md` and stop.

## 9. Edge Cases

| Scenario | Handling |
|----------|----------|
| User gives all 5 stages of info in one message | Don't re-ask; from stage 1 only ask clarification questions (quantify, emotion), skip known info |
| User says "I don't know" twice in a row | Switch to "stimulus mode": offer 3 contrasting examples (designer / kid / enterprise), let user pick closest |
| User says "I need to think" | Stop immediately, save draft to `docs/ideas/.drafts/<ts>-draft.md` |
| User switches topic mid-flow | Save current progress, ask "Saved to X. Start a new direction?" |
| User already has a clear idea | Skip stages 1-2, enter stage 3 |
| User asks "how does this work?" | Show current stage name + remaining stages |

## 10. Hard Rules (AI Behavior Constraints)

1. **One question at a time** (unless asking for sub-options of the same theme).
2. **Confirm before advancing**: after each stage, ask "Satisfied with this answer? Add anything, or move to the next stage?"
3. **User can always go back** to a previous stage.
4. **Show full markdown before writing** to disk. Never write silently.
5. **Never decide for the user**: tech stack, target user, competitor — AI gives options, user picks.
6. **No placeholders** in the final proposal. Unfilled sections must read "(skipped by user)".
7. **No premature proposal generation**: if any of the 5 stages hasn't exited, do NOT generate a "final" proposal.
8. **No silent edits to confirmed stages**: once user moves past a stage, that stage's content is locked unless the user explicitly requests a change.

## 11. Auto User-Level Detection

After the first 1-2 answers, the AI infers the user's level and adjusts language:

| Signal | Inferred level | Adjustment |
|--------|---------------|-----------|
| Uses developer jargon, names specific tech, references "users" or "MRR" | Indie dev | Skip basics, ask about go-to-market and competitor gaps |
| Says "I don't code" / asks "what's an API" | Non-coder | Suggest no-code tools (Bolt.new, Cursor, Replit Agent), discuss feasibility first |
| Describes users/businesses, not themselves | PM / non-tech | Ask business questions; frame MVP as "what to spec for an engineer" |

Detection is one-shot after the first stage; AI states the inferred level once and proceeds.

## 12. Self-Test Scenarios (in SKILL.md `## Self-test`)

**Scenario A — "Vague user"**
- Input: "I want to make something but I don't know what"
- Expected: AI starts from stage 1's deepest probe ("what annoyed you last week?"), runs ≥3 turns

**Scenario B — "Has idea, vague on details"**
- Input: "I want to build a tool to organize Notion notes"
- Expected: AI skips stage 1, enters stage 2 (audience and scenario)

**Scenario C — "Full info dump"**
- Input: One message covering problem, audience, MVP, tech, competitors
- Expected: AI starts at stage 1, only asks clarification questions (quantify, emotion), doesn't repeat known info

## 13. README.md Content

- Install instructions (copy to `.claude/skills/idea/` or `~/.claude/skills/idea/`)
- Trigger list
- Mermaid flow diagram of the 5 stages
- Links to the 2 worked examples
- Contribution guide: how to add a new stage, how to edit a probe tree
- License (MIT)

## 14. Open Questions

None at design time. All clarifications resolved during brainstorming.

## 15. Out of Scope (for v1)

- Multi-language SKILL.md (only English v1)
- Persistent user profile (no memory across sessions)
- Integration with task managers (Linear, Jira)
- Auto-generation of GitHub repo from proposal
