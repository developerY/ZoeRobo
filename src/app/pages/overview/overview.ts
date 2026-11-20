import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {
  RESEARCH_RECORDS,
  ResearchRecord,
  ZOEROBO_IMAGES,
} from '../../data/zoerobo.data';
import { PaperModal } from '../../components/paper-modal/paper-modal';

type TelemetryPlatform = 'jagur' | 'firefly' | 'drive';

interface TelemetryProfile {
  unitId: string;
  streamId: string;
  controlLoop: string;
  actuatorBus: string;
  neuralPipeline: string;
  failsafeState: string;
  nodeTitle: string;
  accentClass: string;
  logs: string[];
}

const TELEMETRY_PROFILES: Record<TelemetryPlatform, TelemetryProfile> = {
  jagur: {
    unitId: 'ZR-RUN-001',
    streamId: 'PAYLOAD_STREAM :: JAGUR_UNIT_01',
    controlLoop: '1000 Hz',
    actuatorBus: 'CAN 2.0B',
    neuralPipeline: 'TF-Lite INT8',
    failsafeState: 'PASSIVE OK',
    nodeTitle: '[ROS2 Node Status]: /quadruped/locomotion_controller',
    accentClass: 'text-mode-run',
    logs: [
      '> LiDAR Odometry: Converged [covariance < 0.003]',
      '> Joint Torque Estimation: Within nominal safety margins (< 28.5 Nm)',
      '> Dynamic Foot Traction: 99.4% ground adherence',
    ],
  },
  firefly: {
    unitId: 'ZR-FLY-004',
    streamId: 'PAYLOAD_STREAM :: FIREFLY_UAS_04',
    controlLoop: '400 Hz',
    actuatorBus: 'UART / I2C',
    neuralPipeline: 'DeepSeek-1.5B',
    failsafeState: 'AIRBORNE HOVER',
    nodeTitle: '[ROS2 Node Status]: /uas/semantic_flight_pilot',
    accentClass: 'text-mode-fly',
    logs: [
      '> Voice Command Parsed: "Check Living Room South Corner"',
      '> Optical Flow Divergence: 0.01 rad/s [Drift Nominal]',
      '> Edge Battery Level: 84.2% [14m 20s remaining]',
    ],
  },
  drive: {
    unitId: 'ZR-DRV-009',
    streamId: 'PAYLOAD_STREAM :: PIXELOPOLIS_CAR_09',
    controlLoop: '120 Hz',
    actuatorBus: 'USB-C Coral',
    neuralPipeline: 'MobileNet-V3',
    failsafeState: 'CRUISING 1.8m/s',
    nodeTitle: '[ROS2 Node Status]: /car/steering_actuator_node',
    accentClass: 'text-mode-drive',
    logs: [
      '> Stop Line Distance: 1.4 meters [Detection Confidence 98.7%]',
      '> Pure Pursuit Steering Angle: -4.2 degrees',
      '> Throttle Duty Cycle: 34.8% on dual rear geared hub',
    ],
  },
};

@Component({
  selector: 'app-overview',
  imports: [RouterLink, MatIconModule, PaperModal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col w-full bg-surface text-on-surface">
      <!-- Top Engineering Status & Instrumentation Rail -->
      <div class="w-full bg-canvas-pure px-6 md:px-10 py-2.5 border-b border-border-grid">
        <div
          class="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] tracking-[0.06em] text-on-surface-variant"
        >
          <div class="flex flex-wrap items-center gap-3">
            <span class="inline-flex items-center gap-1.5 text-signal-success font-semibold uppercase">
              <span class="w-2 h-2 rounded-full bg-signal-success"></span>
              KINETIC SYS ONLINE
            </span>
            <span class="text-border-active">|</span>
            <span class="text-on-surface font-medium">LOC: YLabZ ROBOTICS CORE</span>
            <span class="text-border-active hidden sm:inline">|</span>
            <span class="hidden sm:inline tabular-nums">LATENCY: 0.12ms ON-DEVICE</span>
          </div>
          <div class="flex items-center gap-3">
            <span
              class="bg-surface-container-high border border-border-grid px-2 py-0.5 rounded-[2px] text-on-surface font-semibold uppercase"
            >
              TENSORFLOW LITE + DEEPSEEK INT8
            </span>
            <span class="hidden md:inline text-outline uppercase">
              REV 4.2 · ZERO-CLOUD VERIFIED
            </span>
          </div>
        </div>
      </div>

      <!-- 01 / Hero Section (Strict Light Industrial Precision) -->
      <section class="w-full px-6 md:px-10 pt-10 pb-12 bg-surface industrial-grid border-b border-border-grid">
        <div class="max-w-[1360px] mx-auto">
          <!-- Equipment Classification Rail -->
          <div class="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-border-grid">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-primary">
                01 / PLATFORM OVERVIEW
              </span>
              <span class="text-border-active">·</span>
              <span
                class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-primary-container border border-mode-run/40 text-on-primary-container font-mono text-[10px] font-semibold uppercase tracking-wider"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-mode-run"></span>
                ZR-RUN · QUADRUPED
              </span>
              <span
                class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-secondary-fixed border border-mode-drive/40 text-on-secondary-fixed font-mono text-[10px] font-semibold uppercase tracking-wider"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-mode-drive"></span>
                ZR-DRV · AUTONOMOUS AGV
              </span>
              <span
                class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-tertiary-fixed border border-mode-fly/40 text-on-tertiary-fixed font-mono text-[10px] font-semibold uppercase tracking-wider"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-mode-fly"></span>
                ZR-FLY · MICRO UAS
              </span>
            </div>
            <span
              class="px-2.5 py-0.5 rounded-[2px] bg-canvas-pure border border-border-grid text-on-surface-variant font-mono text-[10px] font-semibold uppercase tracking-wider"
            >
              PROTOCOL // RUN-DRIVE-FLY
            </span>
          </div>

          <!-- Core Display Headline + Action Stack -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
            <div class="lg:col-span-8 space-y-3">
              <p class="font-mono text-[12px] text-outline uppercase tracking-[0.08em] font-semibold">
                AUTONOMOUS CYBERNETIC SYNTHESIS · EDGE ROBOTICS LABORATORY
              </p>
              <h1
                class="font-display text-[46px] sm:text-[58px] lg:text-[66px] font-bold uppercase text-on-surface tracking-[-0.02em] leading-[1.02]"
              >
                We make robots that <br class="hidden sm:inline" />
                <span class="text-mode-run">RUN</span>,
                <span class="text-mode-drive">DRIVE</span> &amp;
                <span class="text-mode-fly">FLY</span>.
              </h1>
              <p class="text-[16px] leading-7 text-on-surface-variant max-w-2xl">
                Next-generation autonomous robotics engineered for deterministic edge execution.
                ZoeRobo deploys sub-millisecond INT8 machine learning, onboard DeepSeek local
                reasoning models, and precision kinematics across legged, wheeled, and micro-aerial
                platforms without cloud dependency.
              </p>
            </div>
            <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <a
                href="#fleet"
                class="px-6 py-3.5 rounded-[2px] bg-primary hover:bg-primary-hover text-on-primary font-mono text-[12px] font-semibold uppercase tracking-[0.06em] text-center transition-colors flex items-center justify-center gap-2"
              >
                <mat-icon class="text-[18px]">precision_manufacturing</mat-icon>
                <span>Explore Robotics Fleet</span>
              </a>
              <a
                href="#research"
                class="px-6 py-3.5 rounded-[2px] bg-canvas-pure border border-border-active hover:bg-surface-container-high text-on-surface font-mono text-[12px] font-semibold uppercase tracking-[0.06em] text-center transition-colors flex items-center justify-center gap-2"
              >
                <mat-icon class="text-[18px] text-primary">article</mat-icon>
                <span>Inspect Architecture &amp; Papers</span>
              </a>
            </div>
          </div>

          <!-- Lab Visual Frame & Structured Telemetry Readout Column -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <!-- Main Hero R&D Cleanroom Plate (Bright, Unobstructed Photo + Mechanical Bars) -->
            <div
              class="lg:col-span-8 rounded-[4px] overflow-hidden bg-canvas-pure border border-border-active flex flex-col justify-between"
            >
              <!-- Top Instrument Header Bar -->
              <div
                class="px-4 py-2.5 bg-canvas-pure border-b border-border-grid flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]"
              >
                <span class="flex items-center gap-2 text-on-surface font-semibold uppercase tracking-wider">
                  <span class="w-2 h-2 rounded-full bg-signal-success"></span>
                  YLabZ PHYSICAL LAB 04 · BAY AREA
                </span>
                <div class="flex items-center gap-3 text-outline">
                  <span>ISO-6 CLEANROOM</span>
                  <span class="px-2 py-0.5 rounded-[2px] bg-surface-container-high border border-border-grid text-on-surface font-bold">
                    SYS::ARMED
                  </span>
                </div>
              </div>

              <!-- Unobstructed Cleanroom Photography -->
              <div class="relative flex-1 min-h-[280px] sm:min-h-[340px] bg-canvas-muted overflow-hidden">
                <img
                  [src]="images.cleanroomLab"
                  alt="ZoeRobo High-Tech Autonomous R&D Cleanroom Lab featuring robotic quadrupeds, aerial drones, and robotics engineers analyzing telemetry"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Bottom Solid Caption & Instrumentation Strip -->
              <div class="p-5 bg-canvas-pure border-t border-border-active flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div class="space-y-1 max-w-xl">
                  <span class="font-mono text-[10px] uppercase tracking-[0.08em] text-primary font-bold">
                    EMPIRICAL PROTOTYPING · HARDWARE VALIDATION BAY
                  </span>
                  <h2 class="font-display text-[26px] leading-7 font-bold uppercase text-on-surface">
                    Silicon-to-Strut Hardware Validation
                  </h2>
                  <p class="text-[13px] leading-5 text-on-surface-variant">
                    Every chassis is calibrated for deterministic edge resilience: quadruped balance
                    actuators, micro-propulsion aerodynamics, and Ackermann vehicle dynamics tested
                    on-site.
                  </p>
                </div>
                <div class="grid grid-cols-2 gap-3 shrink-0 font-mono text-[11px] bg-surface-container border border-border-grid p-3 rounded-[2px]">
                  <div>
                    <span class="block text-[9px] text-outline uppercase">RIG CYCLE</span>
                    <span class="font-bold text-on-surface tabular-nums">1000 Hz</span>
                  </div>
                  <div>
                    <span class="block text-[9px] text-outline uppercase">CLOUD LINK</span>
                    <span class="font-bold text-signal-success tabular-nums">0.00 ms</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Telemetry & Live Engineering Metrics Stack -->
            <div class="lg:col-span-4 flex flex-col gap-4">
              <!-- Metric 1 -->
              <div
                class="p-5 rounded-[4px] bg-canvas-pure border border-border-grid flex-1 flex flex-col justify-between gap-3"
              >
                <div class="flex items-center justify-between pb-2 border-b border-border-grid">
                  <span class="font-mono text-[10px] text-outline uppercase font-semibold tracking-wider">
                    01 · ACTIVE KINEMATIC PLATFORMS
                  </span>
                  <mat-icon class="text-mode-run text-[20px]">precision_manufacturing</mat-icon>
                </div>
                <div>
                  <div class="flex items-baseline gap-3">
                    <span class="font-display text-[48px] leading-none text-on-surface font-bold tabular-nums">
                      03
                    </span>
                    <span class="font-mono text-[11px] text-mode-run font-bold uppercase tracking-wider">
                      RUN · DRIVE · FLY
                    </span>
                  </div>
                  <p class="text-[13px] leading-5 text-on-surface-variant mt-2">
                    Synchronized autonomous platforms spanning quadruped locomotion, wheeled AGV
                    perception, and indoor micro-UAS flight.
                  </p>
                </div>
                <div class="grid grid-cols-3 gap-1 pt-1">
                  <div class="h-1.5 bg-mode-run"></div>
                  <div class="h-1.5 bg-mode-drive"></div>
                  <div class="h-1.5 bg-mode-fly"></div>
                </div>
              </div>

              <!-- Metric 2 -->
              <div
                class="p-5 rounded-[4px] bg-canvas-pure border border-border-grid flex-1 flex flex-col justify-between gap-3"
              >
                <div class="flex items-center justify-between pb-2 border-b border-border-grid">
                  <span class="font-mono text-[10px] text-outline uppercase font-semibold tracking-wider">
                    02 · NEURAL ARCHITECTURE
                  </span>
                  <mat-icon class="text-mode-fly text-[20px]">memory</mat-icon>
                </div>
                <div>
                  <div class="flex items-baseline gap-2.5">
                    <span class="font-display text-[48px] leading-none text-on-surface font-bold tabular-nums">
                      100%
                    </span>
                    <span class="font-mono text-[11px] text-mode-fly font-bold uppercase tracking-wider">
                      ON-DEVICE EDGE
                    </span>
                  </div>
                  <p class="text-[13px] leading-5 text-on-surface-variant mt-2">
                    Zero tethered cloud dependency. Quantized DeepSeek-R1 distillates and TF Lite
                    INT8 models execute directly on chassis silicon.
                  </p>
                </div>
                <div class="flex items-center justify-between text-[11px] font-mono text-on-surface-variant pt-2 border-t border-border-grid">
                  <span class="tabular-nums">CLOUD LATENCY: 0.00ms</span>
                  <span class="text-signal-success font-bold">TPU ACCEL</span>
                </div>
              </div>

              <!-- Metric 3 -->
              <div
                class="p-4 rounded-[4px] bg-surface-container-high border border-border-active flex items-center justify-between gap-3"
              >
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-[2px] bg-canvas-pure border border-border-grid flex items-center justify-center shrink-0">
                    <mat-icon class="text-mode-drive text-[20px]">hub</mat-icon>
                  </div>
                  <div>
                    <div class="font-mono text-[11px] text-on-surface font-bold uppercase">
                      ROS2 Foxy / Humble Hybrid
                    </div>
                    <div class="text-[12px] text-on-surface-variant">
                      Realtime micro-DDS deterministic bus
                    </div>
                  </div>
                </div>
                <span
                  class="font-mono text-signal-success font-bold text-[10px] bg-canvas-pure border border-signal-success/40 px-2.5 py-1 rounded-[2px] uppercase"
                >
                  STABLE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 02 / Autonomous Fleet Showcase -->
      <section class="w-full px-6 md:px-10 py-14 bg-canvas-subtle border-b border-border-grid" id="fleet">
        <div class="max-w-[1360px] mx-auto space-y-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-border-grid">
            <div>
              <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-primary font-bold">
                02 / AUTONOMOUS FLEET · HARDWARE MATRIX
              </span>
              <h2 class="font-display text-[36px] sm:text-[42px] leading-none font-bold uppercase text-on-surface mt-1.5">
                The ZoeRobo Autonomous Fleet
              </h2>
              <p class="text-[15px] leading-6 text-on-surface-variant max-w-xl mt-2">
                Three engineered form-factors unified by local machine perception and deterministic
                control loops with zero network round-trips.
              </p>
            </div>
            <div
              class="inline-flex items-center gap-2 font-mono text-[11px] text-on-surface-variant bg-canvas-pure border border-border-active px-3.5 py-2 rounded-[2px] self-start md:self-auto"
            >
              <span class="w-2 h-2 rounded-full bg-signal-success"></span>
              <span>FLEET STATE:</span>
              <span class="text-signal-success font-bold">ALL UNITS DEPLOYABLE</span>
            </div>
          </div>

          <!-- 3-Column Platform Equipment Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Platform 1: Jag.U.R™ (RUN) -->
            <div
              class="rounded-[4px] bg-canvas-pure border border-border-grid hover:border-mode-run transition-colors overflow-hidden flex flex-col"
            >
              <div class="px-4 py-2 bg-surface-container border-b border-border-grid flex items-center justify-between font-mono text-[10px]">
                <span class="px-2 py-0.5 rounded-[2px] bg-mode-run text-on-primary font-bold uppercase tracking-wider">
                  RUN // QUADRUPED
                </span>
                <span class="text-on-surface-variant font-semibold">ID: ZR-RUN-001</span>
              </div>
              <div class="relative h-56 overflow-hidden bg-canvas-muted border-b border-border-grid">
                <img
                  [src]="images.jagurCard"
                  alt="Agile quadruped utility robot dog Jag.U.R with precision mechanical limbs and LiDAR dome"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div class="space-y-2">
                  <div class="flex items-center justify-between font-mono text-[11px]">
                    <span class="text-mode-run font-bold uppercase tracking-wide">TERRAIN NAVIGATION</span>
                    <span class="text-outline">12-DOF LEGS</span>
                  </div>
                  <h3 class="font-display text-[28px] leading-8 font-bold uppercase text-on-surface">
                    Jag.U.R™ Utility Robot
                  </h3>
                  <p class="font-mono text-[11px] text-on-surface-variant font-semibold uppercase">
                    Journey Agile Guiding Utility Robot
                  </p>
                  <p class="text-[14px] leading-6 text-on-surface-variant">
                    Bio-inspired quadruped architecture engineered for unstructured surface
                    traversal. Integrates solid-state LiDAR, high-torque brushless actuators, and
                    reinforcement learning gait stability.
                  </p>
                </div>
                <div class="space-y-3">
                  <div class="grid grid-cols-2 divide-x divide-border-grid font-mono text-[12px] bg-surface-container border border-border-grid rounded-[2px]">
                    <div class="p-3">
                      <span class="text-outline block text-[10px] uppercase">PAYLOAD</span>
                      <span class="font-bold text-on-surface tabular-nums">4.8 kg Active</span>
                    </div>
                    <div class="p-3">
                      <span class="text-outline block text-[10px] uppercase">GAIT VELOCITY</span>
                      <span class="font-bold text-on-surface tabular-nums">3.2 m/s Sprint</span>
                    </div>
                  </div>
                  <a
                    routerLink="/jag-u-r-robot"
                    class="w-full py-2.5 px-4 rounded-[2px] bg-primary-container/50 hover:bg-mode-run text-on-primary-container hover:text-on-primary border border-mode-run/40 font-mono text-[12px] font-semibold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Jag.U.R Specifications</span>
                    <mat-icon class="text-[16px]">arrow_forward</mat-icon>
                  </a>
                </div>
              </div>
            </div>

            <!-- Platform 2: FireFly™ (FLY) -->
            <div
              class="rounded-[4px] bg-canvas-pure border border-border-grid hover:border-mode-fly transition-colors overflow-hidden flex flex-col"
            >
              <div class="px-4 py-2 bg-surface-container border-b border-border-grid flex items-center justify-between font-mono text-[10px]">
                <span class="px-2 py-0.5 rounded-[2px] bg-mode-fly text-on-tertiary font-bold uppercase tracking-wider">
                  FLY // MICRO UAS
                </span>
                <span class="text-on-surface-variant font-semibold">ID: ZR-FLY-004</span>
              </div>
              <div class="relative h-56 overflow-hidden bg-canvas-muted border-b border-border-grid">
                <img
                  [src]="images.fireflyDrone"
                  alt="Autonomous home security micro drone FireFly flying inside a sunlit modern interior"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div class="space-y-2">
                  <div class="flex items-center justify-between font-mono text-[11px]">
                    <span class="text-mode-fly font-bold uppercase tracking-wide">LOCAL LLM GUIDANCE</span>
                    <span class="text-outline">210g ENCLOSED</span>
                  </div>
                  <h3 class="font-display text-[28px] leading-8 font-bold uppercase text-on-surface">
                    FireFly™ Micro Drone
                  </h3>
                  <p class="font-mono text-[11px] text-on-surface-variant font-semibold uppercase">
                    Indoor Autonomous Semantic UAV
                  </p>
                  <p class="text-[14px] leading-6 text-on-surface-variant">
                    Micro-drone commanded by local natural language prompts. Issue instructions like
                    <span class="italic font-medium text-on-surface">“Go check the kitchen”</span>
                    and the onboard vision-language stack routes and verifies in real time.
                  </p>
                </div>
                <div class="space-y-3">
                  <div class="grid grid-cols-2 divide-x divide-border-grid font-mono text-[12px] bg-surface-container border border-border-grid rounded-[2px]">
                    <div class="p-3">
                      <span class="text-outline block text-[10px] uppercase">INTELLIGENCE</span>
                      <span class="font-bold text-on-surface">DeepSeek Local</span>
                    </div>
                    <div class="p-3">
                      <span class="text-outline block text-[10px] uppercase">FLIGHT TIME</span>
                      <span class="font-bold text-on-surface tabular-nums">18 min Indoor</span>
                    </div>
                  </div>
                  <a
                    routerLink="/firefly-drone"
                    class="w-full py-2.5 px-4 rounded-[2px] bg-tertiary-fixed/60 hover:bg-mode-fly text-on-tertiary-fixed hover:text-on-tertiary border border-mode-fly/40 font-mono text-[12px] font-semibold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View FireFly Specifications</span>
                    <mat-icon class="text-[16px]">arrow_forward</mat-icon>
                  </a>
                </div>
              </div>
            </div>

            <!-- Platform 3: AI/ML Mini-Car (DRIVE) -->
            <div
              class="rounded-[4px] bg-canvas-pure border border-border-grid hover:border-mode-drive transition-colors overflow-hidden flex flex-col"
            >
              <div class="px-4 py-2 bg-surface-container border-b border-border-grid flex items-center justify-between font-mono text-[10px]">
                <span class="px-2 py-0.5 rounded-[2px] bg-mode-drive text-on-secondary font-bold uppercase tracking-wider">
                  DRIVE // WHEELED AGV
                </span>
                <span class="text-on-surface-variant font-semibold">ID: ZR-DRV-009</span>
              </div>
              <div class="relative h-56 overflow-hidden bg-canvas-muted border-b border-border-grid">
                <img
                  [src]="images.aimlDriveHero"
                  alt="Miniature smart autonomous self-driving car with smartphone neural compute rig on urban test track"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div class="space-y-2">
                  <div class="flex items-center justify-between font-mono text-[11px]">
                    <span class="text-mode-drive font-bold uppercase tracking-wide">EDGE TPU &amp; TF LITE</span>
                    <span class="text-outline">NEURAL SLAM</span>
                  </div>
                  <h3 class="font-display text-[28px] leading-8 font-bold uppercase text-on-surface">
                    AI/ML Mini-Car
                  </h3>
                  <p class="font-mono text-[11px] text-on-surface-variant font-semibold uppercase">
                    Smartphone &amp; TPU Autonomous Rover
                  </p>
                  <p class="text-[14px] leading-6 text-on-surface-variant">
                    Inspired by Google’s Pixelopolis research initiative. Pairs commercial mobile
                    silicon and Edge TPU vision accelerators for lane indexing, traffic negotiation,
                    and sign inference.
                  </p>
                </div>
                <div class="space-y-3">
                  <div class="grid grid-cols-2 divide-x divide-border-grid font-mono text-[12px] bg-surface-container border border-border-grid rounded-[2px]">
                    <div class="p-3">
                      <span class="text-outline block text-[10px] uppercase">FPS INFERENCE</span>
                      <span class="font-bold text-on-surface tabular-nums">60 FPS Realtime</span>
                    </div>
                    <div class="p-3">
                      <span class="text-outline block text-[10px] uppercase">STEERING LOGIC</span>
                      <span class="font-bold text-on-surface">Pure Pursuit CNN</span>
                    </div>
                  </div>
                  <a
                    routerLink="/ai-ml-drive"
                    class="w-full py-2.5 px-4 rounded-[2px] bg-secondary-fixed/60 hover:bg-mode-drive text-on-secondary-fixed hover:text-on-secondary border border-mode-drive/40 font-mono text-[12px] font-semibold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Drive Platform Specs</span>
                    <mat-icon class="text-[16px]">arrow_forward</mat-icon>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 03 / Zero-Cloud Edge Architecture -->
      <section class="w-full px-6 md:px-10 py-14 bg-surface border-b border-border-grid" id="research">
        <div class="max-w-[1360px] mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10 pb-6 border-b border-border-grid">
            <div class="lg:col-span-7 space-y-2">
              <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-primary font-bold">
                03 / ZERO-CLOUD ARCHITECTURE · NEURAL EDGE COMPUTATION
              </span>
              <h2 class="font-display text-[36px] sm:text-[42px] leading-none font-bold uppercase text-on-surface">
                Architected for Zero Cloud Dependency.
              </h2>
              <p class="text-[15px] leading-6 text-on-surface-variant max-w-2xl">
                Robotics operating in dynamic physical environments cannot tolerate the 150ms
                round-trip latency of remote cloud APIs. ZoeRobo compiles quantized reasoning
                checkpoints directly onto chassis silicon for deterministic execution.
              </p>
            </div>
            <div class="lg:col-span-5 grid grid-cols-3 gap-3">
              <div class="p-4 bg-canvas-pure border border-border-active rounded-[4px] text-center">
                <span class="block font-mono text-[24px] font-bold text-primary tabular-nums">0 ms</span>
                <span class="font-mono text-[10px] text-outline uppercase">Cloud Transit</span>
              </div>
              <div class="p-4 bg-canvas-pure border border-border-active rounded-[4px] text-center">
                <span class="block font-mono text-[24px] font-bold text-mode-drive tabular-nums">4.2 TOPS</span>
                <span class="font-mono text-[10px] text-outline uppercase">Edge TPU</span>
              </div>
              <div class="p-4 bg-canvas-pure border border-border-active rounded-[4px] text-center">
                <span class="block font-mono text-[24px] font-bold text-mode-fly">INT8</span>
                <span class="font-mono text-[10px] text-outline uppercase">Quantized</span>
              </div>
            </div>
          </div>

          <!-- 4-Module Architecture Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div class="p-6 rounded-[4px] bg-canvas-pure border border-border-grid flex flex-col justify-between gap-4">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div class="w-10 h-10 rounded-[2px] bg-primary-container border border-mode-run/30 text-mode-run flex items-center justify-center">
                    <mat-icon class="text-[22px]">cognition</mat-icon>
                  </div>
                  <span class="font-mono text-[10px] text-outline">MOD-01</span>
                </div>
                <h3 class="font-display text-[22px] font-bold uppercase text-on-surface">
                  DeepSeek Local SLM
                </h3>
                <p class="text-[13px] leading-5 text-on-surface-variant">
                  Micro-quantized 1.5B/7B language reasoning engines interpreting spatial natural
                  language instructions directly on the vehicle motherboard.
                </p>
              </div>
              <div class="pt-3 border-t border-border-grid font-mono text-[11px] text-mode-run font-semibold tabular-nums">
                REASONING LATENCY: 22ms
              </div>
            </div>

            <div class="p-6 rounded-[4px] bg-canvas-pure border border-border-grid flex flex-col justify-between gap-4">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div class="w-10 h-10 rounded-[2px] bg-secondary-fixed border border-mode-drive/30 text-mode-drive flex items-center justify-center">
                    <mat-icon class="text-[22px]">developer_board</mat-icon>
                  </div>
                  <span class="font-mono text-[10px] text-outline">MOD-02</span>
                </div>
                <h3 class="font-display text-[22px] font-bold uppercase text-on-surface">
                  TensorFlow Lite Edge
                </h3>
                <p class="text-[13px] leading-5 text-on-surface-variant">
                  High-efficiency object recognition and pixel segmentation pipelines optimized for
                  Edge TPU acceleration with minimal thermal dissipation.
                </p>
              </div>
              <div class="pt-3 border-t border-border-grid font-mono text-[11px] text-mode-drive font-semibold tabular-nums">
                POWER DRAW: 2.1W AVG
              </div>
            </div>

            <div class="p-6 rounded-[4px] bg-canvas-pure border border-border-grid flex flex-col justify-between gap-4">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div class="w-10 h-10 rounded-[2px] bg-tertiary-fixed border border-mode-fly/30 text-mode-fly flex items-center justify-center">
                    <mat-icon class="text-[22px]">view_in_ar</mat-icon>
                  </div>
                  <span class="font-mono text-[10px] text-outline">MOD-03</span>
                </div>
                <h3 class="font-display text-[22px] font-bold uppercase text-on-surface">
                  Real-Time Spatial SLAM
                </h3>
                <p class="text-[13px] leading-5 text-on-surface-variant">
                  Simultaneous Localization and Mapping combining optical stereo flow,
                  ultra-wideband anchors, and high-frequency 6-axis IMU fusion.
                </p>
              </div>
              <div class="pt-3 border-t border-border-grid font-mono text-[11px] text-mode-fly font-semibold tabular-nums">
                DRIFT RATIO: &lt; 0.02%
              </div>
            </div>

            <div class="p-6 rounded-[4px] bg-canvas-pure border border-border-grid flex flex-col justify-between gap-4">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div class="w-10 h-10 rounded-[2px] bg-surface-container-high border border-border-active text-on-surface flex items-center justify-center">
                    <mat-icon class="text-[22px]">shield</mat-icon>
                  </div>
                  <span class="font-mono text-[10px] text-outline">MOD-04</span>
                </div>
                <h3 class="font-display text-[22px] font-bold uppercase text-on-surface">
                  Hardware Determinism
                </h3>
                <p class="text-[13px] leading-5 text-on-surface-variant">
                  Direct real-time hardware interrupt loops guaranteeing kinematic recovery within
                  5 microseconds when dynamic balance loss is detected.
                </p>
              </div>
              <div class="pt-3 border-t border-border-grid font-mono text-[11px] text-on-surface font-semibold tabular-nums">
                RECOVERY: 5 MICROSECONDS
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 04 / Research Logs & Dispatches -->
      <section class="w-full px-6 md:px-10 py-14 bg-canvas-subtle border-b border-border-grid">
        <div class="max-w-[1360px] mx-auto space-y-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-border-grid">
            <div>
              <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-primary font-bold">
                04 / RESEARCH DISPATCHES · YLabZ PUBLICATIONS
              </span>
              <h2 class="font-display text-[36px] sm:text-[42px] leading-none font-bold uppercase text-on-surface mt-1.5">
                From Whiteboard Concept to Reality
              </h2>
              <p class="text-[15px] leading-6 text-on-surface-variant max-w-xl mt-2">
                Engineering monographs, hardware schematics, and empirical field test logs
                documenting each iteration of the ZoeRobo stack.
              </p>
            </div>
            <a
              routerLink="/info-and-research"
              fragment="research-repository"
              class="px-4 py-2 rounded-[2px] bg-canvas-pure border border-border-active hover:border-primary font-mono text-[11px] uppercase tracking-wider text-on-surface hover:text-primary font-semibold inline-flex items-center gap-1.5 transition-colors self-start md:self-auto"
            >
              <span>All Publications</span>
              <mat-icon class="text-[16px]">arrow_forward</mat-icon>
            </a>
          </div>

          <!-- Dispatches Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @for (record of featuredDispatches; track record.id) {
              <article
                class="p-6 rounded-[4px] bg-canvas-pure border border-border-grid hover:border-border-active transition-colors flex flex-col justify-between"
              >
                <div class="space-y-3">
                  <div class="flex items-center justify-between font-mono text-[10px] pb-2.5 border-b border-border-grid">
                    <span
                      class="font-bold uppercase tracking-wider"
                      [class.text-mode-fly]="record.mode === 'fly'"
                      [class.text-mode-run]="record.mode === 'run'"
                      [class.text-mode-drive]="record.mode === 'drive'"
                    >
                      {{ record.domainLabel }}
                    </span>
                    <span class="text-outline">{{ record.refCode }} · {{ record.readTime }}</span>
                  </div>
                  <h3 class="font-display text-[24px] leading-7 font-bold uppercase text-on-surface">
                    <button
                      type="button"
                      (click)="openRecord(record)"
                      class="text-left hover:text-primary transition-colors cursor-pointer"
                    >
                      {{ record.title }}
                    </button>
                  </h3>
                  <p class="text-[14px] leading-6 text-on-surface-variant">
                    {{ record.summary }}
                  </p>
                </div>
                <div class="pt-4 mt-4 border-t border-border-grid flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                  <span class="uppercase">{{ record.author }}</span>
                  <button
                    type="button"
                    (click)="openRecord(record)"
                    class="font-semibold text-primary hover:text-primary-hover uppercase cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>Read Dispatch</span>
                    <mat-icon class="text-[14px]">arrow_forward</mat-icon>
                  </button>
                </div>
              </article>
            }
          </div>
        </div>
      </section>

      <!-- 05 / Interactive Telemetry Query Console -->
      <section class="w-full px-6 md:px-10 py-14 bg-surface border-b border-border-grid">
        <div
          class="max-w-[1360px] mx-auto rounded-[4px] bg-canvas-pure border border-border-active p-6 md:p-8"
        >
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div class="lg:col-span-5 space-y-4">
              <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] bg-surface-container-high border border-border-grid text-on-surface font-mono text-[10px] font-bold uppercase tracking-wider">
                <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                05 / TELEMETRY QUERY · SYS CONSOLE
              </div>
              <h2 class="font-display text-[34px] sm:text-[38px] leading-none font-bold uppercase text-on-surface">
                Robotics Laboratory Telemetry Query
              </h2>
              <p class="text-[14px] leading-6 text-on-surface-variant">
                Select an active hardware platform to inspect onboard sensor payloads, real-time
                motor control frequencies, and local model checkpoint states.
              </p>

              <!-- Platform Selector Buttons -->
              <div class="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  (click)="selectPlatform('jagur')"
                  class="px-4 py-2.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer border"
                  [class.bg-mode-run]="activePlatform() === 'jagur'"
                  [class.text-on-primary]="activePlatform() === 'jagur'"
                  [class.border-mode-run]="activePlatform() === 'jagur'"
                  [class.font-bold]="activePlatform() === 'jagur'"
                  [class.bg-surface-container]="activePlatform() !== 'jagur'"
                  [class.text-on-surface]="activePlatform() !== 'jagur'"
                  [class.border-border-grid]="activePlatform() !== 'jagur'"
                >
                  Jag.U.R™ (RUN)
                </button>
                <button
                  type="button"
                  (click)="selectPlatform('firefly')"
                  class="px-4 py-2.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer border"
                  [class.bg-mode-fly]="activePlatform() === 'firefly'"
                  [class.text-on-tertiary]="activePlatform() === 'firefly'"
                  [class.border-mode-fly]="activePlatform() === 'firefly'"
                  [class.font-bold]="activePlatform() === 'firefly'"
                  [class.bg-surface-container]="activePlatform() !== 'firefly'"
                  [class.text-on-surface]="activePlatform() !== 'firefly'"
                  [class.border-border-grid]="activePlatform() !== 'firefly'"
                >
                  FireFly™ (FLY)
                </button>
                <button
                  type="button"
                  (click)="selectPlatform('drive')"
                  class="px-4 py-2.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer border"
                  [class.bg-mode-drive]="activePlatform() === 'drive'"
                  [class.text-on-secondary]="activePlatform() === 'drive'"
                  [class.border-mode-drive]="activePlatform() === 'drive'"
                  [class.font-bold]="activePlatform() === 'drive'"
                  [class.bg-surface-container]="activePlatform() !== 'drive'"
                  [class.text-on-surface]="activePlatform() !== 'drive'"
                  [class.border-border-grid]="activePlatform() !== 'drive'"
                >
                  AI/ML Car (DRIVE)
                </button>
              </div>
            </div>

            <!-- Light Industrial Instrumentation Readout -->
            <div class="lg:col-span-7 bg-inverse-surface p-5 md:p-6 rounded-[4px] border border-border-active space-y-4">
              <div class="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] pb-3 border-b border-border-grid">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded-[2px] bg-canvas-pure border border-border-grid font-bold text-on-surface">
                    {{ currentTelemetry().unitId }}
                  </span>
                  <span class="text-on-surface-variant">{{ currentTelemetry().streamId }}</span>
                </div>
                <span class="text-signal-success font-bold flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-signal-success"></span>
                  STREAM READY
                </span>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div class="bg-canvas-pure p-3 rounded-[2px] border border-border-grid">
                  <span class="text-[10px] text-outline block uppercase">CONTROL LOOP</span>
                  <span class="font-display text-[22px] font-bold text-on-surface tabular-nums">
                    {{ currentTelemetry().controlLoop }}
                  </span>
                </div>
                <div class="bg-canvas-pure p-3 rounded-[2px] border border-border-grid">
                  <span class="text-[10px] text-outline block uppercase">ACTUATOR BUS</span>
                  <span class="font-display text-[22px] font-bold" [class]="currentTelemetry().accentClass">
                    {{ currentTelemetry().actuatorBus }}
                  </span>
                </div>
                <div class="bg-canvas-pure p-3 rounded-[2px] border border-border-grid">
                  <span class="text-[10px] text-outline block uppercase">NEURAL PIPELINE</span>
                  <span class="font-display text-[22px] font-bold text-on-surface">
                    {{ currentTelemetry().neuralPipeline }}
                  </span>
                </div>
                <div class="bg-canvas-pure p-3 rounded-[2px] border border-border-grid">
                  <span class="text-[10px] text-outline block uppercase">FAILSAFE STATE</span>
                  <span class="font-display text-[19px] font-bold text-signal-success">
                    {{ currentTelemetry().failsafeState }}
                  </span>
                </div>
              </div>

              <div
                class="bg-canvas-pure p-4 rounded-[2px] border border-border-grid font-mono text-[12px] text-inverse-on-surface space-y-1.5"
              >
                <div class="text-on-surface font-bold pb-1.5 border-b border-border-grid">
                  {{ currentTelemetry().nodeTitle }}
                </div>
                @for (line of currentTelemetry().logs; track line) {
                  <div class="text-on-surface-variant tabular-nums">{{ line }}</div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Developer Labs & Academic Access CTA -->
      <section class="w-full px-6 md:px-10 py-12 bg-canvas-pure">
        <div
          class="max-w-[1360px] mx-auto rounded-[4px] bg-surface-container-high border border-border-active p-6 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div class="space-y-2 max-w-2xl">
            <span class="font-mono text-[10px] uppercase tracking-[0.08em] text-primary font-bold">
              RESEARCH COLLABORATION &amp; HARDWARE ACCESS · YLabZ PROGRAM
            </span>
            <h2 class="font-display text-[32px] sm:text-[38px] leading-none font-bold uppercase text-on-surface">
              Build With the ZoeRobo Robotics Stack
            </h2>
            <p class="text-[15px] leading-6 text-on-surface-variant">
              Universities, field robotics labs, and autonomous systems engineers can apply for
              developer hardware grants, source code repositories, and direct YLabZ telemetry
              access.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <a
              routerLink="/info-and-research"
              fragment="contact-labs"
              class="w-full sm:w-auto px-6 py-3 rounded-[2px] bg-primary hover:bg-primary-hover text-on-primary font-mono text-[12px] font-semibold uppercase tracking-[0.06em] text-center transition-colors flex items-center justify-center gap-2"
            >
              <mat-icon class="text-[18px]">science</mat-icon>
              <span>Request Lab Grant</span>
            </a>
            <a
              routerLink="/documentation"
              class="w-full sm:w-auto px-6 py-3 rounded-[2px] bg-canvas-pure border border-border-active hover:bg-surface-container text-on-surface font-mono text-[12px] font-semibold uppercase tracking-[0.06em] text-center transition-colors flex items-center justify-center gap-2"
            >
              <mat-icon class="text-[18px] text-primary">description</mat-icon>
              <span>Hardware Schematics</span>
            </a>
          </div>
        </div>
      </section>
    </div>

    <app-paper-modal [record]="selectedRecord()" (closed)="selectedRecord.set(null)" />
  `,
})
export class Overview {
  protected readonly images = ZOEROBO_IMAGES;
  protected readonly featuredDispatches = RESEARCH_RECORDS.slice(0, 3);
  protected readonly activePlatform = signal<TelemetryPlatform>('jagur');
  protected readonly selectedRecord = signal<ResearchRecord | null>(null);

  protected readonly currentTelemetry = computed(
    () => TELEMETRY_PROFILES[this.activePlatform()]
  );

  protected selectPlatform(platform: TelemetryPlatform): void {
    this.activePlatform.set(platform);
  }

  protected openRecord(record: ResearchRecord): void {
    this.selectedRecord.set(record);
  }
}
