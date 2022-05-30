import {Component, OnDestroy} from '@angular/core';
import {AgRendererComponent} from "ag-grid-angular";
import * as _ from "lodash";

@Component({
  selector: 'app-button-with-number',
  templateUrl: './button-with-number.component.html',
  styleUrls: ['./button-with-number.component.scss']
})
export class ButtonWithNumberComponent implements AgRendererComponent, OnDestroy {
  params: any;
  label: string | any;
  btnClass: string | any;
  getLabelFunction: any;
  getBtnClassFunction: any;
  mostrar: boolean = true;

  agInit(params: any): void {
    this.params = params;
    this.label = params.value
    if (this.params.data.ispadre) {
      this.mostrar = this.params.data.ispadre == 0
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
    this.label = valueChanged
    params.api.refreshCells(params);
    return true;
  }
}
