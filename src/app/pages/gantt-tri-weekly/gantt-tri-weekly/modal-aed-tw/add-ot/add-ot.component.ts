import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../../../_services/utils/common.service";
import {GanttTriWeeklyService} from "../../gantt-tri-weekly.service";
import * as moment from "moment";

@Component({
  selector: 'app-add-ot',
  templateUrl: './add-ot.component.html',
  styleUrls: ['./add-ot.component.scss']
})
export class AddOtComponent implements OnChanges {
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
    this.formulario = this.fb.group({
      idProyectoControl: new FormControl(null, [Validators.required]),
      ot: new FormControl(null, [Validators.required]),
      dateStartControl: new FormControl(moment(this.data.value.dateFromSelect).format('YYYY-MM-DD'), [Validators.required]),
      dateFinishControl: new FormControl(moment(this.data.value.dateToSelect).format('YYYY-MM-DD'), [Validators.required]),
    });
    this.defineCreation()
  }

  defineCreation() {
    this.typeTask = this.data.type
//    this.rowData = this.data.rowData.node.allLeafChildren[0].data
    this.formulario.controls.idProyectoControl.setValue(this.data.value.projectoSelect)
  }

  putAddOTGanttTriWeekly() {
    // const iniDate = this.formulario.controls.dateStartControl.value.split('-')
    // const dayIni = iniDate[2]
    // const monthIni = iniDate[1]
    // const yearIni = iniDate[0].slice(-2)
    // const finDate = this.formulario.controls.dateFinishControl.value.split('-')
    // const dayFin = finDate[2]
    // const monthFin = finDate[1]
    // const yearFin = finDate[0].slice(-2)

    const request = {
      userId: this.common.userId,
      companyUsrId: this.common.companyId,
      clientId: this.data.value.businessSelect,
      companySelectId: this.data.value.warehouseSelect,
      projectId: this.data.value.projectoSelect,
      taskName: this.formulario.controls.ot.value,
      parentId: '',
      dateStart: moment(this.formulario.controls.dateStartControl.value).format('DD-MM-YY'),
      dateFinsh: moment(this.formulario.controls.dateFinishControl.value).format('DD-MM-YY'),
      levelId: 0,
      nodePath: '',
      dayColSet: this.data.dayColSet,
      hhPomQty: '',
      hhPomDis: '',
      hhPlanDot: '',
      hhPlanTurno: '',
      taskPredecesor: '',
      fnId: '',
      startDays: '',
      durationDays: ''
    }

    this.common.cleanObj(request)
    if (this.formulario.invalid) {
      this.submitted = true
      return
    }

    this.gantChartService.putAddOTGanttTriWeekly(request).subscribe((r: any) => {
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


}
