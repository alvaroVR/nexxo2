import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemizadoRoutingModule } from './itemizado-routing.module';
import { ItemizadoComponent } from './itemizado/itemizado.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";
import {AgGridModule} from "ag-grid-angular";


@NgModule({
  declarations: [
    ItemizadoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    ItemizadoRoutingModule
  ]
})
export class ItemizadoModule { }
