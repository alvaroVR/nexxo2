import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CommonService} from "../../../_services/utils/common.service";
import {CrearProyectoService} from "../crear-proyecto.service";
import Swal from "sweetalert2";
import {ModalMclientesService} from "./modal-mclientes/modal-mclientes.service";
import {ButtonsMrComponent} from "../master-rubros/buttons-mr/buttons-mr.component";

@Component({
  selector: 'app-master-clientes',
  templateUrl: './master-clientes.component.html',
  styleUrls: ['./master-clientes.component.scss']
})
export class MasterClientesComponent implements OnInit {

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

  constructor(public common: CommonService, public masterClientesService: CrearProyectoService, private fb: FormBuilder,
              public modalMr: ModalMclientesService) {
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
        headerName: 'Rut Cliente',
        field: 'idcliente',
      },
      {
        headerName: 'Nombre Cliente',
        field: 'cliente_name',
        width: 200,
      },
      {
        headerName: 'Rut Mandante',
        field: 'idmandante',
        width: 200,
      },
      {
        headerName: 'Nombre Mandante',
        field: 'mandante_name',
        width: 200,
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
    this.masterClientesService.getDetMstrClientes(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      Swal.close()
      this.masterRubro = r.detalles
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
          if (rowNode.data.idcliente === r.clientId) {
            data.cliente_name = r.clientName
            data.idmandante = r.mandanteId
            data.mandante_name = r.mandanteName
          }
          toUpdate.push(data)
        })
        this.common.alertSuccess('Cliente Actualizado')
        this.gridApi.applyTransaction({update: toUpdate})
      })
    } else {
      this.common.alertWithOption(`¿Eliminar cliente ${rowData.rowData.data.cliente_name}?`, `Rut: ${rowData.rowData.data.idcliente}`, 'info', 'Aceptar').then((r: any) => {
        if (r) {
          const request = {
            userId: this.common.userId,
            companyId: this.common.companyId,
            clientId: rowData.rowData.data.idcliente,
          }
          this.common.loading('Eliminando Cliente...')
          this.masterClientesService.putDelMstrClientes(request).subscribe((r: any) => {
            if (r.code !== 0) {
              return this.common.alertError('Error', r.error)
            }
            const del = rowData.rowData.node.data
            this.common.alertSuccess('Cliente eliminado')
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
        idcliente: r.clientId,
        cliente_name: r.clientName,
        idmandante: r.mandanteId,
        mandante_name: r.mandanteName,
      }
      this.gridApi.applyTransaction({add: [toAdd]})
      this.common.alertSuccess('Cliente Agregado', r.name)
    })
  }

}
