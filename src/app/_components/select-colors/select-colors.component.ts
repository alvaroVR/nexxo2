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

  agInit(params: any): void {
    this.params = params;

    if (this.getDisabledFunction && this.getDisabledFunction instanceof Function) {
      this.disabled = this.getDisabledFunction(params.data);
    }
   // if (this.params.value) {
   //   const a = this.params.colDef.params.find((data: any) => (data.id === this.params.value || data.value === this.params.value))
   //   this.selected = a ? a.id : null
   // } else {
   //   this.selected = 0
   // }
    if (this.params.data) {
      if (this.params.data.approveState !== 0) {
        this.disable = true
      }
    }


  }

  refresh(params: any) {
   // const a = params.colDef.params.filter((vendor: any) => vendor.id === this.selected)
    debugger
    //params.value = a[0]
    this.params.change(params);
    //params.api.refreshCells(params);
    return false
  }

}
