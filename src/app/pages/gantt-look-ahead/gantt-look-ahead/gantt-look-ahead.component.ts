import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GanttLookAheadService} from "./gantt-look-ahead.service";
import {CommonService} from "../../../_services/utils/common.service";
import {ChartGanttComponent} from "./chart-gantt/chart-gantt.component";
import {RequisitosGlaComponent} from "./requisitos-gla/requisitos-gla.component";
import * as moment from "moment";

@Component({
  selector: 'app-gantt-look-ahead',
  templateUrl: './gantt-look-ahead.component.html',
  styleUrls: ['./gantt-look-ahead.component.scss']
})
export class GanttLookAheadComponent implements OnInit {
  gantt: any = null
  columnDefs: any = null
  rowData: any = null
  rowNodeData: any = null
  public nivelForm: FormGroup;
  warehouseList: any;
  businessList: any;
  deptoList: any;
  requisitos: any;
  color = 'accent'
  programablesData: any;
  txtButton = 'Collapse All'
  height = {height: '700px'}
  expanded = true
  opened1 = false
  responsables: any;

  @ViewChild(ChartGanttComponent, {static: false}) chartGanttComponent: ChartGanttComponent | any;
  @ViewChild(RequisitosGlaComponent, {static: false}) requisitosGlaComponent: RequisitosGlaComponent | any;

  constructor(public gantChartService: GanttLookAheadService, public common: CommonService,
              public fb: FormBuilder) {
    this.nivelForm = this.fb.group({
      warehouseSelect: new FormControl(null, [Validators.required]),
      businessSelect: new FormControl(null, [Validators.required]),
      projectoSelect: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getdomcompanies();
    this.getDomRequisitosOwnerGantt();

  }

  getdomcompanies() {
    const request = {
      companyId: this.common.companyId,
      userId: this.common.userId
    };

    this.gantChartService.getdomcompanies(request).subscribe((response) => {
      this.warehouseList = response.detalles;
    });
  }

  getdomclientes() {

    const request = {
      companyIdUsr: this.common.companyId,
      userId: this.common.userId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value
    };

    this.gantChartService.getdomclientes(request).subscribe((response) => {
      this.businessList = response.detalles;
    });
  }

  getDomRequisitosOwnerGantt() {

    const request = {
      companyIdUsr: this.common.companyId,
      userId: this.common.userId
    };

    this.gantChartService.getDomRequisitosOwnerGantt(request).subscribe((response) => {
      this.responsables = response.detalles;
    });
  }

  getdomproyectos() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
    };

    this.gantChartService.getdomproyectos(request).subscribe((response) => {
      this.deptoList = response.detalles;
    });
  }

  updateGantt() {
    this.getColdefGantChart()
    this.getDet2GantChart()
  }

  updateGantt2() {
    //this.getColdefGantChart2()
    this.getDet2GantChart2()
  }

  getDetGantChart() {
    this.gantChartService.getDetGantChart().subscribe((r: any) => {
      this.gantt = r.detalles
      console.log(this.gantt)
    })
  }


  public getAll() {
    this.rowData = null
    this.columnDefs = null
    this.common.loading()
    this.getColdefGantChart()
    this.getDetProgramEspecialidadesGantt()
  }

  newRefresh() {
    this.columnDefs = null
  }

  getColdefGantChart() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
    }
    this.gantChartService.getColdefGantChart(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.columnDefs = eval(r.detalles[0].reg)
      console.log(this.columnDefs)
      this.getDet2GantChart()
    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

  getColdefGantChart2() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
    }
    this.gantChartService.getColdefGantChart(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.columnDefs = eval(r.detalles[0].reg)
      this.getDet2GantChart2()
      setTimeout(() => {
        this.chartGanttComponent.updateButtons()
      }, 1500)
    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

  getDetProgramEspecialidadesGantt() {
    const requestBody: any = {}
    const requestParam = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
    }
    const tasks: any = []
    if (this.rowData) {
      this.rowData.forEach((value: any) => {
        if (value.ispadre == 0 && value.flgFinal == 1) {
          const idtask: any = {idtask: value.idtask}
          tasks.push(idtask)
        }
      })
    }
    requestBody.tasks = tasks
    this.gantChartService.getDetProgramEspecialidadesGantt(requestBody, requestParam).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }

      this.programablesData = r.detalles
      console.log(r)
    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

  getDetProgramEspecialidadesGantt2(params: any) {
    const requestBody: any = {tasks: params}
    const requestParam = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
    }

    this.gantChartService.getDetProgramEspecialidadesGantt(requestBody, requestParam).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }

      this.programablesData = r.detalles
      console.log(r)
    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

  getDet2GantChart() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
    }
    this.gantChartService.getDetTreeGantChart(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.rowData = r.detalles.map((r: any) => JSON.parse(r.reg))
      console.log(this.rowData)
    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

  getDet2GantChart2() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
    }
    this.chartGanttComponent.onBtShowLoading()
    this.gantChartService.getDetTreeGantChart(request).subscribe((r: any) => {
      this.closeSwal()
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.rowData = r.detalles.map((r: any) => JSON.parse(r.reg))


    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

  expandAll() {
    if (!this.expanded) {
      this.chartGanttComponent.expandAll()
      this.expanded = true
      this.color = "accent"
      this.txtButton = 'Collapse All'
    } else {
      this.chartGanttComponent.expandAll()
      this.expanded = false
      this.color = "primary"
      this.txtButton = 'Expand All'
    }
  }

  refresh() {
    this.chartGanttComponent.refresh()
  }

  test(param: any) {
    this.opened1 = !this.opened1;
    if (this.opened1) {
      this.height = {height: '500px'}
    } else {
      this.height = {height: '700px'}
    }
  }

  refreshProgramables(params: any) {
    this.getDetFiltredTreeGantChart(params)
  }

  getDetFiltredTreeGantChart(request: any) {
    const req = {
      userId: request.userId,
      companyIdUsr: request.companyUsrId,
      companyIdSelect: request.companySelectId,
      clientId: request.clientId,
      projectId: request.projectId,
      filterFrom: request.filterFrom,
      filterTo: request.filterTo,
      filterDate: request.filterDate,
      filterRC: request.filterRC,
      filterRR: request.filterRR,
    }

    this.chartGanttComponent.onBtShowLoading()
    this.gantChartService.getDetFiltredTreeGantChart(req).subscribe((r: any) => {
      this.closeSwal()
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.rowData = r.detalles.map((r: any) => JSON.parse(r.reg))
      this.getDetProgramEspecialidadesGantt()
    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

  getDetRequesitosCategoryGantt(params: any) {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
      taskId: params.data.idtask
    }
    this.rowNodeData = params.data
    if (this.requisitosGlaComponent) {
      this.requisitosGlaComponent.onBtShowLoading()
    }
    this.gantChartService.getDetRequesitosCategoryGantt(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.requisitos = r.detalles
    }, error => {
      this.common.alertError('Error', error.error)
    })
  }

  closeSwal() {
    Swal.close()
  }

  putPublishTriWeeklyGantt() {
    let request =
      {
        userId: this.common.userId,
        companyUserId: this.common.companyId,
        companySelectId: this.nivelForm.controls['warehouseSelect'].value,
        clientId: this.nivelForm.controls['businessSelect'].value,
        projectId: this.nivelForm.controls['projectoSelect'].value,
        tasks: {}
      }
    this.common.alertWithOption('¿Estás seguro de aplicar?', '', 'info', 'Continuar', true).then(r => {
      if (r) {
        this.common.loading()
        request.tasks = this.chartGanttComponent.getChecked()
        this.gantChartService.putPublishTriWeeklyGantt(request).subscribe(r => {
          if (r.code !== 0) {
            return this.common.alertError('Error', r.error)
          }
          this.common.alertSuccess('Success')
        })
      }
    })

  }

}

