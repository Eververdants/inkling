# Stage 4: Choose the Tech

## Goal

Pick a primary stack the user can actually ship with. Bias toward "what you already know" unless the user has a strong reason to learn something new.

## Opening Question

"What languages, frameworks, or platforms do you already feel comfortable shipping in? And is there anything you've been wanting to learn for this project?"

## Probe Tree

- **IF user names a language/framework confidently** ("I know Next.js and Postgres")
  - Probe: "Great. For deployment — where will it live? Vercel, Fly.io, your own server, the App Store?"
  - Follow-up: "Anything you want to AVOID using? Some folks have strong feelings against X."

- **IF user has no preference** ("I don't care, whatever's best")
  - Probe: "What does the product need to do at minimum? Mobile? Web? CLI? API? That'll narrow it. Pick whichever constraint matters most to you."

- **IF user wants to learn something new** ("I want to use Rust because I'm tired of TS")
  - Probe: "What's your timeline for the MVP — 2 weeks, 2 months, 6 months? Learning a new language adds at least 2-4x to your MVP time. Is that worth it for this project?"

- **IF user is non-technical** ("I don't code")
  - Probe: "Three good no-code/low-code paths for getting to MVP fast: Bolt.new, Cursor with AI, or Replit Agent. Have you tried any? Which sounds closest to how you'd like to work?"
  - Follow-up: "Bolt.new is fastest for web apps. Cursor is best if you want to learn as you go. Replit Agent is best for full-stack hosted. Pick one to start."

## Exit Criteria

Move to stage 5 only when ALL of these are true:

- [ ] User names a primary language/framework (or a no-code tool)
- [ ] User names a deployment target (web host, app store, package registry, etc.)
- [ ] User acknowledges at least one major risk of the choice (e.g. "I know Next.js but I haven't done auth yet")
- [ ] User confirms the timeline is realistic for the MVP from stage 3

If any criterion is unmet, ask one more focused probe. Do not advance.

## Anti-patterns

**User mistakes to watch for:**
- Resume-driven development ("I want to use Rust, Go, Elixir, and WASM"). Probe: "Pick ONE stack. You can rewrite in others later."
- Trendy-stack trap ("I want to use AI agents / blockchain / whatever is hot"). Probe: "Why this stack for THIS project, specifically?"

**AI mistakes to avoid:**
- Don't recommend specific tools unless the user is non-technical. Otherwise let them pick.
- Don't argue for or against technologies. The user knows their context.
- Don't skip the "what do you already know" question — it's the most important one for time-to-ship.
