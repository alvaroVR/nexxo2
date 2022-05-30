import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../../../_services/utils/common.service";
import {GanttLookAheadService} from "../../gantt-look-ahead.service";
import * as moment from "moment";

@Component({
  selector: 'app-edit-aed',
  templateUrl: './edit-aed.component.html',
  styleUrls: ['./edit-aed.component.scss']
})
export class EditAedComponent implements OnInit {
  @Output() onCancel = new EventEmitter<any>();
  @Output() enviarRegistro = new EventEmitter<any>();
  @Input() data: any;
  formulario: FormGroup | any;
  typeTask: any;
  rowData: any;

  constructor(private fb: FormBuilder, public common: CommonService, public gantChartService: GanttLookAheadService) {
  }

  ngOnInit() {
    this.formulario = this.fb.group({
      idProyectoControl: new FormControl(null, [Validators.required]),
      idClientControl: new FormControl(null, [Validators.required]),
      taskInicialControl: new FormControl(null, [Validators.required]),
      taskIdPadre: new FormControl(null, [Validators.required]),
      taskControl: new FormControl(null, [Validators.required]),
      dateStartControl: new FormControl(null, [Validators.required]),
      dateFinishControl: new FormControl(null, [Validators.required]),
    });
    this.defineCreation()
  }

  defineCreation() {
    this.typeTask = this.data.node.level
    this.rowData = this.data.node.allLeafChildren[0].data
    this.formulario.controls.taskIdPadre.setValue(this.rowData.idtask)
    this.formulario.controls.taskInicialControl.setValue(this.rowData.task_name.split(',')[this.data.node.level])
    this.formulario.controls.taskControl.setValue(this.rowData.task_name.split('-')[1])
    this.formulario.controls.idProyectoControl.setValue(this.rowData.idproject)
    this.formulario.controls.idClientControl.setValue(this.rowData.idclient)
    this.formulario.controls.dateStartControl.setValue(moment(this.rowData.date_start).format('YYYY-MM-DD'))
    this.formulario.controls.dateFinishControl.setValue(moment(this.rowData.date_finish).format('YYYY-MM-DD'))
  }

  putAddTaskGantt() {
    const iniDate = this.formulario.controls.dateStartControl.value.split('-')
    const dayIni = iniDate[2]
    const monthIni = iniDate[1]
    const yearIni = iniDate[0].slice(-2)
    const finDate = this.formulario.controls.dateFinishControl.value.split('-')
    const dayFin = finDate[2]
    const monthFin = finDate[1]
    const yearFin = finDate[0].slice(-2)

    const request = {
      userId: this.common.userId,
      companyId: this.rowData.idcompany,
      clientId: this.formulario.controls.idClientControl.value,
      projectId: this.formulario.controls.idProyectoControl.value,
      taskId: this.rowData.idtask,
      taskName: this.formulario.controls.taskControl.value,
      dateStart: `${dayIni}-${monthIni}-${yearIni}`,
      dateFinsh: `${dayFin}-${monthFin}-${yearFin}`,
    }
    this.common.cleanObj(request)
    this.gantChartService.putUpdTaskGantt(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.enviarRegistro.emit(request)
    }, (error: any) => {
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
