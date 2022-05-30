import {Component, OnDestroy} from '@angular/core';
import {AgRendererComponent} from "ag-grid-angular";
import {IAfterGuiAttachedParams} from "ag-grid-community";
import * as _ from 'lodash';

@Component({
  selector: 'app-select-cell-render',
  templateUrl: './select-cell-render.component.html',
  styleUrls: ['./select-cell-render.component.scss']
})
export class SelectCellRenderComponent implements AgRendererComponent, OnDestroy {
  private imageSource: string | any;
  params: any;
  disable: any;
  disabled: any;
  value: any;
  selected: any = null;
  vendors: any;
  getDisabledFunction: any;
  isTotales = true


  agInit(params: any): void {
    this.params = params;
    this.getDisabledFunction = this.params.getDisabledFunction;

    this.vendors = params.colDef.params;

    const data = _.map(this.params.data, (toArr) => {
      return toArr
    })
    if (data.length === 0 || this.params.data.ispadre == 1) {
      this.isTotales = false
    }

    const isTot = data.find(element => element === 'Totales')
    if (isTot) {
      this.isTotales = false
    }

    if (this.getDisabledFunction && this.getDisabledFunction instanceof Function) {
      this.disabled = this.getDisabledFunction(params.data);
    }
    if (this.params.value) {
      const a = this.params.colDef.params.find((data:any) => (data.id === this.params.value || data.value === this.params.value))
      this.selected = a.id
    } else {
      this.selected = 0
    }
    if (this.params.data) {
      if (this.params.data.approveState !== 0) {
        this.disable = true
      }
    }
  }

  ngOnDestroy() {
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }


  refresh(params: any) {
    const a = params.colDef.params.filter((vendor: any) => vendor.id === this.selected)
    params.value = a[0]
    this.params.change(params);
    params.api.refreshCells(params);
    return true
  }

}
