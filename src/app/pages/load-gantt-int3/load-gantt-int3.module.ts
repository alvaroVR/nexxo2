import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadGanttInt3RoutingModule } from './load-gantt-int3-routing.module';
import { LoadGanttInt3Component } from './load-gantt-int3/load-gantt-int3.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";
import {AgGridModule} from "ag-grid-angular";
import {UploadPmFiles3Component} from "./load-gantt-int3/upload-pm-files/upload-pm-files3.component";


@NgModule({
  declarations: [
    LoadGanttInt3Component,
    UploadPmFiles3Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    LoadGanttInt3RoutingModule
  ]
})
export class LoadGanttInt3Module { }
