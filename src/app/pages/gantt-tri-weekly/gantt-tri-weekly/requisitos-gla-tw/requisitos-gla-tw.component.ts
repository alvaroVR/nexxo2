import {Component, Input, OnInit} from '@angular/core';
import {SelectCellRenderComponent} from "../../../../_components/select-cell-render/select-cell-render.component";
import {MyDateEditorComponent} from "../../../../_components/my-date-editor/my-date-editor.component";

@Component({
  selector: 'app-requisitos-gla-tw',
  templateUrl: './requisitos-gla-tw.component.html',
  styleUrls: ['./requisitos-gla-tw.component.scss']
})
export class RequisitosGlaTwComponent implements OnInit {

  @Input() rowData: any;


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

  columnDefs = [
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
      headerName: 'Responsable',
      field: 'responsable',
      width: 80,
      filter: true
    },
    {
      headerName: 'Interna/cliente',
      field: 'interna_clte',
     // cellRenderer: 'selectCellRender',
     // params: this.estados,
     // cellRendererParams: {
     //   change: (params: any) => {
     //     this.statusSelected = params.value
     //   }
     // },
      width: 80,
      filter: true
    },
    {
      headerName: 'Fecha Identificacion',
      field: 'identify_date',
      width: 80,
      filter: true
    },
    {
      headerName: 'Fecha Re.Resol',
      field: 'date_re_resol',
      width: 80,
      filter: true
    },
    {
      headerName: 'F.Compr.Resol',
      field: 'date_compr_resol',
      width: 80,
      filter: true
    },
    {
      headerName: 'Fecha Levante',
      field: 'date_levante',
      width: 80,
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

  constructor() {
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

}
