import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CommonService} from "../../../_services/utils/common.service";
import {CrearProyectoService} from "../crear-proyecto.service";
import Swal from "sweetalert2";
import {ModalMcService} from "./modal-mc/modal-mc.service";
import {ButtonsMrComponent} from "../master-rubros/buttons-mr/buttons-mr.component";

@Component({
  selector: 'app-master-city',
  templateUrl: './master-city.component.html',
  styleUrls: ['./master-city.component.scss']
})
export class MasterCityComponent implements OnInit {
  masterRubroForm: FormGroup;
  rowData: any;
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
  masterRubro: any;
  rubros = [{id: 1, value: 'value'}];

  constructor(public common: CommonService, public masterCityService: CrearProyectoService, private fb: FormBuilder,
              public modalMr: ModalMcService) {
    this.masterRubroForm = this.fb.group({
      rubroCtrl: new FormControl('')
    });
    this.common.loading()
    this.getDetMstrCity()

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

  ngOnInit() {
    this.columnDefs = [
      {
        headerName: 'Id Ciudad',
        field: 'id',
      },
      {
        headerName: 'Nombre Ciudad',
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

  getDetMstrCity() {
    const request = {
      userId: this.common.userId,
      companyId: this.common.companyId
    }
    this.masterCityService.getDetMstrCity(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.masterRubro = r.detalles
      Swal.close()
    })
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  cargar(rowData: any) {
    if (rowData.type === 2) {
      this.modalMr.alerta('Titulo', 'mensaje', rowData)
      this.modalMr.response().content.onClose.subscribe((r: any) => {
        if (!r) {
          return
        }

        const toUpdate:any = []
        this.gridApi.forEachNodeAfterFilterAndSort((rowNode:any) => {
          const data = rowNode.data;
          if (rowNode.data.id === r.cityId) {
            data.nombre = r.name
          }
          toUpdate.push(data)
        })
        this.common.alertSuccess('Ciudad Actualizada')
        this.gridApi.applyTransaction({update: toUpdate})
      })
    } else {
      this.common.alertWithOption(`¿Eliminar ciudad ${rowData.rowData.data.nombre}?`, `Id: ${rowData.rowData.data.id}`, 'info', 'Aceptar').then((r: any) => {
        if (r) {
          const request = {
            userId: this.common.userId,
            companyId: this.common.companyId,
            cityId: rowData.rowData.data.id,
          }
          this.common.loading('Eliminando Ciudad...')
          this.masterCityService.putDelMstrCity(request).subscribe((r: any) => {
            if (r.code !== 0) {
              return this.common.alertError('Error', r.error)
            }
            const del = rowData.rowData.node.data
            this.common.alertSuccess('Ciudad eliminada')
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
    this.modalMr.response().content.onClose.subscribe((r: any) => {
      if (!r) {
        return
      }
      const toAdd = {
        id: r.cityId,
        nombre: r.name
      }
      this.gridApi.applyTransaction({add: [toAdd]})
      this.common.alertSuccess('Ciudad Agregada', r.name)
    })
  }

}
