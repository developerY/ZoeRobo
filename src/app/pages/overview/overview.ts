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
  streamId: string;
  controlLoop: string;
  actuatorBus: string;
  neuralPipeline: string;
  failsafeState: string;
  nodeTitle: string;
  logs: string[];
}

const TELEMETRY_PROFILES: Record<TelemetryPlatform, TelemetryProfile> = {
  jagur: {
    streamId: 'PAYLOAD_STREAM::JAGUR_UNIT_01',
    controlLoop: '1000 Hz',
    actuatorBus: 'CAN 2.0B',
    neuralPipeline: 'TF-Lite INT8',
    failsafeState: 'PASSIVE OK',
    nodeTitle: '[ROS2 Node Status]: /quadruped/locomotion_controller',
    logs: [
      '> LiDAR Odometry: Converged [covariance < 0.003]',
      '> Joint Torque Estimation: Within nominal safety margins (< 28.5 Nm)',
      '> Dynamic Foot Traction: 99.4% ground adherence',
    ],
  },
  firefly: {
    streamId: 'PAYLOAD_STREAM::FIREFLY_UAS_04',
    controlLoop: '400 Hz',
    actuatorBus: 'UART / I2C',
    neuralPipeline: 'DeepSeek-1.5B',
    failsafeState: 'AIRBORNE HOVER',
    nodeTitle: '[ROS2 Node Status]: /uas/semantic_flight_pilot',
    logs: [
      '> Voice Command Parsed: "Check Living Room South Corner"',
      '> Optical Flow Divergence: 0.01 rad/s [Drift Nominal]',
      '> Edge Battery Level: 84.2% [14m 20s remaining]',
    ],
  },
  drive: {
    streamId: 'PAYLOAD_STREAM::PIXELOPOLIS_CAR_09',
    controlLoop: '120 Hz',
    actuatorBus: 'USB-C Coral',
    neuralPipeline: 'MobileNet-V3',
    failsafeState: 'CRUISING 1.8m/s',
    nodeTitle: '[ROS2 Node Status]: /car/steering_actuator_node',
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
    <div class="flex flex-col w-full">
      <!-- Top Engineering Telemetry Bar -->
      <div class="w-full bg-canvas-pure px-6 md:px-12 py-2 border-b border-border-grid/70 shadow-sm">
        <div
          class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.06em] text-on-surface-variant"
        >
          <div class="flex items-center gap-3">
            <span class="inline-flex items-center gap-1.5 text-signal-success font-semibold">
              <span class="w-2 h-2 rounded-full bg-signal-success animate-ping"></span>
              KINETIC SYS ONLINE
            </span>
            <span class="text-outline-variant">/</span>
            <span class="text-on-surface">LOC: YLabZ ROBOTICS CORE</span>
            <span class="text-outline-variant hidden sm:inline">/</span>
            <span class="hidden sm:inline tabular-nums">LATENCY: 0.12ms ON-DEVICE</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="bg-surface-container-high px-2 py-0.5 rounded text-primary font-semibold">
              TENSORFLOW LITE + DEEPSEEK INT8
            </span>
            <span class="hidden md:inline text-outline">ZERO-CLOUD DEPENDENCY VERIFIED</span>
          </div>
        </div>
      </div>

      <!-- Hero Section (Strict Light Engineering Environment) -->
      <section class="w-full px-6 md:px-12 pt-10 pb-12 bg-surface relative overflow-hidden">
        <!-- Subtle Architectural Background Grid -->
        <div
          class="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none"
          aria-hidden="true"
        ></div>

        <div class="max-w-7xl mx-auto relative">
          <!-- Architectural Tagline & Mode Chips -->
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-mode-run/10 text-mode-run font-mono text-[10px] font-bold uppercase tracking-wider"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-mode-run"></span>
              Autonomous AI
            </span>
            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-mode-drive/10 text-mode-drive font-mono text-[10px] font-bold uppercase tracking-wider"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-mode-drive"></span>
              Edge Computing
            </span>
            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-mode-fly/10 text-mode-fly font-mono text-[10px] font-bold uppercase tracking-wider"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-mode-fly"></span>
              Local LLM Guidance
            </span>
            <span
              class="px-2.5 py-1 rounded-full bg-canvas-muted text-on-surface font-mono text-[10px] font-medium"
            >
              PATENT PROTOCOL // RUN-DRIVE-FLY
            </span>
          </div>

          <!-- Core Display Headline -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10">
            <div class="lg:col-span-8 space-y-2.5">
              <p class="font-mono text-[13px] text-mode-run uppercase tracking-widest font-semibold">
                Autonomous Cybernetic Synthesis
              </p>
              <h1
                class="font-display text-[36px] sm:text-[48px] lg:text-[56px] font-bold text-on-surface tracking-[-0.03em] leading-[1.08]"
              >
                We make robots that <br class="hidden sm:inline" />
                <span class="text-mode-run">RUN</span>,
                <span class="text-mode-drive">DRIVE</span> &amp;
                <span class="text-mode-fly">FLY</span>.
              </h1>
              <p class="text-[17px] leading-7 text-on-surface-variant max-w-2xl pt-1">
                Next-generation autonomous robotics unchained from the cloud. ZoeRobo deploys
                sub-millisecond INT8 edge machine learning, onboard DeepSeek local models, and
                bio-mechanical kinematics across ground, vehicle, and micro-aerial domains.
              </p>
            </div>
            <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <a
                href="#fleet"
                class="px-6 py-3.5 rounded bg-mode-run hover:bg-primary text-canvas-pure font-mono text-[12px] font-semibold uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Explore Robotics Fleet</span>
                <mat-icon class="text-[18px]">arrow_downward</mat-icon>
              </a>
              <a
                href="#research"
                class="px-6 py-3.5 rounded bg-canvas-pure border border-border-grid hover:bg-surface-container text-on-surface font-mono text-[12px] font-semibold uppercase tracking-wider text-center transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Read Research Papers</span>
                <mat-icon class="text-[18px]">article</mat-icon>
              </a>
            </div>
          </div>

          <!-- Lab Visual & Realtime Telemetry Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <!-- Main Hero R&D Lab Imagery -->
            <div
              class="lg:col-span-8 rounded-xl overflow-hidden shadow-md bg-canvas-muted relative group min-h-[380px] lg:min-h-[440px] flex flex-col justify-between border border-border-grid/80"
            >
              <img
                [src]="images.cleanroomLab"
                alt="ZoeRobo High-Tech Autonomous R&D Cleanroom Lab featuring robotic quadrupeds, aerial drones, and robotics engineers analyzing telemetry"
                referrerpolicy="no-referrer"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/20 to-transparent"
              ></div>
              <div class="relative z-10 p-4 flex justify-between items-start gap-2">
                <span
                  class="bg-canvas-pure/90 backdrop-blur-md px-3 py-1 rounded font-mono text-[10px] text-on-surface font-semibold shadow-sm flex items-center gap-1.5"
                >
                  <span class="w-2 h-2 rounded-full bg-signal-success"></span>
                  YLabZ PHYSICAL LAB 04 // BAY AREA
                </span>
                <span
                  class="bg-canvas-pure/90 backdrop-blur-md px-2.5 py-1 rounded font-mono text-[10px] text-on-surface font-semibold"
                >
                  SYS::ARMED
                </span>
              </div>
              <div class="relative z-10 p-6 text-canvas-pure">
                <span class="font-mono text-[10px] uppercase tracking-wider text-tertiary-fixed font-bold">
                  Empirical Prototyping
                </span>
                <h2 class="font-display text-[24px] leading-8 font-semibold text-canvas-pure mt-0.5">
                  Silicon-to-Strut Hardware Validation
                </h2>
                <p class="text-[13px] leading-5 text-canvas-pure/90 max-w-lg mt-1">
                  Every chassis is built for full edge resilience. Quadruped balance actuators,
                  micro-propulsion aerodynamics, and Ackermann vehicle dynamics validated in our
                  cleanroom.
                </p>
              </div>
            </div>

            <!-- Telemetry & Live Engineering Metrics Bento -->
            <div class="lg:col-span-4 flex flex-col gap-4">
              <!-- Metric 1 -->
              <div
                class="p-6 rounded-xl bg-canvas-pure border border-border-grid/80 shadow-sm flex-1 flex flex-col justify-between gap-3"
              >
                <div class="flex items-center justify-between">
                  <span class="font-mono text-[10px] text-on-surface-variant uppercase font-semibold tracking-wider">
                    Active Kinematic Platforms
                  </span>
                  <mat-icon class="text-mode-run text-[22px]">smart_toy</mat-icon>
                </div>
                <div>
                  <div class="font-display text-[44px] leading-none text-on-surface font-bold tabular-nums">
                    3
                  </div>
                  <div class="font-mono text-[12px] text-mode-run font-bold mt-1">
                    RUN // DRIVE // FLY
                  </div>
                  <p class="text-[13px] leading-5 text-on-surface-variant mt-2">
                    Fully operational synchronized platforms spanning quadruped, ground rover, and
                    aerial micro-UAV.
                  </p>
                </div>
                <div class="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                  <div class="bg-mode-run h-full w-full"></div>
                </div>
              </div>

              <!-- Metric 2 -->
              <div
                class="p-6 rounded-xl bg-canvas-pure border border-border-grid/80 shadow-sm flex-1 flex flex-col justify-between gap-3"
              >
                <div class="flex items-center justify-between">
                  <span class="font-mono text-[10px] text-on-surface-variant uppercase font-semibold tracking-wider">
                    Neural Architecture
                  </span>
                  <mat-icon class="text-mode-fly text-[22px]">memory</mat-icon>
                </div>
                <div>
                  <div class="font-display text-[44px] leading-none text-on-surface font-bold tabular-nums">
                    100%
                  </div>
                  <div class="font-mono text-[12px] text-mode-fly font-bold mt-1">
                    ON-DEVICE EDGE COMPUTE
                  </div>
                  <p class="text-[13px] leading-5 text-on-surface-variant mt-2">
                    Zero tethered cloud dependency. Quantized DeepSeek-R1 distillates &amp; TF Lite
                    embedded directly on chassis.
                  </p>
                </div>
                <div class="flex items-center justify-between text-[11px] font-mono text-on-surface-variant pt-1">
                  <span class="tabular-nums">LATENCY: 0.00ms CLOUD</span>
                  <span class="text-signal-success font-semibold">TPU ACCEL</span>
                </div>
              </div>

              <!-- Metric 3 -->
              <div
                class="p-4 rounded-xl bg-canvas-muted border border-border-grid/70 flex items-center justify-between gap-2"
              >
                <div class="flex items-center gap-2.5">
                  <mat-icon class="text-mode-drive text-[20px]">bolt</mat-icon>
                  <div>
                    <div class="font-mono text-[11px] text-on-surface font-bold">
                      ROS2 Foxy / Humble Hybrid
                    </div>
                    <div class="text-[12px] text-on-surface-variant">
                      Realtime micro-DDS deterministic bus
                    </div>
                  </div>
                </div>
                <span class="font-mono text-signal-success font-bold text-[11px] bg-canvas-pure px-2 py-1 rounded">
                  STABLE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trio Platform Bento Showcase Section -->
      <section class="w-full px-6 md:px-12 py-12 bg-canvas-subtle border-y border-border-grid/60" id="fleet">
        <div class="max-w-7xl mx-auto space-y-6">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span class="font-mono text-[11px] uppercase tracking-wider text-mode-run font-bold">
                Hardware Matrix
              </span>
              <h2 class="font-display text-[32px] sm:text-[36px] leading-tight font-semibold text-on-surface mt-0.5">
                The ZoeRobo Autonomous Fleet
              </h2>
              <p class="text-[15px] leading-6 text-on-surface-variant max-w-xl mt-1">
                Three engineered form-factors, one unified philosophy: local machine perception
                delivering autonomous execution without network lag.
              </p>
            </div>
            <div
              class="flex items-center gap-1.5 font-mono text-[11px] text-on-surface-variant bg-canvas-pure border border-border-grid px-4 py-1.5 rounded-full shadow-sm self-start md:self-auto"
            >
              <span>FLEET STATE:</span>
              <span class="text-signal-success font-semibold">ALL UNITS DEPLOYABLE</span>
            </div>
          </div>

          <!-- Bento Grid (3-Tier Showcases) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Platform 1: Jag.U.R™ (RUN) -->
            <div
              class="rounded-xl bg-canvas-pure border border-border-grid shadow-sm overflow-hidden flex flex-col group hover:shadow-md hover:border-border-active transition-all"
            >
              <div class="relative h-60 overflow-hidden bg-surface-container">
                <img
                  [src]="images.jagurCard"
                  alt="Agile quadruped utility robot dog Jag.U.R with precision mechanical limbs and LiDAR dome"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute top-3 left-3">
                  <span
                    class="px-3 py-1 rounded-full bg-mode-run text-canvas-pure font-mono text-[10px] font-bold tracking-wider"
                  >
                    RUN // QUADRUPED
                  </span>
                </div>
                <div class="absolute bottom-3 right-3">
                  <span
                    class="px-2 py-0.5 rounded bg-canvas-pure/90 text-on-surface font-mono text-[10px]"
                  >
                    MODEL: JAG.U.R v2
                  </span>
                </div>
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between font-mono text-[11px]">
                    <span class="text-mode-run font-semibold tracking-wide">TERRAIN NAVIGATION</span>
                    <span class="text-outline">12-DOF LEGS</span>
                  </div>
                  <h3 class="font-display text-[24px] font-semibold text-on-surface">
                    Jag.U.R™ Utility Robot
                  </h3>
                  <p class="font-mono text-[12px] text-primary font-medium">
                    Journey Agile Guiding Utility Robot
                  </p>
                  <p class="text-[13px] leading-5 text-on-surface-variant">
                    Bio-inspired quadruped architecture designed for aggressive, unstructured
                    surface traversal. Integrates localized depth LiDAR, high-torque brushless joint
                    actuators, and reinforcement learning gait stability.
                  </p>
                </div>
                <div class="space-y-3 pt-1">
                  <div class="grid grid-cols-2 gap-2 font-mono text-[12px] bg-canvas-muted p-3 rounded">
                    <div>
                      <span class="text-on-surface-variant block text-[10px]">PAYLOAD</span>
                      <span class="font-bold text-on-surface tabular-nums">4.8 kg Active</span>
                    </div>
                    <div>
                      <span class="text-on-surface-variant block text-[10px]">GAIT VELOCITY</span>
                      <span class="font-bold text-on-surface tabular-nums">3.2 m/s Sprint</span>
                    </div>
                  </div>
                  <a
                    routerLink="/jag-u-r-robot"
                    class="w-full py-2.5 px-4 rounded bg-surface hover:bg-surface-container-high text-mode-run font-mono text-[12px] font-semibold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View Jag.U.R Specifications</span>
                    <mat-icon class="text-[16px]">chevron_right</mat-icon>
                  </a>
                </div>
              </div>
            </div>

            <!-- Platform 2: FireFly™ (FLY) -->
            <div
              class="rounded-xl bg-canvas-pure border border-border-grid shadow-sm overflow-hidden flex flex-col group hover:shadow-md hover:border-border-active transition-all"
            >
              <div class="relative h-60 overflow-hidden bg-surface-container">
                <img
                  [src]="images.fireflyDrone"
                  alt="Autonomous home security micro drone FireFly flying inside a sunlit modern interior"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute top-3 left-3">
                  <span
                    class="px-3 py-1 rounded-full bg-mode-fly text-canvas-pure font-mono text-[10px] font-bold tracking-wider"
                  >
                    FLY // MICRO UAS
                  </span>
                </div>
                <div class="absolute bottom-3 right-3">
                  <span
                    class="px-2 py-0.5 rounded bg-canvas-pure/90 text-on-surface font-mono text-[10px]"
                  >
                    WEIGHT: 210g ENCLOSED
                  </span>
                </div>
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between font-mono text-[11px]">
                    <span class="text-mode-fly font-semibold tracking-wide">LOCAL LLM GUIDANCE</span>
                    <span class="text-outline">VOICE TASKING</span>
                  </div>
                  <h3 class="font-display text-[24px] font-semibold text-on-surface">
                    FireFly™ Micro Drone
                  </h3>
                  <p class="font-mono text-[12px] text-mode-fly font-medium">
                    Indoor Autonomous Semantic UAV
                  </p>
                  <p class="text-[13px] leading-5 text-on-surface-variant">
                    The world’s pioneering micro-drone commanded by conversational voice prompts.
                    Give commands like
                    <span class="italic font-medium text-on-surface">"Go check the kitchen"</span>
                    and the onboard vision model routes, navigates, and avoids obstacles in real
                    time.
                  </p>
                </div>
                <div class="space-y-3 pt-1">
                  <div class="grid grid-cols-2 gap-2 font-mono text-[12px] bg-canvas-muted p-3 rounded">
                    <div>
                      <span class="text-on-surface-variant block text-[10px]">INTELLIGENCE</span>
                      <span class="font-bold text-on-surface">DeepSeek Local</span>
                    </div>
                    <div>
                      <span class="text-on-surface-variant block text-[10px]">FLIGHT TIME</span>
                      <span class="font-bold text-on-surface tabular-nums">18 min Indoor</span>
                    </div>
                  </div>
                  <a
                    routerLink="/firefly-drone"
                    class="w-full py-2.5 px-4 rounded bg-surface hover:bg-surface-container-high text-mode-fly font-mono text-[12px] font-semibold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View FireFly Specifications</span>
                    <mat-icon class="text-[16px]">chevron_right</mat-icon>
                  </a>
                </div>
              </div>
            </div>

            <!-- Platform 3: AI/ML Mini-Car (DRIVE) -->
            <div
              class="rounded-xl bg-canvas-pure border border-border-grid shadow-sm overflow-hidden flex flex-col group hover:shadow-md hover:border-border-active transition-all"
            >
              <div class="relative h-60 overflow-hidden bg-surface-container">
                <img
                  [src]="images.aimlDriveHero"
                  alt="Miniature smart autonomous self-driving car with smartphone neural compute rig on urban test track"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute top-3 left-3">
                  <span
                    class="px-3 py-1 rounded-full bg-mode-drive text-canvas-pure font-mono text-[10px] font-bold tracking-wider"
                  >
                    DRIVE // WHEELED AGV
                  </span>
                </div>
                <div class="absolute bottom-3 right-3">
                  <span
                    class="px-2 py-0.5 rounded bg-canvas-pure/90 text-on-surface font-mono text-[10px]"
                  >
                    TF LITE + CORAL TPU
                  </span>
                </div>
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between font-mono text-[11px]">
                    <span class="text-mode-drive font-semibold tracking-wide">EDGE TPU &amp; TF LITE</span>
                    <span class="text-outline">NEURAL SLAM</span>
                  </div>
                  <h3 class="font-display text-[24px] font-semibold text-on-surface">
                    AI/ML Mini-Car
                  </h3>
                  <p class="font-mono text-[12px] text-mode-drive font-medium">
                    Smartphone &amp; TPU Autonomous Rover
                  </p>
                  <p class="text-[13px] leading-5 text-on-surface-variant">
                    Inspired by Google’s Pixelopolis research initiative. Employs commercial mobile
                    silicon and Google Coral TPU neural vision models to perform lane indexing,
                    dynamic traffic negotiation, and road sign inference.
                  </p>
                </div>
                <div class="space-y-3 pt-1">
                  <div class="grid grid-cols-2 gap-2 font-mono text-[12px] bg-canvas-muted p-3 rounded">
                    <div>
                      <span class="text-on-surface-variant block text-[10px]">FPS INFERENCE</span>
                      <span class="font-bold text-on-surface tabular-nums">60 FPS Realtime</span>
                    </div>
                    <div>
                      <span class="text-on-surface-variant block text-[10px]">STEERING LOGIC</span>
                      <span class="font-bold text-on-surface">Pure Pursuit CNN</span>
                    </div>
                  </div>
                  <a
                    routerLink="/ai-ml-drive"
                    class="w-full py-2.5 px-4 rounded bg-surface hover:bg-surface-container-high text-mode-drive font-mono text-[12px] font-semibold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View Drive Platform Specs</span>
                    <mat-icon class="text-[16px]">chevron_right</mat-icon>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Deep Architecture Section: On-Device Neural Edge Compute -->
      <section class="w-full px-6 md:px-12 py-12 bg-surface" id="research">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-10">
            <div class="lg:col-span-6 space-y-2">
              <span class="font-mono text-[11px] uppercase tracking-wider text-primary font-bold">
                Neural Edge Computation
              </span>
              <h2 class="font-display text-[32px] sm:text-[36px] leading-tight font-semibold text-on-surface">
                Architected for Zero Cloud Dependency.
              </h2>
              <p class="text-[15px] leading-6 text-on-surface-variant">
                Robotics deployed in real-time kinetic environments cannot tolerate the 150ms
                round-trip latency of commercial cloud LLMs. ZoeRobo embeds tailored distillation
                checkpoints directly into silicon, ensuring instantaneous spatial perception and
                task execution.
              </p>
            </div>
            <div class="lg:col-span-6 flex flex-wrap gap-3 justify-start lg:justify-end">
              <div class="px-5 py-3 bg-canvas-pure border border-border-grid rounded-lg shadow-sm text-center">
                <span class="block font-mono text-[24px] font-bold text-primary tabular-nums">0 ms</span>
                <span class="font-mono text-[10px] text-on-surface-variant uppercase">Cloud Transmission</span>
              </div>
              <div class="px-5 py-3 bg-canvas-pure border border-border-grid rounded-lg shadow-sm text-center">
                <span class="block font-mono text-[24px] font-bold text-mode-run tabular-nums">4.2 TOPS</span>
                <span class="font-mono text-[10px] text-on-surface-variant uppercase">Edge TPU Compute</span>
              </div>
              <div class="px-5 py-3 bg-canvas-pure border border-border-grid rounded-lg shadow-sm text-center">
                <span class="block font-mono text-[24px] font-bold text-mode-fly">INT8</span>
                <span class="font-mono text-[10px] text-on-surface-variant uppercase">Model Quantization</span>
              </div>
            </div>
          </div>

          <!-- Architectural Feature Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="p-6 rounded-xl bg-canvas-pure border border-border-grid/80 shadow-sm space-y-2.5">
              <div class="w-10 h-10 rounded bg-mode-run/10 text-mode-run flex items-center justify-center">
                <mat-icon class="text-[24px]">cognition</mat-icon>
              </div>
              <h3 class="font-display text-[20px] font-semibold text-on-surface">DeepSeek Local SLM</h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Micro-quantized 1.5B/7B language reasoning engines interpreting spatial natural
                language instructions directly on the vehicle motherboard.
              </p>
              <span class="inline-block font-mono text-[11px] text-mode-run font-medium tabular-nums">
                REASONING LATENCY: 22ms
              </span>
            </div>

            <div class="p-6 rounded-xl bg-canvas-pure border border-border-grid/80 shadow-sm space-y-2.5">
              <div class="w-10 h-10 rounded bg-mode-drive/10 text-mode-drive flex items-center justify-center">
                <mat-icon class="text-[24px]">terminal</mat-icon>
              </div>
              <h3 class="font-display text-[20px] font-semibold text-on-surface">TensorFlow Lite Edge</h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                High-efficiency object recognition and pixel segmentation pipelines optimized for
                Edge TPU acceleration with low thermal dissipation.
              </p>
              <span class="inline-block font-mono text-[11px] text-mode-drive font-medium tabular-nums">
                POWER DRAW: 2.1W AVERAGE
              </span>
            </div>

            <div class="p-6 rounded-xl bg-canvas-pure border border-border-grid/80 shadow-sm space-y-2.5">
              <div class="w-10 h-10 rounded bg-mode-fly/10 text-mode-fly flex items-center justify-center">
                <mat-icon class="text-[24px]">view_in_ar</mat-icon>
              </div>
              <h3 class="font-display text-[20px] font-semibold text-on-surface">Real-Time Spatial SLAM</h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Simultaneous Localization and Mapping combining optical stereo flow, ultra-wideband
                anchors, and high-frequency 6-axis IMU fusion.
              </p>
              <span class="inline-block font-mono text-[11px] text-mode-fly font-medium tabular-nums">
                DRIFT RATIO: &lt; 0.02%
              </span>
            </div>

            <div class="p-6 rounded-xl bg-canvas-pure border border-border-grid/80 shadow-sm space-y-2.5">
              <div class="w-10 h-10 rounded bg-surface-container-high text-primary flex items-center justify-center">
                <mat-icon class="text-[24px]">shield</mat-icon>
              </div>
              <h3 class="font-display text-[20px] font-semibold text-on-surface">Hardware Determinism</h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Direct real-time hardware interrupt loops ensuring kinematic recovery within 5
                microseconds if dynamic balance loss is detected.
              </p>
              <span class="inline-block font-mono text-[11px] text-primary font-medium tabular-nums">
                RECOVERY: 5 MICROSECONDS
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Concept to Reality: Research Logs & Dispatches -->
      <section class="w-full px-6 md:px-12 py-12 bg-canvas-subtle border-y border-border-grid/60">
        <div class="max-w-7xl mx-auto space-y-6">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span class="font-mono text-[11px] uppercase tracking-wider text-mode-run font-bold">
                Research Logs // YLabZ
              </span>
              <h2 class="font-display text-[32px] sm:text-[36px] leading-tight font-semibold text-on-surface">
                From Whiteboard Concept to Reality
              </h2>
              <p class="text-[15px] leading-6 text-on-surface-variant max-w-xl mt-1">
                Read our engineering deep-dives, hardware schematics, and open-source releases
                documenting every stage of build iteration.
              </p>
            </div>
            <a
              routerLink="/info-and-research"
              fragment="research-repository"
              class="font-mono text-[12px] uppercase tracking-wider text-mode-run hover:text-primary font-semibold flex items-center gap-1"
            >
              <span>Read all publications</span>
              <mat-icon class="text-[16px]">arrow_forward</mat-icon>
            </a>
          </div>

          <!-- Articles Trio -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @for (record of featuredDispatches; track record.id) {
              <article
                class="p-6 rounded-xl bg-canvas-pure border border-border-grid shadow-sm flex flex-col justify-between hover:shadow-md hover:border-border-active transition-all group"
              >
                <div class="space-y-2.5">
                  <div class="flex items-center justify-between font-mono text-[10px]">
                    <span
                      class="font-bold"
                      [class.text-mode-fly]="record.mode === 'fly'"
                      [class.text-mode-run]="record.mode === 'run'"
                      [class.text-mode-drive]="record.mode === 'drive'"
                    >
                      {{ record.domainLabel }}
                    </span>
                    <span class="text-outline">{{ record.readTime }}</span>
                  </div>
                  <h3
                    class="font-display text-[20px] leading-7 font-semibold text-on-surface group-hover:text-primary transition-colors"
                  >
                    <button
                      type="button"
                      (click)="openRecord(record)"
                      class="text-left hover:text-primary transition-colors cursor-pointer"
                    >
                      “{{ record.title }}”
                    </button>
                  </h3>
                  <p class="text-[13px] leading-5 text-on-surface-variant">
                    {{ record.summary }}
                  </p>
                </div>
                <div class="pt-4 mt-2 flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                  <span>BY {{ record.author.toUpperCase() }}</span>
                  <button
                    type="button"
                    (click)="openRecord(record)"
                    class="font-semibold text-primary hover:underline cursor-pointer"
                  >
                    READ DISPATCH →
                  </button>
                </div>
              </article>
            }
          </div>
        </div>
      </section>

      <!-- Interactive Telemetry Console / Live Spec Sandbox -->
      <section class="w-full px-6 md:px-12 py-12 bg-surface">
        <div
          class="max-w-7xl mx-auto rounded-xl bg-canvas-pure border border-border-grid p-6 md:p-10 shadow-md"
        >
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div class="lg:col-span-5 space-y-3">
              <div
                class="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-surface-container-high text-mode-run font-mono text-[10px] font-bold"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-mode-run"></span>
                SYS CONSOLE
              </div>
              <h2 class="font-display text-[30px] sm:text-[34px] leading-tight font-semibold text-on-surface">
                Robotics Laboratory Telemetry Query
              </h2>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Select a target platform below to examine live onboard sensor payloads, motor loop
                frequencies, and model checkpoint parameters.
              </p>
              <div class="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  (click)="selectPlatform('jagur')"
                  class="px-4 py-2 rounded font-mono text-[12px] uppercase tracking-wider transition-all cursor-pointer"
                  [class.bg-mode-run]="activePlatform() === 'jagur'"
                  [class.text-canvas-pure]="activePlatform() === 'jagur'"
                  [class.font-bold]="activePlatform() === 'jagur'"
                  [class.shadow-sm]="activePlatform() === 'jagur'"
                  [class.bg-canvas-muted]="activePlatform() !== 'jagur'"
                  [class.text-on-surface]="activePlatform() !== 'jagur'"
                >
                  Jag.U.R™ (Run)
                </button>
                <button
                  type="button"
                  (click)="selectPlatform('firefly')"
                  class="px-4 py-2 rounded font-mono text-[12px] uppercase tracking-wider transition-all cursor-pointer"
                  [class.bg-mode-fly]="activePlatform() === 'firefly'"
                  [class.text-canvas-pure]="activePlatform() === 'firefly'"
                  [class.font-bold]="activePlatform() === 'firefly'"
                  [class.shadow-sm]="activePlatform() === 'firefly'"
                  [class.bg-canvas-muted]="activePlatform() !== 'firefly'"
                  [class.text-on-surface]="activePlatform() !== 'firefly'"
                >
                  FireFly™ (Fly)
                </button>
                <button
                  type="button"
                  (click)="selectPlatform('drive')"
                  class="px-4 py-2 rounded font-mono text-[12px] uppercase tracking-wider transition-all cursor-pointer"
                  [class.bg-mode-drive]="activePlatform() === 'drive'"
                  [class.text-canvas-pure]="activePlatform() === 'drive'"
                  [class.font-bold]="activePlatform() === 'drive'"
                  [class.shadow-sm]="activePlatform() === 'drive'"
                  [class.bg-canvas-muted]="activePlatform() !== 'drive'"
                  [class.text-on-surface]="activePlatform() !== 'drive'"
                >
                  AI/ML Car (Drive)
                </button>
              </div>
            </div>

            <div class="lg:col-span-7 bg-surface-container-low p-5 md:p-6 rounded-xl border border-border-grid/70">
              <div class="flex items-center justify-between font-mono text-[11px] text-outline pb-3 mb-3">
                <span>{{ currentTelemetry().streamId }}</span>
                <span class="text-signal-success font-semibold flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-signal-success"></span>
                  STREAM READY
                </span>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-center mb-4">
                <div class="bg-canvas-pure p-3 rounded shadow-sm border border-border-grid/60">
                  <span class="text-[10px] text-on-surface-variant block uppercase">CONTROL LOOP</span>
                  <span class="font-display text-[18px] font-bold text-on-surface tabular-nums">
                    {{ currentTelemetry().controlLoop }}
                  </span>
                </div>
                <div class="bg-canvas-pure p-3 rounded shadow-sm border border-border-grid/60">
                  <span class="text-[10px] text-on-surface-variant block uppercase">ACTUATOR BUS</span>
                  <span class="font-display text-[18px] font-bold text-mode-run">
                    {{ currentTelemetry().actuatorBus }}
                  </span>
                </div>
                <div class="bg-canvas-pure p-3 rounded shadow-sm border border-border-grid/60">
                  <span class="text-[10px] text-on-surface-variant block uppercase">NEURAL PIPELINE</span>
                  <span class="font-display text-[18px] font-bold text-on-surface">
                    {{ currentTelemetry().neuralPipeline }}
                  </span>
                </div>
                <div class="bg-canvas-pure p-3 rounded shadow-sm border border-border-grid/60">
                  <span class="text-[10px] text-on-surface-variant block uppercase">FAILSAFE STATE</span>
                  <span class="font-display text-[16px] font-bold text-signal-success">
                    {{ currentTelemetry().failsafeState }}
                  </span>
                </div>
              </div>
              <div
                class="bg-canvas-pure p-4 rounded border border-border-grid/60 font-mono text-[12px] text-on-surface-variant space-y-1"
              >
                <div class="text-on-surface font-semibold">{{ currentTelemetry().nodeTitle }}</div>
                @for (line of currentTelemetry().logs; track line) {
                  <div class="text-outline">{{ line }}</div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Developer Labs & Academic Access CTA -->
      <section class="w-full px-6 md:px-12 py-10 bg-canvas-pure">
        <div
          class="max-w-7xl mx-auto rounded-xl bg-surface-container-low border border-border-grid/80 p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div class="space-y-1.5 max-w-2xl">
            <span class="font-mono text-[10px] uppercase tracking-wider text-mode-run font-bold">
              Research Collaboration &amp; Hardware Access
            </span>
            <h2 class="font-display text-[30px] sm:text-[34px] leading-tight font-semibold text-on-surface">
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
              class="w-full sm:w-auto px-6 py-3.5 rounded bg-mode-run hover:bg-primary text-canvas-pure font-mono text-[12px] font-semibold uppercase tracking-wider text-center transition-all shadow-md"
            >
              Request Lab Grant
            </a>
            <a
              routerLink="/documentation"
              class="w-full sm:w-auto px-6 py-3.5 rounded bg-canvas-pure border border-border-grid hover:bg-surface-container text-on-surface font-mono text-[12px] font-semibold uppercase tracking-wider text-center transition-all shadow-sm"
            >
              Hardware Schematics
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
