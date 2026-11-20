import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview',
  },
  {
    path: 'overview',
    title: 'ZoeRobo — Autonomous Robotics | Run, Drive & Fly',
    loadComponent: () =>
      import('./pages/overview/overview').then((m) => m.Overview),
  },
  {
    path: 'firefly-drone',
    title: 'FireFly™ Micro Drone | ZoeRobo',
    loadComponent: () =>
      import('./pages/firefly-drone/firefly-drone').then((m) => m.FireflyDrone),
  },
  {
    path: 'jag-u-r-robot',
    title: 'Jag.U.R™ Utility Quadruped | ZoeRobo',
    loadComponent: () =>
      import('./pages/jagur-robot/jagur-robot').then((m) => m.JagurRobot),
  },
  {
    path: 'ai-ml-drive',
    title: 'AI/ML Drive — Edge Intelligence Mobility | ZoeRobo',
    loadComponent: () =>
      import('./pages/aiml-drive/aiml-drive').then((m) => m.AimlDrive),
  },
  {
    path: 'info-and-research',
    title: 'Info, Research & ZoeRobo Labs | ZoeRobo',
    loadComponent: () =>
      import('./pages/info-research/info-research').then((m) => m.InfoResearch),
  },
  {
    path: 'documentation',
    title: 'Documentation & ROS2 SDK | ZoeRobo',
    loadComponent: () =>
      import('./pages/documentation/documentation').then((m) => m.Documentation),
  },
  {
    path: '**',
    redirectTo: 'overview',
  },
];
