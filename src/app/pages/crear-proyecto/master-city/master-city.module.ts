import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterCityRoutingModule } from './master-city-routing.module';
import { MasterCityComponent } from './master-city.component';
import { ModalMcComponent } from './modal-mc/modal-mc.component';
import { AddMcComponent } from './modal-mc/add-mc/add-mc.component';
import { UpdMcComponent } from './modal-mc/upd-mc/upd-mc.component';
import {AgGridModule} from "ag-grid-angular";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MaterialModule} from "../../../material/material.module";

@NgModule({
  declarations: [MasterCityComponent, ModalMcComponent, AddMcComponent, UpdMcComponent],
  imports: [
    CommonModule,
    MasterCityRoutingModule,
    MatCardModule,
    AgGridModule,
    ReactiveFormsModule,
    MaterialModule,
    MatIconModule
  ]
})
export class MasterCityModule { }
