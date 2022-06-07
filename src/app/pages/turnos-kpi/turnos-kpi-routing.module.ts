import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TurnosKpiComponent} from "./turnos-kpi/turnos-kpi.component";

const routes: Routes = [{
  path: '',
  component: TurnosKpiComponent,
  data: {title: 'Turnos KPI'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosKpiRoutingModule { }
