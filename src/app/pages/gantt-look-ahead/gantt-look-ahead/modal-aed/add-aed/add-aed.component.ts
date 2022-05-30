import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../../../_services/utils/common.service";
import {GanttLookAheadService} from "../../gantt-look-ahead.service";


@Component({
  selector: 'app-add-aed',
  templateUrl: './add-aed.component.html',
  styleUrls: ['./add-aed.component.scss']
})
export class AddAedComponent implements OnInit {
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
    this.formulario.controls.taskInicialControl.setValue(this.rowData.idparent)
    this.formulario.controls.idProyectoControl.setValue(this.rowData.idproject)
    this.formulario.controls.idClientControl.setValue(this.rowData.idclient)
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
      companyUsrId: this.common.companyId,
      clientId: this.formulario.controls.idClientControl.value,
      companySelectId: this.data.node.data.idcompany,
      projectId: this.formulario.controls.idProyectoControl.value,
      taskName: this.formulario.controls.taskControl.value,
      parentId: this.formulario.controls.taskIdPadre.value,
      dateStart: `${dayIni}-${monthIni}-${yearIni}`,
      dateFinsh: `${dayFin}-${monthFin}-${yearFin}`,
      levelId: this.data.node.level,
      nodePath: this.data.node.data.path,

    }
    this.common.cleanObj(request)
    this.gantChartService.putAddTaskGantt(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      //const respuesta = {
      //  idclient: r.detalles[0].idclient,
      //  idproject: r.detalles[0].idproject,
      //  idtask_1: r.detalles[0].idtask_1,
      //  idtask_2: r.detalles[0].idtask_2,
      //  idtask_3: r.detalles[0].idtask_3,
      //  project_name: r.detalles[0].project_name,
      //  task_name_2: r.detalles[0].task_name_2,
      //  task_name_3: r.detalles[0].task_name_3,
      //  task_name_1: r.detalles[0].task_name_1,
      //  date_finish: r.detalles[0].date_finish,
      //  date_start: r.detalles[0].date_start,
      //}
      this.enviarRegistro.emit([JSON.parse(r.detalles[0].reg)])
    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

  cancelAction() {
    this.onCancel.emit()
  }

}
