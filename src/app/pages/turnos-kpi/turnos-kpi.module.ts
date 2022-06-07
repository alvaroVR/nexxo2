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


@NgModule({
  declarations: [
    TurnosKpiComponent,
    GraficoTurnosKpiComponent,
    DetallesTurnosKpiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    RxReactiveFormsModule,
    TurnosKpiRoutingModule
  ]
})
export class TurnosKpiModule {
}
