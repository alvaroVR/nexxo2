import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadGanttIntRoutingModule } from './load-gantt-int-routing.module';
import { LoadGanttIntComponent } from './load-gantt-int/load-gantt-int.component';
import { UploadMcMpfilesComponent } from './load-gantt-int/upload-mc-mpfiles/upload-mc-mpfiles.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";
import {AgGridModule} from "ag-grid-angular";


@NgModule({
  declarations: [
    LoadGanttIntComponent,
    UploadMcMpfilesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    LoadGanttIntRoutingModule
  ]
})
export class LoadGanttIntModule { }
