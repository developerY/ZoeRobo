# ZoeRobo Design System — Autonomous Kinetic

An architectural, light-first design system engineered for autonomous robotics hardware, embedded edge AI, and real-time telemetry interfaces. Implemented in Angular 21 and Tailwind CSS v4 (`src/styles.css`).

---

## 1. Design Principles

1. **Strict Light Architectural Canvas**: Optical white (`#FFFFFF`) and cool technical substrates (`#FAF8FF`, `#F8FAFC`, `#F1F5F9`) modeled after cleanroom laboratories and aerospace documentation—never muddy dark pages. Dark surfaces (`#283044`) are reserved strictly for live developer terminals and code blocks.
2. **Kinetic Mode Semantics**: Three high-contrast accent colors cleanly separate physical autonomy domains across navigation, telemetry, badges, and interactive simulators:
   - **RUN (Quadruped / Jag.U.R™)**: Electric Cyan `#0284C7`
   - **DRIVE (Autonomous Ground Vehicle / AI/ML Drive)**: Computational Azure `#2563EB`
   - **FLY (Micro-UAS / FireFly™)**: High-Tech Teal `#0D9488`
3. **Precision Constructivism**: Content is structured in crisp 12-column responsive bento grids with hairline borders (`#E2E8F0`), subtle elevation, and monospaced tabular telemetry (`tabular-nums`).
4. **Functional Clarity & Accessibility**: Every interactive surface uses semantic controls, visible focus states (`outline-mode-run`), high contrast (`#131B2E` on light surfaces), keyboard shortcuts (`⌘K` / `Esc`), and `prefers-reduced-motion` support.

---

## 2. Color Tokens

Defined via Tailwind CSS v4 `@theme` in `src/styles.css`.

### Surfaces & Neutrals

| Token | Hex | Tailwind Utility | Usage |
| :--- | :--- | :--- | :--- |
| `--color-surface` | `#faf8ff` | `bg-surface` | Default page canvas |
| `--color-canvas-pure` | `#ffffff` | `bg-canvas-pure` | Primary cards, modals, fixed header |
| `--color-canvas-subtle` | `#f8fafc` | `bg-canvas-subtle` | Alternating sections, footer, input fills |
| `--color-canvas-muted` | `#f1f5f9` | `bg-canvas-muted` | Metric wells, segmented tracks, metadata chips |
| `--color-surface-container-low` | `#f2f3ff` | `bg-surface-container-low` | Highlighted bento wells & simulator panels |
| `--color-surface-container` | `#eaedff` | `bg-surface-container` | Interactive hover surfaces & spec strip fills |
| `--color-surface-container-high` | `#e2e7ff` | `bg-surface-container-high` | Active navigation state & callout banners |
| `--color-border-grid` | `#e2e8f0` | `border-border-grid` | Standard 1px structural hairline dividers |
| `--color-border-active` | `#cbd5e1` | `border-border-active` | Card hover borders & active outlines |

### Ink & Inverse Terminals

| Token | Hex | Tailwind Utility | Usage |
| :--- | :--- | :--- | :--- |
| `--color-on-surface` | `#131b2e` | `text-on-surface` | Primary headings & high-contrast body text |
| `--color-on-surface-variant` | `#3f4850` | `text-on-surface-variant` | Secondary body copy & descriptions |
| `--color-outline` | `#707881` | `text-outline` | Muted technical labels, units, footnotes |
| `--color-outline-variant` | `#bfc7d2` | `text-outline-variant` | Breadcrumb slashes & subtle separators |
| `--color-inverse-surface` | `#283044` | `bg-inverse-surface` | Live TPU log console & CLI code blocks |
| `--color-inverse-on-surface` | `#eef0ff` | `text-inverse-on-surface` | Monospace output inside dark terminals |

### Brand, Mode & Signal Accents

| Token | Hex | Tailwind Utility | Usage |
| :--- | :--- | :--- | :--- |
| `--color-primary` | `#006194` | `text-primary` / `bg-primary` | Brand anchor, active nav links, primary hover |
| `--color-primary-fixed` | `#cce5ff` | `bg-primary-fixed` | Subtle technical callout chips |
| `--color-on-primary-fixed` | `#001d31` | `text-on-primary-fixed` | High-contrast ink on `primary-fixed` |
| `--color-secondary` | `#0051d5` | `text-secondary` / `bg-secondary` | Secondary CTAs, AI/ML Drive highlights |
| `--color-secondary-container` | `#316bf3` | `bg-secondary-container` | Hover state for secondary CTAs |
| `--color-tertiary` | `#00685f` | `text-tertiary` / `bg-tertiary` | Hover state for FireFly CTAs & sensor accents |
| `--color-tertiary-fixed` | `#89f5e7` | `text-tertiary-fixed` | Highlighted terminal labels on dark surfaces |
| `--color-mode-run` | `#0284c7` | `bg-mode-run` / `text-mode-run` | Primary CTA & **RUN** (Jag.U.R™) domain |
| `--color-mode-drive` | `#2563eb` | `bg-mode-drive` / `text-mode-drive` | **DRIVE** (AI/ML Mini-Car) domain |
| `--color-mode-fly` | `#0d9488` | `bg-mode-fly` / `text-mode-fly` | **FLY** (FireFly™ Drone) domain |
| `--color-signal-success` | `#10b981` | `text-signal-success` | Online status, verified badges, optimal latency |
| `--color-signal-warning` | `#f59e0b` | `text-signal-warning` | Thermal / actuator caution telemetry |
| `--color-signal-alert` | `#ef4444` | `text-signal-alert` | Hazard detection & emergency braking alerts |
| `--color-error` | `#ba1a1a` | `text-error` | Form validation errors |

---

## 3. Typography

Loaded via Google Fonts (`src/index.html`) and mapped in `@theme` (`src/styles.css`):

- **Display & Headings (`--font-display`)**: `Space Grotesk` — geometric, industrial sharpness with `text-wrap: balance` applied to all `h1`–`h4` headings.
- **Body & Technical Prose (`--font-sans`)**: `Inter` — high-legibility neo-grotesque for descriptions, documentation, and forms.
- **Telemetry, Labels & Code (`--font-mono`)**: `JetBrains Mono` — paired with `.tabular-nums` (`font-variant-numeric: tabular-nums`) for aligned frequencies, latencies, and tables.

### Type Scale

| Role | Font | Size / Line-Height | Weight & Tracking |
| :--- | :--- | :--- | :--- |
| Display Hero (Desktop) | `Space Grotesk` | `52px–56px` / `1.08` | `700`, `-0.03em` |
| Display Hero (Mobile) | `Space Grotesk` | `36px–40px` / `1.1` | `700`, `-0.02em` |
| Section Heading (`h2`) | `Space Grotesk` | `32px–36px` / `tight` | `600`, `-0.02em` |
| Card Heading (`h3`) | `Space Grotesk` | `20px–24px` / `1.3` | `600`, `-0.01em` |
| Lead Body | `Inter` | `16px–17px` / `28px` | `400` |
| Standard Body | `Inter` | `15px` / `24px` | `400` |
| Compact Card Body | `Inter` | `13px` / `20px` | `400` |
| Nav & Button Labels | `JetBrains Mono` | `12px` / `16px` | `500–600`, uppercase, `0.04em` |
| Micro Telemetry Labels | `JetBrains Mono` | `10px–11px` / `14px` | `500–700`, uppercase, `0.06em` |

---

## 4. Layout, Spacing & Geometry

### Grid & Container Rhythm
- **Max Content Width**: `max-w-7xl` (`1280px`) centered inside full-bleed alternating section bands (`bg-surface`, `bg-canvas-pure`, `bg-canvas-subtle`, `bg-surface-container-low`).
- **Horizontal Gutters**: `px-6 md:px-12` page padding (`24px` mobile / `48px` desktop) with `gap-6` (`24px`) standard bento grid spacing.
- **Top Offset**: Fixed `h-20` (`80px`) glassmorphic header paired with `pt-20` on `<main>` and `scroll-mt-24` on anchor targets.

### Shape & Corner Radii
Disciplined, machined low-to-medium radii:
- **Buttons, Micro Chips & Table Wells**: `rounded` (`4px`)
- **Inputs, Inner Telemetry Cards & Sub-panels**: `rounded-lg` (`8px`)
- **Primary Bento Cards, Modals & Hero Media**: `rounded-xl` (`12px`)
- **Mode Pills & Status Dots**: `rounded-full` (`9999px`)

### Elevation Hierarchy
- **Tier 0 (Canvas)**: Flat `bg-surface` or `bg-canvas-subtle`.
- **Tier 1 (Bento Cards)**: `bg-canvas-pure border border-border-grid shadow-sm`.
- **Tier 2 (Hover / Spotlight)**: `hover:shadow-md hover:border-border-active transition-all`.
- **Tier 3 (Fixed Glass Navigation)**: `bg-canvas-pure/90 backdrop-blur-xl border-b border-border-grid/70 shadow-[0_1px_8px_rgba(0,0,0,0.04)]`.
- **Tier 4 (Dialogs & Command Palette)**: `shadow-[0_20px_25px_-5px_rgba(15,23,42,0.14),0_0_0_1px_#E2E8F0]` over a `bg-on-surface/40 backdrop-blur-sm` scrim.

---

## 5. Iconography

- Uses Angular Material `<mat-icon>` backed by **Material Symbols Outlined** (`wght: 450`, `FILL: 0`, `opsz: 24`) with `Material Icons` fallback configured globally in `src/styles.css`.
- Standard sizes: `text-[15px]`–`text-[16px]` inline in buttons/links, `text-[18px]`–`text-[20px]` in navigation and tables, `text-[24px]`–`text-[32px]` in capability card headers.

---

## 6. Core UI Component Patterns

1. **Primary CTA Button**: `rounded bg-mode-run hover:bg-primary text-canvas-pure font-mono text-[12px] font-semibold uppercase tracking-wider shadow-sm` (or `bg-mode-fly` / `bg-secondary` when scoped to Fly or Drive pages).
2. **Secondary Architectural Button**: `rounded bg-canvas-pure border border-border-grid hover:bg-canvas-subtle text-on-surface font-mono text-[12px] font-semibold uppercase tracking-wider shadow-sm`.
3. **Segmented Simulator Tabs**: Outer `bg-canvas-muted p-1 rounded-lg` track with active `bg-canvas-pure text-on-surface shadow-sm` or mode-colored active pills.
4. **Top Telemetry Ribbon**: Full-width slim bar below the header displaying platform status, subsystem revision, and key hardware metrics in `10px` uppercase `JetBrains Mono`.
5. **Interactive Simulators & Consoles**:
   - **Overview**: Platform telemetry switcher (`Jag.U.R`, `FireFly`, `AI/ML Car`).
   - **FireFly**: Natural language prompt presets + 3-step mission storyboard progression.
   - **Jag.U.R**: Real-time SVG gait torque waveform & leg thermal profiler (`Recon Scout`, `Heavy Utility`, `Extreme Sprint`).
   - **AI/ML Drive**: SVG TFLite sensor flowchart + streaming dark `bg-inverse-surface` hazard braking terminal.
6. **Specifications Tables**: Clean horizontal scroll wrapper (`overflow-x-auto`), `10px` uppercase mono headers on `bg-canvas-subtle` or `bg-surface-container-low`, `divide-y divide-border-grid/60` rows, `hover:bg-canvas-subtle`, and right-aligned tabular status columns.
7. **Forms & Validation**: Angular Reactive Forms (`FormGroup` / `FormControl`) with `bg-canvas-subtle border border-border-grid` inputs transitioning to `focus:bg-canvas-pure focus:border-mode-run focus:ring-1 focus:ring-mode-run`, paired with inline error (`bg-error-container`) and confirmation (`bg-signal-success/10`) banners.
8. **Navigation & Command Palette**: Persistent frosted header with active route pill (`bg-surface-container-high text-primary font-bold`), responsive mobile drawer, and keyboard-triggered `⌘K` Quick Navigator dialog.
