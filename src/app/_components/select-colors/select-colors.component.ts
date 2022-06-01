import {Component, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-select-colors',
  templateUrl: './select-colors.component.html',
  styleUrls: ['./select-colors.component.scss']
})
export class SelectColorsComponent implements ICellRendererAngularComp {
  params!: any;
  disable: any;
  disabled: any;
  value: any;
  selected: any = null;
  vendors: any;
  getDisabledFunction: any;
  isTotales = true
  edited = false
  show: any

  agInit(params: any): void {
    this.params = params;

    if (this.getDisabledFunction && this.getDisabledFunction instanceof Function) {
      this.disabled = this.getDisabledFunction(params.data);
    }
    if (this.params.value) {
      if (!this.params.colDef) {
        return
      }
      if (params.value.color) {
        this.params.value = params.value
        return;
      }
      const a = this.params.colDef.params.find((data: any) => (data.id === this.params.value || data.value === this.params.value))
      this.params.value = a ? a : null
      this.show = a ? a : null
    } else {
      // this.params = 0
    }

  }

  refresh(params: any) {
    this.params.change(params);
    this.params = params
    this.edited = true
    params.api.refreshCells(params);
    return false
  }

}
