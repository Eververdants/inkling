# Inkling — Landing Page

The official landing page for the **Inkling** Claude Code skill — a 5-stage recursive ideation engine that turns vague ideas into shippable project proposals.

Built as a static site with Vite + React 19 + Tailwind CSS v4, deployed via GitHub Pages.

## Tech Stack

- **Build**: Vite 8
- **Framework**: React 19
- **Styling**: Tailwind CSS v4 (Vite plugin mode)
- **Icons**: lucide-react
- **Fonts**: Fraunces (display serif), Inter (body sans), JetBrains Mono (monospace), Noto Sans/Serif SC (Chinese fallback)
- **Linting**: oxlint
- **Deployment**: GitHub Pages via `gh-pages`

## Local Development

```bash
npm install
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview production build
npm run deploy     # Deploy to GitHub Pages
```

## Project Structure

```
.
├── index.html                 # Entry HTML (Google Fonts, meta tags, OG)
├── vite.config.js             # Vite config (React + Tailwind v4 plugins)
├── public/
│   └── favicon.svg            # Site icon
└── src/
    ├── main.jsx               # React mount entry
    ├── index.css              # Tailwind entry + design tokens + custom animations
    ├── App.jsx                # Root component (layout, scroll state, i18n)
    ├── data/
    │   ├── i18n.js            # Chinese / English localized copy
    │   └── sampleProposal.js  # Sample proposal markdown for preview
    ├── hooks/
    │   └── useReveal.js       # IntersectionObserver-based scroll reveal hook
    ├── utils/
    │   └── highlightMarkdown.js # Simple markdown → HTML highlighting for sample
    └── components/
        ├── Nav.jsx            # Top navigation bar (ZH/EN toggle, scroll state)
        ├── Hero.jsx           # Hero section with convergence diagram
        ├── Convergence.jsx    # Animated SVG diagram (5 orbiting nodes → center)
        ├── Stats.jsx          # Key metrics (5 stages, 10 questions, etc.)
        ├── ScrollProgress.jsx # Thin scroll progress indicator at viewport top
        ├── Stages.jsx         # 5-stage flow overview
        ├── StageRow.jsx       # Individual stage row component
        ├── How.jsx            # "How it works" principles section
        ├── HowCard.jsx        # Individual principle card
        ├── Sample.jsx         # Sample proposal output preview
        ├── CopyButton.jsx     # Clipboard copy button for code blocks
        ├── Install.jsx        # Installation instructions
        ├── CTA.jsx            # Final call-to-action section
        ├── Footer.jsx         # Footer with links and compatibility info
        ├── Wordmark.jsx       # "Inkling" wordmark / logo
        └── GithubMark.jsx     # GitHub icon mark
```

## Design

- **Dark editorial theme**: Warm ink-black (`#0a0905`) base with amber (`#d4a574`) accents
- **Asymmetric layout**: 1240px max-width container with deliberate whitespace
- **Typography contrast**: Fraunces (display) × Inter (body) × JetBrains Mono (labels)
- **Convergence diagram**: Animated SVG as the Hero visual anchor — 5 orbiting nodes collapsing to center
- **Bilingual**: ZH/EN toggle in navigation, full copy in both languages
- **Scroll reveal**: Sections fade and slide up on enter via IntersectionObserver
- **Paper grain overlay**: Subtle noise texture for tactile depth
- **Selection accent**: Amber highlight on dark background

## Sections

| Section   | Component    | Purpose                                           |
|-----------|-------------|---------------------------------------------------|
| Hero      | `Hero`      | Value proposition, convergence diagram, CTA links |
| Stats     | `Stats`     | Key metrics (5 stages, ~10 questions, 1 proposal) |
| Stages    | `Stages`    | Deep-dive into each of the 5 probing stages        |
| How       | `How`       | Design principles (one-at-a-time, revisitable, output) |
| Sample    | `Sample`    | Rendered example of a generated proposal           |
| Install   | `Install`   | One-command install instructions                   |
| CTA       | `CTA`       | Final call to action                               |

## Deployment

The production build outputs to `dist/` and is deployed to GitHub Pages:

```
https://eververdants.github.io/inkling
```

Deploy via:

```bash
npm run deploy
```

This pushes the `dist/` folder to the `gh-pages` branch.

## License

MIT — maintained by [Eververdants](https://github.com/Eververdants).
