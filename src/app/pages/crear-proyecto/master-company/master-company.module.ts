import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterCompanyRoutingModule } from './master-company-routing.module';
import { MasterCompanyComponent } from './master-company.component';
import { ModalMcompanyComponent } from './modal-mcompany/modal-mcompany.component';
import { AddMcompanyComponent } from './modal-mcompany/add-mcompany/add-mcompany.component';
import { UpdMcompanyComponent } from './modal-mcompany/upd-mcompany/upd-mcompany.component';
import {MatCardModule} from "@angular/material/card";
import {AgGridModule} from "ag-grid-angular";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material/material.module";

@NgModule({
  declarations: [MasterCompanyComponent, ModalMcompanyComponent, AddMcompanyComponent, UpdMcompanyComponent],
  imports: [
    CommonModule,
    MasterCompanyRoutingModule,
    MatCardModule,
    AgGridModule,
    ReactiveFormsModule,
    MaterialModule,
    MatIconModule
  ]
})
export class MasterCompanyModule { }
