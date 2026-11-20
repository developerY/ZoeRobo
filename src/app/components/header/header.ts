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
      class="fixed top-0 left-0 right-0 z-50 bg-canvas-pure border-b border-border-active"
    >
      <div class="h-[72px] w-full max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between gap-4">
        <!-- Brand & Equipment Revision -->
        <div class="flex items-center gap-4 shrink-0">
          <a
            routerLink="/overview"
            class="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-[2px]"
            (click)="closeMenus()"
          >
            <!-- ZoeRobo Robotic Arm Logo -->
            <img
              src="/assets/aistudio/image_c61b1d4d.png"
              alt="ZoeRobo robotic arm logo"
              class="h-10 w-10 object-contain shrink-0"
            />
            <span class="font-display text-[26px] font-bold uppercase tracking-[0.04em] text-on-surface leading-none whitespace-nowrap">
              ZoeRobo
            </span>
          </a>
          <span
            class="hidden 2xl:inline-flex items-center gap-1.5 font-mono text-[10px] font-medium tracking-[0.06em] text-outline bg-surface border border-border-grid px-2 py-1 rounded-[2px] whitespace-nowrap"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-signal-success"></span>
            SYS.AUTONOMY · REV 4.2
          </span>
        </div>

        <!-- Desktop Primary Navigation -->
        <nav class="hidden lg:flex items-center h-full gap-1" aria-label="Primary navigation">
          @for (item of navItems; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="text-on-surface font-semibold border-b-2 border-primary bg-surface-container-high/60"
              [routerLinkActiveOptions]="{ exact: false }"
              class="h-full px-3.5 flex items-center font-mono text-[11px] font-medium uppercase tracking-[0.05em] text-on-surface-variant border-b-2 border-transparent hover:text-on-surface hover:bg-surface-container transition-colors whitespace-nowrap shrink-0"
            >
              {{ item.label }}
            </a>
          }
        </nav>

        <!-- Right Utility Actions & Mobile Trigger -->
        <div class="flex items-center gap-2.5 shrink-0">
          <a
            routerLink="/documentation"
            routerLinkActive="text-primary font-semibold"
            class="hidden md:inline-block px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.05em] text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap"
          >
            Docs / SDK
          </a>

          <a
            routerLink="/info-and-research"
            fragment="contact-labs"
            class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-[2px] bg-primary hover:bg-primary-hover text-on-primary font-mono text-[11px] font-semibold uppercase tracking-[0.05em] transition-colors whitespace-nowrap"
          >
            Contact Labs
          </a>

          <!-- Command Palette / Quick Navigator Trigger -->
          <button
            type="button"
            (click)="openCommandPalette()"
            class="h-9 px-2.5 rounded-[2px] bg-canvas-pure border border-border-active hover:bg-surface-container-high text-on-surface flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Open quick navigation search"
            title="Quick Navigate (⌘K / Ctrl+K)"
          >
            <mat-icon class="text-[17px]">search</mat-icon>
            <span class="hidden xl:inline font-mono text-[10px] tracking-wider text-outline">⌘K</span>
          </button>

          <!-- Mobile Menu Toggle -->
          <button
            type="button"
            (click)="toggleMobileMenu()"
            class="lg:hidden w-9 h-9 rounded-[2px] bg-canvas-pure border border-border-active hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors cursor-pointer"
            [attr.aria-expanded]="mobileMenuOpen()"
            aria-label="Toggle navigation menu"
          >
            <mat-icon class="text-[20px]">{{ mobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
          </button>
        </div>
      </div>

      <!-- Square-Edged Industrial Mobile Drawer -->
      @if (mobileMenuOpen()) {
        <div class="lg:hidden bg-canvas-pure border-t border-border-active px-6 py-4 space-y-2">
          <div class="flex items-center justify-between pb-2 mb-2 border-b border-border-grid">
            <span class="font-mono text-[10px] tracking-[0.06em] text-outline uppercase">
              00 / FLEET NAVIGATION
            </span>
            <span class="font-mono text-[10px] text-primary font-semibold">REV 4.2</span>
          </div>

          <div class="grid grid-cols-1 gap-1">
            @for (item of navItems; track item.path) {
              <a
                [routerLink]="item.path"
                routerLinkActive="bg-surface-container-high text-on-surface font-semibold border-l-2 border-primary"
                (click)="closeMenus()"
                class="flex items-center justify-between px-3 py-2.5 rounded-[2px] text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                <span class="flex items-center gap-3">
                  <mat-icon class="text-[18px]">{{ item.icon }}</mat-icon>
                  <span class="font-mono text-[12px] uppercase tracking-[0.04em]">{{ item.label }}</span>
                </span>
                @if (item.modeTag) {
                  <span class="font-mono text-[10px] px-2 py-0.5 rounded-[2px] bg-canvas-muted border border-border-grid text-on-surface">
                    {{ item.modeTag }}
                  </span>
                }
              </a>
            }

            <a
              routerLink="/documentation"
              routerLinkActive="bg-surface-container-high text-on-surface font-semibold border-l-2 border-primary"
              (click)="closeMenus()"
              class="flex items-center gap-3 px-3 py-2.5 rounded-[2px] text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              <mat-icon class="text-[18px]">menu_book</mat-icon>
              <span class="font-mono text-[12px] uppercase tracking-[0.04em]">Documentation &amp; SDK</span>
            </a>
          </div>

          <div class="pt-3 border-t border-border-grid">
            <a
              routerLink="/info-and-research"
              fragment="contact-labs"
              (click)="closeMenus()"
              class="w-full py-2.5 px-4 rounded-[2px] bg-primary hover:bg-primary-hover text-on-primary font-mono text-[12px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <mat-icon class="text-[17px]">mail</mat-icon>
              <span>Contact ZoeRobo Labs</span>
            </a>
          </div>
        </div>
      }
    </header>

    <!-- Command Palette Quick-Jump Modal -->
    @if (commandOpen()) {
      <div
        class="fixed inset-0 z-[70] flex items-start justify-center pt-20 px-4"
        role="dialog"
        aria-modal="true"
        aria-label="Quick navigation command palette"
      >
        <button
          type="button"
          (click)="closeCommandPalette()"
          class="fixed inset-0 bg-on-surface/35 cursor-default"
          aria-label="Close quick navigation"
        ></button>
        <div
          class="relative z-10 w-full max-w-xl bg-canvas-pure border border-border-active rounded-[4px] overflow-hidden"
        >
          <div class="flex items-center gap-3 px-4 py-3.5 bg-surface-container border-b border-border-grid">
            <mat-icon class="text-primary text-[20px]">search</mat-icon>
            <input
              type="text"
              [formControl]="searchControl"
              placeholder="Jump to Jag.U.R, FireFly, AI/ML Drive, ROS2 SDK, or Labs..."
              class="w-full bg-transparent font-mono text-[13px] text-on-surface placeholder:text-outline focus:outline-none"
            />
            <button
              type="button"
              (click)="closeCommandPalette()"
              class="px-2 py-0.5 rounded-[2px] bg-canvas-pure border border-border-grid font-mono text-[10px] text-outline hover:text-on-surface cursor-pointer"
            >
              ESC
            </button>
          </div>

          <div class="max-h-80 overflow-y-auto divide-y divide-border-grid/60">
            @for (item of filteredItems(); track item.title) {
              <button
                type="button"
                (click)="navigateToItem(item)"
                class="w-full text-left px-4 py-3 hover:bg-surface-container-high flex items-center justify-between gap-3 transition-colors cursor-pointer group"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <div
                    class="w-8 h-8 rounded-[2px] bg-canvas-subtle border border-border-grid group-hover:border-primary flex items-center justify-center text-on-surface shrink-0"
                  >
                    <mat-icon class="text-[17px]">{{ item.icon }}</mat-icon>
                  </div>
                  <div class="min-w-0">
                    <div class="font-display text-[17px] font-semibold uppercase tracking-wide text-on-surface truncate">
                      {{ item.title }}
                    </div>
                    <div class="text-[12px] text-on-surface-variant truncate">
                      {{ item.subtitle }}
                    </div>
                  </div>
                </div>
                <span
                  class="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-canvas-muted border border-border-grid text-on-surface-variant shrink-0"
                >
                  {{ item.category }}
                </span>
              </button>
            } @empty {
              <div class="py-8 text-center font-mono text-[12px] text-outline">
                NO MATCHING PLATFORM, SPEC, OR DOCUMENT FOUND.
              </div>
            }
          </div>

          <div
            class="px-4 py-2 bg-canvas-subtle border-t border-border-grid flex items-center justify-between font-mono text-[10px] text-outline"
          >
            <span>ZOEROBO ENGINEERING INDEX</span>
            <span>SELECT ENTRY TO NAVIGATE</span>
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
      category: 'FLY',
      icon: 'psychology',
      route: '/firefly-drone',
      fragment: 'demo-section',
    },
    {
      title: 'Jag.U.R Kinematic & Payload Profiler',
      subtitle: 'Compare Recon Scout, Heavy Utility & Extreme Sprint torque profiles',
      category: 'RUN',
      icon: 'speed',
      route: '/jag-u-r-robot',
      fragment: 'jagur-profiler',
    },
    {
      title: 'Edge TPU Live Hazard Console',
      subtitle: 'Trigger pedestrian emergency braking on the TFLite kinematic loop',
      category: 'DRIVE',
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
