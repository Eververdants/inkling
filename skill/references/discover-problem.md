---
name: discover-problem
description: Stage 1 probe tree — extract a concrete, emotionally-weighted problem statement
type: reference
---

# Stage 1: Discover the Problem

## Goal

Extract a concrete, emotionally-weighted problem statement. The user must be able to name a specific group that suffers from it (not "everyone") and articulate why it hurts.

## Opening Question

"What problem are you trying to solve, or what frustrates you in your work or life right now?"

## User-level detection (critical — do not skip)

After the user's first 1-2 answers, infer their level and state it explicitly. See the table in SKILL.md. Say: "I detect you're a [level] — I'll tailor the conversation from here."

This MUST happen during stage 1. If you skip it, you risk using the wrong tone and recommendations for the rest of the conversation.

## Question Format

Present the opening as `AskUserQuestion`:

Question: "Where are you right now — which starting point fits?"
Options:
- A) "Vague: I just want to build something, help me find a problem" → leads to the "vague answer" branch in the probe tree
- B) "I already have a problem in mind, help me sharpen the wording" → leads to the "personal pain" branch
- C) "Let me describe in my own words (free-form)" → falls through to text input
- D) "Suggest 3 common indie-hacker pain points, I'll pick one" → stimulus mode

Always keep the "free-form" escape hatch (option C) so the user is never forced to pick a poor fit. After the user picks or types, follow the corresponding probe-tree branch below.

## Probe Tree

- **IF user gives a vague answer** ("I don't know", "everything is broken", "I just want to build something")
  - Probe: "Forget building for a moment. Pick one moment from the past week when you felt annoyed or blocked doing something — what was it? Walk me through it."
  - Follow-up if still vague: "If you had a magic wand and could automate exactly one thing you do repeatedly, what would it be?"

- **IF user names a problem area** ("communication", "productivity", "managing tasks")
  - Probe: "Specifically, which moment inside that area is most painful? Give me a concrete scene — when, where, who else was there, what happened."
  - Follow-up: "How often does that scene happen — daily, weekly, monthly?"

- **IF user names a personal pain** ("my code reviews take forever", "I keep losing track of which client owes what")
  - Probe: "How much time or money does this cost you per week? Who else has the same problem that you know of?"
  - Follow-up: "Have you tried any tools or hacks for this? Why didn't they stick?"

- **IF user says "I want to make money" or pivots to solution** ("I want to build an AI assistant for X")
  - Probe: "Forget the solution and money for a moment. What would you build just for fun or curiosity, even if nobody paid?"
  - Follow-up: "Why does that one pull at you? What itch does it scratch?"

## Exit Criteria

Move to stage 2 only when ALL of these are true:

- [ ] User can state the problem in one clear sentence
- [ ] The sentence names a specific group (e.g. "freelance designers", not "everyone")
- [ ] User shows emotional weight ("I hate this", "this wasted 3 hours of my day", "it's embarrassing when…")
- [ ] User has given at least one concrete scene (time + place + action), not just an abstract description

If any criterion is unmet, ask one more focused probe. Do not advance.

## Anti-patterns

**User mistakes to watch for:**
- Describing a solution, not a problem ("I want to build an AI chatbot"). Refocus: "What's the human problem behind wanting to build that?"
- Naming too broad an audience ("anyone who codes"). Narrow: "Pick one specific type of coder you know personally."
- Skipping the emotional layer. If the user sounds detached, ask: "How does this make you feel when it happens?"

**AI mistakes to avoid:**
- Don't suggest solutions during this stage. Stay in the problem lane.
- Don't accept "productivity" or "communication" as a problem. These are categories, not problems.
- Don't move to stage 2 just because the user wrote a paragraph. Apply the exit criteria.
