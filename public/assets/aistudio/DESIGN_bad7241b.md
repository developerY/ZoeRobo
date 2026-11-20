---
name: Autonomous Kinetic
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3f4850'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#707881'
  outline-variant: '#bfc7d2'
  surface-tint: '#006398'
  primary: '#006194'
  on-primary: '#ffffff'
  primary-container: '#007bb9'
  on-primary-container: '#fdfcff'
  inverse-primary: '#93ccff'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#00685f'
  on-tertiary: '#ffffff'
  tertiary-container: '#008378'
  on-tertiary-container: '#f4fffc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cce5ff'
  primary-fixed-dim: '#93ccff'
  on-primary-fixed: '#001d31'
  on-primary-fixed-variant: '#004b73'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
  canvas-pure: '#FFFFFF'
  canvas-subtle: '#F8FAFC'
  canvas-muted: '#F1F5F9'
  border-grid: '#E2E8F0'
  border-active: '#CBD5E1'
  mode-run: '#0284C7'
  mode-drive: '#2563EB'
  mode-fly: '#0D9488'
  signal-alert: '#EF4444'
  signal-warning: '#F59E0B'
  signal-success: '#10B981'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an architectural, ultra-crisp aesthetic engineered specifically for high-performance robotics hardware, autonomous systems, and applied artificial intelligence. It reflects absolute precision, kinematic poise, and empirical clarity. 

### Core Aesthetic Pillars
- **Strict Light Architectural Environment**: Completely devoid of muddy dark modes. Pure optical white surfaces (`#FFFFFF`) grounded by subtle mechanical off-whites (`#F8FAFC`, `#F1F5F9`) mirror pristine laboratory workstations and aerospace cleanrooms.
- **Precision Mechanical Constructivism**: Layouts are governed by high-density bento grids, structural hairline dividers, and technical data callouts that echo CAD assemblies, robotic telematics, and schematic documentation.
- **Kinetic Accentuation**: High-frequency robotic accents (electric cyan-blue, deep computational azure, and cybernetic teal) puncture neutral canvas planes to communicate operational status, mode triggers, and sensor metrics.
- **Tactile High-Tech Utility**: Interactive states prioritize tactile feedback via micro-metric borders, subtle glass blurs, and mono-spaced telemetry indicators, providing immediate legibility for mission-critical robotic operations (Run, Drive, Fly).

## Colors

The color palette enforces a strict light environment engineered to maximize legible technical contrast.

### Palette Architecture
- **Primary (`#0284C7` - Electric Cyan-Blue)**: The primary visual beacon used for core interactive components, focal triggers, autonomous telemetry readouts, and primary active states.
- **Secondary (`#2563EB` - Computational Azure)**: Applied to deep navigational nodes, structural accents, and secondary actions requiring distinct semantic separation from the primary cyan.
- **Tertiary (`#0D9488` - High-Tech Teal)**: Dedicated to sensor readouts, environment scanning overlays, airborne telemetry, and hardware validation indicators.
- **Neutral (`#0F172A` - Slate 900)**: Deep, high-contrast carbon slate used for high-clarity typography, structural frames, and solid-state iconography. Never muddy pure blacks.

### Functional Canvas & Mode Colors
- Surfaces utilize three deliberate tonal tiers: `#FFFFFF` (elevated cards and overlays), `#F8FAFC` (primary page substrate), and `#F1F5F9` (sunken telemetry wells, code matrices, and segmented control tracks).
- Autonomy mode tags use specific dedicated anchors:
  - **RUN**: Electric Cyan (`#0284C7`)
  - **DRIVE**: Azure (`#2563EB`)
  - **FLY**: High-Tech Teal (`#0D9488`)

## Typography

The typographic hierarchy bridges aerodynamic engineering and high-density legibility.

### Hierarchy & Usage
- **Headline Layer (`Space Grotesk`)**: Geometric and technical, delivering forward-looking industrial sharpness. Applied to hero sections, modular card titles, and high-impact category headers.
- **Body Layer (`Inter`)**: Neutral, neutral-grotesque efficiency calibrated for high-volume technical documentation, robotics research narratives, and specifications.
- **Label & Data Layer (`JetBrains Mono`)**: Strict monospaced treatment for operational badges, mode toggles, telemetry readouts, coordinate systems, and hardware revision indexes.

All uppercase labels must utilize expanded letter-spacing (`0.04em` to `0.06em`) to ensure instant legibility across peripheral monitoring panels.

## Layout & Spacing

The layout model is anchored on an engineering-grade 12-column fluid grid system paired with strict 8px structural intervals.

### Grid & Responsiveness
- **Desktop (1200px+)**: 12-column layout with `1.5rem` (24px) gutters and `3rem` (48px) safe outer margins. Bento compositions span dynamic subdivisions (e.g., 8+4, 4+4+4, or 6+6).
- **Tablet (768px – 1199px)**: 8-column layout with `1.5rem` gutters and `2rem` outer margins. Bento cards reflow to dual-column stacks.
- **Mobile (< 768px)**: 4-column layout with `1rem` gutters and `1.25rem` margins. All horizontal modular cards compress cleanly to full-width structural modules.

### Rhythm & Modular Cards
Modular bento cards maintain equal interior padding via `space-lg` (24px) on desktop and `space-md` (16px) on mobile viewports. Dense telemetry tables and specs collapse empty layout padding strictly using the `space-xs` and `space-sm` scales.

## Elevation & Depth

Visual hierarchy is communicated through structural layering, precision technical borders, and low-amplitude ambient diffusion rather than deep artificial drop shadows.

### Elevation Tiers
- **Tier 0 (Substrate)**: `#F8FAFC`. Base canvas floor. Completely flat.
- **Tier 1 (Modular Bento Surface)**: `#FFFFFF`. Bounded by a crisp 1px hairline border (`#E2E8F0`). Casts an ultra-subtle ambient shadow: `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.03)`.
- **Tier 2 (Interactive Floating / Hover Cards)**: `#FFFFFF`. Accentuated border shift (`#CBD5E1`). Diffused ambient lift: `box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.05), 0 8px 10px -6px rgba(15, 23, 42, 0.03)`.
- **Tier 3 (Glass Overlays & Navigation Heads)**: `#FFFFFF` at 85% opacity with `backdrop-filter: blur(12px)`. Outlined with a fine translucent edge (`rgba(226, 232, 240, 0.8)`).
- **Tier 4 (Hardware Schematics Overlays & Modals)**: Elevated `#FFFFFF` surfaces with dual-layer crisp containment: `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 0 0 1px #E2E8F0`.

## Shapes

The design system enforces a disciplined, low-radius shape profile (`roundedness: 1`) that preserves clean geometric silhouettes reminiscent of precision-milled aluminum chassis and robotic modularity.

### Geometry Specifications
- **Standard UI Elements & Bento Cards**: Base corner radius of `0.25rem` (4px). Provides edge softness without degrading technical rigor.
- **Card Containers & Modal Viewports**: `rounded-lg` at `0.5rem` (8px).
- **Large Panels & Schematics Canvases**: `rounded-xl` at `0.75rem` (12px).
- **Exceptions (Pill Tags & Status Badges)**: Mode toggles (`RUN`, `DRIVE`, `FLY`), status pips, and metric chips break from base rectangularity into full pill shapes (`rounded-full` / 9999px) to immediately signal active operational telemetry.

## Components

### 1. Buttons
- **Primary CTA**: Solid `#0284C7` (Electric Cyan) background, pure white text, font `JetBrains Mono`, weight 600, uppercase letter-spacing `0.04em`. Hover transition to deep cyan (`#0369A1`) with micro-elevation.
- **Secondary CTA**: Architectural white background, 1px border `#E2E8F0`, Slate-900 text. Hover triggers a crisp `#0284C7` border and soft cyan wash tint (`#F0F9FF`).
- **Telemetry Action Button**: Monospaced text with an integrated square terminal indicator pip that pulses when execution mode is active.

### 2. Autonomy Mode Chips & Pills
- Pill-shaped (`rounded-full`) labels featuring an 8px leading operational pip.
- **Run (Jag.U.R™)**: Border `rgba(2, 132, 199, 0.3)`, background `#F0F9FF`, text `#0284C7`.
- **Drive (Self-Driving Car)**: Border `rgba(37, 99, 235, 0.3)`, background `#EFF6FF`, text `#2563EB`.
- **Fly (FireFly™)**: Border `rgba(13, 148, 136, 0.3)`, background `#F0FDFA`, text `#0D9488`.

### 3. Modular Bento Cards
- Crisp `#FFFFFF` surface framed with `1px solid #E2E8F0` and `rounded-lg` (8px).
- Header bar contains technical metadata in `JetBrains Mono` (e.g., `SYS.VER // 04.2`), body contains primary `Space Grotesk` typography, and footer nests performance metrics or schematic preview diagrams.

### 4. Technical Metric Badges & Telemetry Panels
- Micro-containers with `#F1F5F9` background, inset borders, displaying numeric readouts with `JetBrains Mono` tracking.
- Units are offset in `text-xs` muted Slate-500.

### 5. Input Fields & Search Bars
- Background `#FFFFFF`, border `1px solid #CBD5E1`, typography `Inter` 14px. Focus state eliminates heavy outer rings in favor of a crisp `2px solid #0284C7` mechanical outline with zero layout shift.

### 6. Data Tables & Schematic Specs
- Minimalist architectural grid lines (`1px solid #F1F5F9` row dividers). Alternate hover states highlighted with `#F8FAFC`.
- Headers set in `label-sm` `JetBrains Mono` uppercase Slate-500. Numeric columns aligned right for instant visual comparison.