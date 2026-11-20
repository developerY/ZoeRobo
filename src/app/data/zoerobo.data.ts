export interface ResearchRecord {
  id: string;
  refCode: string;
  category: 'papers' | 'telemetry';
  mode: 'run' | 'drive' | 'fly' | 'swarm';
  domainLabel: string;
  icon: string;
  title: string;
  summary: string;
  tags: string[];
  author: string;
  readTime: string;
  ctaLabel: string;
  externalUrl?: string;
  abstractFull: string[];
  keyMetrics: { label: string; value: string }[];
}

export interface SpecRow {
  icon: string;
  subsystem: string;
  metric: string;
  implementation: string;
  rating: string;
  ratingHighlight?: 'success' | 'mode' | 'default';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  path: string;
  modeTag?: string;
  description: string;
  icon: string;
}

export const ZOEROBO_IMAGES = {
  logo: '/assets/aistudio/image_c61b1d4d.png',
  cleanroomLab:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDmS-rprvpHek9qeVy-XO-5dofkCqB6LNFmO1pRJOjGogVTkkm1ydTUd9XQfNRTDxK8n3yTfxTZMoR7s2RXBhRR7sFt-N5F80p1IUlxftiq79FNnyCZhT5EYxbBDQ2AWdoWQwWWvK4sZpcL4ZJE-dwN_QLhnm_c8WCJM_VfR6wUfCMUiYD3W2zNyOEXHM7Q8xoEUSHwjL6DvV_7I7fSUP3jXVLeLEdSZUWx-eSLTr4Y',
  workbenchRig:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBrYHgiuVdzQTzoN1ORm7OjnvolkEnHfwIROhYDsbmhoKXxB2HJHfUKso5bowadnf6mNeG6x7OnyDlwpEMVpOd0yFxhupXShU-cjNGuIQDMmXS2ioZCOaI3ICgSWWp0Ks3dgH7MRFOCsU5Z4g3X7kC_hfG5nlvDC7Kozbtb8-5Q4fn61ssjDroM3hGDDTyZrs6WRDXn5yp7mdsA4thJzcr_dCuM8T9mJuZML57nV4gd',
  fireflyDrone:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD5-haOy24TBfzJJqzCwbxd6rKJF4TIxNJJ7SR2-9CRo3WqeTkIZaZc4FghYUVeukIVnGDTJTvkGhKIO6BPA8lEtEY4z5ojWkCWveY-ql0qRpKVUue4KijL9_DT9vcy1EaP67l_V7FbhE5xzpIGqQKRqkqUXRKzyimmxrV6--waUPQQUs20kI5PjiJE_cQBfQh4jaOkA3ZLlzR5Hc94Q9-4qEe7Za5y_4RDOUYrDua_',
  jagurCard:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA9Bm_nciyjjsQYkDKpbNHfD0XRFhU154gxF1b1ElKzV1wFtQGZOZN4-vnQ2uwtSxCaCQ1D9uu3RVacyvL6G5SNV3nEn97P0HdUydKA5MKAFo_lnYTYbSXSv9q2LZ9LerdSysMVSfVsi8_NFkGS-MtTIYMu_lFGWqM09PlUkbaDLBK4tzSOqJ-lnupjeyUg_6vZfgiyoyQKJR7VVBGBRFGhGORQVDekPV7ob2EyFGT7',
  jagurHero:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCjYx-Ymr1S9mCvgQmp8V9Ka0n8BXZmFdnALBnu9p2dh1-z_JhAidPBu7dq4Antie_6jNGliwHVWsh95JjcM20MhWZ5hqz9Q-JNPVFostPkL2YxTomTbwTyjeIA9fqCvCxbAAlkVQk5ceaqf9IG-lesFhv6tLWg1_FyNH40jtlxfpmfq1L3I1sc3RlpQv_R2WFF6bYQnXMpxrT5NP1WC7pV9hGDwqD8hnt4z4WPEyCm',
  jagurPerimeter:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDCx6CisGNugPYPTUIeTp9VNvqpPH4IhhnoWpz7AzOPiyUS2G-kAYjXG4L6ZlRZkSm0ZkJ2l8XHgL71I0So-8NuyW3e1uQeaxuqR3R0pDvNAsKC9tyGqjuMdCM8SPM-ok5m5Atz_BUoI_4-Wj5fk76qqCF97zvMapxwEDOfC1p7RpjLOBd6PUcYkqVlqMOOkaeBubu6wWlwv8SIlkZsPzCJSZSj9yfB0qpQXxizyI-r',
  jagurInspection:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCUZCXTjVrklqBtjyLq2lQ4Mk_7C-Ie4zaRVKkKuQu3Q-0PiuWg_K0Rvlg7FsMdMHaFFCOiLHVlGTeeSpCIsNp9AH6C1z4FjQfo3XV00pcCjRd8ZaXUxWOC2eLCUT_fZ8zb5BNzinJvVB9TbwLFWaTUHlMMnNda5pFqUn-v_4Hw2bCcQeDK-M51A5W_vjpyAGFDzS9WT4PHi9zARk00BbEbfMOm-2ldCYcLBsN4DHHk',
  jagurSearch:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD6wQRT3yXeESGy0JXHkR3X5TnzB3suTB8wCzb3gHPp3SVZ7HP38XztlmVn5VYLPzlp5dKcbrD8YO4ZyBJvvD6uHm4GjtCkagVHZwBuZrJ9o1yI5_EPkQ_9-UpeY7A7P-3U4Tv6oAspF1s1LOzTAxpGGtu8PGy_FYaN-YE0dHBB2CGx4Vr3C9x_GYknw_1Z_XjEwL44uodBfJtKoh3fw_NHu_9MR60lPVubeE4pQItg',
  jagurConstruction:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBAmsfZGpOfi42PwJ7yALKRdXcYjC6wURQjKy_eG7euEEpwi7LvE1iTPfm8yEtpSEC1XORQtKxOwHODdo6KtYPOEc5SP5NQvzHfq9Ztu8zHsZjbBTdR1tTuFyiX-bHXOURqA3YQ8dsfSs9jlFVwF5bEDBLjSPMcr4BnJK5bupHCkv1jUKmJCRSymekXTQyqM1kg3ss_-tT_lNjpLKDHRckx-pPsTFcwfopeeem4RWep',
  aimlDriveHero:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBKun81VQIOfkKLbZnBkdhuifVz3z76XaVYE14sLFkrCKtyYneM9nE_GZjasGvRWDlyPzebyP2zmiwqGZNXqkBfmBZ7WiXFo_9pRjmZfhRdDEKxWh5xbpJY4MFjZ5FIMHeBiPjb0THPg4fkmtoXZk5uyrQINpwhXC5G7GCgTmer2SoGZvDsi4WqtVgC45_3BZesVWPl79bzh8Bva3BGM-YX3_aRtK5PxXcQoY78InEu',
  legoConcept:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAfyYtgTXtBMRr8ouojz0rLF7iAq2aVtOlX12-ppya2VakFbPHYYMJNNINwQF1P0pEw7udPmFUyZqtwYbREhVmrpueEAZuw4X0T4qwN5Mk3NjqEsdIAfZOAKnwQxFaqhHvgeZ4Zi-YkjleEHzPN9aL550lADxeg4mB5q44rmhCHHNlsJqGfKaGpIRjU3f4CSI0rNKpn7LFlNO4KIqArOCrbRHzEI9-WLKrHxoxS1VD3',
} as const;

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  {
    label: 'Overview',
    path: '/overview',
    description: 'ZoeRobo fleet overview, edge AI pillars, and live telemetry console',
    icon: 'dashboard',
  },
  {
    label: 'FireFly Drone',
    path: '/firefly-drone',
    modeTag: 'FLY',
    description: 'Autonomous micro-UAS with on-device DeepSeek LLM spatial guidance',
    icon: 'flight',
  },
  {
    label: 'Jag.U.R Robot',
    path: '/jag-u-r-robot',
    modeTag: 'RUN',
    description: '18-DOF all-terrain quadruped utility robot with kinematic profiler',
    icon: 'precision_manufacturing',
  },
  {
    label: 'AI/ML Drive',
    path: '/ai-ml-drive',
    modeTag: 'DRIVE',
    description: 'Smartphone Edge TPU autonomous mobility, LEGO concept & Pixelopolis',
    icon: 'directions_car',
  },
  {
    label: 'Info & Research',
    path: '/info-and-research',
    description: 'YLabZ divisions, empirical research repository, labs contact & FAQ',
    icon: 'science',
  },
];

export const RESEARCH_RECORDS: ResearchRecord[] = [
  {
    id: 'drone-mind',
    refCode: 'REF: ZR-FLY-2024-01',
    category: 'papers',
    mode: 'fly',
    domainLabel: 'MICRO-UAS // AUTONOMOUS',
    icon: 'flight',
    title: 'Drone with a Mind of Its Own',
    summary:
      'A comprehensive study detailing autonomous aerial navigation powered strictly by onboard micro-quantized reasoning engines. Demonstrates zero-latency obstacle rerouting without radio telemetry or external compute clusters.',
    tags: ['Local LLM', 'Stereo VIO', '34g Payload'],
    author: 'ZoeRobo Flight Lab',
    readTime: '8 MIN READ',
    ctaLabel: 'Read Paper',
    externalUrl: 'https://zoewave.medium.com/drone-with-a-mind-of-its-own-bd946b445f40',
    abstractFull: [
      'Traditional domestic drones rely on pre-mapped coordinate grids or cloud-tethered APIs that fail during Wi-Fi congestion and expose private indoor video streams. FireFly reverses this paradigm by executing a 4-bit quantized DeepSeek-R1 distilled model directly on a sub-250g carbon airframe.',
      'Visual-Inertial Odometry (VIO) running at 60 Hz fuses with four solid-state micro-dToF sensors to maintain a live topological mesh. When given a colloquial prompt such as "Go to the kitchen and make sure everything is off," the onboard model decomposes spatial waypoints, hovers at a 0.9m standoff, and runs microbolometer thermal verification.',
      'Deterministic ROS2 micro-executor safety envelopes override any invalid path proposals within 0.12 ms, maintaining a strict 15 cm collision clearance around people, furniture, and walls.',
    ],
    keyMetrics: [
      { label: 'Onboard Inference', value: '0.12 ms first-token' },
      { label: 'Acoustic Floor', value: '< 28 dBA shrouded' },
      { label: 'Dry Weight', value: '242g (Sub-250g)' },
    ],
  },
  {
    id: 'jagur-kinematics',
    refCode: 'REF: ZR-JAG-2024-04',
    category: 'papers',
    mode: 'run',
    domainLabel: 'QUADRUPED // KINEMATICS',
    icon: 'precision_manufacturing',
    title: 'Jag.U.R™: Journey Agile Guiding Kinematics',
    summary:
      'Mathematical modeling and terrain-reactive torque distribution for quadruped ground walkers. Focuses on dynamic gait transitions over gravel, stairs, and loose mud using high-speed IMU feedback loops.',
    tags: ['Cycloidal Actuators', 'Dynamic Balance', 'ROS2 Humble'],
    author: 'YLabZ Mechatronics',
    readTime: '12 MIN READ',
    ctaLabel: 'Read Paper',
    externalUrl: 'https://zoewave.medium.com/jag-u-r-utility-robot-d6045e215b20',
    abstractFull: [
      'All-terrain quadruped locomotion requires eliminating mechanical gearbox backlash while keeping joint inertia low enough to absorb 450N linear ground impacts. Jag.U.R pairs 1:30 harmonic planetary reducers with 1,200 Hz CAN-FD field-oriented control.',
      'An adaptive terrain estimator continuously evaluates proprioceptive foot slip and updates stance impedance in under 14 milliseconds—enabling smooth transitions from hard tarmac to loose gravel, rubble, and 38° industrial grating stairs.',
      'Paired with a 360° solid-state LiDAR dome and dual Edge TPU modules (275 TOPS), the platform supports up to 15 kg of dorsal utility payload across 2.5 hours of continuous field operation.',
    ],
    keyMetrics: [
      { label: 'Peak Joint Torque', value: '120 Nm / joint' },
      { label: 'Top Sprint Velocity', value: '4.5 m/s (16.2 km/h)' },
      { label: 'Ingress Protection', value: 'IP67 Submersible' },
    ],
  },
  {
    id: 'lego-av-concept',
    refCode: 'REF: ZR-DRV-2023-09',
    category: 'telemetry',
    mode: 'drive',
    domainLabel: 'MINI-AV // SMARTPHONE TPU',
    icon: 'directions_car',
    title: 'Self-Driving LEGO Car Concept',
    summary:
      'An accessible benchmark demonstrating commercial mobile phones paired with Edge TPU coprocessors executing lane keeping, traffic signal recognition, and dynamic collision avoidance on modular chassis.',
    tags: ['Edge TPU', 'OpenCV C++', 'Ackermann Steering'],
    author: 'ZoeRobo AI Research',
    readTime: '9 MIN READ',
    ctaLabel: 'View Project Specs',
    externalUrl: 'https://zoewave.medium.com/self-driving-lego-car-concept-c3a50e72cccc',
    abstractFull: [
      'Autonomous vehicle development typically requires $15,000+ trunk-mounted GPU servers and industrial LiDAR arrays. The Self-Driving LEGO® Car Concept demonstrates how an everyday consumer smartphone plus a modular Technic 4WD chassis delivers complete Level-3 edge autonomy for under $400.',
      'Camera frames at 1280x720@60p feed directly into a quantized MobileNet-SSD + semantic lane segmentation graph on the handset neural core. Steering vectors transmit via Nordic BLE UART to an ESP32/Technic PID loop running at 200 Hz.',
      'The complete harness supports lane centerline tracking (±1.2 cm), pedestrian emergency braking, stop-sign compliance, and automated parallel parking.',
    ],
    keyMetrics: [
      { label: 'Vision Pipeline', value: '60.2 FPS INT8' },
      { label: 'Glass-to-Actuator', value: '11.4 ms latency' },
      { label: 'Total BOM Cost', value: '< $400 USD' },
    ],
  },
  {
    id: 'pixelopolis-fleet',
    refCode: 'REF: ZR-SWM-2023-11',
    category: 'telemetry',
    mode: 'swarm',
    domainLabel: 'SWARM // MULTI-AGENT',
    icon: 'hub',
    title: 'Pixelopolis Interactive Fleet',
    summary:
      'A high-density fleet of autonomous micro-vehicles navigating an engineered urban miniature grid. Powered by TensorFlow Lite inference, decentralized mesh communications, and dynamic cooperative routing.',
    tags: ['TensorFlow Lite', 'BLE Mesh V2', 'Cooperative Cruise'],
    author: 'YLabZ Swarm Division',
    readTime: '10 MIN READ',
    ctaLabel: 'View Fleet Blueprint',
    externalUrl:
      'https://blog.tensorflow.org/2020/07/pixelopolis-self-driving-car-demo-tensorflow-lite.html',
    abstractFull: [
      'Pixelopolis is an interactive urban testbed where miniature autonomous cars navigate intersections, multi-phase traffic signals, and live pedestrians using Pixel phones running TensorFlow Lite on the Pixel Neural Core (Edge TPU).',
      'Each vehicle computes real-time Time-To-Impact (TTI) metrics and negotiates right-of-way using decentralized BLE Mesh V2 beacons, demonstrating resilient multi-agent coordination with zero central traffic server.',
      'Sustained hardware INT8 quantization keeps average compute draw at 1.4W, allowing hours of continuous public exhibition without thermal throttling.',
    ],
    keyMetrics: [
      { label: 'TPU Latency', value: '8.3 ms / frame' },
      { label: 'Power Envelope', value: '1.4W continuous' },
      { label: 'Classifier Accuracy', value: '98.4% mean' },
    ],
  },
];

export const FIREFLY_SPECS: SpecRow[] = [
  {
    icon: 'memory',
    subsystem: 'Onboard Compute',
    metric: '38.4 TOPS INT8 NPU',
    implementation: 'Dual Edge Coral TPU + ARM Cortex-A78 Octa-Core',
    rating: '0.12ms inference',
    ratingHighlight: 'default',
  },
  {
    icon: 'psychology',
    subsystem: 'Language Engine',
    metric: 'DeepSeek-R1 Distilled',
    implementation: '4-Bit Quantized Local Spatial Guidance Model',
    rating: '100% On-Device',
    ratingHighlight: 'success',
  },
  {
    icon: 'timer',
    subsystem: 'Flight Endurance',
    metric: '22 Minutes (Active Hover)',
    implementation: 'High-Density 4S 1800mAh LiHV Micro-Cell',
    rating: '± 45 sec margin',
    ratingHighlight: 'default',
  },
  {
    icon: 'speed',
    subsystem: 'Operational Velocity',
    metric: '4.8 m/s (Indoor Safe)',
    implementation: '1106 4500KV Brushless Motors w/ Toroidal Shrouds',
    rating: 'Max 12 m/s open',
    ratingHighlight: 'default',
  },
  {
    icon: 'sensors',
    subsystem: 'Sensors & Vision',
    metric: '4K RGB + Microbolometer',
    implementation: 'Sony IMX Sensor + 160x120 Long-Wave Thermal + 360° dToF',
    rating: '60 fps VIO sync',
    ratingHighlight: 'default',
  },
  {
    icon: 'scale',
    subsystem: 'Dry Airframe Weight',
    metric: '242 grams (Sub-250g)',
    implementation: 'Toray 3K Pre-preg Carbon Fiber Unibody',
    rating: 'FAA Reg Exempt',
    ratingHighlight: 'success',
  },
  {
    icon: 'wifi_off',
    subsystem: 'Wireless Protocol',
    metric: 'Local Wi-Fi 6E + Matter',
    implementation: 'Encrypted mTLS Local Home Hub Socket Zero-WAN',
    rating: 'Air-Gapped',
    ratingHighlight: 'success',
  },
];

export const JAGUR_SPECS: SpecRow[] = [
  {
    icon: 'adjust',
    subsystem: 'Kinematic Mobility System',
    metric: '4 Articulated legs, 18 Degrees of Freedom',
    implementation: 'Harmonic drive reduction 1:30, 120 Nm torque max',
    rating: 'CERTIFIED',
    ratingHighlight: 'success',
  },
  {
    icon: 'speed',
    subsystem: 'Maximum Traverse Velocity',
    metric: '4.5 m/s (16.2 km/h) Sprint Trotting',
    implementation: 'Zero-skid dynamic surface compensation',
    rating: 'BENCHMARKED',
    ratingHighlight: 'success',
  },
  {
    icon: 'battery_saver',
    subsystem: 'Power & Energy Storage',
    metric: '2.5 Hours Continuous / Hot-Swap 48V LiFePO4',
    implementation: 'Dual 980Wh modules, 15-minute quick-dock replenishment',
    rating: 'NOMINAL',
    ratingHighlight: 'success',
  },
  {
    icon: 'visibility',
    subsystem: 'Perception & LiDAR Core',
    metric: '360° Solid State LiDAR + Dual Stereo 4K RGB-D',
    implementation: '120m range, 0.45ms SLAM odometry cycle',
    rating: 'ACTIVE',
    ratingHighlight: 'success',
  },
  {
    icon: 'memory',
    subsystem: 'Edge Compute & AI Engine',
    metric: 'Dual Edge TPU Neural Coprocessors (275 TOPS)',
    implementation: 'DeepSeek LLM + TF Lite INT8 kinematic inference',
    rating: 'ONLINE',
    ratingHighlight: 'success',
  },
  {
    icon: 'lan',
    subsystem: 'Connectivity & Interfaces',
    metric: 'Gigabit Ethernet, Dual CAN-FD, Private 5G / LTE-M',
    implementation: 'NATO standard dorsal rails with 24V aux power tap',
    rating: 'COMPLIANT',
    ratingHighlight: 'success',
  },
  {
    icon: 'shield',
    subsystem: 'Chassis Ruggedization',
    metric: 'IP67 Submersible / MIL-STD-810H Drop & Vibe',
    implementation: 'Operating temp range: -20°C to +55°C',
    rating: 'PASSED',
    ratingHighlight: 'success',
  },
];

export const LAB_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Are ZoeRobo kinematic designs and code bases open source?',
    answer:
      'Yes. Core flight stabilization, quadruped gait inverse kinematics (IK), and Edge TPU inference pipelines are hosted on our GitHub under permissive MIT and Apache 2.0 licenses. Specific proprietary actuator geometry and carbon mold schematics are distributed freely to registered academic research partners.',
  },
  {
    id: 'faq-2',
    question: 'How does ZoeRobo achieve AI autonomy without cloud connectivity?',
    answer:
      'All visual perception, semantic SLAM, and tactical trajectory decisions run on localized Edge TPUs and quantized neural weights (TensorFlow Lite / DeepSeek Local INT4/INT8). Compute resides entirely on the robot’s physical board, guaranteeing zero latency, absolute privacy, and resilient operation in underground, wilderness, or electromagnetically hostile environments.',
  },
  {
    id: 'faq-3',
    question: 'Can we acquire physical FireFly™ and Jag.U.R™ developer hardware kits?',
    answer:
      'Batch developer kits are assembled directly within YLabZ Silicon Valley. We allocate hardware to qualified university departments, aerospace developers, and independent robotics engineers quarterly. Fill out the outreach form above with your proposed mission profile to apply for the next hardware allocation cycle.',
  },
  {
    id: 'faq-4',
    question: 'What middleware framework is standard across ZoeRobo robots?',
    answer:
      'Our standard operational middleware is ROS2 Humble / Iron running on Ubuntu 22.04 LTS real-time kernels (RT-PREEMPT). CAN-FD motor buses interface via zero-copy C++ nodes, enabling microsecond actuation loops. Micro-ROS is used on our peripheral ESP32-S3 and STM32 auxiliary flight controllers.',
  },
];
