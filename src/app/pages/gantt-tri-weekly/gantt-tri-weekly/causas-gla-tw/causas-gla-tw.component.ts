import {Component, Input, OnInit} from '@angular/core';
import {SelectCellRenderComponent} from "../../../../_components/select-cell-render/select-cell-render.component";
import {MyDateEditorComponent} from "../../../../_components/my-date-editor/my-date-editor.component";

@Component({
  selector: 'app-causas-gla-tw',
  templateUrl: './causas-gla-tw.component.html',
  styleUrls: ['./causas-gla-tw.component.scss']
})
export class CausasGlaTwComponent implements OnInit {

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
      width: 150,
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
