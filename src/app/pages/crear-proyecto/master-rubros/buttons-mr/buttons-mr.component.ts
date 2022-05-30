import {Component, OnDestroy} from '@angular/core';
import {AgRendererComponent} from "ag-grid-angular";

@Component({
  selector: 'app-buttons-mr',
  templateUrl: './buttons-mr.component.html',
  styleUrls: ['./buttons-mr.component.scss']
})
export class ButtonsMrComponent implements AgRendererComponent, OnDestroy {
  params: any;
  label: string | any;
  btnClass: string | any;
  editable: string | any;
  getLabelFunction: any;
  getBtnClassFunction: any;
  isTotales = true;
  disabledAdd: boolean | any;
  disabledEdit: boolean | any;
  show: boolean = true;

  agInit(params: any): void {
    this.params = params;
    this.getLabelFunction = this.params.getLabelFunction;
    this.getBtnClassFunction = this.params.getBtnClassFunction;
  }

  btnClickedHandlerAdd(event: any) {
    const params = {
      event: event,
      type: 0,
      rowData: this.params
    }
    this.params.column.colDef.clicked(params);
  }

  btnClickedHandlerDel(event: any) {
    const params = {
      event: event,
      type: 1,
      rowData: this.params
    }
    this.params.column.colDef.clicked(params);
  }

  btnClickedHandlerEdit(event: any) {
    const params = {
      event: event,
      type: 2,
      rowData: this.params
    }
    this.params.column.colDef.clicked(params);
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
