import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadMonitorRoutingModule } from './load-monitor-routing.module';
import { LoadMonitorComponent } from './load-monitor/load-monitor.component';
import { LoadMonitorDetailComponent } from './load-monitor/load-monitor-detail/load-monitor-detail.component';
import { LoadMonitorErrorComponent } from './load-monitor/load-monitor-error/load-monitor-error.component';
import { LoadMonitorHeaderComponent } from './load-monitor/load-monitor-header/load-monitor-header.component';
import {ButtonAgComponent} from "../../_components/button-ag/button-ag.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";
import {AgGridModule} from "ag-grid-angular";


@NgModule({
  declarations: [
    LoadMonitorComponent,
    LoadMonitorDetailComponent,
    LoadMonitorErrorComponent,
    LoadMonitorHeaderComponent,
    ButtonAgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    LoadMonitorRoutingModule
  ]
})
export class LoadMonitorModule { }
