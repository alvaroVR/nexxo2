import {Component} from '@angular/core';
import {ICellEditorAngularComp} from "ag-grid-angular";
import * as moment from 'moment';

@Component({
  selector: 'app-my-date-editor',
  templateUrl: './my-date-editor.component.html',
  styleUrls: ['./my-date-editor.component.scss']
})
export class MyDateEditorComponent implements ICellEditorAngularComp {

  params: any;
  selectedDate: any = null;
  getDisabledFunction: any;
  disabled: any;
  dateSelected: any;
  isTotales = true
  show = false
  modelDate: any;
  completeDate: Date | any;
  localCompleteDate: string | any;
  newValue: any
  format: any = 'DD-MM-YY HH:mm'

  agInit(params: any): void {
    this.params = params;
    this.getDisabledFunction = this.params.getDisabledFunction;

    if (this.getDisabledFunction && this.getDisabledFunction instanceof Function) {
      this.disabled = this.getDisabledFunction(params.data);
    }

    if (this.params.value) {
      const dateSeparated = this.params.value.split('-')
      const day = dateSeparated[0]
      const month = dateSeparated[1]
      const yearHour = dateSeparated[2].split(" ")
      const year = yearHour[0]
      const hour = yearHour[1]

      this.selectedDate = new Date(`20${year}-${month}-${day}T${hour}`)
      this.dateSelected = moment(this.selectedDate).format("YYYY-MM-DD")
      this.show = true
    }

    this.modelDate = params.value

  }

  getValue = () => {
    let dateString = null;
    const formatDate = this.params.colDef.format ? this.params.colDef.format : 'DD-MM-YY HH:mm'
    if (!this.dateSelected) {
      return dateString;
    }
    if (this.selectedDate) {
      dateString = this.dateSelected
      return moment(dateString).format(formatDate);
    }
    return moment(this.dateSelected).format(formatDate);
  }

  afterGuiAttached = (value: any) => {
    if (!this.params.value) {
      return;
    }
  };

  onDateChanged = (event: any, params: any) => {
    let date = event.value;
    //this.selectedDate = date;
    //params.value = event.value
    //this.params.change(params);

  }
}
