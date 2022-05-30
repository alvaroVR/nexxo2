import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterClientesRoutingModule } from './master-clientes-routing.module';
import { MasterClientesComponent } from './master-clientes.component';
import { AddMclientesComponent } from './modal-mclientes/add-mclientes/add-mclientes.component';
import { UpdMclientesComponent } from './modal-mclientes/upd-mclientes/upd-mclientes.component';
import { ModalMclientesComponent } from './modal-mclientes/modal-mclientes.component';
import {AgGridModule} from "ag-grid-angular";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MaterialModule} from "../../../material/material.module";

@NgModule({
  declarations: [MasterClientesComponent, AddMclientesComponent, UpdMclientesComponent, ModalMclientesComponent],
  imports: [
    CommonModule,
    MasterClientesRoutingModule,
    MatCardModule,
    AgGridModule,
    ReactiveFormsModule,
    MaterialModule,
    MatIconModule
  ]
})
export class MasterClientesModule { }
