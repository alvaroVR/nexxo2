import {Component, Input, OnInit} from '@angular/core';
import {SelectCellRenderComponent} from "../../../../_components/select-cell-render/select-cell-render.component";
import {MyDateEditorComponent} from "../../../../_components/my-date-editor/my-date-editor.component";
import {BsModalRef} from "ngx-bootstrap";
import {CommonService} from "../../../../_services/utils/common.service";
import {GanttTriWeeklyService} from "../gantt-tri-weekly.service";
import * as _ from "lodash";

@Component({
  selector: 'app-causas-calidad-tab',
  templateUrl: './causas-calidad-tab.component.html',
  styleUrls: ['./causas-calidad-tab.component.scss']
})
export class CausasCalidadTabComponent implements OnInit {
  @Input() rowData: any;
  @Input() formulario: any;

  gridApi: any;
  getRowStyle: any;
  oldValue: any;
  aggFunc: any;
  statusSelected: any;
  gridColumnApi: any;
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    minWidth: 30,
    suppressMenu: true,
    rowSelection: 'single',
  };
  estados = [{id: 'INTERNA', value: 'INTERNA'}, {id: 'CLIENTE', value: 'CLIENTE'}]
  gridOptions: any = {
    suppressAggFuncInHeader: true,
    //rowClassRules: {
    //  'bgGreen': (params: any) => {
    //    return params.node.group && params.node.aggData.setcolor > 0
    //  }
    //}
  };
  rowSelection: any;
  rowSelected: any;
  pinnedBottomRowData: any;
  widthText = 65;
  submitted = false
  txtButton = 'Expand All'
  expanded = false
  color = 'primary'

  rowClassRules: any;

  columnDefs = [
    {
      headerName: 'Id',
      field: 'id',
      width: 50,
      filter: true
    },
    {
      headerName: 'Nombre',
      field: 'nombre',
      width: 100,
      filter: true
    },
    {
      headerName: 'Observaciones',
      field: 'observaciones',
      width: 300,
      editable: true
    }
  ]


  autoGroupColumnDef = {
    headerName: 'Categorías',
    minWidth: 65,
    maxWidth: 650,
  }

  frameworkComponents = {
    selectCellRender: SelectCellRenderComponent,
    myDateEditor: MyDateEditorComponent,
  };

  sideBar = {
    toolPanels: []
  }

  constructor(public common: CommonService, public gantChartService: GanttTriWeeklyService) {
  }

  ngOnInit(): void {
    this.gridOptions = {
      suppressAggFuncInHeader: true,
      getRowStyle: (params: any) => {
        if (params.node.aggData.setcolor > 0 && params.node.group) {
          return {background: `${params.node.allLeafChildren[0].data.idcolor} !important`}
        } else {
          return ''
        }
      },
    };
    this.getRowStyle = (params: any) => {
      if (params.node.group) {
        if (params.node.aggData.setcolor > 0) {
          return {background: `#${params.node.allLeafChildren[0].data.idcolor} !important`}
        } else {
          return ''
        }
      } else {
        return ''
      }
    }
  }


  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onBtShowLoading() {
    this.gridApi.showLoadingOverlay();
  }


  putObsCausasCalidadTaskGanttTriWeekly(params: any) {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.formulario.value.warehouseSelect,
      clientId: this.formulario.value.businessSelect,
      projectId: this.formulario.value.projectoSelect,
      taskId: params.data.idtask,
      causaId: params.data.id,
      obs: params.value
    }

    this.gantChartService.putObsCausasCalidadTaskGanttTriWeekly(request).subscribe((r) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
    })
  }

  saveValue(params: any) {
    this.oldValue = params.value
  }

  edicionDeCampos(params: any) {
    const nodeId = _.toNumber(params.node.id);
    const rowNode = this.gridApi.getRowNode(nodeId);
    this.putObsCausasCalidadTaskGanttTriWeekly(params)

  }

}
