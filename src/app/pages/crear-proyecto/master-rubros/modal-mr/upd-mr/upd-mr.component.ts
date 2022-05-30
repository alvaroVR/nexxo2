import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../../../_services/utils/common.service";
import {CrearProyectoService} from "../../../crear-proyecto.service";

@Component({
  selector: 'app-upd-mr',
  templateUrl: './upd-mr.component.html',
  styleUrls: ['./upd-mr.component.scss']
})
export class UpdMrComponent implements OnInit {
  @Output() onCancel = new EventEmitter<any>();
  @Output() enviarRegistro = new EventEmitter<any>();
  @Input() data: any;
  formulario: FormGroup | any;
  typeTask: any;
  rowData: any;
  submitted = false;

  constructor(private fb: FormBuilder, public common: CommonService, public masterRubroService: CrearProyectoService) {
  }

  ngOnInit() {

    this.formulario = this.fb.group({
      idRubroControl: new FormControl(null, [Validators.required]),
      nombreRubroControl: new FormControl(null, [Validators.required]),
    });
    this.defineCreation()
  }

  defineCreation() {
    this.typeTask = this.data.node.level
    this.rowData = this.data.node.data
    this.formulario.controls.idRubroControl.setValue(this.rowData[`id`])
    this.formulario.controls.nombreRubroControl.setValue(this.rowData[`nombre`])
  }

  putAddTaskGantt() {
    this.submitted = true
    if (this.formulario.invalid) {
      return
    }
    const request = {
      userId: this.common.userId,
      companyId: this.common.companyId,
      rubroId: this.formulario.controls.idRubroControl.value,
      name: this.formulario.controls.nombreRubroControl.value,
    }

    this.masterRubroService.putEditMstrRubros(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.enviarRegistro.emit(request)
    }, (error:any) => {
      this.common.alertError('Error', error.error)
    })
  }

  addRegister() {
    const obj = {
      idclient: this.formulario.controls.idClientControl.value,
      idproject: this.formulario.controls.idProyectoControl.value,
      idtask_1: this.rowData.idtask_1,
      idtask_2: this.rowData.idtask_2,
      idtask_3: this.rowData.idtask_3,
      project_name: this.rowData.project_name,
      task_name_1: this.data.node.level === 0 ? this.formulario.controls.taskControl.value : this.rowData.task_name_1,
      task_name_2: this.data.node.level === 1 ? this.formulario.controls.taskControl.value : this.rowData.task_name_2,
      task_name_3: this.data.node.level === 2 ? this.formulario.controls.taskControl.value : this.rowData.task_name_3,
    }

  }

  cancelAction() {
    this.onCancel.emit()
  }

}
