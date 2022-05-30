import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MasterRubrosRoutingModule} from './master-rubros-routing.module';
import {MasterRubrosComponent} from './master-rubros.component';
import {ModalMrComponent} from './modal-mr/modal-mr.component';
import {AddMrComponent} from './modal-mr/add-mr/add-mr.component';
import {UpdMrComponent} from './modal-mr/upd-mr/upd-mr.component';
import {MatCardModule} from "@angular/material/card";
import {AgGridModule} from "ag-grid-angular";
import {MatIconModule} from "@angular/material/icon";
import {ButtonsMrComponent} from './buttons-mr/buttons-mr.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material/material.module";


@NgModule({
  declarations: [MasterRubrosComponent, ModalMrComponent, AddMrComponent, UpdMrComponent, ButtonsMrComponent],
  imports: [
    CommonModule,
    MasterRubrosRoutingModule,
    MatCardModule,
    AgGridModule,
    ReactiveFormsModule,
    MaterialModule,
    MatIconModule
  ],
  entryComponents: [ButtonsMrComponent]
})
export class MasterRubrosModule {
}
