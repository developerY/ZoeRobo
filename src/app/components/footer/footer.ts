import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, MatIconModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="w-full bg-canvas-subtle border-t border-border-grid/80 mt-10">
      <div class="w-full px-6 md:px-12 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-10">
          <!-- Brand & Kinetic Manifesto -->
          <div class="lg:col-span-4 space-y-4">
            <div class="flex items-center gap-2">
              <span class="font-display text-[20px] font-semibold text-on-surface">
                ZoeRobo Engineering
              </span>
            </div>
            <p class="font-display text-[24px] leading-8 font-semibold text-primary max-w-sm">
              We make robots that Run, Drive &amp; Fly.
            </p>
            <p class="text-[13px] leading-5 text-on-surface-variant max-w-md">
              Empirical hardware synthesis for extreme autonomy, kinematic balance, and distributed
              cybernetic intelligence.
            </p>
            <div class="flex items-center gap-2 pt-1">
              <a
                routerLink="/jag-u-r-robot"
                class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-mode-run/10 text-mode-run font-mono text-[10px] font-medium tracking-wider hover:bg-mode-run/20 transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-mode-run"></span>
                RUN
              </a>
              <a
                routerLink="/ai-ml-drive"
                class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-mode-drive/10 text-mode-drive font-mono text-[10px] font-medium tracking-wider hover:bg-mode-drive/20 transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-mode-drive"></span>
                DRIVE
              </a>
              <a
                routerLink="/firefly-drone"
                class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-mode-fly/10 text-mode-fly font-mono text-[10px] font-medium tracking-wider hover:bg-mode-fly/20 transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-mode-fly"></span>
                FLY
              </a>
            </div>
          </div>

          <!-- Kinematic Matrix Links -->
          <div class="lg:col-span-2 space-y-3">
            <div class="font-mono text-[10px] font-medium uppercase text-outline tracking-[0.06em]">
              Kinematic Matrix
            </div>
            <ul class="space-y-2">
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
                  AV Ground Drive Platform
                </a>
              </li>
              <li class="flex items-center gap-2">
                <mat-icon class="text-tertiary text-[16px]">memory</mat-icon>
                <a
                  routerLink="/documentation"
                  class="text-[13px] text-on-surface-variant hover:text-tertiary transition-colors"
                >
                  ROS2 / Telematics Stack
                </a>
              </li>
            </ul>
          </div>

          <!-- YLabZ Research Core -->
          <div class="lg:col-span-3 space-y-3">
            <div class="font-mono text-[10px] font-medium uppercase text-outline tracking-[0.06em]">
              YLabZ Research Core
            </div>
            <ul class="space-y-1.5 font-mono text-[12px] text-on-surface-variant">
              <li
                class="flex items-center justify-between px-2.5 py-1.5 bg-canvas-pure rounded border border-border-grid/50"
              >
                <span>Edge TPU Neural Pipeline</span>
                <span class="text-signal-success text-[10px] font-semibold">ACTIVE</span>
              </li>
              <li
                class="flex items-center justify-between px-2.5 py-1.5 bg-canvas-pure rounded border border-border-grid/50"
              >
                <span>DeepSeek LLM Local Guidance</span>
                <span class="text-signal-success text-[10px] font-semibold tabular-nums">0.12ms</span>
              </li>
              <li
                class="flex items-center justify-between px-2.5 py-1.5 bg-canvas-pure rounded border border-border-grid/50"
              >
                <span>TensorFlow Lite Kinematics</span>
                <span class="text-on-surface text-[10px] font-semibold">INT8</span>
              </li>
              <li
                class="flex items-center justify-between px-2.5 py-1.5 bg-canvas-pure rounded border border-border-grid/50"
              >
                <span>YLabZ Hardware Telemetry</span>
                <span class="text-primary text-[10px] font-semibold">v3.8</span>
              </li>
            </ul>
          </div>

          <!-- Developer Dispatch Newsletter -->
          <div class="lg:col-span-3 space-y-3">
            <div class="font-mono text-[10px] font-medium uppercase text-outline tracking-[0.06em]">
              Developer Dispatch
            </div>
            <p class="text-[13px] leading-5 text-on-surface-variant">
              Receive direct empirical updates, SDK kernel patches, and ROS2 modules from our field
              robotics engineers.
            </p>
            <form (submit)="onSubscribe($event)" class="flex flex-col gap-2">
              <input
                type="email"
                [formControl]="emailControl"
                placeholder="developer@institution.edu"
                aria-label="Institutional email for Developer Dispatch"
                class="px-3.5 py-2 rounded bg-canvas-pure border border-border-grid text-on-surface text-[13px] placeholder:text-outline focus:outline-none focus:border-mode-run focus:ring-1 focus:ring-mode-run shadow-[0_1px_3px_0_rgba(15,23,42,0.04)]"
              />
              <button
                type="submit"
                class="w-full px-4 py-2 rounded bg-secondary text-on-secondary font-mono text-[12px] font-medium uppercase tracking-[0.04em] hover:bg-secondary-container transition-colors cursor-pointer"
              >
                Subscribe Feed
              </button>
              @if (subscribeStatus() === 'error') {
                <p class="font-mono text-[11px] text-error">
                  Enter a valid institutional or developer email address.
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
          class="pt-6 border-t border-border-grid/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-outline"
        >
          <div>
            <span>© 2025 ZoeRobo Systems Inc. All hardware and software patents reserved.</span>
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
