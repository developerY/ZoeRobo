import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PRIMARY_NAV_ITEMS, RESEARCH_RECORDS } from '../../data/zoerobo.data';

interface QuickJumpItem {
  title: string;
  subtitle: string;
  category: string;
  icon: string;
  route: string;
  fragment?: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatIconModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'onKeydown($event)',
  },
  template: `
    <header
      class="fixed top-0 left-0 right-0 z-50 bg-canvas-pure/90 backdrop-blur-xl border-b border-border-grid/70 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
    >
      <div class="h-20 w-full px-4 sm:px-6 md:px-12 flex items-center justify-between gap-4">
        <!-- Brand & Revision -->
        <div class="flex items-center gap-5 shrink-0">
          <a
            routerLink="/overview"
            class="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mode-run rounded"
            (click)="closeMenus()"
          >
            <!-- Precision Geometric ZoeRobo Emblem -->
            <div
              class="w-9 h-9 rounded-lg bg-on-surface flex items-center justify-center shadow-sm group-hover:bg-primary transition-colors"
              aria-hidden="true"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7.5L12 3L20 7.5V16.5L12 21L4 16.5V7.5Z"
                  stroke="#93CCFF"
                  stroke-width="1.75"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 9.5H16L8 14.5H16"
                  stroke="#FFFFFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle cx="12" cy="3" r="1.4" fill="#0D9488" />
                <circle cx="20" cy="16.5" r="1.4" fill="#0284C7" />
              </svg>
            </div>
            <span class="font-display text-[20px] font-semibold tracking-tight text-on-surface whitespace-nowrap">
              ZoeRobo
            </span>
          </a>
          <span
            class="hidden 2xl:inline-block font-mono text-[10px] font-medium tracking-[0.06em] text-on-surface-variant bg-canvas-muted px-2 py-0.5 rounded whitespace-nowrap"
          >
            SYS.AUTONOMY // V4.2
          </span>
        </div>

        <!-- Desktop Primary Navigation -->
        <nav class="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
          @for (item of navItems; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="bg-surface-container-high text-primary font-bold"
              [routerLinkActiveOptions]="{ exact: false }"
              class="px-3.5 py-2 rounded font-mono text-[12px] font-medium uppercase tracking-[0.04em] text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all whitespace-nowrap shrink-0"
            >
              {{ item.label }}
            </a>
          }
        </nav>

        <!-- Right Utility Actions & Mobile Trigger -->
        <div class="flex items-center gap-3 shrink-0">
          <a
            routerLink="/documentation"
            routerLinkActive="text-primary font-bold"
            class="hidden md:inline-block font-mono text-[12px] font-medium uppercase tracking-[0.04em] text-on-surface-variant hover:text-primary transition-colors whitespace-nowrap"
          >
            Documentation
          </a>

          <a
            routerLink="/info-and-research"
            fragment="contact-labs"
            class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded bg-mode-run text-canvas-pure font-mono text-[12px] font-semibold uppercase tracking-[0.04em] shadow-[0_1px_3px_0_rgba(15,23,42,0.04)] hover:bg-primary transition-colors whitespace-nowrap"
          >
            Contact Labs
          </a>

          <!-- Command Palette / Quick Navigator Trigger -->
          <button
            type="button"
            (click)="openCommandPalette()"
            class="h-9 px-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mode-run"
            aria-label="Open quick navigation search"
            title="Quick Navigate (⌘K / Ctrl+K)"
          >
            <mat-icon class="text-[18px]">search</mat-icon>
            <span class="hidden xl:inline font-mono text-[10px] tracking-wider pr-1 opacity-90">⌘K</span>
          </button>

          <!-- Mobile Menu Toggle -->
          <button
            type="button"
            (click)="toggleMobileMenu()"
            class="lg:hidden w-10 h-10 rounded-lg bg-canvas-subtle hover:bg-canvas-muted text-on-surface flex items-center justify-center transition-colors cursor-pointer"
            [attr.aria-expanded]="mobileMenuOpen()"
            aria-label="Toggle navigation menu"
          >
            <mat-icon class="text-[22px]">{{ mobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
          </button>
        </div>
      </div>

      <!-- Mobile Responsive Drawer -->
      @if (mobileMenuOpen()) {
        <div class="lg:hidden bg-canvas-pure border-t border-border-grid shadow-lg px-4 py-4 space-y-2">
          <div class="flex items-center justify-between pb-2 mb-2 border-b border-border-grid/70">
            <span class="font-mono text-[10px] tracking-wider text-outline uppercase">
              Autonomous Fleet Navigation
            </span>
            <span class="font-mono text-[10px] text-primary font-semibold">V4.2</span>
          </div>

          <div class="grid grid-cols-1 gap-1">
            @for (item of navItems; track item.path) {
              <a
                [routerLink]="item.path"
                routerLinkActive="bg-surface-container-high text-primary font-bold"
                (click)="closeMenus()"
                class="flex items-center justify-between px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-canvas-subtle transition-colors"
              >
                <span class="flex items-center gap-3">
                  <mat-icon class="text-[20px]">{{ item.icon }}</mat-icon>
                  <span class="font-mono text-[13px] uppercase tracking-wider">{{ item.label }}</span>
                </span>
                @if (item.modeTag) {
                  <span class="font-mono text-[10px] px-2 py-0.5 rounded-full bg-canvas-muted text-on-surface">
                    {{ item.modeTag }}
                  </span>
                }
              </a>
            }

            <a
              routerLink="/documentation"
              routerLinkActive="bg-surface-container-high text-primary font-bold"
              (click)="closeMenus()"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-canvas-subtle transition-colors"
            >
              <mat-icon class="text-[20px]">menu_book</mat-icon>
              <span class="font-mono text-[13px] uppercase tracking-wider">Documentation & SDK</span>
            </a>
          </div>

          <div class="pt-2 border-t border-border-grid/70">
            <a
              routerLink="/info-and-research"
              fragment="contact-labs"
              (click)="closeMenus()"
              class="w-full py-2.5 px-4 rounded-lg bg-mode-run text-canvas-pure font-mono text-[12px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary transition-colors"
            >
              <mat-icon class="text-[18px]">mail</mat-icon>
              <span>Contact ZoeRobo Labs</span>
            </a>
          </div>
        </div>
      }
    </header>

    <!-- Command Palette Quick-Jump Modal -->
    @if (commandOpen()) {
      <div
        class="fixed inset-0 z-[70] flex items-start justify-center pt-24 px-4"
        role="dialog"
        aria-modal="true"
        aria-label="Quick navigation command palette"
      >
        <button
          type="button"
          (click)="closeCommandPalette()"
          class="fixed inset-0 bg-on-surface/40 backdrop-blur-sm cursor-default"
          aria-label="Close quick navigation"
        ></button>
        <div
          class="relative z-10 w-full max-w-xl bg-canvas-pure rounded-xl shadow-[0_20px_25px_-5px_rgba(15,23,42,0.12),0_0_0_1px_#E2E8F0] overflow-hidden"
        >
          <div class="flex items-center gap-3 px-4 py-3.5 border-b border-border-grid">
            <mat-icon class="text-mode-run text-[20px]">search</mat-icon>
            <input
              type="text"
              [formControl]="searchControl"
              placeholder="Jump to FireFly, Jag.U.R, Pixelopolis, ROS2 SDK, or Labs..."
              class="w-full bg-transparent text-[14px] text-on-surface placeholder:text-outline focus:outline-none"
            />
            <button
              type="button"
              (click)="closeCommandPalette()"
              class="px-2 py-0.5 rounded bg-canvas-muted font-mono text-[10px] text-outline hover:text-on-surface cursor-pointer"
            >
              ESC
            </button>
          </div>

          <div class="max-h-80 overflow-y-auto p-2 space-y-1">
            @for (item of filteredItems(); track item.title) {
              <button
                type="button"
                (click)="navigateToItem(item)"
                class="w-full text-left px-3 py-2.5 rounded-lg hover:bg-surface-container-low flex items-center justify-between gap-3 transition-colors cursor-pointer group"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <div
                    class="w-8 h-8 rounded-lg bg-canvas-subtle group-hover:bg-canvas-pure flex items-center justify-center text-primary shrink-0"
                  >
                    <mat-icon class="text-[18px]">{{ item.icon }}</mat-icon>
                  </div>
                  <div class="min-w-0">
                    <div class="font-display text-[14px] font-semibold text-on-surface truncate">
                      {{ item.title }}
                    </div>
                    <div class="text-[12px] text-on-surface-variant truncate">
                      {{ item.subtitle }}
                    </div>
                  </div>
                </div>
                <span
                  class="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-canvas-muted text-outline shrink-0"
                >
                  {{ item.category }}
                </span>
              </button>
            } @empty {
              <div class="py-8 text-center text-[13px] text-outline">
                No matching platform, specification, or research paper found.
              </div>
            }
          </div>

          <div
            class="px-4 py-2.5 bg-canvas-subtle border-t border-border-grid flex items-center justify-between font-mono text-[10px] text-outline"
          >
            <span>ZOEROBO QUICK NAVIGATOR</span>
            <span>SELECT DESTINATION TO JUMP</span>
          </div>
        </div>
      </div>
    }
  `,
})
export class Header {
  private readonly router = inject(Router);

  protected readonly navItems = PRIMARY_NAV_ITEMS;
  protected readonly mobileMenuOpen = signal(false);
  protected readonly commandOpen = signal(false);
  protected readonly searchQuery = signal('');
  protected readonly searchControl = new FormControl('', { nonNullable: true });

  private readonly allJumpItems: QuickJumpItem[] = [
    ...PRIMARY_NAV_ITEMS.map((n) => ({
      title: n.label,
      subtitle: n.description,
      category: n.modeTag ?? 'PAGE',
      icon: n.icon,
      route: n.path,
    })),
    {
      title: 'Documentation & ROS2 SDK',
      subtitle: 'Firmware packages, URDF models, Edge TPU weights & CLI setup',
      category: 'SDK',
      icon: 'terminal',
      route: '/documentation',
    },
    {
      title: 'FireFly Prompt-to-Kinematic Simulator',
      subtitle: 'Test natural language indoor flight commands on DeepSeek Local',
      category: 'SIMULATOR',
      icon: 'psychology',
      route: '/firefly-drone',
      fragment: 'demo-section',
    },
    {
      title: 'Jag.U.R Kinematic & Payload Profiler',
      subtitle: 'Compare Recon Scout, Heavy Utility & Extreme Sprint torque profiles',
      category: 'SIMULATOR',
      icon: 'speed',
      route: '/jag-u-r-robot',
      fragment: 'jagur-profiler',
    },
    {
      title: 'Edge TPU Live Hazard Console',
      subtitle: 'Trigger pedestrian emergency braking on the TFLite kinematic loop',
      category: 'SIMULATOR',
      icon: 'developer_board',
      route: '/ai-ml-drive',
      fragment: 'tpu-loop',
    },
    {
      title: 'Contact ZoeRobo Engineering Labs',
      subtitle: 'Submit hardware kit allocations or academic grant inquiries',
      category: 'INQUIRY',
      icon: 'mail',
      route: '/info-and-research',
      fragment: 'contact-labs',
    },
    ...RESEARCH_RECORDS.map((r) => ({
      title: r.title,
      subtitle: r.summary,
      category: r.category === 'papers' ? 'PAPER' : 'KIT',
      icon: r.icon,
      route: '/info-and-research',
      fragment: 'research-repository',
    })),
  ];

  protected readonly filteredItems = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return this.allJumpItems.slice(0, 8);
    return this.allJumpItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  });

  constructor() {
    this.searchControl.valueChanges.subscribe((val) => {
      this.searchQuery.set(val);
    });
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  protected closeMenus(): void {
    this.mobileMenuOpen.set(false);
    this.commandOpen.set(false);
  }

  protected openCommandPalette(): void {
    this.mobileMenuOpen.set(false);
    this.searchControl.setValue('');
    this.searchQuery.set('');
    this.commandOpen.set(true);
  }

  protected closeCommandPalette(): void {
    this.commandOpen.set(false);
  }

  protected navigateToItem(item: QuickJumpItem): void {
    this.closeMenus();
    void this.router.navigate([item.route], {
      fragment: item.fragment,
    });
  }

  protected onKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (this.commandOpen()) {
        this.closeCommandPalette();
      } else {
        this.openCommandPalette();
      }
    } else if (event.key === 'Escape' && (this.commandOpen() || this.mobileMenuOpen())) {
      this.closeMenus();
    }
  }
}
