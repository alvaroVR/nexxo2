import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./_helpers/auth.guard";
import {LoginComponent} from "./pages/login/login/login.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home-routing.module').then(m => m.HomeRoutingModule),
      },
    ]
  },
  {
    path: 'ganttLookAHead',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/gantt-look-ahead/gantt-look-ahead.module').then(m => m.GanttLookAheadModule),
  },
  {
    path: 'trabajadores',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/workers/workers.module').then(m => m.WorkersModule),
  },
  {
    path: 'uploadmix',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/upload-mix/upload-mix.module').then(m => m.UploadMixModule),
  },
  {
    path: 'loadGanttInt',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/load-gantt-int/load-gantt-int.module').then(m => m.LoadGanttIntModule),
  },
  {
    path: 'createProject',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/crear-proyecto/crear-proyecto.module').then(m => m.CrearProyectoModule),
  },
  {
    path: 'loadMonitor',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/load-monitor/load-monitor.module').then(m => m.LoadMonitorModule),
  },
  {
    path: 'itemizado',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/itemizado/itemizado.module').then(m => m.ItemizadoModule),
  },
  {
    path: 'programMaster',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/program-master/program-master.module').then(m => m.ProgramMasterModule),
  },
  {
    path: 'proyectosReport',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/proyectos-report/proyectos-report.module').then(m => m.ProyectosReportModule),
  },
  {
    path: 'ganttTriWeekly',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/gantt-tri-weekly/gantt-tri-weekly.module').then(m => m.GanttTriWeeklyModule),
  }, {
    path: 'loadGanttInt2',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/load-gantt-int2/load-gantt-int2.module').then(m => m.LoadGanttInt2Module),
  },
  {
    canActivate: [AuthGuard],
    path: 'batchTrigger',
    loadChildren: () => import('./pages/batch-trigger/batch-trigger.module').then(m => m.BatchTriggerModule),
  },

  {
    canActivate: [AuthGuard],
    path: 'loadGanttInt3',
    loadChildren: () => import('./pages/load-gantt-int3/load-gantt-int3.module').then(m => m.LoadGanttInt3Module),
  },
  {
    canActivate: [AuthGuard],
    path: 'turnosKpi',
    loadChildren: () => import('./pages/turnos-kpi/turnos-kpi.module').then(m => m.TurnosKpiModule),
  },
  {
    canActivate: [AuthGuard],
    path: 'finishOTs',
    loadChildren: () => import('./pages/finish-ots/finish-ots.module').then(m => m.FinishOtsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
