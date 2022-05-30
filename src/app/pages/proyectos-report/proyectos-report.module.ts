import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectosReportRoutingModule } from './proyectos-report-routing.module';
import { ProyectosReportComponent } from './proyectos-report/proyectos-report.component';
import { DetailsProyectosReportComponent } from './proyectos-report/details-proyectos-report/details-proyectos-report.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";
import {AgGridModule} from "ag-grid-angular";


@NgModule({
  declarations: [
    ProyectosReportComponent,
    DetailsProyectosReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    ProyectosReportRoutingModule
  ]
})
export class ProyectosReportModule { }
