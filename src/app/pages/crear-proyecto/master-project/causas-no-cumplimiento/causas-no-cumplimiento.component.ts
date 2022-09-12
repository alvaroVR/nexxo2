import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from "../../../../_services/utils/common.service";
import {CrearProyectoService} from "../../crear-proyecto.service";
import {ButtonsMrComponent} from "../../master-rubros/buttons-mr/buttons-mr.component";
import {ModalCncService} from "./modal-cnc/modal-cnc.service";

@Component({
  selector: 'app-causas-no-cumplimiento',
  templateUrl: './causas-no-cumplimiento.component.html',
  styleUrls: ['./causas-no-cumplimiento.component.scss']
})
export class CausasNoCumplimientoComponent implements OnInit {

  @Input() rowData: any;
  @Input() masterProjectData: any;
  gridApi: any;
  gridColumnApi: any;
  columnDefs: any;
  defaultColDef: any;
  gridOptions: any;
  rowSelection: any;
  rowSelected: any;
  rowClassRules: any;
  pinnedBottomRowData: any;
  frameworkComponents: any;
  sideBar: any;
  rubros = [{id: 1, value: 'value'}];

  constructor(public common: CommonService, public masterProjectService: CrearProyectoService,
              public modalCncService: ModalCncService) {
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true,
      suppressMenu: true,
    };
    this.sideBar = {
      toolPanels: [
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

  ngOnInit(): void {
    this.columnDefs = [
      {
        headerName: 'Id',
        field: 'id',
        width: 180,
      },
      {
        headerName: 'Nombre',
        field: 'nombre',
        width: 500,
      },
      {
        headerName: 'Action',
        field: 'button',
        cellRenderer: "buttonsMrComponent",
        clicked: (field: any) => {
          this.cargar(field)
        },
        width: 100
      }
    ]

    this.frameworkComponents = {
      buttonsMrComponent: ButtonsMrComponent
    };
  }

  cargar(rowData: any) {
    if (rowData.type === 2) {
      const data = {
        type: 1, ...this.masterProjectData, ...rowData
      }
      this.modalCncService.alerta('Titulo', 'mensaje', data)
      this.modalCncService.response().content.onClose.subscribe((r: any) => {
        if (!r) {
          return
        }

        const toUpdate: any = []
        this.gridApi.forEachNodeAfterFilterAndSort((rowNode: any) => {
          const data = rowNode.data;
          if (rowNode.data.id === r.id) {
            data.id = r.id
            data.nombre = r.nombre
          }
          toUpdate.push(data)
        })
        this.common.alertSuccess('C.No.Cumplto Actualizado')
        this.gridApi.applyTransaction({update: toUpdate})
      })
    } else {
      this.common.alertWithOption(`¿Eliminar registro ${rowData.rowData.data.nombre}?`, `Id: ${rowData.rowData.data.id}`, 'info', 'Aceptar').then((r: any) => {
        if (r) {
          const request = {
            userId: this.common.userId,
            companyId: this.masterProjectData.data.idempresa,
            causaId: rowData.rowData.data.id,
          }
          this.common.loading('Eliminando...')
          this.masterProjectService.putDelMstrCausasNoCumplto(request).subscribe((r: any) => {
            if (r.code !== 0) {
              return this.common.alertError('Error', r.error)
            }
            const del = rowData.rowData.data
            this.common.alertSuccess('Eliminado')
            this.gridApi.applyTransaction({remove: [del]})

          })
        }
      })
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  addCausa() {
    const rowData = {
      type: 0,
      ...this.masterProjectData
    }
    this.modalCncService.alerta('Titulo', 'mensaje', rowData)
    this.modalCncService.response().content.onClose.subscribe((r: any) => {
      if (!r) {
        return
      }
      this.gridApi.applyTransaction({add: [r]})
      this.common.alertSuccess('C.No.Cumplto', r.name)
    })
  }

}
