import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProyectosReportComponent} from "./proyectos-report/proyectos-report.component";

const routes: Routes = [{
  path: '',
  component: ProyectosReportComponent,
  data: {title: 'Reporte de Proyectos'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosReportRoutingModule { }
