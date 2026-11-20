import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {
  JAGUR_SPECS,
  RESEARCH_RECORDS,
  ResearchRecord,
  ZOEROBO_IMAGES,
} from '../../data/zoerobo.data';
import { PaperModal } from '../../components/paper-modal/paper-modal';

type JagurMode = 'recon' | 'heavy' | 'sprint';

interface JagurProfile {
  label: string;
  indicator: string;
  indicatorColorClass: string;
  torque: string;
  runtime: string;
  payload: string;
  wavePrimary: string;
  waveSecondary: string;
  waveStroke: string;
  temps: { fl: string; fr: string; rl: string; rr: string };
  operatorNote: string;
}

const JAGUR_PROFILES: Record<JagurMode, JagurProfile> = {
  recon: {
    label: 'RECON SCOUT',
    indicator: 'MODE: RECON SCOUT (LOW DORSAL LOAD)',
    indicatorColorClass: 'text-mode-run',
    torque: '48.2',
    runtime: '2.6',
    payload: '6.5',
    wavePrimary:
      'M0,50 Q40,10 80,50 T160,50 T240,50 T320,50 T400,50 T480,50 T500,50',
    waveSecondary:
      'M0,50 Q40,90 80,50 T160,50 T240,50 T320,50 T400,50 T480,50 T500,50',
    waveStroke: '#D8662D',
    temps: { fl: '42°C', fr: '43°C', rl: '46°C', rr: '45°C' },
    operatorNote:
      'Adaptive terrain estimator switched leg compliance parameters from tarmac hard-deck to loose gravel dispersion profile in under 14 milliseconds.',
  },
  heavy: {
    label: 'HEAVY UTILITY',
    indicator: 'MODE: HEAVY UTILITY (15KG MAX DORSAL)',
    indicatorColorClass: 'text-mode-drive',
    torque: '112.4',
    runtime: '1.8',
    payload: '15.0',
    wavePrimary:
      'M0,50 Q40,2 80,50 T160,50 T240,50 T320,50 T400,50 T480,50 T500,50',
    waveSecondary:
      'M0,50 Q40,98 80,50 T160,50 T240,50 T320,50 T400,50 T480,50 T500,50',
    waveStroke: '#2864A5',
    temps: { fl: '51°C', fr: '52°C', rl: '55°C', rr: '54°C' },
    operatorNote:
      'High-torque harmonic gearpack bias engaged for 15 kg NATO rail dorsal load. Center-of-mass compensated automatically across 35° industrial stairs.',
  },
  sprint: {
    label: 'EXTREME SPRINT',
    indicator: 'MODE: EXTREME SPRINT (4.5 M/S HIGH FREQ)',
    indicatorColorClass: 'text-signal-alert',
    torque: '89.6',
    runtime: '1.2',
    payload: '3.0',
    wavePrimary:
      'M0,50 Q20,15 40,50 T80,50 T120,50 T160,50 T200,50 T240,50 T280,50 T320,50 T360,50 T400,50 T440,50 T480,50 T500,50',
    waveSecondary:
      'M0,50 Q20,85 40,50 T80,50 T120,50 T160,50 T200,50 T240,50 T280,50 T320,50 T360,50 T400,50 T440,50 T480,50 T500,50',
    waveStroke: '#C63D32',
    temps: { fl: '57°C', fr: '58°C', rl: '60°C', rr: '59°C' },
    operatorNote:
      'Dynamic bounding gait active at 4.5 m/s (16.2 km/h). Proprioceptive slip limiter regulating peak foot contact force below 450N.',
  },
};

@Component({
  selector: 'app-jagur-robot',
  imports: [RouterLink, MatIconModule, PaperModal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col w-full bg-surface text-on-surface">
      <!-- Top Technical Subsystem Strip -->
      <section class="w-full bg-canvas-pure border-b border-border-grid px-6 md:px-10 py-2.5">
        <div
          class="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] tracking-[0.06em]"
        >
          <div class="flex flex-wrap items-center gap-2.5">
            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-primary-container border border-mode-run/40 text-on-primary-container font-bold uppercase"
            >
              <span class="w-2 h-2 rounded-full bg-mode-run"></span>
              SYS.RUN // ONLINE
            </span>
            <span class="text-border-active">|</span>
            <span class="text-on-surface font-semibold">UNIT: ZR-RUN-001 · TERRA-MECH</span>
            <span class="text-border-active hidden sm:inline">|</span>
            <span class="hidden sm:inline text-outline">OUTDOOR ROBOTICS TEST FACILITY</span>
          </div>
          <div class="flex items-center gap-4 text-on-surface-variant tabular-nums">
            <div class="flex items-center gap-1">
              <span class="text-signal-success font-bold">99.8%</span>
              <span class="text-outline">SLIP STABILITY</span>
            </div>
            <div class="hidden sm:flex items-center gap-1">
              <span class="text-mode-drive font-bold">18 DOF</span>
              <span class="text-outline">ACTIVE DORSAL</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-signal-warning font-bold">58°C</span>
              <span class="text-outline">ACTUATOR BUS</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 01 / Quadruped Architecture Hero -->
      <section class="w-full px-6 md:px-10 py-10 bg-surface industrial-grid border-b border-border-grid">
        <div class="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <!-- Hero Narrative & Acronym Breakdown -->
          <div
            class="lg:col-span-6 flex flex-col justify-between space-y-6 bg-canvas-pure border border-border-active p-6 md:p-7 rounded-[4px]"
          >
            <div class="space-y-4">
              <div class="flex flex-wrap items-center gap-2">
                <span class="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-mode-run">
                  01 / QUADRUPED ARCHITECTURE
                </span>
                <span class="text-border-active">·</span>
                <span class="px-2.5 py-0.5 rounded-[2px] bg-primary-container border border-mode-run/40 text-on-primary-container font-mono text-[10px] uppercase tracking-wider font-bold">
                  AUTONOMOUS QUADRUPED
                </span>
                <span class="px-2 py-0.5 rounded-[2px] bg-surface-container border border-border-grid text-on-surface-variant font-mono text-[10px] font-semibold">
                  MIL-STD-810H REF
                </span>
              </div>

              <div class="space-y-1.5">
                <h1 class="font-display text-[46px] sm:text-[58px] leading-[1.0] font-bold uppercase text-on-surface tracking-[-0.02em]">
                  Jag.U.R<span class="text-mode-run">™</span> Utility Robot
                </h1>
                <p class="font-display text-[24px] leading-7 uppercase text-mode-run font-semibold">
                  Journey Agile Guiding — Utility Robot
                </p>
              </div>

              <p class="text-[16px] leading-7 text-on-surface-variant max-w-xl">
                Engineered for high-tempo all-terrain traversing, hazardous infrastructure
                reconnaissance, and autonomous remote payload intervention. Jag.U.R pairs
                articulated sub-millimeter leg kinetics with 360° omni-directional perception.
              </p>

              <!-- Acronym Semantic Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div class="p-3 rounded-[2px] bg-surface-container border border-border-grid">
                  <span class="font-mono text-[10px] text-mode-run font-bold block uppercase">J // JOURNEY</span>
                  <span class="text-[12px] leading-4 text-on-surface-variant mt-1 block">Continuous rough terrain transit</span>
                </div>
                <div class="p-3 rounded-[2px] bg-surface-container border border-border-grid">
                  <span class="font-mono text-[10px] text-mode-run font-bold block uppercase">A // AGILE</span>
                  <span class="text-[12px] leading-4 text-on-surface-variant mt-1 block">18-DOF dynamic torque response</span>
                </div>
                <div class="p-3 rounded-[2px] bg-surface-container border border-border-grid">
                  <span class="font-mono text-[10px] text-mode-run font-bold block uppercase">G // GUIDING</span>
                  <span class="text-[12px] leading-4 text-on-surface-variant mt-1 block">Real-time stereo + LiDAR SLAM</span>
                </div>
                <div class="p-3 rounded-[2px] bg-surface-container border border-border-grid">
                  <span class="font-mono text-[10px] text-mode-run font-bold block uppercase">U.R // UTILITY</span>
                  <span class="text-[12px] leading-4 text-on-surface-variant mt-1 block">Modular dorsal payload interface</span>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-border-grid flex flex-wrap items-center gap-3">
              <a
                routerLink="/info-and-research"
                fragment="contact-labs"
                class="px-5 py-2.5 rounded-[2px] bg-mode-run hover:bg-primary-hover text-on-primary font-mono text-[12px] uppercase tracking-wider font-semibold transition-colors flex items-center gap-2"
              >
                <mat-icon class="text-[18px]">engineering</mat-icon>
                <span>Request Field Demo</span>
              </a>
              <button
                type="button"
                (click)="downloadDatasheet()"
                class="px-4 py-2.5 rounded-[2px] bg-canvas-pure border border-border-active text-on-surface font-mono text-[12px] uppercase tracking-wider font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-2 cursor-pointer"
              >
                <mat-icon class="text-mode-run text-[18px]">download</mat-icon>
                <span>{{ datasheetExported() ? 'Datasheet Downloaded' : 'Technical Datasheet' }}</span>
              </button>
              <a
                routerLink="/documentation"
                class="px-4 py-2.5 rounded-[2px] bg-surface-container border border-border-grid text-on-surface font-mono text-[12px] uppercase tracking-wider font-semibold hover:border-mode-run hover:text-mode-run transition-colors flex items-center gap-1.5"
              >
                <mat-icon class="text-[16px]">terminal</mat-icon>
                <span>SDK v4.2</span>
              </a>
            </div>
          </div>

          <!-- Hero Visual Instrument Frame (Bright Photo + Solid White Caption Strip) -->
          <div
            class="lg:col-span-6 rounded-[4px] overflow-hidden bg-canvas-pure border border-border-active flex flex-col justify-between"
          >
            <div class="px-4 py-2.5 bg-canvas-pure border-b border-border-grid flex flex-wrap items-center justify-between gap-2 font-mono text-[10px]">
              <span class="text-mode-run font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-mode-run"></span>
                SURFACE RECON // ACTIVE RUN STEPPING
              </span>
              <span class="text-on-surface-variant font-semibold tabular-nums">FPS: 120 · LATENCY: 2.1ms</span>
            </div>

            <div class="relative flex-1 min-h-[260px] bg-canvas-muted overflow-hidden">
              <img
                [src]="images.jagurHero"
                alt="Jag.U.R autonomous quadruped robot dog on outdoor industrial robotics test facility"
                referrerpolicy="no-referrer"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="p-4 bg-canvas-pure border-t border-border-active space-y-2">
              <p class="text-[13px] leading-5 text-on-surface">
                <strong>Field Session 884-G:</strong> Sub-surface rubble compliance with dual
                harmonic planetary gearpacks and adaptive neural reflex torque limiter.
              </p>
              <div class="grid grid-cols-3 gap-2 pt-2 border-t border-border-grid text-on-surface-variant font-mono text-[10px] uppercase">
                <div><span class="text-outline">LOAD:</span> <strong class="text-on-surface">12.4 kg</strong></div>
                <div><span class="text-outline">TRACK:</span> <strong class="text-on-surface">UNPAVED RUBBLE</strong></div>
                <div><span class="text-outline">HDG:</span> <strong class="text-on-surface">324° NW</strong></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Metric Telemetry Ribbon -->
        <div class="max-w-[1360px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div class="bg-canvas-pure border border-border-grid p-4 rounded-[4px]">
            <div class="flex items-center justify-between text-outline font-mono text-[10px] uppercase font-semibold">
              <span>TOP SPRINT SPEED</span>
              <mat-icon class="text-mode-run text-[18px]">speed</mat-icon>
            </div>
            <div class="mt-2 flex items-baseline gap-1.5">
              <span class="font-display text-[40px] leading-none font-bold text-on-surface tabular-nums">4.5</span>
              <span class="font-mono text-[12px] text-on-surface-variant">m/s (16.2 km/h)</span>
            </div>
            <p class="text-[12px] text-on-surface-variant mt-1.5">
              Dynamic trotting gait over 35° incline obstacles.
            </p>
          </div>

          <div class="bg-canvas-pure border border-border-grid p-4 rounded-[4px]">
            <div class="flex items-center justify-between text-outline font-mono text-[10px] uppercase font-semibold">
              <span>RUN-TIME ENDURANCE</span>
              <mat-icon class="text-mode-fly text-[18px]">battery_charging_full</mat-icon>
            </div>
            <div class="mt-2 flex items-baseline gap-1.5">
              <span class="font-display text-[40px] leading-none font-bold text-on-surface tabular-nums">2.5</span>
              <span class="font-mono text-[12px] text-on-surface-variant">Hours</span>
            </div>
            <p class="text-[12px] text-on-surface-variant mt-1.5">
              Dual hot-swappable LiFePO4 48V packs under load.
            </p>
          </div>

          <div class="bg-canvas-pure border border-border-grid p-4 rounded-[4px]">
            <div class="flex items-center justify-between text-outline font-mono text-[10px] uppercase font-semibold">
              <span>DEGREES OF FREEDOM</span>
              <mat-icon class="text-mode-drive text-[18px]">settings_input_component</mat-icon>
            </div>
            <div class="mt-2 flex items-baseline gap-1.5">
              <span class="font-display text-[40px] leading-none font-bold text-on-surface tabular-nums">18</span>
              <span class="font-mono text-[12px] text-on-surface-variant">Active DOF</span>
            </div>
            <p class="text-[12px] text-on-surface-variant mt-1.5">
              12 leg joint actuators + 6 dorsal gimbal points.
            </p>
          </div>

          <div class="bg-canvas-pure border border-border-grid p-4 rounded-[4px]">
            <div class="flex items-center justify-between text-outline font-mono text-[10px] uppercase font-semibold">
              <span>ENVIRONMENT RATING</span>
              <mat-icon class="text-signal-success text-[18px]">water_drop</mat-icon>
            </div>
            <div class="mt-2 flex items-baseline gap-1.5">
              <span class="font-display text-[40px] leading-none font-bold text-on-surface">IP67</span>
              <span class="font-mono text-[12px] text-on-surface-variant">Submersible</span>
            </div>
            <p class="text-[12px] text-on-surface-variant mt-1.5">
              Hermetic seals against salt fog, jet spray, and silt.
            </p>
          </div>
        </div>
      </section>

      <!-- 02 / Core Capabilities Breakdown -->
      <section class="w-full px-6 md:px-10 py-14 bg-canvas-subtle border-b border-border-grid">
        <div class="max-w-[1360px] mx-auto">
          <div class="space-y-1.5 mb-8 pb-5 border-b border-border-grid">
            <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-mode-run font-bold">
              02 / TRI-PILLAR KINETIC FRAMEWORK
            </span>
            <h2 class="font-display text-[36px] sm:text-[42px] leading-none font-bold uppercase text-on-surface">
              Core Capabilities Breakdown
            </h2>
            <p class="text-[15px] leading-6 text-on-surface-variant max-w-2xl">
              Engineered for resilient mechanical execution in industrial terrain where wheeled
              access fails and tracked rovers become high-drag liabilities.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Pillar 1 -->
            <div class="bg-canvas-pure border border-border-grid rounded-[4px] p-6 flex flex-col justify-between space-y-5">
              <div class="space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-border-grid">
                  <span class="px-2.5 py-0.5 rounded-[2px] bg-primary-container border border-mode-run/40 text-on-primary-container font-mono text-[10px] font-bold">
                    CAPABILITY 01 // KINEMATICS
                  </span>
                  <mat-icon class="text-mode-run">directions_run</mat-icon>
                </div>
                <div class="space-y-1.5">
                  <h3 class="font-display text-[26px] font-bold uppercase text-on-surface">RUN &amp; Traverse</h3>
                  <p class="text-[13px] leading-5 text-on-surface-variant">
                    High-torque brushless servo actuators with millisecond-grade impedance control
                    ensure rapid balance recovery and zero-lag foot placement.
                  </p>
                </div>
                <ul class="space-y-2 text-[13px] leading-5 text-on-surface">
                  <li class="flex items-start gap-2 p-2.5 rounded-[2px] bg-surface-container border border-border-grid">
                    <mat-icon class="text-mode-run text-[18px] shrink-0">check_circle</mat-icon>
                    <span><strong>Dynamic Gait Stabilization:</strong> Instant transition between bounding, trotting, and crawl walking over shifting gravel.</span>
                  </li>
                  <li class="flex items-start gap-2 p-2.5 rounded-[2px] bg-surface-container border border-border-grid">
                    <mat-icon class="text-mode-run text-[18px] shrink-0">check_circle</mat-icon>
                    <span><strong>Stair &amp; Steep Grade Ascent:</strong> Ascends 38° metal grate industrial stairs and 32cm vertical drops untethered.</span>
                  </li>
                  <li class="flex items-start gap-2 p-2.5 rounded-[2px] bg-surface-container border border-border-grid">
                    <mat-icon class="text-mode-run text-[18px] shrink-0">check_circle</mat-icon>
                    <span><strong>Harmonic Planetary Gearheads:</strong> Sub-arcminute backlash for responsive proprioceptive force reflection.</span>
                  </li>
                </ul>
              </div>
              <div class="p-3 rounded-[2px] bg-surface-container-high border border-border-active text-on-surface font-mono text-[11px] flex items-center justify-between">
                <span>MAX RUNNING TORQUE</span>
                <span class="font-bold text-mode-run tabular-nums">120 Nm / Joint</span>
              </div>
            </div>

            <!-- Pillar 2 -->
            <div class="bg-canvas-pure border border-border-grid rounded-[4px] p-6 flex flex-col justify-between space-y-5">
              <div class="space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-border-grid">
                  <span class="px-2.5 py-0.5 rounded-[2px] bg-tertiary-fixed border border-mode-fly/40 text-on-tertiary-fixed font-mono text-[10px] font-bold">
                    CAPABILITY 02 // COGNITION
                  </span>
                  <mat-icon class="text-mode-fly">radar</mat-icon>
                </div>
                <div class="space-y-1.5">
                  <h3 class="font-display text-[26px] font-bold uppercase text-on-surface">GUIDE &amp; Sense</h3>
                  <p class="text-[13px] leading-5 text-on-surface-variant">
                    360° situational perception enabling full autonomy without GPS reliance, GNSS
                    jamming immunity, and tactical target escorting.
                  </p>
                </div>
                <ul class="space-y-2 text-[13px] leading-5 text-on-surface">
                  <li class="flex items-start gap-2 p-2.5 rounded-[2px] bg-surface-container border border-border-grid">
                    <mat-icon class="text-mode-fly text-[18px] shrink-0">check_circle</mat-icon>
                    <span><strong>360° Solid-State LiDAR Dome:</strong> 1.2M points/second with 120-meter range for dense 3D point-cloud meshing.</span>
                  </li>
                  <li class="flex items-start gap-2 p-2.5 rounded-[2px] bg-surface-container border border-border-grid">
                    <mat-icon class="text-mode-fly text-[18px] shrink-0">check_circle</mat-icon>
                    <span><strong>Stereo Depth + Thermal Vision:</strong> Forward and rear RGB-D paired with FLIR thermal imaging for zero-light ops.</span>
                  </li>
                  <li class="flex items-start gap-2 p-2.5 rounded-[2px] bg-surface-container border border-border-grid">
                    <mat-icon class="text-mode-fly text-[18px] shrink-0">check_circle</mat-icon>
                    <span><strong>Autonomous Waypoint Guiding:</strong> Sub-centimeter SLAM path generation with dynamic person-following modes.</span>
                  </li>
                </ul>
              </div>
              <div class="p-3 rounded-[2px] bg-surface-container-high border border-border-active text-on-surface font-mono text-[11px] flex items-center justify-between">
                <span>PERCEPTION LATENCY</span>
                <span class="font-bold text-mode-fly tabular-nums">0.45 ms SLAM</span>
              </div>
            </div>

            <!-- Pillar 3 -->
            <div class="bg-canvas-pure border border-border-grid rounded-[4px] p-6 flex flex-col justify-between space-y-5">
              <div class="space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-border-grid">
                  <span class="px-2.5 py-0.5 rounded-[2px] bg-secondary-fixed border border-mode-drive/40 text-on-secondary-fixed font-mono text-[10px] font-bold">
                    CAPABILITY 03 // PAYLOAD
                  </span>
                  <mat-icon class="text-mode-drive">handyman</mat-icon>
                </div>
                <div class="space-y-1.5">
                  <h3 class="font-display text-[26px] font-bold uppercase text-on-surface">UTILITY &amp; Payload</h3>
                  <p class="text-[13px] leading-5 text-on-surface-variant">
                    Quick-release mechanical NATO rails coupled with CAN-FD and Gigabit Ethernet bus
                    turn the chassis into an adaptable field workstation.
                  </p>
                </div>
                <ul class="space-y-2 text-[13px] leading-5 text-on-surface">
                  <li class="flex items-start gap-2 p-2.5 rounded-[2px] bg-surface-container border border-border-grid">
                    <mat-icon class="text-mode-drive text-[18px] shrink-0">check_circle</mat-icon>
                    <span><strong>Dorsal Rail Bus Interface:</strong> Standardized mount accepts 15 kg payload without degrading active balance.</span>
                  </li>
                  <li class="flex items-start gap-2 p-2.5 rounded-[2px] bg-surface-container border border-border-grid">
                    <mat-icon class="text-mode-drive text-[18px] shrink-0">check_circle</mat-icon>
                    <span><strong>Robotic Manipulator Arm:</strong> Optional 6-DOF dexterous arm with magnetic gripper for valve turning and extraction.</span>
                  </li>
                  <li class="flex items-start gap-2 p-2.5 rounded-[2px] bg-surface-container border border-border-grid">
                    <mat-icon class="text-mode-drive text-[18px] shrink-0">check_circle</mat-icon>
                    <span><strong>Auxiliary Sensor Packs:</strong> Multi-gas sniffers, gamma radiation dosimeters, and ultrasonic leak detectors.</span>
                  </li>
                </ul>
              </div>
              <div class="p-3 rounded-[2px] bg-surface-container-high border border-border-active text-on-surface font-mono text-[11px] flex items-center justify-between">
                <span>MAX PAYLOAD RUN CAPACITY</span>
                <span class="font-bold text-mode-drive tabular-nums">15.0 kg Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 03 / Interactive Kinematic & Payload Profiler -->
      <section class="w-full px-6 md:px-10 py-14 bg-surface border-b border-border-grid" id="jagur-profiler">
        <div class="max-w-[1360px] mx-auto bg-canvas-pure border border-border-active rounded-[4px] p-6 md:p-8">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-5 mb-6 border-b border-border-grid gap-4">
            <div>
              <div class="flex items-center gap-2 font-mono text-[10px]">
                <span class="px-2.5 py-0.5 rounded-[2px] bg-primary-container border border-mode-run/40 text-on-primary-container font-bold uppercase">
                  03 / LIVE TELEMETRY LAB
                </span>
                <span class="text-outline font-semibold">EMULATOR v4.28</span>
              </div>
              <h2 class="font-display text-[30px] sm:text-[34px] font-bold uppercase text-on-surface mt-1">
                Jag.U.R Kinematic &amp; Payload Profiler
              </h2>
            </div>

            <div class="flex flex-wrap items-center gap-1.5 bg-surface-container border border-border-grid p-1 rounded-[2px]">
              @for (m of modes; track m.key) {
                <button
                  type="button"
                  (click)="setMode(m.key)"
                  class="px-3.5 py-2 rounded-[2px] font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  [class.bg-mode-run]="activeMode() === m.key"
                  [class.text-on-primary]="activeMode() === m.key"
                  [class.text-on-surface-variant]="activeMode() !== m.key"
                  [class.hover:bg-canvas-pure]="activeMode() !== m.key"
                >
                  {{ m.label }}
                </button>
              }
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <!-- Left: SVG Joint Load Waveform -->
            <div class="lg:col-span-7 bg-inverse-surface border border-border-grid rounded-[4px] p-5 space-y-4">
              <div class="flex items-center justify-between font-mono text-[11px]">
                <span class="text-on-surface font-bold flex items-center gap-1.5 uppercase">
                  <span class="w-2 h-2 rounded-full bg-signal-success"></span>
                  REAL-TIME QUADRUPED PROPRIOCEPTION
                </span>
                <span class="text-outline font-semibold tabular-nums">CYCLE RATE: 500 Hz</span>
              </div>

              <div class="w-full h-48 bg-canvas-pure industrial-grid border border-border-active rounded-[2px] p-4 flex flex-col justify-between">
                <div class="flex flex-wrap items-center justify-between gap-2 text-outline font-mono text-[10px]">
                  <span class="font-semibold">JOINT TORQUE VARIATION (Nm / RAD)</span>
                  <span class="font-bold" [class]="profile().indicatorColorClass">
                    {{ profile().indicator }}
                  </span>
                </div>
                <svg class="w-full h-24 overflow-visible" fill="none" viewBox="0 0 500 100">
                  <path d="M0 25 H500 M0 50 H500 M0 75 H500" stroke="#C9CFCE" stroke-dasharray="4 4" stroke-width="1" />
                  <path
                    [attr.d]="profile().wavePrimary"
                    fill="none"
                    [attr.stroke]="profile().waveStroke"
                    stroke-width="2.5"
                  />
                  <path
                    [attr.d]="profile().waveSecondary"
                    fill="none"
                    opacity="0.6"
                    stroke="#2864A5"
                    stroke-dasharray="3 3"
                    stroke-width="1.5"
                  />
                </svg>
                <div class="flex items-center justify-between font-mono text-[10px] text-on-surface-variant">
                  <span>0.0s (Stance)</span>
                  <span>0.25s (Lift Phase)</span>
                  <span>0.5s (Ground Impact)</span>
                  <span>0.75s (Stance Repeat)</span>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div class="bg-canvas-pure border border-border-grid p-3.5 rounded-[2px]">
                  <span class="font-mono text-[10px] text-outline block uppercase">FRONT KNEE TORQUE</span>
                  <span class="font-display text-[26px] text-on-surface font-bold tabular-nums">
                    {{ profile().torque }} <span class="font-mono text-[11px] text-outline font-normal">Nm</span>
                  </span>
                </div>
                <div class="bg-canvas-pure border border-border-grid p-3.5 rounded-[2px]">
                  <span class="font-mono text-[10px] text-outline block uppercase">ESTIMATED RUNTIME</span>
                  <span class="font-display text-[26px] text-mode-fly font-bold tabular-nums">
                    {{ profile().runtime }} <span class="font-mono text-[11px] text-outline font-normal">Hours</span>
                  </span>
                </div>
                <div class="bg-canvas-pure border border-border-grid p-3.5 rounded-[2px]">
                  <span class="font-mono text-[10px] text-outline block uppercase">PAYLOAD CAPACITY</span>
                  <span class="font-display text-[26px] text-mode-drive font-bold tabular-nums">
                    {{ profile().payload }} <span class="font-mono text-[11px] text-outline font-normal">kg</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- Right: Subsystem Diagnostics -->
            <div class="lg:col-span-5 space-y-4">
              <div class="space-y-1">
                <h3 class="font-display text-[24px] font-bold uppercase text-on-surface">
                  Subsystem Health Vector
                </h3>
                <p class="text-[13px] text-on-surface-variant">
                  Each articulated limb is continuously sampled for thermal load, back-EMF, and
                  harmonic gear strain.
                </p>
              </div>
              <div class="border border-border-grid rounded-[2px] divide-y divide-border-grid">
                <div class="px-3.5 py-2.5 bg-canvas-pure flex items-center justify-between">
                  <span class="font-mono text-[12px] text-on-surface">FL (Front Left) Leg Actuation</span>
                  <span class="font-mono text-[11px] text-signal-success font-bold tabular-nums">
                    NOMINAL · {{ profile().temps.fl }}
                  </span>
                </div>
                <div class="px-3.5 py-2.5 bg-canvas-subtle flex items-center justify-between">
                  <span class="font-mono text-[12px] text-on-surface">FR (Front Right) Leg Actuation</span>
                  <span class="font-mono text-[11px] text-signal-success font-bold tabular-nums">
                    NOMINAL · {{ profile().temps.fr }}
                  </span>
                </div>
                <div class="px-3.5 py-2.5 bg-canvas-pure flex items-center justify-between">
                  <span class="font-mono text-[12px] text-on-surface">RL (Rear Left) Leg Actuation</span>
                  <span class="font-mono text-[11px] text-signal-success font-bold tabular-nums">
                    NOMINAL · {{ profile().temps.rl }}
                  </span>
                </div>
                <div class="px-3.5 py-2.5 bg-canvas-subtle flex items-center justify-between">
                  <span class="font-mono text-[12px] text-on-surface">RR (Rear Right) Leg Actuation</span>
                  <span class="font-mono text-[11px] text-signal-success font-bold tabular-nums">
                    NOMINAL · {{ profile().temps.rr }}
                  </span>
                </div>
                <div class="px-3.5 py-2.5 bg-canvas-pure flex items-center justify-between">
                  <span class="font-mono text-[12px] text-on-surface">LiDAR Solid-State Sweep</span>
                  <span class="font-mono text-[11px] text-mode-run font-bold tabular-nums">
                    SYNC 2400 RPM
                  </span>
                </div>
              </div>
              <div class="p-4 rounded-[2px] bg-surface-container-high border border-border-active text-on-surface-variant text-[13px] space-y-1">
                <div class="font-mono text-[10px] font-bold text-mode-run uppercase tracking-wider">
                  OPERATOR FEEDBACK NOTE
                </div>
                <p class="leading-5">{{ profile().operatorNote }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 04 / Operational Scenarios Mosaic -->
      <section class="w-full px-6 md:px-10 py-14 bg-canvas-subtle border-b border-border-grid">
        <div class="max-w-[1360px] mx-auto">
          <div class="space-y-1.5 mb-8 pb-5 border-b border-border-grid">
            <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-mode-run font-bold">
              04 / INDUSTRIAL DEPLOYMENTS
            </span>
            <h2 class="font-display text-[36px] sm:text-[42px] leading-none font-bold uppercase text-on-surface">
              Extreme Operational Scenarios
            </h2>
            <p class="text-[15px] leading-6 text-on-surface-variant max-w-2xl">
              Autonomous field robotics engineered to remove human personnel from hazardous
              chemical, thermal, and unstable structural environments.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div class="bg-canvas-pure border border-border-grid rounded-[4px] overflow-hidden flex flex-col justify-between">
              <div class="px-3 py-1.5 bg-surface-container border-b border-border-grid flex items-center justify-between font-mono text-[10px] font-bold">
                <span class="text-on-surface">SCENARIO // 01</span>
                <span class="text-mode-run">SECURITY</span>
              </div>
              <div class="h-44 w-full bg-canvas-muted border-b border-border-grid">
                <img
                  [src]="images.jagurPerimeter"
                  alt="Quadruped robotic security dog performing automated night patrol in an industrial substation"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div class="space-y-1">
                  <h3 class="font-display text-[22px] font-bold uppercase text-on-surface">
                    Perimeter Security &amp; Escort
                  </h3>
                  <p class="text-[13px] leading-5 text-on-surface-variant">
                    Scheduled autonomous patrols along perimeter fences with optical zoom cameras,
                    breach tracking, and bidirectional acoustic alert broadcast.
                  </p>
                </div>
                <div class="pt-2 border-t border-border-grid font-mono text-[10px] text-mode-run font-bold">
                  &gt; 24/7 UNATTENDED PATROLS
                </div>
              </div>
            </div>

            <div class="bg-canvas-pure border border-border-grid rounded-[4px] overflow-hidden flex flex-col justify-between">
              <div class="px-3 py-1.5 bg-surface-container border-b border-border-grid flex items-center justify-between font-mono text-[10px] font-bold">
                <span class="text-on-surface">SCENARIO // 02</span>
                <span class="text-signal-alert">HAZMAT</span>
              </div>
              <div class="h-44 w-full bg-canvas-muted border-b border-border-grid">
                <img
                  [src]="images.jagurInspection"
                  alt="Jag.U.R quadruped robot inspecting petrochemical steam pipe valves with thermal optics"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div class="space-y-1">
                  <h3 class="font-display text-[22px] font-bold uppercase text-on-surface">
                    Hazardous Inspection
                  </h3>
                  <p class="text-[13px] leading-5 text-on-surface-variant">
                    Detects hydrocarbon leaks, acoustic steam anomalies, and overheated electrical
                    transformers across petrochemical processing halls.
                  </p>
                </div>
                <div class="pt-2 border-t border-border-grid font-mono text-[10px] text-signal-alert font-bold">
                  &gt; ZERO PERSONNEL EXPOSURE
                </div>
              </div>
            </div>

            <div class="bg-canvas-pure border border-border-grid rounded-[4px] overflow-hidden flex flex-col justify-between">
              <div class="px-3 py-1.5 bg-surface-container border-b border-border-grid flex items-center justify-between font-mono text-[10px] font-bold">
                <span class="text-on-surface">SCENARIO // 03</span>
                <span class="text-mode-fly">RESCUE</span>
              </div>
              <div class="h-44 w-full bg-canvas-muted border-b border-border-grid">
                <img
                  [src]="images.jagurSearch"
                  alt="Quadruped robot walking over collapsed masonry debris during search and rescue drill"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div class="space-y-1">
                  <h3 class="font-display text-[22px] font-bold uppercase text-on-surface">
                    Search &amp; Rapid Survey
                  </h3>
                  <p class="text-[13px] leading-5 text-on-surface-variant">
                    Traverses seismic disaster zones, collapsed structural wreckage, and underground
                    conduits to locate survivors and generate 3D void maps.
                  </p>
                </div>
                <div class="pt-2 border-t border-border-grid font-mono text-[10px] text-mode-fly font-bold">
                  &gt; 3D COLLAPSE MESHING
                </div>
              </div>
            </div>

            <div class="bg-canvas-pure border border-border-grid rounded-[4px] overflow-hidden flex flex-col justify-between">
              <div class="px-3 py-1.5 bg-surface-container border-b border-border-grid flex items-center justify-between font-mono text-[10px] font-bold">
                <span class="text-on-surface">SCENARIO // 04</span>
                <span class="text-mode-drive">CONSTRUCTION</span>
              </div>
              <div class="h-44 w-full bg-canvas-muted border-b border-border-grid">
                <img
                  [src]="images.jagurConstruction"
                  alt="Autonomous quadruped robot inspecting active multi-story commercial construction site"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div class="space-y-1">
                  <h3 class="font-display text-[22px] font-bold uppercase text-on-surface">
                    BIM Site Progress Audit
                  </h3>
                  <p class="text-[13px] leading-5 text-on-surface-variant">
                    Daily autonomous walks comparing as-built laser scans directly against Building
                    Information Modeling digital twins to flag install clashes.
                  </p>
                </div>
                <div class="pt-2 border-t border-border-grid font-mono text-[10px] text-mode-drive font-bold">
                  &gt; REVIT &amp; IFC COMPLIANT
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Medium Technical Monograph Feature -->
      <section class="w-full px-6 md:px-10 py-14 bg-surface border-b border-border-grid">
        <div class="max-w-[1360px] mx-auto bg-canvas-pure border border-border-active rounded-[4px] p-6 md:p-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-8 space-y-4">
              <div class="flex flex-wrap items-center gap-2 font-mono text-[10px]">
                <span class="px-2.5 py-0.5 rounded-[2px] bg-mode-run text-on-primary font-bold uppercase">
                  MEDIUM TECHNICAL MONOGRAPH
                </span>
                <span class="text-outline font-semibold">BY ZOEWAVE RESEARCH · 12 MIN READ</span>
              </div>
              <div class="space-y-2">
                <h2 class="font-display text-[32px] sm:text-[38px] leading-none font-bold uppercase text-on-surface">
                  Jag.U.R™ Utility Robot: Journey Agile Guiding Utility Robot
                </h2>
                <p class="text-[15px] leading-6 text-on-surface-variant">
                  An architectural breakdown of the torque-controlled kinematics, closed-loop neural
                  balance manifolds, and ROS2 hardware abstraction layer powering the Jag.U.R
                  autonomous quadruped platform.
                </p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div class="bg-surface-container border border-border-grid p-4 rounded-[2px]">
                  <span class="font-mono text-[10px] text-mode-run font-bold block mb-1 uppercase">
                    PART 01 // KINEMATICS
                  </span>
                  <p class="text-[13px] text-on-surface">
                    Eliminating mechanical gearbox backlash using dual cycloidal planetary reducers
                    with sub-0.1ms torque correction.
                  </p>
                </div>
                <div class="bg-surface-container border border-border-grid p-4 rounded-[2px]">
                  <span class="font-mono text-[10px] text-mode-fly font-bold block mb-1 uppercase">
                    PART 02 // NEURAL SLAM
                  </span>
                  <p class="text-[13px] text-on-surface">
                    Deploying local DeepSeek and TensorFlow Lite models on Edge TPU for zero-cloud
                    waypoint inference.
                  </p>
                </div>
              </div>
              <div class="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://zoewave.medium.com/jag-u-r-utility-robot-d6045e215b20"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-5 py-2.5 rounded-[2px] bg-mode-run hover:bg-primary-hover text-on-primary font-mono text-[12px] uppercase tracking-wider font-semibold transition-colors flex items-center gap-2"
                >
                  <span>Read Full Article on Medium</span>
                  <mat-icon class="text-[16px]">open_in_new</mat-icon>
                </a>
                <button
                  type="button"
                  (click)="openJagurPaper()"
                  class="px-4 py-2.5 rounded-[2px] bg-canvas-pure border border-border-active text-on-surface font-mono text-[12px] uppercase tracking-wider font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Read Abstract Here
                </button>
              </div>
            </div>

            <div class="lg:col-span-4 bg-surface-container p-5 rounded-[4px] space-y-3.5 border border-border-grid">
              <div class="font-mono text-[10px] uppercase text-outline font-bold pb-2 border-b border-border-grid">
                ARTICLE KEY TAKEAWAYS
              </div>
              <div class="space-y-2.5 text-[13px] text-on-surface">
                <div class="flex items-start gap-2">
                  <mat-icon class="text-signal-success text-[18px] shrink-0">verified</mat-icon>
                  <span><strong>Linear Foot Contact Force:</strong> 450N continuous peak impact resistance per carbon-fiber limb.</span>
                </div>
                <div class="flex items-start gap-2">
                  <mat-icon class="text-signal-success text-[18px] shrink-0">verified</mat-icon>
                  <span><strong>Sub-Millimeter Odometry:</strong> Drift bounded under 0.05% over 10km unmapped traverses.</span>
                </div>
                <div class="flex items-start gap-2">
                  <mat-icon class="text-signal-success text-[18px] shrink-0">verified</mat-icon>
                  <span><strong>Unified Protocol:</strong> Direct ROS2 Galactic / Humble native node telemetry bindings.</span>
                </div>
              </div>
              <div class="p-2 bg-canvas-pure border border-border-grid rounded-[2px] text-center">
                <span class="font-mono text-[10px] text-on-surface-variant">
                  SHA256: 4f98e21...8bca310
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 05 / Complete Engineering Specifications Table -->
      <section class="w-full px-6 md:px-10 py-14 bg-canvas-subtle border-b border-border-grid">
        <div class="max-w-[1360px] mx-auto">
          <div class="space-y-1.5 mb-6 pb-5 border-b border-border-grid">
            <span class="font-mono text-[11px] uppercase tracking-[0.08em] text-mode-run font-bold">
              05 / HARDWARE ARCHITECTURE · SPECIFICATION MATRIX
            </span>
            <h2 class="font-display text-[36px] sm:text-[42px] leading-none font-bold uppercase text-on-surface">
              Full Engineering Specifications
            </h2>
            <p class="text-[15px] leading-6 text-on-surface-variant max-w-2xl">
              Architectural parameters verified through empirical testing at the Outdoor Robotics
              Testing Facility.
            </p>
          </div>

          <div class="bg-canvas-pure border border-border-active rounded-[4px] overflow-x-auto">
            <table class="w-full text-left text-[13px] border-collapse">
              <thead>
                <tr class="bg-surface-container-high border-b-2 border-border-active text-on-surface font-mono text-[10px] uppercase tracking-wider">
                  <th class="py-3.5 px-5 font-bold">Subsystem Component</th>
                  <th class="py-3.5 px-5 font-bold">Engineering Metric</th>
                  <th class="py-3.5 px-5 font-bold">Tolerances &amp; Protocols</th>
                  <th class="py-3.5 px-5 text-right font-bold">Verification Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border-grid text-on-surface">
                @for (row of specs; track row.subsystem) {
                  <tr class="even:bg-canvas-subtle hover:bg-surface-container-high/60 transition-colors">
                    <td class="py-3.5 px-5 font-semibold">
                      <span class="inline-flex items-center gap-2">
                        <mat-icon class="text-mode-run text-[18px]">{{ row.icon }}</mat-icon>
                        <span>{{ row.subsystem }}</span>
                      </span>
                    </td>
                    <td class="py-3.5 px-5 font-mono font-semibold tabular-nums">{{ row.metric }}</td>
                    <td class="py-3.5 px-5 text-on-surface-variant">{{ row.implementation }}</td>
                    <td class="py-3.5 px-5 text-right font-mono text-[11px] text-signal-success font-bold">
                      {{ row.rating }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Bottom Conversion Callout -->
      <section class="w-full px-6 md:px-10 py-12 bg-canvas-pure">
        <div
          class="max-w-[1360px] mx-auto bg-surface-container-high border border-border-active rounded-[4px] p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div class="space-y-2 max-w-xl">
            <span class="inline-block px-2.5 py-0.5 rounded-[2px] bg-mode-run text-on-primary font-mono text-[10px] uppercase tracking-wider font-bold">
              DEPLOYMENT READY · ZR-RUN-001
            </span>
            <h2 class="font-display text-[32px] sm:text-[38px] leading-none font-bold uppercase text-on-surface">
              Equip Your Team with Jag.U.R
            </h2>
            <p class="text-[15px] leading-6 text-on-surface-variant">
              Book an on-site autonomous mission verification with our field engineering robotics
              unit, or access developer SDK documentation and ROS2 URDF packages.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              routerLink="/info-and-research"
              fragment="contact-labs"
              class="w-full sm:w-auto px-6 py-3 rounded-[2px] bg-mode-run hover:bg-primary-hover text-on-primary font-mono text-[12px] uppercase tracking-wider font-semibold text-center transition-colors flex items-center justify-center gap-2"
            >
              <mat-icon class="text-[18px]">engineering</mat-icon>
              <span>Request Field Evaluation</span>
            </a>
            <a
              routerLink="/documentation"
              class="w-full sm:w-auto px-6 py-3 rounded-[2px] bg-canvas-pure border border-border-active text-on-surface font-mono text-[12px] uppercase tracking-wider font-semibold text-center hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
            >
              <mat-icon class="text-[18px] text-mode-run">download</mat-icon>
              <span>Download ROS2 Package</span>
            </a>
          </div>
        </div>
      </section>
    </div>

    <app-paper-modal [record]="selectedRecord()" (closed)="selectedRecord.set(null)" />
  `,
})
export class JagurRobot {
  protected readonly images = ZOEROBO_IMAGES;
  protected readonly specs = JAGUR_SPECS;
  protected readonly modes: { key: JagurMode; label: string }[] = [
    { key: 'recon', label: 'RECON SCOUT' },
    { key: 'heavy', label: 'HEAVY UTILITY' },
    { key: 'sprint', label: 'EXTREME SPRINT' },
  ];

  protected readonly activeMode = signal<JagurMode>('recon');
  protected readonly datasheetExported = signal(false);
  protected readonly selectedRecord = signal<ResearchRecord | null>(null);

  protected readonly profile = computed(() => JAGUR_PROFILES[this.activeMode()]);

  protected setMode(mode: JagurMode): void {
    this.activeMode.set(mode);
  }

  protected openJagurPaper(): void {
    this.selectedRecord.set(RESEARCH_RECORDS[1]);
  }

  protected downloadDatasheet(): void {
    const lines = [
      'ZOEROBO SYSTEMS INC. — JAG.U.R™ UTILITY ROBOT TECHNICAL DATASHEET',
      'Edition: UNIT-04 TERRA-MECH // MIL-STD-810H REF',
      '==================================================================',
      ...this.specs.map(
        (s) => `${s.subsystem}: ${s.metric} (${s.implementation}) [${s.rating}]`
      ),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'zoerobo-jagur-datasheet.txt';
    link.click();
    URL.revokeObjectURL(url);
    this.datasheetExported.set(true);
    setTimeout(() => this.datasheetExported.set(false), 3000);
  }
}
