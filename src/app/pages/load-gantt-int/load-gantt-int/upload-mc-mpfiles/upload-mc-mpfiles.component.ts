import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {TypeFile} from "../../../../_models/TypeFile";
import {FileInfo} from "@angular-devkit/build-angular/src/utils/index-file/augment-index-html";
import * as _ from 'lodash';

@Component({
  selector: 'app-upload-mc-mpfiles',
  templateUrl: './upload-mc-mpfiles.component.html',
  styleUrls: ['./upload-mc-mpfiles.component.scss']
})
export class UploadMcMpfilesComponent implements OnChanges {
  @Input() title: any;
  @Input() subtitle: any;
  @Input() rowData: any;
  @Input() type: any;
  @Input() updateStatus: any;
  @Input() pmstatus: any;
  @Input() mcstatus: any;
  @Output() mcData = new EventEmitter<any>();
  @Output() pmData = new EventEmitter<any>();

  public typeList: Array<TypeFile> | any;
  public typeListModel: any = null;
  public fileModel: any;
  public fileContent: any
  public linesData: Array<any> = [];
  public fileName: any
  public submitted: Boolean = false;
  public btnEnviar: Boolean = false;
  public arr: any = [];
  public lineasMaximas = 0;

  public regsData: any;

  data: any;
  headData: any; // excel row header
  columnDefs: any;
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    minWidth: 30,
    suppressMenu: true,
    rowSelection: 'single',
  };
  gridOptions: any;
  gridApi: any;
  gridColumnApi: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pmstatus) {
      this.gridApi.forEachNodeAfterFilterAndSort((rowData: any) => {
        const status = (this.pmstatus.find((id: any) => id.idreg = rowData.data.idreg)).status
        rowData.setDataValue('status', status)
      })
    }
    if (this.mcstatus) {
      this.gridApi.forEachNodeAfterFilterAndSort((rowData: any) => {
        const status = (this.mcstatus.find((id: any) => id.idreg = rowData.data.idreg)).status
        rowData.setDataValue('status', status)
      })
    }
  }

  constructor() {

  }

  public onChange(fileList: FileInfo): void {
    if (this.type === 'pmfile') {
      this.mpfile(fileList)
    } else {
      this.mcfile(fileList)
    }


  }

  public mpfile(fileList: any) {
    if (_.isNull(fileList)) {
      let file = ''
      let fileName = ''
      this.fileName = null;
      this.fileModel = null;
      return
    }
    this.linesData = []
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    if (fileList[0]) {
      let fileName = fileList[0].name
      this.fileName = fileName

      fileReader.onloadend = (x) => {
        const lineas = []
        this.fileContent = fileReader.result;
        var array = this.fileContent.toString().split("\r");
        let headers = array[0].split(";")
        headers[0] = 'idactivity'
        headers[1] = 'activity_name'
        headers[2] = 'original_duration'
        headers[3] = 'start_'
        headers[4] = 'finish_'
        headers[5] = 'holgura'
        headers[6] = 'budget_labor_units'
        headers[7] = 'resources'
        headers[8] = 'predessor_detail'
        headers[9] = 'succesor_detail'

        const lines = array.map((val: any, index: any) => {
          if (index == 0) {
            return val
          }

          return val.replace('\n', ``)
        })
        let result = [];
        for (let i = 1; i < lines.length - 1; i++) {
          let obj: any = {}
          let str = lines[i]
          let s = ''
          let flag = 0
          for (let ch of str) {
            if (ch === '"' && flag === 0) {
              flag = 1
            } else if (ch === '"' && flag == 1) {
              flag = 0
            }
            if (ch === ';' && flag === 0) {
              ch = '|'
            }
            if (ch !== '"') {
              s += ch
            }
          }
          let properties = s.split("|")
          for (let j in headers) {
            // @ts-ignore
            obj[headers[j]] = properties[j]
          }
          result.push(obj)
        }
        this.linesData = result.map((r, index) => {
          return {
            ...r,
            idreg: index + 1
          }
        })
        this.pmData.emit(this.linesData)
        this.createTablePM()
        this.btnEnviar = false
      };
      fileReader.readAsText(file);
    }
  }


  public mcfile(fileList:any) {
    if (_.isNull(fileList)) {
      let file = ''
      let fileName = ''
      this.fileName = null;
      this.fileModel = null;
      return
    }
    this.linesData = []
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    if (fileList[0]) {
      let fileName = fileList[0].name
      this.fileName = fileName

      fileReader.onloadend = (x) => {
        const lineas = []
        this.fileContent = fileReader.result;
        var array = this.fileContent.toString().split("\r");
        let headers = array[0].split(";")
        headers[0] = 'item_itemizado'
        headers[1] = 'idprograma'
        headers[2] = 'descr_partida'
        headers[3] = 'detalle'
        headers[4] = 'area'
        headers[5] = 'subarea'
        headers[6] = 'disciplina'
        headers[7] = 'unid'
        headers[8] = 'cantidad_po'
        headers[9] = 'cantidad_pom'
        headers[10] = 'ndimien'
        headers[11] = 'hh_po'
        headers[12] = 'hh_pom'
        headers[13] = 'distrib_n1'
        headers[14] = 'distrib_n2'
        headers[15] = 'distrib_hh_pgrm'
        headers[16] = 'distrib_hh_pom'
        headers[17] = 'hh_pom_po'

        const lines = array.map((val:any, index:any) => {
          if (index == 0) {
            return val
          }

          return val.replace('\n', ``)
        })
        let result = [];
        for (let i = 1; i < lines.length - 1; i++) {
          let obj = {}
          let str = lines[i]
          let s = ''
          let flag = 0
          for (let ch of str) {
            if (ch === '"' && flag === 0) {
              flag = 1
            } else if (ch === '"' && flag == 1) {
              flag = 0
            }
            if (ch === ';' && flag === 0) {
              ch = '|'
            }
            if (ch !== '"') {
              s += ch
            }
          }
          let properties = s.split("|")
          for (let j in headers) {
            // @ts-ignore
            obj[headers[j]] = properties[j]
          }
          result.push(obj)
        }
        this.linesData = result.map((r, index) => {
          return {
            ...r,
            idreg: index + 1
          }
        })
        this.mcData.emit(this.linesData)
        this.createTableMC()
        this.btnEnviar = false
      };
      fileReader.readAsText(file);
    }
  }


  createTablePM() {
    this.columnDefs = [
      {headerName: 'idreg', filter: false, field: 'idreg', width: 65},
      {headerName: 'idactivity', filter: false, field: 'idactivity', width: 65},
      {headerName: 'activity_name', filter: false, field: 'activity_name', width: 65},
      {headerName: 'original_duration', filter: false, field: 'original_duration', width: 65},
      {headerName: 'start_', filter: false, field: 'start_', width: 65},
      {headerName: 'finish_', filter: false, field: 'finish_', width: 65},
      {headerName: 'holgu', filter: false, field: 'holgura', width: 65},
      {headerName: 'budget_labor_units', filter: false, field: 'budget_labor_units', width: 65},
      {headerName: 'resources', filter: false, field: 'resources', width: 65},
      {headerName: 'predessor_detail', filter: false, field: 'predessor_detail', width: 65},
      {headerName: 'succesor_detail', filter: false, field: 'succesor_detail', width: 65},
      {headerName: 'status', filter: false, field: 'status', width: 65},
    ]
    this.rowData = this.linesData
  }

  createTableMC() {
    this.columnDefs = [
      {headerName: 'idreg', filter: false, field: 'idreg', width: 65},
      {headerName: 'idprograma', filter: false, field: 'idprograma', width: 65},
      {headerName: 'descr_partida', filter: false, field: 'descr_partida', width: 65},
      {headerName: 'detalle', filter: false, field: 'detalle', width: 65},
      {headerName: 'area', filter: false, field: 'area', width: 65},
      {headerName: 'subarea', filter: false, field: 'subarea', width: 65},
      {headerName: 'disciplina', filter: false, field: 'disciplina', width: 65},
      {headerName: 'unid', filter: false, field: 'unid', width: 65},
      {headerName: 'cantidad_po', filter: false, field: 'cantidad_po', width: 65},
      {headerName: 'cantidad_pom', filter: false, field: 'cantidad_pom', width: 65},
      {headerName: 'ndimien', filter: false, field: 'ndimien', width: 65},
      {headerName: 'hh_po', filter: false, field: 'hh_po', width: 65},
      {headerName: 'hh_pom', filter: false, field: 'hh_pom', width: 65},
      {headerName: 'distrib_n1', filter: false, field: 'distrib_n1', width: 65},
      {headerName: 'distrib_n2', filter: false, field: 'distrib_n2', width: 65},
      {headerName: 'distrib_hh_pgrm', filter: false, field: 'distrib_hh_pgrm', width: 65},
      {headerName: 'distrib_hh_pom', filter: false, field: 'distrib_hh_pom', width: 65},
      {headerName: 'hh_pom_po', filter: false, field: 'hh_pom_po', width: 65},
      {headerName: 'status', filter: false, field: 'status', width: 65},
    ]
    this.rowData = this.linesData
  }


  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

}
