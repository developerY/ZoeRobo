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
    <div class="flex flex-col w-full bg-surface text-on-surface">
      <!-- Top Status Rail -->
      <section class="w-full bg-canvas-pure border-b border-border-grid px-6 md:px-10 py-2.5">
        <div
          class="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] tracking-[0.06em]"
        >
          <div class="flex flex-wrap items-center gap-2.5 text-on-surface-variant">
            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-surface-container-high border border-border-grid text-on-surface text-[10px] font-bold uppercase"
            >
              <span class="w-2 h-2 rounded-full bg-signal-success"></span>
              YLABZ CORE ONLINE
            </span>
            <span class="text-border-active">|</span>
            <span>DIVISION // RES-094</span>
            <span class="text-border-active">|</span>
            <span class="text-primary font-bold">INFO, RESEARCH &amp; LABS</span>
          </div>
          <div class="flex items-center gap-3 font-mono text-[10px] text-on-surface-variant">
            <div class="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-surface-container border border-border-grid">
              <mat-icon class="text-[14px] text-mode-fly">satellite_alt</mat-icon>
              <span>UPLINK: ACTIVE 100GbE</span>
            </div>
            <a
              href="mailto:info@zoerobo.com"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-primary-container border border-primary/40 text-on-primary-container hover:bg-primary hover:text-on-primary transition-colors font-bold"
            >
              <mat-icon class="text-[14px]">mail</mat-icon>
              <span>info&#64;zoerobo.com</span>
            </a>
          </div>
        </div>
      </section>

      <!-- 01 / Hero & Cleanroom Spotlight -->
      <section class="w-full bg-surface industrial-grid border-b border-border-grid px-6 md:px-10 py-10">
        <div class="max-w-[1360px] mx-auto space-y-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div class="lg:col-span-8 space-y-2.5">
              <p class="font-mono text-[11px] uppercase tracking-[0.08em] text-primary font-bold">
                01 / RESEARCH &amp; LABS · EMPIRICAL AUTONOMY &amp; HARDWARE SYNTHESIS
              </p>
              <h1 class="font-display text-[44px] sm:text-[58px] leading-[1.0] font-bold uppercase text-on-surface tracking-[-0.02em]">
                Info, Research &amp; ZoeRobo Labs
              </h1>
              <p class="font-display text-[24px] sm:text-[26px] font-semibold uppercase text-on-surface-variant max-w-2xl">
                “We make robots that <span class="text-mode-run">Run</span>, <span class="text-mode-drive">Drive</span> &amp; <span class="text-mode-fly">Fly</span>.”
              </p>
            </div>
            <div class="lg:col-span-4 lg:flex lg:justify-end">
              <div class="p-4 rounded-[4px] bg-canvas-pure border border-border-active w-full lg:max-w-xs space-y-2">
                <div class="font-mono text-[10px] text-outline uppercase tracking-wider font-semibold">
                  KINEMATIC SUBSYSTEMS
                </div>
                <div class="grid grid-cols-3 gap-2 text-center">
                  <a routerLink="/jag-u-r-robot" class="py-1.5 rounded-[2px] bg-primary-container border border-mode-run/40 font-mono text-[11px] font-bold text-on-primary-container hover:bg-mode-run hover:text-on-primary transition-colors">
                    RUN
                  </a>
                  <a routerLink="/ai-ml-drive" class="py-1.5 rounded-[2px] bg-secondary-fixed border border-mode-drive/40 font-mono text-[11px] font-bold text-on-secondary-fixed hover:bg-mode-drive hover:text-on-secondary transition-colors">
                    DRIVE
                  </a>
                  <a routerLink="/firefly-drone" class="py-1.5 rounded-[2px] bg-tertiary-fixed border border-mode-fly/40 font-mono text-[11px] font-bold text-on-tertiary-fixed hover:bg-mode-fly hover:text-on-tertiary transition-colors">
                    FLY
                  </a>
                </div>
                <p class="text-[12px] leading-5 text-on-surface-variant">
                  Full-stack physical robotics and zero-cloud edge intelligence engineered for
                  industrial environments.
                </p>
              </div>
            </div>
          </div>

          <!-- Cleanroom Spotlight Frame (Bright, Unobstructed Photo + Solid Footer Strip) -->
          <div class="rounded-[4px] overflow-hidden bg-canvas-pure border border-border-active">
            <div class="px-4 py-2.5 bg-canvas-pure border-b border-border-grid flex flex-wrap items-center justify-between gap-2 font-mono text-[10px]">
              <span class="px-2 py-0.5 rounded-[2px] bg-mode-run text-on-primary uppercase tracking-wider font-bold">
                YLabZ PRIMARY CLEANROOM // BAY 04
              </span>
              <span class="text-on-surface-variant font-semibold">
                CALIBRATION RIG · WIND CHAMBER · TPU BENCH
              </span>
            </div>

            <div class="w-full h-72 lg:h-[400px] bg-canvas-muted overflow-hidden">
              <img
                [src]="images.cleanroomLab"
                alt="Ultra modern robotics engineering cleanroom laboratory with quadruped robot, drone test bench, and engineers"
                referrerpolicy="no-referrer"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="p-5 md:p-6 bg-canvas-pure border-t border-border-active flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="space-y-1">
                <h2 class="font-display text-[26px] leading-7 font-bold uppercase text-on-surface">
                  Physical Hardware Synthesis &amp; Sensor Calibration Rig
                </h2>
                <p class="text-[14px] leading-6 text-on-surface-variant max-w-2xl">
                  Photographed on-site: Quadruped Jag.U.R™ dynamic balance rig, FireFly™
                  local-flight wind isolation chamber, and Edge TPU neural benchmark station.
                </p>
              </div>
              <div class="flex items-center gap-3 bg-surface-container border border-border-active px-4 py-2.5 rounded-[2px] shrink-0 self-start md:self-auto">
                <div>
                  <div class="font-mono text-[10px] text-outline uppercase">LATENCY BENCHMARK</div>
                  <div class="font-mono text-[16px] font-bold text-on-surface tabular-nums">0.14 ms</div>
                </div>
                <mat-icon class="text-signal-success text-[24px]">verified</mat-icon>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 02 / Core Research Divisions -->
      <section class="w-full px-6 md:px-10 py-14 bg-canvas-subtle border-b border-border-grid">
        <div class="max-w-[1360px] mx-auto">
          <div class="flex flex-col md:flex-row md:items-end justify-between pb-5 mb-8 border-b border-border-grid gap-3">
            <div>
              <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-primary font-bold">
                02 / RESEARCH DIVISIONS · LABORATORY MATRIX
              </span>
              <h2 class="font-display text-[36px] sm:text-[42px] leading-none font-bold uppercase text-on-surface mt-1.5">
                Core Research Divisions &amp; Initiatives
              </h2>
            </div>
            <p class="text-[14px] leading-5 text-on-surface-variant max-w-md">
              Three specialized hardware institutes driving edge perception, agile biomechanics,
              and micro-aerospace autonomy.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Division 1 -->
            <div class="bg-canvas-pure border border-border-grid rounded-[4px] p-6 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between pb-4 mb-4 border-b border-border-grid">
                  <div class="w-10 h-10 rounded-[2px] bg-primary-container border border-mode-run/40 text-mode-run flex items-center justify-center">
                    <mat-icon class="text-[22px]">precision_manufacturing</mat-icon>
                  </div>
                  <span class="font-mono text-[10px] px-2.5 py-0.5 rounded-[2px] bg-surface-container border border-border-grid text-on-surface font-bold">
                    DIV-01 // RUN
                  </span>
                </div>
                <h3 class="font-display text-[26px] font-bold uppercase text-on-surface mb-2">
                  YLabZ — Robotics Incubation
                </h3>
                <p class="text-[14px] leading-6 text-on-surface-variant mb-4">
                  Rapid prototyping skunkworks focused on mechanical geometry, cycloidal high-torque
                  micro-actuation, CNC carbon fiber chassis, and bare-metal motor firmware.
                </p>
                <div class="divide-y divide-border-grid bg-surface-container border border-border-grid rounded-[2px] mb-5 font-mono text-[11px]">
                  <div class="flex justify-between px-3 py-2 text-on-surface-variant">
                    <span>Actuation Bandwidth</span>
                    <span class="text-on-surface font-bold tabular-nums">1,200 Hz CAN-FD</span>
                  </div>
                  <div class="flex justify-between px-3 py-2 text-on-surface-variant">
                    <span>Dynamic Joint Impedance</span>
                    <span class="text-on-surface font-bold">Adaptive FOC</span>
                  </div>
                  <div class="flex justify-between px-3 py-2 text-on-surface-variant">
                    <span>Prototyping Iteration</span>
                    <span class="text-mode-run font-bold">48-Hr Cycle</span>
                  </div>
                </div>
              </div>
              <a
                routerLink="/jag-u-r-robot"
                class="inline-flex items-center gap-1.5 font-mono text-[12px] font-bold uppercase text-mode-run hover:text-primary-hover transition-colors pt-2"
              >
                <span>Explore Jag.U.R™ Mechanical Docs</span>
                <mat-icon class="text-[16px]">arrow_forward</mat-icon>
              </a>
            </div>

            <!-- Division 2 -->
            <div class="bg-canvas-pure border border-border-grid rounded-[4px] p-6 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between pb-4 mb-4 border-b border-border-grid">
                  <div class="w-10 h-10 rounded-[2px] bg-secondary-fixed border border-mode-drive/40 text-mode-drive flex items-center justify-center">
                    <mat-icon class="text-[22px]">memory</mat-icon>
                  </div>
                  <span class="font-mono text-[10px] px-2.5 py-0.5 rounded-[2px] bg-surface-container border border-border-grid text-on-surface font-bold">
                    DIV-02 // DRIVE
                  </span>
                </div>
                <h3 class="font-display text-[26px] font-bold uppercase text-on-surface mb-2">
                  Edge Intelligence Research
                </h3>
                <p class="text-[14px] leading-6 text-on-surface-variant mb-4">
                  Zero reliance on cloud compute. Local neural inference pipelines utilizing
                  TensorFlow Lite, Google Coral Edge TPUs, and DeepSeek INT4/INT8 quantized models.
                </p>
                <div class="divide-y divide-border-grid bg-surface-container border border-border-grid rounded-[2px] mb-5 font-mono text-[11px]">
                  <div class="flex justify-between px-3 py-2 text-on-surface-variant">
                    <span>Quantized Footprint</span>
                    <span class="text-on-surface font-bold tabular-nums">1.8 GB (Edge TPU)</span>
                  </div>
                  <div class="flex justify-between px-3 py-2 text-on-surface-variant">
                    <span>Inference Latency</span>
                    <span class="text-signal-success font-bold tabular-nums">4.2 ms / frame</span>
                  </div>
                  <div class="flex justify-between px-3 py-2 text-on-surface-variant">
                    <span>Cloud Dependency</span>
                    <span class="text-mode-drive font-bold tabular-nums">0.0% (Airgapped)</span>
                  </div>
                </div>
              </div>
              <a
                routerLink="/ai-ml-drive"
                class="inline-flex items-center gap-1.5 font-mono text-[12px] font-bold uppercase text-mode-drive hover:underline transition-colors pt-2"
              >
                <span>Inspect Neural Inference Benchmarks</span>
                <mat-icon class="text-[16px]">arrow_forward</mat-icon>
              </a>
            </div>

            <!-- Division 3 -->
            <div class="bg-canvas-pure border border-border-grid rounded-[4px] p-6 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between pb-4 mb-4 border-b border-border-grid">
                  <div class="w-10 h-10 rounded-[2px] bg-tertiary-fixed border border-mode-fly/40 text-mode-fly flex items-center justify-center">
                    <mat-icon class="text-[22px]">radar</mat-icon>
                  </div>
                  <span class="font-mono text-[10px] px-2.5 py-0.5 rounded-[2px] bg-surface-container border border-border-grid text-on-surface font-bold">
                    DIV-03 // FLY
                  </span>
                </div>
                <h3 class="font-display text-[26px] font-bold uppercase text-on-surface mb-2">
                  Spatial SLAM &amp; Flight Navigation
                </h3>
                <p class="text-[14px] leading-6 text-on-surface-variant mb-4">
                  Multimodal LiDAR-depth fusion, visual-inertial odometry (VIO), and microsecond
                  trajectory generation for indoor GPS-denied aerial maneuvers.
                </p>
                <div class="divide-y divide-border-grid bg-surface-container border border-border-grid rounded-[2px] mb-5 font-mono text-[11px]">
                  <div class="flex justify-between px-3 py-2 text-on-surface-variant">
                    <span>Pose Estimation Rate</span>
                    <span class="text-on-surface font-bold tabular-nums">500 Hz VIO</span>
                  </div>
                  <div class="flex justify-between px-3 py-2 text-on-surface-variant">
                    <span>Point Cloud Density</span>
                    <span class="text-on-surface font-bold tabular-nums">120K pts/sec</span>
                  </div>
                  <div class="flex justify-between px-3 py-2 text-on-surface-variant">
                    <span>GPS-Denied Drift</span>
                    <span class="text-mode-fly font-bold tabular-nums">&lt; 0.8% trajectory</span>
                  </div>
                </div>
              </div>
              <a
                routerLink="/firefly-drone"
                class="inline-flex items-center gap-1.5 font-mono text-[12px] font-bold uppercase text-mode-fly hover:underline transition-colors pt-2"
              >
                <span>Review FireFly™ Aerial Architecture</span>
                <mat-icon class="text-[16px]">arrow_forward</mat-icon>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 03 / Empirical Research Repository -->
      <section class="w-full px-6 md:px-10 py-14 bg-surface border-b border-border-grid" id="research-repository">
        <div class="max-w-[1360px] mx-auto bg-canvas-pure border border-border-active rounded-[4px] p-6 md:p-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between pb-5 mb-6 border-b border-border-grid gap-4">
            <div>
              <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-primary font-bold">
                03 / EMPIRICAL REPOSITORY · PUBLICATIONS &amp; CONCEPT KITS
              </span>
              <h2 class="font-display text-[34px] sm:text-[40px] leading-none font-bold uppercase text-on-surface mt-1.5">
                ZoeRobo Empirical Research Repository
              </h2>
            </div>
            <div class="flex flex-wrap items-center gap-1.5 bg-surface-container border border-border-grid p-1 rounded-[2px]">
              <button
                type="button"
                (click)="setRepoFilter('all')"
                class="px-3.5 py-1.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                [class.bg-primary]="repoFilter() === 'all'"
                [class.text-on-primary]="repoFilter() === 'all'"
                [class.text-on-surface-variant]="repoFilter() !== 'all'"
                [class.hover:bg-canvas-pure]="repoFilter() !== 'all'"
              >
                All Records
              </button>
              <button
                type="button"
                (click)="setRepoFilter('papers')"
                class="px-3.5 py-1.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                [class.bg-primary]="repoFilter() === 'papers'"
                [class.text-on-primary]="repoFilter() === 'papers'"
                [class.text-on-surface-variant]="repoFilter() !== 'papers'"
                [class.hover:bg-canvas-pure]="repoFilter() !== 'papers'"
              >
                Papers
              </button>
              <button
                type="button"
                (click)="setRepoFilter('telemetry')"
                class="px-3.5 py-1.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                [class.bg-primary]="repoFilter() === 'telemetry'"
                [class.text-on-primary]="repoFilter() === 'telemetry'"
                [class.text-on-surface-variant]="repoFilter() !== 'telemetry'"
                [class.hover:bg-canvas-pure]="repoFilter() !== 'telemetry'"
              >
                Telemetry Kits
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            @for (record of filteredRecords(); track record.id) {
              <article
                class="p-6 rounded-[4px] bg-surface-container border border-border-grid hover:border-border-active transition-colors flex flex-col justify-between"
              >
                <div>
                  <div class="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-border-grid font-mono text-[10px]">
                    <span
                      class="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] border font-bold uppercase"
                      [class.bg-tertiary-fixed]="record.mode === 'fly'"
                      [class.text-on-tertiary-fixed]="record.mode === 'fly'"
                      [class.border-mode-fly/40]="record.mode === 'fly'"
                      [class.bg-primary-container]="record.mode === 'run'"
                      [class.text-on-primary-container]="record.mode === 'run'"
                      [class.border-mode-run/40]="record.mode === 'run'"
                      [class.bg-secondary-fixed]="record.mode === 'drive' || record.mode === 'swarm'"
                      [class.text-on-secondary-fixed]="record.mode === 'drive' || record.mode === 'swarm'"
                      [class.border-mode-drive/40]="record.mode === 'drive' || record.mode === 'swarm'"
                    >
                      <mat-icon class="text-[14px]">{{ record.icon }}</mat-icon>
                      <span>{{ record.domainLabel }}</span>
                    </span>
                    <span class="text-outline font-semibold">{{ record.refCode }}</span>
                  </div>
                  <h3 class="font-display text-[26px] leading-7 font-bold uppercase text-on-surface mb-2">
                    {{ record.title }}
                  </h3>
                  <p class="text-[14px] leading-6 text-on-surface-variant mb-4">
                    {{ record.summary }}
                  </p>
                  <div class="flex flex-wrap gap-1.5 mb-4">
                    @for (tag of record.tags; track tag) {
                      <span class="px-2 py-0.5 rounded-[2px] bg-canvas-pure border border-border-grid text-on-surface font-mono text-[10px]">
                        {{ tag }}
                      </span>
                    }
                  </div>
                </div>
                <div class="flex items-center justify-between pt-3 border-t border-border-grid">
                  <span class="font-mono text-[11px] text-on-surface-variant uppercase">
                    {{ record.author }}
                  </span>
                  <button
                    type="button"
                    (click)="openRecord(record)"
                    class="font-mono text-[11px] text-primary hover:text-primary-hover font-bold uppercase inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{{ record.ctaLabel }}</span>
                    <mat-icon class="text-[15px]">open_in_new</mat-icon>
                  </button>
                </div>
              </article>
            }
          </div>
        </div>
      </section>

      <!-- 04 / Prototyping Bench & Real-Time Neural Inference -->
      <section class="w-full px-6 md:px-10 py-14 bg-canvas-subtle border-b border-border-grid">
        <div class="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-7 bg-canvas-pure border border-border-active rounded-[4px] p-6 flex flex-col justify-between gap-5">
            <div>
              <div class="flex items-center justify-between pb-3 mb-3 border-b border-border-grid font-mono text-[10px]">
                <span class="uppercase tracking-wider text-outline font-bold">04 / HARDWARE TEST RIG · TELEMETRY RUN</span>
                <span class="inline-flex items-center gap-1.5 text-signal-success font-bold">
                  <span class="w-2 h-2 rounded-full bg-signal-success"></span>
                  LIVE BENCH
                </span>
              </div>
              <h2 class="font-display text-[28px] font-bold uppercase text-on-surface mb-1.5">
                Empirical Prototyping Laboratory
              </h2>
              <p class="text-[14px] leading-6 text-on-surface-variant mb-4">
                Measurement workstations featuring oscilloscopes, thermal imaging cameras,
                dynamometers, and motion capture trackers verifying zero kinematic jitter under
                high-load quadruped gait cycles.
              </p>
              <div class="rounded-[2px] overflow-hidden bg-canvas-muted border border-border-grid">
                <img
                  [src]="images.workbenchRig"
                  alt="Close up of robotics hardware testing workbench with custom circuit boards, carbon fiber actuators, and digital oscilloscope"
                  referrerpolicy="no-referrer"
                  class="w-full h-56 object-cover"
                />
              </div>
            </div>
            <div class="grid grid-cols-3 divide-x divide-border-grid border border-border-grid rounded-[2px] bg-surface-container font-mono text-center">
              <div class="p-3">
                <div class="text-[10px] text-outline uppercase">TORQUE PEAK</div>
                <div class="font-bold text-on-surface text-[15px] tabular-nums">45.2 Nm</div>
              </div>
              <div class="p-3">
                <div class="text-[10px] text-outline uppercase">THERMAL DRIFT</div>
                <div class="font-bold text-signal-success text-[15px] tabular-nums">&lt; 1.2°C</div>
              </div>
              <div class="p-3">
                <div class="text-[10px] text-outline uppercase">BUS VOLTAGE</div>
                <div class="font-bold text-mode-run text-[15px] tabular-nums">48.0 VDC</div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 bg-canvas-pure border border-border-active rounded-[4px] p-6 flex flex-col justify-between gap-5">
            <div>
              <div class="flex items-center justify-between pb-3 mb-3 border-b border-border-grid font-mono text-[10px]">
                <span class="uppercase tracking-wider text-outline font-bold">EDGE TPU NEURAL PIPELINE</span>
                <span class="px-2 py-0.5 rounded-[2px] bg-primary-container border border-primary/40 text-on-primary-container font-bold">
                  INT8 QUANT
                </span>
              </div>
              <h2 class="font-display text-[28px] font-bold uppercase text-on-surface mb-1.5">
                Real-Time Neural Inference
              </h2>
              <p class="text-[14px] leading-6 text-on-surface-variant mb-4">
                Telemetry trace measuring localized bounding box predictions and deterministic path
                planning on embedded silicon without cloud round-trips.
              </p>

              <div class="bg-canvas-pure industrial-grid rounded-[2px] p-4 border border-border-active">
                <div class="flex justify-between items-center font-mono text-[10px] text-outline mb-2">
                  <span class="font-semibold">LATENCY HISTORY (100 CYCLES)</span>
                  <span class="text-signal-success font-bold tabular-nums">STABLE 4.2ms</span>
                </div>
                <svg class="w-full h-24" fill="none" viewBox="0 0 300 80">
                  <path d="M0 20 H300 M0 40 H300 M0 60 H300" stroke="#C9CFCE" stroke-dasharray="3 3" stroke-width="1" />
                  <path
                    d="M0,60 Q25,50 50,55 T100,45 T150,48 T200,40 T250,42 T300,38"
                    fill="none"
                    stroke="#D8662D"
                    stroke-width="2.5"
                  />
                  <circle cx="200" cy="40" fill="#20272B" r="3.5" />
                  <circle cx="300" cy="38" fill="#D8662D" r="4" />
                </svg>
                <div class="flex justify-between font-mono text-[10px] text-on-surface-variant pt-2 border-t border-border-grid mt-2">
                  <span>T0 (Camera)</span>
                  <span>T+2.1ms (TFLite)</span>
                  <span>T+4.2ms (Actuation)</span>
                </div>
              </div>
            </div>

            <div class="p-4 rounded-[2px] bg-surface-container-high border border-border-grid text-on-surface">
              <div class="flex items-center gap-2">
                <mat-icon class="text-primary text-[20px]">psychology</mat-icon>
                <span class="font-mono text-[12px] font-bold uppercase">DeepSeek Micro-Agent Firmware</span>
              </div>
              <p class="text-[13px] leading-5 text-on-surface-variant mt-1.5">
                Autonomous decision heuristics run directly on the companion SoC, streaming verified
                waypoint vectors to ROS2 navigation stacks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 05 / Lab Outreach & Inquiry Form -->
      <section class="w-full px-6 md:px-10 py-14 bg-surface border-b border-border-grid scroll-mt-24" id="contact-labs">
        <div class="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Left: Lab Dispatch Info -->
          <div class="lg:col-span-5 bg-canvas-pure border border-border-active rounded-[4px] p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-primary font-bold">
                05 / LAB OUTREACH · ACADEMIC &amp; FIELD INQUIRIES
              </span>
              <h2 class="font-display text-[34px] leading-none font-bold uppercase text-on-surface mt-1.5 mb-4">
                Connect with ZoeRobo Engineering
              </h2>
              <p class="text-[14px] leading-6 text-on-surface-variant mb-6">
                We partner with university robotics laboratories, aerospace research groups, and
                industrial teams seeking field-tested hardware and open-source autonomy modules.
              </p>

              <div class="space-y-3">
                <div class="flex items-start gap-3 p-4 rounded-[2px] bg-surface-container border border-border-grid">
                  <mat-icon class="text-primary text-[22px] mt-0.5">alternate_email</mat-icon>
                  <div>
                    <div class="font-mono text-[10px] text-outline uppercase tracking-wider font-semibold">
                      Official Inquiries &amp; Paper Reprints
                    </div>
                    <a
                      href="mailto:info@zoerobo.com"
                      class="font-mono text-[14px] text-on-surface font-bold hover:text-primary transition-colors"
                    >
                      info&#64;zoerobo.com
                    </a>
                    <p class="text-[12px] text-on-surface-variant mt-0.5">
                      Direct dispatch from our primary engineering lab.
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3 p-4 rounded-[2px] bg-surface-container border border-border-grid">
                  <mat-icon class="text-mode-run text-[22px] mt-0.5">domain</mat-icon>
                  <div>
                    <div class="font-mono text-[10px] text-outline uppercase tracking-wider font-semibold">
                      YLabZ Primary Cleanroom
                    </div>
                    <div class="font-mono text-[13px] text-on-surface font-bold">
                      Autonomous Systems Research Facility
                    </div>
                    <p class="text-[12px] text-on-surface-variant mt-0.5">
                      Silicon Valley Engineering Hub · Hardware Prototyping Bay
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3 p-4 rounded-[2px] bg-surface-container border border-border-grid">
                  <mat-icon class="text-mode-fly text-[22px] mt-0.5">flight_takeoff</mat-icon>
                  <div>
                    <div class="font-mono text-[10px] text-outline uppercase tracking-wider font-semibold">
                      Flight Test Proving Grounds
                    </div>
                    <div class="font-mono text-[13px] text-on-surface font-bold">
                      UAS GPS-Denied Evaluation Range
                    </div>
                    <p class="text-[12px] text-on-surface-variant mt-0.5">
                      High-wind outdoor aerial proving facility · Range 04-West
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-6 mt-6 border-t border-border-grid">
              <div class="font-mono text-[10px] text-outline uppercase">PUBLIC PGP / CODE REPOSITORIES</div>
              <div class="font-mono text-[12px] text-on-surface font-semibold mt-1">
                GITHUB: zoerobo/open-autonomy-stack
              </div>
            </div>
          </div>

          <!-- Right: Squared Reactive Form -->
          <div class="lg:col-span-7 bg-canvas-pure border border-border-active rounded-[4px] p-6 md:p-8">
            <div class="flex items-center justify-between pb-4 mb-5 border-b border-border-grid">
              <div>
                <h3 class="font-display text-[26px] font-bold uppercase text-on-surface">
                  Developer &amp; Researcher Outreach
                </h3>
                <p class="text-[13px] text-on-surface-variant">
                  Submit project requirements, hardware kit allocations, or research collaboration
                  requests.
                </p>
              </div>
              <span class="hidden sm:inline-flex px-2.5 py-1 rounded-[2px] bg-surface-container border border-border-grid text-on-surface font-mono text-[10px] font-bold">
                TLS 1.3 ENCRYPTED
              </span>
            </div>

            <form [formGroup]="inquiryForm" (ngSubmit)="onSubmitInquiry()" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="font-mono text-[10px] font-bold text-on-surface uppercase tracking-wider block" for="contact-name">
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    formControlName="fullName"
                    placeholder="Dr. Elena Rostova"
                    class="w-full px-3.5 py-2.5 rounded-[2px] bg-canvas-pure border border-border-active text-on-surface text-[13px] placeholder:text-outline focus:outline-none focus:border-primary"
                  />
                </div>
                <div class="space-y-1.5">
                  <label class="font-mono text-[10px] font-bold text-on-surface uppercase tracking-wider block" for="contact-org">
                    Institution / Organization *
                  </label>
                  <input
                    id="contact-org"
                    type="text"
                    formControlName="organization"
                    placeholder="MIT Robotics Laboratory / Industry Partner"
                    class="w-full px-3.5 py-2.5 rounded-[2px] bg-canvas-pure border border-border-active text-on-surface text-[13px] placeholder:text-outline focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="font-mono text-[10px] font-bold text-on-surface uppercase tracking-wider block" for="contact-email">
                    Institutional Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    formControlName="email"
                    placeholder="e.rostova@mit.edu"
                    class="w-full px-3.5 py-2.5 rounded-[2px] bg-canvas-pure border border-border-active text-on-surface text-[13px] placeholder:text-outline focus:outline-none focus:border-primary"
                  />
                </div>
                <div class="space-y-1.5">
                  <label class="font-mono text-[10px] font-bold text-on-surface uppercase tracking-wider block" for="contact-domain">
                    Research Interest *
                  </label>
                  <select
                    id="contact-domain"
                    formControlName="domain"
                    class="w-full px-3.5 py-2.5 rounded-[2px] bg-canvas-pure border border-border-active text-on-surface text-[13px] focus:outline-none focus:border-primary"
                  >
                    <option value="jaguar">Jag.U.R™ Quadruped Kinematics &amp; Gait</option>
                    <option value="firefly">FireFly™ Autonomous UAS &amp; VIO</option>
                    <option value="edge-ai">Edge TPU Neural Inference &amp; DeepSeek Local</option>
                    <option value="lego-av">Miniature Autonomous Fleet (Pixelopolis / LEGO)</option>
                    <option value="sdk">ZoeRobo ROS2 Driver &amp; Firmware SDK</option>
                  </select>
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="font-mono text-[10px] font-bold text-on-surface uppercase tracking-wider block" for="contact-message">
                  Research Objectives &amp; Collaboration Scope *
                </label>
                <textarea
                  id="contact-message"
                  rows="4"
                  formControlName="message"
                  placeholder="Describe your operational scenario, hardware evaluation requirements, or academic grant specifications..."
                  class="w-full px-3.5 py-2.5 rounded-[2px] bg-canvas-pure border border-border-active text-on-surface text-[13px] placeholder:text-outline focus:outline-none focus:border-primary"
                ></textarea>
              </div>

              @if (formError()) {
                <div class="p-3 rounded-[2px] bg-error-container border border-error/40 text-on-error-container font-mono text-[11px] flex items-center gap-2">
                  <mat-icon class="text-[18px]">error_outline</mat-icon>
                  <span>Please complete all required fields with a valid institutional email.</span>
                </div>
              }

              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-border-grid">
                <div class="text-on-surface-variant font-mono text-[10px] flex items-center gap-1.5">
                  <mat-icon class="text-[16px] text-primary">info</mat-icon>
                  <span>Dispatches route directly to ZoeRobo engineering chairs.</span>
                </div>
                <button
                  type="submit"
                  class="w-full sm:w-auto px-6 py-3 rounded-[2px] bg-primary hover:bg-primary-hover text-on-primary font-mono text-[12px] font-semibold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Transmit Inquiry</span>
                  <mat-icon class="text-[16px]">send</mat-icon>
                </button>
              </div>

              @if (formSubmitted()) {
                <div class="p-4 rounded-[2px] bg-surface-container border border-signal-success text-signal-success font-mono text-[11px] font-semibold flex items-center gap-2.5">
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

      <!-- 06 / Technical Knowledge Base FAQ -->
      <section class="w-full px-6 md:px-10 py-14 bg-canvas-subtle">
        <div class="max-w-[1360px] mx-auto bg-canvas-pure border border-border-active rounded-[4px] p-6 md:p-8">
          <div class="pb-5 mb-6 border-b border-border-grid">
            <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-mode-fly font-bold">
              06 / TECHNICAL KNOWLEDGE BASE
            </span>
            <h2 class="font-display text-[34px] sm:text-[40px] leading-none font-bold uppercase text-on-surface mt-1.5">
              Frequently Asked Questions
            </h2>
            <p class="text-[14px] text-on-surface-variant mt-1.5">
              Direct engineering specifications regarding open-source hardware kits, ROS2
              compatibility, and laboratory availability.
            </p>
          </div>

          <div class="divide-y divide-border-grid border border-border-grid rounded-[2px]">
            @for (faq of faqs; track faq.id) {
              <div class="bg-canvas-pure hover:bg-surface-container/60 transition-colors">
                <button
                  type="button"
                  (click)="toggleFaq(faq.id)"
                  class="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer"
                  [attr.aria-expanded]="openFaqId() === faq.id"
                >
                  <span class="font-display text-[22px] font-bold uppercase text-on-surface">
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
                  <div class="px-5 pb-4 pt-1 text-[14px] leading-6 text-on-surface-variant border-t border-border-grid/60 bg-surface-container">
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
