import {Component, OnDestroy} from '@angular/core';
import * as _ from 'lodash';
import {IAfterGuiAttachedParams} from 'ag-grid-community';
import {AgRendererComponent} from "ag-grid-angular";

@Component({
  selector: 'app-ag-grid-checkbox',
  templateUrl: './ag-grid-checkbox.component.html',
  styleUrls: ['./ag-grid-checkbox.component.scss']
})
export class AgGridCheckboxComponent implements AgRendererComponent, OnDestroy {

  params: any;
  mostrar: boolean = true;
  disabled: boolean = false;

  agInit(params: any): void {
    params.value = params.value == "0" ? 0 : 1

    if (_.isNumber(params.colDef.setValue)) {
      params.value = params.colDef.setValue
    }
    this.params = params;
    this.disabled = params.colDef.disabled

    if (this.params.data.ispadre) {
      this.mostrar = this.params.data.ispadre == 0
    }
  }

  btnClickedHandler(event: any) {
    const isFunction = _.isFunction(this.params.clicked)
    if (!isFunction) {
      return
    }
    const params = {
      rowData: this.params
    }
    //params.rowData.node.data[this.params.colDef.field] = !params.rowData[this.params.colDef.field];
    params.rowData.data[this.params.colDef.field] = !this.params.value
    this.params.clicked(params.rowData);
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  ngOnDestroy() {
    // no need to remove the button click handler
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }

  refresh(params: any): boolean {
    params.data[params.colDef.field] = params.value;
    params.api.refreshCells(params);
    return true;
  }
}
