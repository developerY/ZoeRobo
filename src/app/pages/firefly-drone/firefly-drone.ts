import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {
  FIREFLY_SPECS,
  RESEARCH_RECORDS,
  ResearchRecord,
  ZOEROBO_IMAGES,
} from '../../data/zoerobo.data';
import { PaperModal } from '../../components/paper-modal/paper-modal';

interface PromptScenario {
  id: string;
  label: string;
  prompt: string;
  targetZone: string;
  objects: string;
  waypoints: string;
  verification: string;
  step1Loc: string;
  step2Mode: string;
  step3Status: string;
}

const PROMPT_SCENARIOS: PromptScenario[] = [
  {
    id: 'kitchen',
    label: 'Kitchen Safety Check',
    prompt: '“Go to the kitchen and make sure everything is off”',
    targetZone: '"kitchen" (Node ID: #KTC-04)',
    objects: '[Gas Range, Induction Hob, Oven, Faucets]',
    waypoints: 'Hallway A -> Island Arch -> 0.9m hover standoff',
    verification:
      'All switches zero-pos. Thermal heat signature: AMBIENT. Everything is "OK".',
    step1Loc: 'LOC: LIVING_STATION',
    step2Mode: 'REASONING: MULTIMODAL',
    step3Status: 'STATUS: ALL CLEAR (OK)',
  },
  {
    id: 'perimeter',
    label: 'Entry Door Audit',
    prompt: '“Verify the front entryway deadbolt and windows are sealed”',
    targetZone: '"foyer_north" (Node ID: #FYR-01)',
    objects: '[Main Deadbolt, Side Casement Latch, Glass Perimeter]',
    waypoints: 'Dock Pad -> Main Corridor -> 1.1m vertical scan arc',
    verification:
      'Deadbolt horizontal locked (conf: 0.994). Acoustic draft baseline nominal.',
    step1Loc: 'LOC: HALL_CORRIDOR',
    step2Mode: 'REASONING: OPTICAL VIO',
    step3Status: 'STATUS: SEALED (OK)',
  },
  {
    id: 'garage',
    label: 'Garage Thermal Sweep',
    prompt: '“Scan the garage EV charger bay for thermal anomalies”',
    targetZone: '"garage_bay_2" (Node ID: #GRG-02)',
    objects: '[Wallbox Connector, Breaker Panel, Li-Ion Storage]',
    waypoints: 'Utility Door -> Ceiling Clearance 2.1m -> Charger Sweep',
    verification:
      'Peak cable temp 29.4°C (nominal < 45°C). Zero thermal hotspot detected.',
    step1Loc: 'LOC: UTILITY_BAY',
    step2Mode: 'REASONING: LWIR THERMAL',
    step3Status: 'STATUS: NOMINAL (OK)',
  },
];

@Component({
  selector: 'app-firefly-drone',
  imports: [RouterLink, MatIconModule, PaperModal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col w-full bg-surface text-on-surface">
      <!-- Top Engineering Status Rail -->
      <section class="w-full bg-canvas-pure border-b border-border-grid px-6 md:px-10 py-2.5">
        <div
          class="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] tracking-[0.06em] text-on-surface-variant"
        >
          <div class="flex flex-wrap items-center gap-2.5">
            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-tertiary-fixed border border-mode-fly/40 text-on-tertiary-fixed font-bold uppercase"
            >
              <span class="w-2 h-2 rounded-full bg-mode-fly"></span>
              MODE: FLY // FLIGHT READINESS PASS
            </span>
            <span class="text-border-active">|</span>
            <span class="text-on-surface font-semibold">UNIT: ZR-FLY-004 · UAS-v4.2</span>
            <span class="text-border-active hidden sm:inline">|</span>
            <span class="hidden sm:inline text-mode-fly font-semibold">
              MODEL: DEEPSEEK-R1-DISTILL-INT8
            </span>
          </div>
          <div class="flex items-center gap-3">
            <span class="hidden sm:inline-flex items-center gap-1 text-signal-success font-semibold uppercase">
              <mat-icon class="text-[14px]">verified_user</mat-icon>
              AIR-GAPPED PRIVACY ENGINE
            </span>
            <span
              class="px-2 py-0.5 rounded-[2px] bg-surface-container-high border border-border-grid text-on-surface font-semibold tabular-nums"
            >
              LATENCY: 0.12ms
            </span>
          </div>
        </div>
      </section>

      <!-- 01 / Aerial Architecture Hero -->
      <section class="w-full px-6 md:px-10 py-10 bg-surface industrial-grid border-b border-border-grid">
        <div class="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Left Specification Column -->
          <div class="lg:col-span-6 flex flex-col space-y-5">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-mode-fly">
                01 / AERIAL ARCHITECTURE
              </span>
              <span class="text-border-active">·</span>
              <span
                class="px-2.5 py-0.5 rounded-[2px] bg-tertiary-fixed border border-mode-fly/40 text-on-tertiary-fixed font-mono text-[10px] font-bold uppercase tracking-wider"
              >
                AUTONOMOUS MICRO-UAS
              </span>
              <span
                class="px-2.5 py-0.5 rounded-[2px] bg-canvas-pure border border-border-grid text-on-surface-variant font-mono text-[10px] font-semibold"
              >
                REV 2025.1
              </span>
            </div>

            <div class="space-y-1.5">
              <h1
                class="font-display text-[50px] sm:text-[62px] leading-[1.0] font-bold uppercase text-on-surface tracking-[-0.02em]"
              >
                FireFly<span class="text-mode-fly">™</span>
              </h1>
              <p class="font-display text-[26px] leading-8 font-semibold uppercase text-mode-fly">
                Autonomous Drone with Local Guidance (LLM)
              </p>
            </div>

            <p class="text-[16px] leading-7 text-on-surface-variant max-w-xl">
              The first indoor micro-drone featuring on-device Large Language Model guidance and
              spatial reasoning. Complete situational autonomy engineered into an ultra-quiet,
              carbon-fiber domestic airframe with zero cloud dependency.
            </p>

            <!-- Rapid Metric Strip -->
            <div class="grid grid-cols-3 gap-3 pt-1">
              <div class="p-3.5 rounded-[4px] bg-canvas-pure border border-border-active flex flex-col">
                <span class="font-mono text-[10px] text-outline uppercase">Spatial Inference</span>
                <span class="font-display text-[26px] font-bold text-mode-fly mt-0.5 tabular-nums leading-tight">
                  38.4 <span class="font-mono text-[11px] font-normal text-on-surface-variant">TOPS</span>
                </span>
                <span class="font-mono text-[10px] text-outline mt-1">NPU INT8 Cluster</span>
              </div>
              <div class="p-3.5 rounded-[4px] bg-canvas-pure border border-border-active flex flex-col">
                <span class="font-mono text-[10px] text-outline uppercase">Acoustic Floor</span>
                <span class="font-display text-[26px] font-bold text-on-surface mt-0.5 tabular-nums leading-tight">
                  &lt; 28 <span class="font-mono text-[11px] font-normal text-on-surface-variant">dBA</span>
                </span>
                <span class="font-mono text-[10px] text-outline mt-1">Whisper Shrouded</span>
              </div>
              <div class="p-3.5 rounded-[4px] bg-canvas-pure border border-border-active flex flex-col">
                <span class="font-mono text-[10px] text-outline uppercase">Data Egress</span>
                <span class="font-display text-[26px] font-bold text-signal-success mt-0.5 tabular-nums leading-tight">
                  0.00 <span class="font-mono text-[11px] font-normal text-on-surface-variant">KB/s</span>
                </span>
                <span class="font-mono text-[10px] text-outline mt-1">Air-Gapped Core</span>
              </div>
            </div>

            <!-- Hero CTAs -->
            <div class="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#demo-section"
                class="px-5 py-3 rounded-[2px] bg-mode-fly hover:bg-tertiary-container text-on-tertiary font-mono text-[12px] uppercase tracking-[0.06em] font-semibold transition-colors flex items-center gap-2"
              >
                <mat-icon class="text-[18px]">terminal</mat-icon>
                <span>Try Local Prompt Test</span>
              </a>
              <a
                href="#specs-table"
                class="px-4 py-3 rounded-[2px] bg-canvas-pure border border-border-active hover:bg-surface-container-high text-on-surface font-mono text-[12px] uppercase tracking-[0.06em] font-semibold transition-colors flex items-center gap-2"
              >
                <mat-icon class="text-[18px] text-mode-fly">developer_board</mat-icon>
                <span>CAD &amp; Hardware Specs</span>
              </a>
              <button
                type="button"
                (click)="openFireflyPaper()"
                class="px-4 py-3 rounded-[2px] bg-surface-container hover:bg-surface-container-high border border-border-grid text-on-surface font-mono text-[12px] uppercase tracking-[0.06em] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <mat-icon class="text-[16px] text-primary">menu_book</mat-icon>
                <span>Read Medium Feature</span>
              </button>
            </div>
          </div>

          <!-- Right Column: Carbon Fiber Drone Instrument Showcase -->
          <div class="lg:col-span-6">
            <div class="rounded-[4px] overflow-hidden bg-canvas-pure border border-border-active">
              <div class="px-4 py-3 bg-canvas-pure border-b border-border-grid flex items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-signal-success"></span>
                  <span class="font-mono text-[11px] font-bold text-on-surface uppercase tracking-wider">
                    FIREFLY-SENTINEL AIRBORNE · ZR-FLY-004
                  </span>
                </div>
                <div
                  class="font-mono text-[11px] text-on-tertiary-fixed bg-tertiary-fixed border border-mode-fly/40 px-2 py-0.5 rounded-[2px] font-semibold tabular-nums"
                >
                  ALT: 1.42m | ATT: 0.02°
                </div>
              </div>

              <div class="relative w-full aspect-[16/10] overflow-hidden bg-canvas-muted">
                <img
                  [src]="images.fireflyDrone"
                  alt="FireFly Sentinel carbon-fiber drone hovering in sunlit home interior with protective shrouds"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover"
                />
                <!-- Mechanical Reticle Overlay -->
                <div class="absolute inset-0 pointer-events-none flex items-center justify-center p-6">
                  <svg class="w-full h-full max-w-sm max-h-56 text-mode-fly" fill="none" viewBox="0 0 400 240">
                    <circle cx="200" cy="120" r="44" stroke="#168477" stroke-dasharray="3 3" stroke-width="1.5" />
                    <path d="M135 120 H178 M222 120 H265 M200 58 V98 M200 142 V182" stroke="#168477" stroke-width="1.25" />
                    <rect height="24" stroke="#D8662D" stroke-width="1.5" width="24" x="188" y="108" />
                    <rect x="208" y="70" width="174" height="34" fill="#FFFFFF" fill-opacity="0.92" stroke="#929C9E" stroke-width="1" />
                    <text font-family="IBM Plex Mono, monospace" font-size="8.5" font-weight="600" fill="#20272B" x="214" y="84">
                      TARGET: REAR_STOVE_INDUCTION
                    </text>
                    <text font-family="IBM Plex Mono, monospace" font-size="8.5" font-weight="700" fill="#168477" x="214" y="97">
                      STATUS: VERIFIED_OFF [0.992]
                    </text>
                  </svg>
                </div>
              </div>

              <!-- Bottom Solid Telemetry Strip -->
              <div class="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-border-grid bg-surface-container border-t border-border-active text-center font-mono text-[11px]">
                <div class="p-3">
                  <p class="text-outline uppercase text-[10px]">Battery Core</p>
                  <p class="font-bold text-on-surface tabular-nums mt-0.5">88% [LiHV]</p>
                </div>
                <div class="p-3">
                  <p class="text-outline uppercase text-[10px]">LiDAR Refresh</p>
                  <p class="font-bold text-on-surface tabular-nums mt-0.5">60 Hz 3D</p>
                </div>
                <div class="p-3">
                  <p class="text-outline uppercase text-[10px]">Visual VIO</p>
                  <p class="font-bold text-mode-fly mt-0.5">LOCKED</p>
                </div>
                <div class="p-3">
                  <p class="text-outline uppercase text-[10px]">DeepSeek-LLM</p>
                  <p class="font-bold text-signal-success mt-0.5">ON-DEVICE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 02 / Prompt-to-Kinematic Pipeline Simulator -->
      <section class="w-full bg-canvas-subtle px-6 md:px-10 py-14 border-b border-border-grid" id="demo-section">
        <div class="max-w-[1360px] mx-auto flex flex-col space-y-6">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-border-grid">
            <div>
              <span class="font-mono text-[11px] text-mode-fly font-bold uppercase tracking-[0.08em]">
                02 / PROMPT-TO-KINEMATIC PIPELINE · NATURAL LANGUAGE CONTROL
              </span>
              <h2 class="font-display text-[36px] sm:text-[42px] leading-none font-bold uppercase text-on-surface mt-1.5">
                Prompt-to-Kinematic Action Mapping
              </h2>
              <p class="text-[15px] leading-6 text-on-surface-variant max-w-2xl mt-2">
                Standard drones only accept waypoint coordinates. FireFly interprets high-level
                natural language intent, decomposes semantic inspection tasks, maps room topologies,
                and verifies physical states onboard.
              </p>
            </div>
            <div class="flex items-center gap-2 font-mono text-[11px] bg-canvas-pure border border-border-active px-3.5 py-2 rounded-[2px] self-start md:self-auto">
              <mat-icon class="text-signal-success text-[16px]">verified</mat-icon>
              <span>LOG: 20250111_1509_Micro_Drone_Patrol</span>
            </div>
          </div>

          <!-- Scenario Preset Bar -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-mono text-[11px] uppercase text-outline font-semibold mr-1">
              TEST PROMPT PRESET:
            </span>
            @for (scenario of scenarios; track scenario.id) {
              <button
                type="button"
                (click)="selectScenario(scenario)"
                class="px-3.5 py-2 rounded-[2px] font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer border"
                [class.bg-mode-fly]="activeScenario().id === scenario.id"
                [class.text-on-tertiary]="activeScenario().id === scenario.id"
                [class.border-mode-fly]="activeScenario().id === scenario.id"
                [class.font-bold]="activeScenario().id === scenario.id"
                [class.bg-canvas-pure]="activeScenario().id !== scenario.id"
                [class.text-on-surface]="activeScenario().id !== scenario.id"
                [class.border-border-grid]="activeScenario().id !== scenario.id"
              >
                {{ scenario.label }}
              </button>
            }
          </div>

          <!-- Console + Storyboard Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <!-- Left: Light Industrial Prompt Terminal -->
            <div
              class="lg:col-span-5 bg-canvas-pure border border-border-active rounded-[4px] p-6 flex flex-col justify-between space-y-5"
            >
              <div class="space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-border-grid">
                  <span class="font-mono text-[11px] font-bold uppercase text-on-surface">
                    USER INPUT VECTOR
                  </span>
                  <span
                    class="font-mono text-[10px] text-on-tertiary-fixed bg-tertiary-fixed border border-mode-fly/40 px-2 py-0.5 rounded-[2px] font-bold uppercase"
                  >
                    {{ simState() === 'running' ? 'EXECUTING PATH' : simState() === 'verified' ? 'PATROL VERIFIED' : 'STREAM ACTIVE' }}
                  </span>
                </div>

                <!-- Natural Language Command Box -->
                <div class="p-4 rounded-[4px] bg-inverse-surface border border-border-grid space-y-2">
                  <div class="font-mono text-[10px] uppercase text-outline flex items-center gap-1.5 font-bold">
                    <mat-icon class="text-mode-fly text-[16px]">record_voice_over</mat-icon>
                    <span>Natural Language Command</span>
                  </div>
                  <div class="p-3 rounded-[2px] bg-canvas-pure border border-border-grid text-on-surface font-mono text-[13px] font-medium">
                    {{ activeScenario().prompt }}
                  </div>
                  <p class="font-mono text-[10px] text-outline">
                    Source: ZoeRobo indoor autonomous patrol test log.
                  </p>
                </div>

                <!-- Autonomous Action Decomposition -->
                <div class="p-4 rounded-[4px] bg-inverse-surface border border-border-grid space-y-2">
                  <div class="font-mono text-[10px] uppercase text-outline flex items-center gap-1.5 font-bold">
                    <mat-icon class="text-signal-success text-[16px]">psychology</mat-icon>
                    <span>DeepSeek On-Device LLM Reasoning</span>
                  </div>
                  <div class="p-3.5 rounded-[2px] bg-canvas-pure border border-border-grid text-inverse-on-surface font-mono text-[12px] leading-5 space-y-1">
                    <div class="text-mode-fly font-bold">[1. Intent Parsing]</div>
                    <div class="text-on-surface-variant">&gt; Target Zone: {{ activeScenario().targetZone }}</div>
                    <div class="text-on-surface-variant">&gt; Inspection Objects: {{ activeScenario().objects }}</div>
                    <div class="text-mode-fly font-bold pt-1">[2. Kinematic Trajectory]</div>
                    <div class="text-on-surface-variant">&gt; Waypoints: {{ activeScenario().waypoints }}</div>
                    <div class="text-signal-success font-bold pt-1">[3. Vision-Language Verification]</div>
                    <div class="text-on-surface-variant">&gt; Result: {{ activeScenario().verification }}</div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center gap-2.5 pt-2 border-t border-border-grid">
                <button
                  type="button"
                  (click)="runSimulation()"
                  [disabled]="simState() === 'running'"
                  class="flex-1 py-2.5 px-4 bg-mode-fly hover:bg-tertiary-container text-on-tertiary rounded-[2px] font-mono text-[12px] uppercase tracking-wider font-semibold disabled:opacity-75 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  @if (simState() === 'running') {
                    <mat-icon class="text-[16px] animate-spin">sync</mat-icon>
                    <span>Computing Mesh...</span>
                  } @else if (simState() === 'verified') {
                    <mat-icon class="text-[16px]">check</mat-icon>
                    <span>Patrol Verified (OK)</span>
                  } @else {
                    <mat-icon class="text-[16px]">play_arrow</mat-icon>
                    <span>Run Simulation</span>
                  }
                </button>
                <button
                  type="button"
                  (click)="resetSimulation()"
                  class="py-2.5 px-4 bg-canvas-pure hover:bg-surface-container-high border border-border-active text-on-surface rounded-[2px] font-mono text-[12px] uppercase tracking-wider font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <mat-icon class="text-[16px]">refresh</mat-icon>
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <!-- Right: Storyboard Sequence Panel -->
            <div
              class="lg:col-span-7 bg-canvas-pure border border-border-active rounded-[4px] p-6 flex flex-col justify-between gap-5"
            >
              <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border-grid">
                <div>
                  <span class="font-mono text-[10px] uppercase text-outline font-semibold">
                    AUTONOMOUS MISSION STORYBOARD
                  </span>
                  <h3 class="font-display text-[24px] font-bold uppercase text-on-surface">
                    Micro Drone Patrol Sequence
                  </h3>
                </div>
                <span class="font-mono text-[10px] text-signal-success bg-surface-container border border-signal-success/40 px-2.5 py-1 rounded-[2px] font-bold">
                  SEQ-ID: 01jhbt2rffee3txqas467qh3ks
                </span>
              </div>

              <!-- 3-Step Progression Cards -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
                <!-- Step 1 -->
                <div
                  class="p-4 rounded-[4px] bg-surface-container border-2 transition-colors flex flex-col justify-between space-y-3"
                  [class.border-mode-fly]="activeStep() === 1"
                  [class.bg-tertiary-fixed/30]="activeStep() === 1"
                  [class.border-border-grid]="activeStep() !== 1"
                >
                  <div class="flex items-center justify-between">
                    <span class="w-7 h-7 rounded-[2px] bg-mode-fly text-on-tertiary font-mono text-[11px] flex items-center justify-center font-bold">
                      01
                    </span>
                    <mat-icon class="text-mode-fly text-[20px]">flight_takeoff</mat-icon>
                  </div>
                  <div>
                    <h4 class="font-display text-[20px] font-bold uppercase text-on-surface">
                      Un-dock &amp; Navigate
                    </h4>
                    <p class="text-[13px] leading-5 text-on-surface-variant mt-1">
                      Disengages from inductive dock. Ingests house topological mesh via stereo
                      optical flow.
                    </p>
                  </div>
                  <div class="font-mono text-[11px] text-mode-fly bg-canvas-pure border border-border-grid p-2 rounded-[2px] font-semibold">
                    {{ activeScenario().step1Loc }}
                  </div>
                </div>

                <!-- Step 2 -->
                <div
                  class="p-4 rounded-[4px] bg-surface-container border-2 transition-colors flex flex-col justify-between space-y-3"
                  [class.border-mode-run]="activeStep() === 2"
                  [class.bg-primary-container/30]="activeStep() === 2"
                  [class.border-border-grid]="activeStep() !== 2"
                >
                  <div class="flex items-center justify-between">
                    <span class="w-7 h-7 rounded-[2px] bg-mode-run text-on-primary font-mono text-[11px] flex items-center justify-center font-bold">
                      02
                    </span>
                    <mat-icon class="text-mode-run text-[20px]">center_focus_strong</mat-icon>
                  </div>
                  <div>
                    <h4 class="font-display text-[20px] font-bold uppercase text-on-surface">
                      Visual Inspection
                    </h4>
                    <p class="text-[13px] leading-5 text-on-surface-variant mt-1">
                      Hovers 0.9m above target zone. Executes high-resolution thermal check on all
                      switches and surfaces.
                    </p>
                  </div>
                  <div class="font-mono text-[11px] text-mode-run bg-canvas-pure border border-border-grid p-2 rounded-[2px] font-semibold">
                    {{ activeScenario().step2Mode }}
                  </div>
                </div>

                <!-- Step 3 -->
                <div
                  class="p-4 rounded-[4px] bg-surface-container border-2 transition-colors flex flex-col justify-between space-y-3"
                  [class.border-signal-success]="activeStep() === 3"
                  [class.border-border-grid]="activeStep() !== 3"
                >
                  <div class="flex items-center justify-between">
                    <span class="w-7 h-7 rounded-[2px] bg-signal-success text-on-primary font-mono text-[11px] flex items-center justify-center font-bold">
                      03
                    </span>
                    <mat-icon class="text-signal-success text-[20px]">task_alt</mat-icon>
                  </div>
                  <div>
                    <h4 class="font-display text-[20px] font-bold uppercase text-on-surface">
                      Affirm &amp; Return
                    </h4>
                    <p class="text-[13px] leading-5 text-on-surface-variant mt-1">
                      Transmits cryptographically signed "OK" message locally. Returns and locks
                      onto inductive landing plate.
                    </p>
                  </div>
                  <div class="font-mono text-[11px] text-signal-success bg-canvas-pure border border-border-grid p-2 rounded-[2px] font-semibold">
                    {{ activeScenario().step3Status }}
                  </div>
                </div>
              </div>

              <!-- Video reference bar -->
              <div
                class="p-3 rounded-[2px] bg-inverse-surface border border-border-grid flex flex-wrap items-center justify-between gap-2 text-on-surface-variant font-mono text-[11px]"
              >
                <span class="flex items-center gap-2 min-w-0">
                  <mat-icon class="text-mode-fly text-[18px] shrink-0">videocam</mat-icon>
                  <span class="truncate">
                    STREAM:
                    <code class="text-on-surface font-semibold">
                      20250111_1509_Micro_Drone_Patrol_storyboard.webm
                    </code>
                  </span>
                </span>
                <button
                  type="button"
                  (click)="runSimulation()"
                  class="text-mode-fly font-bold hover:underline uppercase cursor-pointer shrink-0"
                >
                  Replay Keyframes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 03 / DeepSeek Edge Runtime -->
      <section class="w-full px-6 md:px-10 py-14 bg-surface border-b border-border-grid">
        <div class="max-w-[1360px] mx-auto flex flex-col space-y-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-border-grid">
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <span class="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-mode-fly">
                  03 / DEEPSEEK EDGE RUNTIME
                </span>
                <span class="text-border-active">·</span>
                <span class="font-mono text-[10px] text-outline uppercase font-semibold">
                  16 OPEN-SOURCE REPOSITORIES SYNTHESIZED
                </span>
              </div>
              <h2 class="font-display text-[36px] sm:text-[42px] leading-none font-bold uppercase text-on-surface mt-1.5">
                DeepSeek Architecture on the Edge
              </h2>
              <p class="text-[15px] leading-6 text-on-surface-variant max-w-2xl mt-2">
                Compressing state-of-the-art DeepSeek reasoning kernels into a deterministic 4-bit
                and INT8 quantized engine executing onboard in microseconds.
              </p>
            </div>
            <a
              href="https://github.com/deepseek-ai"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2.5 rounded-[2px] bg-canvas-pure border border-border-active text-on-surface font-mono text-[11px] font-semibold uppercase tracking-wider hover:bg-surface-container-high transition-colors flex items-center gap-2 self-start md:self-auto"
            >
              <mat-icon class="text-[18px] text-mode-fly">code</mat-icon>
              <span>DeepSeek GitHub Repos</span>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-[4px] bg-canvas-pure border border-border-grid flex flex-col justify-between gap-4">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div class="w-10 h-10 rounded-[2px] bg-tertiary-fixed border border-mode-fly/30 text-mode-fly flex items-center justify-center">
                    <mat-icon class="text-[22px]">memory</mat-icon>
                  </div>
                  <span class="font-mono text-[10px] text-outline">KERNEL-01</span>
                </div>
                <h3 class="font-display text-[24px] font-bold uppercase text-on-surface">
                  Distilled INT8 Quantization
                </h3>
                <p class="text-[14px] leading-6 text-on-surface-variant">
                  Leveraging DeepSeek-R1 distillation techniques to fit symbolic reasoning into
                  1.8GB onboard flash RAM while retaining 94.2% logical fidelity of cloud models.
                </p>
              </div>
              <div class="px-3 py-2 rounded-[2px] bg-surface-container border border-border-grid font-mono text-[11px] font-semibold text-mode-fly tabular-nums">
                0.12ms FIRST-TOKEN LATENCY
              </div>
            </div>

            <div class="p-6 rounded-[4px] bg-canvas-pure border border-border-grid flex flex-col justify-between gap-4">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div class="w-10 h-10 rounded-[2px] bg-primary-container border border-mode-run/30 text-mode-run flex items-center justify-center">
                    <mat-icon class="text-[22px]">spatial_audio_off</mat-icon>
                  </div>
                  <span class="font-mono text-[10px] text-outline">KERNEL-02</span>
                </div>
                <h3 class="font-display text-[24px] font-bold uppercase text-on-surface">
                  Multimodal Spatial VLM
                </h3>
                <p class="text-[14px] leading-6 text-on-surface-variant">
                  Synchronizes depth point-clouds from micro-dToF sensors directly into visual-token
                  embeddings to verify physical switches, appliances, and thermal anomalies locally.
                </p>
              </div>
              <div class="px-3 py-2 rounded-[2px] bg-surface-container border border-border-grid font-mono text-[11px] font-semibold text-mode-run">
                ZERO CLOUD ROUND-TRIPS
              </div>
            </div>

            <div class="p-6 rounded-[4px] bg-canvas-pure border border-border-grid flex flex-col justify-between gap-4">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div class="w-10 h-10 rounded-[2px] bg-secondary-fixed border border-mode-drive/30 text-mode-drive flex items-center justify-center">
                    <mat-icon class="text-[22px]">security</mat-icon>
                  </div>
                  <span class="font-mono text-[10px] text-outline">KERNEL-03</span>
                </div>
                <h3 class="font-display text-[24px] font-bold uppercase text-on-surface">
                  Local Guidance &amp; Safety Proofs
                </h3>
                <p class="text-[14px] leading-6 text-on-surface-variant">
                  Deterministic spatial bounding cones prevent trajectory hallucinations. Hardware
                  kinematic controllers strictly enforce 15cm collision safety envelopes.
                </p>
              </div>
              <div class="px-3 py-2 rounded-[2px] bg-surface-container border border-border-grid font-mono text-[11px] font-semibold text-mode-drive">
                ROS2 MICRO-EXECUTOR SAFE
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 04 / Domestic Autonomous Sentry -->
      <section class="w-full bg-canvas-subtle px-6 md:px-10 py-14 border-b border-border-grid">
        <div class="max-w-[1360px] mx-auto flex flex-col space-y-8">
          <div class="pb-5 border-b border-border-grid">
            <span class="font-mono text-[11px] text-mode-fly font-bold uppercase tracking-[0.08em]">
              04 / DOMESTIC SENTRY · ACOUSTIC &amp; SENSOR SUITE
            </span>
            <h2 class="font-display text-[36px] sm:text-[42px] leading-none font-bold uppercase text-on-surface mt-1.5">
              FireFly Home Security System
            </h2>
            <p class="text-[15px] leading-6 text-on-surface-variant max-w-2xl mt-2">
              Replacing static wall cameras with proactive, intelligent, noise-isolated domestic
              patrol airframes.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div class="bg-canvas-pure border border-border-grid p-6 rounded-[4px] space-y-2.5">
              <mat-icon class="text-mode-fly text-[28px]">volume_off</mat-icon>
              <h3 class="font-display text-[22px] font-bold uppercase text-on-surface">
                Whisper Shrouded Rotors
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Aero-acoustic toroidal carbon shrouds dampen blade tip vortices. Operates below 28
                dBA for quiet nocturnal indoor patrols.
              </p>
            </div>
            <div class="bg-canvas-pure border border-border-grid p-6 rounded-[4px] space-y-2.5">
              <mat-icon class="text-mode-drive text-[28px]">radar</mat-icon>
              <h3 class="font-display text-[22px] font-bold uppercase text-on-surface">
                360° Omnidirectional Sensing
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Spherical collision avoidance integrating 4 micro solid-state LiDAR diodes and
                stereo low-light infrared optics with zero blind spots.
              </p>
            </div>
            <div class="bg-canvas-pure border border-border-grid p-6 rounded-[4px] space-y-2.5">
              <mat-icon class="text-mode-run text-[28px]">thermostat</mat-icon>
              <h3 class="font-display text-[22px] font-bold uppercase text-on-surface">
                Thermal &amp; Gas Diagnostics
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Microbolometer LWIR imaging detects oven burners, insulation heat leaks, and
                overheating electronics before smoke alarms trigger.
              </p>
            </div>
            <div class="bg-canvas-pure border border-border-grid p-6 rounded-[4px] space-y-2.5">
              <mat-icon class="text-signal-success text-[28px]">charging_station</mat-icon>
              <h3 class="font-display text-[22px] font-bold uppercase text-on-surface">
                Inductive Nest Station
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Sub-millimeter autonomous landing. 45W magnetic resonant charging restores full
                22-minute patrol endurance in 18 minutes.
              </p>
            </div>
          </div>

          <!-- Zero-Cloud Privacy Guarantee Banner -->
          <div
            class="p-6 rounded-[4px] bg-canvas-pure border border-border-active flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div class="flex items-start gap-4">
              <div
                class="w-11 h-11 rounded-[2px] bg-surface-container border border-signal-success/40 text-signal-success flex items-center justify-center shrink-0"
              >
                <mat-icon class="text-[24px]">lock</mat-icon>
              </div>
              <div>
                <h3 class="font-display text-[24px] font-bold uppercase text-on-surface">
                  The ZoeRobo Zero-Cloud Privacy Guarantee
                </h3>
                <p class="text-[14px] leading-6 text-on-surface-variant max-w-2xl mt-1">
                  Unlike cloud-connected home cameras, FireFly never streams video footage outside
                  your local subnet. 100% of spatial tokens, thermal maps, and LLM reasoning cycles
                  remain locked inside the airframe’s hardware memory.
                </p>
              </div>
            </div>
            <span
              class="px-3.5 py-2 rounded-[2px] bg-surface-container border border-signal-success/40 font-mono text-[11px] text-signal-success font-bold shrink-0 uppercase"
            >
              ZERO TELEMETRY EGRESS // PASS
            </span>
          </div>
        </div>
      </section>

      <!-- Editorial & Whitepaper Spotlight -->
      <section class="w-full px-6 md:px-10 py-14 bg-surface border-b border-border-grid">
        <div class="max-w-[1360px] mx-auto">
          <div
            class="p-6 md:p-10 rounded-[4px] bg-canvas-pure border border-border-active grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div
              class="lg:col-span-5 rounded-[4px] bg-surface-container border border-border-grid industrial-grid aspect-[4/3] flex flex-col justify-between p-6"
            >
              <div class="flex items-center justify-between">
                <span class="px-2.5 py-1 rounded-[2px] bg-mode-fly text-on-tertiary font-mono text-[10px] uppercase font-bold">
                  MEDIUM PUBLICATION FEATURE
                </span>
                <span class="font-mono text-[10px] text-outline font-semibold">8 MIN READ</span>
              </div>
              <div class="space-y-2">
                <span class="font-mono text-[11px] uppercase text-mode-fly font-bold">
                  BY ZOEWAVE · ZOEROBO AI RESEARCH
                </span>
                <h3 class="font-display text-[28px] leading-8 font-bold uppercase text-on-surface">
                  “Drone with a Mind of Its Own: Because Sometimes You Just Need a Flying AI Robot”
                </h3>
              </div>
              <div class="flex items-center gap-2 text-outline font-mono text-[11px] pt-3 border-t border-border-grid">
                <span>REF: ZR-FLY-2024-01</span>
                <span>·</span>
                <span>LOCAL EMBODIED AI</span>
              </div>
            </div>

            <div class="lg:col-span-7 flex flex-col space-y-4">
              <span class="font-mono text-[11px] text-mode-fly uppercase tracking-[0.08em] font-bold">
                FEATURED TECHNICAL MONOGRAPH
              </span>
              <h2 class="font-display text-[32px] sm:text-[38px] leading-none font-bold uppercase text-on-surface">
                Bridging Physical Kinematics and Local Cognitive Models
              </h2>
              <p class="text-[15px] leading-6 text-on-surface-variant">
                In our technical thesis published on Medium, lead systems architect ZoeWave details
                eliminating cloud dependencies in domestic robotics—translating requests like
                <em>“make sure everything is off”</em> into strict ROS2 kinematic micro-actions and
                verified thermal telemetry.
              </p>
              <div class="space-y-2 text-[13px] text-on-surface">
                <div class="flex items-center gap-2">
                  <mat-icon class="text-signal-success text-[16px]">check_circle</mat-icon>
                  <span>Why latency-free edge execution is mandatory for physical drone fail-safes</span>
                </div>
                <div class="flex items-center gap-2">
                  <mat-icon class="text-signal-success text-[16px]">check_circle</mat-icon>
                  <span>DeepSeek-R1 distillation benchmarks against standard quadcopter flight envelopes</span>
                </div>
                <div class="flex items-center gap-2">
                  <mat-icon class="text-signal-success text-[16px]">check_circle</mat-icon>
                  <span>Complete bill of materials and 3D printed toroidal shroud geometries</span>
                </div>
              </div>
              <div class="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://zoewave.medium.com/drone-with-a-mind-of-its-own-bd946b445f40"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-5 py-2.5 rounded-[2px] bg-mode-fly hover:bg-tertiary-container text-on-tertiary font-mono text-[12px] uppercase tracking-wider font-semibold transition-colors flex items-center gap-2"
                >
                  <span>Read Full Article on Medium</span>
                  <mat-icon class="text-[16px]">open_in_new</mat-icon>
                </a>
                <a
                  href="#specs-table"
                  class="px-4 py-2.5 rounded-[2px] bg-canvas-pure border border-border-active hover:bg-surface-container-high text-on-surface font-mono text-[12px] uppercase tracking-wider font-semibold transition-colors"
                >
                  Explore Raw Schematics
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 05 / Hardware Specifications Table -->
      <section class="w-full bg-canvas-subtle px-6 md:px-10 py-14 border-b border-border-grid" id="specs-table">
        <div class="max-w-[1360px] mx-auto flex flex-col space-y-6">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-2 pb-5 border-b border-border-grid">
            <div>
              <span class="font-mono text-[11px] text-mode-fly font-bold uppercase tracking-[0.08em]">
                05 / HARDWARE SPECIFICATIONS · TELEMATICS MATRIX
              </span>
              <h2 class="font-display text-[36px] sm:text-[42px] leading-none font-bold uppercase text-on-surface mt-1.5">
                FireFly™ Hardware &amp; Compute Specifications
              </h2>
            </div>
            <div class="flex items-center gap-2 font-mono text-[11px] text-outline">
              <span>SPEC.REV // 2025.A</span>
              <span>·</span>
              <span class="text-signal-success font-bold">PRODUCTION READY</span>
            </div>
          </div>

          <div class="bg-canvas-pure border border-border-active rounded-[4px] overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-[13px] border-collapse">
                <thead>
                  <tr class="bg-surface-container-high border-b-2 border-border-active text-on-surface font-mono text-[10px] uppercase tracking-wider">
                    <th class="py-3.5 px-5 font-bold">Subsystem</th>
                    <th class="py-3.5 px-5 font-bold">Specification Metric</th>
                    <th class="py-3.5 px-5 font-bold">Hardware Module / Implementation</th>
                    <th class="py-3.5 px-5 text-right font-bold">Tolerance / Rating</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border-grid">
                  @for (row of specs; track row.subsystem) {
                    <tr class="even:bg-canvas-subtle hover:bg-surface-container-high/60 transition-colors">
                      <td class="py-3.5 px-5 font-semibold text-on-surface">
                        <span class="inline-flex items-center gap-2">
                          <mat-icon class="text-mode-fly text-[18px]">{{ row.icon }}</mat-icon>
                          <span>{{ row.subsystem }}</span>
                        </span>
                      </td>
                      <td class="py-3.5 px-5 font-mono text-on-surface font-semibold tabular-nums">
                        {{ row.metric }}
                      </td>
                      <td class="py-3.5 px-5 text-on-surface-variant">{{ row.implementation }}</td>
                      <td
                        class="py-3.5 px-5 text-right font-mono tabular-nums font-semibold"
                        [class.text-signal-success]="row.ratingHighlight === 'success'"
                        [class.text-on-surface]="row.ratingHighlight !== 'success'"
                      >
                        {{ row.rating }}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

            <div class="p-4 bg-surface-container border-t border-border-active flex flex-wrap items-center justify-between gap-3">
              <span class="font-mono text-[11px] text-on-surface-variant">
                Full telemetry profiles, ROS2 node manifests, and soldering pinouts are open-access.
              </span>
              <button
                type="button"
                (click)="exportSpecsCsv()"
                class="px-4 py-2 rounded-[2px] bg-canvas-pure border border-border-active text-on-surface font-mono text-[11px] font-semibold uppercase tracking-wider hover:bg-surface-container-high transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <mat-icon class="text-[16px] text-mode-fly">file_download</mat-icon>
                <span>{{ csvDownloaded() ? 'Exported firefly-specs.csv' : 'Export .CSV Matrix' }}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Resource Downloads & CTA -->
      <section class="w-full px-6 md:px-10 py-12 bg-canvas-pure">
        <div
          class="max-w-[1360px] mx-auto rounded-[4px] bg-surface-container-high border border-border-active p-6 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
        >
          <div class="space-y-2.5 max-w-2xl">
            <span class="font-mono text-[11px] text-mode-fly font-bold uppercase tracking-[0.08em]">
              BUILD &amp; DEPLOY HARDWARE · ZR-FLY-004
            </span>
            <h2 class="font-display text-[32px] sm:text-[38px] leading-none font-bold uppercase text-on-surface">
              Ready to Assemble Your FireFly Sentinel?
            </h2>
            <p class="text-[15px] leading-6 text-on-surface-variant">
              Access open CAD repositories, STEP models, 3D-printable shroud files, PCB Gerber
              packages, and our custom ROS2 DeepSeek local guidance pipeline.
            </p>
            <div class="flex flex-wrap items-center gap-4 pt-1 font-mono text-[11px] text-on-surface-variant">
              <span class="flex items-center gap-1">
                <mat-icon class="text-signal-success text-[16px]">verified</mat-icon>
                Open Hardware License
              </span>
              <span class="flex items-center gap-1">
                <mat-icon class="text-signal-success text-[16px]">verified</mat-icon>
                ROS2 Humble Compatible
              </span>
              <span class="flex items-center gap-1">
                <mat-icon class="text-signal-success text-[16px]">verified</mat-icon>
                DeepSeek Integration
              </span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto shrink-0">
            <a
              routerLink="/documentation"
              class="px-6 py-3 rounded-[2px] bg-mode-fly hover:bg-tertiary-container text-on-tertiary font-mono text-[12px] uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <mat-icon class="text-[18px]">download</mat-icon>
              <span>Download CAD &amp; Parts List</span>
            </a>
            <button
              type="button"
              (click)="openFireflyPaper()"
              class="px-6 py-3 rounded-[2px] bg-canvas-pure border border-border-active hover:bg-surface-container text-on-surface font-mono text-[12px] uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <mat-icon class="text-[18px] text-primary">article</mat-icon>
              <span>Read Research Whitepaper</span>
            </button>
            <a
              href="#demo-section"
              class="px-6 py-2.5 rounded-[2px] bg-transparent text-mode-fly hover:bg-canvas-pure font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <mat-icon class="text-[16px]">movie</mat-icon>
              <span>View Drone Storyboard</span>
            </a>
          </div>
        </div>
      </section>
    </div>

    <app-paper-modal [record]="selectedRecord()" (closed)="selectedRecord.set(null)" />
  `,
})
export class FireflyDrone {
  protected readonly images = ZOEROBO_IMAGES;
  protected readonly specs = FIREFLY_SPECS;
  protected readonly scenarios = PROMPT_SCENARIOS;

  protected readonly activeScenario = signal<PromptScenario>(PROMPT_SCENARIOS[0]);
  protected readonly simState = signal<'idle' | 'running' | 'verified'>('idle');
  protected readonly activeStep = signal<0 | 1 | 2 | 3>(0);
  protected readonly csvDownloaded = signal(false);
  protected readonly selectedRecord = signal<ResearchRecord | null>(null);

  private timers: ReturnType<typeof setTimeout>[] = [];

  protected selectScenario(scenario: PromptScenario): void {
    this.clearTimers();
    this.activeScenario.set(scenario);
    this.simState.set('idle');
    this.activeStep.set(0);
  }

  protected runSimulation(): void {
    this.clearTimers();
    this.simState.set('running');
    this.activeStep.set(1);

    this.timers.push(
      setTimeout(() => this.activeStep.set(2), 650),
      setTimeout(() => {
        this.activeStep.set(3);
        this.simState.set('verified');
      }, 1350)
    );
  }

  protected resetSimulation(): void {
    this.clearTimers();
    this.simState.set('idle');
    this.activeStep.set(0);
  }

  protected openFireflyPaper(): void {
    this.selectedRecord.set(RESEARCH_RECORDS[0]);
  }

  protected exportSpecsCsv(): void {
    const header = 'Subsystem,Specification Metric,Hardware Module,Tolerance / Rating';
    const rows = this.specs.map(
      (s) =>
        `"${s.subsystem}","${s.metric}","${s.implementation}","${s.rating}"`
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'zoerobo-firefly-specs.csv';
    link.click();
    URL.revokeObjectURL(url);
    this.csvDownloaded.set(true);
    setTimeout(() => this.csvDownloaded.set(false), 3000);
  }

  private clearTimers(): void {
    for (const t of this.timers) {
      clearTimeout(t);
    }
    this.timers = [];
  }
}
