import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColDef, GetDataPath, ICellRendererParams, ValueGetterParams} from "ag-grid-community";
import {CommonService} from "../../../../_services/utils/common.service";
import {AedService} from "../../../gantt-look-ahead/gantt-look-ahead/modal-aed/aed.service";
import {ModalGlaService} from "../../../gantt-look-ahead/gantt-look-ahead/modal-gla/modal-gla.service";
import {CustomPinnedRowRendererComponent} from "../../../../_components/custom-pinned-row-renderer/custom-pinned-row-renderer.component";
import {ButtonsAedComponent} from "../../../../_components/buttons-aed/buttons-aed.component";
import {EmptyChartGantComponentComponent} from "../../../../_components/empty-chart-gant-component/empty-chart-gant-component.component";
import {AgGridCheckboxComponent} from "../../../../_components/ag-grid-checkbox/ag-grid-checkbox.component";
import {ButtonWithNumberComponent} from "../../../../_components/button-with-number/button-with-number.component";
import {SelectCellRenderComponent} from "../../../../_components/select-cell-render/select-cell-render.component";
import * as moment from "moment";
import * as _ from "lodash";
import {GanttTriWeeklyService} from "../gantt-tri-weekly.service";
import {AedTwService} from "../modal-aed-tw/aed-tw.service";
import {toFloat} from "@rxweb/reactive-form-validators";

@Component({
  selector: 'app-chart-gantt-tw',
  templateUrl: './chart-gantt-tw.component.html',
  styleUrls: ['./chart-gantt-tw.component.scss']
})
export class ChartGanttTwComponent implements OnInit {
  @Input() gantt: any;
  @Input() rowData: any;
  @Input() dayColSet: any;
  @Input() columnDefs: any;
  @Input() height: any = {height: '700px'};
  @Input() formulario: any;
  @Output() refreshTable = new EventEmitter<any>();
  @Output() rowNodeSelected = new EventEmitter<any>();
  @Output() realoadRequisitos = new EventEmitter<any>();
  @Output() closeSwal = new EventEmitter<any>();
  @Output() reloadTableEmit = new EventEmitter<any>();
  @Input() listOwner: any
  oldValue: any


  public autoGroupColumnDef: ColDef = {
    field: 'task_name',
    pinned: 'left',
    cellRendererParams: {
      innerRenderer: function (params: ICellRendererParams) {
        return params.data.task_name;
      },
    },
    cellStyle: (params: any) => {
      if (params.data.ispadre == 1) {
        return {'font-weight': 'bold'}
      } else {
        return
      }
    }
  };
  getDataPath: GetDataPath = function (data: any) {
    return data.path.split('/');
  };
  public rowModelType = 'serverSide';
  public serverSideStoreType = 'partial';
  gridApi: any;
  gridColumnApi: any;
  responsablesList: any;
  showTable = false;
  defaultColDef = {
    sortable: false,
    resizable: true,
    filter: true,
    minWidth: 30,
    suppressMenu: true,
    rowSelection: 'single',
  };
  gridOptions: any;
  rowSelection = 'single'
  rowSelected: any;
  rowClassRules: any;
  pinnedBottomRowData: any;
  frameworkComponents: any;
  aggFuncs: any;
  widthText = 100;
  submitted = false
  txtButton = 'Expand All'
  expanded = true
  color = 'primary'
  cellClassRules: any

  sideBar = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      }
    ]
  }

  constructor(public gantChartService: GanttTriWeeklyService, public common: CommonService, public aedService: AedTwService,
              public modal: ModalGlaService) {
    this.frameworkComponents = {
      customPinnedRowRenderer: CustomPinnedRowRendererComponent,
      buttonsAedComponent: ButtonsAedComponent,
      emptyChartGantComponent: EmptyChartGantComponentComponent,
      checkBoxText: AgGridCheckboxComponent,
      buttonNumber: ButtonWithNumberComponent,
      selectCellRenderComponent: SelectCellRenderComponent,
    };
  }

  ngOnInit() {
    this.aggFuncs = {
      aggTopIni: this.aggTopIni,
      aggLastDate: this.aggLastDate,
    }
    this.getDomTaskOwnerGantt()
    //  this.updateButtons()
  }

  aggTopIni(values: any) {
    let date_start: any = []
    values.forEach((value: any) => {
      if (value && value.date_start) {
        date_start.push(value.date_start);
      }
    });

    date_start.sort((b: any, a: any) => new Date(b).getTime() - new Date(a).getTime());

    if (date_start.length > 0) {
      return {
        date_start: date_start[0] !== '' || date_start[0] ? date_start[0] : '',
        toString: () => date_start[0] !== '' || date_start[0] ? moment(date_start[0]).format('DD/MM/YYYY') : '',
      }
    }
    return
  }

  aggLastDate(values: any) {
    let date_finish: any = []
    values.forEach((value: any) => {
      if (value && value.date_finish) {
        date_finish.push(value.date_finish);
      }
    });

    date_finish.sort((a: any, b: any) => new Date(b).getTime() - new Date(a).getTime());

    if (date_finish.length > 0) {
      return {
        date_finish: date_finish[0],
        toString: () => date_finish[0] !== '' ? moment(date_finish[0]).format('DD/MM/YYYY') : '',
      }
    }
    return
  }

  updateButtons() {
    const vm = this
    const columnDefs: any[] = this.getColumnDefs();

    columnDefs.find(e => e.headerName === '2022' || e.headerName === '2023' || e.headerName === '2024' || e.headerName === '2025' || e.headerName === '2026' || e.headerName === '2027' || e.headerName === '2028').children.forEach(function (colDef: any, index: any) {
      colDef.children.forEach(function (col: any) {
        col.cellRenderer = "emptyChartGantComponent"
        col.cellStyle = (params: any) => {
          const num = _.toNumber(params.value)
          if (num > 0) {
            return {color: 'white', backgroundColor: 'green'};
          } else {
            return null
          }
        }
      })
    })
    /////////////////
    const programables = columnDefs.find(e => {
      return e.headerName === 'Programables'
    })


    programables.children.forEach((col: any) => {
      col.cellRenderer = "checkBoxText"
      col.disabled = true
      col.setValue = 1
      col.cellStyle = (params: any) => {
        return {'text-align': 'center'}
      }
    })

    ////////////////
    const responsables = columnDefs.find(col => {
      return col.field == 'idowner'
    })

    responsables.editable = true
    responsables.cellRenderer = 'selectCellRenderComponent'
    responsables.params = this.listOwner
    responsables.cellRendererParams = {
      change: (respo: any) => {
        this.putTaskOwnerGanttTriWeekly(respo)
      }
    }

    //////////////
    columnDefs.forEach(function (colDef: any) {
      if (colDef.field === "date_start") {
        colDef.valueFormatter = function (params: any) {
          if (params.value) {
            return moment(params.value.date_start).format('DD/MM/YYYY')
          } else {
            return
          }
        };
        colDef.valueGetter = function (params: ValueGetterParams) {
          // @ts-ignore
          if (!params.node.group) {
            return {
              date_start: params.data.date_start,
              toString: () => params.data.date_start ? params.data.date_start : ''
            };
          } else {
            return
          }
        }
      } else if (colDef.field === "date_finish") {
        colDef.valueFormatter = function (params: any) {
          if (params.value) {
            return moment(params.value.date_finish).format('DD/MM/YYYY')
          } else {
            return
          }
        };
        colDef.valueGetter = function (params: ValueGetterParams) {
          // @ts-ignore
          if (!params.node.group) {
            return {
              date_finish: params.data.date_finish,
              toString: () => params.data.date_finish ? params.data.date_finish : ''
            };
          } else {
            return
          }
        }
      } else if (colDef.field === "button") {
        colDef.disabled = true
        colDef.cellRendererParams = {
          clicked: function (field: any) {
            vm.cargar(field)
          }
        }
      } else {
        return ''
      }
      return
    });
    if (this.gridApi) {
      this.gridApi.setColumnDefs(columnDefs);
    }
  }

  getColumnDefs() {

    return this.columnDefs
  }

  cellClass(params: any) {

  }

  dateFormat(params: any) {
    if (params.data) {
      if (params.colDef.field === 'date_start' && params.value) {
        if (params.value.date_start) {
          return moment(params.value.date_start).format('DD/MM/YYYY')
        } else {
          return ''
        }
      } else if (params.colDef.field === 'date_finish' && params.value) {
        if (params.value.date_finish) {
          return moment(params.value.date_finish).format('DD/MM/YYYY')
        } else {
          return ''
        }
      } else {
        return ''
      }
    } else {
      return null
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //this.setAutoHeight()

  }


  setAutoHeight() {
    this.gridApi.setDomLayout('autoHeight');
  }

  cargar(rowData: any) {
    if (rowData.type == 1) {
      this.common.alertWithOption('¿Estás seguro de eliminar?', 'Se eliminarán todos los registros relacionados', 'info', 'Aceptar').then((r: any) => {
        if (r) {
          let lvl = rowData.rowData.node.level
          let request;
          //  const params = rowData.rowData.node.allLeafChildren.find((value: any) => {
          //    return value.data[rowData.rowData.node.field] === rowData.rowData.node.key
          //  })
          request = {
            userId: this.common.userId,
            companyId: rowData.rowData.data.idcompany,
            clientId: rowData.rowData.data.idclient,
            projectId: rowData.rowData.data.idproject,
            taskId: rowData.rowData.data.idtask,
            parentId: rowData.rowData.data.idparent,
            levelDelId: lvl
          }


          this.gantChartService.putDelTaskGantt(request).subscribe((r: any) => {
            if (r.code !== 0) {
              return this.common.alertError('Error', r.error)
            }
            this.refresh()
            return
          })
        }
      })
    } else if (rowData.type == 0) {
      const dayColSet = this.dayColSet
      const row = {
        ...rowData,
        dayColSet
      }
      this.aedService.alerta('Titulo', 'mensaje', row)
      this.aedService.response().content.onClose.subscribe((r: any) => {
        if (!r) {
          return
        }
        this.gridApi.applyTransaction({add: r})
        this.refresh()
        this.updateButtons()
      })
    } else {
      const dayColSet = this.dayColSet
      const row = {
        ...rowData,
        dayColSet
      }
      this.aedService.alerta('Titulo', 'mensaje', row)
      this.aedService.response().content.onClose.subscribe((r: any) => {
        if (!r) {
          return
        }
        this.realoadTable()
      })
    }
  }

  expandAll() {
    if (!this.expanded) {
      this.expanded = true
      this.color = "accent"
      this.txtButton = 'Collapse All'
      this.gridApi.expandAll()
    } else {
      this.gridApi.collapseAll()
      this.expanded = false
      this.color = "primary"
      this.txtButton = 'Expand All'
    }
  }

  refresh() {
    this.refreshTable.emit()
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedNodes();
    this.rowNodeSelected.emit(selectedRows[0]);
  }

  realoadTable() {
    const selectedRows = this.gridApi.getSelectedNodes();
    this.reloadTableEmit.emit(selectedRows[0]);
  }


  cambiaData(params: any) {
    this.gridApi = params.api;
    this.gridApi.getRowNode(0).selectThisNode(true);
    this.rowNodeSelected.emit(this.gridApi.getRowNode(0));
  }


  onBtShowLoading() {
    this.gridApi.showLoadingOverlay();
  }

  getDomTaskOwnerGantt() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId
    }
    this.updateButtons()
    this.showTable = true


  }

  putRequesitosCategoryGantt(field: any) {
    const request = {
      userId: this.common.userId,
      companyUsrId: this.common.companyId,
      companySelectId: this.formulario.value.warehouseSelect,
      clientId: this.formulario.value.businessSelect,
      projectId: this.formulario.value.projectoSelect,
      taskId: field.data.idtask,
      requestId: field.colDef.field,
      chekValue: !field.value ? 1 : 0
    }
    this.gantChartService.putRequesitosCategoryGantt(request).subscribe(r => {
      const selectedRows = this.gridApi.getSelectedNodes();
      this.realoadRequisitos.emit(selectedRows[0])
    })
  }

  openModal(rowData: any) {
    this.modal.alerta('Titulo', 'mensaje', rowData)
    this.modal.response().content.onClose.subscribe((r: any) => {
      const validate = _.isNumber(r.number)
      if (validate) {
        const toUpdate: any = []
        this.gridApi.forEachNodeAfterFilterAndSort((rowNode: any) => {
          const data = rowNode.data;
          if (rowNode.data.task_name === rowData.data.task_name) {
            data[rowData.colDef.field] = r.number
            data.reqFinal = r.resp.totReq
          }
          toUpdate.push(data)
        })
        //  this.gridApi.applyTransaction({update: toUpdate})
        //  this.gridApi.refreshCells({force: true});
        this.onSelectionChanged()
      }
    })
  }

  putTaskOwnerGanttTriWeekly(params: any) {
    if (!params.value) {
      return
    }
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.formulario.value.warehouseSelect,
      clientId: this.formulario.value.businessSelect,
      projectId: this.formulario.value.projectoSelect,
      taskId: params.data.idtask,
      ownerId: params.value.id
    }

    this.gantChartService.putTaskOwnerGanttTriWeekly(request).subscribe(r => {

    })
  }

  edicionDeCampos(params: any) {
    const nodeId = _.toNumber(params.node.id);
    const rowNode = this.gridApi.getRowNode(nodeId);
    const toNumber = parseFloat(params.value)
    if (params.colDef.field === 'hhp_pom') {
      const requestPom = {
        userId: this.common.userId,
        companyUsrId: this.common.companyId,
        companySelectId: this.formulario.value.warehouseSelect,
        clientId: this.formulario.value.businessSelect,
        projectId: this.formulario.value.projectoSelect,
        taskId: params.data.idtask,
        levelId: params.node.level,
        nodePath: params.data.path,
        dayColSet: this.dayColSet,
        hhPomQty: toNumber
      }
      this.gantChartService.putUpdHHPomHHTaskGanttTriWeekly(requestPom).subscribe(r => {
        if (r.code !== 0) {
          this.common.alertError('Error', r.error)
          return rowNode.setDataValue('hhp_pom', this.oldValue);
        }
        //const hhp_dis: any = (100 * toNumber / parseFloat(params.node.parent.data.hh_pom))
        //rowNode.setDataValue('hhp_dis', parseFloat(hhp_dis));
        const toUpdate: any = []
        this.gridApi.forEachNodeAfterFilterAndSort((rowNode: any) => {
          let data: any = rowNode.data;
          if (rowNode.data.task_name === params.data.task_name) {
            data = r.detalles.map((r: any) => JSON.parse(r.reg))[0]
          }
          toUpdate.push(data)
        })
        this.gridApi.setRowData(toUpdate);

      }, error => {
        this.common.alertError('Error', error.error)
      })
    }

    if (params.colDef.field === 'hhp_dis') {

      const requestPom = {
        userId: this.common.userId,
        companyUsrId: this.common.companyId,
        companySelectId: this.formulario.value.warehouseSelect,
        clientId: this.formulario.value.businessSelect,
        projectId: this.formulario.value.projectoSelect,
        taskId: params.data.idtask,
        levelId: params.node.level,
        nodePath: params.data.path,
        dayColSet: this.dayColSet,
        hhPomDis: toNumber
      }
      this.gantChartService.putUpdHHPomDisTaskGanttTriWeekly(requestPom).subscribe(r => {
        if (r.code !== 0) {
          this.common.alertError('Error', r.error)
          return rowNode.setDataValue('hhp_pom', this.oldValue);
        }
        const toUpdate: any = []
        this.gridApi.forEachNodeAfterFilterAndSort((rowNode: any) => {
          let data: any = rowNode.data;
          if (rowNode.data.task_name === params.data.task_name) {
            data = r.detalles.map((r: any) => JSON.parse(r.reg))[0]
          }
          toUpdate.push(data)
        })
        this.gridApi.setRowData(toUpdate);
      }, error => {
        this.common.alertError('Error', error.error)
      })
    }

    if (params.colDef.field === 'hh_plan_dot') {
      const requestPom = {
        userId: this.common.userId,
        companyId: this.formulario.value.warehouseSelect,
        clientId: this.formulario.value.businessSelect,
        projectId: this.formulario.value.projectoSelect,
        taskId: params.data.idtask,
        hhPlanDot: params.value
      }

      this.gantChartService.putUpdDotHHPlanTaskGanttTriWeekly(requestPom).subscribe(r => {
        if (r.code !== 0) {
          this.common.alertError('Error', r.error)
          return rowNode.setDataValue('hh_plan_dot', this.oldValue);
        }
        const hh_plan = parseFloat(params.value) * parseFloat(rowNode.data.hh_plan_turno)
        this.gridApi.forEachNodeAfterFilterAndSort((rowNode: any) => {
          if (rowNode.data.task_name === params.data.task_name) {
            rowNode.setDataValue('hh_plan', hh_plan)
          }
        })
        this.gridApi.refreshCells({force: true});
      }, error => {
        this.common.alertError('Error', error.error)
      })
    }

    if (params.colDef.field === 'hh_plan_turno') {
      const requestPom = {
        userId: this.common.userId,
        companyId: this.formulario.value.warehouseSelect,
        clientId: this.formulario.value.businessSelect,
        projectId: this.formulario.value.projectoSelect,
        taskId: params.data.idtask,
        hhPlanTurno: params.value
      }

      this.gantChartService.putUpdTurnoHHPlanTaskGanttTriWeekly(requestPom).subscribe(r => {
        if (r.code !== 0) {
          this.common.alertError('Error', r.error)
          return rowNode.setDataValue('hh_plan_turno', this.oldValue);
        }
        const hh_plan = parseFloat(rowNode.data.hh_plan_dot) * parseFloat(params.value)
        this.gridApi.forEachNodeAfterFilterAndSort((rowNode: any) => {
          if (rowNode.data.task_name === params.data.task_name) {
            rowNode.setDataValue('hh_plan', hh_plan)
          }
        })
        this.gridApi.refreshCells({force: true});
      }, error => {
        this.common.alertError('Error', error.error)
      })
    }

  }

  saveValue(params: any) {
    this.oldValue = params.value
  }





}

