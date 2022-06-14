import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkersRoutingModule} from './workers-routing.module';
import {WorkersComponent} from './workers/workers.component';
import {DetallesWkComponent} from './workers/detalles-wk/detalles-wk.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";
import {AgGridModule} from "ag-grid-angular";
import { ModalWorkersComponent } from './workers/modal-workers/modal-workers.component';


@NgModule({
  declarations: [
    WorkersComponent,
    DetallesWkComponent,
    ModalWorkersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    WorkersRoutingModule,
  ]
})
export class WorkersModule {
}
