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
    <div class="flex flex-col w-full">
      <!-- Top Technical Breadcrumb & Status Ribbon -->
      <section class="w-full bg-canvas-subtle border-b border-border-grid/70 px-6 md:px-12 py-2.5">
        <div
          class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.06em] text-on-surface-variant"
        >
          <div class="flex flex-wrap items-center gap-2">
            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-mode-fly/10 text-mode-fly font-bold"
            >
              <span class="w-2 h-2 rounded-full bg-mode-fly animate-ping"></span>
              SYS.MODE: FLY // FLIGHT READINESS PASS
            </span>
            <span class="text-outline-variant">/</span>
            <span class="text-on-surface font-medium">UAS-ARCH-FIREFLY-v4.2</span>
            <span class="text-outline-variant">/</span>
            <span class="text-primary">MODEL: DEEPSEEK-R1-DISTILL-INT8</span>
          </div>
          <div class="flex items-center gap-4">
            <span class="hidden sm:inline-flex items-center gap-1 text-signal-success font-medium">
              <mat-icon class="text-[14px]">verified_user</mat-icon>
              100% AIR-GAPPED PRIVACY ENGINE
            </span>
            <span class="px-2 py-0.5 rounded bg-surface-container-high text-on-surface tabular-nums">
              LATENCY: 0.12ms
            </span>
          </div>
        </div>
      </section>

      <!-- Hero Section -->
      <section class="w-full px-6 md:px-12 py-10">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <!-- Left Column -->
          <div class="lg:col-span-6 flex flex-col space-y-4">
            <div class="flex items-center gap-2">
              <span
                class="px-2.5 py-1 rounded bg-mode-fly/10 text-mode-fly font-mono text-[12px] font-bold uppercase tracking-wider"
              >
                Autonomous Aerial UAS
              </span>
              <span class="px-2.5 py-1 rounded bg-canvas-muted text-on-surface-variant font-mono text-[10px]">
                REV. 2025.1
              </span>
            </div>
            <h1 class="font-display text-[44px] sm:text-[56px] leading-[1.08] font-bold text-on-surface tracking-[-0.03em]">
              FireFly™
            </h1>
            <p class="font-display text-[24px] leading-8 font-semibold text-primary">
              Autonomous Drone with Local Guidance (LLM)
            </p>
            <p class="text-[17px] leading-7 text-on-surface-variant max-w-xl">
              The First Micro Drone with On-Device Large Language Model Guidance &amp; Spatial
              Reasoning. Complete situational autonomy engineered into an ultra-quiet, carbon-fiber
              domestic airframe. Zero cloud dependence.
            </p>

            <!-- Rapid Metric Strip -->
            <div class="grid grid-cols-3 gap-3 pt-1">
              <div class="p-3 rounded-lg bg-canvas-pure border border-border-grid/80 shadow-sm flex flex-col">
                <span class="font-mono text-[10px] text-outline uppercase">Spatial Inference</span>
                <span class="font-display text-[20px] font-semibold text-mode-fly mt-0.5 tabular-nums">
                  38.4 <span class="text-[13px] font-normal text-on-surface-variant">TOPS</span>
                </span>
                <span class="font-mono text-[10px] text-outline mt-1">NPU INT8 Cluster</span>
              </div>
              <div class="p-3 rounded-lg bg-canvas-pure border border-border-grid/80 shadow-sm flex flex-col">
                <span class="font-mono text-[10px] text-outline uppercase">Acoustic Floor</span>
                <span class="font-display text-[20px] font-semibold text-mode-run mt-0.5 tabular-nums">
                  &lt; 28 <span class="text-[13px] font-normal text-on-surface-variant">dBA</span>
                </span>
                <span class="font-mono text-[10px] text-outline mt-1">Whisper Shrouded</span>
              </div>
              <div class="p-3 rounded-lg bg-canvas-pure border border-border-grid/80 shadow-sm flex flex-col">
                <span class="font-mono text-[10px] text-outline uppercase">Data Egress</span>
                <span class="font-display text-[20px] font-semibold text-signal-success mt-0.5 tabular-nums">
                  0.00 <span class="text-[13px] font-normal text-on-surface-variant">KB/s</span>
                </span>
                <span class="font-mono text-[10px] text-outline mt-1">Air-Gapped Core</span>
              </div>
            </div>

            <!-- Hero CTAs -->
            <div class="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#demo-section"
                class="px-5 py-2.5 rounded bg-mode-fly text-canvas-pure font-mono text-[12px] uppercase tracking-wider font-semibold shadow-sm hover:bg-tertiary transition-all flex items-center gap-2"
              >
                <mat-icon class="text-[18px]">terminal</mat-icon>
                <span>Try Local Prompt Test</span>
              </a>
              <a
                href="#specs-table"
                class="px-4 py-2.5 rounded bg-canvas-pure border border-border-grid text-on-surface font-mono text-[12px] uppercase tracking-wider shadow-sm hover:bg-canvas-muted transition-all flex items-center gap-2"
              >
                <mat-icon class="text-[18px]">developer_board</mat-icon>
                <span>CAD &amp; Hardware Specs</span>
              </a>
              <button
                type="button"
                (click)="openFireflyPaper()"
                class="px-4 py-2.5 rounded bg-transparent text-primary hover:bg-surface-container font-mono text-[12px] uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <mat-icon class="text-[16px]">menu_book</mat-icon>
                <span>Read Medium Feature</span>
              </button>
            </div>
          </div>

          <!-- Right Column: Carbon Fiber Drone Showcase Card -->
          <div class="lg:col-span-6 relative">
            <div class="rounded-xl overflow-hidden bg-canvas-pure border border-border-grid shadow-md relative group">
              <div class="p-4 bg-canvas-pure/95 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-signal-success"></span>
                  <span class="font-mono text-[11px] font-bold text-on-surface uppercase tracking-wider">
                    FIREFLY-SENTINEL AIRBORNE
                  </span>
                </div>
                <div class="font-mono text-[11px] text-mode-fly bg-mode-fly/10 px-2 py-0.5 rounded tabular-nums">
                  ALT: 1.42m | ATT: 0.02°
                </div>
              </div>

              <div class="relative w-full aspect-[16/10] overflow-hidden bg-canvas-muted">
                <img
                  [src]="images.fireflyDrone"
                  alt="FireFly Sentinel carbon-fiber drone hovering in sunlit home interior with protective shrouds"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <!-- Visual Target Overlay Vector -->
                <div class="absolute inset-0 pointer-events-none flex items-center justify-center p-6">
                  <svg class="w-full h-full max-w-sm max-h-56 opacity-75 text-mode-fly" fill="none" viewBox="0 0 400 240">
                    <circle cx="200" cy="120" r="44" stroke="currentColor" stroke-dasharray="3 3" stroke-width="1.5" />
                    <path d="M140 120 H180 M220 120 H260 M200 60 V100 M200 140 V180" stroke="currentColor" stroke-width="1" />
                    <rect height="24" stroke="currentColor" stroke-width="1" width="24" x="188" y="108" />
                    <text font-family="JetBrains Mono, monospace" font-size="9" fill="currentColor" x="212" y="85">
                      TARGET: REAR_STOVE_INDUCTION
                    </text>
                    <text font-family="JetBrains Mono, monospace" font-size="9" fill="currentColor" x="212" y="98">
                      STATUS: VERIFIED_OFF [0.992]
                    </text>
                  </svg>
                </div>
              </div>

              <!-- Bottom Telemetry HUD Strip -->
              <div class="p-4 bg-canvas-subtle grid grid-cols-4 gap-2 text-center font-mono text-[11px]">
                <div>
                  <p class="text-outline uppercase text-[10px]">Battery Core</p>
                  <p class="font-bold text-on-surface tabular-nums">88% [LiHV]</p>
                </div>
                <div>
                  <p class="text-outline uppercase text-[10px]">LiDAR Refresh</p>
                  <p class="font-bold text-on-surface tabular-nums">60 Hz 3D</p>
                </div>
                <div>
                  <p class="text-outline uppercase text-[10px]">Visual VIO</p>
                  <p class="font-bold text-mode-fly">LOCKED</p>
                </div>
                <div>
                  <p class="text-outline uppercase text-[10px]">DeepSeek-LLM</p>
                  <p class="font-bold text-signal-success">ON-DEVICE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Storyboard & Natural Language Command Breakdown -->
      <section class="w-full bg-surface-container-low px-6 md:px-12 py-12 border-y border-border-grid/60" id="demo-section">
        <div class="max-w-7xl mx-auto flex flex-col space-y-6">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span class="font-mono text-[11px] text-mode-fly font-bold uppercase tracking-widest">
                Kinematic Natural Language Pipeline
              </span>
              <h2 class="font-display text-[32px] sm:text-[36px] leading-tight font-semibold text-on-surface mt-1">
                Prompt-to-Kinematic Action Mapping
              </h2>
              <p class="text-[15px] leading-6 text-on-surface-variant max-w-2xl mt-1">
                Standard drones only accept coordinates. FireFly interprets high-level natural
                language intent, decomposes semantic tasks, maps room topologies, and reasons
                visually in real time.
              </p>
            </div>
            <div class="flex items-center gap-2 font-mono text-[11px] bg-canvas-pure border border-border-grid px-4 py-1.5 rounded shadow-sm self-start md:self-auto">
              <mat-icon class="text-signal-success text-[16px]">verified</mat-icon>
              <span>Storyboard: 20250111_1509_Micro Drone Patrol</span>
            </div>
          </div>

          <!-- Scenario Selector Bar -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-mono text-[11px] uppercase text-outline mr-1">Test Prompt Preset:</span>
            @for (scenario of scenarios; track scenario.id) {
              <button
                type="button"
                (click)="selectScenario(scenario)"
                class="px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
                [class.bg-mode-fly]="activeScenario().id === scenario.id"
                [class.text-canvas-pure]="activeScenario().id === scenario.id"
                [class.font-semibold]="activeScenario().id === scenario.id"
                [class.bg-canvas-pure]="activeScenario().id !== scenario.id"
                [class.text-on-surface-variant]="activeScenario().id !== scenario.id"
                [class.border]="activeScenario().id !== scenario.id"
                [class.border-border-grid]="activeScenario().id !== scenario.id"
              >
                {{ scenario.label }}
              </button>
            }
          </div>

          <!-- Demonstration Console Bento -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <!-- Interactive Prompt Terminal -->
            <div
              class="lg:col-span-5 bg-canvas-pure border border-border-grid rounded-xl p-6 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="font-mono text-[11px] uppercase text-outline">User Input Vector</span>
                  <span class="font-mono text-[10px] text-mode-fly bg-mode-fly/10 px-2 py-0.5 rounded font-semibold">
                    {{ simState() === 'running' ? 'EXECUTING PATH' : simState() === 'verified' ? 'PATROL VERIFIED' : 'STREAM ACTIVE' }}
                  </span>
                </div>

                <!-- Natural Language Command Box -->
                <div class="p-4 rounded-lg bg-canvas-subtle space-y-2">
                  <div class="font-mono text-[10px] uppercase text-outline flex items-center gap-1.5 font-bold">
                    <mat-icon class="text-mode-fly text-[16px]">record_voice_over</mat-icon>
                    <span>Natural Language Command</span>
                  </div>
                  <div class="p-3.5 rounded bg-canvas-pure border border-border-grid/60 text-on-surface font-mono text-[14px] shadow-sm">
                    {{ activeScenario().prompt }}
                  </div>
                  <p class="font-mono text-[10px] text-outline italic">
                    Derived from the official ZoeRobo autonomous flight operational test log.
                  </p>
                </div>

                <!-- Autonomous Action Decomposition -->
                <div class="p-4 rounded-lg bg-canvas-subtle space-y-2">
                  <div class="font-mono text-[10px] uppercase text-outline flex items-center gap-1.5 font-bold">
                    <mat-icon class="text-signal-success text-[16px]">psychology</mat-icon>
                    <span>DeepSeek On-Device LLM Reasoning</span>
                  </div>
                  <div class="p-3.5 rounded bg-canvas-pure border border-border-grid/60 text-on-surface font-mono text-[12px] leading-5 space-y-1 shadow-sm">
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
              <div class="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  (click)="runSimulation()"
                  [disabled]="simState() === 'running'"
                  class="flex-1 py-2.5 px-4 bg-mode-fly text-canvas-pure rounded font-mono text-[12px] uppercase tracking-wider font-semibold hover:bg-tertiary disabled:opacity-75 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
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
                  class="py-2.5 px-4 bg-canvas-subtle hover:bg-canvas-muted text-on-surface-variant rounded font-mono text-[12px] uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <mat-icon class="text-[16px]">refresh</mat-icon>
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <!-- Storyboard Step Flow Visualization -->
            <div
              class="lg:col-span-7 bg-canvas-pure border border-border-grid rounded-xl p-6 shadow-sm flex flex-col justify-between gap-4"
            >
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span class="font-mono text-[10px] uppercase text-outline">
                    Autonomous Mission Storyboard
                  </span>
                  <h3 class="font-display text-[20px] font-semibold text-on-surface">
                    Micro Drone Patrol Sequence
                  </h3>
                </div>
                <span class="font-mono text-[10px] text-signal-success bg-signal-success/10 px-2.5 py-1 rounded">
                  SEQ-ID: 01jhbt2rffee3txqas467qh3ks
                </span>
              </div>

              <!-- Step Progression Cards -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto py-2">
                <!-- Step 1 -->
                <div
                  class="p-4 rounded-lg bg-canvas-subtle border transition-all flex flex-col justify-between space-y-3"
                  [class.border-mode-fly]="activeStep() === 1"
                  [class.ring-2]="activeStep() === 1"
                  [class.ring-mode-fly/30]="activeStep() === 1"
                  [class.border-border-grid/60]="activeStep() !== 1"
                >
                  <div class="flex items-center justify-between">
                    <span class="w-6 h-6 rounded bg-mode-fly text-canvas-pure font-mono text-[11px] flex items-center justify-center font-bold">
                      01
                    </span>
                    <mat-icon class="text-mode-fly text-[20px]">flight_takeoff</mat-icon>
                  </div>
                  <div>
                    <h4 class="font-display text-[16px] font-semibold text-on-surface">
                      Un-dock &amp; Navigate
                    </h4>
                    <p class="text-[13px] leading-5 text-on-surface-variant mt-1">
                      Disengages from inductive dock. Ingests house topological mesh via stereo
                      optical flow.
                    </p>
                  </div>
                  <div class="font-mono text-[11px] text-mode-fly bg-canvas-pure p-1.5 rounded">
                    {{ activeScenario().step1Loc }}
                  </div>
                </div>

                <!-- Step 2 -->
                <div
                  class="p-4 rounded-lg bg-canvas-subtle border transition-all flex flex-col justify-between space-y-3"
                  [class.border-mode-run]="activeStep() === 2"
                  [class.ring-2]="activeStep() === 2"
                  [class.ring-mode-run/30]="activeStep() === 2"
                  [class.border-border-grid/60]="activeStep() !== 2"
                >
                  <div class="flex items-center justify-between">
                    <span class="w-6 h-6 rounded bg-mode-run text-canvas-pure font-mono text-[11px] flex items-center justify-center font-bold">
                      02
                    </span>
                    <mat-icon class="text-mode-run text-[20px]">center_focus_strong</mat-icon>
                  </div>
                  <div>
                    <h4 class="font-display text-[16px] font-semibold text-on-surface">
                      Visual Inspection
                    </h4>
                    <p class="text-[13px] leading-5 text-on-surface-variant mt-1">
                      Hovers 0.9m above target zone. Executes high-resolution thermal check on all
                      switches and surfaces.
                    </p>
                  </div>
                  <div class="font-mono text-[11px] text-mode-run bg-canvas-pure p-1.5 rounded">
                    {{ activeScenario().step2Mode }}
                  </div>
                </div>

                <!-- Step 3 -->
                <div
                  class="p-4 rounded-lg bg-canvas-subtle border transition-all flex flex-col justify-between space-y-3"
                  [class.border-signal-success]="activeStep() === 3"
                  [class.ring-2]="activeStep() === 3"
                  [class.ring-signal-success/30]="activeStep() === 3"
                  [class.border-border-grid/60]="activeStep() !== 3"
                >
                  <div class="flex items-center justify-between">
                    <span class="w-6 h-6 rounded bg-signal-success text-canvas-pure font-mono text-[11px] flex items-center justify-center font-bold">
                      03
                    </span>
                    <mat-icon class="text-signal-success text-[20px]">task_alt</mat-icon>
                  </div>
                  <div>
                    <h4 class="font-display text-[16px] font-semibold text-on-surface">
                      Affirm &amp; Return
                    </h4>
                    <p class="text-[13px] leading-5 text-on-surface-variant mt-1">
                      Transmits cryptographically signed "OK" message locally. Returns and locks
                      onto inductive landing plate.
                    </p>
                  </div>
                  <div class="font-mono text-[11px] text-signal-success bg-canvas-pure p-1.5 rounded">
                    {{ activeScenario().step3Status }}
                  </div>
                </div>
              </div>

              <!-- Video reference banner -->
              <div
                class="p-3 rounded bg-surface-container flex flex-wrap items-center justify-between gap-2 text-on-surface-variant font-mono text-[11px]"
              >
                <span class="flex items-center gap-2 min-w-0">
                  <mat-icon class="text-mode-fly text-[18px] shrink-0">videocam</mat-icon>
                  <span class="truncate">
                    Referenced Stream:
                    <code class="text-on-surface">
                      20250111_1509_Micro_Drone_Patrol_storyboard.webm
                    </code>
                  </span>
                </span>
                <button
                  type="button"
                  (click)="runSimulation()"
                  class="text-primary font-semibold hover:underline cursor-pointer shrink-0"
                >
                  Replay Keyframes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- DeepSeek Open Source Integration & Model Architecture -->
      <section class="w-full px-6 md:px-12 py-12">
        <div class="max-w-7xl mx-auto flex flex-col space-y-6">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-mono text-[10px] font-bold uppercase tracking-wider">
                  Open Source Intelligence
                </span>
                <span class="font-mono text-[10px] text-outline uppercase">
                  16 GitHub Repositories Synthesized
                </span>
              </div>
              <h2 class="font-display text-[32px] sm:text-[36px] leading-tight font-semibold text-on-surface mt-1">
                DeepSeek Architecture on the Edge
              </h2>
              <p class="text-[15px] leading-6 text-on-surface-variant max-w-2xl mt-1">
                How ZoeRobo compresses state-of-the-art DeepSeek reasoning kernels into an on-device
                4-bit and INT8 quantized engine executing onboard in microseconds.
              </p>
            </div>
            <a
              href="https://github.com/deepseek-ai"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 rounded bg-canvas-pure border border-border-grid text-on-surface shadow-sm font-mono text-[12px] uppercase tracking-wider hover:bg-canvas-muted transition-colors flex items-center gap-2 self-start md:self-auto"
            >
              <mat-icon class="text-[18px]">code</mat-icon>
              <span>DeepSeek GitHub Repos</span>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-xl bg-canvas-pure border border-border-grid shadow-sm flex flex-col space-y-3">
              <div class="w-10 h-10 rounded bg-mode-fly/10 text-mode-fly flex items-center justify-center">
                <mat-icon class="text-[24px]">memory</mat-icon>
              </div>
              <h3 class="font-display text-[20px] font-semibold text-on-surface">
                Distilled INT8 Quantization
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant flex-grow">
                Leveraging DeepSeek-R1 distillation techniques to squeeze complex symbolic logic
                into 1.8GB onboard flash RAM, maintaining 94.2% logical fidelity of cloud-scale
                frontier LLMs.
              </p>
              <div class="px-2.5 py-1.5 rounded bg-canvas-subtle font-mono text-[12px] text-mode-fly">
                • 0.12ms First-Token Latency
              </div>
            </div>

            <div class="p-6 rounded-xl bg-canvas-pure border border-border-grid shadow-sm flex flex-col space-y-3">
              <div class="w-10 h-10 rounded bg-mode-run/10 text-mode-run flex items-center justify-center">
                <mat-icon class="text-[24px]">spatial_audio_off</mat-icon>
              </div>
              <h3 class="font-display text-[20px] font-semibold text-on-surface">
                Multimodal Spatial VLM
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant flex-grow">
                Synchronizes depth point-clouds from micro-dToF sensors directly into visual-token
                embeddings. The drone identifies physical switches, appliances, and anomalies
                without remote servers.
              </p>
              <div class="px-2.5 py-1.5 rounded bg-canvas-subtle font-mono text-[12px] text-mode-run">
                • Zero Cloud Round-Trips
              </div>
            </div>

            <div class="p-6 rounded-xl bg-canvas-pure border border-border-grid shadow-sm flex flex-col space-y-3">
              <div class="w-10 h-10 rounded bg-tertiary/10 text-tertiary flex items-center justify-center">
                <mat-icon class="text-[24px]">security</mat-icon>
              </div>
              <h3 class="font-display text-[20px] font-semibold text-on-surface">
                Local Guidance &amp; Safety Proofs
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant flex-grow">
                Deterministic spatial bounding cones prevent hallucinations. Even if the LLM
                attempts an erratic route, physical kinematic controllers override and enforce 15cm
                safety envelopes.
              </p>
              <div class="px-2.5 py-1.5 rounded bg-canvas-subtle font-mono text-[12px] text-tertiary">
                • ROS2 Micro-Executor Safe
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FireFly Home Security System Breakdown -->
      <section class="w-full bg-surface-container-low px-6 md:px-12 py-12 border-y border-border-grid/60">
        <div class="max-w-7xl mx-auto flex flex-col space-y-8">
          <div class="text-center max-w-3xl mx-auto space-y-2">
            <span class="font-mono text-[11px] text-mode-fly font-bold uppercase tracking-widest">
              Domestic Autonomous Sentry
            </span>
            <h2 class="font-display text-[32px] sm:text-[36px] leading-tight font-semibold text-on-surface">
              FireFly Home Security System
            </h2>
            <p class="text-[17px] leading-7 text-on-surface-variant">
              Replacing static security cameras with proactive, intelligent, and noise-isolated
              domestic patrol robots.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-canvas-pure border border-border-grid/80 p-6 rounded-xl shadow-sm space-y-2">
              <mat-icon class="text-mode-fly text-[32px]">volume_off</mat-icon>
              <h3 class="font-display text-[19px] font-semibold text-on-surface">
                Whisper Shrouded Rotors
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Aero-acoustic toroidal carbon shrouds dampen blade tip vortices. Operates below 28
                dBA, allowing nighttime room patrols without disturbing family sleep.
              </p>
            </div>
            <div class="bg-canvas-pure border border-border-grid/80 p-6 rounded-xl shadow-sm space-y-2">
              <mat-icon class="text-secondary text-[32px]">radar</mat-icon>
              <h3 class="font-display text-[19px] font-semibold text-on-surface">
                360° Omnidirectional Sensing
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Full spherical collision avoidance integrating 4 micro solid-state LiDAR diodes and
                stereo low-light infrared optics for zero blind spot coverage.
              </p>
            </div>
            <div class="bg-canvas-pure border border-border-grid/80 p-6 rounded-xl shadow-sm space-y-2">
              <mat-icon class="text-mode-run text-[32px]">thermostat</mat-icon>
              <h3 class="font-display text-[19px] font-semibold text-on-surface">
                Thermal &amp; Gas Diagnostics
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Microbolometer thermal imaging detects oven burners, insulation heat leaks, and
                smoldering electronics before smoke detectors even trigger.
              </p>
            </div>
            <div class="bg-canvas-pure border border-border-grid/80 p-6 rounded-xl shadow-sm space-y-2">
              <mat-icon class="text-signal-success text-[32px]">charging_station</mat-icon>
              <h3 class="font-display text-[19px] font-semibold text-on-surface">
                Inductive Nest Station
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Sub-millimeter autonomous return and landing. 45W magnetic resonant charging restores
                full 22-minute patrol autonomy in just 18 minutes.
              </p>
            </div>
          </div>

          <!-- Local Privacy Guarantee Banner -->
          <div
            class="p-6 rounded-xl bg-canvas-pure border border-border-grid shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 rounded-full bg-signal-success/10 text-signal-success flex items-center justify-center shrink-0"
              >
                <mat-icon class="text-[28px]">lock</mat-icon>
              </div>
              <div>
                <h3 class="font-display text-[20px] font-semibold text-on-surface">
                  The ZoeRobo Zero-Cloud Privacy Guarantee
                </h3>
                <p class="text-[14px] leading-6 text-on-surface-variant max-w-2xl mt-1">
                  Unlike cloud-connected home cameras, FireFly never streams video footage outside
                  your local subnet. 100% of spatial tokens, thermal maps, and LLM reasoning cycles
                  stay locked in the physical drone’s hardware memory.
                </p>
              </div>
            </div>
            <span class="px-4 py-2 rounded bg-canvas-subtle font-mono text-[11px] text-on-surface font-bold shrink-0">
              ZERO TELEMETRY EGRESS // PASS
            </span>
          </div>
        </div>
      </section>

      <!-- Editorial & Whitepaper Spotlight -->
      <section class="w-full px-6 md:px-12 py-12">
        <div class="max-w-7xl mx-auto">
          <div
            class="p-6 md:p-10 rounded-xl bg-canvas-pure border border-border-grid shadow-md grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            <div
              class="lg:col-span-5 rounded-xl bg-canvas-subtle border border-border-grid/70 aspect-[4/3] flex flex-col justify-between p-6"
            >
              <div class="flex items-center justify-between">
                <span class="px-2.5 py-1 rounded bg-mode-fly text-canvas-pure font-mono text-[10px] uppercase font-bold">
                  Medium Publication Feature
                </span>
                <span class="font-mono text-[10px] text-outline">8 MIN READ</span>
              </div>
              <div class="space-y-1.5">
                <span class="font-mono text-[11px] uppercase text-mode-fly">
                  By ZoeWave • ZoeRobo AI Research
                </span>
                <h3 class="font-display text-[24px] leading-8 font-semibold text-on-surface">
                  “Drone with a Mind of Its Own: Because Sometimes You Just Need a Flying AI Robot”
                </h3>
              </div>
              <div class="flex items-center gap-2 text-outline font-mono text-[11px]">
                <span>Engineering Architecture</span>
                <span>·</span>
                <span>Local Embodied AI</span>
              </div>
            </div>

            <div class="lg:col-span-7 flex flex-col space-y-4">
              <span class="font-mono text-[11px] text-mode-fly uppercase tracking-widest font-bold">
                Featured Investigation
              </span>
              <h2 class="font-display text-[30px] sm:text-[34px] leading-tight font-semibold text-on-surface">
                Bridging Physical Kinematics and Local Cognitive Models
              </h2>
              <p class="text-[15px] leading-6 text-on-surface-variant">
                In our technical thesis published on Medium, lead systems architect ZoeWave details
                the journey of eliminating cloud dependencies in household robotics. Discover how
                the FireFly prototype translates colloquial requests like
                <em>“make sure everything is off”</em> into strict ROS2 kinematic micro-actions and
                sensor telemetry confirmation.
              </p>
              <div class="space-y-1.5 text-[13px] text-on-surface-variant">
                <div class="flex items-center gap-2">
                  <mat-icon class="text-signal-success text-[16px]">check_circle</mat-icon>
                  <span>Why latency-free edge execution is required for physical drone fail-safes</span>
                </div>
                <div class="flex items-center gap-2">
                  <mat-icon class="text-signal-success text-[16px]">check_circle</mat-icon>
                  <span>DeepSeek-R1 distillation benchmarks against standard quadcopter flight envelopes</span>
                </div>
                <div class="flex items-center gap-2">
                  <mat-icon class="text-signal-success text-[16px]">check_circle</mat-icon>
                  <span>Complete bill of materials and 3D printed toroidal guard geometries</span>
                </div>
              </div>
              <div class="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href="https://zoewave.medium.com/drone-with-a-mind-of-its-own-bd946b445f40"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-5 py-2.5 rounded bg-secondary text-canvas-pure font-mono text-[12px] uppercase tracking-wider font-semibold hover:bg-secondary-container transition-all flex items-center gap-2"
                >
                  <span>Read Full Article on Medium</span>
                  <mat-icon class="text-[16px]">open_in_new</mat-icon>
                </a>
                <a
                  href="#specs-table"
                  class="px-4 py-2.5 rounded bg-canvas-subtle hover:bg-canvas-muted text-on-surface font-mono text-[12px] uppercase tracking-wider transition-colors"
                >
                  Explore Raw Schematics
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Technical Specification Table -->
      <section class="w-full bg-surface-container-low px-6 md:px-12 py-12 border-y border-border-grid/60" id="specs-table">
        <div class="max-w-7xl mx-auto flex flex-col space-y-6">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <span class="font-mono text-[11px] text-mode-fly font-bold uppercase tracking-widest">
                Laboratory Telematics Matrix
              </span>
              <h2 class="font-display text-[32px] sm:text-[36px] leading-tight font-semibold text-on-surface mt-1">
                FireFly™ Hardware &amp; Compute Specifications
              </h2>
            </div>
            <div class="flex items-center gap-2 font-mono text-[11px] text-outline">
              <span>SPEC.REV // 2025.A</span>
              <span>·</span>
              <span class="text-signal-success font-semibold">PRODUCTION READY</span>
            </div>
          </div>

          <div class="bg-canvas-pure border border-border-grid rounded-xl shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-[13px]">
                <thead>
                  <tr class="bg-canvas-subtle text-outline font-mono text-[10px] uppercase tracking-wider">
                    <th class="py-3.5 px-5">Subsystem</th>
                    <th class="py-3.5 px-5">Specification Metric</th>
                    <th class="py-3.5 px-5">Hardware Module / Implementation</th>
                    <th class="py-3.5 px-5 text-right">Tolerance / Rating</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border-grid/70">
                  @for (row of specs; track row.subsystem) {
                    <tr class="hover:bg-canvas-subtle/60 transition-colors">
                      <td class="py-3.5 px-5 font-medium text-on-surface">
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
                        class="py-3.5 px-5 text-right font-mono tabular-nums"
                        [class.text-signal-success]="row.ratingHighlight === 'success'"
                        [class.font-semibold]="row.ratingHighlight === 'success'"
                        [class.text-on-surface]="row.ratingHighlight !== 'success'"
                      >
                        {{ row.rating }}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

            <div class="p-4 bg-canvas-subtle border-t border-border-grid/70 flex flex-wrap items-center justify-between gap-3">
              <span class="font-mono text-[11px] text-on-surface-variant">
                Full telemetry profiles, ROS2 node manifests, and step-by-step soldering pinouts are public.
              </span>
              <button
                type="button"
                (click)="exportSpecsCsv()"
                class="px-4 py-2 rounded bg-canvas-pure border border-border-grid text-on-surface font-mono text-[12px] uppercase tracking-wider shadow-sm hover:bg-canvas-muted transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <mat-icon class="text-[16px]">file_download</mat-icon>
                <span>{{ csvDownloaded() ? 'Exported firefly-specs.csv' : 'Export .CSV Matrix' }}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Resource Downloads & CTA -->
      <section class="w-full px-6 md:px-12 py-12">
        <div
          class="max-w-7xl mx-auto rounded-xl bg-canvas-pure border border-border-grid p-6 md:p-10 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div class="space-y-2.5 max-w-2xl">
            <span class="font-mono text-[11px] text-mode-fly font-bold uppercase tracking-widest">
              Build &amp; Deploy Hardware
            </span>
            <h2 class="font-display text-[30px] sm:text-[34px] leading-tight font-semibold text-on-surface">
              Ready to Assemble Your FireFly Sentinel?
            </h2>
            <p class="text-[15px] leading-6 text-on-surface-variant">
              Access the complete open CAD repositories, STP models, 3D printing shroud files,
              electrical PCB Gerber files, and our custom ROS2 DeepSeek local guidance pipeline.
            </p>
            <div class="flex flex-wrap items-center gap-4 pt-1 font-mono text-[11px] text-outline">
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
              class="px-6 py-2.5 rounded bg-mode-fly text-canvas-pure font-mono text-[12px] uppercase tracking-wider font-semibold shadow-sm hover:bg-tertiary transition-all flex items-center justify-center gap-2"
            >
              <mat-icon class="text-[18px]">download</mat-icon>
              <span>Download CAD &amp; Parts List</span>
            </a>
            <button
              type="button"
              (click)="openFireflyPaper()"
              class="px-6 py-2.5 rounded bg-canvas-subtle hover:bg-canvas-muted text-on-surface font-mono text-[12px] uppercase tracking-wider font-semibold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <mat-icon class="text-[18px]">article</mat-icon>
              <span>Read Research Whitepaper</span>
            </button>
            <a
              href="#demo-section"
              class="px-6 py-2.5 rounded bg-transparent text-primary hover:bg-surface-container font-mono text-[12px] uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2"
            >
              <mat-icon class="text-[18px]">movie</mat-icon>
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
