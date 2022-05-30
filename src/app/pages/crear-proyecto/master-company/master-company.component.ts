import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CommonService} from "../../../_services/utils/common.service";

import {CrearProyectoService} from "../crear-proyecto.service";
import Swal from "sweetalert2";
import {ButtonsMrComponent} from "../master-rubros/buttons-mr/buttons-mr.component";
import {ModalMcompanyService} from "./modal-mcompany/modal-mcompany.service";

@Component({
  selector: 'app-master-company',
  templateUrl: './master-company.component.html',
  styleUrls: ['./master-company.component.scss']
})
export class MasterCompanyComponent implements OnInit {

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

  constructor(public common: CommonService, public masterCompanyService: CrearProyectoService, private fb: FormBuilder,
              public modalMr: ModalMcompanyService) {
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
        headerName: 'Id Company',
        field: 'id',
      },
      {
        headerName: 'Nombre Company',
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
    this.masterCompanyService.getDetMstrCompany(request).subscribe((r: any) => {
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
        const toUpdate: any = []
        this.gridApi.forEachNodeAfterFilterAndSort((rowNode: any) => {
          const data = rowNode.data;
          if (rowNode.data.id === r.companyId) {
            data.nombre = r.name
          }
          toUpdate.push(data)
        })
        this.common.alertSuccess('Compañía Actualizada')
        this.gridApi.applyTransaction({update: toUpdate})
      })
    } else {
      this.common.alertWithOption(`¿Eliminar compañía ${rowData.rowData.data.nombre}?`, `Id: ${rowData.rowData.data.id}`, 'info', 'Aceptar').then((r: any) => {
        if (r) {
          const request = {
            userId: this.common.userId,
            companyId: rowData.rowData.data.id,
          }
          this.common.loading('Eliminando Compañía...')
          this.masterCompanyService.putDelMstrCompany(request).subscribe((r: any) => {
            if (r.code !== 0) {
              return this.common.alertError('Error', r.error)
            }
            const del = rowData.rowData.node.data
            this.common.alertSuccess('Compañía eliminada')
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
        id: r.companyId,
        nombre: r.name
      }
      this.gridApi.applyTransaction({add: [toAdd]})
      this.common.alertSuccess('Compañía Agregada', r.name)
    })
  }

}
