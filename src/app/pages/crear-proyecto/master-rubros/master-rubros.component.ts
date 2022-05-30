import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CommonService} from "../../../_services/utils/common.service";
import {CrearProyectoService} from "../crear-proyecto.service";
import {ModalMrService} from "./modal-mr/modal-mr.service";
import Swal from "sweetalert2";
import {ButtonsMrComponent} from "./buttons-mr/buttons-mr.component";

@Component({
  selector: 'app-master-rubros',
  templateUrl: './master-rubros.component.html',
  styleUrls: ['./master-rubros.component.scss']
})
export class MasterRubrosComponent implements OnInit {
  masterRubroForm: FormGroup;
  rowData:any;
  gridApi:any;
  gridColumnApi:any;
  columnDefs:any;
  defaultColDef:any;
  gridOptions:any;
  rowSelection:any;
  rowSelected:any;
  rowClassRules:any;
  pinnedBottomRowData:any;
  frameworkComponents:any;
  sideBar = {
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
  masterRubro:any;
  rubros = [{id: 1, value: 'value'}];


  constructor(public common: CommonService, public masterRubroService: CrearProyectoService, private fb: FormBuilder,
              public modalMr: ModalMrService) {
    this.masterRubroForm = this.fb.group({
      rubroCtrl: new FormControl('')
    });

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true,
      suppressMenu: true,
    };
    this.common.loading()
    this.getDetMstrRubros()
  }

  ngOnInit() {
    this.columnDefs = [
      {
        headerName: 'Id Rubro',
        field: 'id',
      },
      {
        headerName: 'Nombre Rubro',
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

  getDetMstrRubros() {
    const request = {
      userId: this.common.userId,
      companyId: this.common.companyId
    }
    this.masterRubroService.getDetMstrRubros(request).subscribe((r:any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.masterRubro = r.detalles
      Swal.close()
    })
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  cargar(rowData:any) {
    if (rowData.type === 2) {
      this.modalMr.alerta('Titulo', 'mensaje', rowData)
      this.modalMr.response().content.onClose.subscribe((r:any) => {
        if (!r) {
          return
        }

        const toUpdate:any = []
        this.gridApi.forEachNodeAfterFilterAndSort((rowNode:any) => {
          const data = rowNode.data;
          if (rowNode.data.id === r.rubroId) {
            data.nombre = r.name
          }
          toUpdate.push(data)
        })
        this.common.alertSuccess('Rubro Actualizado')
        this.gridApi.applyTransaction({update: toUpdate})
      })
    } else {
      this.common.alertWithOption(`¿Eliminar rubro ${rowData.rowData.data.nombre}?`, `Id: ${rowData.rowData.data.id}`, 'info', 'Aceptar').then((r:any) => {
        if (r) {
          const request = {
            userId: this.common.userId,
            companyId: this.common.companyId,
            rubroId: rowData.rowData.data.id,
          }
          this.common.loading('Eliminando Rubro...')
          this.masterRubroService.putDelMstrRubros(request).subscribe((r:any) => {
            if (r.code !== 0) {
              return this.common.alertError('Error', r.error)
            }
            const del = rowData.rowData.node.data
            this.common.alertSuccess('Rubro eliminado')
            this.gridApi.applyTransaction({remove: [del]})

          })
        }
      })
    }
  }

  addRubro() {
    const rowData = {
      type: 0
    }
    this.modalMr.alerta('Titulo', 'mensaje', rowData)
    this.modalMr.response().content.onClose.subscribe((r:any) => {
      if (!r) {
        return
      }
      const toAdd = {
        id: r.rubroId,
        nombre: r.name
      }
      this.gridApi.applyTransaction({add: [toAdd]})
      this.common.alertSuccess('Rubro Agregado', r.name)
    })
  }

}
