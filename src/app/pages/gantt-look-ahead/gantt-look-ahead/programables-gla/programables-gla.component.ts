import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GanttLookAheadService} from "../gantt-look-ahead.service";
import {CommonService} from "../../../../_services/utils/common.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from 'moment';

@Component({
  selector: 'app-programables-gla',
  templateUrl: './programables-gla.component.html',
  styleUrls: ['./programables-gla.component.scss']
})
export class ProgramablesGlaComponent implements OnInit {
  @Input() rowData: any;
  @Input() formulario: any;
  @Input() rowNodeData: any;
  @Output() refreshTable = new EventEmitter<any>();
  programablesForm: FormGroup | any;
  disabledDate: boolean = true
  submitted: boolean = false

  constructor(public ganttLookAheadService: GanttLookAheadService, public common: CommonService,
              public fb: FormBuilder) {
    this.programablesForm = this.fb.group({
      filterFrom: new FormControl(null,),
      filterTo: new FormControl(null),
      filterDate: new FormControl(null),
      filterRC: new FormControl(null),
      filterRR: new FormControl(null),
    });
    this.setUserCategoryValidators()
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
      filterFrom: this.programablesForm.value.filterFrom ? moment(this.programablesForm.value.filterFrom).format('DD-MM-YY') : null,
      filterTo: this.programablesForm.value.filterTo ? moment(this.programablesForm.value.filterTo).format('DD-MM-YY') : null,
      filterDate: this.programablesForm.value.filterDate ? 1 : 0,
      filterRC: this.programablesForm.value.filterRC ? 1 : 0,
      filterRR: this.programablesForm.value.filterRR ? 1 : 0,
    }
    if (this.programablesForm.invalid) {
      this.submitted = true
      return
    }
    this.ganttLookAheadService.putApplyProgramFiltersGantt(request).subscribe(r => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.refreshTable.emit(request)
    })

  }

  toggleDate(params: any) {
    this.disabledDate = !params.checked
  }

  setUserCategoryValidators() {
    const filterFrom = this.programablesForm.get('filterFrom');
    const filterTo = this.programablesForm.get('filterTo');

    this.programablesForm.get('filterDate').valueChanges
      .subscribe((filterDate: any) => {
        if (filterDate) {
          filterFrom.setValidators([Validators.required]);
          filterTo.setValidators([Validators.required]);
        } else {
          filterFrom.setValidators(null);
          filterTo.setValidators(null);
        }

        filterFrom.updateValueAndValidity();
        filterTo.updateValueAndValidity();

      });
  }

}
