import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TurnosKpiRoutingModule} from './turnos-kpi-routing.module';
import {TurnosKpiComponent} from './turnos-kpi/turnos-kpi.component';
import {GraficoTurnosKpiComponent} from './turnos-kpi/grafico-turnos-kpi/grafico-turnos-kpi.component';
import {DetallesTurnosKpiComponent} from './turnos-kpi/detalles-turnos-kpi/detalles-turnos-kpi.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AgGridModule} from "ag-grid-angular";
import {RxReactiveFormsModule} from "@rxweb/reactive-form-validators";
import {MaterialModule} from "../../material/material.module";
import {ChartsModule} from "ng2-charts";
import { GraficoWeeklyTurnosKpiComponent } from './turnos-kpi/grafico-weekly-turnos-kpi/grafico-weekly-turnos-kpi.component';


@NgModule({
  declarations: [
    TurnosKpiComponent,
    GraficoTurnosKpiComponent,
    DetallesTurnosKpiComponent,
    GraficoWeeklyTurnosKpiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    RxReactiveFormsModule,
    TurnosKpiRoutingModule,
    ChartsModule
  ]
})
export class TurnosKpiModule {
}
