import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinishOtsRoutingModule } from './finish-ots-routing.module';
import { FinishOtsComponent } from './finish-ots/finish-ots.component';
import { DetallesFotsComponent } from './finish-ots/detalles-fots/detalles-fots.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";
import {AgGridModule} from "ag-grid-angular";


@NgModule({
  declarations: [
    FinishOtsComponent,
    DetallesFotsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    FinishOtsRoutingModule
  ]
})
export class FinishOtsModule { }
