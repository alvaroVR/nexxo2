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

@NgModule({
    declarations: [MasterProjectComponent, ModalMprojectComponent, AddMprojectComponent, UpdMprojectComponent],
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
