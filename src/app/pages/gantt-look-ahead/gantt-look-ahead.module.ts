import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {GanttLookAheadRoutingModule} from './gantt-look-ahead-routing.module';
import {GanttLookAheadComponent} from './gantt-look-ahead/gantt-look-ahead.component';
import {ProgramablesGlaComponent} from './gantt-look-ahead/programables-gla/programables-gla.component';
import {RequisitosGlaComponent} from './gantt-look-ahead/requisitos-gla/requisitos-gla.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../../material/material.module";
import {GridGlaComponent} from './gantt-look-ahead/grid-gla/grid-gla.component';
import {AgGridModule} from "ag-grid-angular";
import {ChartGanttComponent} from './gantt-look-ahead/chart-gantt/chart-gantt.component';
import {ModalAedComponent} from "./gantt-look-ahead/modal-aed/modal-aed.component";
import {AddAedComponent} from "./gantt-look-ahead/modal-aed/add-aed/add-aed.component";
import {EditAedComponent} from "./gantt-look-ahead/modal-aed/edit-aed/edit-aed.component";
import {ButtonsAedComponent} from "../../_components/buttons-aed/buttons-aed.component";
import {EmptyChartGantComponentComponent} from "../../_components/empty-chart-gant-component/empty-chart-gant-component.component";
import {CheckboxtextComponent} from "../../_components/checkboxtext/checkboxtext.component";
import {AgGridCheckboxComponent} from "../../_components/ag-grid-checkbox/ag-grid-checkbox.component";
import {ModalGlaComponent} from './gantt-look-ahead/modal-gla/modal-gla.component';
import {ButtonWithNumberComponent} from "../../_components/button-with-number/button-with-number.component";


@NgModule({
  declarations: [
    GanttLookAheadComponent,
    ProgramablesGlaComponent,
    RequisitosGlaComponent,
    GridGlaComponent,
    ChartGanttComponent,
    ModalAedComponent,
    AddAedComponent,
    EditAedComponent,
    EmptyChartGantComponentComponent,
    CheckboxtextComponent,
    ButtonsAedComponent,
    AgGridCheckboxComponent,
    ModalGlaComponent,
    ButtonWithNumberComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    GanttLookAheadRoutingModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [
    GridGlaComponent
  ]
})
export class GanttLookAheadModule {
}
