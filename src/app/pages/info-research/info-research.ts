import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  LAB_FAQS,
  RESEARCH_RECORDS,
  ResearchRecord,
  ZOEROBO_IMAGES,
} from '../../data/zoerobo.data';
import { PaperModal } from '../../components/paper-modal/paper-modal';

type RepoFilter = 'all' | 'papers' | 'telemetry';

@Component({
  selector: 'app-info-research',
  imports: [RouterLink, MatIconModule, ReactiveFormsModule, PaperModal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col w-full">
      <!-- Top Telemetry Strip & Section Header -->
      <section class="w-full bg-canvas-pure border-b border-border-grid/70 shadow-sm">
        <div class="w-full px-6 md:px-12 py-10">
          <!-- Breadcrumb / Status Row -->
          <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-border-grid/60">
            <div class="flex flex-wrap items-center gap-2 font-mono text-[11px] text-on-surface-variant">
              <span
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-canvas-muted text-on-surface text-[10px] font-semibold"
              >
                <span class="w-2 h-2 rounded-full bg-signal-success animate-ping"></span>
                YLABZ CORE ONLINE
              </span>
              <span class="text-outline">/</span>
              <span>DIVISION // RES-094</span>
              <span class="text-outline">/</span>
              <span class="text-primary font-bold">INFO, RESEARCH &amp; LABS</span>
            </div>
            <div class="flex items-center gap-2.5 font-mono text-[10px] text-on-surface-variant">
              <div class="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-canvas-subtle">
                <mat-icon class="text-[15px] text-mode-fly">satellite_alt</mat-icon>
                <span>UPLINK: ACTIVE 100GbE</span>
              </div>
              <a
                href="mailto:info@zoerobo.com"
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed-dim transition-colors font-semibold"
              >
                <mat-icon class="text-[15px]">mail</mat-icon>
                <span>info&#64;zoerobo.com</span>
              </a>
            </div>
          </div>

          <!-- Typography Hero -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div class="lg:col-span-8 space-y-2">
              <p class="font-mono text-[13px] uppercase tracking-wider text-mode-run font-semibold">
                Empirical Autonomy &amp; Hardware Synthesis
              </p>
              <h1 class="font-display text-[38px] sm:text-[52px] leading-[1.08] font-bold text-on-surface tracking-[-0.03em]">
                Info, Research &amp; ZoeRobo Labs
              </h1>
              <p class="font-display text-[22px] sm:text-[24px] font-semibold text-primary max-w-2xl pt-1">
                “We make robots that Run, Drive &amp; Fly.”
              </p>
            </div>
            <div class="lg:col-span-4 lg:text-right">
              <div class="p-4 rounded-xl bg-canvas-subtle border border-border-grid/80 inline-block text-left w-full lg:max-w-xs shadow-sm">
                <div class="font-mono text-[10px] text-outline uppercase tracking-wider">
                  Kinematic Subsystems
                </div>
                <div class="flex items-center justify-between mt-1.5">
                  <a routerLink="/jag-u-r-robot" class="font-display text-[20px] font-semibold text-mode-run hover:underline">
                    RUN
                  </a>
                  <a routerLink="/ai-ml-drive" class="font-display text-[20px] font-semibold text-mode-drive hover:underline">
                    DRIVE
                  </a>
                  <a routerLink="/firefly-drone" class="font-display text-[20px] font-semibold text-mode-fly hover:underline">
                    FLY
                  </a>
                </div>
                <p class="text-[13px] leading-5 text-on-surface-variant mt-1.5">
                  Full-stack physical robotics and zero-cloud edge intelligence engineered for
                  hostile terrain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Live Lab Photo & Architectural Spotlight -->
      <section class="w-full px-6 md:px-12 mt-6 mb-10">
        <div class="relative w-full rounded-xl overflow-hidden bg-canvas-muted border border-border-grid shadow-md group">
          <img
            [src]="images.cleanroomLab"
            alt="Ultra modern robotics engineering cleanroom laboratory with quadruped robot, drone test bench, and engineers"
            referrerpolicy="no-referrer"
            class="w-full h-80 lg:h-[420px] object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/25 to-transparent flex flex-col justify-end p-6 text-canvas-pure"
          >
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="space-y-1">
                <span class="px-2 py-0.5 rounded bg-mode-run text-canvas-pure font-mono text-[10px] uppercase tracking-wider font-semibold">
                  YLabZ Primary Cleanroom // Bay 04
                </span>
                <h2 class="font-display text-[24px] leading-8 font-semibold text-canvas-pure">
                  Physical Hardware Synthesis &amp; Sensor Calibration Rig
                </h2>
                <p class="text-[13px] leading-5 text-canvas-pure/90 max-w-xl">
                  Photographed on-site: Quadruped Jag.U.R™ dynamic balance rig, FireFly™
                  local-flight wind isolation chamber, and Edge TPU neural benchmark station.
                </p>
              </div>
              <div class="flex items-center gap-3 bg-inverse-surface/70 backdrop-blur-md px-4 py-2.5 rounded-lg">
                <div class="text-right">
                  <div class="font-mono text-[10px] text-tertiary-fixed">LATENCY BENCHMARK</div>
                  <div class="font-mono text-[15px] font-bold text-canvas-pure tabular-nums">0.14 ms</div>
                </div>
                <mat-icon class="text-signal-success text-[26px]">verified</mat-icon>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Research Divisions (Bento Grid) -->
      <section class="w-full px-6 md:px-12 mb-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
          <div>
            <span class="font-mono text-[11px] uppercase tracking-wider text-primary font-semibold">
              Laboratory Matrix
            </span>
            <h2 class="font-display text-[32px] sm:text-[36px] leading-tight font-semibold text-on-surface">
              Core Research Divisions &amp; Initiatives
            </h2>
          </div>
          <p class="text-[13px] leading-5 text-on-surface-variant max-w-md">
            Three specialized hardware institutes driving next-generation edge perception, agile
            biomechanics, and micro-aerospace platforms.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Division 1 -->
          <div class="bg-canvas-pure border border-border-grid rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-xl bg-mode-run/10 text-mode-run flex items-center justify-center">
                  <mat-icon class="text-[26px]">precision_manufacturing</mat-icon>
                </div>
                <span class="font-mono text-[10px] px-2.5 py-1 rounded bg-canvas-muted text-on-surface font-semibold">
                  DIV-01 // RUN
                </span>
              </div>
              <h3 class="font-display text-[22px] font-semibold text-on-surface mb-1.5">
                YLabZ — Robotics Incubation
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant mb-4">
                Rapid prototyping skunkworks focused on experimental mechanical geometry, cycloidal
                high-torque micro-actuation, CNC-machined carbon fiber chassis, and custom
                bare-metal motor firmware.
              </p>
              <div class="space-y-1 bg-canvas-subtle p-3 rounded-lg mb-4 font-mono text-[11px]">
                <div class="flex justify-between py-1 text-on-surface-variant">
                  <span>Actuation Bandwidth</span>
                  <span class="text-on-surface font-semibold tabular-nums">1,200 Hz CAN-FD</span>
                </div>
                <div class="flex justify-between py-1 text-on-surface-variant">
                  <span>Dynamic Joint Impedance</span>
                  <span class="text-on-surface font-semibold">Adaptive FOC</span>
                </div>
                <div class="flex justify-between py-1 text-on-surface-variant">
                  <span>Prototyping Iteration</span>
                  <span class="text-mode-run font-semibold">48-Hr Cycle</span>
                </div>
              </div>
            </div>
            <a
              routerLink="/jag-u-r-robot"
              class="inline-flex items-center gap-1.5 font-mono text-[12px] font-semibold text-mode-run hover:text-primary transition-colors pt-2"
            >
              <span>Explore Jag.U.R™ Mechanical Docs</span>
              <mat-icon class="text-[16px]">arrow_forward</mat-icon>
            </a>
          </div>

          <!-- Division 2 -->
          <div class="bg-canvas-pure border border-border-grid rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-xl bg-mode-drive/10 text-mode-drive flex items-center justify-center">
                  <mat-icon class="text-[26px]">memory</mat-icon>
                </div>
                <span class="font-mono text-[10px] px-2.5 py-1 rounded bg-canvas-muted text-on-surface font-semibold">
                  DIV-02 // DRIVE
                </span>
              </div>
              <h3 class="font-display text-[22px] font-semibold text-on-surface mb-1.5">
                Edge Intelligence Research
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant mb-4">
                Zero reliance on cloud compute. Local neural inference pipelines utilizing
                TensorFlow Lite, Google Coral Edge TPUs, and DeepSeek quantized INT4/INT8 models for
                instant tactical decisions.
              </p>
              <div class="space-y-1 bg-canvas-subtle p-3 rounded-lg mb-4 font-mono text-[11px]">
                <div class="flex justify-between py-1 text-on-surface-variant">
                  <span>Quantized Model Footprint</span>
                  <span class="text-on-surface font-semibold tabular-nums">1.8 GB (Edge TPU)</span>
                </div>
                <div class="flex justify-between py-1 text-on-surface-variant">
                  <span>Inference Latency</span>
                  <span class="text-signal-success font-semibold tabular-nums">4.2 ms / frame</span>
                </div>
                <div class="flex justify-between py-1 text-on-surface-variant">
                  <span>Cloud Dependency</span>
                  <span class="text-mode-drive font-semibold tabular-nums">0.0% (Airgapped)</span>
                </div>
              </div>
            </div>
            <a
              routerLink="/ai-ml-drive"
              class="inline-flex items-center gap-1.5 font-mono text-[12px] font-semibold text-mode-drive hover:text-primary transition-colors pt-2"
            >
              <span>Inspect Neural Inference Benchmarks</span>
              <mat-icon class="text-[16px]">arrow_forward</mat-icon>
            </a>
          </div>

          <!-- Division 3 -->
          <div class="bg-canvas-pure border border-border-grid rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-xl bg-mode-fly/10 text-mode-fly flex items-center justify-center">
                  <mat-icon class="text-[26px]">radar</mat-icon>
                </div>
                <span class="font-mono text-[10px] px-2.5 py-1 rounded bg-canvas-muted text-on-surface font-semibold">
                  DIV-03 // FLY
                </span>
              </div>
              <h3 class="font-display text-[22px] font-semibold text-on-surface mb-1.5">
                Spatial SLAM &amp; Flight Navigation
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant mb-4">
                Multimodal LiDAR-depth fusion, visual-inertial odometry (VIO), and microsecond
                trajectory generation for indoor GPS-denied environments and rapid evasive aerial
                maneuvers.
              </p>
              <div class="space-y-1 bg-canvas-subtle p-3 rounded-lg mb-4 font-mono text-[11px]">
                <div class="flex justify-between py-1 text-on-surface-variant">
                  <span>Pose Estimation Rate</span>
                  <span class="text-on-surface font-semibold tabular-nums">500 Hz VIO</span>
                </div>
                <div class="flex justify-between py-1 text-on-surface-variant">
                  <span>Point Cloud Density</span>
                  <span class="text-on-surface font-semibold tabular-nums">120K pts/sec</span>
                </div>
                <div class="flex justify-between py-1 text-on-surface-variant">
                  <span>GPS-Denied Drift</span>
                  <span class="text-mode-fly font-semibold tabular-nums">&lt; 0.8% trajectory</span>
                </div>
              </div>
            </div>
            <a
              routerLink="/firefly-drone"
              class="inline-flex items-center gap-1.5 font-mono text-[12px] font-semibold text-mode-fly hover:text-primary transition-colors pt-2"
            >
              <span>Review FireFly™ Aerial Architecture</span>
              <mat-icon class="text-[16px]">arrow_forward</mat-icon>
            </a>
          </div>
        </div>
      </section>

      <!-- Research Repository with Working Filters -->
      <section class="w-full px-6 md:px-12 mb-10" id="research-repository">
        <div class="bg-canvas-pure border border-border-grid rounded-xl p-6 md:p-10 shadow-sm">
          <div class="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-border-grid/60 gap-4">
            <div>
              <span class="font-mono text-[11px] uppercase tracking-wider text-secondary font-semibold">
                Publications &amp; Concept Implementations
              </span>
              <h2 class="font-display text-[32px] sm:text-[36px] leading-tight font-semibold text-on-surface">
                ZoeRobo Empirical Research Repository
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                (click)="setRepoFilter('all')"
                class="px-3.5 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
                [class.bg-surface-container-high]="repoFilter() === 'all'"
                [class.text-primary]="repoFilter() === 'all'"
                [class.font-semibold]="repoFilter() === 'all'"
                [class.text-on-surface-variant]="repoFilter() !== 'all'"
                [class.hover:bg-canvas-muted]="repoFilter() !== 'all'"
              >
                All Records
              </button>
              <button
                type="button"
                (click)="setRepoFilter('papers')"
                class="px-3.5 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
                [class.bg-surface-container-high]="repoFilter() === 'papers'"
                [class.text-primary]="repoFilter() === 'papers'"
                [class.font-semibold]="repoFilter() === 'papers'"
                [class.text-on-surface-variant]="repoFilter() !== 'papers'"
                [class.hover:bg-canvas-muted]="repoFilter() !== 'papers'"
              >
                Papers
              </button>
              <button
                type="button"
                (click)="setRepoFilter('telemetry')"
                class="px-3.5 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
                [class.bg-surface-container-high]="repoFilter() === 'telemetry'"
                [class.text-primary]="repoFilter() === 'telemetry'"
                [class.font-semibold]="repoFilter() === 'telemetry'"
                [class.text-on-surface-variant]="repoFilter() !== 'telemetry'"
                [class.hover:bg-canvas-muted]="repoFilter() !== 'telemetry'"
              >
                Telemetry Kits
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @for (record of filteredRecords(); track record.id) {
              <article
                class="p-6 rounded-xl bg-canvas-subtle hover:bg-canvas-muted/70 border border-border-grid/60 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div class="flex flex-wrap items-center justify-between gap-2 mb-3 font-mono text-[10px]">
                    <span
                      class="inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold"
                      [class.bg-mode-fly/10]="record.mode === 'fly'"
                      [class.text-mode-fly]="record.mode === 'fly'"
                      [class.bg-mode-run/10]="record.mode === 'run'"
                      [class.text-mode-run]="record.mode === 'run'"
                      [class.bg-mode-drive/10]="record.mode === 'drive'"
                      [class.text-mode-drive]="record.mode === 'drive'"
                      [class.bg-secondary/10]="record.mode === 'swarm'"
                      [class.text-secondary]="record.mode === 'swarm'"
                    >
                      <mat-icon class="text-[14px]">{{ record.icon }}</mat-icon>
                      <span>{{ record.domainLabel }}</span>
                    </span>
                    <span class="text-outline">{{ record.refCode }}</span>
                  </div>
                  <h3 class="font-display text-[22px] font-semibold text-on-surface mb-1.5">
                    {{ record.title }}
                  </h3>
                  <p class="text-[13px] leading-5 text-on-surface-variant mb-4">
                    {{ record.summary }}
                  </p>
                  <div class="flex flex-wrap gap-1.5 mb-4">
                    @for (tag of record.tags; track tag) {
                      <span class="px-2 py-0.5 rounded bg-canvas-pure text-on-surface font-mono text-[10px]">
                        {{ tag }}
                      </span>
                    }
                  </div>
                </div>
                <div class="flex items-center justify-between pt-2 border-t border-border-grid/50">
                  <span class="font-mono text-[11px] text-on-surface-variant">
                    Authored by {{ record.author }}
                  </span>
                  <button
                    type="button"
                    (click)="openRecord(record)"
                    class="font-mono text-[12px] text-primary font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{{ record.ctaLabel }}</span>
                    <mat-icon class="text-[16px]">open_in_new</mat-icon>
                  </button>
                </div>
              </article>
            }
          </div>
        </div>
      </section>

      <!-- Telemetry & Hardware Workshop Showcase -->
      <section class="w-full px-6 md:px-12 mb-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-7 bg-canvas-pure border border-border-grid rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3 font-mono text-[10px]">
                <span class="uppercase tracking-wider text-outline">HARDWARE TEST RIG // TELEMETRY RUN</span>
                <span class="inline-flex items-center gap-1.5 text-signal-success font-semibold">
                  <span class="w-2 h-2 rounded-full bg-signal-success"></span>
                  LIVE BENCH
                </span>
              </div>
              <h2 class="font-display text-[24px] font-semibold text-on-surface mb-1.5">
                Empirical Prototyping Laboratory
              </h2>
              <p class="text-[13px] leading-5 text-on-surface-variant mb-4">
                Precision measurement workstations featuring oscilloscopes, thermal imaging cameras,
                dynamometers, and high-speed motion capture trackers ensuring zero kinematic jitter
                during high-load quadruped gait tests.
              </p>
              <div class="rounded-lg overflow-hidden bg-canvas-muted mb-4">
                <img
                  [src]="images.workbenchRig"
                  alt="Close up of robotics hardware testing workbench with custom circuit boards, carbon fiber actuators, and digital oscilloscope"
                  referrerpolicy="no-referrer"
                  class="w-full h-56 object-cover"
                />
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 font-mono text-center">
              <div class="bg-canvas-subtle p-2.5 rounded">
                <div class="text-[10px] text-outline">TORQUE PEAK</div>
                <div class="font-bold text-on-surface text-[14px] tabular-nums">45.2 Nm</div>
              </div>
              <div class="bg-canvas-subtle p-2.5 rounded">
                <div class="text-[10px] text-outline">THERMAL DRIFT</div>
                <div class="font-bold text-signal-success text-[14px] tabular-nums">&lt; 1.2°C</div>
              </div>
              <div class="bg-canvas-subtle p-2.5 rounded">
                <div class="text-[10px] text-outline">BUS VOLTAGE</div>
                <div class="font-bold text-mode-run text-[14px] tabular-nums">48.0 VDC</div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 bg-canvas-pure border border-border-grid rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3 font-mono text-[10px]">
                <span class="uppercase tracking-wider text-outline">EDGE TPU NEURAL PIPELINE</span>
                <span class="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-semibold">
                  INT8 QUANT
                </span>
              </div>
              <h2 class="font-display text-[24px] font-semibold text-on-surface mb-1.5">
                Real-Time Neural Inference
              </h2>
              <p class="text-[13px] leading-5 text-on-surface-variant mb-4">
                Telemetry data visualization illustrating localized bounding box predictions and
                low-latency path planning on embedded silicon without cloud dependency.
              </p>

              <div class="bg-canvas-subtle rounded-lg p-4 mb-4 border border-border-grid/60">
                <div class="flex justify-between items-center font-mono text-[10px] text-outline mb-2">
                  <span>LATENCY HISTORY (100 CYCLES)</span>
                  <span class="text-signal-success font-semibold tabular-nums">STABLE 4.2ms</span>
                </div>
                <svg class="w-full h-24 text-mode-run" fill="none" viewBox="0 0 300 80">
                  <path
                    d="M0,60 Q25,50 50,55 T100,45 T150,48 T200,40 T250,42 T300,38"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                  />
                  <path
                    d="M0,60 Q25,50 50,55 T100,45 T150,48 T200,40 T250,42 T300,38 L300,80 L0,80 Z"
                    fill="currentColor"
                    opacity="0.1"
                  />
                  <circle cx="200" cy="40" fill="currentColor" r="4" />
                  <circle cx="300" cy="38" fill="currentColor" r="4" />
                </svg>
                <div class="flex justify-between font-mono text-[10px] text-on-surface-variant pt-2">
                  <span>T0 (Camera)</span>
                  <span>T+2.1ms (TFLite)</span>
                  <span>T+4.2ms (Actuation)</span>
                </div>
              </div>
            </div>

            <div class="p-3.5 rounded-lg bg-surface-container-high text-on-surface">
              <div class="flex items-center gap-2">
                <mat-icon class="text-primary text-[20px]">psychology</mat-icon>
                <span class="font-mono text-[12px] font-bold">DeepSeek Micro-Agent Firmware</span>
              </div>
              <p class="text-[13px] leading-5 text-on-surface-variant mt-1">
                Autonomous decision heuristics run directly on the companion SoC, outputting direct
                waypoint coordinates to ROS2 navigation stacks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Collaboration Portal & Contact Inquiry -->
      <section class="w-full px-6 md:px-12 mb-10 scroll-mt-24" id="contact-labs">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Left Side: Contact Info -->
          <div class="lg:col-span-5 bg-canvas-pure border border-border-grid rounded-xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <span class="font-mono text-[11px] uppercase tracking-wider text-primary font-semibold">
                Academic &amp; Field Inquiries
              </span>
              <h2 class="font-display text-[32px] leading-tight font-semibold text-on-surface mt-1 mb-4">
                Connect with ZoeRobo Engineering
              </h2>
              <p class="text-[15px] leading-6 text-on-surface-variant mb-6">
                We partner with university robotics labs, aerospace research programs, and
                industrial innovators seeking field-tested hardware and open-source robotics
                modules.
              </p>

              <div class="space-y-3">
                <div class="flex items-start gap-3 p-4 rounded-lg bg-canvas-subtle">
                  <mat-icon class="text-primary text-[24px] mt-0.5">alternate_email</mat-icon>
                  <div>
                    <div class="font-mono text-[10px] text-outline uppercase tracking-wider">
                      Official Inquiries &amp; Paper Reprints
                    </div>
                    <a
                      href="mailto:info@zoerobo.com"
                      class="font-mono text-[14px] text-on-surface font-bold hover:text-primary transition-colors"
                    >
                      info&#64;zoerobo.com
                    </a>
                    <p class="text-[13px] text-on-surface-variant">
                      Fast response from our primary laboratory dispatch.
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3 p-4 rounded-lg bg-canvas-subtle">
                  <mat-icon class="text-mode-run text-[24px] mt-0.5">domain</mat-icon>
                  <div>
                    <div class="font-mono text-[10px] text-outline uppercase tracking-wider">
                      YLabZ Primary Cleanroom
                    </div>
                    <div class="font-mono text-[13px] text-on-surface font-semibold">
                      Autonomous Systems Research Facility
                    </div>
                    <p class="text-[13px] text-on-surface-variant">
                      Silicon Valley Engineering Hub • Hardware Prototyping Bay
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3 p-4 rounded-lg bg-canvas-subtle">
                  <mat-icon class="text-mode-fly text-[24px] mt-0.5">flight_takeoff</mat-icon>
                  <div>
                    <div class="font-mono text-[10px] text-outline uppercase tracking-wider">
                      Flight Test Proving Grounds
                    </div>
                    <div class="font-mono text-[13px] text-on-surface font-semibold">
                      UAS GPS-Denied Evaluation Range
                    </div>
                    <p class="text-[13px] text-on-surface-variant">
                      High-wind outdoor aerial proving facility • Range 04-West
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-6">
              <div class="font-mono text-[10px] text-outline">PUBLIC PGP / CODE REPOSITORIES</div>
              <div class="font-mono text-[12px] text-on-surface mt-1">
                GITHUB: zoerobo/open-autonomy-stack
              </div>
            </div>
          </div>

          <!-- Right Side: Interactive Reactive Form -->
          <div class="lg:col-span-7 bg-canvas-pure border border-border-grid rounded-xl p-6 md:p-8 shadow-sm">
            <div class="flex items-center justify-between pb-4 mb-4 border-b border-border-grid/60">
              <div>
                <h3 class="font-display text-[24px] font-semibold text-on-surface">
                  Developer &amp; Researcher Outreach
                </h3>
                <p class="text-[13px] text-on-surface-variant">
                  Submit project requirements, hardware kit allocations, or research collaboration
                  requests.
                </p>
              </div>
              <span class="hidden sm:inline-flex px-2.5 py-1 rounded bg-canvas-muted text-on-surface font-mono text-[10px]">
                SSL SECURE 256-BIT
              </span>
            </div>

            <form [formGroup]="inquiryForm" (ngSubmit)="onSubmitInquiry()" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="font-mono text-[10px] text-on-surface uppercase tracking-wider block" for="contact-name">
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    formControlName="fullName"
                    placeholder="Dr. Elena Rostova"
                    class="w-full px-3.5 py-2.5 rounded-lg bg-canvas-subtle border border-border-grid text-on-surface text-[13px] placeholder:text-outline focus:outline-none focus:bg-canvas-pure focus:border-mode-run focus:ring-1 focus:ring-mode-run"
                  />
                </div>
                <div class="space-y-1">
                  <label class="font-mono text-[10px] text-on-surface uppercase tracking-wider block" for="contact-org">
                    Institution / Organization *
                  </label>
                  <input
                    id="contact-org"
                    type="text"
                    formControlName="organization"
                    placeholder="MIT Robotics Laboratory / Industry Partner"
                    class="w-full px-3.5 py-2.5 rounded-lg bg-canvas-subtle border border-border-grid text-on-surface text-[13px] placeholder:text-outline focus:outline-none focus:bg-canvas-pure focus:border-mode-run focus:ring-1 focus:ring-mode-run"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="font-mono text-[10px] text-on-surface uppercase tracking-wider block" for="contact-email">
                    Institutional Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    formControlName="email"
                    placeholder="e.rostova@mit.edu"
                    class="w-full px-3.5 py-2.5 rounded-lg bg-canvas-subtle border border-border-grid text-on-surface text-[13px] placeholder:text-outline focus:outline-none focus:bg-canvas-pure focus:border-mode-run focus:ring-1 focus:ring-mode-run"
                  />
                </div>
                <div class="space-y-1">
                  <label class="font-mono text-[10px] text-on-surface uppercase tracking-wider block" for="contact-domain">
                    Research Interest *
                  </label>
                  <select
                    id="contact-domain"
                    formControlName="domain"
                    class="w-full px-3.5 py-2.5 rounded-lg bg-canvas-subtle border border-border-grid text-on-surface text-[13px] focus:outline-none focus:bg-canvas-pure focus:border-mode-run focus:ring-1 focus:ring-mode-run"
                  >
                    <option value="jaguar">Jag.U.R™ Quadruped Kinematics &amp; Gait</option>
                    <option value="firefly">FireFly™ Autonomous UAS &amp; VIO</option>
                    <option value="edge-ai">Edge TPU Neural Inference &amp; DeepSeek Local</option>
                    <option value="lego-av">Miniature Autonomous Fleet (Pixelopolis / LEGO)</option>
                    <option value="sdk">ZoeRobo ROS2 Driver &amp; Firmware SDK</option>
                  </select>
                </div>
              </div>

              <div class="space-y-1">
                <label class="font-mono text-[10px] text-on-surface uppercase tracking-wider block" for="contact-message">
                  Research Objectives &amp; Collaboration Scope *
                </label>
                <textarea
                  id="contact-message"
                  rows="4"
                  formControlName="message"
                  placeholder="Describe your operational scenario, hardware evaluation requirements, or academic grant specifications..."
                  class="w-full px-3.5 py-2.5 rounded-lg bg-canvas-subtle border border-border-grid text-on-surface text-[13px] placeholder:text-outline focus:outline-none focus:bg-canvas-pure focus:border-mode-run focus:ring-1 focus:ring-mode-run"
                ></textarea>
              </div>

              @if (formError()) {
                <div class="p-3 rounded-lg bg-error-container text-on-error-container font-mono text-[11px] flex items-center gap-2">
                  <mat-icon class="text-[18px]">error_outline</mat-icon>
                  <span>Please complete all required fields with a valid institutional email.</span>
                </div>
              }

              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
                <div class="text-on-surface-variant font-mono text-[10px] flex items-center gap-1.5">
                  <mat-icon class="text-[16px] text-mode-run">info</mat-icon>
                  <span>Dispatches sent directly to engineering chairs.</span>
                </div>
                <button
                  type="submit"
                  class="w-full sm:w-auto px-6 py-2.5 rounded bg-mode-run text-canvas-pure font-mono text-[12px] font-semibold uppercase tracking-wider hover:bg-primary transition-colors shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Transmit Inquiry</span>
                  <mat-icon class="text-[16px]">send</mat-icon>
                </button>
              </div>

              @if (formSubmitted()) {
                <div class="p-4 rounded-lg bg-signal-success/10 text-signal-success font-mono text-[11px] flex items-center gap-2.5">
                  <mat-icon class="text-signal-success text-[20px] shrink-0">task_alt</mat-icon>
                  <span>
                    TRANSMISSION CONFIRMED: Your lab inquiry has been logged into ZoeRobo Dispatch
                    Queue. A research lead will respond within 24 hours.
                  </span>
                </div>
              }
            </form>
          </div>
        </div>
      </section>

      <!-- Interactive Architectural FAQ -->
      <section class="w-full px-6 md:px-12 mb-10">
        <div class="bg-canvas-pure border border-border-grid rounded-xl p-6 md:p-10 shadow-sm">
          <div class="pb-4 mb-5">
            <span class="font-mono text-[11px] uppercase tracking-wider text-tertiary font-semibold">
              Technical Knowledge Base
            </span>
            <h2 class="font-display text-[32px] sm:text-[36px] leading-tight font-semibold text-on-surface">
              Frequently Asked Questions
            </h2>
            <p class="text-[13px] text-on-surface-variant mt-1">
              Direct answers regarding open-source hardware kits, ROS2 compatibility, and developer
              availability.
            </p>
          </div>

          <div class="space-y-3">
            @for (faq of faqs; track faq.id) {
              <div class="rounded-lg bg-canvas-subtle border border-border-grid/60 overflow-hidden transition-colors hover:bg-canvas-muted/60">
                <button
                  type="button"
                  (click)="toggleFaq(faq.id)"
                  class="w-full text-left p-4 flex items-center justify-between gap-4 cursor-pointer"
                  [attr.aria-expanded]="openFaqId() === faq.id"
                >
                  <span class="font-display text-[19px] font-semibold text-on-surface">
                    {{ faq.question }}
                  </span>
                  <mat-icon
                    class="text-outline transition-transform duration-200 shrink-0"
                    [class.rotate-180]="openFaqId() === faq.id"
                    [class.text-primary]="openFaqId() === faq.id"
                  >
                    expand_more
                  </mat-icon>
                </button>
                @if (openFaqId() === faq.id) {
                  <div class="px-4 pb-4 text-[14px] leading-6 text-on-surface-variant">
                    {{ faq.answer }}
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </section>
    </div>

    <app-paper-modal [record]="selectedRecord()" (closed)="selectedRecord.set(null)" />
  `,
})
export class InfoResearch {
  protected readonly images = ZOEROBO_IMAGES;
  protected readonly faqs = LAB_FAQS;

  protected readonly repoFilter = signal<RepoFilter>('all');
  protected readonly openFaqId = signal<string | null>('faq-1');
  protected readonly selectedRecord = signal<ResearchRecord | null>(null);
  protected readonly formSubmitted = signal(false);
  protected readonly formError = signal(false);

  protected readonly inquiryForm = new FormGroup({
    fullName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    organization: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    domain: new FormControl('jaguar', { nonNullable: true, validators: [Validators.required] }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  protected readonly filteredRecords = computed(() => {
    const filter = this.repoFilter();
    if (filter === 'all') return RESEARCH_RECORDS;
    return RESEARCH_RECORDS.filter((r) => r.category === filter);
  });

  protected setRepoFilter(filter: RepoFilter): void {
    this.repoFilter.set(filter);
  }

  protected toggleFaq(id: string): void {
    this.openFaqId.update((current) => (current === id ? null : id));
  }

  protected openRecord(record: ResearchRecord): void {
    this.selectedRecord.set(record);
  }

  protected onSubmitInquiry(): void {
    if (this.inquiryForm.invalid) {
      this.formError.set(true);
      this.formSubmitted.set(false);
      return;
    }
    this.formError.set(false);
    this.formSubmitted.set(true);
    this.inquiryForm.reset({
      fullName: '',
      organization: '',
      email: '',
      domain: 'jaguar',
      message: '',
    });
  }
}
