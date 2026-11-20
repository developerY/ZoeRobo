import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, MatIconModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="w-full bg-canvas-subtle border-t border-border-active mt-12">
      <div class="w-full max-w-[1360px] mx-auto px-6 md:px-12 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
          <!-- Brand & Kinetic Manifesto -->
          <div class="lg:col-span-4 space-y-4">
            <div class="flex items-center gap-2.5">
              <img
                src="/assets/aistudio/image_c61b1d4d.png"
                alt="ZoeRobo robotic arm logo"
                class="h-8 w-8 object-contain shrink-0"
              />
              <span class="font-display text-[22px] font-bold uppercase tracking-[0.04em] text-on-surface">
                ZoeRobo Engineering
              </span>
            </div>
            <p class="font-display text-[28px] leading-tight font-semibold uppercase text-on-surface max-w-sm">
              We make robots that <span class="text-mode-run">Run</span>,
              <span class="text-mode-drive">Drive</span> &amp;
              <span class="text-mode-fly">Fly</span>.
            </p>
            <p class="text-[13px] leading-5 text-on-surface-variant max-w-md">
              Empirical hardware synthesis for extreme autonomy, mechanical balance, and on-device
              robotics intelligence.
            </p>
            <div class="flex flex-wrap items-center gap-2 pt-1">
              <a
                routerLink="/jag-u-r-robot"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-canvas-pure border border-mode-run text-mode-run font-mono text-[10px] font-semibold tracking-wider hover:bg-primary-container transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-mode-run"></span>
                ZR-RUN // JAG.U.R
              </a>
              <a
                routerLink="/ai-ml-drive"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-canvas-pure border border-mode-drive text-mode-drive font-mono text-[10px] font-semibold tracking-wider hover:bg-secondary-fixed transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-mode-drive"></span>
                ZR-DRV // AI/ML
              </a>
              <a
                routerLink="/firefly-drone"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-canvas-pure border border-mode-fly text-mode-fly font-mono text-[10px] font-semibold tracking-wider hover:bg-tertiary-fixed transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-mode-fly"></span>
                ZR-FLY // FIREFLY
              </a>
            </div>
          </div>

          <!-- Kinematic Matrix Links -->
          <div class="lg:col-span-2 space-y-3">
            <div class="font-mono text-[10px] font-semibold uppercase text-outline tracking-[0.06em] pb-1.5 border-b border-border-grid">
              01 / Platforms
            </div>
            <ul class="space-y-2.5">
              <li class="flex items-center gap-2">
                <mat-icon class="text-mode-fly text-[16px]">flight</mat-icon>
                <a
                  routerLink="/firefly-drone"
                  class="text-[13px] text-on-surface-variant hover:text-mode-fly transition-colors"
                >
                  FireFly™ Aerial UAS
                </a>
              </li>
              <li class="flex items-center gap-2">
                <mat-icon class="text-mode-run text-[16px]">precision_manufacturing</mat-icon>
                <a
                  routerLink="/jag-u-r-robot"
                  class="text-[13px] text-on-surface-variant hover:text-mode-run transition-colors"
                >
                  Jag.U.R™ Quadruped
                </a>
              </li>
              <li class="flex items-center gap-2">
                <mat-icon class="text-mode-drive text-[16px]">directions_car</mat-icon>
                <a
                  routerLink="/ai-ml-drive"
                  class="text-[13px] text-on-surface-variant hover:text-mode-drive transition-colors"
                >
                  AV Ground Drive
                </a>
              </li>
              <li class="flex items-center gap-2">
                <mat-icon class="text-on-surface-variant text-[16px]">memory</mat-icon>
                <a
                  routerLink="/documentation"
                  class="text-[13px] text-on-surface-variant hover:text-primary transition-colors"
                >
                  ROS2 / Telematics SDK
                </a>
              </li>
            </ul>
          </div>

          <!-- YLabZ Research Core -->
          <div class="lg:col-span-3 space-y-3">
            <div class="font-mono text-[10px] font-semibold uppercase text-outline tracking-[0.06em] pb-1.5 border-b border-border-grid">
              02 / YLabZ Telemetry Bus
            </div>
            <ul class="space-y-1.5 font-mono text-[11px] text-on-surface-variant">
              <li
                class="flex items-center justify-between px-2.5 py-1.5 bg-canvas-pure rounded-[2px] border border-border-grid"
              >
                <span>Edge TPU Neural Pipeline</span>
                <span class="text-signal-success text-[10px] font-semibold">ACTIVE</span>
              </li>
              <li
                class="flex items-center justify-between px-2.5 py-1.5 bg-canvas-pure rounded-[2px] border border-border-grid"
              >
                <span>DeepSeek Local Guidance</span>
                <span class="text-signal-success text-[10px] font-semibold tabular-nums">0.12ms</span>
              </li>
              <li
                class="flex items-center justify-between px-2.5 py-1.5 bg-canvas-pure rounded-[2px] border border-border-grid"
              >
                <span>TensorFlow Lite Kinematics</span>
                <span class="text-on-surface text-[10px] font-semibold">INT8</span>
              </li>
              <li
                class="flex items-center justify-between px-2.5 py-1.5 bg-canvas-pure rounded-[2px] border border-border-grid"
              >
                <span>YLabZ Hardware Bus</span>
                <span class="text-primary text-[10px] font-semibold">REV 4.2</span>
              </li>
            </ul>
          </div>

          <!-- Developer Dispatch Newsletter -->
          <div class="lg:col-span-3 space-y-3">
            <div class="font-mono text-[10px] font-semibold uppercase text-outline tracking-[0.06em] pb-1.5 border-b border-border-grid">
              03 / Engineering Dispatch
            </div>
            <p class="text-[13px] leading-5 text-on-surface-variant">
              Receive empirical hardware releases, SDK kernel patches, and ROS2 driver updates.
            </p>
            <form (submit)="onSubscribe($event)" class="flex flex-col gap-2">
              <input
                type="email"
                [formControl]="emailControl"
                placeholder="engineer@institution.edu"
                aria-label="Institutional email for Engineering Dispatch"
                class="px-3 py-2 rounded-[2px] bg-canvas-pure border border-border-grid text-on-surface text-[13px] placeholder:text-outline focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                class="w-full px-4 py-2 rounded-[2px] bg-on-surface hover:bg-primary text-canvas-pure font-mono text-[11px] font-semibold uppercase tracking-[0.05em] transition-colors cursor-pointer"
              >
                Subscribe Dispatch
              </button>
              @if (subscribeStatus() === 'error') {
                <p class="font-mono text-[11px] text-error">
                  Enter a valid institutional or engineering email.
                </p>
              }
              @if (subscribeStatus() === 'success') {
                <p class="font-mono text-[11px] text-signal-success flex items-center gap-1">
                  <mat-icon class="text-[14px]">check_circle</mat-icon>
                  <span>Subscribed to YLabZ SDK Dispatch.</span>
                </p>
              }
            </form>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div
          class="pt-5 border-t border-border-grid flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-outline uppercase tracking-wider"
        >
          <div>
            <span>© 2025 ZoeRobo Systems Inc. · Industrial Robotics Division</span>
          </div>
          <div class="flex items-center gap-6">
            <a routerLink="/info-and-research" class="hover:text-on-surface transition-colors">
              Laboratory Specs
            </a>
            <a routerLink="/documentation" class="hover:text-on-surface transition-colors">
              API Reference
            </a>
            <a
              routerLink="/info-and-research"
              fragment="contact-labs"
              class="hover:text-on-surface transition-colors"
            >
              Field Deployment
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly emailControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
  protected readonly subscribeStatus = signal<'idle' | 'success' | 'error'>('idle');

  protected onSubscribe(event: Event): void {
    event.preventDefault();
    if (this.emailControl.invalid) {
      this.subscribeStatus.set('error');
      return;
    }
    this.subscribeStatus.set('success');
    this.emailControl.reset('');
  }
}
