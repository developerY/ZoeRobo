import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

type SdkTab = 'jagur' | 'firefly' | 'drive';

interface SdkDocSpec {
  id: SdkTab;
  title: string;
  modeTag: string;
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
    title: 'Jag.U.R™ Quadruped ROS2 & CAN-FD SDK',
    modeTag: 'RUN // QUADRUPED',
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
    title: 'FireFly™ Micro-UAS DeepSeek Local Guidance SDK',
    modeTag: 'FLY // MICRO UAS',
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
    title: 'AI/ML Drive Smartphone Edge TPU & BLE Bridge',
    modeTag: 'DRIVE // WHEELED AGV',
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
    <div class="flex flex-col w-full">
      <!-- Top Ribbon -->
      <section class="w-full bg-canvas-pure border-b border-border-grid/70 px-6 md:px-12 py-8">
        <div class="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div class="space-y-2">
            <div class="flex items-center gap-2 font-mono text-[11px] text-on-surface-variant">
              <span class="px-2.5 py-0.5 rounded bg-surface-container-high text-primary font-bold">
                SDK &amp; API REFERENCE // V4.2
              </span>
              <span class="text-outline">/</span>
              <span>ROS2 HUMBLE • TFLITE • DEEPSEEK EDGE</span>
            </div>
            <h1 class="font-display text-[38px] sm:text-[48px] leading-[1.08] font-bold text-on-surface tracking-[-0.03em]">
              ZoeRobo Developer Documentation
            </h1>
            <p class="text-[16px] leading-6 text-on-surface-variant max-w-2xl">
              Zero-cloud robotics middleware, URDF hardware schematics, CAN-FD actuator protocols,
              and quantized Edge TPU deployment guides across Run, Drive &amp; Fly platforms.
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              (click)="setTab('jagur')"
              class="px-4 py-2 rounded font-mono text-[12px] uppercase tracking-wider transition-all cursor-pointer"
              [class.bg-mode-run]="activeTab() === 'jagur'"
              [class.text-canvas-pure]="activeTab() === 'jagur'"
              [class.font-semibold]="activeTab() === 'jagur'"
              [class.bg-canvas-subtle]="activeTab() !== 'jagur'"
              [class.text-on-surface-variant]="activeTab() !== 'jagur'"
            >
              Jag.U.R (Run)
            </button>
            <button
              type="button"
              (click)="setTab('firefly')"
              class="px-4 py-2 rounded font-mono text-[12px] uppercase tracking-wider transition-all cursor-pointer"
              [class.bg-mode-fly]="activeTab() === 'firefly'"
              [class.text-canvas-pure]="activeTab() === 'firefly'"
              [class.font-semibold]="activeTab() === 'firefly'"
              [class.bg-canvas-subtle]="activeTab() !== 'firefly'"
              [class.text-on-surface-variant]="activeTab() !== 'firefly'"
            >
              FireFly (Fly)
            </button>
            <button
              type="button"
              (click)="setTab('drive')"
              class="px-4 py-2 rounded font-mono text-[12px] uppercase tracking-wider transition-all cursor-pointer"
              [class.bg-mode-drive]="activeTab() === 'drive'"
              [class.text-canvas-pure]="activeTab() === 'drive'"
              [class.font-semibold]="activeTab() === 'drive'"
              [class.bg-canvas-subtle]="activeTab() !== 'drive'"
              [class.text-on-surface-variant]="activeTab() !== 'drive'"
            >
              AI/ML Car (Drive)
            </button>
          </div>
        </div>
      </section>

      <!-- Main SDK Reference Content -->
      <section class="w-full px-6 md:px-12 py-10">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Left Main Docs -->
          <div class="lg:col-span-8 space-y-6">
            <div class="bg-canvas-pure border border-border-grid rounded-xl p-6 shadow-sm space-y-5">
              <div class="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-border-grid/60">
                <div>
                  <span class="font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                    {{ currentDoc().modeTag }}
                  </span>
                  <h2 class="font-display text-[26px] font-semibold text-on-surface mt-0.5">
                    {{ currentDoc().title }}
                  </h2>
                </div>
                <span class="font-mono text-[11px] px-2.5 py-1 rounded bg-canvas-subtle text-on-surface-variant">
                  {{ currentDoc().middleware }}
                </span>
              </div>

              <!-- Quickstart Commands -->
              <div class="space-y-4">
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="font-mono text-[11px] uppercase text-outline font-semibold">
                      1. Install Package &amp; Model Checkpoints
                    </span>
                    <button
                      type="button"
                      (click)="copySnippet('install', currentDoc().installCmd)"
                      class="font-mono text-[11px] text-primary hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <mat-icon class="text-[14px]">content_copy</mat-icon>
                      <span>{{ copiedKey() === 'install' ? 'Copied' : 'Copy' }}</span>
                    </button>
                  </div>
                  <pre
                    class="p-4 rounded-lg bg-inverse-surface text-inverse-on-surface font-mono text-[12px] overflow-x-auto"
                  ><code>$ {{ currentDoc().installCmd }}</code></pre>
                </div>

                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="font-mono text-[11px] uppercase text-outline font-semibold">
                      2. Launch Autonomous Stack
                    </span>
                    <button
                      type="button"
                      (click)="copySnippet('launch', currentDoc().launchCmd)"
                      class="font-mono text-[11px] text-primary hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <mat-icon class="text-[14px]">content_copy</mat-icon>
                      <span>{{ copiedKey() === 'launch' ? 'Copied' : 'Copy' }}</span>
                    </button>
                  </div>
                  <pre
                    class="p-4 rounded-lg bg-inverse-surface text-inverse-on-surface font-mono text-[12px] overflow-x-auto"
                  ><code>$ {{ currentDoc().launchCmd }}</code></pre>
                </div>
              </div>
            </div>

            <!-- ROS2 / Telemetry Topic Table -->
            <div class="bg-canvas-pure border border-border-grid rounded-xl shadow-sm overflow-hidden">
              <div class="px-6 py-4 bg-canvas-subtle border-b border-border-grid/70 flex items-center justify-between">
                <h3 class="font-display text-[20px] font-semibold text-on-surface">
                  Published Telemetry Topics &amp; Interfaces
                </h3>
                <span class="font-mono text-[10px] text-outline">ZERO-COPY DDS</span>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-[13px]">
                  <thead class="bg-surface-container-low font-mono text-[10px] uppercase text-on-surface-variant">
                    <tr>
                      <th class="py-3 px-4">Topic Path</th>
                      <th class="py-3 px-4">Message Type</th>
                      <th class="py-3 px-4">Rate</th>
                      <th class="py-3 px-4">Description</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-border-grid/60">
                    @for (topic of currentDoc().topics; track topic.name) {
                      <tr class="hover:bg-canvas-subtle transition-colors">
                        <td class="py-3.5 px-4 font-mono text-[12px] font-semibold text-primary">
                          {{ topic.name }}
                        </td>
                        <td class="py-3.5 px-4 font-mono text-[11px] text-on-surface-variant">
                          {{ topic.type }}
                        </td>
                        <td class="py-3.5 px-4 font-mono text-[11px] text-signal-success font-semibold tabular-nums">
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

          <!-- Right Sidebar: Schematics & Hardware Kits -->
          <div class="lg:col-span-4 space-y-6">
            <div class="bg-canvas-pure border border-border-grid rounded-xl p-6 shadow-sm space-y-4">
              <div class="font-mono text-[10px] uppercase tracking-wider text-outline font-semibold">
                Hardware Schematics &amp; CAD Bundles
              </div>
              <div class="space-y-3">
                @for (file of currentDoc().downloads; track file.name) {
                  <div class="p-3.5 rounded-lg bg-canvas-subtle border border-border-grid/60 flex items-center justify-between gap-3">
                    <div class="min-w-0">
                      <div class="font-mono text-[12px] font-semibold text-on-surface truncate">
                        {{ file.name }}
                      </div>
                      <div class="font-mono text-[10px] text-outline mt-0.5">
                        {{ file.format }} · {{ file.size }}
                      </div>
                    </div>
                    <button
                      type="button"
                      (click)="downloadManifest(file.name, file.format)"
                      class="px-3 py-1.5 rounded bg-canvas-pure border border-border-grid hover:border-mode-run text-primary font-mono text-[11px] font-semibold shrink-0 cursor-pointer flex items-center gap-1"
                    >
                      <mat-icon class="text-[15px]">download</mat-icon>
                      <span>Get</span>
                    </button>
                  </div>
                }
              </div>
              @if (lastDownloaded()) {
                <div class="p-2.5 rounded bg-signal-success/10 text-signal-success font-mono text-[11px] flex items-center gap-1.5">
                  <mat-icon class="text-[15px]">check_circle</mat-icon>
                  <span>Downloaded manifest for {{ lastDownloaded() }}</span>
                </div>
              }
            </div>

            <div class="bg-surface-container-low border border-border-grid/70 rounded-xl p-6 space-y-3">
              <div class="font-mono text-[10px] uppercase tracking-wider text-mode-run font-bold">
                Need Custom Firmware Support?
              </div>
              <h3 class="font-display text-[20px] font-semibold text-on-surface">
                Partner with YLabZ Engineers
              </h3>
              <p class="text-[13px] leading-5 text-on-surface-variant">
                Request academic kit allocations, custom payload drivers, or on-site ROS2
                integration assistance.
              </p>
              <a
                routerLink="/info-and-research"
                fragment="contact-labs"
                class="w-full py-2.5 px-4 rounded bg-mode-run hover:bg-primary text-canvas-pure font-mono text-[12px] font-semibold uppercase tracking-wider text-center inline-flex items-center justify-center gap-1.5 transition-colors"
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
