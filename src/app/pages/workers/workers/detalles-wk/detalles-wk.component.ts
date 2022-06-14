import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from "../../../../_services/utils/common.service";
import {WorkersService} from "../workers.service";
import {SelectCellRenderComponent} from "../../../../_components/select-cell-render/select-cell-render.component";
import {ModalWorkersService} from "../modal-workers/modal-workers.service";
import {ButtonAgComponent} from "../../../../_components/button-ag/button-ag.component";

@Component({
  selector: 'app-detalles-wk',
  templateUrl: './detalles-wk.component.html',
  styleUrls: ['./detalles-wk.component.scss']
})
export class DetallesWkComponent implements OnInit {
  @Input() rowData: any;
  gridApi: any;
  gridColumnApi: any;
  columnDefs: any;
  defaultColDef: any;
  gridOptions: any;
  rowSelection: any;
  rowSelected: any;
  rowClassRules: any;
  reiniciar = true;
  pinnedBottomRowData: any;
  frameworkComponents = {selectCellRender: SelectCellRenderComponent, buttonAgComponent: ButtonAgComponent};

  sideBar;
  suppressClick = false
  activo = [{id: 'S', value: 'S'}, {id: 'N', value: 'N'}]


  constructor(public common: CommonService, public workerService: WorkersService, public modalWorkers: ModalWorkersService) {


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
        valueFormatter: (value: any) => {
        },
        cellRendererParams: {
          change: (params: any) => {
            this.putEnableTrabajadores(params)
          }
        }
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
      },
      {
        headerName: 'Sections',
        field: 'sections',
        width: 100,
        cellRenderer: 'buttonAgComponent',
        cellStyle: {'text-align': 'center'},
        cellRendererParams: {
          clicked: (field: any) => {
            this.submit(field);
          },
          getLabelFunction: (data: any) => {
            return data.sections
          },
          getBtnClassFunction: (data: any) => {
            return 'btn btn-light';
          }
        },
      }
    ]
  }


  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params: any) {
    // this.createSum();
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
  }

  recalculo() {
  }

  putEnableTrabajadores(params: any) {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      dni: params.data.dni,
      value: params.value.id
    }
    this.workerService.putEnableTrabajadores(request).subscribe(r => {

    })
  }

  submit(params: any) {
    this.modalWorkers.alerta('Titulo', 'mensaje', params)
    this.modalWorkers.response().content.onClose.subscribe((r: any) => {
      if (!r) {
        return
      }

      const toUpdate: any = []
      this.gridApi.forEachNodeAfterFilterAndSort((rowNode: any) => {
        const data = rowNode.data;
        if (rowNode.data.dni === r.dni) {
          data.sections = r.newLevels
        }
        toUpdate.push(data)
      })
      //this.common.alertSuccess('Rubro Actualizado')
      this.gridApi.applyTransaction({update: toUpdate})
      this.gridApi.redrawRows();
    })
  }

}
