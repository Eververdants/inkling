# Stage 5: Differentiate

## Goal

Force honesty about the competitive landscape. The user must name at least one real competitor, identify the gap, and articulate why they (or their unique angle) can win that gap.

## Opening Question

"What already exists that tries to solve this problem? What's the closest thing to what we're building?"

## Question Format

Use a 2-step `AskUserQuestion` flow.

**Step 1 — `AskUserQuestion` for the competitive landscape:**

Question: "What does the existing landscape look like for this problem?"
Options:
- A) "There's a clear market leader (one obvious tool)"
- B) "There are 2-5 tools, none dominant"
- C) "I genuinely don't know of any"
- D) "Let me search first, then come back"

If the user picks C, do a quick web search (using the `WebSearch` or `WebFetch` tool) for `<problem> app` or `<problem> tool` before proceeding. If they pick D, end the turn and wait.

**Step 2 — `AskUserQuestion` for the gap, conditional on step 1 being A or B:**

Question: "What's the gap in the existing tools?"
Options:
- A) "The existing tools are too expensive"
- B) "They miss a specific use case or workflow"
- C) "They're hard to use / require too much expertise"
- D) "Let me describe the gap in my own words (free-form)"

If the user picks D, accept their text and probe further via the "vague answer" branch of the probe tree.

If step 1 was C and the web search still found nothing, **end this stage with a warning** that the problem may not be painful enough, and ask the user to reconsider the problem in stage 1.

## Probe Tree

- **IF user can't name any competitor** ("I don't think there is one")
  - Probe: "If you Google '<your problem> app' or '<your problem> tool', what comes up? Even half-related tools count."
  - Follow-up: "If nothing comes up at all, that itself is a red flag — usually means the problem isn't painful enough. Are you sure people want this?"

- **IF user names 1-3 competitors**
  - Probe: "For each: what do users complain about in their reviews, Reddit threads, or tweets? What's the loudest 'I wish it had…'?"
  - Follow-up: "Which of those complaints does YOUR MVP directly fix? If none, we should rethink the differentiator."

- **IF user names many competitors** ("there are 50 tools for this")
  - Probe: "Pick the ONE that's closest to what you want to ship. If you had to put your product next to it, what's the one sentence that makes someone pick you?"

- **IF user dismisses competitors as "not as good"**
  - Probe: "Why would someone still use THEM and not you, even if you think yours is better? What's the switching cost or trust factor?"

## Exit Criteria

Move to proposal generation only when ALL of these are true:

- [ ] User names at least 1 real competitor (with a product name)
- [ ] User identifies a specific gap that competitor leaves unfilled
- [ ] User can articulate in one sentence why someone would pick this new project over the competitor
- [ ] User shows awareness of at least one honest risk (e.g. "I have no audience", "the incumbent has more features")

If any criterion is unmet, ask one more focused probe. Do not advance.

## Anti-patterns

**User mistakes to watch for:**
- "There's no competition" delusion. Almost every problem has tools — even spreadsheets count.
- Vague differentiation ("we're better", "we use AI"). Force specifics: "10x faster at X" / "free while they charge $50" / "works on Y platform".
- Founder-fit blindness. If the user has no domain expertise and no audience, probe: "Why are YOU the right person to build this?"

**AI mistakes to avoid:**
- Don't suggest competitors. The user must research and identify them.
- Don't suggest differentiation language. Help the user find it, but they must own it.
- Don't let the user skip this stage. A project with no clear differentiator is fragile.
