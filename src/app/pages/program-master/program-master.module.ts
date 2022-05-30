import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProgramMasterRoutingModule} from './program-master-routing.module';
import {ProgramMasterComponent} from './program-master/program-master.component';
import {DetailsPmComponent} from './program-master/details-pm/details-pm.component';
import {MyDateEditorComponent} from "../../_components/my-date-editor/my-date-editor.component";
import {SelectCellRenderComponent} from "../../_components/select-cell-render/select-cell-render.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";
import {AgGridModule} from "ag-grid-angular";


@NgModule({
  declarations: [
    ProgramMasterComponent,
    DetailsPmComponent,
    MyDateEditorComponent,
    SelectCellRenderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    ProgramMasterRoutingModule
  ]
})
export class ProgramMasterModule {
}
