export const SAMPLE_PROPOSAL = `# TimeStamps

## 1. One-liner
A CLI tool that logs what you worked on in 5-second
increments, then tells you where your week went.

## 2. Problem
Freelance developers end every Friday with no memory
of what they actually built. Time-trackers are designed
for billing, not self-reflection: they require start/stop
discipline, treat every task as billable, and bury the
data in a dashboard you have to remember to open.

## 3. Target User & Scenario
Persona: a solo dev running a side project on top of
a day job. Command-line native, suspicious of dashboards,
has already abandoned Toggl / RescueTime at least once.

## 4. MVP Features
- \`ts log "<text>"\`   one keystroke to log activity
- \`ts switch <ctx>\`   start a new context window
- \`ts week\`           7-day summary by context
- Local-only storage, plain JSON, no cloud

## 5. Why You, Why Now
Toggl Track needs an account, RescueTime is surveillance
without labels, Wakatime only watches the editor. None
of them serve the persona of "developer who wants to
know where the week went, but refuses a SaaS tracker."`
