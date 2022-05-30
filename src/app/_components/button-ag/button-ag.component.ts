import {Component, OnDestroy} from '@angular/core';
import {AgRendererComponent} from "ag-grid-angular";
import * as _ from 'lodash';

@Component({
  selector: 'app-button-ag',
  templateUrl: './button-ag.component.html',
  styleUrls: ['./button-ag.component.scss']
})
export class ButtonAgComponent implements AgRendererComponent, OnDestroy {
  private params: any;
  label: string | any;
  btnClass: string | any;
  editable: string | any;
  getLabelFunction: any;
  getBtnClassFunction: any;
  isTotales = true;
  disable: any;

  agInit(params: any): void {
    this.params = params;
    this.editable = params.editable; // here
    this.label = this.params.label;
    this.btnClass = this.params.btnClass;
    this.getLabelFunction = this.params.getLabelFunction;
    this.getBtnClassFunction = this.params.getBtnClassFunction;

    const data = _.map(this.params.data, (toArr) => {
      return toArr
    })
    if (data.length === 0) {
      this.isTotales = false
    }

    const isTot = data.find(element => element === 'Totales')
    const isTot2 = data.find(element => element === ' ')
    if (isTot || isTot2) {
      this.isTotales = false
    }

    if (this.getLabelFunction && this.getLabelFunction instanceof Function) {
      this.label = this.getLabelFunction(params.data);
    }
    if (this.getBtnClassFunction && this.getBtnClassFunction instanceof Function) {
      this.btnClass = this.getBtnClassFunction(params.data);
    }
    if (this.params.data) {
      if (this.params.data.approveState) {
        if (this.params.data.approveState !== 0) {
          this.disable = true
        }
      }
    }

  }

  btnClickedHandler($event: any) {
    const params = {
      event: $event,
      rowData: this.params.node.data
      // ...something
    }

    this.params.clicked(this.params);
  }

  ngOnDestroy() {
    // no need to remove the button click handler
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }

  refresh(params: any): boolean {
    const field = params.colDef.field;
    const valueChanged = _.get(params.data, field);

    if (params.data.submmit_status == '0') {
      this.label = 'Pending';
      this.btnClass = 'btn btn-danger';
    }

    if (params.data.submmit_status == '1') {
      this.label = 'Submitted';
      this.btnClass = 'btn btn-success';
    }

    if (valueChanged == '0') {
      this.label = 'Disabled';
      this.btnClass = 'btn btn-danger';
    }
    if (valueChanged == '1') {
      this.label = 'Enabled';
      this.btnClass = 'btn btn-success';
    }

    if (params.data.publishPndg == '1') {
      this.label = 'Publish';
      this.btnClass = 'btn btn-success';
    }

    if (params.data.publishPndg == '0') {
      this.label = 'Publish';
      this.btnClass = 'btn btn-secondary';
    }

    if (params.data.flag_repo == '0') {

      this.label = 'Disabled';
      this.btnClass = 'btn btn-danger';
    }
    if (params.data.flag_repo == '1') {
      this.label = 'Enabled';
      this.btnClass = 'btn btn-success';
    }
    params.api.refreshCells(params);
    return true;
  }
}
