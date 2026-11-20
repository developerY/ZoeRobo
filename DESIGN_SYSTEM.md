# ZoeRobo Design System — Industrial Precision

An industrial, light-first design system for autonomous robotics, embedded edge AI, and precision engineering. Inspired by aerospace instrumentation, advanced manufacturing, and modern robotics laboratories.

**Technology:** Angular 21 (Zoneless Standalone) · Tailwind CSS v4 · Material Symbols Outlined  
**Design Philosophy:** Modern industrial engineering — functional, precise, mechanically structured, and transparent.

---

## 1. Core Principles

1. **Strict Light Industrial Canvas**
   - Optical white (`#FFFFFF`), warm machine gray (`#F3F3F0`), and light aluminum (`#ECEFED` / `#F0F2F0`) across every surface — including telemetry consoles, CLI code panels, and hero instrument plates.
   - No dark mode, no dark terminal panels, no glassmorphism (`backdrop-blur`), and no pulsing/glowing decorative animations.
2. **Industrial Mode Semantics**
   - **RUN — Jag.U.R™ (`ZR-RUN-001`):** Industrial Orange `#D8662D` (hover `#BE5420`, tint `#F8E2D6`)
   - **DRIVE — AI/ML Car (`ZR-DRV-009`):** Machine Blue `#2864A5` (hover `#205288`, tint `#DCE8F5`)
   - **FLY — FireFly™ (`ZR-FLY-004`):** Engineering Teal `#168477` (hover `#106A5F`, tint `#D5EDE9`)
3. **Mechanical Precision**
   - Squared panel geometry (`2px` buttons/inputs/tags, `4px` cards/panels/modals, `50%` status indicator dots only).
   - Structural separation via solid borders (`#C9CFCE` / `#929C9E`) and surface tonal stepping rather than drop shadows.
   - Numbered section headers (`01 / ...`, `02 / ...`), equipment IDs, revision tags (`REV 4.2`), and subtle `.industrial-grid` drafting backgrounds on engineering diagrams and hero canvases.
4. **Unobstructed Hardware Photography**
   - Robot and cleanroom photographs are framed cleanly between solid top instrumentation bars and bottom specification strips — never covered by dark gradient scrims or translucent frosted overlays.

---

## 2. Color Tokens (`src/styles.css`)

### Industrial Surfaces & Borders
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `--color-surface` | `#F3F3F0` | Main page canvas |
| `--color-canvas-pure` | `#FFFFFF` | Cards, panels, tables, header |
| `--color-canvas-subtle` | `#ECEFED` | Alternating page bands, footer, even table rows |
| `--color-canvas-muted` | `#E2E6E5` | Image frame backing, secondary wells |
| `--color-surface-container` | `#F5F6F4` | Recessed telemetry cells & callout boxes |
| `--color-surface-container-high` | `#E8EBE9` | Table headers, CTA banners, active instrument strips |
| `--color-border-grid` | `#C9CFCE` | Structural dividers & card borders |
| `--color-border-active` | `#929C9E` | Emphasized panels, inputs, and section rules |

### Typography Ink & Light Technical Console
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `--color-on-surface` | `#20272B` | Primary industrial graphite headings & text |
| `--color-on-surface-variant` | `#485359` | Body paragraphs and technical descriptions |
| `--color-outline` | `#697479` | Secondary labels, unit captions, timestamps |
| `--color-inverse-surface` | `#F0F2F0` | Light aluminum console & CLI block surface |
| `--color-inverse-on-surface` | `#243036` | High-contrast graphite console & code ink |

### Brand, Domain & Signal Accents
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `--color-primary` / `--color-mode-run` | `#D8662D` | Brand primary CTA & RUN (Jag.U.R™) |
| `--color-primary-hover` | `#BE5420` | Primary button hover state |
| `--color-secondary` / `--color-mode-drive` | `#2864A5` | DRIVE (AI/ML Car & Edge TPU) |
| `--color-tertiary` / `--color-mode-fly` | `#168477` | FLY (FireFly™ Micro-UAS) |
| `--color-signal-success` | `#27834B` | Verified, online, pass, nominal |
| `--color-signal-warning` | `#D69A25` | Thermal caution, path correction |
| `--color-signal-alert` | `#C63D32` | Hazard detection, emergency braking |
| `--color-error` | `#B52F2B` | Form validation errors |

---

## 3. Typography

| Role | Font Family | Characteristics |
| :--- | :--- | :--- |
| **Display / Headings** | `Barlow Condensed` (`500`, `600`, `700`) | Compact, uppercase, industrial engineering headlines (`tracking-[-0.02em]`) |
| **Body Copy** | `IBM Plex Sans` (`400`, `500`, `600`, `700`) | Clear technical documentation & narrative prose |
| **Telemetry / UI Chrome** | `IBM Plex Mono` (`400`, `500`, `600`, `700`) | Navigation, buttons, equipment IDs, metrics (`tabular-nums`), console output |

---

## 4. Layout & Components

- **Container Width:** `max-w-[1360px]` with `px-6 md:px-10` horizontal padding.
- **Navigation Header:** Fixed `72px` height, solid `#FFFFFF` background, `border-b border-border-active`, squared ZoeRobo mechanical emblem, monospaced uppercase nav links with sharp `2px` orange bottom active indicator, squared `⌘K` Quick Navigator modal, and squared orange `Contact Labs` CTA.
- **Specification Tables:** Strong `border-b-2 border-border-active` header rule, `bg-surface-container-high` header row, `even:bg-canvas-subtle` zebra striping, right-aligned `tabular-nums` ratings.
- **Interactive Modules:**
  - Platform Telemetry Query Switcher (`Overview`)
  - Prompt-to-Kinematic Patrol Simulator + `.csv` Matrix Export (`FireFly™`)
  - Live Quadruped Torque Waveform Profiler + `.txt` Datasheet Export (`Jag.U.R™`)
  - Light TPU Hazard Simulator Console & Drafting Grid Flowchart (`AI/ML Drive`)
  - Filterable Research Repository, Reactive Inquiry Form & FAQ Accordion (`Info & Research`)
  - Platform SDK Switcher, Clipboard Copy & Hardware Manifest Downloads (`Documentation`)
