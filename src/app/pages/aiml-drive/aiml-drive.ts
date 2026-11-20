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
    <div class="flex flex-col w-full">
      <!-- Top Breadcrumb & Status Ribbon -->
      <section class="w-full px-6 md:px-12 pt-5 pb-2">
        <div
          class="flex flex-wrap items-center justify-between gap-3 bg-canvas-subtle border border-border-grid/80 px-4 py-2.5 rounded-lg shadow-sm font-mono text-[10px] tracking-[0.06em]"
        >
          <div class="flex flex-wrap items-center gap-2">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-mode-drive/10 text-mode-drive font-bold">
              <span class="w-2 h-2 rounded-full bg-mode-drive"></span>
              AUTONOMOUS DRIVE ARCHITECTURE
            </span>
            <span class="text-outline">//</span>
            <span class="text-on-surface-variant">SYS_IDENT: DRIVE-CORE-V4.2</span>
            <span class="hidden md:inline text-outline">//</span>
            <span class="hidden md:inline text-signal-success font-semibold">
              PIPELINE: TFLITE_TPU_ONLINE
            </span>
          </div>
          <div class="flex items-center gap-4 text-on-surface-variant tabular-nums">
            <span class="flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-signal-success"></span>
              60.2 FPS VISION
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-mode-run"></span>
              1.4W NOMINAL
            </span>
          </div>
        </div>
      </section>

      <!-- Hero Section -->
      <section class="w-full px-6 md:px-12 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <!-- Text Narrative -->
          <div class="lg:col-span-6 space-y-4">
            <div class="space-y-2">
              <div class="inline-block px-2.5 py-1 rounded bg-secondary/10 text-secondary font-mono text-[10px] uppercase tracking-wider font-semibold">
                Edge Intelligence Matrix
              </div>
              <h1
                class="font-display text-[36px] sm:text-[46px] lg:text-[52px] leading-[1.08] font-bold text-on-surface tracking-[-0.03em]"
              >
                AI/ML Driver: <span class="text-secondary">Edge Intelligence</span> for Autonomous
                Mobility
              </h1>
              <p class="font-display text-[20px] leading-7 text-on-surface-variant font-medium">
                Smartphone-Powered Neural Computing, TensorFlow Lite &amp; Real-Time Computer Vision
              </p>
            </div>
            <p class="text-[15px] leading-6 text-on-surface-variant max-w-xl">
              By offloading complex sensory perception, lane telemetry, and pathing kinematics to
              ubiquitous consumer smartphone architectures and integrated Edge TPUs, ZoeRobo
              completely transforms accessibility in autonomous vehicular intelligence.
            </p>

            <!-- Quick Telemetry Bar -->
            <div class="grid grid-cols-3 gap-3 p-3 bg-canvas-pure border border-border-grid rounded-lg shadow-sm">
              <div class="p-2.5 rounded bg-surface-container-low">
                <span class="font-mono text-[10px] text-outline block uppercase">Inference</span>
                <span class="font-mono text-[15px] font-bold text-secondary tabular-nums">60.2 FPS</span>
                <span class="text-[12px] text-on-surface-variant block">Quantized INT8</span>
              </div>
              <div class="p-2.5 rounded bg-surface-container-low">
                <span class="font-mono text-[10px] text-outline block uppercase">Latency</span>
                <span class="font-mono text-[15px] font-bold text-mode-fly tabular-nums">11.4 ms</span>
                <span class="text-[12px] text-on-surface-variant block">Glass-to-Actuator</span>
              </div>
              <div class="p-2.5 rounded bg-surface-container-low">
                <span class="font-mono text-[10px] text-outline block uppercase">Power Draw</span>
                <span class="font-mono text-[15px] font-bold text-primary tabular-nums">1.4 Watts</span>
                <span class="text-[12px] text-on-surface-variant block">Mobile Edge TPU</span>
              </div>
            </div>

            <!-- CTAs -->
            <div class="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#pixelopolis-installation"
                class="px-4 py-2.5 rounded bg-secondary text-on-secondary font-mono text-[12px] uppercase tracking-wider shadow-sm hover:bg-secondary-container transition-all flex items-center gap-1.5 font-semibold"
              >
                <mat-icon class="text-[18px]">developer_board</mat-icon>
                <span>Pixelopolis Case Study</span>
              </a>
              <a
                href="#lego-concept"
                class="px-4 py-2.5 rounded bg-canvas-pure border border-border-grid text-on-surface font-mono text-[12px] uppercase tracking-wider shadow-sm hover:bg-surface-container transition-all flex items-center gap-1.5 font-semibold"
              >
                <mat-icon class="text-[18px]">play_circle</mat-icon>
                <span>View LEGO® Concept</span>
              </a>
              <a
                href="https://github.com/tensorflow/examples"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2.5 rounded bg-surface-container-high text-primary font-mono text-[12px] uppercase tracking-wider hover:bg-surface-variant transition-all flex items-center gap-1.5 font-semibold"
              >
                <mat-icon class="text-[18px]">code</mat-icon>
                <span>GitHub Repo</span>
              </a>
            </div>
          </div>

          <!-- Hero Visual Rig -->
          <div class="lg:col-span-6 relative">
            <div class="relative rounded-xl overflow-hidden shadow-lg bg-canvas-pure border border-border-grid">
              <img
                [src]="images.aimlDriveHero"
                alt="Autonomous miniature vehicle running on-board mobile compute on miniature urban track"
                referrerpolicy="no-referrer"
                class="w-full h-[420px] object-cover object-center"
              />
              <!-- Live Telemetry Overlay HUD -->
              <div class="absolute top-3 left-3 right-3 flex flex-wrap justify-between items-start gap-2 pointer-events-none">
                <div
                  class="bg-inverse-surface/85 backdrop-blur-md px-3 py-1 rounded text-inverse-on-surface font-mono text-[10px] flex items-center gap-2"
                >
                  <span class="w-2 h-2 rounded-full bg-signal-success animate-ping"></span>
                  REC // TRACK_URBAN_GRID_04
                </div>
                <div class="bg-inverse-surface/85 backdrop-blur-md px-3 py-1 rounded text-inverse-on-surface font-mono text-[10px] tabular-nums">
                  LAT: 42.3601 N | LON: 71.0942 W
                </div>
              </div>

              <!-- Bottom Telemetry Card overlay -->
              <div
                class="absolute bottom-3 left-3 right-3 p-3.5 rounded-lg bg-canvas-pure/95 backdrop-blur-md shadow-md flex items-center justify-between gap-3"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded bg-mode-drive/10 flex items-center justify-center text-mode-drive shrink-0">
                    <mat-icon>smart_toy</mat-icon>
                  </div>
                  <div>
                    <div class="font-display text-[18px] font-semibold text-on-surface leading-tight">
                      YLabZ Autonomous Platform
                    </div>
                    <div class="font-mono text-[10px] text-on-surface-variant">
                      Mobile Neural Rig + Monocular SLAM &amp; Lane Assist
                    </div>
                  </div>
                </div>
                <div class="hidden sm:flex flex-col text-right font-mono text-[10px]">
                  <span class="text-signal-success font-semibold">TFLITE CORE: 100% LOCK</span>
                  <span class="text-outline">ST-09 STEERING SERVO ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Three Core Pillars of Low-Cost Edge Autonomy -->
      <section class="w-full px-6 md:px-12 py-10 bg-surface-container-low border-y border-border-grid/60">
        <div class="max-w-4xl mb-6">
          <span class="font-mono text-[11px] uppercase tracking-wider text-secondary font-bold">
            Empirical Hardware Architecture
          </span>
          <h2 class="font-display text-[32px] sm:text-[36px] leading-tight font-semibold text-on-surface mt-1">
            Core Autonomous Vehicle Capabilities
          </h2>
          <p class="text-[15px] leading-6 text-on-surface-variant mt-1.5">
            Democratizing AV research without multi-thousand dollar bulky trunk-mounted industrial
            computers or liquid-cooled workstation servers.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-canvas-pure border border-border-grid p-6 rounded-xl shadow-sm space-y-4 flex flex-col justify-between">
            <div class="space-y-2.5">
              <div class="w-12 h-12 rounded-lg bg-mode-run/10 text-mode-run flex items-center justify-center">
                <mat-icon class="text-[28px]">visibility</mat-icon>
              </div>
              <div class="font-mono text-[10px] text-mode-run font-bold">MODULE 01 // PERCEPTION</div>
              <h3 class="font-display text-[22px] font-semibold text-on-surface">Neural Vision Pipeline</h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                MobileNet and tailored YOLO object detection primitives running locked at 60 FPS
                directly on the smartphone Edge TPU neural accelerator. Instant inference
                categorizes traffic lights, stop boards, dynamic urban pedestrians, and lane
                contours.
              </p>
            </div>
            <div class="p-3 bg-surface-container rounded font-mono text-[11px] flex justify-between items-center text-on-surface">
              <span>MODEL: MOBILENET-V3-INT8</span>
              <span class="text-signal-success font-bold tabular-nums">12ms</span>
            </div>
          </div>

          <div class="bg-canvas-pure border border-border-grid p-6 rounded-xl shadow-sm space-y-4 flex flex-col justify-between">
            <div class="space-y-2.5">
              <div class="w-12 h-12 rounded-lg bg-mode-drive/10 text-mode-drive flex items-center justify-center">
                <mat-icon class="text-[28px]">alt_route</mat-icon>
              </div>
              <div class="font-mono text-[10px] text-mode-drive font-bold">MODULE 02 // KINEMATICS</div>
              <h3 class="font-display text-[22px] font-semibold text-on-surface">Real-Time Path Finding</h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Sensor fusion synthesizing monocular visual SLAM, smartphone 6-DOF IMU arrays, and
                GPS. Instant lane centerline retention with reactive avoidance geometry navigating
                complex intersections and dynamic track obstacles.
              </p>
            </div>
            <div class="p-3 bg-surface-container rounded font-mono text-[11px] flex justify-between items-center text-on-surface">
              <span>TRAJECTORY PLANNER: BEZIER</span>
              <span class="text-mode-drive font-bold tabular-nums">±1.2cm ACCURACY</span>
            </div>
          </div>

          <div class="bg-canvas-pure border border-border-grid p-6 rounded-xl shadow-sm space-y-4 flex flex-col justify-between">
            <div class="space-y-2.5">
              <div class="w-12 h-12 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center">
                <mat-icon class="text-[28px]">payments</mat-icon>
              </div>
              <div class="font-mono text-[10px] text-tertiary font-bold">MODULE 03 // DISRUPTION</div>
              <h3 class="font-display text-[22px] font-semibold text-on-surface">Ultra-Low Cost Autonomy</h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Bypassing $15,000+ automotive industrial LiDAR-heavy configurations. ZoeRobo
                demonstrates that production Android handsets and modular microcontrollers offer
                sufficient TOPS to solve rigorous autonomous Level-3 mobility problems.
              </p>
            </div>
            <div class="p-3 bg-surface-container rounded font-mono text-[11px] flex justify-between items-center text-on-surface">
              <span>HARDWARE COST REDUCTION</span>
              <span class="text-mode-fly font-bold tabular-nums">-92% BOM</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Sensor & Vision Telemetry Demonstration Pipeline -->
      <section class="w-full px-6 md:px-12 py-12" id="tpu-loop">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Real-Time Pipeline Diagram -->
          <div class="lg:col-span-8 bg-canvas-pure border border-border-grid p-6 rounded-xl shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-3 pb-4">
              <div>
                <div class="font-mono text-[10px] uppercase text-secondary font-semibold">
                  Active Sensor Topology
                </div>
                <h2 class="font-display text-[24px] font-semibold text-on-surface">
                  Edge TPU &amp; TFLite Kinematic Loop
                </h2>
              </div>
              <div class="flex items-center gap-2.5">
                <button
                  type="button"
                  (click)="simulateHazard()"
                  [disabled]="hazardActive()"
                  class="px-3.5 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded font-mono text-[11px] font-semibold transition-colors cursor-pointer disabled:opacity-60"
                >
                  {{ hazardActive() ? 'BRAKING ENGAGED...' : 'SIMULATE HAZARD' }}
                </button>
                <button
                  type="button"
                  (click)="resetConsole()"
                  class="px-2.5 py-1.5 bg-canvas-subtle hover:bg-canvas-muted text-outline rounded font-mono text-[10px] transition-colors cursor-pointer"
                  title="Reset console logs"
                >
                  RESET
                </button>
                <span class="inline-flex items-center gap-1.5 font-mono text-[10px] text-signal-success font-semibold">
                  <span class="w-2 h-2 rounded-full bg-signal-success"></span>
                  SYNCED
                </span>
              </div>
            </div>

            <!-- SVG Architectural Flowchart -->
            <div class="w-full bg-canvas-subtle p-4 rounded-lg overflow-x-auto border border-border-grid/60">
              <svg class="w-full min-w-[620px] h-48" fill="none" viewBox="0 0 760 190">
                <!-- Node 1 -->
                <rect fill="#FFFFFF" stroke="#E2E8F0" height="140" rx="8" width="160" x="10" y="25" />
                <text fill="#006194" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600" x="25" y="55">
                  INPUT SOURCE
                </text>
                <text fill="#131B2E" font-family="Space Grotesk, sans-serif" font-size="16" font-weight="600" x="25" y="80">
                  Smartphone Optic
                </text>
                <text fill="#707881" font-family="Inter, sans-serif" font-size="12" x="25" y="105">
                  12MP HDR Camera
                </text>
                <text fill="#707881" font-family="Inter, sans-serif" font-size="12" x="25" y="125">
                  6-Axis Gyro/Accel
                </text>
                <text fill="#10B981" font-family="JetBrains Mono, monospace" font-size="11" x="25" y="145">
                  60Hz Native Feed
                </text>

                <!-- Connector 1 -->
                <path d="M170 95 L220 95" stroke="#CBD5E1" stroke-dasharray="4 4" stroke-width="2" />
                <polygon fill="#0284C7" points="220,90 228,95 220,100" />

                <!-- Node 2 -->
                <rect fill="#FFFFFF" stroke="#E2E8F0" height="160" rx="8" width="220" x="230" y="15" />
                <rect
                  [attr.fill]="hazardActive() ? '#EF4444' : '#0284C7'"
                  height="6"
                  rx="3"
                  width="220"
                  x="230"
                  y="15"
                />
                <text fill="#0284C7" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600" x="245" y="48">
                  EDGE COMPUTE (TPU)
                </text>
                <text fill="#131B2E" font-family="Space Grotesk, sans-serif" font-size="17" font-weight="700" x="245" y="75">
                  TensorFlow Lite
                </text>
                <text fill="#3F4850" font-family="Inter, sans-serif" font-size="12" x="245" y="100">
                  • MobileNet-SSD Object Detect
                </text>
                <text fill="#3F4850" font-family="Inter, sans-serif" font-size="12" x="245" y="120">
                  • Semantic Road Segmentation
                </text>
                <text fill="#3F4850" font-family="Inter, sans-serif" font-size="12" x="245" y="140">
                  • Stop Sign &amp; Signal Classifier
                </text>
                <text fill="#0D9488" font-family="JetBrains Mono, monospace" font-size="11" x="245" y="160">
                  Core Temp: 38.4°C
                </text>

                <!-- Connector 2 -->
                <path d="M450 95 L500 95" stroke="#CBD5E1" stroke-dasharray="4 4" stroke-width="2" />
                <polygon fill="#0051D5" points="500,90 508,95 500,100" />

                <!-- Node 3 -->
                <rect fill="#FFFFFF" stroke="#E2E8F0" height="140" rx="8" width="230" x="510" y="25" />
                <text fill="#0051D5" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600" x="525" y="55">
                  PWM DRIVE SUBSYSTEM
                </text>
                <text fill="#131B2E" font-family="Space Grotesk, sans-serif" font-size="16" font-weight="600" x="525" y="80">
                  ESP32 / Servo Controller
                </text>
                <text fill="#707881" font-family="Inter, sans-serif" font-size="12" x="525" y="105">
                  UART/BLE Telemetry Bridge
                </text>
                <text fill="#707881" font-family="Inter, sans-serif" font-size="12" x="525" y="125">
                  Ackermann Steering Vector
                </text>
                <text
                  [attr.fill]="hazardActive() ? '#EF4444' : '#10B981'"
                  font-family="JetBrains Mono, monospace"
                  font-size="11"
                  x="525"
                  y="145"
                >
                  {{ hazardActive() ? 'E-BRAKE: PWM 0%' : 'PID Loop @ 200 Hz' }}
                </text>
              </svg>
            </div>

            <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="p-2.5 bg-canvas-subtle rounded">
                <span class="font-mono text-[10px] text-outline block">CAMERA RESOLUTION</span>
                <span class="font-mono text-[12px] text-on-surface font-semibold tabular-nums">1280 x 720 @ 60p</span>
              </div>
              <div class="p-2.5 bg-canvas-subtle rounded">
                <span class="font-mono text-[10px] text-outline block">TPU LATENCY</span>
                <span class="font-mono text-[12px] text-signal-success font-semibold tabular-nums">8.3 ms</span>
              </div>
              <div class="p-2.5 bg-canvas-subtle rounded">
                <span class="font-mono text-[10px] text-outline block">CLASSIFIER CONF.</span>
                <span class="font-mono text-[12px] text-on-surface font-semibold tabular-nums">98.4% Mean</span>
              </div>
              <div class="p-2.5 bg-canvas-subtle rounded">
                <span class="font-mono text-[10px] text-outline block">CHASSIS PAYLOAD</span>
                <span class="font-mono text-[12px] text-secondary font-semibold tabular-nums">320g Total</span>
              </div>
            </div>
          </div>

          <!-- Real-Time Telemetry Terminal Box -->
          <div
            class="lg:col-span-4 bg-inverse-surface text-inverse-on-surface p-6 rounded-xl shadow-sm flex flex-col justify-between"
          >
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="font-mono text-[10px] text-primary-fixed-dim uppercase tracking-wider font-semibold">
                  LIVE TPU LOG CONSOLE
                </span>
                <span class="font-mono text-[10px] px-2 py-0.5 rounded bg-mode-run/20 text-primary-fixed-dim">
                  TTY0 / DEV
                </span>
              </div>
              <div class="font-mono text-[11px] leading-5 space-y-1.5 h-60 overflow-y-auto pr-1">
                @for (entry of logs(); track entry.id) {
                  <div
                    [class.text-signal-success]="entry.tone === 'success'"
                    [class.text-canvas-muted]="entry.tone === 'muted'"
                    [class.text-primary-fixed-dim]="entry.tone === 'primary'"
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
              class="pt-4 mt-3 border-t border-inverse-on-surface/15 flex items-center justify-between font-mono text-[10px]"
            >
              <span class="text-inverse-on-surface/70">COMM PROTOCOL: BLE 5.2</span>
              <span
                class="font-bold"
                [class.text-signal-alert]="hazardActive()"
                [class.text-tertiary-fixed]="!hazardActive()"
              >
                {{ hazardActive() ? 'STATE: E-BRAKE HOLD' : 'STATE: AUTONOMOUS' }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Project 1: Self-Driving LEGO® Car Concept -->
      <section class="w-full px-6 md:px-12 py-12 bg-canvas-subtle border-y border-border-grid/60" id="lego-concept">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div class="lg:col-span-5 space-y-4 order-2 lg:order-1">
            <div class="space-y-1.5">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full bg-mode-run/10 text-mode-run font-mono text-[10px] font-semibold">
                FEATURED PROJECT 01
              </span>
              <h2 class="font-display text-[32px] sm:text-[36px] leading-tight font-semibold text-on-surface">
                Self-Driving LEGO® Car Concept
              </h2>
              <p class="font-display text-[20px] text-mode-run font-medium">
                AI/ML &amp; GPS Navigation Powered by Your Smartphone
              </p>
            </div>
            <p class="text-[15px] leading-6 text-on-surface-variant">
              Pioneered by ZoeWave, this prototype demonstrates how simple toys, standard consumer
              building blocks, and ubiquitous smartphones converge into an educational powerhouse
              for autonomous navigation.
            </p>
            <div class="space-y-2 text-[13px] leading-5 text-on-surface-variant bg-canvas-pure border border-border-grid p-4 rounded-lg shadow-sm">
              <div class="flex items-center gap-2 text-on-surface font-semibold">
                <mat-icon class="text-mode-run text-[20px]">extension</mat-icon>
                <span>Onboard Smartphone Rig Features:</span>
              </div>
              <ul class="list-disc list-inside space-y-1 pl-1">
                <li>Zero high-end desktop requirements: fully self-contained edge device.</li>
                <li>Monocular visual odometry fused with built-in handset GPS kinematics.</li>
                <li>Direct Bluetooth Low Energy integration with LEGO Mindstorms / Technic hubs.</li>
                <li>Comprehensive lane detection, pedestrian obstacle stopping, and parking maneuvers.</li>
              </ul>
            </div>
            <div class="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="https://zoewave.medium.com/self-driving-lego-car-concept-c3a50e72cccc"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2.5 rounded bg-mode-run text-canvas-pure font-mono text-[12px] uppercase tracking-wider shadow-sm hover:bg-primary transition-all flex items-center gap-1.5 font-semibold"
              >
                <mat-icon class="text-[18px]">article</mat-icon>
                <span>Read ZoeWave Medium Article</span>
              </a>
              <button
                type="button"
                (click)="openProjectRecord(2)"
                class="px-4 py-2.5 rounded bg-canvas-pure border border-border-grid text-on-surface font-mono text-[12px] uppercase tracking-wider shadow-sm hover:bg-surface-container transition-all flex items-center gap-1.5 font-semibold cursor-pointer"
              >
                <mat-icon class="text-[18px]">description</mat-icon>
                <span>Concept Specs</span>
              </button>
            </div>
          </div>

          <div class="lg:col-span-7 order-1 lg:order-2">
            <div class="bg-canvas-pure border border-border-grid p-5 rounded-xl shadow-md space-y-4">
              <div class="flex justify-between items-center font-mono text-[10px]">
                <span class="text-outline uppercase">CHASSIS SCHEMATIC // LEGO MODULAR FRAME</span>
                <span class="text-mode-run font-semibold">TECH PROFILE: ED-01</span>
              </div>
              <div class="relative w-full h-80 rounded-lg overflow-hidden bg-canvas-muted">
                <img
                  [src]="images.legoConcept"
                  alt="Engineering view of LEGO Technic modular robotic autonomous car chassis with smartphone mount"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover"
                />
                <div class="absolute bottom-3 left-3 bg-canvas-pure/92 backdrop-blur-md px-3 py-1 rounded text-on-surface font-mono text-[10px] shadow-sm">
                  CAD PROTOTYPE: LEGO TECHNIC 4WD REAR DIFF + SMARTPHONE DOCK
                </div>
              </div>
              <div class="grid grid-cols-3 gap-3 font-mono text-[11px] text-center">
                <div class="p-2.5 rounded bg-surface-container-low">
                  <span class="text-outline text-[10px] block">COMPUTE</span>
                  <span class="font-bold text-on-surface">Android Core</span>
                </div>
                <div class="p-2.5 rounded bg-surface-container-low">
                  <span class="text-outline text-[10px] block">POWER SOURCE</span>
                  <span class="font-bold text-on-surface">Handset Internal Li-Po</span>
                </div>
                <div class="p-2.5 rounded bg-surface-container-low">
                  <span class="text-outline text-[10px] block">COMM LINK</span>
                  <span class="font-bold text-on-surface">Nordic BLE UART</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Project 2: Pixelopolis Autonomous Installation -->
      <section class="w-full px-6 md:px-12 py-12 bg-canvas-pure" id="pixelopolis-installation">
        <div class="max-w-4xl mx-auto space-y-6">
          <div class="text-center space-y-1.5">
            <span class="inline-flex items-center px-3 py-0.5 rounded-full bg-secondary/10 text-secondary font-mono text-[10px] font-semibold">
              FEATURED PROJECT 02 // RESEARCH COLLABORATION
            </span>
            <h2 class="font-display text-[32px] sm:text-[36px] leading-tight font-semibold text-on-surface">
              Pixelopolis Autonomous Installation
            </h2>
            <p class="font-display text-[20px] text-secondary font-medium">
              Self-Driving Miniature Cars Powered by TensorFlow Lite
            </p>
          </div>

          <!-- Verbatim Quote Callout -->
          <div class="p-6 md:p-8 rounded-xl bg-surface-container-low border border-border-grid/70 shadow-sm relative">
            <mat-icon
              class="absolute top-4 right-4 text-surface-container-highest text-[56px] pointer-events-none select-none"
              aria-hidden="true"
            >
              format_quote
            </mat-icon>
            <div class="relative z-10 space-y-5">
              <p class="font-display text-[19px] sm:text-[20px] text-on-surface italic leading-relaxed">
                “Pixelopolis is an interactive installation that showcases self-driving miniature
                cars powered by
                <a
                  class="text-primary hover:underline font-semibold"
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
                  class="text-primary hover:underline font-semibold"
                  href="https://blog.google/products/pixel/pixel-4/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Pixel Neural Core
                </a>
                , which contains a version of an
                <a
                  class="text-primary hover:underline font-semibold"
                  href="https://cloud.google.com/edge-tpu/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Edge TPU
                </a>
                .”
              </p>
              <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-surface-container-high">
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold font-mono text-[11px]"
                  >
                    TF
                  </div>
                  <div>
                    <div class="font-mono text-[12px] text-on-surface font-bold">
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
                  class="px-4 py-2 rounded bg-canvas-pure border border-border-grid text-primary font-mono text-[12px] uppercase tracking-wider shadow-sm hover:bg-surface-container-high transition-colors flex items-center gap-1.5 font-semibold"
                >
                  <span>Read Research Post</span>
                  <mat-icon class="text-[16px]">arrow_forward</mat-icon>
                </a>
              </div>
            </div>
          </div>

          <!-- Installation Highlights -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div class="bg-surface-container-low p-5 rounded-xl border border-border-grid/60 shadow-sm space-y-1.5">
              <div class="flex items-center gap-2 text-primary font-mono text-[10px] font-semibold">
                <mat-icon class="text-[18px]">traffic</mat-icon>
                <span>REAL-WORLD SIGNS</span>
              </div>
              <h3 class="font-display text-[19px] font-semibold text-on-surface">
                Traffic Light Perception
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Detects state changes on custom miniaturized multi-phase LEDs at test track
                intersections with sub-15ms recognition.
              </p>
            </div>
            <div class="bg-surface-container-low p-5 rounded-xl border border-border-grid/60 shadow-sm space-y-1.5">
              <div class="flex items-center gap-2 text-mode-drive font-mono text-[10px] font-semibold">
                <mat-icon class="text-[18px]">car_crash</mat-icon>
                <span>ACTIVE SAFETY</span>
              </div>
              <h3 class="font-display text-[19px] font-semibold text-on-surface">
                Dynamic Collision Guard
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Continuously computes time-to-impact (TTI) for lead cars, pedestrians, and sudden
                obstacles within the urban street grid.
              </p>
            </div>
            <div class="bg-surface-container-low p-5 rounded-xl border border-border-grid/60 shadow-sm space-y-1.5">
              <div class="flex items-center gap-2 text-mode-fly font-mono text-[10px] font-semibold">
                <mat-icon class="text-[18px]">memory</mat-icon>
                <span>EDGE TPU</span>
              </div>
              <h3 class="font-display text-[19px] font-semibold text-on-surface">
                Pixel Neural Core
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Leveraging hardware INT8 quantization to sustain high inferencing throughput without
                thermal throttling over hours of continuous driving.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Technical Deep-Dive: Specs & Matrix Comparison -->
      <section class="w-full px-6 md:px-12 py-12 bg-canvas-subtle border-t border-border-grid/60">
        <div class="max-w-5xl mx-auto space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span class="font-mono text-[11px] uppercase tracking-wider text-secondary font-bold">
                Benchmarking &amp; Architecture
              </span>
              <h2 class="font-display text-[32px] sm:text-[36px] leading-tight font-semibold text-on-surface mt-1">
                Autonomous Compute Matrix Comparison
              </h2>
            </div>
            <div class="font-mono text-[10px] text-outline">UPDATED LABS BENCHMARK // Q1 2025</div>
          </div>

          <div class="bg-canvas-pure border border-border-grid rounded-xl shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-[13px]">
                <thead class="bg-surface-container text-on-surface font-mono text-[10px] uppercase tracking-wider">
                  <tr>
                    <th class="p-4">Specification</th>
                    <th class="p-4 text-secondary font-bold">ZoeRobo Smartphone / TPU</th>
                    <th class="p-4">Conventional Workstation AV</th>
                    <th class="p-4">Standard Microcontroller</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-surface-container-low">
                  <tr class="hover:bg-canvas-subtle transition-colors">
                    <td class="p-4 font-semibold text-on-surface">Vision Inference Latency</td>
                    <td class="p-4 font-mono text-[12px] text-signal-success font-bold tabular-nums">8.3 ms (Edge TPU)</td>
                    <td class="p-4 font-mono text-[12px] text-on-surface-variant tabular-nums">14.2 ms (Desktop GPU)</td>
                    <td class="p-4 font-mono text-[12px] text-outline tabular-nums">180 ms (MCU Soft-Math)</td>
                  </tr>
                  <tr class="hover:bg-canvas-subtle transition-colors">
                    <td class="p-4 font-semibold text-on-surface">Total Hardware BOM</td>
                    <td class="p-4 font-mono text-[12px] text-secondary font-bold tabular-nums">&lt; $400 USD (All inclusive)</td>
                    <td class="p-4 font-mono text-[12px] text-on-surface-variant tabular-nums">$8,000 - $25,000 USD</td>
                    <td class="p-4 font-mono text-[12px] text-outline tabular-nums">&lt; $50 USD (Zero ML capacity)</td>
                  </tr>
                  <tr class="hover:bg-canvas-subtle transition-colors">
                    <td class="p-4 font-semibold text-on-surface">Power Consumption</td>
                    <td class="p-4 font-mono text-[12px] text-signal-success font-bold tabular-nums">1.4 W avg.</td>
                    <td class="p-4 font-mono text-[12px] text-on-surface-variant tabular-nums">350 W - 800 W (Thermal drain)</td>
                    <td class="p-4 font-mono text-[12px] text-outline tabular-nums">0.4 W</td>
                  </tr>
                  <tr class="hover:bg-canvas-subtle transition-colors">
                    <td class="p-4 font-semibold text-on-surface">Built-in Sensor Cluster</td>
                    <td class="p-4 font-mono text-[12px] text-on-surface">Camera + IMU + GPS + 5G Telematics</td>
                    <td class="p-4 font-mono text-[12px] text-on-surface-variant">External discrete USB/CAN rigs</td>
                    <td class="p-4 font-mono text-[12px] text-outline">None / External sensors only</td>
                  </tr>
                  <tr class="hover:bg-canvas-subtle transition-colors">
                    <td class="p-4 font-semibold text-on-surface">Software Framework</td>
                    <td class="p-4 font-mono text-[12px] text-primary font-bold">TensorFlow Lite + ROS2 Android</td>
                    <td class="p-4 font-mono text-[12px] text-on-surface-variant">Autoware / Apollo / CUDA</td>
                    <td class="p-4 font-mono text-[12px] text-outline">FreeRTOS / Bare Metal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- Next Steps Action Banner -->
      <section class="w-full px-6 md:px-12 py-12">
        <div
          class="bg-gradient-to-r from-mode-drive/10 via-mode-run/10 to-mode-fly/10 border border-border-grid/80 p-6 md:p-10 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div class="space-y-1.5 max-w-2xl">
            <span class="font-mono text-[10px] text-secondary font-bold uppercase tracking-wider">
              DEPLOYMENT READY
            </span>
            <h2 class="font-display text-[30px] sm:text-[34px] leading-tight font-semibold text-on-surface">
              Ready to Build Your Autonomous Edge Driver?
            </h2>
            <p class="text-[15px] leading-6 text-on-surface-variant">
              Access the full open-source TensorFlow Lite model weights, Android camera harness, and
              UART motor driver bridges developed for ZoeRobo platforms.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="https://blog.tensorflow.org/2020/07/pixelopolis-self-driving-car-demo-tensorflow-lite.html"
              rel="noopener noreferrer"
              target="_blank"
              class="w-full sm:w-auto px-6 py-3 rounded bg-secondary text-on-secondary font-mono text-[12px] font-semibold uppercase tracking-wider text-center shadow-sm hover:bg-secondary-container transition-all"
            >
              TensorFlow Blog
            </a>
            <a
              href="https://zoewave.medium.com/self-driving-lego-car-concept-c3a50e72cccc"
              rel="noopener noreferrer"
              target="_blank"
              class="w-full sm:w-auto px-6 py-3 rounded bg-canvas-pure border border-border-grid text-on-surface font-mono text-[12px] font-semibold uppercase tracking-wider text-center shadow-sm hover:bg-surface-container transition-all"
            >
              ZoeWave Article
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
