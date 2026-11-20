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
          class="fixed inset-0 bg-on-surface/40 cursor-default"
          aria-label="Close paper dialog"
        ></button>
        <div
          class="relative z-10 w-full max-w-2xl bg-canvas-pure border border-border-active rounded-[4px] overflow-hidden max-h-[90vh] flex flex-col"
        >
          <!-- Modal Header -->
          <div class="px-6 py-4 bg-canvas-subtle border-b border-border-grid flex items-center justify-between gap-4">
            <div class="flex flex-wrap items-center gap-2 font-mono text-[10px]">
              <span class="px-2 py-0.5 rounded-[2px] bg-primary-container text-on-primary-container border border-primary/30 font-semibold">
                {{ paper.domainLabel }}
              </span>
              <span class="text-outline">{{ paper.refCode }}</span>
            </div>
            <button
              type="button"
              (click)="closed.emit()"
              class="w-8 h-8 rounded-[2px] border border-border-grid bg-canvas-pure hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close paper viewer"
            >
              <mat-icon class="text-[18px]">close</mat-icon>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 overflow-y-auto space-y-5">
            <div>
              <h2 class="font-display text-[30px] leading-tight font-bold uppercase text-on-surface">
                {{ paper.title }}
              </h2>
              <div class="mt-2 flex flex-wrap items-center gap-3 font-mono text-[11px] text-outline">
                <span>AUTHOR: {{ paper.author.toUpperCase() }}</span>
                <span>·</span>
                <span>{{ paper.readTime }}</span>
              </div>
            </div>

            <!-- Key Benchmark Metrics -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              @for (metric of paper.keyMetrics; track metric.label) {
                <div class="p-3 rounded-[2px] bg-surface-container border border-border-grid">
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
                <span class="px-2.5 py-1 rounded-[2px] bg-canvas-muted border border-border-grid text-on-surface font-mono text-[11px]">
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
              class="px-4 py-2 rounded-[2px] bg-canvas-pure border border-border-active text-on-surface font-mono text-[11px] uppercase tracking-wider hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              Close Preview
            </button>
            @if (paper.externalUrl) {
              <a
                [href]="paper.externalUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 rounded-[2px] bg-primary hover:bg-primary-hover text-on-primary font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
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
