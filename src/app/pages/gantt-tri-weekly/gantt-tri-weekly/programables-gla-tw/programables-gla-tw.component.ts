import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CommonService} from "../../../../_services/utils/common.service";
import * as moment from "moment";
import {GanttTriWeeklyService} from "../gantt-tri-weekly.service";

@Component({
  selector: 'app-programables-gla-tw',
  templateUrl: './programables-gla-tw.component.html',
  styleUrls: ['./programables-gla-tw.component.scss']
})
export class ProgramablesGlaTwComponent implements OnInit {
  @Input() rowData: any;
  @Input() formulario: any;
  @Input() rowNodeData: any;
  @Output() refreshTable = new EventEmitter<any>();
  @Output() setSearchGrid = new EventEmitter<any>();
  programablesForm: FormGroup | any;
  radioButton: any;

  constructor(public ganttLookAheadService: GanttTriWeeklyService, public common: CommonService,
              public fb: FormBuilder) {
    this.programablesForm = this.fb.group({
      filterFrom: new FormControl({value: null, disabled: true}),
      filterTo: new FormControl({value: null, disabled: true}),
      filterDate: new FormControl({value: null, disabled: true}),
      filterRC: new FormControl({value: null, disabled: true}),
      filterRR: new FormControl({value: null, disabled: true}),
      radioButton: new FormControl(),
    });
  }

  ngOnInit(): void {
  }

  putApplyProgramFiltersGantt() {
    const request = {
      userId: this.common.userId,
      companyUsrId: this.common.companyId,
      companySelectId: this.formulario.value.warehouseSelect,
      clientId: this.formulario.value.businessSelect,
      projectId: this.formulario.value.projectoSelect,
      filterFrom: moment(this.programablesForm.value.filterFrom).format('DD-MM-YY'),
      filterTo: moment(this.programablesForm.value.filterTo).format('DD-MM-YY'),
      filterDate: this.programablesForm.value.filterDate ? 1 : 0,
      filterRC: this.programablesForm.value.filterRC ? 1 : 0,
      filterRR: this.programablesForm.value.filterRR ? 1 : 0,
    }

    this.ganttLookAheadService.putApplyProgramFiltersGantt(request).subscribe(r => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.refreshTable.emit(request)
    })

  }

  setSearch(params: any) {
    this.setSearchGrid.emit(params)
  }

}
