Absolutely. Your current design is already light-first, but it feels more like a polished AI/SaaS platform than an industrial robotics company.

I would move ZoeRobo toward **Modern Industrial Engineering**: think aerospace instrumentation, advanced manufacturing, robotics laboratories, and precision machinery.

The key changes:

- **No dark mode.** White, warm gray, steel, and light aluminum throughout—including terminals and technical panels.
- **Less lavender and glassmorphism.** Replace them with neutral industrial surfaces and solid borders.
- **More mechanical geometry.** Square corners, stronger dividers, measurement marks, technical labels, and structured panels.
- **A controlled safety-orange accent.** Give the brand a recognizable industrial identity while retaining separate RUN, DRIVE, and FLY colors.
- **More engineering, less decoration.** Robot photography, mechanical diagrams, specifications, sensor visualizations, and real telemetry should carry the visual identity.

## **ZoeRobo — Industrial Precision Design System**

Here is the direction I would use as the replacement for your current design system. It preserves the three robotics domains and your Angular 21 / Tailwind CSS v4 architecture while changing the visual language.&#x20;

Pasted text(20261120-221000).txt



# ZoeRobo Design System — Industrial Precision

An industrial, light-first design system for autonomous robotics, embedded edge AI, and precision engineering. Inspired by aerospace engineering, advanced manufacturing, industrial instrumentation, and modern robotics laboratories.

**Technology:** Angular 21 · Tailwind CSS v4 · Material Symbols Outlined\
**Design philosophy:** Modern industrial engineering. Functional, precise, confident, and mechanically inspired.

---

## 1. Design Principles

1. **Strict Light Industrial Canvas**
   - Optical white, warm machine gray, and light aluminum.
   - No dark mode, dark page backgrounds, or dark terminal panels.
   - Strong graphite typography on light surfaces.
   - Industrial character comes from materials, lines, structure, and precision—not darkness.
2. **Industrial Mode Semantics**\
   Three distinct robotics domains:
   - **RUN — Jag.U.R™:** Industrial Orange `#D8662D`
   - **DRIVE — AI/ML Car:** Machine Blue `#2864A5`
   - **FLY — FireFly™:** Engineering Teal `#168477`
3. **Mechanical Precision**
   - Strong horizontal and vertical alignment.
   - Squared geometry and disciplined spacing.
   - Technical measurement marks, numbering, and engineering labels.
   - Clear separation between functional panels.
   - Minimal shadows; use borders and surface contrast instead.
4. **Engineering Transparency**
   - Specifications should be easy to find.
   - Telemetry should be readable and aligned.
   - Real hardware, technical diagrams, and functional demonstrations take priority over decorative graphics.
5. **Industrial, Not Industrial-Age**
   - Modern and forward-looking.
   - No excessive grunge, distressed textures, or artificial rust.
   - Avoid generic cyberpunk, neon, and glowing effects.

---

## 2. Color Tokens

### Industrial Surfaces

| Token                            | Hex       | Usage                       |
| -------------------------------- | --------- | --------------------------- |
| `--color-surface`                | `#F3F3F0` | Main page background        |
| `--color-canvas-pure`            | `#FFFFFF` | Cards, header, modals       |
| `--color-canvas-subtle`          | `#ECEFED` | Alternating sections        |
| `--color-canvas-muted`           | `#E2E6E5` | Metric wells, input fills   |
| `--color-surface-container`      | `#F5F6F4` | Subpanels                   |
| `--color-surface-container-high` | `#E8EBE9` | Active and hover surfaces   |
| `--color-border-grid`            | `#C9CFCE` | Standard structural borders |
| `--color-border-active`          | `#929C9E` | Active outlines and hover   |

### Industrial Typography

| Token                        | Hex       | Usage                        |
| ---------------------------- | --------- | ---------------------------- |
| `--color-on-surface`         | `#20272B` | Primary text                 |
| `--color-on-surface-variant` | `#485359` | Secondary text               |
| `--color-outline`            | `#697479` | Supporting labels            |
| `--color-outline-variant`    | `#AAB2B3` | Subtle separators            |
| `--color-inverse-surface`    | `#F0F2F0` | Technical console background |
| `--color-inverse-on-surface` | `#243036` | Console text                 |

All technical consoles and code displays remain light.

### Brand & Robotics Accents

| Token                       | Hex       | Usage                   |
| --------------------------- | --------- | ----------------------- |
| `--color-primary`           | `#D8662D` | Industrial brand orange |
| `--color-primary-container` | `#F8E2D6` | Orange callouts         |
| `--color-secondary`         | `#2864A5` | Engineering blue        |
| `--color-tertiary`          | `#168477` | Engineering teal        |
| `--color-mode-run`          | `#D8662D` | Jag.U.R™                |
| `--color-mode-drive`        | `#2864A5` | AI/ML Drive             |
| `--color-mode-fly`          | `#168477` | FireFly™                |

### Industrial Signals

| Token                    | Hex       | Usage                        |
| ------------------------ | --------- | ---------------------------- |
| `--color-signal-success` | `#27834B` | Online, operational          |
| `--color-signal-warning` | `#D69A25` | Thermal and actuator caution |
| `--color-signal-alert`   | `#C63D32` | Hazard and emergency         |
| `--color-error`          | `#B52F2B` | Form validation              |

Safety colors should be used functionally, never as decoration.

---

## 3. Typography

Use typography inspired by industrial equipment labels, engineering documentation, and modern technical publications.

- **Headings:** Barlow Condensed — strong, mechanical, compact.
- **Body:** IBM Plex Sans — technical, approachable, highly legible.
- **Telemetry and Code:** IBM Plex Mono — precise data alignment and technical identity.

### Type Scale

| Role             | Font             | Size    |
| ---------------- | ---------------- | ------- |
| Desktop Hero     | Barlow Condensed | 56–64px |
| Mobile Hero      | Barlow Condensed | 38–44px |
| Section Heading  | Barlow Condensed | 34–40px |
| Card Heading     | Barlow Condensed | 22–26px |
| Lead Body        | IBM Plex Sans    | 17px    |
| Standard Body    | IBM Plex Sans    | 15px    |
| Technical Labels | IBM Plex Mono    | 11–12px |
| Micro Telemetry  | IBM Plex Mono    | 10px    |

Use uppercase typography for equipment labels, specifications, and section identifiers. Avoid uppercase paragraphs.

---

## 4. Layout, Spacing & Geometry

### Grid and Containers

- Maximum content width: 1360px.
- Twelve-column responsive engineering grid.
- Standard page gutters: 24px mobile, 48px desktop.
- Standard panel gap: 20–24px.
- Full-width technical specification strips.
- Alternating white and light-gray section backgrounds.

### Industrial Panel Geometry

Replace soft, oversized rounded cards with precise equipment-panel geometry.

| Element           | Radius |
| ----------------- | ------ |
| Buttons           | 2px    |
| Inputs            | 2px    |
| Data panels       | 4px    |
| Primary cards     | 4px    |
| Modals            | 4px    |
| Status indicators | 50%    |

Avoid excessive pill shapes and floating glass panels.

### Borders & Elevation

- Primary panel: `1px solid #C9CFCE`
- Strong structural divider: `1px solid #929C9E`
- Active panel: `2px solid` domain accent.
- Shadows should be almost invisible.
- Use solid surfaces, horizontal separators, and structural borders to define hierarchy.

### Industrial Details

Introduce small, consistent engineering details:

- Section numbers: `01 / PLATFORM OVERVIEW`
- Equipment identifiers: `ZR-RUN-001`
- Revision markings: `REV 2.4`
- Measurement ticks and calibration marks.
- Small status indicators.
- Technical grid patterns behind diagrams.
- Thin dimension lines and alignment guides.

These details should support the content rather than overwhelm it.

---

## 5. Header & Navigation

Use a solid white industrial header.

- Height: 72px.
- No glassmorphism or backdrop blur.
- Thin graphite-gray bottom border.
- Strong, simple wordmark.
- Navigation labels in IBM Plex Sans or IBM Plex Mono.
- Active navigation uses a small orange underline or solid indicator.
- Mobile navigation uses a clean, square-edged drawer.

Avoid oversized rounded navigation pills.

---

## 6. Industrial UI Components

### Primary CTA

- Industrial orange background.
- White text.
- Squared 2px radius.
- Uppercase label.
- No glow.
- Subtle darkening on hover.

### Secondary CTA

- White background.
- Graphite border.
- Graphite text.
- Industrial-style hover fill.

### Robotics Mode Selector

Three clearly differentiated equipment tabs:

- RUN — Orange.
- DRIVE — Blue.
- FLY — Teal.

Use a solid active indicator and a thin domain-colored border.

### Telemetry Panels

Build panels that resemble modern industrial instrumentation.

- Light-gray background.
- Strong top label.
- Monospaced values.
- Clear engineering units.
- Small status indicators.
- Consistent alignment.

### Specifications Tables

- White and light-gray alternating rows.
- Stronger header separator.
- IBM Plex Mono for technical values.
- Right-aligned numeric columns.
- Consistent engineering units.

### Technical Console

No dark developer terminal.

Use a light industrial console:

- Background: `#F0F2F0`
- Text: `#243036`
- Success: green.
- Warnings: amber.
- Errors: red.
- Monospaced log output.
- Clear timestamp and severity columns.

---

## 7. Photography & Technical Graphics

This is an important part of making the website feel industrial.

Use:

- High-quality robot product photography.
- Close-up images of mechanical components.
- Motors, actuators, gears, sensors, and structural assemblies.
- Realistic robotics environments.
- Clean engineering diagrams.
- Mechanical exploded views.
- Technical SVG illustrations.

Avoid:

- Generic AI imagery.
- Abstract glowing neural networks.
- Excessive gradients.
- Futuristic neon circuit backgrounds.
- Decorative 3D shapes without engineering relevance.

**Preferred visual treatment:** Real robotics hardware against bright, clean industrial environments.

---

## 8. Robotics-Specific Visual Language

### RUN — Jag.U.R™

Industrial Orange.

Emphasize:

- Mechanical construction.
- Quadruped locomotion.
- Actuator and motor performance.
- Leg geometry and gait analysis.
- Terrain adaptability.

### DRIVE — AI/ML Car

Machine Blue.

Emphasize:

- Autonomous navigation.
- Sensor fusion.
- Computer vision.
- Object detection.
- Braking and obstacle avoidance.

### FLY — FireFly™

Engineering Teal.

Emphasize:

- Flight control.
- Micro-UAS engineering.
- Mission planning.
- Sensor telemetry.
- Autonomous flight.

Each domain should have a consistent accent color across its page, diagrams, buttons, and telemetry.

---

## 9. Motion & Interaction

Animations should communicate mechanical function.

Use:

- Subtle actuator movement.
- Smooth telemetry updates.
- Mechanical rotation and movement.
- Progress indicators.
- Functional state transitions.

Avoid:

- Glowing buttons.
- Excessive floating elements.
- Large animated gradients.
- Decorative particle effects.
- Unnecessary parallax.

Respect `prefers-reduced-motion`.

---

## 10. Overall Visual Identity

**ZoeRobo should look like a robotics engineering company, not an AI software startup.**

The visual language should communicate:

- Precision
- Reliability
- Mechanical intelligence
- Autonomous systems
- Advanced engineering
- Real-world capability

The resulting website should feel like a modern robotics manufacturer with the sophistication of an aerospace engineering company.

**Design keywords:** Industrial Precision · Light Engineering · Mechanical Geometry · Technical Clarity · Autonomous Robotics.

## **Visual reference for the new direction**


**Bright engineering laboratory**

Clean, precise, technical, and light.


**Mechanical hardware**

Real machinery, aluminum, and controlled orange accents.


**Industrial instrumentation**

Strong labels, structured panels, readable data.


**Engineering documentation**

Technical diagrams on bright backgrounds.

**My strongest recommendation:** Make industrial orange the recognizable ZoeRobo brand accent, with blue for DRIVE and teal for FLY. Use white and warm machine gray as the foundation. That will give the site a much stronger industrial identity without making it dark, heavy, or old-fashioned.

The next practical step is applying this system to your actual `styles.css` and Angular components.
