import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {TypeFile} from "../../../../_models/TypeFile";
import {FileInfo} from "@angular-devkit/build-angular/src/utils/index-file/augment-index-html";
import * as _ from "lodash";

@Component({
  selector: 'app-upload-pm-files',
  templateUrl: './upload-pm-files.component.html',
  styleUrls: ['./upload-pm-files.component.scss']
})
export class UploadPmFilesComponent implements OnChanges {
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
        headers[0] = 'idot'
        headers[1] = 'descot'
        headers[2] = 'idactivity'
        headers[3] = 'descact'
        headers[4] = 'idresponsable'
        headers[5] = 'area'
        headers[6] = 'planta'
        headers[7] = 'espc'
        headers[8] = 'equipo'
        headers[9] = 'uom'
        headers[10] = 'h1'
        headers[11] = 'h2'
        headers[12] = 'h3'
        headers[13] = 'h4'
        headers[14] = 'h5'
        headers[15] = 'h6'
        headers[16] = 'h7'
        headers[17] = 'q1'
        headers[18] = 'q2'
        headers[19] = 'q3'
        headers[20] = 'q4'
        headers[21] = 'q5'
        headers[22] = 'q6'
        headers[23] = 'q7'
        headers[24] = 'd1'
        headers[25] = 'd2'
        headers[26] = 'd3'
        headers[27] = 'd4'
        headers[28] = 'd5'
        headers[29] = 'd6'
        headers[30] = 'd7'


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

        let obj: any = {
          idreg: 0
        }
        headers.forEach((elemnt: any, num: any) => {
          obj[elemnt] = header2[num]
        })
        this.linesData.push(obj)


        let arr = []
        let lineData: any = {}
        result.forEach((r, index) => {
          lineData = r
          lineData['idreg'] = index + 1
          this.linesData.push(lineData)
        })

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
      {headerName: header[0], filter: false, field: 'idreg', width: 65},
      {headerName: header[1], filter: false, field: 'idot', width: 65},
      {headerName: header[2], filter: false, field: 'descot', width: 65},
      {headerName: header[3], filter: false, field: 'idactivity', width: 65},
      {headerName: header[4], filter: false, field: 'descact', width: 65},
      {headerName: header[5], filter: false, field: 'idresponsable', width: 65},
      {headerName: header[6], filter: false, field: 'area', width: 65},
      {headerName: header[7], filter: false, field: 'planta', width: 65},
      {headerName: header[8], filter: false, field: 'espc', width: 65},
      {headerName: header[9], filter: false, field: 'equipo', width: 65},
      {headerName: header[10], filter: false, field: 'uom', width: 65},
      {headerName: header[11], filter: false, field: 'h1', width: 65},
      {headerName: header[12], filter: false, field: 'h2', width: 65},
      {headerName: header[13], filter: false, field: 'h3', width: 65},
      {headerName: header[14], filter: false, field: 'h4', width: 65},
      {headerName: header[15], filter: false, field: 'h5', width: 65},
      {headerName: header[16], filter: false, field: 'h6', width: 65},
      {headerName: header[17], filter: false, field: 'h7', width: 65},
      {headerName: header[18], filter: false, field: 'q1', width: 65},
      {headerName: header[19], filter: false, field: 'q2', width: 65},
      {headerName: header[20], filter: false, field: 'q3', width: 65},
      {headerName: header[21], filter: false, field: 'q4', width: 65},
      {headerName: header[22], filter: false, field: 'q5', width: 65},
      {headerName: header[23], filter: false, field: 'q6', width: 65},
      {headerName: header[24], filter: false, field: 'q7', width: 65},
      {headerName: header[25], filter: false, field: 'd1', width: 65},
      {headerName: header[26], filter: false, field: 'd2', width: 65},
      {headerName: header[27], filter: false, field: 'd3', width: 65},
      {headerName: header[28], filter: false, field: 'd4', width: 65},
      {headerName: header[29], filter: false, field: 'd5', width: 65},
      {headerName: header[30], filter: false, field: 'd6', width: 65},
      {headerName: header[21], filter: false, field: 'd7', width: 65},
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
