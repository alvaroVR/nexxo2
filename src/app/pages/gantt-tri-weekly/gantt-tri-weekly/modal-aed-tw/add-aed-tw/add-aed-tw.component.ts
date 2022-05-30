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
      idProyectoControl: new FormControl(null, [Validators.required]),
      idClientControl: new FormControl(null, [Validators.required]),
      taskInicialControl: new FormControl(null, [Validators.required]),
      taskIdPadre: new FormControl(null, [Validators.required]),
      taskControl: new FormControl(null, [Validators.required]),
      dateStartControl: new FormControl(null, [Validators.required]),
      dateFinishControl: new FormControl(null, [Validators.required]),
      hhPomQty: new FormControl(null,),
      hhPomDis: new FormControl(null,),
      hhPlanDot: new FormControl(null,),
      hhPlanTurno: new FormControl(null,),

      predecesorCtrl: new FormControl(null,),
      diasIniCtrl: new FormControl(null,),
      duracionCtrl: new FormControl(null,),
      teCtrl: new FormControl({value: null, disabled: true},),
    });
    this.defineCreation()
  }

  defineCreation() {
    this.typeTask = this.data.rowData.node.level
    this.rowData = this.data.rowData.node.allLeafChildren[0].data
    this.formulario.controls.taskIdPadre.setValue(this.rowData.idtask)

    //this.formulario.controls.taskInicialControl.setValue(this.rowData.task_name.split(',')[this.data.rowData.node.level])
    this.formulario.controls.taskInicialControl.setValue(this.rowData.task_name)
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
      companyUsrId: this.common.companyId,
      clientId: this.formulario.controls.idClientControl.value,
      companySelectId: this.data.rowData.node.data.idcompany,
      projectId: this.formulario.controls.idProyectoControl.value,
      taskName: this.formulario.controls.taskControl.value,
      parentId: this.formulario.controls.taskIdPadre.value,
      dateStart: `${dayIni}-${monthIni}-${yearIni}`,
      dateFinsh: `${dayFin}-${monthFin}-${yearFin}`,
      levelId: this.data.rowData.node.level,
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

  putAddTask4GanttTriWeekly() {
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
      levelId: this.data.rowData.node.level,
      nodePath: this.data.rowData.node.data.path,
      dayColSet: this.data.dayColSet,
      hhPomQty: this.formulario.controls.hhPomQty.value,
      hhPomDis: this.formulario.controls.hhPomDis.value,
      hhPlanDot: this.formulario.controls.hhPlanDot.value,
      hhPlanTurno: this.formulario.controls.hhPlanTurno.value,
      taskPredecesor: this.predecesor ? this.formulario.controls.predecesorCtrl.value : null,
      fnId: this.predecesor ? this.formulario.controls.teCtrl.value : null,
      startDays: this.predecesor ? this.formulario.controls.diasIniCtrl.value : null,
      durationDays: this.predecesor ? this.formulario.controls.duracionCtrl.value : null,
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

  changePrecesedor() {
    this.isPredecesor = !this.isPredecesor;

    if (this.isPredecesor) {
      this.formulario.controls.dateStartControl.disable()
      this.formulario.controls.dateFinishControl.disable()
      this.formulario.controls.teCtrl.disable()
      this.formulario.get('predecesorCtrl').setValidators(Validators.required)
      this.formulario.get('diasIniCtrl').setValidators(Validators.required)
      this.formulario.get('duracionCtrl').setValidators(Validators.required)
      this.formulario.get('teCtrl').setValidators(Validators.required)
    } else {
      this.formulario.controls.dateStartControl.enable()
      this.formulario.controls.dateFinishControl.enable()
      this.formulario.controls.dateStartControl.setValue(moment(this.rowData.date_start).format('YYYY-MM-DD'))
      this.formulario.controls.dateFinishControl.setValue(moment(this.rowData.date_finish).format('YYYY-MM-DD'))
      this.formulario.get('predecesorCtrl').clearValidators()
      this.formulario.get('diasIniCtrl').clearValidators()
      this.formulario.get('duracionCtrl').clearValidators()
      this.formulario.get('teCtrl').clearValidators()
      this.formulario.get('predecesorCtrl').reset()
      this.formulario.get('diasIniCtrl').reset()
      this.formulario.get('duracionCtrl').reset()
      this.formulario.get('teCtrl').reset()
    }

  }

  status() {

  }

  activateTe() {
    if (this.predecesor && this.diasIni && this.duracion)
      this.formulario.controls.teCtrl.enable()
    else
      this.formulario.controls.teCtrl.disable()
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
    debugger
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
