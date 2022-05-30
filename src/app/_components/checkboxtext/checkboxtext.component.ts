import {Component} from '@angular/core';
import {IAfterGuiAttachedParams} from 'ag-grid-community';
import {AgRendererComponent} from "ag-grid-angular";

@Component({
  selector: 'app-checkboxtext',
  templateUrl: './checkboxtext.component.html',
  styleUrls: ['./checkboxtext.component.scss']
})
export class CheckboxtextComponent implements AgRendererComponent {

  params:any

  salesU = false
  bloqueo = false
  checked = false

  agInit(params: any): void {
    this.params = params
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  refresh(params: any): boolean {
    if (params.data.idstore1) {
      params.api.refreshCells(params);
      return false;
    }

    params.api.refreshCells(params);
    return false;
  }
}
