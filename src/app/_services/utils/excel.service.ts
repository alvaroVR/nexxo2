import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as moment from "moment";

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() {
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, {skipHeader: true});
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = {Sheets: {[`${excelFileName}`]: worksheet}, SheetNames: [`${excelFileName}`]};
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  public saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  saveAsTxtFile(buffer: any, fileName: string, type: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'text/plain;charset=utf-8'
    });
    const date = moment().format('YYYYMMDDhhmmss');
    FileSaver.saveAs(data, `${fileName}${date}${type}.txt`);
  }

  public exportAsExcelFile2(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, {skipHeader: true});
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = {Sheets: {[`${excelFileName}`]: worksheet}, SheetNames: [`${excelFileName}`]};
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    this.saveAsExcelFile2(excelBuffer, excelFileName);
  }


  private saveAsExcelFile2(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}
