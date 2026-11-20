import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  RESEARCH_RECORDS,
  ResearchRecord,
  ZOEROBO_IMAGES,
} from '../../data/zoerobo.data';
import { PaperModal } from '../../components/paper-modal/paper-modal';

interface ConsoleEntry {
  id: number;
  text: string;
  tone: 'success' | 'muted' | 'primary' | 'warning' | 'alert';
}

const INITIAL_LOGS: ConsoleEntry[] = [
  { id: 1, text: '[0.002s] TFLite delegate instantiated: Pixel Neural Core', tone: 'success' },
  { id: 2, text: '[0.015s] Initializing camera frame queue (YUV_420_888)', tone: 'muted' },
  { id: 3, text: '[0.024s] MobileNet_v3_quant INT8 mapped in memory', tone: 'muted' },
  { id: 4, text: '[0.038s] Detected: LANE_DIVIDER_LEFT (conf: 0.94)', tone: 'primary' },
  { id: 5, text: '[0.049s] Detected: LANE_DIVIDER_RIGHT (conf: 0.96)', tone: 'primary' },
  { id: 6, text: '[0.062s] Path: Centerline delta 0.04m, correcting steer', tone: 'warning' },
  { id: 7, text: '[0.075s] Signal detected: TRAFFIC_LIGHT_GREEN', tone: 'success' },
  { id: 8, text: '[0.088s] Actuation packet sent: THROTTLE 42%, STEER +2.1°', tone: 'muted' },
];

@Component({
  selector: 'app-aiml-drive',
  imports: [MatIconModule, PaperModal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col w-full bg-surface text-on-surface">
      <!-- Top Engineering Status Rail -->
      <section class="w-full bg-canvas-pure border-b border-border-grid px-6 md:px-10 py-2.5">
        <div
          class="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] tracking-[0.06em]"
        >
          <div class="flex flex-wrap items-center gap-2.5">
            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-secondary-fixed border border-mode-drive/40 text-on-secondary-fixed font-bold uppercase"
            >
              <span class="w-2 h-2 rounded-full bg-mode-drive"></span>
              MODE: DRIVE // AUTONOMOUS AGV
            </span>
            <span class="text-border-active">|</span>
            <span class="text-on-surface font-semibold">UNIT: ZR-DRV-009 · DRIVE-CORE-V4.2</span>
            <span class="hidden md:inline text-border-active">|</span>
            <span class="hidden md:inline text-signal-success font-bold">
              PIPELINE: TFLITE_TPU_ONLINE
            </span>
          </div>
          <div class="flex items-center gap-4 text-on-surface-variant tabular-nums">
            <span class="flex items-center gap-1.5 font-semibold">
              <span class="w-2 h-2 rounded-full bg-signal-success"></span>
              60.2 FPS VISION
            </span>
            <span class="flex items-center gap-1.5 font-semibold">
              <span class="w-2 h-2 rounded-full bg-mode-run"></span>
              1.4W NOMINAL
            </span>
          </div>
        </div>
      </section>

      <!-- 01 / Autonomous Mobility Hero -->
      <section class="w-full px-6 md:px-10 py-10 bg-surface industrial-grid border-b border-border-grid">
        <div class="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Left Specification Narrative -->
          <div class="lg:col-span-6 space-y-5">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-mode-drive font-bold">
                01 / AUTONOMOUS MOBILITY
              </span>
              <span class="text-border-active">·</span>
              <span
                class="px-2.5 py-0.5 rounded-[2px] bg-secondary-fixed border border-mode-drive/40 text-on-secondary-fixed font-mono text-[10px] uppercase tracking-wider font-bold"
              >
                EDGE INTELLIGENCE MATRIX
              </span>
            </div>

            <div class="space-y-2">
              <h1
                class="font-display text-[44px] sm:text-[54px] lg:text-[60px] leading-[1.02] font-bold uppercase text-on-surface tracking-[-0.02em]"
              >
                AI/ML Driver: <span class="text-mode-drive">Edge Intelligence</span> for Autonomous
                Mobility
              </h1>
              <p class="font-display text-[22px] leading-7 uppercase text-on-surface-variant font-semibold">
                Smartphone-Powered Neural Computing, TensorFlow Lite &amp; Real-Time Vision
              </p>
            </div>

            <p class="text-[16px] leading-7 text-on-surface-variant max-w-xl">
              By offloading sensory perception, lane telemetry, and pathing kinematics to ubiquitous
              consumer smartphone architectures and integrated Edge TPUs, ZoeRobo makes autonomous
              vehicular research radically accessible.
            </p>

            <!-- Quick Telemetry Strip -->
            <div class="grid grid-cols-3 gap-3">
              <div class="p-3.5 rounded-[4px] bg-canvas-pure border border-border-active">
                <span class="font-mono text-[10px] text-outline block uppercase">Inference</span>
                <span class="font-display text-[26px] font-bold text-mode-drive tabular-nums leading-tight">60.2 FPS</span>
                <span class="font-mono text-[10px] text-on-surface-variant block mt-0.5">Quantized INT8</span>
              </div>
              <div class="p-3.5 rounded-[4px] bg-canvas-pure border border-border-active">
                <span class="font-mono text-[10px] text-outline block uppercase">Latency</span>
                <span class="font-display text-[26px] font-bold text-mode-fly tabular-nums leading-tight">11.4 ms</span>
                <span class="font-mono text-[10px] text-on-surface-variant block mt-0.5">Glass-to-Actuator</span>
              </div>
              <div class="p-3.5 rounded-[4px] bg-canvas-pure border border-border-active">
                <span class="font-mono text-[10px] text-outline block uppercase">Power Draw</span>
                <span class="font-display text-[26px] font-bold text-mode-run tabular-nums leading-tight">1.4 W</span>
                <span class="font-mono text-[10px] text-on-surface-variant block mt-0.5">Mobile Edge TPU</span>
              </div>
            </div>

            <!-- CTAs -->
            <div class="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#pixelopolis-installation"
                class="px-5 py-3 rounded-[2px] bg-mode-drive hover:bg-secondary-container text-on-secondary font-mono text-[12px] uppercase tracking-[0.06em] font-semibold transition-colors flex items-center gap-2"
              >
                <mat-icon class="text-[18px]">developer_board</mat-icon>
                <span>Pixelopolis Case Study</span>
              </a>
              <a
                href="#lego-concept"
                class="px-4 py-3 rounded-[2px] bg-canvas-pure border border-border-active hover:bg-surface-container-high text-on-surface font-mono text-[12px] uppercase tracking-[0.06em] font-semibold transition-colors flex items-center gap-2"
              >
                <mat-icon class="text-[18px] text-mode-drive">play_circle</mat-icon>
                <span>View LEGO® Concept</span>
              </a>
              <a
                href="https://github.com/tensorflow/examples"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-3 rounded-[2px] bg-surface-container border border-border-grid hover:border-mode-drive text-on-surface font-mono text-[12px] uppercase tracking-[0.06em] font-semibold transition-colors flex items-center gap-1.5"
              >
                <mat-icon class="text-[18px] text-primary">code</mat-icon>
                <span>GitHub Repo</span>
              </a>
            </div>
          </div>

          <!-- Right Visual Rig (Bright Framed Photo + Solid Instrumentation Bars) -->
          <div class="lg:col-span-6">
            <div class="rounded-[4px] overflow-hidden bg-canvas-pure border border-border-active flex flex-col">
              <div class="px-4 py-2.5 bg-canvas-pure border-b border-border-grid flex flex-wrap justify-between items-center gap-2 font-mono text-[10px]">
                <span class="text-on-surface font-bold flex items-center gap-1.5 uppercase">
                  <span class="w-2 h-2 rounded-full bg-signal-success"></span>
                  REC // TRACK_URBAN_GRID_04
                </span>
                <span class="text-on-surface-variant font-semibold tabular-nums">
                  LAT: 42.3601 N · LON: 71.0942 W
                </span>
              </div>

              <div class="w-full h-[320px] sm:h-[360px] bg-canvas-muted overflow-hidden">
                <img
                  [src]="images.aimlDriveHero"
                  alt="Autonomous miniature vehicle running on-board mobile compute on miniature urban track"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover object-center"
                />
              </div>

              <div class="p-4 bg-canvas-pure border-t border-border-active flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-[2px] bg-secondary-fixed border border-mode-drive/40 flex items-center justify-center text-mode-drive shrink-0">
                    <mat-icon>directions_car</mat-icon>
                  </div>
                  <div>
                    <div class="font-display text-[22px] font-bold uppercase text-on-surface leading-tight">
                      YLabZ Autonomous Platform
                    </div>
                    <div class="font-mono text-[10px] text-on-surface-variant uppercase">
                      Mobile Neural Rig + Monocular SLAM &amp; Lane Assist
                    </div>
                  </div>
                </div>
                <div class="flex flex-col sm:text-right font-mono text-[10px]">
                  <span class="text-signal-success font-bold">TFLITE CORE: 100% LOCK</span>
                  <span class="text-outline">ST-09 STEERING SERVO ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 02 / Core Autonomous Vehicle Capabilities -->
      <section class="w-full px-6 md:px-10 py-14 bg-canvas-subtle border-b border-border-grid">
        <div class="max-w-[1360px] mx-auto">
          <div class="pb-5 mb-8 border-b border-border-grid">
            <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-mode-drive font-bold">
              02 / EMPIRICAL HARDWARE ARCHITECTURE
            </span>
            <h2 class="font-display text-[36px] sm:text-[42px] leading-none font-bold uppercase text-on-surface mt-1.5">
              Core Autonomous Vehicle Capabilities
            </h2>
            <p class="text-[15px] leading-6 text-on-surface-variant max-w-2xl mt-2">
              Democratizing AV research without bulky trunk-mounted industrial workstations or
              liquid-cooled GPU racks.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-canvas-pure border border-border-grid p-6 rounded-[4px] flex flex-col justify-between gap-5">
              <div class="space-y-3">
                <div class="flex items-center justify-between pb-3 border-b border-border-grid">
                  <div class="w-10 h-10 rounded-[2px] bg-primary-container border border-mode-run/30 text-mode-run flex items-center justify-center">
                    <mat-icon class="text-[22px]">visibility</mat-icon>
                  </div>
                  <span class="font-mono text-[10px] text-mode-run font-bold">MODULE 01 // PERCEPTION</span>
                </div>
                <h3 class="font-display text-[26px] font-bold uppercase text-on-surface">
                  Neural Vision Pipeline
                </h3>
                <p class="text-[14px] leading-6 text-on-surface-variant">
                  MobileNet and tailored YOLO object detection primitives running locked at 60 FPS
                  directly on the smartphone Edge TPU—classifying traffic lights, stop boards,
                  pedestrians, and lane contours.
                </p>
              </div>
              <div class="p-3 bg-surface-container border border-border-grid rounded-[2px] font-mono text-[11px] flex justify-between items-center text-on-surface">
                <span>MOBILENET-V3-INT8</span>
                <span class="text-signal-success font-bold tabular-nums">12ms</span>
              </div>
            </div>

            <div class="bg-canvas-pure border border-border-grid p-6 rounded-[4px] flex flex-col justify-between gap-5">
              <div class="space-y-3">
                <div class="flex items-center justify-between pb-3 border-b border-border-grid">
                  <div class="w-10 h-10 rounded-[2px] bg-secondary-fixed border border-mode-drive/30 text-mode-drive flex items-center justify-center">
                    <mat-icon class="text-[22px]">alt_route</mat-icon>
                  </div>
                  <span class="font-mono text-[10px] text-mode-drive font-bold">MODULE 02 // KINEMATICS</span>
                </div>
                <h3 class="font-display text-[26px] font-bold uppercase text-on-surface">
                  Real-Time Path Finding
                </h3>
                <p class="text-[14px] leading-6 text-on-surface-variant">
                  Sensor fusion combining monocular visual SLAM, smartphone 6-DOF IMU arrays, and
                  GPS for lane centerline retention and reactive avoidance across dynamic track
                  intersections.
                </p>
              </div>
              <div class="p-3 bg-surface-container border border-border-grid rounded-[2px] font-mono text-[11px] flex justify-between items-center text-on-surface">
                <span>BEZIER PLANNER</span>
                <span class="text-mode-drive font-bold tabular-nums">±1.2cm ACC</span>
              </div>
            </div>

            <div class="bg-canvas-pure border border-border-grid p-6 rounded-[4px] flex flex-col justify-between gap-5">
              <div class="space-y-3">
                <div class="flex items-center justify-between pb-3 border-b border-border-grid">
                  <div class="w-10 h-10 rounded-[2px] bg-tertiary-fixed border border-mode-fly/30 text-mode-fly flex items-center justify-center">
                    <mat-icon class="text-[22px]">payments</mat-icon>
                  </div>
                  <span class="font-mono text-[10px] text-mode-fly font-bold">MODULE 03 // DISRUPTION</span>
                </div>
                <h3 class="font-display text-[26px] font-bold uppercase text-on-surface">
                  Ultra-Low Cost Autonomy
                </h3>
                <p class="text-[14px] leading-6 text-on-surface-variant">
                  Bypassing $15,000+ automotive LiDAR-heavy rigs. Production Android handsets and
                  modular ESP32 controllers deliver ample TOPS for rigorous Level-3 testbed
                  mobility.
                </p>
              </div>
              <div class="p-3 bg-surface-container border border-border-grid rounded-[2px] font-mono text-[11px] flex justify-between items-center text-on-surface">
                <span>BOM REDUCTION</span>
                <span class="text-mode-fly font-bold tabular-nums">-92% COST</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 03 / Interactive Edge TPU Kinematic Loop & Light Industrial Log Console -->
      <section class="w-full px-6 md:px-10 py-14 bg-surface border-b border-border-grid" id="tpu-loop">
        <div class="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Left: SVG Sensor Topology Diagram -->
          <div class="lg:col-span-8 bg-canvas-pure border border-border-active p-6 rounded-[4px]">
            <div class="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-border-grid">
              <div>
                <div class="font-mono text-[10px] uppercase tracking-[0.08em] text-mode-drive font-bold">
                  03 / ACTIVE SENSOR TOPOLOGY
                </div>
                <h2 class="font-display text-[28px] font-bold uppercase text-on-surface mt-0.5">
                  Edge TPU &amp; TFLite Kinematic Loop
                </h2>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  (click)="simulateHazard()"
                  [disabled]="hazardActive()"
                  class="px-3.5 py-2 rounded-[2px] font-mono text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-60 border"
                  [class.bg-signal-alert]="hazardActive()"
                  [class.text-on-error]="hazardActive()"
                  [class.border-signal-alert]="hazardActive()"
                  [class.bg-primary]="!hazardActive()"
                  [class.hover:bg-primary-hover]="!hazardActive()"
                  [class.text-on-primary]="!hazardActive()"
                  [class.border-primary]="!hazardActive()"
                >
                  {{ hazardActive() ? 'BRAKING ENGAGED...' : 'SIMULATE HAZARD' }}
                </button>
                <button
                  type="button"
                  (click)="resetConsole()"
                  class="px-3 py-2 bg-canvas-pure hover:bg-surface-container-high border border-border-active text-on-surface rounded-[2px] font-mono text-[11px] font-semibold uppercase transition-colors cursor-pointer"
                  title="Reset console logs"
                >
                  RESET
                </button>
                <span class="inline-flex items-center gap-1.5 font-mono text-[10px] text-signal-success font-bold uppercase px-2">
                  <span class="w-2 h-2 rounded-full bg-signal-success"></span>
                  SYNCED
                </span>
              </div>
            </div>

            <!-- Industrial Drafting Grid SVG Flowchart -->
            <div class="w-full bg-surface-container industrial-grid p-4 rounded-[2px] overflow-x-auto border border-border-grid">
              <svg class="w-full min-w-[620px] h-48" fill="none" viewBox="0 0 760 190">
                <!-- Node 1: Input Source -->
                <rect fill="#FFFFFF" stroke="#929C9E" stroke-width="1.25" height="140" rx="2" width="165" x="10" y="25" />
                <rect fill="#2864A5" height="4" width="165" x="10" y="25" />
                <text fill="#2864A5" font-family="IBM Plex Mono, monospace" font-size="10" font-weight="700" x="24" y="52">
                  01 / INPUT SOURCE
                </text>
                <text fill="#20272B" font-family="Barlow Condensed, sans-serif" font-size="19" font-weight="700" x="24" y="78">
                  SMARTPHONE OPTIC
                </text>
                <text fill="#485359" font-family="IBM Plex Sans, sans-serif" font-size="11.5" x="24" y="102">
                  12MP HDR Camera
                </text>
                <text fill="#485359" font-family="IBM Plex Sans, sans-serif" font-size="11.5" x="24" y="122">
                  6-Axis Gyro/Accel
                </text>
                <text fill="#27834B" font-family="IBM Plex Mono, monospace" font-size="10.5" font-weight="600" x="24" y="148">
                  60Hz Native Feed
                </text>

                <!-- Connector 1 -->
                <path d="M175 95 L220 95" stroke="#929C9E" stroke-dasharray="4 3" stroke-width="1.5" />
                <polygon fill="#2864A5" points="218,90 227,95 218,100" />

                <!-- Node 2: Edge Compute TPU -->
                <rect fill="#FFFFFF" stroke="#929C9E" stroke-width="1.25" height="160" rx="2" width="225" x="228" y="15" />
                <rect
                  [attr.fill]="hazardActive() ? '#C63D32' : '#D8662D'"
                  height="5"
                  width="225"
                  x="228"
                  y="15"
                />
                <text fill="#D8662D" font-family="IBM Plex Mono, monospace" font-size="10" font-weight="700" x="242" y="44">
                  02 / EDGE COMPUTE (TPU)
                </text>
                <text fill="#20272B" font-family="Barlow Condensed, sans-serif" font-size="20" font-weight="700" x="242" y="72">
                  TENSORFLOW LITE INT8
                </text>
                <text fill="#485359" font-family="IBM Plex Sans, sans-serif" font-size="11.5" x="242" y="96">
                  • MobileNet-SSD Object Detect
                </text>
                <text fill="#485359" font-family="IBM Plex Sans, sans-serif" font-size="11.5" x="242" y="116">
                  • Semantic Road Segmentation
                </text>
                <text fill="#485359" font-family="IBM Plex Sans, sans-serif" font-size="11.5" x="242" y="136">
                  • Stop Sign &amp; Signal Classifier
                </text>
                <text fill="#168477" font-family="IBM Plex Mono, monospace" font-size="10.5" font-weight="600" x="242" y="160">
                  Core Temp: 38.4°C
                </text>

                <!-- Connector 2 -->
                <path d="M453 95 L498 95" stroke="#929C9E" stroke-dasharray="4 3" stroke-width="1.5" />
                <polygon fill="#168477" points="496,90 505,95 496,100" />

                <!-- Node 3: PWM Drive Subsystem -->
                <rect fill="#FFFFFF" stroke="#929C9E" stroke-width="1.25" height="140" rx="2" width="242" x="506" y="25" />
                <rect fill="#168477" height="4" width="242" x="506" y="25" />
                <text fill="#168477" font-family="IBM Plex Mono, monospace" font-size="10" font-weight="700" x="520" y="52">
                  03 / PWM DRIVE SUBSYSTEM
                </text>
                <text fill="#20272B" font-family="Barlow Condensed, sans-serif" font-size="19" font-weight="700" x="520" y="78">
                  ESP32 / SERVO CONTROLLER
                </text>
                <text fill="#485359" font-family="IBM Plex Sans, sans-serif" font-size="11.5" x="520" y="102">
                  UART / BLE 5.2 Telemetry Bridge
                </text>
                <text fill="#485359" font-family="IBM Plex Sans, sans-serif" font-size="11.5" x="520" y="122">
                  Ackermann Steering Vector
                </text>
                <text
                  [attr.fill]="hazardActive() ? '#C63D32' : '#27834B'"
                  font-family="IBM Plex Mono, monospace"
                  font-size="10.5"
                  font-weight="700"
                  x="520"
                  y="148"
                >
                  {{ hazardActive() ? 'E-BRAKE: PWM 0%' : 'PID Loop @ 200 Hz' }}
                </text>
              </svg>
            </div>

            <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="p-3 bg-surface-container border border-border-grid rounded-[2px]">
                <span class="font-mono text-[10px] text-outline block uppercase">CAMERA RES</span>
                <span class="font-mono text-[12px] text-on-surface font-bold tabular-nums">1280x720 @ 60p</span>
              </div>
              <div class="p-3 bg-surface-container border border-border-grid rounded-[2px]">
                <span class="font-mono text-[10px] text-outline block uppercase">TPU LATENCY</span>
                <span class="font-mono text-[12px] text-signal-success font-bold tabular-nums">8.3 ms</span>
              </div>
              <div class="p-3 bg-surface-container border border-border-grid rounded-[2px]">
                <span class="font-mono text-[10px] text-outline block uppercase">CLASSIFIER CONF.</span>
                <span class="font-mono text-[12px] text-on-surface font-bold tabular-nums">98.4% Mean</span>
              </div>
              <div class="p-3 bg-surface-container border border-border-grid rounded-[2px]">
                <span class="font-mono text-[10px] text-outline block uppercase">CHASSIS PAYLOAD</span>
                <span class="font-mono text-[12px] text-mode-drive font-bold tabular-nums">320g Total</span>
              </div>
            </div>
          </div>

          <!-- Right: Light Industrial Console (NO Dark Mode) -->
          <div
            class="lg:col-span-4 bg-inverse-surface text-inverse-on-surface border border-border-active rounded-[4px] flex flex-col justify-between overflow-hidden"
          >
            <div>
              <div class="px-5 py-3 bg-canvas-pure border-b border-border-grid flex items-center justify-between">
                <span class="font-mono text-[11px] text-on-surface uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full" [class.bg-signal-alert]="hazardActive()" [class.bg-signal-success]="!hazardActive()"></span>
                  LIVE TPU LOG CONSOLE
                </span>
                <span class="font-mono text-[10px] px-2 py-0.5 rounded-[2px] bg-surface-container-high border border-border-grid text-on-surface font-semibold">
                  TTY0 / DEV
                </span>
              </div>

              <div class="p-5 font-mono text-[11.5px] leading-5 space-y-1.5 h-72 overflow-y-auto tabular-nums">
                @for (entry of logs(); track entry.id) {
                  <div
                    class="py-0.5 border-b border-border-grid/40 last:border-b-0"
                    [class.text-signal-success]="entry.tone === 'success'"
                    [class.font-semibold]="entry.tone === 'success' || entry.tone === 'primary' || entry.tone === 'warning'"
                    [class.text-on-surface-variant]="entry.tone === 'muted'"
                    [class.text-mode-drive]="entry.tone === 'primary'"
                    [class.text-signal-warning]="entry.tone === 'warning'"
                    [class.text-signal-alert]="entry.tone === 'alert'"
                    [class.font-bold]="entry.tone === 'alert'"
                  >
                    {{ entry.text }}
                  </div>
                }
              </div>
            </div>

            <div
              class="px-5 py-3 bg-canvas-pure border-t border-border-grid flex items-center justify-between font-mono text-[10px]"
            >
              <span class="text-outline font-semibold">COMM PROTOCOL: BLE 5.2</span>
              <span
                class="font-bold uppercase"
                [class.text-signal-alert]="hazardActive()"
                [class.text-signal-success]="!hazardActive()"
              >
                {{ hazardActive() ? 'STATE: E-BRAKE HOLD' : 'STATE: AUTONOMOUS' }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- 04 / Featured Project 01: Self-Driving LEGO® Car Concept -->
      <section class="w-full px-6 md:px-10 py-14 bg-canvas-subtle border-b border-border-grid" id="lego-concept">
        <div class="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-5 space-y-5 order-2 lg:order-1">
            <div class="space-y-1.5">
              <span class="inline-block px-2.5 py-0.5 rounded-[2px] bg-primary-container border border-mode-run/40 text-on-primary-container font-mono text-[10px] font-bold uppercase tracking-wider">
                04 / FEATURED PROJECT 01 · ED-01
              </span>
              <h2 class="font-display text-[36px] sm:text-[40px] leading-none font-bold uppercase text-on-surface">
                Self-Driving LEGO® Car Concept
              </h2>
              <p class="font-display text-[22px] leading-7 uppercase text-mode-run font-semibold">
                AI/ML &amp; GPS Navigation Powered by Your Smartphone
              </p>
            </div>
            <p class="text-[15px] leading-6 text-on-surface-variant">
              Pioneered by ZoeWave, this prototype proves how modular Technic mechanics and
              standard consumer smartphones converge into a low-cost autonomous navigation testbed.
            </p>
            <div class="space-y-2.5 text-[13px] leading-5 text-on-surface-variant bg-canvas-pure border border-border-active p-5 rounded-[4px]">
              <div class="flex items-center gap-2 text-on-surface font-mono text-[11px] font-bold uppercase pb-2 border-b border-border-grid">
                <mat-icon class="text-mode-run text-[18px]">extension</mat-icon>
                <span>Onboard Smartphone Rig Features</span>
              </div>
              <ul class="space-y-1.5 list-disc list-inside">
                <li>Zero desktop host required: fully self-contained edge compute handset.</li>
                <li>Monocular visual odometry fused with built-in handset GPS kinematics.</li>
                <li>Direct Bluetooth Low Energy bridge to LEGO Mindstorms / Technic hubs.</li>
                <li>Lane detection, pedestrian obstacle stopping, and autonomous parking loops.</li>
              </ul>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <a
                href="https://zoewave.medium.com/self-driving-lego-car-concept-c3a50e72cccc"
                target="_blank"
                rel="noopener noreferrer"
                class="px-5 py-2.5 rounded-[2px] bg-mode-run hover:bg-primary-hover text-on-primary font-mono text-[12px] uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5"
              >
                <mat-icon class="text-[18px]">article</mat-icon>
                <span>Read ZoeWave Medium Article</span>
              </a>
              <button
                type="button"
                (click)="openProjectRecord(2)"
                class="px-4 py-2.5 rounded-[2px] bg-canvas-pure border border-border-active text-on-surface font-mono text-[12px] uppercase tracking-wider font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <mat-icon class="text-[18px] text-mode-drive">description</mat-icon>
                <span>Concept Specs</span>
              </button>
            </div>
          </div>

          <div class="lg:col-span-7 order-1 lg:order-2">
            <div class="bg-canvas-pure border border-border-active rounded-[4px] overflow-hidden">
              <div class="px-4 py-2.5 bg-surface-container border-b border-border-grid flex justify-between items-center font-mono text-[10px]">
                <span class="text-on-surface font-bold uppercase">CHASSIS SCHEMATIC // LEGO MODULAR FRAME</span>
                <span class="text-mode-run font-bold">TECH PROFILE: ED-01</span>
              </div>
              <div class="w-full h-80 bg-canvas-muted overflow-hidden">
                <img
                  [src]="images.legoConcept"
                  alt="Engineering view of LEGO Technic modular robotic autonomous car chassis with smartphone mount"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="px-4 py-2 bg-canvas-pure border-t border-border-grid font-mono text-[10px] text-on-surface-variant uppercase">
                CAD PROTOTYPE: LEGO TECHNIC 4WD REAR DIFF + SMARTPHONE DOCK
              </div>
              <div class="grid grid-cols-3 divide-x divide-border-grid border-t border-border-grid font-mono text-[11px] text-center bg-surface-container">
                <div class="p-3">
                  <span class="text-outline text-[10px] block uppercase">COMPUTE</span>
                  <span class="font-bold text-on-surface">Android Core</span>
                </div>
                <div class="p-3">
                  <span class="text-outline text-[10px] block uppercase">POWER SOURCE</span>
                  <span class="font-bold text-on-surface">Internal Li-Po</span>
                </div>
                <div class="p-3">
                  <span class="text-outline text-[10px] block uppercase">COMM LINK</span>
                  <span class="font-bold text-on-surface">Nordic BLE UART</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 05 / Featured Project 02: Pixelopolis Autonomous Installation -->
      <section class="w-full px-6 md:px-10 py-14 bg-surface border-b border-border-grid" id="pixelopolis-installation">
        <div class="max-w-[1360px] mx-auto space-y-8">
          <div class="pb-5 border-b border-border-grid">
            <span class="inline-block px-2.5 py-0.5 rounded-[2px] bg-secondary-fixed border border-mode-drive/40 text-on-secondary-fixed font-mono text-[10px] font-bold uppercase tracking-wider">
              05 / FEATURED PROJECT 02 · RESEARCH COLLABORATION
            </span>
            <h2 class="font-display text-[36px] sm:text-[42px] leading-none font-bold uppercase text-on-surface mt-2">
              Pixelopolis Autonomous Installation
            </h2>
            <p class="font-display text-[22px] leading-7 uppercase text-mode-drive font-semibold mt-1">
              Self-Driving Miniature Cars Powered by TensorFlow Lite
            </p>
          </div>

          <!-- Technical Quote Callout -->
          <div class="p-6 md:p-8 rounded-[4px] bg-canvas-pure border border-border-active border-l-4 border-l-mode-drive space-y-5">
            <p class="text-[17px] sm:text-[18px] text-on-surface leading-8">
              “Pixelopolis is an interactive installation that showcases self-driving miniature
              cars powered by
              <a
                class="text-mode-drive hover:underline font-semibold"
                href="https://www.tensorflow.org/lite"
                rel="noopener noreferrer"
                target="_blank"
              >
                TensorFlow Lite
              </a>
              . Each car is outfitted with its own Pixel phone, which used its camera to detect
              and understand signals from the world around it. In order to sense lanes, avoid
              collisions and read traffic signs, the phone uses machine learning running on the
              <a
                class="text-mode-drive hover:underline font-semibold"
                href="https://blog.google/products/pixel/pixel-4/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Pixel Neural Core
              </a>
              , which contains a version of an
              <a
                class="text-mode-drive hover:underline font-semibold"
                href="https://cloud.google.com/edge-tpu/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Edge TPU
              </a>
              .”
            </p>
            <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border-grid">
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-[2px] bg-mode-drive flex items-center justify-center text-on-secondary font-bold font-mono text-[12px]"
                >
                  TF
                </div>
                <div>
                  <div class="font-mono text-[12px] text-on-surface font-bold uppercase">
                    TensorFlow Lite Official Showcase
                  </div>
                  <div class="font-mono text-[10px] text-outline">
                    Published on Google’s TensorFlow Engineering Blog
                  </div>
                </div>
              </div>
              <a
                href="https://blog.tensorflow.org/2020/07/pixelopolis-self-driving-car-demo-tensorflow-lite.html"
                rel="noopener noreferrer"
                target="_blank"
                class="px-4 py-2 rounded-[2px] bg-canvas-pure border border-border-active text-mode-drive font-mono text-[11px] uppercase tracking-wider hover:bg-secondary-fixed/50 transition-colors flex items-center gap-1.5 font-bold"
              >
                <span>Read Research Post</span>
                <mat-icon class="text-[16px]">arrow_forward</mat-icon>
              </a>
            </div>
          </div>

          <!-- Installation Highlights -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div class="bg-canvas-pure p-5 rounded-[4px] border border-border-grid space-y-2">
              <div class="flex items-center gap-2 text-mode-run font-mono text-[10px] font-bold uppercase">
                <mat-icon class="text-[18px]">traffic</mat-icon>
                <span>REAL-WORLD SIGNS</span>
              </div>
              <h3 class="font-display text-[22px] font-bold uppercase text-on-surface">
                Traffic Light Perception
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Detects state changes on miniaturized multi-phase LEDs at test track intersections
                with sub-15ms recognition.
              </p>
            </div>
            <div class="bg-canvas-pure p-5 rounded-[4px] border border-border-grid space-y-2">
              <div class="flex items-center gap-2 text-mode-drive font-mono text-[10px] font-bold uppercase">
                <mat-icon class="text-[18px]">car_crash</mat-icon>
                <span>ACTIVE SAFETY</span>
              </div>
              <h3 class="font-display text-[22px] font-bold uppercase text-on-surface">
                Dynamic Collision Guard
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Continuously computes time-to-impact (TTI) for lead cars, pedestrians, and sudden
                obstacles across the urban grid.
              </p>
            </div>
            <div class="bg-canvas-pure p-5 rounded-[4px] border border-border-grid space-y-2">
              <div class="flex items-center gap-2 text-mode-fly font-mono text-[10px] font-bold uppercase">
                <mat-icon class="text-[18px]">memory</mat-icon>
                <span>EDGE TPU</span>
              </div>
              <h3 class="font-display text-[22px] font-bold uppercase text-on-surface">
                Pixel Neural Core
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Leverages hardware INT8 quantization to sustain high inference throughput without
                thermal throttling over continuous driving hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 06 / Autonomous Compute Matrix Comparison -->
      <section class="w-full px-6 md:px-10 py-14 bg-canvas-subtle border-b border-border-grid">
        <div class="max-w-[1360px] mx-auto space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-5 border-b border-border-grid">
            <div>
              <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-mode-drive font-bold">
                06 / BENCHMARKING &amp; ARCHITECTURE
              </span>
              <h2 class="font-display text-[36px] sm:text-[42px] leading-none font-bold uppercase text-on-surface mt-1.5">
                Autonomous Compute Matrix Comparison
              </h2>
            </div>
            <div class="font-mono text-[10px] text-outline font-semibold uppercase">
              LABS BENCHMARK // Q1 2025
            </div>
          </div>

          <div class="bg-canvas-pure border border-border-active rounded-[4px] overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-[13px] border-collapse">
                <thead>
                  <tr class="bg-surface-container-high border-b-2 border-border-active text-on-surface font-mono text-[10px] uppercase tracking-wider">
                    <th class="p-4 font-bold">Specification</th>
                    <th class="p-4 text-mode-drive font-bold">ZoeRobo Smartphone / TPU</th>
                    <th class="p-4 font-bold">Conventional Workstation AV</th>
                    <th class="p-4 font-bold">Standard Microcontroller</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border-grid">
                  <tr class="even:bg-canvas-subtle hover:bg-surface-container-high/60 transition-colors">
                    <td class="p-4 font-semibold text-on-surface">Vision Inference Latency</td>
                    <td class="p-4 font-mono text-[12px] text-signal-success font-bold tabular-nums">8.3 ms (Edge TPU)</td>
                    <td class="p-4 font-mono text-[12px] text-on-surface-variant tabular-nums">14.2 ms (Desktop GPU)</td>
                    <td class="p-4 font-mono text-[12px] text-outline tabular-nums">180 ms (MCU Soft-Math)</td>
                  </tr>
                  <tr class="even:bg-canvas-subtle hover:bg-surface-container-high/60 transition-colors">
                    <td class="p-4 font-semibold text-on-surface">Total Hardware BOM</td>
                    <td class="p-4 font-mono text-[12px] text-mode-drive font-bold tabular-nums">&lt; $400 USD (All inclusive)</td>
                    <td class="p-4 font-mono text-[12px] text-on-surface-variant tabular-nums">$8,000 - $25,000 USD</td>
                    <td class="p-4 font-mono text-[12px] text-outline tabular-nums">&lt; $50 USD (Zero ML capacity)</td>
                  </tr>
                  <tr class="even:bg-canvas-subtle hover:bg-surface-container-high/60 transition-colors">
                    <td class="p-4 font-semibold text-on-surface">Power Consumption</td>
                    <td class="p-4 font-mono text-[12px] text-signal-success font-bold tabular-nums">1.4 W avg.</td>
                    <td class="p-4 font-mono text-[12px] text-on-surface-variant tabular-nums">350 W - 800 W (Thermal drain)</td>
                    <td class="p-4 font-mono text-[12px] text-outline tabular-nums">0.4 W</td>
                  </tr>
                  <tr class="even:bg-canvas-subtle hover:bg-surface-container-high/60 transition-colors">
                    <td class="p-4 font-semibold text-on-surface">Built-in Sensor Cluster</td>
                    <td class="p-4 font-mono text-[12px] text-on-surface font-semibold">Camera + IMU + GPS + 5G Telematics</td>
                    <td class="p-4 font-mono text-[12px] text-on-surface-variant">External discrete USB/CAN rigs</td>
                    <td class="p-4 font-mono text-[12px] text-outline">None / External sensors only</td>
                  </tr>
                  <tr class="even:bg-canvas-subtle hover:bg-surface-container-high/60 transition-colors">
                    <td class="p-4 font-semibold text-on-surface">Software Framework</td>
                    <td class="p-4 font-mono text-[12px] text-mode-run font-bold">TensorFlow Lite + ROS2 Android</td>
                    <td class="p-4 font-mono text-[12px] text-on-surface-variant">Autoware / Apollo / CUDA</td>
                    <td class="p-4 font-mono text-[12px] text-outline">FreeRTOS / Bare Metal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom Action Banner (Solid Industrial Surface, No Gradients) -->
      <section class="w-full px-6 md:px-10 py-12 bg-canvas-pure">
        <div
          class="max-w-[1360px] mx-auto bg-surface-container-high border border-border-active p-6 md:p-10 rounded-[4px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div class="space-y-2 max-w-2xl">
            <span class="font-mono text-[10px] text-mode-drive font-bold uppercase tracking-[0.08em]">
              DEPLOYMENT READY · ZR-DRV-009
            </span>
            <h2 class="font-display text-[32px] sm:text-[38px] leading-none font-bold uppercase text-on-surface">
              Ready to Build Your Autonomous Edge Driver?
            </h2>
            <p class="text-[15px] leading-6 text-on-surface-variant">
              Access open-source TensorFlow Lite model weights, Android camera harness code, and
              UART motor driver bridges developed for ZoeRobo drive platforms.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="https://blog.tensorflow.org/2020/07/pixelopolis-self-driving-car-demo-tensorflow-lite.html"
              rel="noopener noreferrer"
              target="_blank"
              class="w-full sm:w-auto px-6 py-3 rounded-[2px] bg-mode-drive hover:bg-secondary-container text-on-secondary font-mono text-[12px] font-semibold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2"
            >
              <mat-icon class="text-[16px]">open_in_new</mat-icon>
              <span>TensorFlow Blog</span>
            </a>
            <a
              href="https://zoewave.medium.com/self-driving-lego-car-concept-c3a50e72cccc"
              rel="noopener noreferrer"
              target="_blank"
              class="w-full sm:w-auto px-6 py-3 rounded-[2px] bg-canvas-pure border border-border-active text-on-surface font-mono text-[12px] font-semibold uppercase tracking-wider text-center hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
            >
              <mat-icon class="text-[16px] text-mode-run">article</mat-icon>
              <span>ZoeWave Article</span>
            </a>
          </div>
        </div>
      </section>
    </div>

    <app-paper-modal [record]="selectedRecord()" (closed)="selectedRecord.set(null)" />
  `,
})
export class AimlDrive {
  protected readonly images = ZOEROBO_IMAGES;
  protected readonly logs = signal<ConsoleEntry[]>([...INITIAL_LOGS]);
  protected readonly hazardActive = signal(false);
  protected readonly selectedRecord = signal<ResearchRecord | null>(null);

  private nextId = INITIAL_LOGS.length + 1;
  private timers: ReturnType<typeof setTimeout>[] = [];

  protected simulateHazard(): void {
    if (this.hazardActive()) return;
    this.hazardActive.set(true);

    const sequence: { text: string; tone: ConsoleEntry['tone'] }[] = [
      { text: '[0.104s] ! HAZARD DETECTED: MINIATURE PEDESTRIAN IN LANE', tone: 'alert' },
      { text: '[0.112s] EMERGENCY BRAKING ENGAGED: PWM DUTY -> 0%', tone: 'alert' },
      { text: '[0.128s] Distance to Obstacle: 14.2cm | Clearance wait...', tone: 'warning' },
      { text: '[0.210s] Obstacle cleared. Resuming trajectory @ 30% throttle', tone: 'success' },
    ];

    sequence.forEach((ev, index) => {
      const timer = setTimeout(() => {
        this.logs.update((current) => [
          ...current,
          { id: this.nextId++, text: ev.text, tone: ev.tone },
        ]);
        if (index === sequence.length - 1) {
          this.hazardActive.set(false);
        }
      }, (index + 1) * 350);
      this.timers.push(timer);
    });
  }

  protected resetConsole(): void {
    for (const t of this.timers) {
      clearTimeout(t);
    }
    this.timers = [];
    this.hazardActive.set(false);
    this.logs.set([...INITIAL_LOGS]);
  }

  protected openProjectRecord(index: number): void {
    this.selectedRecord.set(RESEARCH_RECORDS[index] ?? null);
  }
}
