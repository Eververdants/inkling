---
name: discover-audience
description: Stage 2 probe tree — convert the abstract problem into a concrete user persona with a specific usage scenario
type: reference
---

# Stage 2: Discover the Audience

## Goal

Convert the abstract problem into a concrete user persona with a specific usage scenario. The user must produce at least one named persona and one vivid scene.

## Opening Question

"Of all the people who have this problem, who has it most acutely? Tell me about one specific person you have in mind — it could even be yourself."

## Question Format

Present the opening as `AskUserQuestion`:

Question: "Who has the problem most acutely?"
Options:
- A) "Myself — I have this problem" → leads to the "myself" branch in the probe tree
- B) "A specific person I know" → leads to the "broad group" branch (narrow it down)
- C) "A user type I imagine (not personally known)" → leads to a follow-up `AskUserQuestion` with 4 common persona types (designer / developer / PM / writer)
- D) "Let me describe in my own words (free-form)" → falls through to text input

If the user picks C, immediately follow up with a second `AskUserQuestion`:
Question: "Which persona type fits best?"
Options: "Designer or creative" / "Developer or engineer" / "Product manager or operator" / "Writer, student, or knowledge worker"

Only fall through to text input if the user picks D or the "Other" escape on the second question.

## Probe Tree

- **IF user names a broad group** ("developers", "small businesses", "students")
  - Probe: "Pick a single person in that group you actually know or could imagine vividly. What does their day look like? Where do they live, what tools do they use, how old are they?"
  - Follow-up: "In what moment of their day does this problem hit them hardest?"

- **IF user says "myself" or "me"**
  - Probe: "Good — tell me about a specific day last week when this problem hit you. Walk me through it hour by hour if you can."
  - Follow-up: "Are there 10+ people exactly like you who'd want this? Where do they hang out online?"

- **IF user describes multiple personas** ("designers and developers and PMs")
  - Probe: "Pick just one of those groups for the MVP. Which one would feel the most relief if this existed tomorrow?"
  - Follow-up: "We'll design for that one first. You can always expand later."

- **IF user can't name anyone** ("it's for everyone")
  - Probe: "Pretend you're marketing this. If you had to pick ONE website where the first 100 users would come from, which site? That's your initial audience."

## Exit Criteria

Move to stage 3 only when ALL of these are true:

- [ ] User names at least one specific persona (not a category)
- [ ] User describes a concrete usage scene with time + place + action
- [ ] User can name at least one reachable channel for finding these people (a subreddit, a Slack group, a Twitter hashtag, a conference, etc.)

If any criterion is unmet, ask one more focused probe. Do not advance.

## Anti-patterns

**User mistakes to watch for:**
- Conflating "user" with "buyer" (in B2B, the person who suffers ≠ the person who pays). Probe both if relevant.
- Naming themselves as the only user with no path to others. Probe: "How do you find more people like you?"

**AI mistakes to avoid:**
- Don't suggest the target audience. The user must pick.
- Don't let the user skip the scene. Without a scene, MVP features in stage 3 will be generic.
- Don't accept "developers" or "designers" alone. Require a narrower slice.
