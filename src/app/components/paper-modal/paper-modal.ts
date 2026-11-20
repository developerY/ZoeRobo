import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ResearchRecord } from '../../data/zoerobo.data';

@Component({
  selector: 'app-paper-modal',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closed.emit()',
  },
  template: `
    @if (record(); as paper) {
      <div
        class="fixed inset-0 z-[80] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="paper.title"
      >
        <button
          type="button"
          (click)="closed.emit()"
          class="fixed inset-0 bg-on-surface/50 backdrop-blur-sm cursor-default"
          aria-label="Close paper dialog"
        ></button>
        <div
          class="relative z-10 w-full max-w-2xl bg-canvas-pure rounded-xl shadow-[0_20px_25px_-5px_rgba(15,23,42,0.14),0_0_0_1px_#E2E8F0] overflow-hidden max-h-[90vh] flex flex-col"
        >
          <!-- Modal Header -->
          <div class="px-6 py-4 bg-canvas-subtle border-b border-border-grid flex items-center justify-between gap-4">
            <div class="flex items-center gap-2 font-mono text-[11px]">
              <span class="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-semibold">
                {{ paper.domainLabel }}
              </span>
              <span class="text-outline">{{ paper.refCode }}</span>
            </div>
            <button
              type="button"
              (click)="closed.emit()"
              class="w-8 h-8 rounded-lg hover:bg-canvas-muted text-on-surface-variant flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close paper viewer"
            >
              <mat-icon class="text-[20px]">close</mat-icon>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 overflow-y-auto space-y-5">
            <div>
              <h2 class="font-display text-[26px] leading-tight font-bold text-on-surface">
                {{ paper.title }}
              </h2>
              <div class="mt-2 flex flex-wrap items-center gap-3 font-mono text-[11px] text-outline">
                <span>Authored by {{ paper.author }}</span>
                <span>·</span>
                <span>{{ paper.readTime }}</span>
              </div>
            </div>

            <!-- Key Benchmark Metrics -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              @for (metric of paper.keyMetrics; track metric.label) {
                <div class="p-3 rounded-lg bg-surface-container-low border border-border-grid/60">
                  <div class="font-mono text-[10px] uppercase tracking-wider text-outline">
                    {{ metric.label }}
                  </div>
                  <div class="font-mono text-[14px] font-bold text-primary mt-0.5 tabular-nums">
                    {{ metric.value }}
                  </div>
                </div>
              }
            </div>

            <!-- Full Abstract Paragraphs -->
            <div class="space-y-3 text-[14px] leading-6 text-on-surface-variant">
              @for (para of paper.abstractFull; track $index) {
                <p>{{ para }}</p>
              }
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 pt-2">
              @for (tag of paper.tags; track tag) {
                <span class="px-2.5 py-1 rounded bg-canvas-muted text-on-surface font-mono text-[11px]">
                  {{ tag }}
                </span>
              }
            </div>
          </div>

          <!-- Modal Footer -->
          <div
            class="px-6 py-4 bg-canvas-subtle border-t border-border-grid flex flex-wrap items-center justify-between gap-3"
          >
            <button
              type="button"
              (click)="closed.emit()"
              class="px-4 py-2 rounded bg-canvas-pure border border-border-grid text-on-surface font-mono text-[12px] uppercase tracking-wider hover:bg-canvas-muted transition-colors cursor-pointer"
            >
              Close Preview
            </button>
            @if (paper.externalUrl) {
              <a
                [href]="paper.externalUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 rounded bg-mode-run text-canvas-pure font-mono text-[12px] font-semibold uppercase tracking-wider hover:bg-primary transition-colors inline-flex items-center gap-1.5"
              >
                <span>Open Full Publication</span>
                <mat-icon class="text-[16px]">open_in_new</mat-icon>
              </a>
            }
          </div>
        </div>
      </div>
    }
  `,
})
export class PaperModal {
  readonly record = input<ResearchRecord | null>(null);
  readonly closed = output<void>();
}
