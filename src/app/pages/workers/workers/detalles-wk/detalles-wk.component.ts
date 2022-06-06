import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from "../../../../_services/utils/common.service";
import {WorkersService} from "../workers.service";
import {SelectCellRenderComponent} from "../../../../_components/select-cell-render/select-cell-render.component";

@Component({
  selector: 'app-detalles-wk',
  templateUrl: './detalles-wk.component.html',
  styleUrls: ['./detalles-wk.component.scss']
})
export class DetallesWkComponent implements OnInit {
  @Input() rowData:any;
  gridApi:any;
  gridColumnApi:any;
  columnDefs:any;
  defaultColDef:any;
  gridOptions:any;
  rowSelection:any;
  rowSelected:any;
  rowClassRules:any;
  reiniciar = true;
  pinnedBottomRowData:any;
  frameworkComponents = {selectCellRender: SelectCellRenderComponent};

  sideBar;
  suppressClick = false
  activo = [{id: 'S', value: 'S'}, {id: 'N', value: 'N'}]


  constructor( public common:CommonService, public workerService:WorkersService) {
    this.columnDefs = [
      {
        headerName: 'Rut',
        field: 'dni',
        width: 80,
      },
      {
        headerName: 'Nombre',
        field: 'nombre',
      },
      {
        headerName: 'Activo',
        cellRenderer: 'selectCellRender',
        field: 'activo',
        width: 70,
        params: this.activo,
        valueFormatter: (value:any) => {
        },
        cellRendererParams: {
          change: (params:any) => {
            this.putEnableTrabajadores(params)
          }
        }
      },
      {
        headerName: 'Nombre',
        field: 'nombre',
        width: 180,
      },
      {
        headerName: 'Cargo',
        field: 'cargo_name',
      },
      {
        headerName: 'Área',
        field: 'area_name',
        width: 100,
      },
      {
        headerName: 'Turno',
        field: 'turno_name',
        width: 70,
      },
      {
        headerName: 'Ciudad',
        field: 'city_name',
        width: 100,
      },
      {
        headerName: 'Contrato',
        field: 'contrato_name',
        width: 100,
      },
      {
        headerName: 'Jefe',
        field: 'jefe_name',
      }]

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true,
      suppressMenu: true,
    };
    this.rowSelection = 'single';


    this.sideBar = {
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
  }

  ngOnInit() {
  }


  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params:any) {
    // this.createSum();
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
  }

  recalculo() {
  }

  putEnableTrabajadores(params:any) {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      dni: params.data.dni,
      value: params.value.id
    }
    this.workerService.putEnableTrabajadores(request).subscribe(r => {

    })
  }

}
