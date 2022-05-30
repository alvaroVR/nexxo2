import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadGanttInt2RoutingModule } from './load-gantt-int2-routing.module';
import { LoadGanttInt2Component } from './load-gantt-int2/load-gantt-int2.component';
import { UploadPmFilesComponent } from './load-gantt-int2/upload-pm-files/upload-pm-files.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";
import {AgGridModule} from "ag-grid-angular";


@NgModule({
  declarations: [
    LoadGanttInt2Component,
    UploadPmFilesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    LoadGanttInt2RoutingModule
  ]
})
export class LoadGanttInt2Module { }
