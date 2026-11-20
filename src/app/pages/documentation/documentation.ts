import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

type SdkTab = 'jagur' | 'firefly' | 'drive';

interface SdkDocSpec {
  id: SdkTab;
  unitId: string;
  title: string;
  modeTag: string;
  modeAccentClass: string;
  packageName: string;
  middleware: string;
  installCmd: string;
  launchCmd: string;
  topics: { name: string; type: string; rate: string; desc: string }[];
  downloads: { name: string; format: string; size: string }[];
}

const SDK_DOCS: Record<SdkTab, SdkDocSpec> = {
  jagur: {
    id: 'jagur',
    unitId: 'ZR-RUN-001',
    title: 'Jag.U.R™ Quadruped ROS2 & CAN-FD SDK',
    modeTag: 'RUN // QUADRUPED',
    modeAccentClass: 'text-mode-run',
    packageName: 'ros-humble-zoerobo-jagur-stack',
    middleware: 'ROS2 Humble + RT-PREEMPT Ubuntu 22.04',
    installCmd: 'sudo apt install ros-humble-zoerobo-jagur-control ros-humble-jagur-urdf',
    launchCmd: 'ros2 launch zoerobo_jagur_bringup terra_mech_slam.launch.py gait:=trot',
    topics: [
      {
        name: '/jagur/joint_states',
        type: 'sensor_msgs/JointState',
        rate: '1000 Hz',
        desc: '18-DOF harmonic torque, velocity, and joint temperature telemetry',
      },
      {
        name: '/jagur/lidar/points',
        type: 'sensor_msgs/PointCloud2',
        rate: '20 Hz',
        desc: '360° solid-state LiDAR dense point cloud (1.2M pts/s)',
      },
      {
        name: '/jagur/cmd_gait',
        type: 'zoerobo_msgs/GaitCommand',
        rate: '200 Hz',
        desc: 'Dynamic stride profile switch (recon, heavy_utility, sprint)',
      },
    ],
    downloads: [
      { name: 'Jag.U.R_v4.2_URDF_Collision_Mesh', format: 'URDF / STL', size: '18.4 MB' },
      { name: 'CAN_FD_Actuator_Pinout_Rev4', format: 'PDF Schematic', size: '4.1 MB' },
    ],
  },
  firefly: {
    id: 'firefly',
    unitId: 'ZR-FLY-004',
    title: 'FireFly™ Micro-UAS DeepSeek Local Guidance SDK',
    modeTag: 'FLY // MICRO UAS',
    modeAccentClass: 'text-mode-fly',
    packageName: 'zoerobo-firefly-vlm-runtime',
    middleware: 'Micro-ROS + DeepSeek-R1 INT8 Edge Runtime',
    installCmd: 'pip install zoerobo-firefly-sdk && firefly-cli pull deepseek-r1-spatial-int8',
    launchCmd: 'firefly-cli mission --prompt "Go to the kitchen and verify all appliances are off"',
    topics: [
      {
        name: '/firefly/vio/odometry',
        type: 'nav_msgs/Odometry',
        rate: '500 Hz',
        desc: 'Stereo visual-inertial odometry pose in GPS-denied indoor spaces',
      },
      {
        name: '/firefly/llm/plan_graph',
        type: 'zoerobo_msgs/SemanticPlan',
        rate: 'On-Demand',
        desc: 'Decomposed room waypoints and safety envelope bounding cones',
      },
      {
        name: '/firefly/thermal/frame',
        type: 'sensor_msgs/Image',
        rate: '30 Hz',
        desc: '160x120 LWIR microbolometer heat-map stream (local subnet only)',
      },
    ],
    downloads: [
      { name: 'FireFly_Toroidal_Shroud_3DPrint', format: 'STEP / 3MF', size: '9.8 MB' },
      { name: 'Inductive_Nest_Charger_Gerbers', format: 'PCB Gerber ZIP', size: '2.7 MB' },
    ],
  },
  drive: {
    id: 'drive',
    unitId: 'ZR-DRV-009',
    title: 'AI/ML Drive Smartphone Edge TPU & BLE Bridge',
    modeTag: 'DRIVE // WHEELED AGV',
    modeAccentClass: 'text-mode-drive',
    packageName: 'zoerobo-pixelopolis-tflite',
    middleware: 'TensorFlow Lite INT8 + Android CameraX + ESP32 UART',
    installCmd: 'git clone https://github.com/zoerobo/open-autonomy-stack.git && cd drive-tpu',
    launchCmd: './gradlew installDebug && adb shell am start -n com.zoerobo.driver/.AutonomyActivity',
    topics: [
      {
        name: '/drive/vision/detections',
        type: 'vision_msgs/Detection2DArray',
        rate: '60 Hz',
        desc: 'MobileNet-SSD INT8 traffic lights, stop signs, and pedestrian boxes',
      },
      {
        name: '/drive/ackermann_cmd',
        type: 'ackermann_msgs/AckermannDrive',
        rate: '200 Hz',
        desc: 'Pure Pursuit steering vector and PWM throttle duty over BLE 5.2',
      },
      {
        name: '/drive/safety/tti_status',
        type: 'std_msgs/Float32',
        rate: '60 Hz',
        desc: 'Real-time Time-to-Impact collision guard threshold in seconds',
      },
    ],
    downloads: [
      { name: 'LEGO_Technic_4WD_Mount_CAD', format: 'STL / LDraw', size: '6.2 MB' },
      { name: 'Pixelopolis_MobileNetV3_INT8', format: '.tflite Weights', size: '14.5 MB' },
    ],
  },
};

@Component({
  selector: 'app-documentation',
  imports: [RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col w-full bg-surface text-on-surface">
      <!-- 01 / SDK Reference Header -->
      <section class="w-full bg-canvas-pure border-b border-border-active px-6 md:px-10 py-10">
        <div class="max-w-[1360px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div class="space-y-2.5">
            <div class="flex flex-wrap items-center gap-2 font-mono text-[11px] text-on-surface-variant">
              <span class="px-2.5 py-0.5 rounded-[2px] bg-primary-container border border-primary/40 text-on-primary-container font-bold uppercase">
                01 / SDK &amp; API REFERENCE · REV 4.2
              </span>
              <span class="text-border-active">|</span>
              <span>ROS2 HUMBLE · TFLITE · DEEPSEEK EDGE</span>
            </div>
            <h1 class="font-display text-[44px] sm:text-[54px] leading-[1.0] font-bold uppercase text-on-surface tracking-[-0.02em]">
              ZoeRobo Developer Documentation
            </h1>
            <p class="text-[16px] leading-6 text-on-surface-variant max-w-2xl">
              Zero-cloud robotics middleware, URDF hardware schematics, CAN-FD actuator protocols,
              and quantized Edge TPU deployment guides across Run, Drive &amp; Fly platforms.
            </p>
          </div>

          <!-- Platform Equipment Tabs -->
          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              (click)="setTab('jagur')"
              class="px-4 py-2.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer border"
              [class.bg-mode-run]="activeTab() === 'jagur'"
              [class.text-on-primary]="activeTab() === 'jagur'"
              [class.border-mode-run]="activeTab() === 'jagur'"
              [class.bg-surface-container]="activeTab() !== 'jagur'"
              [class.text-on-surface]="activeTab() !== 'jagur'"
              [class.border-border-grid]="activeTab() !== 'jagur'"
            >
              ZR-RUN · Jag.U.R
            </button>
            <button
              type="button"
              (click)="setTab('firefly')"
              class="px-4 py-2.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer border"
              [class.bg-mode-fly]="activeTab() === 'firefly'"
              [class.text-on-tertiary]="activeTab() === 'firefly'"
              [class.border-mode-fly]="activeTab() === 'firefly'"
              [class.bg-surface-container]="activeTab() !== 'firefly'"
              [class.text-on-surface]="activeTab() !== 'firefly'"
              [class.border-border-grid]="activeTab() !== 'firefly'"
            >
              ZR-FLY · FireFly
            </button>
            <button
              type="button"
              (click)="setTab('drive')"
              class="px-4 py-2.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer border"
              [class.bg-mode-drive]="activeTab() === 'drive'"
              [class.text-on-secondary]="activeTab() === 'drive'"
              [class.border-mode-drive]="activeTab() === 'drive'"
              [class.bg-surface-container]="activeTab() !== 'drive'"
              [class.text-on-surface]="activeTab() !== 'drive'"
              [class.border-border-grid]="activeTab() !== 'drive'"
            >
              ZR-DRV · AI/ML Car
            </button>
          </div>
        </div>
      </section>

      <!-- 02 / Main SDK Reference & Telemetry Topics -->
      <section class="w-full px-6 md:px-10 py-12 bg-surface">
        <div class="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Left Main Docs -->
          <div class="lg:col-span-8 space-y-6">
            <div class="bg-canvas-pure border border-border-active rounded-[4px] p-6 space-y-5">
              <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border-grid">
                <div>
                  <div class="flex items-center gap-2 font-mono text-[10px]">
                    <span class="font-bold uppercase tracking-wider" [class]="currentDoc().modeAccentClass">
                      {{ currentDoc().modeTag }}
                    </span>
                    <span class="text-border-active">|</span>
                    <span class="text-outline font-semibold">UNIT: {{ currentDoc().unitId }}</span>
                  </div>
                  <h2 class="font-display text-[30px] leading-8 font-bold uppercase text-on-surface mt-1">
                    {{ currentDoc().title }}
                  </h2>
                </div>
                <span class="font-mono text-[11px] px-2.5 py-1 rounded-[2px] bg-surface-container border border-border-grid text-on-surface font-semibold">
                  {{ currentDoc().middleware }}
                </span>
              </div>

              <!-- Light Industrial CLI Blocks -->
              <div class="space-y-4">
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="font-mono text-[11px] uppercase text-outline font-bold">
                      01 · INSTALL PACKAGE &amp; MODEL CHECKPOINTS
                    </span>
                    <button
                      type="button"
                      (click)="copySnippet('install', currentDoc().installCmd)"
                      class="font-mono text-[11px] text-primary hover:text-primary-hover font-semibold flex items-center gap-1 cursor-pointer uppercase"
                    >
                      <mat-icon class="text-[14px]">content_copy</mat-icon>
                      <span>{{ copiedKey() === 'install' ? 'Copied' : 'Copy' }}</span>
                    </button>
                  </div>
                  <pre
                    class="p-4 rounded-[2px] bg-inverse-surface border border-border-active text-inverse-on-surface font-mono text-[12px] overflow-x-auto"
                  ><code><span class="text-primary font-bold">$</span> {{ currentDoc().installCmd }}</code></pre>
                </div>

                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="font-mono text-[11px] uppercase text-outline font-bold">
                      02 · LAUNCH AUTONOMOUS STACK
                    </span>
                    <button
                      type="button"
                      (click)="copySnippet('launch', currentDoc().launchCmd)"
                      class="font-mono text-[11px] text-primary hover:text-primary-hover font-semibold flex items-center gap-1 cursor-pointer uppercase"
                    >
                      <mat-icon class="text-[14px]">content_copy</mat-icon>
                      <span>{{ copiedKey() === 'launch' ? 'Copied' : 'Copy' }}</span>
                    </button>
                  </div>
                  <pre
                    class="p-4 rounded-[2px] bg-inverse-surface border border-border-active text-inverse-on-surface font-mono text-[12px] overflow-x-auto"
                  ><code><span class="text-primary font-bold">$</span> {{ currentDoc().launchCmd }}</code></pre>
                </div>
              </div>
            </div>

            <!-- ROS2 / Telemetry Topic Table -->
            <div class="bg-canvas-pure border border-border-active rounded-[4px] overflow-hidden">
              <div class="px-6 py-4 bg-surface-container border-b border-border-grid flex items-center justify-between">
                <h3 class="font-display text-[24px] font-bold uppercase text-on-surface">
                  Published Telemetry Topics &amp; Interfaces
                </h3>
                <span class="font-mono text-[10px] text-outline font-bold uppercase">ZERO-COPY DDS</span>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-[13px] border-collapse">
                  <thead>
                    <tr class="bg-surface-container-high border-b-2 border-border-active font-mono text-[10px] uppercase text-on-surface">
                      <th class="py-3 px-4 font-bold">Topic Path</th>
                      <th class="py-3 px-4 font-bold">Message Type</th>
                      <th class="py-3 px-4 font-bold">Rate</th>
                      <th class="py-3 px-4 font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-border-grid">
                    @for (topic of currentDoc().topics; track topic.name) {
                      <tr class="even:bg-canvas-subtle hover:bg-surface-container-high/60 transition-colors">
                        <td class="py-3.5 px-4 font-mono text-[12px] font-bold text-primary">
                          {{ topic.name }}
                        </td>
                        <td class="py-3.5 px-4 font-mono text-[11px] text-on-surface-variant">
                          {{ topic.type }}
                        </td>
                        <td class="py-3.5 px-4 font-mono text-[11px] text-signal-success font-bold tabular-nums">
                          {{ topic.rate }}
                        </td>
                        <td class="py-3.5 px-4 text-on-surface-variant">{{ topic.desc }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Right Sidebar: Schematics & Support -->
          <div class="lg:col-span-4 space-y-6">
            <div class="bg-canvas-pure border border-border-active rounded-[4px] p-6 space-y-4">
              <div class="font-mono text-[10px] uppercase tracking-[0.08em] text-outline font-bold pb-2 border-b border-border-grid">
                HARDWARE SCHEMATICS &amp; CAD BUNDLES
              </div>
              <div class="space-y-3">
                @for (file of currentDoc().downloads; track file.name) {
                  <div class="p-3.5 rounded-[2px] bg-surface-container border border-border-grid flex items-center justify-between gap-3">
                    <div class="min-w-0">
                      <div class="font-mono text-[12px] font-bold text-on-surface truncate">
                        {{ file.name }}
                      </div>
                      <div class="font-mono text-[10px] text-outline mt-0.5">
                        {{ file.format }} · {{ file.size }}
                      </div>
                    </div>
                    <button
                      type="button"
                      (click)="downloadManifest(file.name, file.format)"
                      class="px-3 py-1.5 rounded-[2px] bg-canvas-pure border border-border-active hover:border-primary hover:text-primary text-on-surface font-mono text-[11px] font-semibold uppercase shrink-0 cursor-pointer flex items-center gap-1 transition-colors"
                    >
                      <mat-icon class="text-[15px]">download</mat-icon>
                      <span>Get</span>
                    </button>
                  </div>
                }
              </div>
              @if (lastDownloaded()) {
                <div class="p-3 rounded-[2px] bg-surface-container border border-signal-success text-signal-success font-mono text-[11px] font-semibold flex items-center gap-1.5">
                  <mat-icon class="text-[15px]">check_circle</mat-icon>
                  <span>Downloaded manifest for {{ lastDownloaded() }}</span>
                </div>
              }
            </div>

            <div class="bg-surface-container-high border border-border-active rounded-[4px] p-6 space-y-3">
              <div class="font-mono text-[10px] uppercase tracking-[0.08em] text-primary font-bold">
                NEED CUSTOM FIRMWARE SUPPORT?
              </div>
              <h3 class="font-display text-[24px] font-bold uppercase text-on-surface">
                Partner with YLabZ Engineers
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Request academic kit allocations, custom payload drivers, or on-site ROS2
                integration assistance.
              </p>
              <a
                routerLink="/info-and-research"
                fragment="contact-labs"
                class="w-full py-2.5 px-4 rounded-[2px] bg-primary hover:bg-primary-hover text-on-primary font-mono text-[12px] font-semibold uppercase tracking-wider text-center inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Open Lab Inquiry</span>
                <mat-icon class="text-[16px]">arrow_forward</mat-icon>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class Documentation {
  protected readonly activeTab = signal<SdkTab>('jagur');
  protected readonly copiedKey = signal<string | null>(null);
  protected readonly lastDownloaded = signal<string | null>(null);

  protected readonly currentDoc = computed(() => SDK_DOCS[this.activeTab()]);

  protected setTab(tab: SdkTab): void {
    this.activeTab.set(tab);
    this.copiedKey.set(null);
  }

  protected copySnippet(key: string, text: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      void navigator.clipboard.writeText(text);
    }
    this.copiedKey.set(key);
    setTimeout(() => this.copiedKey.set(null), 2000);
  }

  protected downloadManifest(name: string, format: string): void {
    const content = `ZoeRobo Hardware Package Manifest\nArtifact: ${name}\nFormat: ${format}\nRepository: https://github.com/zoerobo/open-autonomy-stack\nLicense: MIT / Apache-2.0\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    this.lastDownloaded.set(name);
    setTimeout(() => this.lastDownloaded.set(null), 3500);
  }
}
