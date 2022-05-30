import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ItemizadoService} from "./itemizado.service";
import {CommonService} from "../../../_services/utils/common.service";
import {
  GetdetitemizadosReq,
  GetdetitemizadosResponse, GetdomclientesReq, GetdomclientesResponse, GetdomcompaniesReq, GetdomcompaniesResponse,
  GetdomproyectosReq,
  GetdomproyectosResponse
} from "../../../_models/IItemizado";

@Component({
  selector: 'app-itemizado',
  templateUrl: './itemizado.component.html',
  styleUrls: ['./itemizado.component.scss']
})
export class ItemizadoComponent implements OnInit {

  getdomcompaniesRequest: GetdomcompaniesReq | any;
  warehouseList: GetdomcompaniesResponse = {
    code: 1,
    error: '',
    label: '',
    detalles: []
  };
  getdomclientesRequest: GetdomclientesReq | any;
  businessList: GetdomclientesResponse = {
    code: 1,
    error: '',
    label: '',
    detalles: []
  };
  getdomproyectosRequest: GetdomproyectosReq | any;
  deptoList: GetdomproyectosResponse = {
    code: 1,
    error: '',
    label: '',
    detalles: []
  };
  autoGroupColumnDef;

  getdetitemizadosReq: GetdetitemizadosReq | any;
  getdetitemizadosResponse: GetdetitemizadosResponse | any; // GetdetitemizadosResponse;

  itemizadoForm: FormGroup | any;
  warehouseSelected: any = null;
  businessSelected: any = null;
  deptoSelected: any = null;
  versionSelect: any = null;
  versionList: any = null;

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
  widthText = 100;
  submitted = false


  constructor(public itemizadoService: ItemizadoService, private fb: FormBuilder, private common: CommonService) {
    this.columnDefs = [
      {
        headerName: 'ID PARTIDA',
        field: 'idpartida',
        hide: true,
        width: this.widthText
      },
      {
        headerName: 'P. NAME',
        field: 'partida_name',
        rowGroup: true,
        width: this.widthText
      },
      {
        headerName: 'ID SUBPARTIDA',
        field: 'idsubpartida',
        width: this.widthText
      },
      {
        headerName: 'VERSION',
        field: 'version',
        width: 50
      },
      {
        headerName: 'SP. NAME',
        field: 'subpartida_name',
        width: this.widthText
      },
      {
        headerName: 'UNID.',
        field: 'und',
        width: this.widthText
      },
      {
        headerName: 'CANT.',
        field: 'cant',
        valueFormatter: this.currencyFormatter,
        width: this.widthText
      },
      {
        headerName: 'RENDIMIENTO',
        field: 'rendimiento',
        width: this.widthText
      },
      {
        headerName: 'P. UNITARIO',
        field: 'preciounit',
        valueFormatter: this.currencyFormatter,
        width: this.widthText
      },
      {
        headerName: 'P. TOTAL',
        field: 'total',
        valueFormatter: this.currencyFormatter,
        width: this.widthText
      },
      {
        headerName: 'FECHA',
        field: 'fecha',
        width: this.widthText
      }];

    this.defaultColDef = {
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      enableRowGroup: true,
      suppressMenu: true
    };

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

    this.autoGroupColumnDef = {
      headerName: 'Partida'
    }

  }

  ngOnInit(): void {
    this.itemizadoForm = this.fb.group({
      warehouseSelect: new FormControl('', [Validators.required]),
      businessSelect: new FormControl('', [Validators.required]),
      deptoSelect: new FormControl('', [Validators.required]),
      versionCtrl: new FormControl('',),
    });

    this.getdomcompanies();
  }

  getdetitemizados() {
    this.submitted = true
    if (this.itemizadoForm.invalid) {
      return
    }
    this.getdetitemizadosReq = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.warehouseSelected,
      clientId: this.businessSelected,
      projectId: this.deptoSelected,
      versionId: this.versionSelect
    };

    this.getdetitemizadosReq = this.common.cleanObj(this.getdetitemizadosReq)


    this.common.loading()

    this.itemizadoService.getdetitemizados(this.getdetitemizadosReq).subscribe((response: any) => {
      this.getdetitemizadosResponse = response;
      Swal.close();
    }, (error: any) => {
      return Swal.fire({
        title: 'Error',
        icon: 'error',
        text: error,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "Aceptar",
        cancelButtonColor: "rgba(54,153,108,0.74)"
      });
    });
  }

  currencyFormatter(num: any) {
    if (num.value === undefined) {
      return
    }
    const data = num.value;
    return Math.floor(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

  getdomcompanies() {
    this.getdomcompaniesRequest = {
      companyId: this.common.companyId,
      userId: this.common.userId
    };

    this.itemizadoService.getdomcompanies(this.getdomcompaniesRequest).subscribe((response: any) => {
      this.warehouseList = response;
    });
  }

  getdomclientes() {

    this.getdomclientesRequest = {
      companyIdUsr: this.common.companyId,
      userId: this.common.userId,
      companyIdSelect: this.warehouseSelected
    };

    this.itemizadoService.getdomclientes(this.getdomclientesRequest).subscribe((response: any) => {
      this.businessList = response;
    });
  }

  getdomproyectos() {

    this.getdomproyectosRequest = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.warehouseSelected,
      clientId: this.businessSelected
    };

    this.itemizadoService.getdomproyectos(this.getdomproyectosRequest).subscribe((response: any) => {
      this.deptoList = response;
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
  }

  onGridSizeChanged(params: any) {
    // @ts-ignore
    const gridWidth = document.getElementById('grid-wrapper').offsetWidth;
    const columnsToShow = [];
    const columnsToHide = [];
    let totalColsWidth = 0;
    const allColumns = params.columnApi.getAllColumns();
    for (let i = 0; i < allColumns.length; i++) {
      const column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    // params.columnApi.setColumnsVisible(columnsToShow, true);
    // params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
  }

  getdomversion() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.warehouseSelected,
      clientId: this.businessSelected,
      projectId: this.deptoSelected
    };

    this.itemizadoService.getdomversion(request).subscribe((response: any) => {
      this.versionList = response.detalles;
    });
  }

  delete() {
    if (!this.warehouseSelected || !this.businessSelected || !this.deptoSelected || !this.versionSelect || this.versionSelect === 'null') {
      return Swal.fire({
        title: 'Para eliminar la versión, es requerido seleccionar todos los campos',
        icon: 'info',
        text: '',
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "Aceptar",
        cancelButtonColor: "rgba(54,153,108,0.74)"
      });
    }
    const empresa: any = this.warehouseList.detalles.find((warehouse: any) => {
      return warehouse.id === this.warehouseSelected
    })
    const cliente: any = this.businessList.detalles.find((business: any) => {
      return business.id === this.businessSelected
    })
    const proyecto: any = this.deptoList.detalles.find((project: any) => {
      return project.id === this.deptoSelected
    })
    const version: any = this.versionList.find((ver: any) => {
      return ver.id === this.versionSelect
    })

    Swal.fire({
      title: '¿Estás seguro de eliminar Versión?',
      html: `<p>Empresa: ${empresa.nombre}</p>` + `<p>Cliente: ${cliente.nombre}</p>` + `<p>Proyecto: ${proyecto.nombre}</p>` + `<p>Versión: ${version.nombre}</p>`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        const request = {
          userId: this.common.userId,
          companyIdUsr: this.common.companyId,
          companyIdSelect: this.warehouseSelected,
          clientId: this.businessSelected,
          projectId: this.deptoSelected,
          versionId: this.versionSelect
        }
        this.itemizadoService.putdelversionitemizado(request).subscribe((response: any) => {
          if (response.code !== 0) {
            return Swal.fire('Error', response.error, 'error');
          }
          Swal.fire('Versión eliminada', '', 'success');
          this.getdomversion()
          return
        })
      }
    })
    return
  }

}
