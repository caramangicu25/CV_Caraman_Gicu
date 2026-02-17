# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start dev server (root project)
npm run dev

# Build for production
npm run build

# Lint
npm run lint

# Preview production build
npm run preview
```

The `my-cv/` subdirectory is a separate Vite project with its own `package.json` and the same set of scripts — run them from within that directory.

## Architecture

This is a **single-page CV/resume app** built with React 19 + Vite 7. There is no router; the entire UI lives in `src/App.jsx`.

### Key data structures in `src/App.jsx`

- **`TRANSLATIONS`** — all UI label strings keyed by language code (`"ro"`, `"ru"`, `"en"`). The active language is stored in `lang` state and accessed via `const t = TRANSLATIONS[lang]`.
- **`CV_DATA`** — all personal/professional content (name, contact, experience array, education, skills, languages, awards). Fields that need translation are objects with `ro`/`ru`/`en` keys (e.g., `role[lang]`, `bullets[lang]`).
- **Theme constants** — `accent` (`#6ee7a0`), `bg` (`#1a1f1b`), `sub` (`rgba(255,255,255,0.4)`) are module-level constants used throughout inline styles.

### Component structure

- **`App`** — main component; owns `active` (current nav section), `scrollY`, and `lang` state. Uses two `IntersectionObserver` instances: one for active-nav-item tracking and one inside `AnimatedSection`.
- **`LanguageSwitcher`** — fixed top-left pill that changes `lang`.
- **`AnimatedSection`** — scroll-reveal wrapper using `IntersectionObserver`; accepts a `delay` prop for staggered animations.
- **`SectionHead`** — section header with a numbered monospace prefix and an accent-colored bottom border.

### Styling approach

All styles are **inline JSX style objects** — there are no CSS modules, no Tailwind, and no external stylesheets beyond the Google Fonts import (`DM Sans`) and a small `<style>` block embedded at the bottom of `App` for global resets, scroll-behavior, scrollbar styling, and the `pulse` keyframe animation.

### Layout

Fixed left sidebar nav (200 px wide) + scrollable main content area. A parallax full-height photo is positioned fixed on the right and fades/translates out as the user scrolls past the hero section.

### `my-cv/` subdirectory

A separate, independent Vite + React scaffold (default template with a counter). It shares no code with the root project.
