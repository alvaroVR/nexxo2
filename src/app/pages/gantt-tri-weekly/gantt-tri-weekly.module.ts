import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { GanttTriWeeklyRoutingModule } from './gantt-tri-weekly-routing.module';
import { GanttTriWeeklyComponent } from './gantt-tri-weekly/gantt-tri-weekly.component';
import { ChartGanttTwComponent } from './gantt-tri-weekly/chart-gantt-tw/chart-gantt-tw.component';
import { GridTwComponent } from './gantt-tri-weekly/grid-tw/grid-tw.component';
import { ModalAedTwComponent } from './gantt-tri-weekly/modal-aed-tw/modal-aed-tw.component';
import { ModalGlaTwComponent } from './gantt-tri-weekly/modal-gla-tw/modal-gla-tw.component';
import { ProgramablesGlaTwComponent } from './gantt-tri-weekly/programables-gla-tw/programables-gla-tw.component';
import { RequisitosGlaTwComponent } from './gantt-tri-weekly/requisitos-gla-tw/requisitos-gla-tw.component';
import { AddAedTwComponent } from './gantt-tri-weekly/modal-aed-tw/add-aed-tw/add-aed-tw.component';
import { EditAedTwComponent } from './gantt-tri-weekly/modal-aed-tw/edit-aed-tw/edit-aed-tw.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";
import {AgGridModule} from "ag-grid-angular";
import {OnlyNumberDirective} from "../../_components/only-number.directive";
import {AppModule} from "../../app.module";
import {AutocompleteFilterComponent} from "../../_components/autocomplete-filter/autocomplete-filter.component";
import { ModalRealizadaComponent } from './gantt-tri-weekly/modal-realizada/modal-realizada.component';
import { CausasGlaTwComponent } from './gantt-tri-weekly/causas-gla-tw/causas-gla-tw.component';
import { ModalCausasExcesoComponent } from './gantt-tri-weekly/modal-causas-exceso/modal-causas-exceso.component';
import { CausasExcesoComponent } from './gantt-tri-weekly/causas-exceso/causas-exceso.component';
import { CausasCalidadComponent } from './gantt-tri-weekly/causas-calidad/causas-calidad.component';
import { CausasCalidadTabComponent } from './gantt-tri-weekly/causas-calidad-tab/causas-calidad-tab.component';


@NgModule({
  declarations: [
    GanttTriWeeklyComponent,
    ChartGanttTwComponent,
    GridTwComponent,
    ModalAedTwComponent,
    ModalGlaTwComponent,
    ProgramablesGlaTwComponent,
    RequisitosGlaTwComponent,
    AddAedTwComponent,
    EditAedTwComponent,
    AutocompleteFilterComponent,
    OnlyNumberDirective,
    ModalRealizadaComponent,
    CausasGlaTwComponent,
    ModalCausasExcesoComponent,
    CausasExcesoComponent,
    CausasCalidadComponent,
    CausasCalidadTabComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    GanttTriWeeklyRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [
    GridTwComponent
  ]
})
export class GanttTriWeeklyModule { }
