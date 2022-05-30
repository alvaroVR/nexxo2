import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {TypeFile} from "../../../../_models/TypeFile";
import {FileInfo} from "@angular-devkit/build-angular/src/utils/index-file/augment-index-html";
import * as _ from "lodash";

@Component({
  selector: 'app-upload-pm-files3',
  templateUrl: './upload-pm-files3.component.html',
  styleUrls: ['./upload-pm-files3.component.scss']
})
export class UploadPmFiles3Component implements OnChanges {
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
  public headers: any;

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

  }

  constructor() {

  }

  public onChange(fileList: FileInfo): void {
    this.mpfile(fileList)
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
        //  headers[0] = 'idreg'
        headers[0] = 'idot'
        headers[1] = 'mantenimiento'
        headers[2] = 'equipo_seccion'
        headers[3] = 'taskname'
        headers[4] = 'empresa'
        headers[5] = 'asignacion'
        headers[6] = 'especialidad'
        headers[7] = 'nro_dot'
        headers[8] = 'duracion_est'
        headers[9] = 'total_hh'
        headers[10] = 'duracion'
        headers[11] = 'comienzo'
        headers[12] = 'fin'

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
        let header2 = array[0].split(";")
        let obj: any = {}

        headers.forEach((elemnt: any, num: any) => {
          obj['idreg'] = 0
          obj[elemnt] = header2[num]
        })
        this.linesData.push(obj)
        let lineData: any = {}
        result.forEach((r, index) => {
          lineData = r
          lineData['idreg'] = index + 1
          this.linesData.push(lineData)
        })
        this.rowData = this.linesData
        this.pmData.emit(this.linesData)
        this.createTablePM(array)
        this.btnEnviar = false
      };
      fileReader.readAsText(file);
    }
  }

  createTablePM(headers: any) {
    let header = headers[0].split(";")
    this.headers = header
    this.columnDefs = [
      {headerName: 'idreg', filter: false, field: 'idreg', width: 65},
      {headerName: this.headers[0], filter: false, field: 'idot', width: 65},
      {headerName: this.headers[1], filter: false, field: 'mantenimiento', width: 65},
      {headerName: this.headers[2], filter: false, field: 'equipo_seccion', width: 65},
      {headerName: this.headers[3], filter: false, field: 'taskname', width: 65},
      {headerName: this.headers[4], filter: false, field: 'empresa', width: 65},
      {headerName: this.headers[5], filter: false, field: 'asignacion', width: 65},
      {headerName: this.headers[6], filter: false, field: 'especialidad', width: 65},
      {headerName: this.headers[7], filter: false, field: 'nro_dot', width: 65},
      {headerName: this.headers[8], filter: false, field: 'duracion_est', width: 65},
      {headerName: this.headers[9], filter: false, field: 'total_hh', width: 65},
      {headerName: this.headers[10], filter: false, field: 'duracion', width: 65},
      {headerName: this.headers[11], filter: false, field: 'comienzo', width: 65},
      {headerName: this.headers[12], filter: false, field: 'fin', width: 65},
    ]
  }


  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

}
