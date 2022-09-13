import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CommonService} from "../../../_services/utils/common.service";
import {CrearProyectoService} from "../crear-proyecto.service";
import Swal from "sweetalert2";
import {ModalMprojectService} from "./modal-mproject/modal-mproject.service";
import {ButtonsMrComponent} from "../master-rubros/buttons-mr/buttons-mr.component";
import {CausasNoCumplimientoComponent} from "./causas-no-cumplimiento/causas-no-cumplimiento.component";

@Component({
  selector: 'app-master-project',
  templateUrl: './master-project.component.html',
  styleUrls: ['./master-project.component.scss']
})
export class MasterProjectComponent implements OnInit {

  @ViewChild(CausasNoCumplimientoComponent, {static: false}) causasNoCumplimientoComponent: CausasNoCumplimientoComponent | any;
  @Output() selectedRow = new EventEmitter<any>();
  masterRubroForm: FormGroup;
  rowData: any;
  causasData: any;
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
  masterProject: any;
  masterRubros: any;
  masterCities: any;
  masterClients: any;
  masterCompanies: any;
  rubros = [{id: 1, value: 'value'}];

  constructor(public common: CommonService, public masterProjectService: CrearProyectoService, private fb: FormBuilder,
              public modalMr: ModalMprojectService) {
    this.masterRubroForm = this.fb.group({
      rubroCtrl: new FormControl('')
    });
    this.common.loading()
    this.getDetMstrProject()
    this.getDetMstrRubros()
    this.getDetMstrCity()
    this.getDetMstrClientes()
    this.getDetMstrCompany()

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true,
      suppressMenu: true,
      rowSelection: 'single',
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
        headerName: 'Centro Costos',
        field: 'idproject',
        width: 180,
      },
      {
        headerName: 'Nombre',
        field: 'project_name',
        width: 240,
      },
      {
        headerName: 'Rut Empresa',
        field: 'idempresa',
        width: 160,
      },
      {
        headerName: 'Empresa',
        field: 'empresa_name',
        width: 160,
      },
      {
        headerName: 'Rut Cliente',
        field: 'idcliente',
        width: 160,
      },
      {
        headerName: 'Cliente',
        field: 'client_name',
        width: 160,
      },
      {
        headerName: 'Id Ciudad',
        field: 'idcity',
        hide: true,
        width: 160,
      },
      {
        headerName: 'Ciudad',
        field: 'city_name',
        width: 160,
      },
      {
        headerName: 'Id Rubro',
        field: 'idrubro',
        hide: true,
        width: 160,
      },
      {
        headerName: 'Rubro',
        field: 'rubro_name',
        width: 160,
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

  getDetMstrProject() {
    const request = {
      userId: this.common.userId,
      companyId: this.common.companyId
    }
    this.masterProjectService.getDetMstrProject(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.masterProject = r.detalles
      Swal.close()
    })
  }

  getDetMstrRubros() {
    const request = {
      userId: this.common.userId,
      companyId: this.common.companyId
    }
    this.masterProjectService.getDetMstrRubros(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.masterRubros = r.detalles
    })
  }

  getDetMstrCity() {
    const request = {
      userId: this.common.userId,
      companyId: this.common.companyId
    }
    this.masterProjectService.getDetMstrCity(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.masterCities = r.detalles
    })
  }

  getDetMstrClientes() {
    const request = {
      userId: this.common.userId,
      companyId: this.common.companyId
    }
    this.masterProjectService.getDetMstrClientes(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.masterClients = r.detalles
    })
  }

  getDetMstrCompany() {
    const request = {
      userId: this.common.userId,
      companyId: this.common.companyId
    }
    this.masterProjectService.getDetMstrCompany(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.masterCompanies = r.detalles
    })
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  cargar(rowData: any) {
    if (rowData.type === 2) {
      const data = {
        type: 2, companies: this.masterCompanies, clients: this.masterClients,
        cities: this.masterCities, rubros: this.masterRubros, rowData
      }
      this.modalMr.alerta('Titulo', 'mensaje', data)
      this.modalMr.response().content.onClose.subscribe((r: any) => {
        if (!r) {
          return
        }

        const toUpdate: any = []
        this.gridApi.forEachNodeAfterFilterAndSort((rowNode: any) => {
          const data = rowNode.data;
          if (rowNode.data.idproject === r.idproject) {
            data.idproject = r.idproject
            data.project_name = r.project_name
            data.idempresa = r.idempresa
            data.empresa_name = r.empresa_name
            data.idcliente = r.idcliente
            data.client_name = r.client_name
            data.idcity = r.idcity
            data.city_name = r.city_name
            data.idrubro = r.idrubro
            data.rubro_name = r.rubro_name
          }
          toUpdate.push(data)
        })
        this.common.alertSuccess('Proyecto Actualizado')
        this.gridApi.applyTransaction({update: toUpdate})
      })
    } else {
      this.common.alertWithOption(`¿Eliminar proyecto ${rowData.rowData.data.cliente_name}?`, `Rut: ${rowData.rowData.data.idcliente}`, 'info', 'Aceptar').then((r: any) => {
        if (r) {
          const request = {
            userId: this.common.userId,
            companyId: this.common.companyId,
            proyectId: rowData.rowData.data.idproject,
          }
          this.common.loading('Eliminando Proyecto...')
          this.masterProjectService.putDelMstrProject(request).subscribe((r: any) => {
            if (r.code !== 0) {
              return this.common.alertError('Error', r.error)
            }
            const del = rowData.rowData.node.data
            this.common.alertSuccess('Proyecto eliminado')
            this.gridApi.applyTransaction({remove: [del]})

          })
        }
      })
    }
  }

  addRubro() {
    const rowData = {
      type: 0, companies: this.masterCompanies, clients: this.masterClients,
      cities: this.masterCities, rubros: this.masterRubros
    }
    this.modalMr.alerta('Titulo', 'mensaje', rowData)
    this.modalMr.response().content.onClose.subscribe((r: any) => {
      if (!r) {
        return
      }
      this.gridApi.applyTransaction({add: [r]})
      this.common.alertSuccess('Proyecto Agregado', r.project_name)
    })
  }

  onFirstDataRendered(params: any) {
    this.gridApi = params.api;
    this.rowSelected = this.gridApi.getRowNode(0);
    this.gridApi.getRowNode(0).selectThisNode(true);
    this.getDetMstrCausasNoCumplto()
  }

  onSelectionChanged(e: any) {
    const selectedRows = this.gridApi.getSelectedNodes();
    this.rowSelected = selectedRows[0];
    this.getDetMstrCausasNoCumplto()
  }

  getDetMstrCausasNoCumplto() {
    const request = {
      userId: this.common.userId,
      companyId: this.rowSelected.data.idempresa,
      clientId: this.rowSelected.data.idcliente,
      projectId: this.rowSelected.data.idproject,
    }
    if (this.causasNoCumplimientoComponent) {
      this.causasNoCumplimientoComponent.onBtShowLoading()
    }
    this.masterProjectService.getDetMstrCausasNoCumplto(request).subscribe((r: any) => {
      this.causasData = r.detalles
    })
  }

}
