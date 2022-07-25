import {Component, OnDestroy, OnInit} from '@angular/core';
import {AgRendererComponent} from "ag-grid-angular";

@Component({
  selector: 'app-buttons-aed',
  templateUrl: './buttons-aed.component.html',
  styleUrls: ['./buttons-aed.component.scss']
})
export class ButtonsAedComponent implements AgRendererComponent, OnDestroy {
  params: any;
  label: string | any;
  btnClass: string | any;
  editable: string | any;
  getLabelFunction: any;
  getBtnClassFunction: any;
  getHideAddFunction: any;
  getHideDelFunction: any;
  isTotales = true;
  disabledAdd: boolean | any;
  disabled: boolean | any = false;
  hideAdd: boolean | any = true;
  hideDel: boolean | any = true;
  disabledEdit: boolean | any;
  show: boolean = true;


  agInit(params: any): void {
    this.params = params;
    this.getLabelFunction = this.params.getLabelFunction;
    this.getBtnClassFunction = this.params.getBtnClassFunction;
    this.show = this.params.node.key
    this.disabled = this.params.colDef.disabled
    this.getHideAddFunction = this.params.getHideAddFunction;
    this.getHideDelFunction = this.params.getHideDelFunction;
    if (this.getHideAddFunction && this.getHideAddFunction instanceof Function) {
      this.hideAdd = this.getHideAddFunction(params.data);
    }
    if (this.getHideDelFunction && this.getHideDelFunction instanceof Function) {
      this.hideDel = this.getHideDelFunction(params.data);
    }
  }

  btnClickedHandlerAdd(event: any) {
    const params = {
      event: event,
      type: 0,
      rowData: this.params
    }
    this.params.column.colDef.cellRendererParams.clicked(params);
  }

  btnClickedHandlerDel(event: any) {
    const params = {
      event: event,
      type: 1,
      rowData: this.params
    }
    this.params.column.colDef.cellRendererParams.clicked(params);
  }

  btnClickedHandlerEdit(event: any) {
    const params = {
      event: event,
      type: 2,
      rowData: this.params
    }
    this.params.column.colDef.cellRendererParams.clicked(params);
  }

  btnClickedHandlerEnd(event: any) {
    const params = {
      event: event,
      type: 3,
      rowData: this.params
    }
    this.params.column.colDef.cellRendererParams.clicked(params);
  }

  ngOnDestroy() {
    // no need to remove the button click handler
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }

  refresh(params: any): boolean {
    params.api.refreshCells(params);
    return true;
  }

}
