import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../../../_services/utils/common.service";
import {GanttTriWeeklyService} from "../../gantt-tri-weekly.service";
import * as moment from "moment";

@Component({
  selector: 'app-add-aed-tw',
  templateUrl: './add-aed-tw.component.html',
  styleUrls: ['./add-aed-tw.component.scss']
})
export class AddAedTwComponent implements OnChanges {
  @Output() onCancel = new EventEmitter<any>();
  @Output() enviarRegistro = new EventEmitter<any>();
  @Input() data: any;
  formulario: FormGroup | any;
  predecesorList: any = []
  typeTask: any;
  rowData: any;
  hhPomQty: any;
  hhPomDis: any;
  predecesorModel: any = 'predecesor';
  predecesor: any = null;
  diasIni: any = null;
  duracion: any = null;
  predecesorSelected: any;
  submitted: boolean = false;
  isPredecesor: boolean = false;
  teList = [{id: 1, value: 'CF'}]

  constructor(private fb: FormBuilder, public common: CommonService, public gantChartService: GanttTriWeeklyService) {
  }

  ngOnChanges() {
    this.data.rowData.api.gridOptionsWrapper.gridOptions.rowData.forEach((rowData: any, index: any) => {

      const predecesor = {
        name: rowData.task_name,
        id: rowData.idtask
      }
      this.predecesorList.push(predecesor)
    })
    this.formulario = this.fb.group({
      taskInicialControl: new FormControl(null, [Validators.required]),
      taskControl: new FormControl(null, [Validators.required]),
      especialidadControl: new FormControl(null, [Validators.required]),
      aMantenimientoControl: new FormControl(null, [Validators.required]),
      equisecControl: new FormControl(null, [Validators.required]),
      dateStartControl: new FormControl(null, [Validators.required]),
      dateFinishControl: new FormControl(null, [Validators.required]),
    });
    this.defineCreation()
  }

  defineCreation() {
    this.typeTask = this.data.rowData.node.level
    this.rowData = this.data.rowData.node.allLeafChildren[0].data
    this.formulario.controls.taskInicialControl.setValue(this.rowData.task_name)
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
      companyUsrId: this.common.companyId,
      clientId: this.formulario.controls.idClientControl.value,
      companySelectId: this.data.rowData.node.data.idcompany,
      projectId: this.formulario.controls.idProyectoControl.value,
      taskName: this.formulario.controls.taskControl.value,
      parentId: this.formulario.controls.taskIdPadre.value,
      dateStart: `${dayIni}-${monthIni}-${yearIni}`,
      dateFinsh: `${dayFin}-${monthFin}-${yearFin}`,
      levelId: this.data.rowData.node.level + 1,
      nodePath: this.data.rowData.node.data.path,
      dayColSet: this.data.dayColSet,
      hhPomQty: this.formulario.controls.hhPomQty.value,
      hhPomDis: this.formulario.controls.hhPomDis.value,
      hhPlanDot: this.formulario.controls.hhPlanDot.value,
      hhPlanTurno: this.formulario.controls.hhPlanTurno.value,
    }
    this.common.cleanObj(request)
    if (this.formulario.invalid) {
      this.submitted = true
      return
    }
    this.gantChartService.putAddTaskGantt(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.enviarRegistro.emit([JSON.parse(r.detalles[0].reg)])
    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

  putAddTask4GanttTriWeekly() {
    if (this.formulario.invalid) {
      this.submitted = true
      return;
    }
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
      clientId: this.rowData.idclient,
      companySelectId: this.data.rowData.node.data.idcompany,
      projectId: this.rowData.idproject,
      taskName: this.formulario.controls.taskControl.value,
      parentId: this.rowData.idtask,
      dateStart: `${dayIni}-${monthIni}-${yearIni}`,
      dateFinsh: `${dayFin}-${monthFin}-${yearFin}`,
      levelId: this.data.rowData.node.level + 1,
      nodePath: this.data.rowData.node.data.path,
      dayColSet: this.data.dayColSet,
      hhPomQty: 0,
      hhPomDis: 0,
      hhPlanDot: 0,
      hhPlanTurno: 0,
      especialidad: this.formulario.controls.especialidadControl.value,
      areaMantencion: this.formulario.controls.aMantenimientoControl.value,
      equipoSeccion: this.formulario.controls.equisecControl.value,
      taskPredecesor: null,
      fnId: null,
      startDays: null,
      durationDays: null,
    }

    this.common.cleanObj(request)
    if (this.formulario.invalid) {
      this.submitted = true
      return
    }

    this.gantChartService.putAddTask4GanttTriWeekly(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.enviarRegistro.emit([JSON.parse(r.detalles[0].reg)])
    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

  cancelAction() {
    this.onCancel.emit()
  }


  calculoDis(value: any) {
    if (isNaN(parseFloat(this.hhPomQty)))
      this.hhPomDis = 0
    else
      this.hhPomDis = 100 * parseFloat(this.hhPomQty) / parseFloat(this.rowData.hh_pom)

  }

  calculoHH(value: any) {
    if (isNaN(parseFloat(this.hhPomDis)))
      this.hhPomQty = 0
    else
      this.hhPomQty = (parseFloat(this.hhPomDis) / 100) * parseFloat(this.rowData.hh_pom)
  }


  getInfoPredecesorTaskGanttTriWeekly() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.data.rowData.node.data.idcompany,
      clientId: this.formulario.controls.idClientControl.value,
      projectId: this.formulario.controls.idProyectoControl.value,
      taskPredecesorId: this.formulario.controls.predecesorCtrl.value,
      fnId: this.formulario.controls.teCtrl.value,
      startDays: this.formulario.controls.diasIniCtrl.value,
      durationDays: this.formulario.controls.duracionCtrl.value,
    }
    if (!this.formulario.controls.teCtrl.value) {
      return
    }
    this.gantChartService.getInfoPredecesorTaskGanttTriWeekly(request).subscribe(r => {
      const dateFinishSplit = r.dateFinish.split('-')
      const dateStartSplit = r.dateStart.split('-')
      const dateFinish = `20${dateFinishSplit[2]}-${dateFinishSplit[1]}-${dateFinishSplit[0]}`
      const dateStart = `20${dateStartSplit[2]}-${dateStartSplit[1]}-${dateStartSplit[0]}`
      this.formulario.patchValue({
        dateStartControl: dateStart,
        dateFinishControl: dateFinish,
      });
    })
  }


}
