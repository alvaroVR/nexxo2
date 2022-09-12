import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MasterProjectRoutingModule} from './master-project-routing.module';
import {MasterProjectComponent} from './master-project.component';
import {ModalMprojectComponent} from './modal-mproject/modal-mproject.component';
import {AddMprojectComponent} from './modal-mproject/add-mproject/add-mproject.component';
import {UpdMprojectComponent} from './modal-mproject/upd-mproject/upd-mproject.component';
import {MatCardModule} from "@angular/material/card";
import {AgGridModule} from "ag-grid-angular";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material/material.module";
import {CausasNoCumplimientoComponent} from './causas-no-cumplimiento/causas-no-cumplimiento.component';
import {ModalCncComponent} from "./causas-no-cumplimiento/modal-cnc/modal-cnc.component";
import {AddMcncComponent} from "./causas-no-cumplimiento/modal-cnc/add-mcnc/add-mcnc.component";
import {UpdMcncComponent} from "./causas-no-cumplimiento/modal-cnc/upd-mcnc/upd-mcnc.component";

@NgModule({
  declarations: [
    MasterProjectComponent,
    ModalMprojectComponent,
    AddMprojectComponent,
    UpdMprojectComponent,
    CausasNoCumplimientoComponent,
    ModalCncComponent,
    AddMcncComponent,
    UpdMcncComponent],
  imports: [
    CommonModule,
    MasterProjectRoutingModule,
    MatCardModule,
    AgGridModule,
    ReactiveFormsModule,
    MaterialModule,
    MatIconModule
  ]
})
export class MasterProjectModule {
}
