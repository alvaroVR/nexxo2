import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectCellRenderComponent} from "../../../../_components/select-cell-render/select-cell-render.component";
import {MyDateEditorComponent} from "../../../../_components/my-date-editor/my-date-editor.component";
import {GanttLookAheadService} from "../gantt-look-ahead.service";
import {CommonService} from "../../../../_services/utils/common.service";

@Component({
  selector: 'app-requisitos-gla',
  templateUrl: './requisitos-gla.component.html',
  styleUrls: ['./requisitos-gla.component.scss']
})
export class RequisitosGlaComponent implements OnInit {

  @Input() rowData: any;
  @Input() formulario: any;
  @Input() responsables: any;
  @Input() rowNodeData: any;

  gridApi: any;
  getRowStyle: any;
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

  columnDefs: any;


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

  constructor(public ganttLookAheadService: GanttLookAheadService, public common: CommonService) {

  }

  ngOnInit(): void {

    this.columnDefs = [
      {
        headerName: 'Id Cat',
        field: 'idcat',
        width: 80,
        hide: true,
        filter: true
      },
      {
        headerName: 'Categoría',
        field: 'cat_name',
        width: 80,
        rowGroup: true,
        hide: true,
        filter: true
      },
      {
        headerName: 'Id scat',
        field: 'idscat',
        width: 80,
        filter: true,
        hide: true,
      },
      {
        headerName: 'setcolor',
        field: 'setcolor',
        hide: true,
        width: 80,
        aggFunc: 'sum',
        filter: true,
      },
      {
        headerName: 'Subcategoría',
        field: 'scat_name',
        width: 80,
        filter: true
      },
      {
        headerName: 'Descripción',
        field: 'descripcion',
        editable: true,
        width: 80,
        filter: true
      },
      {
        headerName: 'Identificada por',
        field: 'identify_by',
        width: 80,
        filter: true
      },
      {
        headerName: 'Id Responsable',
        field: 'idresponsable',
        width: 80,
        filter: true
      },
      {
        headerName: 'Responsable',
        field: 'responsable',
        width: 150,
        cellRenderer: 'selectCellRender',
        params: this.responsables,
        cellRendererParams: {
          change: (params: any) => {
            params.data.responsable = params.value.id
            params.data.idresponsable = params.value.id
            this.edicionDeCampos(params)
          }
        },
        filter: true
      },
      {
        headerName: 'Interna/cliente',
        field: 'interna_clte',
        cellRenderer: 'selectCellRender',
        params: this.estados,
        cellRendererParams: {
          change: (params: any) => {
            this.statusSelected = params.value
            params.data.interna_clte = params.value.value
            this.edicionDeCampos(params)
          }
        },
        width: 150,
        filter: true
      },
      {
        headerName: 'Fecha Identificacion',
        field: 'identify_date',
        cellEditor: 'myDateEditor',
        format: 'DD-MM-YY',
        editable: true,
        width: 140,
        filter: true
      },
      {
        headerName: 'Fecha Re.Resol',
        field: 'date_re_resol',
        cellEditor: 'myDateEditor',
        format: 'DD-MM-YY',
        editable: true,
        width: 140,
        filter: true
      },
      {
        headerName: 'F.Compr.Resol',
        field: 'date_compr_resol',
        width: 140,
        filter: true
      },
      {
        headerName: 'Fecha Levante',
        field: 'date_levante',
        width: 140,
        filter: true
      },
      {
        headerName: 'Estado',
        field: 'status',
        width: 80,
        filter: true
      },
      {
        headerName: 'N Reprog',
        field: 'nReprog',
        width: 80,
        filter: true
      },
    ]

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

  edicionDeCampos(params: any) {
    const request = {
      userId: this.common.userId,
      companyUsrId: this.common.companyId,
      companySelectId: this.formulario.value.warehouseSelect,
      clientId: this.formulario.value.businessSelect,
      projectId: this.formulario.value.projectoSelect,
      taskId: this.rowNodeData.idtask,
      categoryId: params.data.idcat,
      subcategroyId: params.data.idscat,
      descripcion: params.data.descripcion,
      owner: params.data.responsable,
      source: params.data.interna_clte,
      dateIdentify: params.data.identify_date,
      dateSolution: params.data.date_re_resol,
    }
    this.ganttLookAheadService.putInfoRequisitosCategoryGantt(request)
  }

  saveValue(params: any) {
  }

}
